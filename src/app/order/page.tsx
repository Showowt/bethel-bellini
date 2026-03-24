"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

/* ═══════════════════════════════════════════════════
   ISLA OS — Guest Ordering System
   /order?zone=Playa+Bellini
   Offline-capable · WhatsApp-native · Wompi-ready
   ═══════════════════════════════════════════════════ */

const MENU: Record<
  string,
  { name: string; price: number; desc?: string; pop?: boolean }[]
> = {
  Cócteles: [
    {
      name: "Aperol Spritz",
      price: 65000,
      desc: "Aperol, prosecco, soda",
      pop: true,
    },
    {
      name: "Mojito",
      price: 65000,
      desc: "Ron, hierba buena, lima, azúcar de caña",
    },
    {
      name: "Piña Colada",
      price: 65000,
      desc: "Ron de coco, piña fresca, crema de coco",
    },
    { name: "Paloma", price: 65000, desc: "Tequila, toronja, lima, sal" },
    {
      name: "Tequila Sunrise",
      price: 65000,
      desc: "Tequila, jugo de naranja, granadina",
    },
    { name: "Moscow Mule", price: 65000, desc: "Vodka, ginger beer, lima" },
    { name: "Daiquiri", price: 65000, desc: "Ron, limón, azúcar" },
    {
      name: "Margarita Mezcal",
      price: 65000,
      desc: "Mezcal, limón, agave, sal",
      pop: true,
    },
  ],
  Cervezas: [
    {
      name: "Aguila",
      price: 15000,
      desc: "Cerveza colombiana clásica",
      pop: true,
    },
    { name: "Club Colombia Dorada", price: 18000, desc: "Premium lager" },
    { name: "Corona Extra", price: 22000, desc: "Con limón" },
  ],
  Entradas: [
    {
      name: "Rollitos Crocantes",
      price: 65000,
      desc: "Rabo de toro, mayonesa de hongos, queso de cabra",
      pop: true,
    },
    {
      name: "Ceviche de Pescado Blanco",
      price: 65000,
      desc: "Leche de coco, pimientos ahumados, pan ciabatta",
    },
    {
      name: "Tartar de Res",
      price: 65000,
      desc: "Aguacate, masa madre, aceite de trufa blanca",
    },
    {
      name: "Tostada de Salmón",
      price: 60000,
      desc: "Salmón curado 48hrs, queso crema, eneldo",
    },
    {
      name: "Taquitos de Camarón",
      price: 60000,
      desc: "Mantequilla de ajo, vino blanco, paprika",
    },
    {
      name: "Tartar de Atún",
      price: 65000,
      desc: "Mango, aguacate, aceitunas kalamata",
    },
    {
      name: "Pulpo Rostizado",
      price: 65000,
      desc: "Puré cremoso de yuca, chimichurri",
      pop: true,
    },
    {
      name: "Bruschetta Capresse",
      price: 65000,
      desc: "Pesto, tomates, bocconcini, aguacate",
    },
  ],
  Pasta: [
    {
      name: "Penne al Pesto",
      price: 55000,
      desc: "Albahaca, parmesano, nueces",
    },
    {
      name: "Penne a la Carbonara",
      price: 65000,
      desc: "Yema de huevo, parmesano, panceta",
      pop: true,
    },
    {
      name: "Penne a la Marinera",
      price: 65000,
      desc: "Almejas, mejillones, calamar, camarón",
    },
    {
      name: "Penne al Pistacho",
      price: 65000,
      desc: "Pistachos, parmesano, trufa blanca",
    },
  ],
  "Del Mar": [
    {
      name: "Arroz Meloso de Mariscos",
      price: 80000,
      desc: "Mariscos al ajillo, arroz cremoso",
      pop: true,
    },
    {
      name: "Risotto Negro",
      price: 135000,
      desc: "Tinta de calamar, langostinos, paprika",
    },
    {
      name: "Fish & Chips",
      price: 70000,
      desc: "Pescado rebozado, papa artesanal, tártara",
    },
    {
      name: "Mejillones Provenzal",
      price: 70000,
      desc: "Mantequilla de ajo, vino blanco",
    },
    {
      name: "Fettuccini Marinera",
      price: 65000,
      desc: "Mariscos, caldo de pescado, peperoncino",
    },
  ],
  "Cortes Angus": [
    {
      name: "Picaña 350g",
      price: 195000,
      desc: "Grasa dorada crujiente, asado lento",
    },
    {
      name: "Entraña 350g",
      price: 235000,
      desc: "Fino y jugoso, sal marina, mantequilla de hierbas",
    },
    {
      name: "New York 300g",
      price: 235000,
      desc: "Sellado al carbón, jugoso, ahumado",
    },
    {
      name: "Rib Eye 350g",
      price: 285000,
      desc: "Marmoleado, sellado a fuego alto",
      pop: true,
    },
    {
      name: "Cowboy 1 kg",
      price: 650000,
      desc: "Black Angus premium, para compartir",
    },
  ],
  Champagne: [
    { name: "Chandon Brut", price: 230000 },
    { name: "Moët Impérial", price: 900000 },
    { name: "Veuve Clicquot", price: 1100000 },
    { name: "Dom Pérignon", price: 3000000 },
  ],
  "Tragos Premium": [
    { name: "Ojo de Tigre", price: 60000 },
    { name: "SKY Vodka", price: 60000 },
    { name: "Patrón Silver", price: 65000 },
    { name: "Montelobos", price: 70000 },
    { name: "Patrón Reposado", price: 70000 },
    { name: "Grey Goose", price: 85000, pop: true },
    { name: "Don Julio 70", price: 90000, pop: true },
    { name: "Patrón Cristalino", price: 90000 },
  ],
  "Sin Alcohol": [
    { name: "Agua de Coco", price: 12000, desc: "Coco fresco de la isla" },
    { name: "Jugo Natural", price: 15000, desc: "Maracuyá, mango, o lulo" },
    {
      name: "Limonada de Coco",
      price: 18000,
      desc: "Limón, coco, hierba buena",
    },
  ],
};

