"use client";
import Image from "next/image";
import Link from "next/link";

/* ═══════════════════════════════════════════════════════════
   EVENTOS — Private & Corporate Events Landing Page
   SEO: eventos privados cartagena | corporativos | bodas
   ═══════════════════════════════════════════════════════════ */

const WA_NUMBER = "573151134606";
const WA_MSG = encodeURIComponent(
  "Hola Bethel Bellini! Estoy interesado/a en organizar un evento privado/corporativo en el beach club. ¿Me pueden dar información sobre capacidad, paquetes y disponibilidad?"
);
const WA_URL = `https://wa.me/${WA_NUMBER}?text=${WA_MSG}`;

const EVENT_TYPES = [
  {
    icon: "🏢",
    name: "Corporativo",
    nameEn: "Corporate Events",
    desc: "Lanzamientos de producto, team buildings, reuniones de directivos y convenciones con vista al Caribe.",
  },
  {
    icon: "💍",
    name: "Bodas y Matrimonios",
    nameEn: "Weddings",
    desc: "Celebraciones íntimas o grandes recepciones con ceremonias en playa privada y cenas bajo las estrellas.",
  },
  {
    icon: "🎉",
    name: "Fiestas Privadas",
    nameEn: "Private Parties",
    desc: "Cumpleaños, aniversarios, reuniones de familia o amigos con total exclusividad del espacio.",
  },
  {
    icon: "🍽️",
    name: "Cenas Privadas",
    nameEn: "Private Dining",
    desc: "Experiencias gastronómicas exclusivas para grupos reducidos con menú degustación de autor.",
  },
  {
    icon: "📸",
    name: "Shoots & Producciones",
    nameEn: "Photo & Film Shoots",
    desc: "El escenario perfecto para producciones de moda, campañas publicitarias y contenido de marca.",
  },
  {
    icon: "🥂",
    name: "Cócteles & Networking",
    nameEn: "Cocktail Receptions",
    desc: "Recepciones empresariales, lanzamientos de marca y networking de alto nivel sobre el Caribe.",
  },
];

const CAPACITIES = [
  { zone: "Cabaña VIP", capacity: "10–20 personas", desc: "Espacio íntimo con servicio exclusivo" },
  { zone: "Zona de Playa", capacity: "30–60 personas", desc: "Área frente al mar con camastros privados" },
  { zone: "Terraza Principal", capacity: "60–120 personas", desc: "Terraza con vista a piscina y océano" },
  { zone: "Club Completo", capacity: "Hasta 200 personas", desc: "Cierre exclusivo del beach club completo" },
];

const SERVICES = [
  "Coordinador de eventos dedicado",
  "Catering personalizado con menú de autor",
  "DJ y sonido profesional",
  "Iluminación escénica",
  "Decoración y ambientación a medida",
  "Bar abierto curado",
  "Transporte en lancha para todos los invitados",
  "Equipo audiovisual (pantallas, micrófonos)",
  "Fotógrafo y videógrafo (opcional)",
  "Estacionamiento y coordinación logística",
];

