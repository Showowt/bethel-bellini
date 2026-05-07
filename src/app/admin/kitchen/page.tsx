"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type OrderStatus = "pending" | "preparing" | "ready" | "delivered" | "cancelled";

interface OrderItem {
  id: string;
  item_name: string;
  item_price: number;
  quantity: number;
  notes: string | null;
}

interface KitchenOrder {
  id: string;
  order_number: string;
  zone: string;
  status: OrderStatus;
  total: number;
  notes: string | null;
  created_at: string;
  order_items: OrderItem[];
  guest_sessions: {
    band_id: string;
    zone: string | null;
    guests: { name: string; phone: string } | null;
  } | null;
}

const STATUS_CONFIG: Record<
  OrderStatus,
  { label: string; color: string; bg: string; border: string }
> = {
  pending: {
    label: "NUEVO",
    color: "text-yellow-300",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/30",
  },
  preparing: {
    label: "PREPARANDO",
    color: "text-[var(--bb-ocean)]",
    bg: "bg-[rgba(42,107,124,0.1)]",
    border: "border-[rgba(42,107,124,0.3)]",
  },
  ready: {
    label: "LISTO",
    color: "text-[var(--bb-ok)]",
    bg: "bg-[rgba(90,158,111,0.1)]",
    border: "border-[rgba(90,158,111,0.3)]",
  },
  delivered: {
    label: "ENTREGADO",
    color: "text-[var(--bb-muted)]",
    bg: "bg-[var(--bb-faint)]",
    border: "border-[var(--bb-line)]",
  },
  cancelled: {
    label: "CANCELADO",
    color: "text-[var(--bb-coral)]",
    bg: "bg-[rgba(196,101,74,0.1)]",
    border: "border-[rgba(196,101,74,0.3)]",
  },
};

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Ahora";
  if (mins < 60) return `${mins}m`;
  return `${Math.floor(mins / 60)}h ${mins % 60}m`;
}

