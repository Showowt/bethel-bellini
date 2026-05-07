"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useLanguage, LanguageToggle, catName } from "@/lib/i18n";

/* ═══════════════════════════════════════════════════
   ISLA OS — Complete Guest Ordering System (Bilingual)
   ═══════════════════════════════════════════════════ */

const MENU: Record<
  string,
  { name: string; price: number; desc?: string; descEn?: string; pop?: boolean }[]
> = {
  Cocteles: [
    { name: "Aperol Spritz", price: 65000, desc: "Aperol, prosecco, soda", descEn: "Aperol, prosecco, soda", pop: true },
    { name: "Mojito", price: 65000, desc: "Ron, hierba buena, lima, azucar de cana", descEn: "Rum, mint, lime, cane sugar" },
    { name: "Pina Colada", price: 65000, desc: "Ron de coco, pina fresca, crema de coco", descEn: "Coconut rum, fresh pineapple, coconut cream" },
    { name: "Paloma", price: 65000, desc: "Tequila, toronja, lima, sal", descEn: "Tequila, grapefruit, lime, salt" },
    { name: "Tequila Sunrise", price: 65000, desc: "Tequila, jugo de naranja, granadina", descEn: "Tequila, orange juice, grenadine" },
    { name: "Moscow Mule", price: 65000, desc: "Vodka, ginger beer, lima", descEn: "Vodka, ginger beer, lime" },
    { name: "Daiquiri", price: 65000, desc: "Ron, limon, azucar", descEn: "Rum, lime, sugar" },
    { name: "Margarita Mezcal", price: 65000, desc: "Mezcal, limon, agave, sal", descEn: "Mezcal, lime, agave, salt", pop: true },
  ],
  Cervezas: [
    { name: "Aguila", price: 15000, desc: "Cerveza colombiana clasica", descEn: "Classic Colombian beer", pop: true },
    { name: "Club Colombia Dorada", price: 18000, desc: "Premium lager", descEn: "Premium lager" },
    { name: "Corona Extra", price: 22000, desc: "Con limon", descEn: "With lime" },
  ],
  Entradas: [
    { name: "Rollitos Crocantes", price: 65000, desc: "Rabo de toro, mayonesa de hongos, queso de cabra", descEn: "Oxtail, mushroom mayo, goat cheese", pop: true },
    { name: "Ceviche de Pescado Blanco", price: 65000, desc: "Leche de coco, pimientos ahumados, pan ciabatta", descEn: "Coconut milk, smoked peppers, ciabatta" },
    { name: "Tartar de Res", price: 65000, desc: "Aguacate, masa madre, aceite de trufa blanca", descEn: "Avocado, sourdough, white truffle oil" },
    { name: "Tostada de Salmon", price: 60000, desc: "Salmon curado 48hrs, queso crema, eneldo", descEn: "48hr cured salmon, cream cheese, dill" },
    { name: "Taquitos de Camaron", price: 60000, desc: "Mantequilla de ajo, vino blanco, paprika", descEn: "Garlic butter, white wine, paprika" },
    { name: "Tartar de Atun", price: 65000, desc: "Mango, aguacate, aceitunas kalamata", descEn: "Mango, avocado, kalamata olives" },
    { name: "Pulpo Rostizado", price: 65000, desc: "Pure cremoso de yuca, chimichurri", descEn: "Creamy yuca puree, chimichurri", pop: true },
    { name: "Bruschetta Capresse", price: 65000, desc: "Pesto, tomates, bocconcini, aguacate", descEn: "Pesto, tomatoes, bocconcini, avocado" },
  ],
  Pasta: [
    { name: "Penne al Pesto", price: 55000, desc: "Albahaca, parmesano, nueces", descEn: "Basil, parmesan, walnuts" },
    { name: "Penne a la Carbonara", price: 65000, desc: "Yema de huevo, parmesano, panceta", descEn: "Egg yolk, parmesan, pancetta", pop: true },
    { name: "Penne a la Marinera", price: 65000, desc: "Almejas, mejillones, calamar, camaron", descEn: "Clams, mussels, squid, shrimp" },
    { name: "Penne al Pistacho", price: 65000, desc: "Pistachos, parmesano, trufa blanca", descEn: "Pistachios, parmesan, white truffle" },
  ],
  "Del Mar": [
    { name: "Arroz Meloso de Mariscos", price: 80000, desc: "Mariscos al ajillo, arroz cremoso", descEn: "Garlic seafood, creamy rice", pop: true },
    { name: "Risotto Negro", price: 135000, desc: "Tinta de calamar, langostinos, paprika", descEn: "Squid ink, langoustines, paprika" },
    { name: "Fish & Chips", price: 70000, desc: "Pescado rebozado, papa artesanal, tartara", descEn: "Battered fish, artisanal chips, tartar" },
    { name: "Mejillones Provenzal", price: 70000, desc: "Mantequilla de ajo, vino blanco", descEn: "Garlic butter, white wine" },
    { name: "Fettuccini Marinera", price: 65000, desc: "Mariscos, caldo de pescado, peperoncino", descEn: "Seafood, fish broth, peperoncino" },
  ],
  "Cortes Angus": [
    { name: "Picana 350g", price: 195000, desc: "Grasa dorada crujiente, asado lento", descEn: "Golden crispy fat, slow-roasted" },
    { name: "Entrana 350g", price: 235000, desc: "Fino y jugoso, sal marina, mantequilla de hierbas", descEn: "Fine and juicy, sea salt, herb butter" },
    { name: "New York 300g", price: 235000, desc: "Sellado al carbon, jugoso, ahumado", descEn: "Charcoal-seared, juicy, smoky" },
    { name: "Rib Eye 350g", price: 285000, desc: "Marmoleado, sellado a fuego alto", descEn: "Marbled, high-heat seared", pop: true },
    { name: "Cowboy 1 kg", price: 650000, desc: "Black Angus premium, para compartir", descEn: "Premium Black Angus, for sharing" },
  ],
  Champagne: [
    { name: "Chandon Brut", price: 230000 },
    { name: "Moet Imperial", price: 900000 },
    { name: "Veuve Clicquot", price: 1100000 },
    { name: "Dom Perignon", price: 3000000 },
  ],
  "Tragos Premium": [
    { name: "Ojo de Tigre", price: 60000 },
    { name: "SKY Vodka", price: 60000 },
    { name: "Patron Silver", price: 65000 },
    { name: "Montelobos", price: 70000 },
    { name: "Patron Reposado", price: 70000 },
    { name: "Grey Goose", price: 85000, pop: true },
    { name: "Don Julio 70", price: 90000, pop: true },
    { name: "Patron Cristalino", price: 90000 },
  ],
  "Sin Alcohol": [
    { name: "Agua de Coco", price: 12000, desc: "Coco fresco de la isla", descEn: "Fresh island coconut" },
    { name: "Jugo Natural", price: 15000, desc: "Maracuya, mango, o lulo", descEn: "Passion fruit, mango, or lulo" },
    { name: "Limonada de Coco", price: 18000, desc: "Limon, coco, hierba buena", descEn: "Lime, coconut, mint" },
  ],
};

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

