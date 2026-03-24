"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

/* ═══════════════════════════════════════════════════════════════
   BETHEL BELLINI — Main Site with Integrated ISLA OS
   ═══════════════════════════════════════════════════════════════ */

// ── MENU DATA (real menu from the venue) ──
const MENU_DATA: Record<
  string,
  {
    name: string;
    price: number;
    desc?: string;
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
      img: "/gallery/food-1.jpg",
      chef: true,
    },
    {
      name: "Cowboy 1 kg",
      price: 650000,
      desc: "Corte premium Black Angus para compartir",
      img: "/gallery/venue-3.jpg",
      premium: true,
    },
    {
      name: "Pulpo Rostizado",
      price: 65000,
      desc: "Sobre puré cremoso de yuca y chimichurri",
      img: "/gallery/food-1.jpg",
    },
  ],
  Entradas: [
    {
      name: "Rollitos Crocantes",
      price: 65000,
      desc: "Rellenos de rabo de toro con sus jugos de cocción lenta, mayonesa de hongos y queso de cabra.",
      chef: true,
    },
    {
      name: "Tiradito de Pescado Blanco",
      price: 65000,
      desc: "En aderezo acevichado de carambola, cebollitas encurtidas, pimientos tatemados, y aceite de eneldo.",
    },
    {
      name: "Ceviche de Pescado Blanco",
      price: 65000,
      desc: "Marinado al estilo mediterráneo con leche de coco, cremoso de pimientos ahumados, salsa huancaína, sobre pan ciabatta tostado.",
    },
    {
      name: "Tartar de Res",
      price: 65000,
      desc: "Carne de res finamente picada, cremoso de aguacate, pan de masa madre tostado, alioli, aceite de trufa blanca.",
      chef: true,
    },
    {
      name: "Tostada de Salmón",
      price: 60000,
      desc: "Salmón curado 48hrs con piel de naranja y limón, queso crema, cebollitas encurtidas, mayonesa de eneldo.",
      premium: true,
    },
    {
      name: "Taquitos de Camarón",
      price: 60000,
      desc: "Salteados en mantequilla de ajo con vino blanco y paprika, alioli, aguacate majado, mayonesa de eneldo.",
    },
    {
      name: "Tartar de Salmón",
      price: 65000,
      desc: "Marinado en yogur griego de búfala, pimentón rojo, pepino, albahaca y hierbabuena, en pan pita crujiente.",
    },
    {
      name: "Tartar de Atún",
      price: 65000,
      desc: "Con mango y aguacate, aceite de olivas, mayonesa de aceitunas kalamata, hierbabuena, sobre pan tostado.",
    },
    {
      name: "Berenjena Tres Quesos",
      price: 60000,
      desc: "En salsa pomodoro italiana, albahaca, miel ahumada de la casa y aceite trufado.",
    },
    {
      name: "Bruschetta Capresse",
      price: 65000,
      desc: "Pan de masa madre con pesto de albahaca, tomates horneados, bocconcini di búfala y aguacate majado.",
    },
    {
      name: "Wrap de Pollo Parrillado",
      price: 55000,
      desc: "Con cebollas y pimientos rostizados, mozzarella y mayonesa picante.",
    },
  ],
  Pasta: [
    {
      name: "Penne al Pesto",
      price: 55000,
      desc: "Salsa pesto de albahaca, aceite de oliva, ajo, nueces y parmesano.",
    },
    {
      name: "Penne a la Carbonara",
      price: 65000,
      desc: "Cremosa salsa de yema de huevo, parmesano y panceta dorada.",
    },
    {
      name: "Penne a la Marinera",
      price: 65000,
      desc: "Base de tomate con almejas, mejillones, calamar y camarón.",
    },
    {
      name: "Penne al Pistacho",
      price: 65000,
      desc: "Cremosa salsa de pistachos, parmesano, aceite de trufa blanca, tostadas de baguette.",
      premium: true,
    },
    {
      name: "Penne a la Puttanesca",
      price: 65000,
      desc: "Salsa de tomate con aceitunas, alcaparras, ajo y anchoas.",
    },
  ],
  Pescado: [
    {
      name: "Arroz Meloso de Mariscos",
      price: 80000,
      desc: "Mix de mariscos al ajillo en arroz cremoso, sofrito de tomates y pimientos rostizados.",
      chef: true,
    },
    {
      name: "Risotto Negro",
      price: 135000,
      desc: "Tinta de calamar, langostinos en mantequilla ahumada de paprika y vino blanco.",
      premium: true,
    },
    {
      name: "Fish & Chips",
      price: 70000,
      desc: "Pescado blanco rebozado con chips de papa artesanal y salsa tártara.",
    },
    {
      name: "Mejillones Provenzal",
      price: 70000,
      desc: "Mantequilla de ajo, vino blanco, caldo de pescado, perejil, tostones de masa madre.",
    },
    {
      name: "Tilapia a la Plancha",
      price: 65000,
      desc: "Filete fresco sazonado, exterior dorado y jugoso por dentro.",
    },
    {
      name: "Fettuccini Marinera",
      price: 65000,
      desc: "Mix de mariscos al ajillo, caldo de pescado, vino blanco, peperoncino.",
    },
  ],
  "Cortes Angus": [
    {
      name: "Entraña 350g",
      price: 235000,
      desc: "Corte fino y jugoso a la parrilla con sal marina y mantequilla de hierbas.",
      premium: true,
    },
    {
      name: "Cowboy 1 kg",
      price: 650000,
      desc: "Corte premium jugoso, ideal para compartir.",
      chef: true,
      premium: true,
    },
    {
      name: "Rib Eye 350g",
      price: 285000,
      desc: "Marmoleado y tierno, sellado a fuego alto.",
      premium: true,
    },
    {
      name: "Picaña 350g",
      price: 195000,
      desc: "Jugoso con capa de grasa dorada y crujiente.",
      premium: true,
    },
    {
      name: "New York 300g",
      price: 235000,
      desc: "Firme, sellado al carbón, jugosidad y sabor ahumado.",
      premium: true,
    },
  ],
  Cócteles: [
    { name: "Aperol Spritz", price: 65000 },
    { name: "Mojito", price: 65000 },
    { name: "Piña Colada", price: 65000 },
    { name: "Paloma", price: 65000 },
    { name: "Tequila Sunrise", price: 65000 },
    { name: "Moscow Mule", price: 65000 },
    { name: "Daiquiri", price: 65000 },
    { name: "Margarita Mezcal", price: 65000 },
  ],
  Champagne: [
    { name: "Veuve Clicquot", price: 1100000, premium: true },
    { name: "Dom Pérignon", price: 3000000, premium: true },
    { name: "Moët Impérial", price: 900000, premium: true },
    { name: "Chandon Brut", price: 230000 },
  ],
  "Tragos Premium": [
    { name: "Montelobos", price: 70000 },
    { name: "Ojo de Tigre", price: 60000 },
    { name: "Patrón Silver", price: 65000 },
    { name: "Patrón Reposado", price: 70000 },
    { name: "Patrón Cristalino", price: 90000, premium: true },
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
    alt: "Llegada al paraíso — Muelle con trono dorado",
  },
  { src: "/gallery/venue-1.jpg", alt: "Entrada Bethel Bellini" },
  { src: "/gallery/food-1.jpg", alt: "Arroz meloso de mariscos" },
  {
    src: "/gallery/venue-3.jpg",
    alt: "Vista al mar desde arquitectura de bambú",
  },
  {
    src: "/gallery/vibes-1.jpg",
    alt: "Noches mágicas con iluminación escénica",
  },
];

