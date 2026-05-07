"use client";
import Image from "next/image";
import Link from "next/link";

/* ═══════════════════════════════════════════════════════════
   CUMPLEAÑOS — Birthday Party Landing Page
   SEO: cumpleaños en playa cartagena | birthday cartagena
   ═══════════════════════════════════════════════════════════ */

const WA_NUMBER = "573151134606";
const WA_MSG = encodeURIComponent(
  "Hola Bethel Bellini! Quiero celebrar mi cumpleaños en el beach club. ¿Me pueden dar información sobre los paquetes disponibles?"
);
const WA_URL = `https://wa.me/${WA_NUMBER}?text=${WA_MSG}`;

const INCLUDED = [
  { icon: "🏖️", label: "Zona exclusiva reservada en playa o piscina" },
  { icon: "🛖", label: "Cabaña VIP con servicio de mesero dedicado" },
  { icon: "🎂", label: "Pastel de cumpleaños personalizado" },
  { icon: "🎨", label: "Decoración temática a tu elección" },
  { icon: "🎧", label: "DJ set + sonido profesional" },
  { icon: "🥂", label: "Botella de bienvenida (prosecco o espumante)" },
  { icon: "🍽️", label: "Menú personalizado para el grupo" },
  { icon: "⛵", label: "Transporte en lancha desde Bocagrande incluido" },
  { icon: "📸", label: "Sesión de fotos (opcional — consultar)" },
];

const STEPS = [
  {
    num: "01",
    title: "Contáctanos",
    body: "Escríbenos por WhatsApp con la fecha y número de personas. Respondemos en menos de 2 horas.",
  },
  {
    num: "02",
    title: "Diseñamos tu fiesta",
    body: "Te asesoramos en menú, decoración y logística. Todo a medida para que sea perfecto.",
  },
  {
    num: "03",
    title: "Confirma y relájate",
    body: "Con el depósito de reserva queda todo asegurado. El día de tu cumpleaños solo llega y disfruta.",
  },
];