// Zone data with bilingual labels
const ZONE_DATA = [
  { id: "camastros-playa", es: "Camastros Playa", en: "Beach Loungers", subEs: "Frente al mar", subEn: "Oceanfront", emoji: "\uD83C\uDFD6\uFE0F", bg: "rgba(196,101,74,0.15)" },
  { id: "piscina-infinity", es: "Piscina Infinity", en: "Infinity Pool", subEs: "Area de pool", subEn: "Pool area", emoji: "\uD83C\uDFCA", bg: "rgba(42,107,124,0.15)" },
  { id: "palapa-vip", es: "Palapa VIP", en: "VIP Palapa", subEs: "Zona privada", subEn: "Private zone", emoji: "\uD83D\uDED6", bg: "rgba(212,146,58,0.15)" },
  { id: "bar-principal", es: "Bar del Mar", en: "Sea Bar", subEs: "Barra principal", subEn: "Main bar", emoji: "\uD83C\uDF79", bg: "rgba(58,94,58,0.15)" },
  { id: "terraza-sunset", es: "Terraza Sunset", en: "Sunset Terrace", subEs: "Vista panoramica", subEn: "Panoramic view", emoji: "\uD83C\uDF05", bg: "rgba(139,90,106,0.15)" },
  { id: "restaurante", es: "Restaurante", en: "Restaurant", subEs: "Area gastronomica", subEn: "Dining area", emoji: "\uD83C\uDF7D\uFE0F", bg: "rgba(107,91,79,0.15)" },
];

// ══════════════════════════════════════════════════════════════════
// MAIN ORDER COMPONENT
// ══════════════════════════════════════════════════════════════════