const ZONES = [
  { name: "Playa Bellini", icon: "◎", color: "#C4654A" },
  { name: "La Piscina", icon: "◉", color: "#2A6B7C" },
  { name: "Cabañas Privadas", icon: "◈", color: "#D4923A" },
  { name: "Bar del Mar", icon: "◆", color: "#3A5E3A" },
  { name: "Terraza Atardecer", icon: "◇", color: "#7A5A6A" },
];

export default function Home() {
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
            {["Inicio", "Menú", "Galería", "Reservar"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace("ú", "u")}`}
                className="text-[11px] tracking-[2px] uppercase font-sans font-medium text-[var(--bb-muted)] hover:text-[var(--bb-sand)] transition-colors"
              >
                {item}
              </a>
            ))}
            <Link
              href="/order"
              className="bg-[var(--bb-sand)] text-[var(--bb-void)] px-5 py-2 rounded-md text-[11px] font-bold tracking-[0.5px] font-sans hover:brightness-110 transition-all"
            >
              PEDIR AHORA
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-3">
            <Link
              href="/order"
              className="bg-[var(--bb-sand)] text-[var(--bb-void)] px-4 py-2 rounded-md text-[11px] font-bold tracking-[0.5px] font-sans"
            >
              PEDIR
            </Link>
            <button
              onClick={() => setNavOpen(!navOpen)}
              className="text-[var(--bb-muted)] text-xl"
            >
              {navOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        {navOpen && (
          <div
            className="md:hidden px-5 pb-4 animate-fade-in"
            style={{ background: "rgba(10,9,7,0.98)" }}
          >
            {["Inicio", "Menú", "Galería", "Reservar"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace("ú", "u")}`}
                onClick={() => setNavOpen(false)}
                className="block py-3 text-sm text-[var(--bb-cream)] border-b border-[var(--bb-line)] font-sans"
              >
                {item}
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
            Isla Tierra Bomba · Cartagena
          </p>
          <div className="animate-fade-up delay-300 flex gap-3 justify-center flex-wrap">
            <a
              href="#reservar"
              className="bg-[var(--bb-sand)] text-[var(--bb-void)] px-7 py-3 rounded-md text-sm font-bold font-sans hover:brightness-110 transition-all"
            >
              Reservar Mesa
            </a>
            <Link
              href="/order"
              className="glass-panel px-7 py-3 rounded-md text-sm font-semibold font-sans text-[var(--bb-cream)] hover:bg-[rgba(196,168,130,0.12)] transition-all"
            >
              Pedir desde tu Zona
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-breathe text-center">
          <div className="w-px h-8 bg-gradient-to-b from-transparent to-[var(--bb-sand)] mx-auto mb-2" />
          <span className="text-[var(--bb-sand)] text-[8px] tracking-[3px] font-sans font-semibold">
            SCROLL
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
              alt="Llegada al paraíso"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bb-void)] via-transparent to-transparent" />
          </div>
          <div>
            <p className="text-[var(--bb-sand)] text-[9px] tracking-[3px] font-sans font-semibold mb-4">
              NUESTRA HISTORIA
            </p>
            <h2 className="text-3xl md:text-4xl font-serif font-light text-[var(--bb-cream)] mb-6 leading-tight">
              El Reino del
              <br />
              Realismo Mágico
            </h2>
            <p className="text-[var(--bb-muted)] text-sm font-sans leading-relaxed mb-6">
              Para quienes ya lo han visto todo y aún buscan lo que el mundo no
              ofrece. A tan solo 5 minutos de Cartagena, en la isla ancestral de
              Tierra Bomba.
            </p>
            <p className="text-[var(--bb-cream)] text-sm font-sans leading-relaxed mb-6">
              Arquitectura hecha a mano. Mar abierto al horizonte. Un sonido que
              guía lo que está por venir.
            </p>
            <p className="text-[var(--bb-sand-mid)] text-sm font-serif italic">
              Bethel Bellini — Único, exclusivo y mundial.
            </p>
            <div className="flex gap-8 mt-8">
              {[
                ["5", "Minutos de Cartagena"],
                ["∞", "Vista al Mar"],
                ["365", "Días de Sol"],
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
          ★ ISLA OS — ORDER FROM YOUR ZONE ★
          (The integrated ordering showcase)
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
            EXPERIENCIA SIN ESFUERZO
          </p>
          <h2 className="text-3xl font-serif font-light text-[var(--bb-cream)] mb-4">
            Pide desde tu Paraíso
          </h2>
          <p className="text-[var(--bb-muted)] text-sm font-sans leading-relaxed">
            Sin hacer fila. Sin esperar meseros. Tu bebida llega a donde estés.
            Escanea, pide, disfruta.
          </p>
        </div>

        {/* 3 Methods */}
        <div className="max-w-md mx-auto px-6 mb-10">
          {[
            {
              icon: "◎",
              title: "Escanea el QR en tu zona",
              desc: "Cada zona tiene un código. Escanea, elige del menú, paga. Tu pedido llega a tu camastro.",
            },
            {
              icon: "◈",
              title: "Escribe por WhatsApp",
              desc: "Envía tu pedido al chat. Nuestra IA entiende español e inglés. Natural como hablar con un amigo.",
            },
            {
              icon: "◆",
              title: "Pide en el Bar",
              desc: "Di tu número de banda. Sin efectivo, sin tarjeta. Todo se descuenta de tu saldo.",
            },
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
            ELIGE TU ZONA Y PIDE
          </p>
          <div className="grid grid-cols-2 gap-2 mb-3">
            {ZONES.map((z) => (
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
                  Pedir →
                </span>
              </Link>
            ))}
            {/* WhatsApp full-width */}
            <a
              href="https://wa.me/573151134606?text=Hola%20quiero%20pedir"
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
                  Pedir por WhatsApp
                </div>
                <div className="text-[var(--bb-muted)] text-[10px] font-sans">
                  Escribe tu pedido como un mensaje
                </div>
              </div>
            </a>
          </div>
        </div>

        {/* How it works */}
        <div className="max-w-md mx-auto px-6 mt-12">
          <p className="text-[var(--bb-sand)] text-[9px] tracking-[3px] font-sans font-semibold mb-6 text-center">
            CÓMO FUNCIONA
          </p>
          {[
            [
              "01",
              "Llegas al Muelle",
              "Carga tu saldo con Nequi, tarjeta, Daviplata o efectivo. Recibe tu banda.",
            ],
            [
              "02",
              "Elige tu Zona",
              "Playa, piscina, cabaña, bar o terraza. Tu paraíso personal.",
            ],
            [
              "03",
              "Pide sin Esfuerzo",
              "QR, WhatsApp, o en el bar con tu banda. Tu pedido llega a ti.",
            ],
            [
              "04",
              "Disfruta",
              "Sin cuentas abiertas, sin preocupaciones. Al salir, todo se liquida en el muelle.",
            ],
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
            {["Nequi", "Daviplata", "Visa", "Mastercard", "Efectivo"].map(
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
            Procesado de forma segura por Wompi · Bancolombia
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
              GASTRONOMÍA DEL CARIBE
            </p>
            <h2 className="text-3xl font-serif font-light text-[var(--bb-cream)] mb-3">
              Nuestra Carta
            </h2>
            <p className="text-[var(--bb-muted)] text-sm font-sans">
              Cocina de autor con raíces caribeñas y toques mediterráneos.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex gap-1 overflow-x-auto pb-3 mb-8 scrollbar-none">
            {ALL_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setMenuTab(cat)}
                className={`px-4 py-2 rounded-full text-[11px] font-sans font-semibold whitespace-nowrap transition-all ${
                  menuTab === cat
                    ? "bg-[rgba(196,168,130,0.15)] text-[var(--bb-sand)]"
                    : "text-[var(--bb-muted)] hover:text-[var(--bb-cream)]"
                }`}
              >
                {cat}
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
                      {item.desc}
                    </p>
                    {(item.chef || item.premium) && (
                      <div className="flex gap-2 mt-2">
                        {item.chef && (
                          <span className="text-[8px] tracking-[1px] font-sans font-semibold px-2 py-0.5 rounded bg-[rgba(196,168,130,0.1)] text-[var(--bb-sand)]">
                            CHEF&apos;S SELECTION
                          </span>
                        )}
                        {item.premium && (
                          <span className="text-[8px] tracking-[1px] font-sans font-semibold px-2 py-0.5 rounded bg-[rgba(196,101,74,0.1)] text-[var(--bb-coral)]">
                            PREMIUM
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
                          PREMIUM
                        </span>
                      )}
                    </div>
                    {item.desc && (
                      <p className="text-[var(--bb-muted)] text-xs font-sans leading-relaxed mt-1">
                        {item.desc}
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
            Precios en COP · Propina sugerida 10% · Menú sujeto a disponibilidad
          </p>

          {/* CTA to order */}
          <div className="text-center mt-8">
            <Link
              href="/order"
              className="inline-flex items-center gap-2 bg-[var(--bb-sand)] text-[var(--bb-void)] px-8 py-3 rounded-lg text-sm font-bold font-sans hover:brightness-110 transition-all"
            >
              <span>◎</span> Pedir desde tu Zona
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
              GALERÍA
            </p>
            <h2 className="text-3xl font-serif font-light text-[var(--bb-cream)] mb-3">
              El Reino del Realismo Mágico
            </h2>
            <p className="text-[var(--bb-muted)] text-sm font-sans">
              Arquitectura hecha a mano. Mar abierto al horizonte.
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
                  alt={img.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,9,7,0.6)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <p className="text-[var(--bb-cream)] text-xs font-sans">
                    {img.alt}
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
              EXPERIENCIA
            </p>
            <h2 className="text-3xl font-serif font-light text-[var(--bb-cream)] mb-3">
              Reservar Mesa
            </h2>
            <p className="text-[var(--bb-muted)] text-sm font-sans">
              Asegura tu lugar en el Reino del Realismo Mágico
            </p>
          </div>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              window.open(
                "https://wa.me/573151134606?text=Hola%20quiero%20reservar",
                "_blank",
              );
            }}
          >
            {[
              { name: "nombre", label: "Nombre Completo", type: "text" },
              { name: "email", label: "Email", type: "email" },
              { name: "telefono", label: "Teléfono / WhatsApp", type: "tel" },
              { name: "fecha", label: "Fecha", type: "date" },
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
                  Hora
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
                  Personas
                </label>
                <select className="w-full bg-[var(--bb-faint)] border border-[var(--bb-line)] rounded-lg px-4 py-3 text-[var(--bb-cream)] text-sm font-sans outline-none">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? "persona" : "personas"}
                    </option>
                  ))}
                  <option value="10+">Más de 10</option>
                </select>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-[var(--bb-sand)] text-[var(--bb-void)] py-3.5 rounded-lg text-sm font-bold font-sans hover:brightness-110 transition-all"
            >
              Confirmar Reservación
            </button>
          </form>
          <p className="text-center mt-4 text-[var(--bb-muted)] text-xs font-sans">
            ¿Prefieres contactarnos directamente?{" "}
            <a
              href="https://wa.me/573151134606"
              className="text-[#00A884] font-semibold"
            >
              Escríbenos por WhatsApp
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
              El Reino del Realismo Mágico. Arquitectura hecha a mano, mar
              abierto al horizonte. Isla Tierra Bomba, a solo 5 minutos de
              Cartagena.
            </p>
          </div>
          <div>
            <h4 className="text-[var(--bb-sand)] text-[9px] tracking-[2px] font-sans font-semibold mb-3">
              CONTACTO
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
                <br />5 min en lancha desde Bocagrande
              </p>
            </div>
          </div>
          <div>
            <h4 className="text-[var(--bb-sand)] text-[9px] tracking-[2px] font-sans font-semibold mb-3">
              HORARIO
            </h4>
            <div className="space-y-1 text-[var(--bb-muted)] text-xs font-sans">
              <p>Lunes – Jueves: 10:00 – 18:00</p>
              <p>Viernes – Sábado: 10:00 – 22:00</p>
              <p>Domingo: 10:00 – 20:00</p>
            </div>
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-6 mt-8 pt-6 border-t border-[var(--bb-line)] flex flex-wrap justify-between items-center gap-4">
          <p className="text-[rgba(196,168,130,0.3)] text-[10px] font-sans">
            © 2026 Bethel Bellini Beach Club
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
          href="https://wa.me/573151134606?text=Hola%20quiero%20pedir"
          className="w-11 h-11 rounded-full bg-[#00A884] flex items-center justify-center shadow-lg shadow-[rgba(0,168,132,0.25)] hover:scale-110 transition-transform"
        >
          <span className="text-white text-lg">💬</span>
        </a>
        <Link
          href="/order"
          className="relative order-pulse flex items-center gap-2 bg-[var(--bb-sand)] text-[var(--bb-void)] px-6 py-3 rounded-full shadow-lg shadow-[rgba(196,168,120,0.2)] font-sans text-sm font-bold hover:scale-105 transition-transform"
        >
          <span>◎</span> PEDIR
        </Link>
      </div>
    </main>
  );
}