export default function KitchenDisplay() {
  const [orders, setOrders] = useState<KitchenOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"active" | "all">("active");
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const pin = sessionStorage.getItem("bb-admin-pin");
    if (!pin) {
      router.push("/admin/login");
      return;
    }
    setAuthenticated(true);
  }, [router]);

  const fetchOrders = useCallback(async () => {
    try {
      const statusFilter =
        filter === "active" ? "?status=pending&status=preparing&status=ready" : "";
      const res = await fetch(`/api/orders${statusFilter || "?limit=100"}`);
      const data = await res.json();
      setOrders(data.orders || []);
    } catch (error) {
      console.error("[Kitchen] Fetch error:", error);
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    if (authenticated) {
      fetchOrders();
    }
  }, [fetchOrders, authenticated]);

  // Real-time subscription
  useEffect(() => {
    if (!authenticated) return;

    const supabase = createClient();
    const channel = supabase
      .channel("kitchen-orders")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "orders",
        },
        () => {
          fetchOrders();
          // Play notification sound for new orders
          if (audioRef.current) {
            audioRef.current.play().catch(() => {});
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchOrders, authenticated]);

  // Auto-refresh every 30s
  useEffect(() => {
    if (!authenticated) return;
    const interval = setInterval(fetchOrders, 30000);
    return () => clearInterval(interval);
  }, [fetchOrders, authenticated]);

  const updateStatus = async (orderId: string, newStatus: OrderStatus) => {
    try {
      const pin = sessionStorage.getItem("bb-admin-pin");
      await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-pin": pin || "",
        },
        body: JSON.stringify({ status: newStatus }),
      });
      fetchOrders();
    } catch (error) {
      console.error("[Kitchen] Update error:", error);
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--bb-void)" }}>
        <div className="animate-spin w-8 h-8 border-2 border-[var(--bb-sand)] border-t-transparent rounded-full" />
      </div>
    );
  }

  const pendingOrders = orders.filter((o) => o.status === "pending");
  const preparingOrders = orders.filter((o) => o.status === "preparing");
  const readyOrders = orders.filter((o) => o.status === "ready");

  return (
    <div className="min-h-screen" style={{ background: "var(--bb-void)" }}>
      {/* Notification sound */}
      <audio ref={audioRef} preload="none">
        <source
          src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbsGczEjlmjL3f2I9aKBd"
          type="audio/wav"
        />
      </audio>

      {/* Header */}
      <header
        className="sticky top-0 z-30 px-4 py-3 flex items-center justify-between"
        style={{
          background: "rgba(10,9,7,0.95)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid var(--bb-line)",
        }}
      >
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-serif font-light text-[var(--bb-cream)]">
            Cocina
          </h1>
          <span className="text-[var(--bb-sand)] text-[9px] tracking-[2px] font-sans font-semibold">
            BETHEL BELLINI
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex gap-1">
            <button
              onClick={() => setFilter("active")}
              className={`px-3 py-1.5 text-[10px] font-sans font-semibold transition-colors ${
                filter === "active"
                  ? "bg-[var(--bb-sand)] text-[var(--bb-void)]"
                  : "text-[var(--bb-muted)] hover:text-[var(--bb-cream)]"
              }`}
            >
              Activas
            </button>
            <button
              onClick={() => setFilter("all")}
              className={`px-3 py-1.5 text-[10px] font-sans font-semibold transition-colors ${
                filter === "all"
                  ? "bg-[var(--bb-sand)] text-[var(--bb-void)]"
                  : "text-[var(--bb-muted)] hover:text-[var(--bb-cream)]"
              }`}
            >
              Todas
            </button>
          </div>
          <button
            onClick={fetchOrders}
            className="text-[var(--bb-muted)] hover:text-[var(--bb-cream)] text-sm font-sans transition-colors"
          >
            ↻
          </button>
          <a
            href="/admin"
            className="text-[var(--bb-muted)] hover:text-[var(--bb-cream)] text-xs font-sans"
          >
            Admin
          </a>
        </div>
      </header>

      {/* Stats Bar */}
      <div className="flex gap-4 px-4 py-3 border-b border-[var(--bb-line)]">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
          <span className="text-yellow-300 text-xs font-sans font-semibold">
            {pendingOrders.length} nuevas
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[var(--bb-ocean)]" />
          <span className="text-[var(--bb-ocean)] text-xs font-sans font-semibold">
            {preparingOrders.length} preparando
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[var(--bb-ok)]" />
          <span className="text-[var(--bb-ok)] text-xs font-sans font-semibold">
            {readyOrders.length} listas
          </span>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin w-8 h-8 border-2 border-[var(--bb-sand)] border-t-transparent rounded-full" />
        </div>
      ) : orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <p className="text-[var(--bb-muted)] text-lg font-sans mb-2">
            Sin ordenes activas
          </p>
          <p className="text-[var(--bb-muted)] text-xs font-sans opacity-50">
            Las nuevas ordenes apareceran automaticamente
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-4">
          {orders
            .filter((o) =>
              filter === "active"
                ? ["pending", "preparing", "ready"].includes(o.status)
                : true,
            )
            .map((order) => {
              const config = STATUS_CONFIG[order.status];
              return (
                <div
                  key={order.id}
                  className={`rounded-lg border ${config.border} ${config.bg} overflow-hidden`}
                >
                  {/* Order header */}
                  <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--bb-line)]">
                    <div>
                      <span className="text-[var(--bb-cream)] text-sm font-sans font-bold">
                        {order.order_number}
                      </span>
                      <span className={`ml-2 text-[10px] font-sans font-semibold tracking-wider ${config.color}`}>
                        {config.label}
                      </span>
                    </div>
                    <span className="text-[var(--bb-muted)] text-xs font-sans">
                      {timeAgo(order.created_at)}
                    </span>
                  </div>

                  {/* Zone & Guest */}
                  <div className="px-4 py-2 flex items-center justify-between border-b border-[var(--bb-line)]">
                    <span className="text-[var(--bb-sand)] text-xs font-sans font-semibold">
                      {order.zone}
                    </span>
                    <span className="text-[var(--bb-muted)] text-[10px] font-sans">
                      {order.guest_sessions?.band_id && `#${order.guest_sessions.band_id}`}
                      {order.guest_sessions?.guests?.name &&
                        ` · ${order.guest_sessions.guests.name}`}
                    </span>
                  </div>

                  {/* Items */}
                  <div className="px-4 py-3">
                    {order.order_items.map((item) => (
                      <div key={item.id} className="flex justify-between py-1">
                        <span className="text-[var(--bb-cream)] text-sm font-sans">
                          <span className="text-[var(--bb-sand)] font-bold mr-1">
                            {item.quantity}x
                          </span>
                          {item.item_name}
                        </span>
                      </div>
                    ))}
                    {order.notes && (
                      <p className="text-[var(--bb-warn)] text-xs font-sans mt-2 italic">
                        Nota: {order.notes}
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="px-4 py-3 flex gap-2 border-t border-[var(--bb-line)]">
                    {order.status === "pending" && (
                      <button
                        onClick={() => updateStatus(order.id, "preparing")}
                        className="flex-1 py-2 text-xs font-sans font-bold text-[var(--bb-void)] bg-[var(--bb-ocean)] hover:brightness-110 transition-all rounded"
                      >
                        PREPARAR
                      </button>
                    )}
                    {order.status === "preparing" && (
                      <button
                        onClick={() => updateStatus(order.id, "ready")}
                        className="flex-1 py-2 text-xs font-sans font-bold text-[var(--bb-void)] bg-[var(--bb-ok)] hover:brightness-110 transition-all rounded"
                      >
                        LISTO
                      </button>
                    )}
                    {order.status === "ready" && (
                      <button
                        onClick={() => updateStatus(order.id, "delivered")}
                        className="flex-1 py-2 text-xs font-sans font-bold text-[var(--bb-void)] bg-[var(--bb-sand)] hover:brightness-110 transition-all rounded"
                      >
                        ENTREGADO
                      </button>
                    )}
                    {["pending", "preparing"].includes(order.status) && (
                      <button
                        onClick={() => updateStatus(order.id, "cancelled")}
                        className="py-2 px-3 text-xs font-sans text-[var(--bb-coral)] border border-[var(--bb-coral)] hover:bg-[rgba(196,101,74,0.1)] transition-all rounded"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}
