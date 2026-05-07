"use client";
import Image from "next/image";
import Link from "next/link";

/* ═══════════════════════════════════════════════════════════
   PASADÍA — Day Pass Landing Page
   SEO: pasadía cartagena | day trip cartagena | day pass
   ═══════════════════════════════════════════════════════════ */

const WA_NUMBER = "573151134606";
const WA_MSG = encodeURIComponent(
  "Hola Bethel Bellini! Quiero reservar un pasadía en el beach club. ¿Tienen disponibilidad y cuál es el precio de la banda?"
);
const WA_URL = `https://wa.me/${WA_NUMBER}?text=${WA_MSG}`;

const INCLUDED = [
  {
    icon: "🏊",
    title: "Piscina Infinity",
    titleEn: "Infinity Pool",
    desc: "Acceso ilimitado a la piscina con vista panorámica al mar Caribe.",
  },
  {
    icon: "🏖️",
    title: "Playa Privada",
    titleEn: "Private Beach",
    desc: "Playa exclusiva con camastros, arena blanca y agua cristalina.",
  },
  {
    icon: "🛏️",
    title: "Camastro Reservado",
    titleEn: "Reserved Lounger",
    desc: "Tu camastro asignado para todo el día con servicio de mesero.",
  },
  {
    icon: "⛵",
    title: "Transporte en Lancha",
    titleEn: "Speedboat Transfer",
    desc: "Ida y vuelta desde el muelle de Bocagrande incluido.",
  },
  {
    icon: "💳",
    title: "Banda Inteligente",
    titleEn: "Smart Wristband",
    desc: "Carga tu saldo y paga todo sin sacar la billetera en todo el día.",
  },
  {
    icon: "🍽️",
    title: "Gastronomía Premium",
    titleEn: "Premium Food",
    desc: "Acceso completo al menú de autor con más de 40 platos disponibles.",
  },
];

const ZONES = [
  {
    name: "Zona de Playa",
    desc: "Camastros frente al mar con vista a la bahía y brisa caribeña constante. El spot perfecto para desconectar.",
    detail: "Capacidad limitada · Reserva anticipada recomendada",
  },
  {
    name: "Piscina Infinity",
    desc: "La piscina con borde infinito que se funde con el horizonte del Caribe. DJ ambiental, bar en la piscina y más.",
    detail: "Música en vivo · Bar flotante · Temperatura perfecta",
  },
  {
    name: "Terraza & Restaurante",
    desc: "Gastronomía de autor con raíces caribeñas y mediterráneas. Ceviches, cortes Angus, mariscos frescos y cócteles artesanales.",
    detail: "Chef de autor · Menú completo · Cócteles premium",
  },
  {
    name: "Cabañas VIP",
    desc: "Para quienes quieren la experiencia completa: cabaña privada, botella de bienvenida y mesero exclusivo.",
    detail: "Desde $500.000 · Grupos de 6–12 personas",
  },
];

const BRING = [
  "Traje de baño y ropa de playa",
  "Protector solar (FPS 50+ recomendado)",
  "Ropa de cambio ligera",
  "Efectivo o tarjeta para cargar la banda",
  "Toalla (disponibles en el club también)",
  "Documentos de identidad",
];

