"use client";
import Image from "next/image";
import Link from "next/link";

/* ═══════════════════════════════════════════════════════════
   DESPEDIDA — Bachelor / Bachelorette Landing Page
   SEO: despedida de solteros cartagena | bachelorette
   Bilingual ES + EN (heavy tourist search traffic)
   ═══════════════════════════════════════════════════════════ */

const WA_NUMBER = "573151134606";
const WA_MSG_ES = encodeURIComponent(
  "Hola Bethel Bellini! Quiero organizar una despedida de solteros/soltera en el beach club. ¿Me dan info sobre paquetes y disponibilidad?"
);
const WA_MSG_EN = encodeURIComponent(
  "Hi Bethel Bellini! I want to book a bachelorette / bachelor party at the beach club. Can you share package details and availability?"
);
const WA_ES = `https://wa.me/${WA_NUMBER}?text=${WA_MSG_ES}`;
const WA_EN = `https://wa.me/${WA_NUMBER}?text=${WA_MSG_EN}`;

const PERKS = [
  { icon: "🥂", es: "Zona VIP exclusiva reservada", en: "Exclusive VIP zone reserved" },
  { icon: "🍾", es: "Botella de Dom Pérignon o Veuve Clicquot", en: "Bottle of Dom Pérignon or Veuve Clicquot" },
  { icon: "🎧", es: "DJ set + sonido profesional", en: "DJ set + professional sound system" },
  { icon: "🛖", es: "Cabaña privada con mesero dedicado", en: "Private cabana with dedicated server" },
  { icon: "⛵", es: "Transporte en lancha desde Bocagrande", en: "Speedboat transfer from Bocagrande" },
  { icon: "🎉", es: "Decoración personalizada para la ocasión", en: "Custom décor for the occasion" },
  { icon: "🍽️", es: "Menú de degustación a medida", en: "Custom tasting menu for the group" },
  { icon: "📸", es: "Sesión de fotos / Fotógrafo opcional", en: "Photography session (optional add-on)" },
];

const PACKAGES = [
  {
    name: "Despedida Esencial",
    nameEn: "Essential Bach Party",
    size: "10–20 personas / people",
    price: "Desde $1.500.000",
    features: ["Zona privada", "Botella de bienvenida", "DJ 3h", "Transporte"],
  },
  {
    name: "Despedida VIP",
    nameEn: "VIP Bach Experience",
    size: "20–40 personas / people",
    price: "Desde $3.000.000",
    features: ["Cabaña privada", "2 botellas premium", "DJ 5h", "Menú personalizado", "Transporte grupal"],
    highlight: true,
  },
  {
    name: "Despedida Total",
    nameEn: "Full Island Takeover",
    size: "50+ personas / people",
    price: "A consultar",
    features: ["Zona exclusiva del club", "Open bar curado", "DJ + MC", "Decoración completa", "Fotógrafo", "Transporte"],
  },
];