export default function CumpleanosPage() {
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
          alt="Fiesta de cumpleaños en playa — Bethel Bellini Beach Club Cartagena"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, var(--bb-void) 35%, rgba(10,9,7,0.55) 70%, transparent)" }} />

        <div className="relative z-10 max-w-2xl animate-fade-up">
          <p className="text-xs tracking-[0.25em] uppercase mb-4" style={{ color: "var(--bb-sand)" }}>
            Isla Tierra Bomba · Cartagena
          </p>
          <h1 className="font-serif text-4xl md:text-6xl leading-tight mb-5">
            Celebra tu Cumpleaños en el Beach Club #1 de Cartagena
          </h1>
          <p className="font-sans text-base md:text-lg max-w-xl mb-8" style={{ color: "rgba(240,230,212,0.75)" }}>
            Tu día merece la isla. Cabaña VIP, DJ, pastel personalizado y una vista al Caribe que nadie olvidará. A solo 5 minutos de Bocagrande.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full font-semibold text-sm tracking-wide transition-opacity hover:opacity-80"
              style={{ background: "var(--bb-sand)", color: "var(--bb-void)" }}
            >
              <span>Cotizar mi cumpleaños</span>
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

      {/* ── What's Included ─────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-5 py-20">
        <p className="text-xs tracking-[0.2em] uppercase mb-3 text-center" style={{ color: "var(--bb-sand)" }}>
          Todo incluido
        </p>
        <h2 className="font-serif text-3xl md:text-4xl text-center mb-12">
          Tu Fiesta, Sin Preocupaciones
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {INCLUDED.map((item) => (
            <div
              key={item.label}
              className="glass-panel rounded-2xl p-5 flex items-start gap-4"
            >
              <span className="text-2xl flex-shrink-0">{item.icon}</span>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(240,230,212,0.85)" }}>
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Packages callout ────────────────────────────────── */}
      <section
        className="mx-5 md:mx-auto max-w-4xl rounded-3xl p-8 md:p-12 mb-20"
        style={{ background: "var(--bb-earth)", border: "1px solid var(--bb-line)" }}
      >
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-xs tracking-[0.2em] uppercase mb-3" style={{ color: "var(--bb-sand)" }}>
              Paquetes de cumpleaños
            </p>
            <h2 className="font-serif text-3xl md:text-4xl mb-4">
              Desde el Íntimo hasta el Espectacular
            </h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(240,230,212,0.7)" }}>
              Grupos desde 10 hasta más de 100 personas. Celebraciones de día con vista a la piscina o fiestas nocturnas hasta las 10 PM los fines de semana. Cada paquete incluye acceso a playa privada, servicio de mesero y transporte en lancha desde Bocagrande.
            </p>
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between py-3 border-b" style={{ borderColor: "var(--bb-line)" }}>
                <span className="text-sm font-medium">Cabaña VIP para 10</span>
                <span className="text-sm font-semibold" style={{ color: "var(--bb-sand)" }}>Desde $1.200.000</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b" style={{ borderColor: "var(--bb-line)" }}>
                <span className="text-sm font-medium">Zona Privada para 30</span>
                <span className="text-sm font-semibold" style={{ color: "var(--bb-sand)" }}>Desde $2.500.000</span>
              </div>
              <div className="flex items-center justify-between py-3">
                <span className="text-sm font-medium">Evento Exclusivo 100+</span>
                <span className="text-sm font-semibold" style={{ color: "var(--bb-sand)" }}>A consultar</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="glass-panel rounded-2xl p-6">
              <p className="font-serif text-lg mb-2">Horario de eventos</p>
              <p className="text-sm" style={{ color: "rgba(240,230,212,0.7)" }}>
                Mar–Vie: 12 PM – 8 PM<br />
                Sáb–Dom: 12 PM – 10 PM<br />
                <span style={{ color: "var(--bb-coral)" }}>Cerrado los lunes</span>
              </p>
            </div>
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-center py-4 rounded-2xl font-semibold text-sm transition-opacity hover:opacity-80"
              style={{ background: "var(--bb-sand)", color: "var(--bb-void)" }}
            >
              Reservar mi cumpleaños
            </a>
            <a
              href="tel:+573151134606"
              className="text-center py-3 rounded-2xl text-sm font-medium glass-panel transition-opacity hover:opacity-80"
              style={{ color: "var(--bb-sand)" }}
            >
              +57 315 113 4606
            </a>
          </div>
        </div>
      </section>

      {/* ── How to Book ─────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-5 py-16">
        <p className="text-xs tracking-[0.2em] uppercase mb-3 text-center" style={{ color: "var(--bb-sand)" }}>
          Proceso
        </p>
        <h2 className="font-serif text-3xl md:text-4xl text-center mb-12">
          3 Pasos para tu Fiesta Perfecta
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {STEPS.map((step) => (
            <div key={step.num} className="glass-panel rounded-2xl p-6">
              <p className="font-serif text-5xl mb-4" style={{ color: "var(--bb-line)" }}>
                {step.num}
              </p>
              <h3 className="font-serif text-xl mb-3">{step.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(240,230,212,0.7)" }}>
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA Banner ──────────────────────────────────────── */}
      <section className="text-center px-5 py-20">
        <h2 className="font-serif text-3xl md:text-5xl mb-5">
          ¿Cuándo es tu cumpleaños?
        </h2>
        <p className="text-sm mb-8 max-w-md mx-auto" style={{ color: "rgba(240,230,212,0.65)" }}>
          Las fechas se agotan rápido, especialmente los fines de semana. Asegura tu día hoy.
        </p>
        <a
          href={WA_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-sm tracking-wide transition-opacity hover:opacity-80"
          style={{ background: "var(--bb-sand)", color: "var(--bb-void)" }}
        >
          Escribir por WhatsApp
        </a>
      </section>

      {/* ── SEO Content Block ───────────────────────────────── */}
      <section
        className="mx-5 md:mx-auto max-w-3xl rounded-3xl p-8 md:p-12 mb-20"
        style={{ background: "var(--bb-faint)", border: "1px solid var(--bb-line)" }}
      >
        <h2 className="font-serif text-2xl mb-4">
          El Mejor Lugar para tu Cumpleaños en Cartagena
        </h2>
        <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(240,230,212,0.65)" }}>
          Bethel Bellini Beach Club en Isla Tierra Bomba es el destino #1 para celebrar cumpleaños en Cartagena de Indias. A solo 5 minutos en lancha desde Bocagrande, ofrecemos una experiencia única que combina el lujo del Caribe con la exclusividad de una isla privada. Nuestros paquetes de cumpleaños incluyen cabaña VIP, DJ profesional, menú personalizado con nuestra gastronomía premium y servicio de pastel a medida.
        </p>
        <p className="text-sm leading-relaxed" style={{ color: "rgba(240,230,212,0.65)" }}>
          Si buscas organizar un cumpleaños en playa en Cartagena, una fiesta en beach club o una celebración privada en la isla, Bethel Bellini tiene el espacio, el equipo y la experiencia para que tu día sea inolvidable. Atendemos grupos desde 10 hasta más de 100 personas. Martes a viernes de 12 PM a 8 PM, sábados y domingos de 12 PM a 10 PM. Cerrado los lunes. Contacto: +57 315 113 4606.
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
            <Link href="/pasadia" className="text-xs hover:opacity-80 transition-opacity" style={{ color: "var(--bb-muted)" }}>Pasadía</Link>
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
