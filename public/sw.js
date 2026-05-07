const CACHE_NAME = "bethel-bellini-v1";
const OFFLINE_URL = "/order";

const PRECACHE_URLS = [
  "/",
  "/order",
  "/logo.svg",
  "/manifest.json",
];

// Install: cache core assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS))
  );
  self.skipWaiting();
});

// Activate: clean old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// Fetch: network-first for API, cache-first for static
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Skip non-GET requests
  if (event.request.method !== "GET") {
    // Queue POST requests (orders) when offline
    if (event.request.method === "POST" && url.pathname.startsWith("/api/orders")) {
      event.respondWith(
        fetch(event.request.clone()).catch(async () => {
          // Store in IndexedDB for sync later
          const body = await event.request.clone().json();
          await storeOfflineOrder(body);
          return new Response(
            JSON.stringify({
              success: true,
              offline: true,
              message: "Pedido guardado offline. Se enviara al reconectar.",
            }),
            { headers: { "Content-Type": "application/json" } }
          );
        })
      );
      return;
    }
    return;
  }

  // API requests: network first, no cache fallback
  if (url.pathname.startsWith("/api/")) {
    event.respondWith(
      fetch(event.request).catch(() =>
        new Response(JSON.stringify({ error: "offline" }), {
          status: 503,
          headers: { "Content-Type": "application/json" },
        })
      )
    );
    return;
  }

  // Static assets: cache first
  if (
    url.pathname.match(/\.(js|css|png|jpg|jpeg|webp|svg|woff2?)$/) ||
    url.pathname.startsWith("/_next/static/")
  ) {
    event.respondWith(
      caches.match(event.request).then(
        (cached) =>
          cached ||
          fetch(event.request).then((response) => {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
            return response;
          })
      )
    );
    return;
  }

  // HTML pages: network first, cache fallback
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        return response;
      })
      .catch(() => caches.match(event.request).then((cached) => cached || caches.match(OFFLINE_URL)))
  );
});

// Offline order storage using IndexedDB
function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("bethel-offline", 1);
    request.onupgradeneeded = () => {
      request.result.createObjectStore("orders", { autoIncrement: true });
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function storeOfflineOrder(order) {
  const db = await openDB();
  const tx = db.transaction("orders", "readwrite");
  tx.objectStore("orders").add({ ...order, queued_at: Date.now() });
  return new Promise((resolve) => { tx.oncomplete = resolve; });
}

async function getOfflineOrders() {
  const db = await openDB();
  const tx = db.transaction("orders", "readonly");
  const store = tx.objectStore("orders");
  return new Promise((resolve) => {
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result);
  });
}

async function clearOfflineOrders() {
  const db = await openDB();
  const tx = db.transaction("orders", "readwrite");
  tx.objectStore("orders").clear();
}

// Sync offline orders when back online
self.addEventListener("message", async (event) => {
  if (event.data?.type === "SYNC_ORDERS") {
    const orders = await getOfflineOrders();
    let synced = 0;

    for (const order of orders) {
      try {
        const { queued_at, ...orderData } = order;
        await fetch("/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderData),
        });
        synced++;
      } catch {
        // Will retry next sync
      }
    }

    if (synced === orders.length) {
      await clearOfflineOrders();
    }

    // Notify client
    const clients = await self.clients.matchAll();
    clients.forEach((client) => {
      client.postMessage({ type: "SYNC_COMPLETE", synced, total: orders.length });
    });
  }
});