export default function PasadiaPage() {
  return (
    <main
      style={{ background: "var(--bb-void)", color: "var(--bb-cream)" }}
      className="min-h-screen font-sans"
    >
      {/* ── Nav ─────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-4 glass-panel">
        <Link href="/" className="font-serif text-lg" style={{ color: "var(--bb-sand)" }}>
          Bethel Bellini
        </Link>
        <Link
          href="/reservar"
          className="text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full"
          style={{ background: "var(--bb-sand)", color: "var(--bb-void)" }}
        >
          Reservar
        </Link>
      </nav>

      {/* ── Hero ────────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex items-end pb-16 px-5 pt-24">
        <Image
          src="/hero-bg.jpg"
          alt="Pasadía en Bethel Bellini Beach Club — Piscina infinity y playa privada Isla Tierra Bomba Cartagena"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, var(--bb-void) 35%, rgba(10,9,7,0.55) 70%, transparent)" }} />

        <div className="relative z-10 max-w-2xl animate-fade-up">
          <p className="text-xs tracking-[0.25em] uppercase mb-4" style={{ color: "var(--bb-sand)" }}>
            Isla Tierra Bomba · 5 min de Bocagrande · Cartagena
          </p>
          <h1 className="font-serif text-4xl md:text-6xl leading-tight mb-5">
            Pasadía en el Mejor Beach Club de Cartagena
          </h1>
          <p className="font-sans text-base md:text-lg max-w-xl mb-3" style={{ color: "rgba(240,230,212,0.75)" }}>
            Un día completo en la isla: piscina infinity, playa privada, gastronomía de autor y cócteles artesanales sobre el Caribe.
          </p>
          <p className="font-sans text-sm max-w-md mb-8 italic" style={{ color: "rgba(240,230,212,0.5)" }}>
            The ultimate Cartagena day pass — private island, infinity pool and premium food just 5 min from downtown.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full font-semibold text-sm tracking-wide transition-opacity hover:opacity-80"
              style={{ background: "var(--bb-sand)", color: "var(--bb-void)" }}
            >
              Reservar mi pasadía
            </a>
            <Link
              href="/reservar"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full font-semibold text-sm tracking-wide glass-panel transition-opacity hover:opacity-80"
              style={{ color: "var(--bb-sand)" }}
            >
              Ver paquetes
            </Link>
          </div>
        </div>
      </section>

      {/* ── Pricing Banner ──────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-5 py-12">
        <div
          className="rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-5"
          style={{ background: "rgba(196,168,120,0.08)", border: "1px solid rgba(196,168,120,0.2)" }}
        >
          <div>
            <p className="text-xs tracking-[0.2em] uppercase mb-1" style={{ color: "var(--bb-sand)" }}>Día pass / Day pass</p>
            <p className="font-serif text-3xl">Desde <span style={{ color: "var(--bb-sand)" }}>$150.000</span></p>
            <p className="text-xs mt-1" style={{ color: "var(--bb-muted)" }}>Incluye transporte en lancha · Banda de consumo inteligente</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-center px-5 py-3 glass-panel rounded-xl">
              <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "var(--bb-sand)" }}>Cabaña VIP</p>
              <p className="font-serif text-xl">Desde <span style={{ color: "var(--bb-sand)" }}>$500.000</span></p>
            </div>
          </div>
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl font-semibold text-sm transition-opacity hover:opacity-80 flex-shrink-0"
            style={{ background: "var(--bb-sand)", color: "var(--bb-void)" }}
          >
            Reservar ahora
          </a>
        </div>
      </section>

      {/* ── What's Included ─────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-5 pb-20">
        <p className="text-xs tracking-[0.2em] uppercase mb-3 text-center" style={{ color: "var(--bb-sand)" }}>
          Qué incluye · What's included
        </p>
        <h2 className="font-serif text-3xl md:text-4xl text-center mb-12">
          Todo lo que Necesitas para un Día Perfecto
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {INCLUDED.map((item) => (
            <div key={item.title} className="glass-panel rounded-2xl p-6">
              <span className="text-3xl block mb-4">{item.icon}</span>
              <h3 className="font-serif text-lg mb-1">{item.title}</h3>
              <p className="text-xs italic mb-3" style={{ color: "var(--bb-muted)" }}>{item.titleEn}</p>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(240,230,212,0.7)" }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Zones ───────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-5 pb-20">
        <p className="text-xs tracking-[0.2em] uppercase mb-3 text-center" style={{ color: "var(--bb-sand)" }}>
          Zonas del club
        </p>
        <h2 className="font-serif text-3xl md:text-4xl text-center mb-12">
          Explora Cada Rincón del Club
        </h2>
        <div className="flex flex-col gap-4">
          {ZONES.map((zone, i) => (
            <div
              key={zone.name}
              className="glass-panel rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center gap-5"
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 font-serif text-xl"
                style={{ background: "rgba(196,168,120,0.1)", color: "var(--bb-sand)" }}
              >
                {i + 1}
              </div>
              <div className="flex-1">
                <h3 className="font-serif text-xl mb-2">{zone.name}</h3>
                <p className="text-sm leading-relaxed mb-2" style={{ color: "rgba(240,230,212,0.7)" }}>{zone.desc}</p>
                <p className="text-xs" style={{ color: "var(--bb-muted)" }}>{zone.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── How to Get There + What to Bring ────────────────── */}
      <section
        className="mx-5 md:mx-auto max-w-4xl rounded-3xl p-8 md:p-12 mb-20 grid md:grid-cols-2 gap-10"
        style={{ background: "var(--bb-earth)", border: "1px solid var(--bb-line)" }}
      >
        <div>
          <p className="text-xs tracking-[0.2em] uppercase mb-4" style={{ color: "var(--bb-sand)" }}>
            Cómo llegar · How to get there
          </p>
          <h2 className="font-serif text-2xl mb-4">5 Minutos desde Bocagrande</h2>
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-3">
              <span className="text-xl flex-shrink-0">📍</span>
              <div>
                <p className="text-sm font-medium mb-1">Punto de salida</p>
                <p className="text-xs" style={{ color: "rgba(240,230,212,0.65)" }}>Muelle de Bocagrande, Cartagena. Coordina tu llegada por WhatsApp.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-xl flex-shrink-0">⛵</span>
              <div>
                <p className="text-sm font-medium mb-1">Transporte incluido</p>
                <p className="text-xs" style={{ color: "rgba(240,230,212,0.65)" }}>Lancha rápida ida y vuelta. Salidas coordinadas según tu hora de llegada.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-xl flex-shrink-0">🕐</span>
              <div>
                <p className="text-sm font-medium mb-1">Horario</p>
                <p className="text-xs" style={{ color: "rgba(240,230,212,0.65)" }}>
                  Mar–Vie: 12 PM – 8 PM<br />
                  Sáb–Dom: 12 PM – 10 PM<br />
                  <span style={{ color: "var(--bb-coral)" }}>Cerrado lunes</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <p className="text-xs tracking-[0.2em] uppercase mb-4" style={{ color: "var(--bb-sand)" }}>
            Qué traer
          </p>
          <h2 className="font-serif text-2xl mb-4">Checklist del Pasadía</h2>
          <ul className="flex flex-col gap-3">
            {BRING.map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm">
                <span className="w-4 h-4 rounded-full flex-shrink-0" style={{ background: "rgba(196,168,120,0.2)", border: "1px solid rgba(196,168,120,0.3)" }} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────── */}
      <section className="text-center px-5 py-16">
        <h2 className="font-serif text-3xl md:text-5xl mb-4">
          ¿Cuándo es tu Pasadía?
        </h2>
        <p className="text-sm mb-8 max-w-md mx-auto" style={{ color: "rgba(240,230,212,0.65)" }}>
          Los cupos son limitados, especialmente los fines de semana. Reserva con anticipación y asegura tu día en la isla.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-semibold text-sm tracking-wide transition-opacity hover:opacity-80"
            style={{ background: "var(--bb-sand)", color: "var(--bb-void)" }}
          >
            Reservar por WhatsApp
          </a>
          <a
            href="tel:+573151134606"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-semibold text-sm tracking-wide glass-panel transition-opacity hover:opacity-80"
            style={{ color: "var(--bb-sand)" }}
          >
            +57 315 113 4606
          </a>
        </div>
      </section>

      {/* ── SEO Content Block ───────────────────────────────── */}
      <section
        className="mx-5 md:mx-auto max-w-3xl rounded-3xl p-8 md:p-12 mb-20"
        style={{ background: "var(--bb-faint)", border: "1px solid var(--bb-line)" }}
      >
        <h2 className="font-serif text-2xl mb-4">
          El Mejor Pasadía en Cartagena — Isla Tierra Bomba
        </h2>
        <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(240,230,212,0.65)" }}>
          Si buscas el mejor pasadía en Cartagena de Indias, Bethel Bellini Beach Club en Isla Tierra Bomba es la opción definitiva. A solo 5 minutos en lancha desde Bocagrande, el club ofrece una experiencia completa: piscina infinity con vista al Caribe, playa privada con camastros reservados, gastronomía de autor con más de 40 platos y un bar de cócteles artesanales. Sistema de banda inteligente para que no necesites cargar efectivo.
        </p>
        <p className="text-sm leading-relaxed" style={{ color: "rgba(240,230,212,0.65)" }}>
          For tourists looking for a Cartagena day pass or day trip to Tierra Bomba island, Bethel Bellini offers the complete package: private beach, infinity pool, premium Caribbean cuisine, craft cocktails and speedboat transfer from Bocagrande included. Day passes start from $150,000 COP. Open Tuesday to Friday 12 PM–8 PM, Saturday and Sunday 12 PM–10 PM. Closed Mondays. Book via WhatsApp +57 315 113 4606 or through our website.
        </p>
      </section>

      {/* ── Footer ──────────────────────────────────────────── */}
      <footer className="text-center pb-12 px-5" style={{ borderTop: "1px solid var(--bb-line)" }}>
        <div className="max-w-4xl mx-auto pt-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-serif text-lg mb-1" style={{ color: "var(--bb-sand)" }}>Bethel Bellini</p>
            <p className="text-xs" style={{ color: "var(--bb-muted)" }}>Isla Tierra Bomba · Cartagena, Colombia</p>
          </div>
          <div className="flex gap-6">
            <Link href="/" className="text-xs hover:opacity-80 transition-opacity" style={{ color: "var(--bb-muted)" }}>Inicio</Link>
            <Link href="/cumpleanos" className="text-xs hover:opacity-80 transition-opacity" style={{ color: "var(--bb-muted)" }}>Cumpleaños</Link>
            <Link href="/despedida" className="text-xs hover:opacity-80 transition-opacity" style={{ color: "var(--bb-muted)" }}>Despedidas</Link>
            <Link href="/eventos" className="text-xs hover:opacity-80 transition-opacity" style={{ color: "var(--bb-muted)" }}>Eventos</Link>
            <Link href="/reservar" className="text-xs hover:opacity-80 transition-opacity" style={{ color: "var(--bb-muted)" }}>Reservar</Link>
          </div>
          <p className="text-xs" style={{ color: "rgba(132,120,98,0.5)" }}>
            Crafted by MachineMind
          </p>
        </div>
      </footer>
    </main>
  );
}