function OrderContent() {
  const params = useSearchParams();
  const initialZone = params.get("zone");
  const { lang, t } = useLanguage();

  const [step, setStep] = useState<
    "welcome" | "balance" | "zone" | "menu" | "cart" | "pay" | "done"
  >("welcome");

  const [session, setSession] = useState<GuestSession | null>(null);
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [loading, setLoading] = useState(false);

  const [cart, setCart] = useState<CartItem[]>([]);
  const [cat, setCat] = useState(CATS[0]);
  const [payMethod, setPayMethod] = useState<string | null>(null);
  const [online, setOnline] = useState(true);

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

  const validatePhone = (p: string) => {
    const cleaned = p.replace(/\D/g, "");
    if (cleaned.length < 10) return t("o.phone_error");
    return "";
  };

  const handleCheckIn = () => {
    const error = validatePhone(phone);
    if (error) {
      setPhoneError(error);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const cleanPhone = phone.replace(/\D/g, "");
      const mockSession: GuestSession = {
        phone: cleanPhone,
        name: lang === "en" ? "Guest" : "Invitado",
        balance: Math.floor(Math.random() * 300000) + 100000,
        bandId: `BB-${Math.floor(Math.random() * 9000 + 1000)}`,
        zone: initialZone,
      };
      setSession(mockSession);
      setLoading(false);
      setStep("balance");
    }, 1500);
  };

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

  const submitOrder = () => {
    if (!session) return;
    setLoading(true);
    setTimeout(() => {
      setSession({ ...session, balance: session.balance - total });
      setLoading(false);
      setStep("done");
    }, 2200);
  };

  // Helper to get description in correct language
  const desc = (item: { desc?: string; descEn?: string }) =>
    lang === "en" && item.descEn ? item.descEn : item.desc;

  // ══════════════════════════════════════════════════════════════════
  // STEP 1: WELCOME / CHECK-IN
  // ══════════════════════════════════════════════════════════════════
  if (step === "welcome") {
    return (
      <div className="min-h-screen bg-[var(--bb-void)] flex flex-col">
        <div className="px-5 py-4 border-b border-[var(--bb-line)] flex items-center justify-between">
          <Link href="/" className="text-[var(--bb-muted)] text-sm">
            &larr; {t("o.back")}
          </Link>
          <LanguageToggle />
          <div className="text-[8px] font-sans font-bold px-2 py-0.5 rounded bg-[rgba(90,158,111,0.12)] text-[var(--bb-ok)]">
            ISLA OS
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center px-5">
          <div className="max-w-sm w-full text-center">
            <div className="mb-8">
              <div className="text-3xl font-serif font-light text-[var(--bb-cream)] tracking-[3px] mb-2">
                BETHEL BELLINI
              </div>
              <div className="text-[10px] font-sans text-[var(--bb-muted)] tracking-[3px]">
                ISLA TIERRA BOMBA
              </div>
            </div>

            <div className="mb-8">
              <h1 className="text-xl font-serif font-light text-[var(--bb-cream)] mb-2">
                {t("o.welcome")}
              </h1>
              <p className="text-[var(--bb-muted)] text-sm font-sans">
                {t("o.welcome_sub")}
              </p>
            </div>

            <div className="mb-6">
              <label className="text-[var(--bb-sand)] text-[9px] tracking-[2px] font-sans font-semibold mb-2 block text-left">
                {t("o.phone_label")}
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

            <button
              onClick={handleCheckIn}
              disabled={loading || phone.length < 10}
              className="w-full bg-[var(--bb-sand)] text-[var(--bb-void)] py-4 rounded-xl text-sm font-sans font-bold disabled:opacity-40 transition-all"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-[var(--bb-void)] border-t-transparent rounded-full animate-spin" />
                  {t("o.verifying")}
                </span>
              ) : (
                t("o.continue")
              )}
            </button>

            <div className="mt-6 pt-6 border-t border-[var(--bb-line)]">
              <p className="text-[var(--bb-muted)] text-xs font-sans mb-3">
                {t("o.have_band")}
              </p>
              <button className="glass-panel px-5 py-3 rounded-lg text-[var(--bb-cream)] text-sm font-sans font-semibold">
                {t("o.scan_band")}
              </button>
            </div>

            <p className="text-[var(--bb-muted)] text-[11px] font-sans mt-8">
              {t("o.first_time")}
              <br />
              {t("o.first_time2")}
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
        <div className="px-5 py-4 border-b border-[var(--bb-line)] flex items-center justify-between">
          <button
            onClick={() => setStep("welcome")}
            className="text-[var(--bb-muted)] text-sm"
          >
            &larr; {t("o.change")}
          </button>
          <div className="text-center">
            <div className="text-[11px] font-serif text-[var(--bb-cream)] tracking-[1px]">
              BETHEL BELLINI
            </div>
            <div className="text-[8px] font-sans text-[var(--bb-muted)]">
              {t("o.band")}: {session.bandId}
            </div>
          </div>
          <div className="text-[8px] font-sans font-bold px-2 py-0.5 rounded bg-[rgba(90,158,111,0.12)] text-[var(--bb-ok)]">
            ISLA OS
          </div>
        </div>

        <div className="flex-1 px-5 py-6">
          <div className="max-w-sm mx-auto">
            <div className="glass-panel rounded-2xl p-6 mb-6">
              <p className="text-[var(--bb-muted)] text-xs font-sans mb-1">
                {t("o.your_balance")}
              </p>
              <div className="text-4xl font-serif font-light text-[var(--bb-sand)] mb-1">
                {fmt(session.balance)}
              </div>
              <p className="text-[var(--bb-muted)] text-[11px] font-sans">
                {t("o.available")}
              </p>
            </div>

            {!showTopUp ? (
              <button
                onClick={() => setShowTopUp(true)}
                className="w-full glass-panel py-3 rounded-xl text-[var(--bb-sand)] text-sm font-sans font-semibold mb-6"
              >
                {t("o.topup")}
              </button>
            ) : (
              <div className="glass-panel rounded-2xl p-5 mb-6">
                <p className="text-[var(--bb-sand)] text-[9px] tracking-[2px] font-sans font-semibold mb-3">
                  {t("o.topup_label")}
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
                    {t("o.cancel")}
                  </button>
                  <button
                    onClick={() => topUpAmount && handleTopUp(topUpAmount)}
                    disabled={!topUpAmount || loading}
                    className="flex-1 bg-[var(--bb-sand)] text-[var(--bb-void)] py-3 rounded-lg text-sm font-sans font-bold disabled:opacity-40"
                  >
                    {loading ? "..." : t("o.topup_btn")}
                  </button>
                </div>
                <p className="text-[var(--bb-muted)] text-[10px] font-sans text-center mt-3">
                  {t("o.pay_methods")}
                </p>
              </div>
            )}

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
                    {t("o.linked")}
                  </div>
                </div>
              </div>
              <div className="glass-panel rounded-xl p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[rgba(90,158,111,0.1)] flex items-center justify-center text-lg">
                  ✓
                </div>
                <div>
                  <div className="text-[var(--bb-cream)] text-sm font-sans font-semibold">
                    {t("o.ready")}
                  </div>
                  <div className="text-[var(--bb-muted)] text-[11px] font-sans">
                    {t("o.balance_deduct")}
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setStep(session.zone ? "menu" : "zone")}
              className="w-full bg-[var(--bb-sand)] text-[var(--bb-void)] py-4 rounded-xl text-sm font-sans font-bold"
            >
              {session.zone ? t("o.see_menu") : t("o.choose_zone")}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ══════════════════════════════════════════════════════════════════
  // STEP 3: ZONE SELECTION
  // ══════════════════════════════════════════════════════════════════
  if (step === "zone" && session) {
    const selectZone = (zoneName: string) => {
      setSession({ ...session, zone: zoneName });
      setStep("menu");
    };

    return (
      <div className="min-h-screen bg-[var(--bb-void)] flex flex-col">
        <div className="px-5 py-4 border-b border-[var(--bb-line)] flex items-center justify-between">
          <button
            onClick={() => setStep("balance")}
            className="text-[var(--bb-muted)] text-sm"
          >
            &larr; {t("o.back")}
          </button>
          <div className="text-[11px] font-serif text-[var(--bb-cream)] tracking-[1px]">
            BETHEL BELLINI
          </div>
          <div className="text-[8px] font-sans font-bold px-2 py-0.5 rounded bg-[rgba(90,158,111,0.12)] text-[var(--bb-ok)]">
            ISLA OS
          </div>
        </div>

        <div className="flex-1 px-5 py-6">
          <div className="max-w-sm mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-xl font-serif font-light text-[var(--bb-cream)] mb-2">
                {t("o.where")}
              </h2>
              <p className="text-[var(--bb-muted)] text-sm font-sans">
                {t("o.zone_sub")}
              </p>
            </div>

            <div className="space-y-3">
              {ZONE_DATA.map((z) => (
                <button
                  key={z.id}
                  onClick={() => selectZone(lang === "en" ? z.en : z.es)}
                  className="w-full glass-panel rounded-xl p-4 flex items-center gap-4 text-left"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                    style={{ background: z.bg }}
                  >
                    {z.emoji}
                  </div>
                  <div className="flex-1">
                    <div className="text-[var(--bb-cream)] text-sm font-sans font-semibold">
                      {lang === "en" ? z.en : z.es}
                    </div>
                    <div className="text-[var(--bb-muted)] text-xs font-sans">
                      {lang === "en" ? z.subEn : z.subEs}
                    </div>
                  </div>
                  <span className="text-[var(--bb-sand)]">&rarr;</span>
                </button>
              ))}
            </div>

            <p className="text-[var(--bb-muted)] text-[11px] font-sans text-center mt-6">
              {t("o.zone_help")}
            </p>
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
            {t("o.confirmed")}
          </h2>
          <p className="text-[var(--bb-muted)] text-sm font-sans mb-6">
            {t("o.preparing")}
          </p>

          <div className="glass-panel rounded-2xl p-5 text-left mb-6 space-y-3">
            {[
              [t("o.order_id"), orderId, "var(--bb-sand)"],
              [t("o.zone"), session.zone || "N/A", "var(--bb-coral)"],
              [t("o.total"), fmt(total), "var(--bb-cream)"],
              [t("o.new_bal"), fmt(session.balance), "var(--bb-ok)"],
              [t("o.est_time"), t("o.est_min"), "var(--bb-cream)"],
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
            <p className="text-[var(--bb-sand)] text-[9px] tracking-[1px] font-sans font-semibold mb-2">
              {t("o.your_order_label")}
            </p>
            {cart.map((c) => (
              <div
                key={c.name}
                className="flex justify-between py-1 text-xs font-sans"
              >
                <span className="text-[var(--bb-cream)]">
                  {c.qty}&times; {c.name}
                </span>
                <span className="text-[var(--bb-muted)]">
                  {fmt(c.price * c.qty)}
                </span>
              </div>
            ))}
          </div>

          <div className="glass-panel rounded-xl p-4 mb-6 text-left">
            <p className="text-[var(--bb-muted)] text-xs font-sans leading-relaxed">
              🏃 {t("o.runner")}
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
              {t("o.new_order")}
            </button>
            <Link
              href="/"
              className="flex-1 bg-[var(--bb-sand)] text-[var(--bb-void)] py-3 rounded-lg text-sm font-sans font-bold text-center"
            >
              {t("o.go_back")}
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
            &larr;
          </button>
          <span className="text-[var(--bb-cream)] text-sm font-sans font-semibold">
            {t("o.confirm")}
          </span>
        </div>
        <div className="max-w-sm mx-auto px-5 pt-6">
          {insufficient && (
            <div
              className="rounded-xl p-4 mb-4"
              style={{
                background: "rgba(196,101,74,0.1)",
                border: "1px solid rgba(196,101,74,0.3)",
              }}
            >
              <p className="text-[var(--bb-coral)] text-sm font-sans font-semibold mb-1">
                {t("o.insufficient")}
              </p>
              <p className="text-[var(--bb-muted)] text-xs font-sans">
                {t("o.need_more", { amount: fmt(total - session.balance) })}
              </p>
              <button
                onClick={() => setStep("balance")}
                className="mt-3 bg-[var(--bb-coral)] text-white px-4 py-2 rounded-lg text-sm font-sans font-semibold"
              >
                {t("o.topup_bal")}
              </button>
            </div>
          )}

          <p className="text-[var(--bb-sand)] text-[9px] tracking-[2.5px] font-sans font-semibold mb-4">
            {t("o.pay_method")}
          </p>
          {[
            {
              id: "balance",
              name: t("o.my_balance"),
              desc: `${t("o.bal_label")} ${fmt(session.balance)}`,
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

          <div className="glass-panel rounded-2xl p-4 mt-5 mb-5">
            <p className="text-[var(--bb-sand)] text-[9px] tracking-[1px] font-sans font-semibold mb-3">
              {t("o.summary")}
            </p>
            {cart.map((c) => (
              <div
                key={c.name}
                className="flex justify-between py-1.5 border-b border-[var(--bb-line)]"
              >
                <span className="text-[var(--bb-cream)] text-xs font-sans">
                  {c.qty}&times; {c.name}
                </span>
                <span className="text-[var(--bb-sand-mid)] text-xs font-sans">
                  {fmt(c.price * c.qty)}
                </span>
              </div>
            ))}
            <div className="flex justify-between pt-3">
              <span className="text-[var(--bb-cream)] text-sm font-sans font-bold">
                {t("o.total")}
              </span>
              <span className="text-[var(--bb-sand)] text-lg font-sans font-bold">
                {fmt(total)}
              </span>
            </div>
            <div className="flex justify-between pt-2 border-t border-[var(--bb-line)] mt-2">
              <span className="text-[var(--bb-muted)] text-xs font-sans">
                {t("o.bal_after")}
              </span>
              <span
                className={`text-sm font-sans font-semibold ${insufficient ? "text-[var(--bb-coral)]" : "text-[var(--bb-ok)]"}`}
              >
                {fmt(session.balance - total)}
              </span>
            </div>
          </div>

          <button
            onClick={submitOrder}
            disabled={!payMethod || loading || insufficient}
            className="w-full bg-[var(--bb-sand)] text-[var(--bb-void)] py-3.5 rounded-xl text-sm font-sans font-bold disabled:opacity-40 transition-all"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-[var(--bb-void)] border-t-transparent rounded-full animate-spin" />
                {t("o.processing")}
              </span>
            ) : (
              `${t("o.confirm")} · ${fmt(total)}`
            )}
          </button>

          <p className="text-[var(--bb-muted)] text-[10px] font-sans text-center mt-4">
            📍 {t("o.delivery")} {session.zone}
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
              &larr;
            </button>
            <span className="text-[var(--bb-cream)] text-sm font-sans font-semibold">
              {t("o.your_order")}
            </span>
          </div>
          <span className="text-[var(--bb-muted)] text-xs font-sans">
            {count} {count === 1 ? t("o.item") : t("o.items")}
          </span>
        </div>
        <div className="max-w-sm mx-auto px-5 pt-4">
          {cart.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-[var(--bb-muted)] text-sm font-sans mb-4">
                {t("o.cart_empty")}
              </p>
              <button
                onClick={() => setStep("menu")}
                className="glass-panel px-6 py-3 rounded-lg text-[var(--bb-cream)] text-sm font-sans font-semibold"
              >
                {t("o.see_carta")}
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
                      {fmt(c.price)} {t("o.each")}
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
                  {t("o.total")}
                </span>
                <span className="text-[var(--bb-sand)] text-xl font-sans font-bold">
                  {fmt(total)}
                </span>
              </div>

              <div className="glass-panel rounded-xl p-3 mb-4 flex justify-between items-center">
                <span className="text-[var(--bb-muted)] text-xs font-sans">
                  {t("o.your_bal")}
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
                {t("o.to_pay")}
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
        {!online && (
          <div className="offline-bar px-4 py-2 text-center">
            <span className="text-[var(--bb-warn)] text-[11px] font-sans font-semibold">
              ⚡ {t("o.offline")}
            </span>
          </div>
        )}

        <div className="sticky top-0 z-10 bg-[var(--bb-void)] border-b border-[var(--bb-line)] px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setStep("zone")}
                className="text-[var(--bb-muted)] font-sans text-sm"
              >
                &larr;
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
                  {t("o.balance")}
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
              {catName(c, lang)}
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
                        {t("o.popular")}
                      </span>
                    )}
                  </div>
                  {(item.desc || item.descEn) && (
                    <p className="text-[var(--bb-muted)] text-[11px] font-sans leading-relaxed mt-0.5">
                      {desc(item)}
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
                {t("o.view_order")} · {count} {count === 1 ? t("o.item") : t("o.items")}
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

  return null;
}

// ══════════════════════════════════════════════════════════════════
// EXPORT WITH SUSPENSE
// ══════════════════════════════════════════════════════════════════

export default function OrderPage() {
  return (
    <Suspense
      fallback={<OrderFallback />}
    >
      <OrderContent />
    </Suspense>
  );
}

function OrderFallback() {
  return (
    <div className="min-h-screen bg-[var(--bb-void)] flex items-center justify-center">
      <div className="text-center">
        <div className="text-2xl font-serif font-light text-[var(--bb-cream)] tracking-[3px] mb-2">
          BETHEL BELLINI
        </div>
        <div className="text-[9px] font-sans text-[var(--bb-muted)] tracking-[2px]">
          Loading ISLA OS...
        </div>
      </div>
    </div>
  );
}