const CATS = Object.keys(MENU);
const fmt = (n: number) => `$ ${n.toLocaleString("es-CO")}`;

type CartItem = { name: string; price: number; desc?: string; qty: number };

function OrderContent() {
  const params = useSearchParams();
  const zone = params.get("zone") || "Playa Bellini";

  const [cart, setCart] = useState<CartItem[]>([]);
  const [cat, setCat] = useState(CATS[0]);
  const [view, setView] = useState<"menu" | "cart" | "pay" | "done">("menu");
  const [payMethod, setPayMethod] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [online, setOnline] = useState(true);
  const catRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const on = () => setOnline(true);
    const off = () => setOnline(false);
    window.addEventListener("online", on);
    window.addEventListener("offline", off);
    setOnline(navigator.onLine);
    return () => {
      window.removeEventListener("online", on);
      window.removeEventListener("offline", off);
    };
  }, []);

  const add = (item: { name: string; price: number; desc?: string }) => {
    setCart((p) => {
      const e = p.find((c) => c.name === item.name);
      if (e)
        return p.map((c) =>
          c.name === item.name ? { ...c, qty: c.qty + 1 } : c,
        );
      return [...p, { ...item, qty: 1 }];
    });
  };
  const remove = (name: string) =>
    setCart((p) =>
      p
        .map((c) => (c.name === name ? { ...c, qty: c.qty - 1 } : c))
        .filter((c) => c.qty > 0),
    );
  const total = cart.reduce((s, c) => s + c.price * c.qty, 0);
  const count = cart.reduce((s, c) => s + c.qty, 0);

  const submit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setView("done");
    }, 2200);
  };

  // ── DONE ──
  if (view === "done") {
    const orderId = `BB-${Math.floor(Math.random() * 9000 + 1000)}`;
    return (
      <div className="min-h-screen bg-[var(--bb-void)] flex items-center justify-center px-5">
        <div className="max-w-sm w-full text-center">
          <div
            className="w-20 h-20 rounded-full mx-auto mb-5 flex items-center justify-center"
            style={{
              background: "rgba(90,158,111,0.12)",
              border: "1px solid rgba(90,158,111,0.3)",
            }}
          >
            <span className="text-[var(--bb-ok)] text-3xl">✓</span>
          </div>
          <h2 className="text-[var(--bb-cream)] text-2xl font-serif font-light mb-1">
            Pedido Confirmado
          </h2>
          <p className="text-[var(--bb-muted)] text-sm font-sans mb-6">
            Tu orden está en preparación
          </p>

          <div className="glass-panel rounded-2xl p-5 text-left mb-6 space-y-3">
            {[
              ["Orden", orderId, "var(--bb-sand)"],
              ["Zona", zone, "var(--bb-coral)"],
              ["Total", fmt(total), "var(--bb-ok)"],
              ["Tiempo est.", "~8 minutos", "var(--bb-cream)"],
            ].map(([l, v, c]) => (
              <div
                key={l as string}
                className="flex justify-between items-center"
              >
                <span className="text-[var(--bb-muted)] text-xs font-sans">
                  {l}
                </span>
                <span
                  className="font-sans font-semibold text-sm"
                  style={{ color: c as string }}
                >
                  {v}
                </span>
              </div>
            ))}
          </div>

          <div className="glass-panel rounded-xl p-4 mb-6 text-left">
            <p className="text-[var(--bb-muted)] text-xs font-sans leading-relaxed">
              Nuestro runner de zona te llevará tu pedido directamente. Relájate
              y disfruta del paraíso. ✦
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => {
                setCart([]);
                setView("menu");
              }}
              className="flex-1 glass-panel py-3 rounded-lg text-[var(--bb-cream)] text-sm font-sans font-semibold"
            >
              Nuevo Pedido
            </button>
            <Link
              href="/"
              className="flex-1 bg-[var(--bb-sand)] text-[var(--bb-void)] py-3 rounded-lg text-sm font-sans font-bold text-center"
            >
              Volver
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ── PAY ──
  if (view === "pay")
    return (
      <div className="min-h-screen bg-[var(--bb-void)]">
        <div className="sticky top-0 z-10 bg-[var(--bb-void)] border-b border-[var(--bb-line)] px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => setView("cart")}
            className="text-[var(--bb-muted)] font-sans"
          >
            ←
          </button>
          <span className="text-[var(--bb-cream)] text-sm font-sans font-semibold">
            Confirmar Pedido
          </span>
        </div>
        <div className="max-w-sm mx-auto px-5 pt-6">
          <p className="text-[var(--bb-sand)] text-[9px] tracking-[2.5px] font-sans font-semibold mb-4">
            MÉTODO DE PAGO
          </p>
          {[
            {
              id: "balance",
              name: "Mi Balance Bellini",
              desc: "Saldo cargado al llegar",
              icon: "◎",
            },
            {
              id: "nequi",
              name: "Nequi",
              desc: "Push notification instantánea",
              icon: "N",
            },
            {
              id: "card",
              name: "Tarjeta Registrada",
              desc: "Se cobra a tu tarjeta",
              icon: "⬡",
            },
            {
              id: "daviplata",
              name: "Daviplata",
              desc: "Desde tu cuenta",
              icon: "D",
            },
          ].map((m) => (
            <button
              key={m.id}
              onClick={() => setPayMethod(m.id)}
              className={`w-full flex items-center gap-3 p-3.5 rounded-xl mb-2 text-left transition-all ${
                payMethod === m.id
                  ? "bg-[rgba(196,168,130,0.12)] border border-[rgba(196,168,130,0.3)]"
                  : "glass-panel"
              }`}
            >
              <div className="w-9 h-9 rounded-lg glass-panel flex items-center justify-center text-[var(--bb-sand)] text-sm font-sans font-bold shrink-0">
                {m.icon}
              </div>
              <div>
                <div className="text-[var(--bb-cream)] text-sm font-sans font-semibold">
                  {m.name}
                </div>
                <div className="text-[var(--bb-muted)] text-[11px] font-sans">
                  {m.desc}
                </div>
              </div>
            </button>
          ))}

          <div className="glass-panel rounded-2xl p-4 mt-5 mb-5">
            {cart.map((c) => (
              <div
                key={c.name}
                className="flex justify-between py-1.5 border-b border-[var(--bb-line)]"
              >
                <span className="text-[var(--bb-cream)] text-xs font-sans">
                  {c.qty}× {c.name}
                </span>
                <span className="text-[var(--bb-sand-mid)] text-xs font-sans">
                  {fmt(c.price * c.qty)}
                </span>
              </div>
            ))}
            <div className="flex justify-between pt-3">
              <span className="text-[var(--bb-cream)] text-sm font-sans font-bold">
                Total
              </span>
              <span className="text-[var(--bb-ok)] text-lg font-sans font-bold">
                {fmt(total)}
              </span>
            </div>
          </div>

          <button
            onClick={submit}
            disabled={!payMethod || loading}
            className="w-full bg-[var(--bb-sand)] text-[var(--bb-void)] py-3.5 rounded-xl text-sm font-sans font-bold disabled:opacity-40 transition-all"
          >
            {loading ? "Procesando..." : `Confirmar · ${fmt(total)}`}
          </button>
        </div>
      </div>
    );

  // ── CART ──
  if (view === "cart")
    return (
      <div className="min-h-screen bg-[var(--bb-void)]">
        <div className="sticky top-0 z-10 bg-[var(--bb-void)] border-b border-[var(--bb-line)] px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setView("menu")}
              className="text-[var(--bb-muted)] font-sans"
            >
              ←
            </button>
            <span className="text-[var(--bb-cream)] text-sm font-sans font-semibold">
              Tu Pedido
            </span>
          </div>
          <span className="text-[var(--bb-muted)] text-xs font-sans">
            {count} items
          </span>
        </div>
        <div className="max-w-sm mx-auto px-5 pt-4">
          {cart.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-[var(--bb-muted)] text-sm font-sans mb-4">
                Tu pedido está vacío
              </p>
              <button
                onClick={() => setView("menu")}
                className="glass-panel px-6 py-3 rounded-lg text-[var(--bb-cream)] text-sm font-sans font-semibold"
              >
                Ver la Carta
              </button>
            </div>
          ) : (
            <>
              {cart.map((c) => (
                <div
                  key={c.name}
                  className="flex items-center gap-3 py-3.5 border-b border-[var(--bb-line)]"
                >
                  <div className="flex-1">
                    <div className="text-[var(--bb-cream)] text-sm font-sans font-semibold">
                      {c.name}
                    </div>
                    <div className="text-[var(--bb-sand-mid)] text-xs font-sans">
                      {fmt(c.price)} c/u
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <button
                      onClick={() => remove(c.name)}
                      className="w-7 h-7 rounded-full glass-panel text-[var(--bb-muted)] text-sm flex items-center justify-center"
                    >
                      −
                    </button>
                    <span className="text-[var(--bb-cream)] text-sm font-sans font-bold min-w-[20px] text-center">
                      {c.qty}
                    </span>
                    <button
                      onClick={() => add(c)}
                      className="w-7 h-7 rounded-full text-sm flex items-center justify-center"
                      style={{
                        background: "rgba(196,168,130,0.15)",
                        border: "1px solid rgba(196,168,130,0.25)",
                        color: "var(--bb-sand)",
                      }}
                    >
                      +
                    </button>
                  </div>
                  <span className="text-[var(--bb-cream)] text-sm font-sans font-semibold min-w-[70px] text-right">
                    {fmt(c.price * c.qty)}
                  </span>
                </div>
              ))}
              <div className="flex justify-between py-4 border-t-2 border-[rgba(196,168,130,0.15)]">
                <span className="text-[var(--bb-cream)] text-base font-sans font-bold">
                  Total
                </span>
                <span className="text-[var(--bb-sand)] text-xl font-sans font-bold">
                  {fmt(total)}
                </span>
              </div>
              <button
                onClick={() => setView("pay")}
                className="w-full bg-[var(--bb-sand)] text-[var(--bb-void)] py-3.5 rounded-xl text-sm font-sans font-bold"
              >
                Continuar al Pago
              </button>
            </>
          )}
        </div>
      </div>
    );

  // ── MENU ──
  return (
    <div
      className="min-h-screen bg-[var(--bb-void)]"
      style={{ paddingBottom: cart.length > 0 ? 76 : 16 }}
    >
      {/* Offline banner */}
      {!online && (
        <div className="offline-bar px-4 py-2 text-center">
          <span className="text-[var(--bb-warn)] text-[11px] font-sans font-semibold">
            ⚡ Modo Offline — Tu pedido se enviará al reconectar
          </span>
        </div>
      )}

      {/* Header */}
      <div className="sticky top-0 z-10 bg-[var(--bb-void)] border-b border-[var(--bb-line)] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-[var(--bb-muted)] font-sans text-sm">
            ←
          </Link>
          <div>
            <div className="text-[13px] font-serif font-normal text-[var(--bb-cream)] tracking-[1.5px]">
              BETHEL BELLINI
            </div>
            <div className="text-[8px] font-sans text-[var(--bb-muted)] tracking-[2.5px] font-semibold">
              {zone.toUpperCase()}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {!online && (
            <span className="text-[8px] font-sans font-bold px-2 py-0.5 rounded bg-[rgba(196,154,58,0.12)] text-[var(--bb-warn)]">
              OFFLINE
            </span>
          )}
          <div className="text-[8px] font-sans font-bold px-2 py-0.5 rounded bg-[rgba(90,158,111,0.12)] text-[var(--bb-ok)]">
            ISLA OS
          </div>
        </div>
      </div>

      {/* Category tabs */}
      <div
        ref={catRef}
        className="flex gap-1 px-4 py-3 overflow-x-auto border-b border-[var(--bb-line)]"
        style={{ scrollbarWidth: "none" }}
      >
        {CATS.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`px-4 py-1.5 rounded-full text-[11px] font-sans font-semibold whitespace-nowrap transition-all ${
              cat === c
                ? "bg-[rgba(196,168,130,0.15)] text-[var(--bb-sand)]"
                : "text-[var(--bb-muted)]"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Items */}
      <div className="max-w-lg mx-auto px-4 pt-3">
        {MENU[cat]?.map((item) => {
          const inCart = cart.find((c) => c.name === item.name);
          return (
            <div
              key={item.name}
              className="menu-item flex items-start gap-3 py-3.5 px-2 -mx-2 rounded-lg border-b border-[var(--bb-line)]"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[var(--bb-cream)] text-sm font-sans font-semibold">
                    {item.name}
                  </span>
                  {item.pop && (
                    <span className="text-[7px] tracking-[1px] font-sans font-bold px-1.5 py-0.5 rounded bg-[rgba(196,101,74,0.12)] text-[var(--bb-coral)]">
                      POPULAR
                    </span>
                  )}
                </div>
                {item.desc && (
                  <p className="text-[var(--bb-muted)] text-[11px] font-sans leading-relaxed mt-0.5">
                    {item.desc}
                  </p>
                )}
                <div className="text-[var(--bb-sand-mid)] text-sm font-sans font-semibold mt-1">
                  {fmt(item.price)}
                </div>
              </div>
              {inCart ? (
                <div className="flex items-center gap-2 shrink-0 pt-1">
                  <button
                    onClick={() => remove(item.name)}
                    className="w-7 h-7 rounded-full glass-panel text-[var(--bb-muted)] text-sm flex items-center justify-center"
                  >
                    −
                  </button>
                  <span className="text-[var(--bb-cream)] text-sm font-sans font-bold">
                    {inCart.qty}
                  </span>
                  <button
                    onClick={() => add(item)}
                    className="w-7 h-7 rounded-full text-sm flex items-center justify-center"
                    style={{
                      background: "rgba(196,168,130,0.15)",
                      border: "1px solid rgba(196,168,130,0.25)",
                      color: "var(--bb-sand)",
                    }}
                  >
                    +
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => add(item)}
                  className="w-9 h-9 rounded-xl glass-panel text-[var(--bb-sand)] text-lg flex items-center justify-center shrink-0 mt-1 hover:bg-[rgba(196,168,130,0.12)] transition-all"
                >
                  +
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Floating cart bar */}
      {cart.length > 0 && (
        <div
          className="cart-bar fixed bottom-0 left-0 right-0 px-4 py-3 z-20"
          style={{
            background: "var(--bb-earth)",
            borderTop: "1px solid rgba(196,168,130,0.2)",
          }}
        >
          <button
            onClick={() => setView("cart")}
            className="w-full flex items-center justify-between bg-[var(--bb-sand)] text-[var(--bb-void)] px-5 py-3.5 rounded-xl"
          >
            <span className="text-sm font-sans font-bold">
              Ver Pedido · {count} {count === 1 ? "item" : "items"}
            </span>
            <span className="text-base font-sans font-bold">{fmt(total)}</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default function OrderPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[var(--bb-void)] flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-serif font-light text-[var(--bb-cream)] tracking-[3px] mb-2">
              BETHEL BELLINI
            </div>
            <div className="text-[9px] font-sans text-[var(--bb-muted)] tracking-[2px]">
              Cargando carta...
            </div>
          </div>
        </div>
      }
    >
      <OrderContent />
    </Suspense>
  );
}
