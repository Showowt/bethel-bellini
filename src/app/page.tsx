"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage, LanguageToggle, catName, HOME_ZONES } from "@/lib/i18n";

/* ═══════════════════════════════════════════════════════════════
   BETHEL BELLINI — Main Site with Integrated ISLA OS (Bilingual)
   ═══════════════════════════════════════════════════════════════ */

// ── MENU DATA (real menu from the venue) ──
const MENU_DATA: Record<
  string,
  {
    name: string;
    price: number;
    desc?: string;
    descEn?: string;
    img?: string;
    chef?: boolean;
    premium?: boolean;
  }[]
> = {
  Destacados: [
    {
      name: "Risotto Negro",
      price: 135000,
      desc: "En tinta de calamar con Langostinos rostizados",
      descEn: "Squid ink with roasted langoustines",
      img: "/gallery/food-1.jpg",
      chef: true,
    },
    {
      name: "Cowboy 1 kg",
      price: 650000,
      desc: "Corte premium Black Angus para compartir",
      descEn: "Premium Black Angus cut for sharing",
      img: "/gallery/venue-3.jpg",
      premium: true,
    },
    {
      name: "Pulpo Rostizado",
      price: 65000,
      desc: "Sobre pure cremoso de yuca y chimichurri",
      descEn: "Over creamy yuca puree and chimichurri",
      img: "/gallery/food-1.jpg",
    },
  ],
  Entradas: [
    {
      name: "Rollitos Crocantes",
      price: 65000,
      desc: "Rellenos de rabo de toro con sus jugos de coccion lenta, mayonesa de hongos y queso de cabra.",
      descEn: "Stuffed with braised oxtail, mushroom mayo and goat cheese.",
      chef: true,
    },
    {
      name: "Tiradito de Pescado Blanco",
      price: 65000,
      desc: "En aderezo acevichado de carambola, cebollitas encurtidas, pimientos tatemados, y aceite de eneldo.",
      descEn: "In star fruit ceviche dressing, pickled onions, charred peppers, and dill oil.",
    },
    {
      name: "Ceviche de Pescado Blanco",
      price: 65000,
      desc: "Marinado al estilo mediterraneo con leche de coco, cremoso de pimientos ahumados, salsa huancaina, sobre pan ciabatta tostado.",
      descEn: "Mediterranean-style with coconut milk, smoked pepper cream, huancaina sauce, on toasted ciabatta.",
    },
    {
      name: "Tartar de Res",
      price: 65000,
      desc: "Carne de res finamente picada, cremoso de aguacate, pan de masa madre tostado, alioli, aceite de trufa blanca.",
      descEn: "Finely diced beef, avocado cream, sourdough toast, aioli, white truffle oil.",
      chef: true,
    },
    {
      name: "Tostada de Salmon",
      price: 60000,
      desc: "Salmon curado 48hrs con piel de naranja y limon, queso crema, cebollitas encurtidas, mayonesa de eneldo.",
      descEn: "48-hour cured salmon with orange and lemon peel, cream cheese, pickled onions, dill mayo.",
      premium: true,
    },
    {
      name: "Taquitos de Camaron",
      price: 60000,
      desc: "Salteados en mantequilla de ajo con vino blanco y paprika, alioli, aguacate majado, mayonesa de eneldo.",
      descEn: "Sauteed in garlic butter with white wine and paprika, aioli, mashed avocado, dill mayo.",
    },
    {
      name: "Tartar de Salmon",
      price: 65000,
      desc: "Marinado en yogur griego de bufala, pimenton rojo, pepino, albahaca y hierbabuena, en pan pita crujiente.",
      descEn: "Marinated in buffalo yogurt, red pepper, cucumber, basil and mint, on crispy pita.",
    },
    {
      name: "Tartar de Atun",
      price: 65000,
      desc: "Con mango y aguacate, aceite de olivas, mayonesa de aceitunas kalamata, hierbabuena, sobre pan tostado.",
      descEn: "With mango and avocado, olive oil, kalamata olive mayo, mint, on toast.",
    },
    {
      name: "Berenjena Tres Quesos",
      price: 60000,
      desc: "En salsa pomodoro italiana, albahaca, miel ahumada de la casa y aceite trufado.",
      descEn: "In Italian pomodoro sauce, basil, house smoked honey and truffle oil.",
    },
    {
      name: "Bruschetta Capresse",
      price: 65000,
      desc: "Pan de masa madre con pesto de albahaca, tomates horneados, bocconcini di bufala y aguacate majado.",
      descEn: "Sourdough with basil pesto, roasted tomatoes, buffalo bocconcini and mashed avocado.",
    },
    {
      name: "Wrap de Pollo Parrillado",
      price: 55000,
      desc: "Con cebollas y pimientos rostizados, mozzarella y mayonesa picante.",
      descEn: "With roasted onions and peppers, mozzarella and spicy mayo.",
    },
  ],
  Pasta: [
    {
      name: "Penne al Pesto",
      price: 55000,
      desc: "Salsa pesto de albahaca, aceite de oliva, ajo, nueces y parmesano.",
      descEn: "Basil pesto, olive oil, garlic, walnuts and parmesan.",
    },
    {
      name: "Penne a la Carbonara",
      price: 65000,
      desc: "Cremosa salsa de yema de huevo, parmesano y panceta dorada.",
      descEn: "Creamy egg yolk sauce, parmesan and golden pancetta.",
    },
    {
      name: "Penne a la Marinera",
      price: 65000,
      desc: "Base de tomate con almejas, mejillones, calamar y camaron.",
      descEn: "Tomato base with clams, mussels, squid and shrimp.",
    },
    {
      name: "Penne al Pistacho",
      price: 65000,
      desc: "Cremosa salsa de pistachos, parmesano, aceite de trufa blanca, tostadas de baguette.",
      descEn: "Creamy pistachio sauce, parmesan, white truffle oil, baguette toasts.",
      premium: true,
    },
    {
      name: "Penne a la Puttanesca",
      price: 65000,
      desc: "Salsa de tomate con aceitunas, alcaparras, ajo y anchoas.",
      descEn: "Tomato sauce with olives, capers, garlic and anchovies.",
    },
  ],
  Pescado: [
    {
      name: "Arroz Meloso de Mariscos",
      price: 80000,
      desc: "Mix de mariscos al ajillo en arroz cremoso, sofrito de tomates y pimientos rostizados.",
      descEn: "Garlic seafood mix in creamy rice, roasted tomato and pepper sofrito.",
      chef: true,
    },
    {
      name: "Risotto Negro",
      price: 135000,
      desc: "Tinta de calamar, langostinos en mantequilla ahumada de paprika y vino blanco.",
      descEn: "Squid ink, langoustines in smoked paprika butter and white wine.",
      premium: true,
    },
    {
      name: "Fish & Chips",
      price: 70000,
      desc: "Pescado blanco rebozado con chips de papa artesanal y salsa tartara.",
      descEn: "Battered white fish with artisanal potato chips and tartar sauce.",
    },
    {
      name: "Mejillones Provenzal",
      price: 70000,
      desc: "Mantequilla de ajo, vino blanco, caldo de pescado, perejil, tostones de masa madre.",
      descEn: "Garlic butter, white wine, fish broth, parsley, sourdough croutons.",
    },
    {
      name: "Tilapia a la Plancha",
      price: 65000,
      desc: "Filete fresco sazonado, exterior dorado y jugoso por dentro.",
      descEn: "Fresh seasoned fillet, golden exterior and juicy inside.",
    },
    {
      name: "Fettuccini Marinera",
      price: 65000,
      desc: "Mix de mariscos al ajillo, caldo de pescado, vino blanco, peperoncino.",
      descEn: "Garlic seafood mix, fish broth, white wine, peperoncino.",
    },
  ],
  "Cortes Angus": [
    {
      name: "Entrana 350g",
      price: 235000,
      desc: "Corte fino y jugoso a la parrilla con sal marina y mantequilla de hierbas.",
      descEn: "Fine and juicy grilled cut with sea salt and herb butter.",
      premium: true,
    },
    {
      name: "Cowboy 1 kg",
      price: 650000,
      desc: "Corte premium jugoso, ideal para compartir.",
      descEn: "Premium juicy cut, ideal for sharing.",
      chef: true,
      premium: true,
    },
    {
      name: "Rib Eye 350g",
      price: 285000,
      desc: "Marmoleado y tierno, sellado a fuego alto.",
      descEn: "Marbled and tender, seared at high heat.",
      premium: true,
    },
    {
      name: "Picana 350g",
      price: 195000,
      desc: "Jugoso con capa de grasa dorada y crujiente.",
      descEn: "Juicy with golden crispy fat cap.",
      premium: true,
    },
    {
      name: "New York 300g",
      price: 235000,
      desc: "Firme, sellado al carbon, jugosidad y sabor ahumado.",
      descEn: "Firm, charcoal-seared, smoky and juicy.",
      premium: true,
    },
  ],
  Cocteles: [
    { name: "Aperol Spritz", price: 65000 },
    { name: "Mojito", price: 65000 },
    { name: "Pina Colada", price: 65000 },
    { name: "Paloma", price: 65000 },
    { name: "Tequila Sunrise", price: 65000 },
    { name: "Moscow Mule", price: 65000 },
    { name: "Daiquiri", price: 65000 },
    { name: "Margarita Mezcal", price: 65000 },
  ],
  Champagne: [
    { name: "Veuve Clicquot", price: 1100000, premium: true },
    { name: "Dom Perignon", price: 3000000, premium: true },
    { name: "Moet Imperial", price: 900000, premium: true },
    { name: "Chandon Brut", price: 230000 },
  ],
  "Tragos Premium": [
    { name: "Montelobos", price: 70000 },
    { name: "Ojo de Tigre", price: 60000 },
    { name: "Patron Silver", price: 65000 },
    { name: "Patron Reposado", price: 70000 },
    { name: "Patron Cristalino", price: 90000, premium: true },
    { name: "Don Julio 70", price: 90000, premium: true },
    { name: "Grey Goose", price: 85000, premium: true },
    { name: "SKY", price: 60000 },
  ],
};