export default function DespedidaPage() {
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
          Reservar / Book
        </Link>
      </nav>

      {/* ── Hero ────────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex items-end pb-16 px-5 pt-24">
        <Image
          src="/hero-bg.jpg"
          alt="Bachelor and bachelorette party — Bethel Bellini Beach Club, Tierra Bomba Island Cartagena"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, var(--bb-void) 35%, rgba(10,9,7,0.55) 70%, transparent)" }} />

        <div className="relative z-10 max-w-2xl animate-fade-up">
          <p className="text-xs tracking-[0.25em] uppercase mb-4" style={{ color: "var(--bb-sand)" }}>
            Isla Tierra Bomba · Cartagena · 5 min from Bocagrande
          </p>
          <h1 className="font-serif text-4xl md:text-6xl leading-tight mb-5">
            Despedida de Solteros y Bachelorette en Isla Tierra Bomba
          </h1>
          <p className="font-sans text-base md:text-lg max-w-xl mb-2" style={{ color: "rgba(240,230,212,0.75)" }}>
            La última fiesta antes del sí. Zona VIP, champagne, DJ y el Caribe de fondo.
          </p>
          <p className="font-sans text-sm max-w-xl mb-8 italic" style={{ color: "rgba(240,230,212,0.5)" }}>
            The last party before forever — private island, VIP cabana, open bar & DJ.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={WA_ES}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full font-semibold text-sm tracking-wide transition-opacity hover:opacity-80"
              style={{ background: "var(--bb-sand)", color: "var(--bb-void)" }}
            >
              Cotizar en Español
            </a>
            <a
              href={WA_EN}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full font-semibold text-sm tracking-wide glass-panel transition-opacity hover:opacity-80"
              style={{ color: "var(--bb-sand)" }}
            >
              Book in English
            </a>
          </div>
        </div>
      </section>

      {/* ── Perks Grid ──────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-5 py-20">
        <p className="text-xs tracking-[0.2em] uppercase mb-3 text-center" style={{ color: "var(--bb-sand)" }}>
          What's included · Qué incluye
        </p>
        <h2 className="font-serif text-3xl md:text-4xl text-center mb-12">
          Everything for an Unforgettable Night
          <span className="block text-2xl mt-1" style={{ color: "var(--bb-muted)" }}>Todo para una noche inolvidable</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PERKS.map((perk) => (
            <div key={perk.es} className="glass-panel rounded-2xl p-5 flex flex-col gap-2">
              <span className="text-2xl">{perk.icon}</span>
              <p className="text-sm font-medium">{perk.es}</p>
              <p className="text-xs italic" style={{ color: "rgba(240,230,212,0.5)" }}>{perk.en}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Packages ────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-5 pb-20">
        <p className="text-xs tracking-[0.2em] uppercase mb-3 text-center" style={{ color: "var(--bb-sand)" }}>
          Packages · Paquetes
        </p>
        <h2 className="font-serif text-3xl md:text-4xl text-center mb-12">
          Elige tu Nivel de Fiesta
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {PACKAGES.map((pkg) => (
            <div
              key={pkg.name}
              className="rounded-3xl p-7 flex flex-col"
              style={{
                background: pkg.highlight ? "rgba(196,168,120,0.08)" : "var(--bb-faint)",
                border: `1px solid ${pkg.highlight ? "rgba(196,168,120,0.3)" : "var(--bb-line)"}`,
              }}
            >
              {pkg.highlight && (
                <span className="text-xs font-semibold tracking-widest uppercase mb-4 px-3 py-1 rounded-full self-start" style={{ background: "var(--bb-sand)", color: "var(--bb-void)" }}>
                  Más popular
                </span>
              )}
              <h3 className="font-serif text-xl mb-1">{pkg.name}</h3>
              <p className="text-xs italic mb-3" style={{ color: "var(--bb-muted)" }}>{pkg.nameEn}</p>
              <p className="text-xs mb-4" style={{ color: "var(--bb-muted)" }}>{pkg.size}</p>
              <p className="font-serif text-2xl mb-5" style={{ color: "var(--bb-sand)" }}>{pkg.price}</p>
              <ul className="flex flex-col gap-2 mb-6 flex-1">
                {pkg.features.map((f) => (
                  <li key={f} className="text-sm flex items-center gap-2">
                    <span style={{ color: "var(--bb-ok)" }}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href={WA_ES}
                target="_blank"
                rel="noopener noreferrer"
                className="text-center py-3 rounded-xl text-sm font-semibold transition-opacity hover:opacity-80"
                style={{
                  background: pkg.highlight ? "var(--bb-sand)" : "transparent",
                  color: pkg.highlight ? "var(--bb-void)" : "var(--bb-sand)",
                  border: pkg.highlight ? "none" : "1px solid var(--bb-line)",
                }}
              >
                Reservar este paquete
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ── Boat Transfer Info ───────────────────────────────── */}
      <section
        className="mx-5 md:mx-auto max-w-4xl rounded-3xl p-8 md:p-10 mb-20 grid md:grid-cols-2 gap-8 items-center"
        style={{ background: "var(--bb-earth)", border: "1px solid var(--bb-line)" }}
      >
        <div>
          <p className="text-xs tracking-[0.2em] uppercase mb-3" style={{ color: "var(--bb-sand)" }}>
            Getting there · Cómo llegar
          </p>
          <h2 className="font-serif text-2xl md:text-3xl mb-4">
            5 Minutos en Lancha desde Bocagrande
          </h2>
          <p className="text-sm leading-relaxed mb-3" style={{ color: "rgba(240,230,212,0.7)" }}>
            Organizamos el transporte privado en lancha para tu grupo directamente desde el muelle de Bocagrande. Llegada VIP a la isla incluida en todos los paquetes.
          </p>
          <p className="text-sm leading-relaxed italic" style={{ color: "rgba(240,230,212,0.5)" }}>
            We arrange private speedboat transfers for your group from the Bocagrande pier. VIP island arrival included in all packages.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <div className="glass-panel rounded-2xl p-5">
            <p className="text-xs uppercase tracking-widest mb-2" style={{ color: "var(--bb-sand)" }}>Horario / Hours</p>
            <p className="text-sm" style={{ color: "rgba(240,230,212,0.75)" }}>
              Mar–Vie · Tue–Fri: 12 PM – 8 PM<br />
              Sáb–Dom · Sat–Sun: 12 PM – 10 PM<br />
              <span style={{ color: "var(--bb-coral)" }}>Cerrado Lunes · Closed Monday</span>
            </p>
          </div>
          <a
            href={WA_EN}
            target="_blank"
            rel="noopener noreferrer"
            className="text-center py-4 rounded-2xl font-semibold text-sm transition-opacity hover:opacity-80"
            style={{ background: "var(--bb-sand)", color: "var(--bb-void)" }}
          >
            Book now · Reservar ahora
          </a>
        </div>
      </section>

      {/* ── SEO Content Block ───────────────────────────────── */}
      <section
        className="mx-5 md:mx-auto max-w-3xl rounded-3xl p-8 md:p-12 mb-20"
        style={{ background: "var(--bb-faint)", border: "1px solid var(--bb-line)" }}
      >
        <h2 className="font-serif text-2xl mb-4">
          Best Bachelorette & Bachelor Party Venue in Cartagena
        </h2>
        <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(240,230,212,0.65)" }}>
          Bethel Bellini Beach Club en Isla Tierra Bomba es el destino preferido para despedidas de solteros y bachelorette parties en Cartagena de Indias. A solo 5 minutos en lancha desde Bocagrande, la isla ofrece el escenario perfecto: piscina infinity con vista al Caribe, cabañas VIP privadas, DJ profesional y servicio de botella premium con Dom Pérignon y Veuve Clicquot.
        </p>
        <p className="text-sm leading-relaxed" style={{ color: "rgba(240,230,212,0.65)" }}>
          Whether you're planning a bachelorette party in Cartagena or a bachelor night out on the island, our dedicated events team handles everything — from private speedboat transfer to custom decoration and a curated cocktail menu. Bethel Bellini is open Tuesday through Friday 12 PM–8 PM and Saturday–Sunday 12 PM–10 PM. Closed Mondays. Contact us at +57 315 113 4606 to check availability for your date.
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
