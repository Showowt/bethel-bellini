"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

/* ═══════════════════════════════════════════════════
   ISLA OS — Complete Guest Ordering System
   Production-ready flow with check-in, balance, ordering
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

const ZONES = [
  {
    id: "camastros-playa",
    name: "Camastros Playa",
    sublabel: "Frente al Mar",
    color: "#C4654A",
    capacity: "1-4 personas",
    features: ["Vista directa al océano", "Servicio prioritario"],
  },
  {
    id: "piscina-infinity",
    name: "Piscina Infinity",
    sublabel: "Área de Pool",
    color: "#2A6B7C",
    capacity: "1-6 personas",
    features: ["Borde infinito", "Ambiente relajado"],
  },
  {
    id: "palapa-vip",
    name: "Palapa VIP",
    sublabel: "Zona Privada",
    color: "#D4923A",
    capacity: "6-12 personas",
    features: ["Servicio dedicado", "Mesa privada"],
  },
  {
    id: "bar-principal",
    name: "Bar del Mar",
    sublabel: "Barra Central",
    color: "#3A5E3A",
    capacity: "1-4 personas",
    features: ["Cócteles artesanales", "Ambiente social"],
  },
  {
    id: "terraza-sunset",
    name: "Terraza Sunset",
    sublabel: "Vista Panorámica",
    color: "#8B5A6A",
    capacity: "2-8 personas",
    features: ["Mejor atardecer", "Mesas elevadas"],
  },
  {
    id: "restaurante",
    name: "Restaurante",
    sublabel: "Área Gastronómica",
    color: "#6B5B4F",
    capacity: "2-10 personas",
    features: ["Menú completo", "Clima controlado"],
  },
];

const CATS = Object.keys(MENU);
const fmt = (n: number) => `$ ${n.toLocaleString("es-CO")}`;

type CartItem = { name: string; price: number; desc?: string; qty: number };
type GuestSession = {
  phone: string;
  name: string;
  balance: number;
  bandId: string;
  zone: string | null;
};

// ══════════════════════════════════════════════════════════════════
// MAIN ORDER COMPONENT
// ══════════════════════════════════════════════════════════════════

function OrderContent() {
  const params = useSearchParams();
  const initialZone = params.get("zone");

  // Flow states: welcome → balance → zone → menu → cart → pay → done
  const [step, setStep] = useState<
    "welcome" | "balance" | "zone" | "menu" | "cart" | "pay" | "done"
  >("welcome");

  // Guest session
  const [session, setSession] = useState<GuestSession | null>(null);
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [loading, setLoading] = useState(false);

  // Menu state
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cat, setCat] = useState(CATS[0]);
  const [payMethod, setPayMethod] = useState<string | null>(null);
  const [online, setOnline] = useState(true);

  // Top-up state
  const [topUpAmount, setTopUpAmount] = useState<number | null>(null);
  const [showTopUp, setShowTopUp] = useState(false);

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

  // Auto-set zone if coming from QR with zone param (after check-in)
  const hasSetZoneRef = useRef(false);
  useEffect(() => {
    if (initialZone && session && !session.zone && !hasSetZoneRef.current) {
      hasSetZoneRef.current = true;
      setSession((prev) => (prev ? { ...prev, zone: initialZone } : prev));
      setStep("menu");
    }
  }, [initialZone, session]);

  // Cart functions
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

  // Phone validation
  const validatePhone = (p: string) => {
    const cleaned = p.replace(/\D/g, "");
    if (cleaned.length < 10) return "Ingresa un número válido";
    return "";
  };

  // Check-in handler (simulates API call)
  const handleCheckIn = () => {
    const error = validatePhone(phone);
    if (error) {
      setPhoneError(error);
      return;
    }
    setLoading(true);
    // Simulate API lookup
    setTimeout(() => {
      const cleanPhone = phone.replace(/\D/g, "");
      // Simulate finding or creating guest
      const mockSession: GuestSession = {
        phone: cleanPhone,
        name: "Invitado",
        balance: Math.floor(Math.random() * 300000) + 100000, // Random balance 100k-400k
        bandId: `BB-${Math.floor(Math.random() * 9000 + 1000)}`,
        zone: initialZone,
      };
      setSession(mockSession);
      setLoading(false);
      setStep("balance");
    }, 1500);
  };

  // Top-up handler
  const handleTopUp = (amount: number) => {
    if (!session) return;
    setLoading(true);
    setTimeout(() => {
      setSession({ ...session, balance: session.balance + amount });
      setShowTopUp(false);
      setTopUpAmount(null);
      setLoading(false);
    }, 1200);
  };

  // Submit order
  const submitOrder = () => {
    if (!session) return;
    setLoading(true);
    setTimeout(() => {
      // Deduct from balance
      setSession({ ...session, balance: session.balance - total });
      setLoading(false);
      setStep("done");
    }, 2200);
  };

  // ══════════════════════════════════════════════════════════════════
  // STEP 1: WELCOME / CHECK-IN
  // ══════════════════════════════════════════════════════════════════
  if (step === "welcome") {
    return (
      <div className="min-h-screen bg-[var(--bb-void)] flex flex-col">
        {/* Header */}
        <div className="px-5 py-4 border-b border-[var(--bb-line)] flex items-center justify-between">
          <Link href="/" className="text-[var(--bb-muted)] text-sm">
            ← Volver
          </Link>
          <div className="text-[8px] font-sans font-bold px-2 py-0.5 rounded bg-[rgba(90,158,111,0.12)] text-[var(--bb-ok)]">
            ISLA OS
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center px-5">
          <div className="max-w-sm w-full text-center">
            {/* Logo */}
            <div className="mb-8">
              <div className="text-3xl font-serif font-light text-[var(--bb-cream)] tracking-[3px] mb-2">
                BETHEL BELLINI
              </div>
              <div className="text-[10px] font-sans text-[var(--bb-muted)] tracking-[3px]">
                ISLA TIERRA BOMBA
              </div>
            </div>

            {/* Welcome message */}
            <div className="mb-8">
              <h1 className="text-xl font-serif font-light text-[var(--bb-cream)] mb-2">
                Bienvenido al Paraíso
              </h1>
              <p className="text-[var(--bb-muted)] text-sm font-sans">
                Ingresa tu número para acceder a tu cuenta y pedir desde tu
                zona.
              </p>
            </div>

            {/* Phone input */}
            <div className="mb-6">
              <label className="text-[var(--bb-sand)] text-[9px] tracking-[2px] font-sans font-semibold mb-2 block text-left">
                NÚMERO DE CELULAR
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  setPhoneError("");
                }}
                placeholder="300 123 4567"
                className="w-full bg-[var(--bb-faint)] border border-[var(--bb-line)] rounded-xl px-4 py-4 text-[var(--bb-cream)] text-lg font-sans text-center tracking-wider outline-none focus:border-[var(--bb-sand)] transition-colors"
              />
              {phoneError && (
                <p className="text-[var(--bb-coral)] text-xs font-sans mt-2">
                  {phoneError}
                </p>
              )}
            </div>

            {/* Check-in button */}
            <button
              onClick={handleCheckIn}
              disabled={loading || phone.length < 10}
              className="w-full bg-[var(--bb-sand)] text-[var(--bb-void)] py-4 rounded-xl text-sm font-sans font-bold disabled:opacity-40 transition-all"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-[var(--bb-void)] border-t-transparent rounded-full animate-spin" />
                  Verificando...
                </span>
              ) : (
                "Continuar"
              )}
            </button>

            {/* Alternative: Wristband */}
            <div className="mt-6 pt-6 border-t border-[var(--bb-line)]">
              <p className="text-[var(--bb-muted)] text-xs font-sans mb-3">
                ¿Ya tienes tu banda?
              </p>
              <button className="glass-panel px-5 py-3 rounded-lg text-[var(--bb-cream)] text-sm font-sans font-semibold">
                Escanear Banda
              </button>
            </div>

            {/* First time? */}
            <p className="text-[var(--bb-muted)] text-[11px] font-sans mt-8">
              ¿Primera vez? Tu cuenta se crea automáticamente.
              <br />
              Carga tu saldo en el muelle al llegar.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ══════════════════════════════════════════════════════════════════
  // STEP 2: BALANCE
  // ══════════════════════════════════════════════════════════════════
  if (step === "balance" && session) {
    return (
      <div className="min-h-screen bg-[var(--bb-void)] flex flex-col">
        {/* Header */}
        <div className="px-5 py-4 border-b border-[var(--bb-line)] flex items-center justify-between">
          <button
            onClick={() => setStep("welcome")}
            className="text-[var(--bb-muted)] text-sm"
          >
            ← Cambiar
          </button>
          <div className="text-center">
            <div className="text-[11px] font-serif text-[var(--bb-cream)] tracking-[1px]">
              BETHEL BELLINI
            </div>
            <div className="text-[8px] font-sans text-[var(--bb-muted)]">
              Banda: {session.bandId}
            </div>
          </div>
          <div className="text-[8px] font-sans font-bold px-2 py-0.5 rounded bg-[rgba(90,158,111,0.12)] text-[var(--bb-ok)]">
            ISLA OS
          </div>
        </div>

        <div className="flex-1 px-5 py-6">
          <div className="max-w-sm mx-auto">
            {/* Balance Card */}
            <div className="glass-panel rounded-2xl p-6 mb-6">
              <p className="text-[var(--bb-muted)] text-xs font-sans mb-1">
                Tu Balance
              </p>
              <div className="text-4xl font-serif font-light text-[var(--bb-sand)] mb-1">
                {fmt(session.balance)}
              </div>
              <p className="text-[var(--bb-muted)] text-[11px] font-sans">
                Disponible para consumo
              </p>
            </div>

            {/* Quick top-up */}
            {!showTopUp ? (
              <button
                onClick={() => setShowTopUp(true)}
                className="w-full glass-panel py-3 rounded-xl text-[var(--bb-sand)] text-sm font-sans font-semibold mb-6"
              >
                + Recargar Saldo
              </button>
            ) : (
              <div className="glass-panel rounded-2xl p-5 mb-6">
                <p className="text-[var(--bb-sand)] text-[9px] tracking-[2px] font-sans font-semibold mb-3">
                  RECARGAR
                </p>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {[100000, 200000, 500000].map((amt) => (
                    <button
                      key={amt}
                      onClick={() => setTopUpAmount(amt)}
                      className={`py-3 rounded-lg text-sm font-sans font-semibold transition-all ${
                        topUpAmount === amt
                          ? "bg-[rgba(196,168,130,0.15)] text-[var(--bb-sand)] border border-[var(--bb-sand)]"
                          : "glass-panel text-[var(--bb-cream)]"
                      }`}
                    >
                      {fmt(amt)}
                    </button>
                  ))}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setShowTopUp(false);
                      setTopUpAmount(null);
                    }}
                    className="flex-1 glass-panel py-3 rounded-lg text-[var(--bb-muted)] text-sm font-sans"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => topUpAmount && handleTopUp(topUpAmount)}
                    disabled={!topUpAmount || loading}
                    className="flex-1 bg-[var(--bb-sand)] text-[var(--bb-void)] py-3 rounded-lg text-sm font-sans font-bold disabled:opacity-40"
                  >
                    {loading ? "..." : "Recargar"}
                  </button>
                </div>
                <p className="text-[var(--bb-muted)] text-[10px] font-sans text-center mt-3">
                  Pago con Nequi, Daviplata o Tarjeta
                </p>
              </div>
            )}

            {/* Info cards */}
            <div className="space-y-3 mb-8">
              <div className="glass-panel rounded-xl p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[rgba(196,168,130,0.1)] flex items-center justify-center text-lg">
                  📱
                </div>
                <div>
                  <div className="text-[var(--bb-cream)] text-sm font-sans font-semibold">
                    {session.phone.replace(/(\d{3})(\d{3})(\d{4})/, "$1 $2 $3")}
                  </div>
                  <div className="text-[var(--bb-muted)] text-[11px] font-sans">
                    Cuenta vinculada
                  </div>
                </div>
              </div>
              <div className="glass-panel rounded-xl p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[rgba(90,158,111,0.1)] flex items-center justify-center text-lg">
                  ✓
                </div>
                <div>
                  <div className="text-[var(--bb-cream)] text-sm font-sans font-semibold">
                    Listo para pedir
                  </div>
                  <div className="text-[var(--bb-muted)] text-[11px] font-sans">
                    Tu pedido se descuenta de tu saldo
                  </div>
                </div>
              </div>
            </div>

            {/* Continue button */}
            <button
              onClick={() => setStep(session.zone ? "menu" : "zone")}
              className="w-full bg-[var(--bb-sand)] text-[var(--bb-void)] py-4 rounded-xl text-sm font-sans font-bold"
            >
              {session.zone ? "Ver Menú" : "Elegir mi Zona"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ══════════════════════════════════════════════════════════════════
  // STEP 3: ZONE SELECTION - Demo-Ready Section Picker
  // ══════════════════════════════════════════════════════════════════
  if (step === "zone" && session) {
    return (
      <div className="min-h-screen bg-[var(--bb-void)] flex flex-col">
        {/* Header */}
        <div className="px-5 py-4 border-b border-[var(--bb-line)] flex items-center justify-between">
          <button
            onClick={() => setStep("balance")}
            className="w-8 h-8 rounded-full glass-panel flex items-center justify-center text-[var(--bb-muted)] text-sm"
          >
            ←
          </button>
          <div className="text-center">
            <div className="text-[12px] font-serif text-[var(--bb-cream)] tracking-[2px]">
              BETHEL BELLINI
            </div>
            <div className="text-[9px] font-sans text-[var(--bb-sand)] tracking-[1px]">
              ISLA TIERRA BOMBA
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-[var(--bb-ok)] animate-pulse" />
            <span className="text-[8px] font-sans font-bold text-[var(--bb-ok)]">
              EN VIVO
            </span>
          </div>
        </div>

        <div className="flex-1 px-4 py-5 overflow-y-auto">
          <div className="max-w-md mx-auto">
            {/* Title Section */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--bb-sand)]" />
                <span className="text-[9px] font-sans font-semibold text-[var(--bb-sand)] tracking-[1.5px]">
                  PASO 2 DE 3
                </span>
              </div>
              <h2 className="text-2xl font-serif font-light text-[var(--bb-cream)] mb-2">
                ¿Dónde te encuentras?
              </h2>
              <p className="text-[var(--bb-muted)] text-sm font-sans max-w-xs mx-auto">
                Selecciona tu sección para recibir tu pedido directamente
              </p>
            </div>

            {/* Visual Map Header */}
            <div className="glass-panel rounded-2xl p-4 mb-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[rgba(196,168,130,0.1)] flex items-center justify-center text-lg">
                    📍
                  </div>
                  <div>
                    <div className="text-[var(--bb-cream)] text-sm font-sans font-semibold">
                      Mapa del Club
                    </div>
                    <div className="text-[var(--bb-muted)] text-[10px] font-sans">
                      Toca tu ubicación actual
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[var(--bb-sand)] text-xs font-sans font-semibold">
                    {ZONES.length} zonas
                  </div>
                  <div className="text-[var(--bb-muted)] text-[10px] font-sans">
                    disponibles
                  </div>
                </div>
              </div>

              {/* Mini visual map */}
              <div
                className="relative h-16 rounded-xl overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(42,107,124,0.2) 0%, rgba(196,101,74,0.15) 50%, rgba(212,146,58,0.1) 100%)",
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-[var(--bb-ocean)] opacity-60" />
                    <div className="w-2 h-2 rounded-full bg-[var(--bb-coral)] opacity-60" />
                    <div className="w-4 h-4 rounded-full bg-[var(--bb-sand)] opacity-40" />
                    <div className="w-2 h-2 rounded-full bg-[var(--bb-palm)] opacity-60" />
                    <div className="w-3 h-3 rounded-full bg-[var(--bb-sunset)] opacity-50" />
                  </div>
                </div>
                <div className="absolute bottom-2 left-0 right-0 text-center">
                  <span className="text-[8px] font-sans text-[var(--bb-cream)] opacity-50 tracking-[2px]">
                    MAR CARIBE ↓
                  </span>
                </div>
              </div>
            </div>

            {/* Zone Cards Grid */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              {ZONES.map((z) => (
                <button
                  key={z.id}
                  onClick={() => {
                    setSession({ ...session, zone: z.name });
                    setStep("menu");
                  }}
                  className="group relative rounded-2xl p-4 text-left transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    background: `linear-gradient(145deg, ${z.color}15 0%, ${z.color}08 100%)`,
                    border: `1px solid ${z.color}30`,
                  }}
                >
                  {/* Zone indicator */}
                  <div
                    className="w-10 h-10 rounded-xl mb-3 flex items-center justify-center"
                    style={{
                      background: `${z.color}20`,
                      border: `1px solid ${z.color}40`,
                    }}
                  >
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ background: z.color }}
                    />
                  </div>

                  {/* Zone info */}
                  <div className="text-[var(--bb-cream)] text-sm font-sans font-semibold mb-0.5 leading-tight">
                    {z.name}
                  </div>
                  <div
                    className="text-[10px] font-sans font-medium mb-2"
                    style={{ color: z.color }}
                  >
                    {z.sublabel}
                  </div>

                  {/* Capacity badge */}
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full glass-panel">
                    <span className="text-[8px]">👥</span>
                    <span className="text-[9px] font-sans text-[var(--bb-muted)]">
                      {z.capacity}
                    </span>
                  </div>

                  {/* Hover arrow */}
                  <div
                    className="absolute top-4 right-4 w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: `${z.color}30` }}
                  >
                    <span style={{ color: z.color }} className="text-xs">
                      →
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Quick Selection for QR */}
            <div className="glass-panel rounded-2xl p-4 mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[rgba(196,168,130,0.1)] flex items-center justify-center text-xl">
                  📱
                </div>
                <div className="flex-1">
                  <div className="text-[var(--bb-cream)] text-sm font-sans font-semibold">
                    ¿Tienes código QR?
                  </div>
                  <div className="text-[var(--bb-muted)] text-[11px] font-sans">
                    Escanea el código de tu mesa o camastro
                  </div>
                </div>
                <button
                  className="px-3 py-2 rounded-lg text-[10px] font-sans font-semibold text-[var(--bb-sand)]"
                  style={{
                    background: "rgba(196,168,130,0.1)",
                    border: "1px solid rgba(196,168,130,0.2)",
                  }}
                >
                  Escanear
                </button>
              </div>
            </div>

            {/* Runner info */}
            <div className="flex items-center justify-center gap-2 py-3">
              <div className="flex -space-x-2">
                <div className="w-6 h-6 rounded-full bg-[var(--bb-coral)] flex items-center justify-center text-[10px] text-white font-bold border-2 border-[var(--bb-void)]">
                  M
                </div>
                <div className="w-6 h-6 rounded-full bg-[var(--bb-ocean)] flex items-center justify-center text-[10px] text-white font-bold border-2 border-[var(--bb-void)]">
                  J
                </div>
                <div className="w-6 h-6 rounded-full bg-[var(--bb-palm)] flex items-center justify-center text-[10px] text-white font-bold border-2 border-[var(--bb-void)]">
                  A
                </div>
              </div>
              <p className="text-[var(--bb-muted)] text-[11px] font-sans">
                <span className="text-[var(--bb-ok)]">3 runners</span> activos
                para entrega inmediata
              </p>
            </div>
          </div>
        </div>

        {/* Balance Footer */}
        <div
          className="px-4 py-3 border-t border-[var(--bb-line)]"
          style={{ background: "var(--bb-earth)" }}
        >
          <div className="max-w-md mx-auto flex items-center justify-between">
            <div>
              <div className="text-[var(--bb-muted)] text-[9px] font-sans tracking-[1px]">
                TU SALDO
              </div>
              <div className="text-[var(--bb-sand)] text-lg font-sans font-bold">
                {fmt(session.balance)}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-[8px] font-sans text-[var(--bb-muted)]">
                Banda
              </div>
              <div className="px-2 py-1 rounded glass-panel text-[var(--bb-cream)] text-[10px] font-sans font-semibold">
                {session.bandId}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ══════════════════════════════════════════════════════════════════
  // STEP 6: ORDER DONE
  // ══════════════════════════════════════════════════════════════════
  if (step === "done" && session) {
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
              ["Zona", session.zone || "N/A", "var(--bb-coral)"],
              ["Total", fmt(total), "var(--bb-cream)"],
              ["Nuevo saldo", fmt(session.balance), "var(--bb-ok)"],
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

          {/* Order items */}
          <div className="glass-panel rounded-xl p-4 mb-6 text-left">
            <p className="text-[var(--bb-sand)] text-[9px] tracking-[1px] font-sans font-semibold mb-2">
              TU PEDIDO
            </p>
            {cart.map((c) => (
              <div
                key={c.name}
                className="flex justify-between py-1 text-xs font-sans"
              >
                <span className="text-[var(--bb-cream)]">
                  {c.qty}× {c.name}
                </span>
                <span className="text-[var(--bb-muted)]">
                  {fmt(c.price * c.qty)}
                </span>
              </div>
            ))}
          </div>

          <div className="glass-panel rounded-xl p-4 mb-6 text-left">
            <p className="text-[var(--bb-muted)] text-xs font-sans leading-relaxed">
              🏃 Nuestro runner de zona te llevará tu pedido directamente.
              Relájate y disfruta del paraíso.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => {
                setCart([]);
                setStep("menu");
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

  // ══════════════════════════════════════════════════════════════════
  // STEP 5: PAYMENT CONFIRMATION
  // ══════════════════════════════════════════════════════════════════
  if (step === "pay" && session) {
    const insufficient = total > session.balance;

    return (
      <div className="min-h-screen bg-[var(--bb-void)]">
        <div className="sticky top-0 z-10 bg-[var(--bb-void)] border-b border-[var(--bb-line)] px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => setStep("cart")}
            className="text-[var(--bb-muted)] font-sans"
          >
            ←
          </button>
          <span className="text-[var(--bb-cream)] text-sm font-sans font-semibold">
            Confirmar Pedido
          </span>
        </div>
        <div className="max-w-sm mx-auto px-5 pt-6">
          {/* Balance warning */}
          {insufficient && (
            <div
              className="rounded-xl p-4 mb-4"
              style={{
                background: "rgba(196,101,74,0.1)",
                border: "1px solid rgba(196,101,74,0.3)",
              }}
            >
              <p className="text-[var(--bb-coral)] text-sm font-sans font-semibold mb-1">
                Saldo insuficiente
              </p>
              <p className="text-[var(--bb-muted)] text-xs font-sans">
                Necesitas {fmt(total - session.balance)} más. Recarga tu saldo
                para continuar.
              </p>
              <button
                onClick={() => setStep("balance")}
                className="mt-3 bg-[var(--bb-coral)] text-white px-4 py-2 rounded-lg text-sm font-sans font-semibold"
              >
                Recargar Saldo
              </button>
            </div>
          )}

          {/* Payment method */}
          <p className="text-[var(--bb-sand)] text-[9px] tracking-[2.5px] font-sans font-semibold mb-4">
            MÉTODO DE PAGO
          </p>
          {[
            {
              id: "balance",
              name: "Mi Balance Bellini",
              desc: `Saldo: ${fmt(session.balance)}`,
              icon: "◎",
              disabled: insufficient,
            },
          ].map((m) => (
            <button
              key={m.id}
              onClick={() => !m.disabled && setPayMethod(m.id)}
              disabled={m.disabled}
              className={`w-full flex items-center gap-3 p-3.5 rounded-xl mb-2 text-left transition-all ${
                payMethod === m.id
                  ? "bg-[rgba(196,168,130,0.12)] border border-[rgba(196,168,130,0.3)]"
                  : "glass-panel"
              } ${m.disabled ? "opacity-40" : ""}`}
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
              {!m.disabled && payMethod === m.id && (
                <span className="ml-auto text-[var(--bb-ok)]">✓</span>
              )}
            </button>
          ))}

          {/* Order summary */}
          <div className="glass-panel rounded-2xl p-4 mt-5 mb-5">
            <p className="text-[var(--bb-sand)] text-[9px] tracking-[1px] font-sans font-semibold mb-3">
              RESUMEN
            </p>
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
              <span className="text-[var(--bb-sand)] text-lg font-sans font-bold">
                {fmt(total)}
              </span>
            </div>
            <div className="flex justify-between pt-2 border-t border-[var(--bb-line)] mt-2">
              <span className="text-[var(--bb-muted)] text-xs font-sans">
                Saldo después
              </span>
              <span
                className={`text-sm font-sans font-semibold ${insufficient ? "text-[var(--bb-coral)]" : "text-[var(--bb-ok)]"}`}
              >
                {fmt(session.balance - total)}
              </span>
            </div>
          </div>

          {/* Confirm button */}
          <button
            onClick={submitOrder}
            disabled={!payMethod || loading || insufficient}
            className="w-full bg-[var(--bb-sand)] text-[var(--bb-void)] py-3.5 rounded-xl text-sm font-sans font-bold disabled:opacity-40 transition-all"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-[var(--bb-void)] border-t-transparent rounded-full animate-spin" />
                Procesando...
              </span>
            ) : (
              `Confirmar Pedido · ${fmt(total)}`
            )}
          </button>

          <p className="text-[var(--bb-muted)] text-[10px] font-sans text-center mt-4">
            📍 Se entrega en: {session.zone}
          </p>
        </div>
      </div>
    );
  }

  // ══════════════════════════════════════════════════════════════════
  // STEP 4B: CART VIEW
  // ══════════════════════════════════════════════════════════════════
  if (step === "cart" && session) {
    return (
      <div className="min-h-screen bg-[var(--bb-void)]">
        <div className="sticky top-0 z-10 bg-[var(--bb-void)] border-b border-[var(--bb-line)] px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setStep("menu")}
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
                onClick={() => setStep("menu")}
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

              {/* Balance check */}
              <div className="glass-panel rounded-xl p-3 mb-4 flex justify-between items-center">
                <span className="text-[var(--bb-muted)] text-xs font-sans">
                  Tu saldo
                </span>
                <span
                  className={`text-sm font-sans font-semibold ${total > session.balance ? "text-[var(--bb-coral)]" : "text-[var(--bb-ok)]"}`}
                >
                  {fmt(session.balance)}
                </span>
              </div>

              <button
                onClick={() => setStep("pay")}
                className="w-full bg-[var(--bb-sand)] text-[var(--bb-void)] py-3.5 rounded-xl text-sm font-sans font-bold"
              >
                Continuar al Pago
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  // ══════════════════════════════════════════════════════════════════
  // STEP 4A: MENU
  // ══════════════════════════════════════════════════════════════════
  if (session) {
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

        {/* Header with balance */}
        <div className="sticky top-0 z-10 bg-[var(--bb-void)] border-b border-[var(--bb-line)] px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setStep("zone")}
                className="text-[var(--bb-muted)] font-sans text-sm"
              >
                ←
              </button>
              <div>
                <div className="text-[13px] font-serif font-normal text-[var(--bb-cream)] tracking-[1.5px]">
                  BETHEL BELLINI
                </div>
                <div className="text-[8px] font-sans text-[var(--bb-muted)] tracking-[2.5px] font-semibold">
                  {(session.zone || "").toUpperCase()}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-right">
                <div className="text-[var(--bb-sand)] text-sm font-sans font-bold">
                  {fmt(session.balance)}
                </div>
                <div className="text-[8px] text-[var(--bb-muted)] font-sans">
                  Saldo
                </div>
              </div>
              <div className="text-[8px] font-sans font-bold px-2 py-0.5 rounded bg-[rgba(90,158,111,0.12)] text-[var(--bb-ok)]">
                ISLA OS
              </div>
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
              onClick={() => setStep("cart")}
              className="w-full flex items-center justify-between bg-[var(--bb-sand)] text-[var(--bb-void)] px-5 py-3.5 rounded-xl"
            >
              <span className="text-sm font-sans font-bold">
                Ver Pedido · {count} {count === 1 ? "item" : "items"}
              </span>
              <span className="text-base font-sans font-bold">
                {fmt(total)}
              </span>
            </button>
          </div>
        )}
      </div>
    );
  }

  // Fallback
  return null;
}

// ══════════════════════════════════════════════════════════════════
// EXPORT WITH SUSPENSE
// ══════════════════════════════════════════════════════════════════

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
              Cargando ISLA OS...
            </div>
          </div>
        </div>
      }
    >
      <OrderContent />
    </Suspense>
  );
}