const ALL_CATEGORIES = Object.keys(MENU_DATA);
const fmt = (n: number) => `$ ${n.toLocaleString("es-CO")}`;

const GALLERY = [
  {
    src: "/gallery/venue-2.jpg",
    alt: "Llegada al paraiso — Muelle con trono dorado",
    altEn: "Arrival to paradise — Dock with golden throne",
  },
  {
    src: "/gallery/venue-1.jpg",
    alt: "Entrada Bethel Bellini",
    altEn: "Bethel Bellini entrance",
  },
  {
    src: "/gallery/food-1.jpg",
    alt: "Arroz meloso de mariscos",
    altEn: "Seafood rice",
  },
  {
    src: "/gallery/venue-3.jpg",
    alt: "Vista al mar desde arquitectura de bambu",
    altEn: "Ocean view from bamboo architecture",
  },
  {
    src: "/gallery/vibes-1.jpg",
    alt: "Noches magicas con iluminacion escenica",
    altEn: "Magical nights with scenic lighting",
  },
];

const NAV_ITEMS = [
  { key: "nav.home", href: "#inicio" },
  { key: "nav.menu", href: "#menu" },
  { key: "nav.gallery", href: "#galeria" },
  { key: "nav.reserve", href: "#reservar" },
];

export default function Home() {
  const { lang, t } = useLanguage();
  const [scrollY, setScrollY] = useState(0);
  const [menuTab, setMenuTab] = useState("Destacados");
  const [navOpen, setNavOpen] = useState(false);
  const [showOrderBanner, setShowOrderBanner] = useState(false);

  useEffect(() => {
    const h = () => {
      setScrollY(window.scrollY);
      setShowOrderBanner(window.scrollY > 600);
    };
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const headerBg = Math.min(scrollY / 300, 0.95);
  const zones = HOME_ZONES[lang];

  return (
    <main>
      {/* ════════════════════════════════════════════
          STICKY HEADER
          ════════════════════════════════════════════ */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: `rgba(10,9,7,${headerBg})`,
          backdropFilter: headerBg > 0.1 ? "blur(20px)" : "none",
          borderBottom:
            headerBg > 0.3
              ? "1px solid var(--bb-line)"
              : "1px solid transparent",
        }}
      >
        <div className="max-w-6xl mx-auto px-5 py-3 flex items-center justify-between">
          <Link href="#" className="flex items-center gap-3">
            <Image
              src="/logo.svg"
              alt="Bethel Bellini"
              width={120}
              height={40}
              className="h-8 w-auto"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className="text-[11px] tracking-[2px] uppercase font-sans font-medium text-[var(--bb-muted)] hover:text-[var(--bb-sand)] transition-colors"
              >
                {t(item.key)}
              </a>
            ))}
            <LanguageToggle />
            <Link
              href="/order"
              className="bg-[var(--bb-sand)] text-[var(--bb-void)] px-5 py-2 rounded-md text-[11px] font-bold tracking-[0.5px] font-sans hover:brightness-110 transition-all"
            >
              {t("nav.order")}
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-3">
            <LanguageToggle />
            <Link
              href="/order"
              className="bg-[var(--bb-sand)] text-[var(--bb-void)] px-4 py-2 rounded-md text-[11px] font-bold tracking-[0.5px] font-sans"
            >
              {t("nav.order_short")}
            </Link>
            <button
              onClick={() => setNavOpen(!navOpen)}
              className="text-[var(--bb-muted)] text-xl"
            >
              {navOpen ? "\u2715" : "\u2630"}
            </button>
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        {navOpen && (
          <div
            className="md:hidden px-5 pb-4 animate-fade-in"
            style={{ background: "rgba(10,9,7,0.98)" }}
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.key}
                href={item.href}
                onClick={() => setNavOpen(false)}
                className="block py-3 text-sm text-[var(--bb-cream)] border-b border-[var(--bb-line)] font-sans"
              >
                {t(item.key)}
              </a>
            ))}
            <a
              href="https://wa.me/573151134606"
              className="block py-3 text-sm text-[#00A884] font-sans font-semibold"
            >
              WhatsApp
            </a>
          </div>
        )}
      </header>

      {/* ════════════════════════════════════════════
          HERO
          ════════════════════════════════════════════ */}
      <section
        id="inicio"
        className="relative min-h-screen flex flex-col items-center justify-center grain"
      >
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-bg.jpg"
            alt="Bethel Bellini Beach Club"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(10,9,7,0.4)] via-[rgba(10,9,7,0.2)] to-[rgba(10,9,7,0.8)]" />
        </div>

        <div className="relative z-10 text-center px-6">
          <div className="animate-fade-up">
            <Image
              src="/logo.svg"
              alt="Bethel Bellini"
              width={200}
              height={80}
              className="mx-auto mb-8 w-48 md:w-64 h-auto"
            />
          </div>
          <p className="animate-fade-up delay-200 text-[var(--bb-sand-mid)] text-xs tracking-[4px] font-sans font-medium mb-6">
            {t("hero.location")}
          </p>
          <div className="animate-fade-up delay-300 flex gap-3 justify-center flex-wrap">
            <a
              href="#reservar"
              className="bg-[var(--bb-sand)] text-[var(--bb-void)] px-7 py-3 rounded-md text-sm font-bold font-sans hover:brightness-110 transition-all"
            >
              {t("hero.reserve")}
            </a>
            <Link
              href="/order"
              className="glass-panel px-7 py-3 rounded-md text-sm font-semibold font-sans text-[var(--bb-cream)] hover:bg-[rgba(196,168,130,0.12)] transition-all"
            >
              {t("hero.order")}
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-breathe text-center">
          <div className="w-px h-8 bg-gradient-to-b from-transparent to-[var(--bb-sand)] mx-auto mb-2" />
          <span className="text-[var(--bb-sand)] text-[8px] tracking-[3px] font-sans font-semibold">
            {t("hero.scroll")}
          </span>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          STORY
          ════════════════════════════════════════════ */}
      <section className="py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
            <Image
              src="/gallery/venue-2.jpg"
              alt={lang === "en" ? "Arrival to paradise" : "Llegada al paraiso"}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bb-void)] via-transparent to-transparent" />
          </div>
          <div>
            <p className="text-[var(--bb-sand)] text-[9px] tracking-[3px] font-sans font-semibold mb-4">
              {t("story.label")}
            </p>
            <h2 className="text-3xl md:text-4xl font-serif font-light text-[var(--bb-cream)] mb-6 leading-tight">
              {t("story.title1")}
              <br />
              {t("story.title2")}
            </h2>
            <p className="text-[var(--bb-muted)] text-sm font-sans leading-relaxed mb-6">
              {t("story.p1")}
            </p>
            <p className="text-[var(--bb-cream)] text-sm font-sans leading-relaxed mb-6">
              {t("story.p2")}
            </p>
            <p className="text-[var(--bb-sand-mid)] text-sm font-serif italic">
              {t("story.tagline")}
            </p>
            <div className="flex gap-8 mt-8">
              {[
                ["5", t("story.stat_min")],
                ["\u221E", t("story.stat_ocean")],
                ["365", t("story.stat_sun")],
              ].map(([v, l]) => (
                <div key={l} className="text-center">
                  <div className="text-2xl font-serif text-[var(--bb-sand)] mb-1">
                    {v}
                  </div>
                  <div className="text-[9px] tracking-[1px] text-[var(--bb-muted)] font-sans">
                    {l}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          ISLA OS — ORDER FROM YOUR ZONE
          ════════════════════════════════════════════ */}
      <section
        id="pedir"
        className="py-16 md:py-24"
        style={{
          background:
            "linear-gradient(180deg, var(--bb-void), var(--bb-earth), var(--bb-void))",
        }}
      >
        <div className="max-w-xl mx-auto px-6 text-center mb-10">
          <p className="text-[var(--bb-sand)] text-[9px] tracking-[3px] font-sans font-semibold mb-3">
            {t("isla.label")}
          </p>
          <h2 className="text-3xl font-serif font-light text-[var(--bb-cream)] mb-4">
            {t("isla.title")}
          </h2>
          <p className="text-[var(--bb-muted)] text-sm font-sans leading-relaxed">
            {t("isla.subtitle")}
          </p>
        </div>

        {/* 3 Methods */}
        <div className="max-w-md mx-auto px-6 mb-10">
          {[
            { icon: "◎", title: t("isla.qr_title"), desc: t("isla.qr_desc") },
            { icon: "◈", title: t("isla.wa_title"), desc: t("isla.wa_desc") },
            { icon: "◆", title: t("isla.bar_title"), desc: t("isla.bar_desc") },
          ].map((m, i) => (
            <div
              key={i}
              className="flex gap-4 py-5"
              style={{
                borderBottom: i < 2 ? "1px solid var(--bb-line)" : "none",
              }}
            >
              <div className="w-10 h-10 rounded-lg glass-panel flex items-center justify-center text-[var(--bb-sand)] text-lg shrink-0">
                {m.icon}
              </div>
              <div>
                <div className="text-[var(--bb-cream)] text-sm font-sans font-semibold mb-1">
                  {m.title}
                </div>
                <div className="text-[var(--bb-muted)] text-xs font-sans leading-relaxed">
                  {m.desc}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Zone Selector */}
        <div className="max-w-md mx-auto px-6">
          <p className="text-[var(--bb-sand)] text-[9px] tracking-[3px] font-sans font-semibold mb-4">
            {t("isla.choose_zone")}
          </p>
          <div className="grid grid-cols-2 gap-2 mb-3">
            {zones.map((z) => (
              <Link
                key={z.name}
                href={`/order?zone=${encodeURIComponent(z.name)}`}
                className="glass-panel rounded-xl p-4 text-left hover:bg-[rgba(196,168,130,0.08)] transition-all group"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span style={{ color: z.color }} className="text-sm">
                    {z.icon}
                  </span>
                  <span className="text-[var(--bb-cream)] text-xs font-sans font-semibold">
                    {z.name}
                  </span>
                </div>
                <span className="text-[var(--bb-sand)] text-[11px] font-sans font-semibold group-hover:translate-x-1 transition-transform inline-block">
                  {t("isla.order_arrow")} →
                </span>
              </Link>
            ))}
            {/* WhatsApp full-width */}
            <a
              href={`https://wa.me/573151134606?text=${t("isla.wa_text")}`}
              target="_blank"
              rel="noopener"
              className="col-span-2 rounded-xl p-4 flex items-center gap-3 hover:brightness-110 transition-all"
              style={{
                background: "rgba(0,168,132,0.08)",
                border: "1px solid rgba(0,168,132,0.2)",
              }}
            >
              <span className="text-lg">💬</span>
              <div>
                <div className="text-[#00A884] text-xs font-sans font-semibold">
                  {t("isla.order_wa")}
                </div>
                <div className="text-[var(--bb-muted)] text-[10px] font-sans">
                  {t("isla.write_order")}
                </div>
              </div>
            </a>
          </div>
        </div>

        {/* How it works */}
        <div className="max-w-md mx-auto px-6 mt-12">
          <p className="text-[var(--bb-sand)] text-[9px] tracking-[3px] font-sans font-semibold mb-6 text-center">
            {t("isla.how")}
          </p>
          {[
            ["01", t("isla.step1_t"), t("isla.step1_d")],
            ["02", t("isla.step2_t"), t("isla.step2_d")],
            ["03", t("isla.step3_t"), t("isla.step3_d")],
            ["04", t("isla.step4_t"), t("isla.step4_d")],
          ].map(([num, title, desc], i) => (
            <div
              key={i}
              className="flex gap-4 py-4"
              style={{
                borderBottom: i < 3 ? "1px solid var(--bb-line)" : "none",
              }}
            >
              <span className="text-xl font-serif text-[var(--bb-sand)] font-light min-w-[32px]">
                {num}
              </span>
              <div>
                <div className="text-[var(--bb-cream)] text-sm font-sans font-semibold mb-1">
                  {title}
                </div>
                <div className="text-[var(--bb-muted)] text-xs font-sans leading-relaxed">
                  {desc}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Accepted payments */}
        <div className="max-w-md mx-auto px-6 mt-10 text-center">
          <div className="flex justify-center gap-2 flex-wrap">
            {["Nequi", "Daviplata", "Visa", "Mastercard", t("isla.cash")].map(
              (m) => (
                <span
                  key={m}
                  className="glass-panel px-3 py-1.5 rounded text-[var(--bb-cream)] text-[10px] font-sans"
                >
                  {m}
                </span>
              ),
            )}
          </div>
          <p className="text-[var(--bb-muted)] text-[10px] font-sans mt-3">
            {t("isla.payment_note")}
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          MENU
          ════════════════════════════════════════════ */}
      <section id="menu" className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-[var(--bb-sand)] text-[9px] tracking-[3px] font-sans font-semibold mb-3">
              {t("menu.label")}
            </p>
            <h2 className="text-3xl font-serif font-light text-[var(--bb-cream)] mb-3">
              {t("menu.title")}
            </h2>
            <p className="text-[var(--bb-muted)] text-sm font-sans">
              {t("menu.subtitle")}
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex gap-1 overflow-x-auto pb-3 mb-8 scrollbar-none">
            {ALL_CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setMenuTab(c)}
                className={`px-4 py-2 rounded-full text-[11px] font-sans font-semibold whitespace-nowrap transition-all ${
                  menuTab === c
                    ? "bg-[rgba(196,168,130,0.15)] text-[var(--bb-sand)]"
                    : "text-[var(--bb-muted)] hover:text-[var(--bb-cream)]"
                }`}
              >
                {catName(c, lang)}
              </button>
            ))}
          </div>

          {/* Featured items with images */}
          {menuTab === "Destacados" && (
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              {MENU_DATA["Destacados"].map((item) => (
                <div
                  key={item.name}
                  className="glass-panel rounded-2xl overflow-hidden group"
                >
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={item.img!}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-[rgba(10,9,7,0.7)] backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="text-[var(--bb-sand)] text-sm font-sans font-bold">
                        {fmt(item.price)}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="text-[var(--bb-cream)] text-base font-sans font-semibold mb-1">
                      {item.name}
                    </h4>
                    <p className="text-[var(--bb-muted)] text-xs font-sans leading-relaxed">
                      {lang === "en" && item.descEn ? item.descEn : item.desc}
                    </p>
                    {(item.chef || item.premium) && (
                      <div className="flex gap-2 mt-2">
                        {item.chef && (
                          <span className="text-[8px] tracking-[1px] font-sans font-semibold px-2 py-0.5 rounded bg-[rgba(196,168,130,0.1)] text-[var(--bb-sand)]">
                            {t("menu.chef")}
                          </span>
                        )}
                        {item.premium && (
                          <span className="text-[8px] tracking-[1px] font-sans font-semibold px-2 py-0.5 rounded bg-[rgba(196,101,74,0.1)] text-[var(--bb-coral)]">
                            {t("menu.premium")}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* List items */}
          {menuTab !== "Destacados" && (
            <div className="space-y-0">
              {MENU_DATA[menuTab]?.map((item) => (
                <div
                  key={item.name}
                  className="menu-item flex items-start justify-between py-4 px-3 -mx-3 rounded-lg"
                  style={{ borderBottom: `1px solid var(--bb-line)` }}
                >
                  <div className="flex-1 pr-4">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-[var(--bb-cream)] text-sm font-sans font-semibold">
                        {item.name}
                      </h4>
                      {item.chef && (
                        <span className="text-[7px] tracking-[1px] font-sans font-semibold px-1.5 py-0.5 rounded bg-[rgba(196,168,130,0.1)] text-[var(--bb-sand)]">
                          CHEF
                        </span>
                      )}
                      {item.premium && (
                        <span className="text-[7px] tracking-[1px] font-sans font-semibold px-1.5 py-0.5 rounded bg-[rgba(196,101,74,0.1)] text-[var(--bb-coral)]">
                          {t("menu.premium")}
                        </span>
                      )}
                    </div>
                    {(item.desc || item.descEn) && (
                      <p className="text-[var(--bb-muted)] text-xs font-sans leading-relaxed mt-1">
                        {lang === "en" && item.descEn ? item.descEn : item.desc}
                      </p>
                    )}
                  </div>
                  <span className="text-[var(--bb-sand-mid)] text-sm font-sans font-semibold whitespace-nowrap">
                    {fmt(item.price)}
                  </span>
                </div>
              ))}
            </div>
          )}

          <p className="text-[var(--bb-muted)] text-[10px] font-sans text-center mt-8">
            {t("menu.note")}
          </p>

          {/* CTA to order */}
          <div className="text-center mt-8">
            <Link
              href="/order"
              className="inline-flex items-center gap-2 bg-[var(--bb-sand)] text-[var(--bb-void)] px-8 py-3 rounded-lg text-sm font-bold font-sans hover:brightness-110 transition-all"
            >
              <span>◎</span> {t("menu.order_btn")}
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          GALLERY
          ════════════════════════════════════════════ */}
      <section
        id="galeria"
        className="py-16 md:py-24"
        style={{ background: "var(--bb-earth)" }}
      >
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-[var(--bb-sand)] text-[9px] tracking-[3px] font-sans font-semibold mb-3">
              {t("gallery.label")}
            </p>
            <h2 className="text-3xl font-serif font-light text-[var(--bb-cream)] mb-3">
              {t("gallery.title")}
            </h2>
            <p className="text-[var(--bb-muted)] text-sm font-sans">
              {t("gallery.subtitle")}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {GALLERY.map((img, i) => (
              <div
                key={i}
                className={`relative overflow-hidden rounded-xl ${i === 0 ? "col-span-2 aspect-[2/1]" : "aspect-square"} group`}
              >
                <Image
                  src={img.src}
                  alt={lang === "en" ? img.altEn : img.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,9,7,0.6)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <p className="text-[var(--bb-cream)] text-xs font-sans">
                    {lang === "en" ? img.altEn : img.alt}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <a
              href="https://instagram.com/bethel_bellini_cartagena"
              target="_blank"
              rel="noopener"
              className="text-[var(--bb-sand)] text-sm font-sans font-semibold hover:underline"
            >
              @bethel_bellini_cartagena
            </a>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          RESERVATION
          ════════════════════════════════════════════ */}
      <section id="reservar" className="py-16 md:py-24">
        <div className="max-w-md mx-auto px-6">
          <div className="text-center mb-8">
            <p className="text-[var(--bb-sand)] text-[9px] tracking-[3px] font-sans font-semibold mb-3">
              {t("res.label")}
            </p>
            <h2 className="text-3xl font-serif font-light text-[var(--bb-cream)] mb-3">
              {t("res.title")}
            </h2>
            <p className="text-[var(--bb-muted)] text-sm font-sans">
              {t("res.subtitle")}
            </p>
          </div>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              window.open(
                `https://wa.me/573151134606?text=${t("res.wa_text")}`,
                "_blank",
              );
            }}
          >
            {[
              { name: "nombre", label: t("res.name"), type: "text" },
              { name: "email", label: t("res.email"), type: "email" },
              { name: "telefono", label: t("res.phone"), type: "tel" },
              { name: "fecha", label: t("res.date"), type: "date" },
            ].map((f) => (
              <div key={f.name}>
                <label className="text-[var(--bb-muted)] text-xs font-sans font-medium mb-1.5 block">
                  {f.label}
                </label>
                <input
                  type={f.type}
                  required
                  className="w-full bg-[var(--bb-faint)] border border-[var(--bb-line)] rounded-lg px-4 py-3 text-[var(--bb-cream)] text-sm font-sans outline-none focus:border-[var(--bb-sand)] transition-colors"
                />
              </div>
            ))}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[var(--bb-muted)] text-xs font-sans font-medium mb-1.5 block">
                  {t("res.time")}
                </label>
                <select className="w-full bg-[var(--bb-faint)] border border-[var(--bb-line)] rounded-lg px-4 py-3 text-[var(--bb-cream)] text-sm font-sans outline-none">
                  {[
                    "10:00",
                    "11:00",
                    "12:00",
                    "13:00",
                    "14:00",
                    "15:00",
                    "16:00",
                    "17:00",
                  ].map((h) => (
                    <option key={h} value={h}>
                      {h}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-[var(--bb-muted)] text-xs font-sans font-medium mb-1.5 block">
                  {t("res.guests")}
                </label>
                <select className="w-full bg-[var(--bb-faint)] border border-[var(--bb-line)] rounded-lg px-4 py-3 text-[var(--bb-cream)] text-sm font-sans outline-none">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? t("res.person") : t("res.people")}
                    </option>
                  ))}
                  <option value="10+">{t("res.more10")}</option>
                </select>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-[var(--bb-sand)] text-[var(--bb-void)] py-3.5 rounded-lg text-sm font-bold font-sans hover:brightness-110 transition-all"
            >
              {t("res.confirm")}
            </button>
          </form>
          <p className="text-center mt-4 text-[var(--bb-muted)] text-xs font-sans">
            {t("res.prefer")}{" "}
            <a
              href="https://wa.me/573151134606"
              className="text-[#00A884] font-semibold"
            >
              {t("res.wa_link")}
            </a>
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          FOOTER
          ════════════════════════════════════════════ */}
      <footer
        className="py-12 border-t border-[var(--bb-line)]"
        style={{ background: "var(--bb-earth)" }}
      >
        <div className="max-w-4xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          <div>
            <Image
              src="/logo.svg"
              alt="Bethel Bellini"
              width={120}
              height={40}
              className="h-8 w-auto mb-4"
            />
            <p className="text-[var(--bb-muted)] text-xs font-sans leading-relaxed">
              {t("foot.desc")}
            </p>
          </div>
          <div>
            <h4 className="text-[var(--bb-sand)] text-[9px] tracking-[2px] font-sans font-semibold mb-3">
              {t("foot.contact")}
            </h4>
            <div className="space-y-2 text-[var(--bb-muted)] text-xs font-sans">
              <a
                href="https://wa.me/573151134606"
                className="block hover:text-[var(--bb-cream)]"
              >
                +57 315 113 4606
              </a>
              <p>
                Isla Tierra Bomba
                <br />
                {t("foot.address")}
              </p>
            </div>
          </div>
          <div>
            <h4 className="text-[var(--bb-sand)] text-[9px] tracking-[2px] font-sans font-semibold mb-3">
              {t("foot.hours")}
            </h4>
            <div className="space-y-1 text-[var(--bb-muted)] text-xs font-sans">
              <p>{t("foot.mon")}</p>
              <p>{t("foot.fri")}</p>
              <p>{t("foot.sun")}</p>
            </div>
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-6 mt-8 pt-6 border-t border-[var(--bb-line)] flex flex-wrap justify-between items-center gap-4">
          <p className="text-[rgba(196,168,130,0.3)] text-[10px] font-sans">
            &copy; 2026 Bethel Bellini Beach Club
          </p>
          <p className="text-[rgba(196,168,130,0.2)] text-[10px] font-sans">
            Powered by ⬡ MachineMind · ISLA OS
          </p>
        </div>
      </footer>

      {/* ════════════════════════════════════════════
          FLOATING ORDER BUTTONS
          ════════════════════════════════════════════ */}
      <div
        className={`fixed bottom-6 right-5 z-40 flex flex-col items-end gap-2 transition-all duration-500 ${showOrderBanner ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"}`}
      >
        <a
          href={`https://wa.me/573151134606?text=${t("isla.wa_text")}`}
          className="w-11 h-11 rounded-full bg-[#00A884] flex items-center justify-center shadow-lg shadow-[rgba(0,168,132,0.25)] hover:scale-110 transition-transform"
        >
          <span className="text-white text-lg">💬</span>
        </a>
        <Link
          href="/order"
          className="relative order-pulse flex items-center gap-2 bg-[var(--bb-sand)] text-[var(--bb-void)] px-6 py-3 rounded-full shadow-lg shadow-[rgba(196,168,120,0.2)] font-sans text-sm font-bold hover:scale-105 transition-transform"
        >
          <span>◎</span> {t("nav.order_short")}
        </Link>
      </div>
    </main>
  );
}