export default function EventosPage() {
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
          alt="Eventos privados y corporativos — Bethel Bellini Beach Club, Isla Tierra Bomba Cartagena"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, var(--bb-void) 35%, rgba(10,9,7,0.55) 70%, transparent)" }} />

        <div className="relative z-10 max-w-2xl animate-fade-up">
          <p className="text-xs tracking-[0.25em] uppercase mb-4" style={{ color: "var(--bb-sand)" }}>
            Isla Tierra Bomba · Cartagena · Hasta 200 personas
          </p>
          <h1 className="font-serif text-4xl md:text-6xl leading-tight mb-5">
            Eventos Privados y Corporativos en Bethel Bellini
          </h1>
          <p className="font-sans text-base md:text-lg max-w-xl mb-8" style={{ color: "rgba(240,230,212,0.75)" }}>
            El venue más exclusivo de Cartagena. Piscina infinity, playa privada, catering de autor y producción completa. A solo 5 minutos de Bocagrande.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full font-semibold text-sm tracking-wide transition-opacity hover:opacity-80"
              style={{ background: "var(--bb-sand)", color: "var(--bb-void)" }}
            >
              Consultar disponibilidad
            </a>
            <a
              href="tel:+573151134606"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full font-semibold text-sm tracking-wide glass-panel transition-opacity hover:opacity-80"
              style={{ color: "var(--bb-sand)" }}
            >
              +57 315 113 4606
            </a>
          </div>
        </div>
      </section>

      {/* ── Event Types ─────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-5 py-20">
        <p className="text-xs tracking-[0.2em] uppercase mb-3 text-center" style={{ color: "var(--bb-sand)" }}>
          Tipo de evento
        </p>
        <h2 className="font-serif text-3xl md:text-4xl text-center mb-12">
          Un Venue, Infinitas Posibilidades
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {EVENT_TYPES.map((evt) => (
            <div key={evt.name} className="glass-panel rounded-2xl p-6 flex flex-col gap-3">
              <span className="text-3xl">{evt.icon}</span>
              <div>
                <h3 className="font-serif text-lg">{evt.name}</h3>
                <p className="text-xs" style={{ color: "var(--bb-muted)" }}>{evt.nameEn}</p>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(240,230,212,0.7)" }}>
                {evt.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Capacity ────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-5 pb-20">
        <p className="text-xs tracking-[0.2em] uppercase mb-3 text-center" style={{ color: "var(--bb-sand)" }}>
          Capacidad
        </p>
        <h2 className="font-serif text-3xl md:text-4xl text-center mb-12">
          Espacios para cada Escala
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {CAPACITIES.map((cap, i) => (
            <div
              key={cap.zone}
              className="glass-panel rounded-2xl p-6 flex items-start gap-4"
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-serif text-lg"
                style={{ background: "rgba(196,168,120,0.1)", color: "var(--bb-sand)" }}
              >
                {i + 1}
              </div>
              <div>
                <h3 className="font-medium mb-1">{cap.zone}</h3>
                <p className="text-sm font-semibold mb-1" style={{ color: "var(--bb-sand)" }}>{cap.capacity}</p>
                <p className="text-xs" style={{ color: "var(--bb-muted)" }}>{cap.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Services ────────────────────────────────────────── */}
      <section
        className="mx-5 md:mx-auto max-w-4xl rounded-3xl p-8 md:p-12 mb-20"
        style={{ background: "var(--bb-earth)", border: "1px solid var(--bb-line)" }}
      >
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div>
            <p className="text-xs tracking-[0.2em] uppercase mb-3" style={{ color: "var(--bb-sand)" }}>
              Servicios incluidos
            </p>
            <h2 className="font-serif text-3xl mb-6">
              Producción Integral. Cero Preocupaciones.
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(240,230,212,0.7)" }}>
              Nuestro equipo de eventos maneja cada detalle: desde la coordinación del transporte en lancha hasta el último toque de decoración. Tú y tus invitados solo tienen que disfrutar.
            </p>
          </div>
          <ul className="flex flex-col gap-3">
            {SERVICES.map((svc) => (
              <li key={svc} className="flex items-center gap-3 text-sm">
                <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-xs" style={{ background: "rgba(90,158,111,0.15)", color: "var(--bb-ok)" }}>✓</span>
                {svc}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Horario + CTA ───────────────────────────────────── */}
      <section className="text-center px-5 py-16 max-w-2xl mx-auto">
        <div className="glass-panel rounded-3xl p-8 mb-10">
          <p className="text-xs tracking-[0.2em] uppercase mb-3" style={{ color: "var(--bb-sand)" }}>Horario</p>
          <p className="font-serif text-xl mb-3">Martes a Viernes: 12 PM – 8 PM</p>
          <p className="font-serif text-xl mb-3">Sábados y Domingos: 12 PM – 10 PM</p>
          <p className="text-sm" style={{ color: "var(--bb-coral)" }}>Cerrado los lunes · Eventos nocturnos según acuerdo</p>
        </div>
        <h2 className="font-serif text-3xl md:text-4xl mb-4">
          ¿Listo para Cotizar?
        </h2>
        <p className="text-sm mb-8" style={{ color: "rgba(240,230,212,0.65)" }}>
          Cuéntanos tu evento — fecha, número de personas y tipo de celebración. Respondemos con propuesta en 24 horas.
        </p>
        <a
          href={WA_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-sm tracking-wide transition-opacity hover:opacity-80"
          style={{ background: "var(--bb-sand)", color: "var(--bb-void)" }}
        >
          Solicitar cotización
        </a>
      </section>

      {/* ── SEO Content Block ───────────────────────────────── */}
      <section
        className="mx-5 md:mx-auto max-w-3xl rounded-3xl p-8 md:p-12 mb-20"
        style={{ background: "var(--bb-faint)", border: "1px solid var(--bb-line)" }}
      >
        <h2 className="font-serif text-2xl mb-4">
          El Mejor Venue para Eventos Privados y Corporativos en Cartagena
        </h2>
        <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(240,230,212,0.65)" }}>
          Bethel Bellini Beach Club en Isla Tierra Bomba es el venue exclusivo de Cartagena de Indias para eventos corporativos, lanzamientos de producto, bodas, cenas privadas y celebraciones de alto perfil. Con capacidad para hasta 200 personas, piscina infinity, playa privada y catering de cocina caribeña premium, ofrecemos una experiencia que ningún hotel de la ciudad puede replicar.
        </p>
        <p className="text-sm leading-relaxed" style={{ color: "rgba(240,230,212,0.65)" }}>
          Si buscas organizar eventos privados en Cartagena con un toque de exclusividad real, eventos corporativos en playa o private events in Cartagena Colombia, nuestro equipo de producción se encarga de cada detalle. A solo 5 minutos en lancha desde Bocagrande. Abierto martes a viernes 12 PM–8 PM, sábados y domingos 12 PM–10 PM. Cerrado lunes. Contacto: +57 315 113 4606.
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
