"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

/* ═══════════════════════════════════════════════════
   RESERVAR — Elite Booking Page
   SEO target: reservar beach club cartagena, pasadía,
   cumpleaños playa, eventos privados isla
   ═══════════════════════════════════════════════════ */

const PACKAGES = [
  {
    id: "pasadia",
    name: "Pasadía Paradise",
    nameEn: "Paradise Day Pass",
    price: "Desde $150.000",
    desc: "Acceso completo al beach club: playa, piscina infinity, camastros, restaurante y bar.",
    features: [
      "Playa privada + piscina infinity",
      "Camastro reservado",
      "Transporte en lancha incluido",
      "Sistema de banda inteligente",
    ],
    color: "#2A6B7C",
    popular: false,
  },
  {
    id: "vip",
    name: "VIP Cabana",
    nameEn: "VIP Cabana Experience",
    price: "Desde $500.000",
    desc: "Cabaña privada con servicio exclusivo, botella de bienvenida y mesa reservada.",
    features: [
      "Cabaña privada para 6-12 personas",
      "Botella de bienvenida",
      "Mesero dedicado",
      "Prioridad en pedidos",
      "Transporte en lancha incluido",
    ],
    color: "#C4A878",
    popular: true,
  },
  {
    id: "evento",
    name: "Evento Privado",
    nameEn: "Private Event",
    price: "Desde $2.000.000",
    desc: "Cumpleaños, despedidas de solteros, corporativos. Tu fiesta exclusiva en la isla.",
    features: [
      "Zona exclusiva reservada",
      "DJ y sonido",
      "Menú personalizado",
      "Decoración a medida",
      "Transporte grupal",
      "Fotógrafo (opcional)",
    ],
    color: "#C4654A",
    popular: false,
  },
];

const TESTIMONIALS = [
  {
    text: "El mejor beach club de Colombia sin duda. La comida, la vista, el servicio — todo perfecto.",
    name: "María C.",
    from: "Bogotá",
  },
  {
    text: "We had our bachelorette here and it was absolutely magical. The VIP cabana was worth every peso.",
    name: "Jessica R.",
    from: "Miami",
  },
  {
    text: "Celebramos el cumpleaños de mi esposa y superó todas las expectativas. Volveremos cada año.",
    name: "Carlos M.",
    from: "Medellín",
  },
];

type FormData = {
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: number;
  package: string;
  occasion: string;
  notes: string;
};

export default function ReservarPage() {
  const [form, setForm] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    date: "",
    time: "14:00",
    guests: 4,
    package: "pasadia",
    occasion: "",
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const updateField = (field: keyof FormData, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email || null,
          country_code: "+57",
          date: form.date,
          time: form.time,
          guests: form.guests,
          notes: `Paquete: ${form.package}${form.occasion ? ` | Ocasión: ${form.occasion}` : ""}${form.notes ? ` | Notas: ${form.notes}` : ""}`,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Error al enviar reservación");
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al enviar");
    } finally {
      setSubmitting(false);
    }
  };

  // ─── Success Screen ─────────────────────────────────────
  if (submitted) {
    return (
      <div className="min-h-screen bg-[var(--bb-void)] flex items-center justify-center px-5">
        <div className="max-w-md w-full text-center">
          <div
            className="w-20 h-20 rounded-full mx-auto mb-5 flex items-center justify-center"
            style={{
              background: "rgba(90,158,111,0.12)",
              border: "1px solid rgba(90,158,111,0.3)",
            }}
          >
            <span className="text-[var(--bb-ok)] text-3xl">✓</span>
          </div>
          <h1 className="text-[var(--bb-cream)] text-2xl font-serif font-light mb-2">
            Reservación Recibida
          </h1>
          <p className="text-[var(--bb-muted)] text-sm font-sans mb-6">
            Te confirmaremos por WhatsApp en los próximos minutos.
          </p>
          <div className="glass-panel rounded-2xl p-5 text-left mb-6 space-y-2">
            {[
              ["Nombre", form.name],
              ["Fecha", form.date],
              ["Hora", form.time],
              ["Personas", String(form.guests)],
              ["Paquete", PACKAGES.find((p) => p.id === form.package)?.name || form.package],
            ].map(([l, v]) => (
              <div key={l} className="flex justify-between text-sm font-sans">
                <span className="text-[var(--bb-muted)]">{l}</span>
                <span className="text-[var(--bb-cream)] font-semibold">{v}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <a
              href={`https://wa.me/573151134606?text=${encodeURIComponent(`Hola! Acabo de reservar para ${form.date} a las ${form.time} para ${form.guests} personas. Mi nombre es ${form.name}.`)}`}
              target="_blank"
              rel="noopener"
              className="flex-1 py-3 rounded-lg text-sm font-sans font-bold text-center"
              style={{
                background: "rgba(0,168,132,0.12)",
                border: "1px solid rgba(0,168,132,0.3)",
                color: "#00A884",
              }}
            >
              Confirmar por WhatsApp
            </a>
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

  return (
    <main className="min-h-screen bg-[var(--bb-void)]">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[360px] flex items-center justify-center">
        <Image
          src="/hero-bg.jpg"
          alt="Reservar en Bethel Bellini Beach Club — El mejor beach club de Cartagena en Isla Tierra Bomba"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(10,9,7,0.5)] via-[rgba(10,9,7,0.3)] to-[rgba(10,9,7,0.9)]" />
        <div className="relative z-10 text-center px-6">
          <Link
            href="/"
            className="text-[var(--bb-muted)] text-sm font-sans mb-4 inline-block"
          >
            ← Bethel Bellini
          </Link>
          <h1 className="text-3xl md:text-5xl font-serif font-light text-[var(--bb-cream)] mb-3">
            Reserva tu Experiencia en el
            <br />
            Mejor Beach Club de Cartagena
          </h1>
          <p className="text-[var(--bb-sand-mid)] text-sm font-sans max-w-xl mx-auto">
            Pasadías, cabañas VIP, fiestas privadas, cumpleaños y
            despedidas de solteros en Isla Tierra Bomba. A 5 minutos de
            Bocagrande.
          </p>
        </div>
      </section>

      {/* Packages */}
      <section className="py-12 md:py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-serif font-light text-[var(--bb-cream)] mb-2">
              Experiencias Exclusivas
            </h2>
            <p className="text-[var(--bb-muted)] text-sm font-sans">
              Elige tu paquete. Cada momento en la isla es único.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {PACKAGES.map((pkg) => (
              <button
                key={pkg.id}
                onClick={() => updateField("package", pkg.id)}
                className={`glass-panel rounded-2xl p-6 text-left transition-all relative ${
                  form.package === pkg.id
                    ? "ring-2 ring-[var(--bb-sand)] bg-[rgba(196,168,130,0.06)]"
                    : "hover:bg-[rgba(196,168,130,0.04)]"
                }`}
              >
                {pkg.popular && (
                  <span className="absolute top-4 right-4 text-[7px] tracking-[1.5px] font-sans font-bold px-2 py-1 rounded bg-[rgba(196,168,130,0.12)] text-[var(--bb-sand)]">
                    MÁS POPULAR
                  </span>
                )}
                <div
                  className="w-10 h-10 rounded-lg mb-4 flex items-center justify-center text-lg"
                  style={{ background: `${pkg.color}20`, color: pkg.color }}
                >
                  {pkg.id === "pasadia"
                    ? "🏖"
                    : pkg.id === "vip"
                      ? "🛖"
                      : "🎉"}
                </div>
                <h3 className="text-[var(--bb-cream)] text-base font-sans font-semibold mb-1">
                  {pkg.name}
                </h3>
                <p className="text-[var(--bb-sand)] text-sm font-sans font-bold mb-2">
                  {pkg.price}
                </p>
                <p className="text-[var(--bb-muted)] text-xs font-sans leading-relaxed mb-4">
                  {pkg.desc}
                </p>
                <ul className="space-y-1.5">
                  {pkg.features.map((f) => (
                    <li
                      key={f}
                      className="text-[var(--bb-muted)] text-[11px] font-sans flex items-start gap-2"
                    >
                      <span className="text-[var(--bb-ok)] text-xs mt-0.5">
                        ✓
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section
        id="form"
        className="py-12 md:py-20"
        style={{
          background:
            "linear-gradient(180deg, var(--bb-void), var(--bb-earth), var(--bb-void))",
        }}
      >
        <div className="max-w-lg mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-serif font-light text-[var(--bb-cream)] mb-2">
              Reservar Ahora
            </h2>
            <p className="text-[var(--bb-muted)] text-sm font-sans">
              Completa tus datos y te confirmaremos en minutos.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="text-[var(--bb-sand)] text-[9px] tracking-[2px] font-sans font-semibold mb-1.5 block">
                NOMBRE COMPLETO *
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
                placeholder="Tu nombre"
                className="w-full bg-[var(--bb-faint)] border border-[var(--bb-line)] rounded-xl px-4 py-3.5 text-[var(--bb-cream)] text-sm font-sans outline-none focus:border-[var(--bb-sand)] transition-colors"
              />
            </div>

            {/* Phone + Email */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[var(--bb-sand)] text-[9px] tracking-[2px] font-sans font-semibold mb-1.5 block">
                  WHATSAPP *
                </label>
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  placeholder="300 123 4567"
                  className="w-full bg-[var(--bb-faint)] border border-[var(--bb-line)] rounded-xl px-4 py-3.5 text-[var(--bb-cream)] text-sm font-sans outline-none focus:border-[var(--bb-sand)] transition-colors"
                />
              </div>
              <div>
                <label className="text-[var(--bb-muted)] text-[9px] tracking-[2px] font-sans font-semibold mb-1.5 block">
                  EMAIL
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  placeholder="tu@email.com"
                  className="w-full bg-[var(--bb-faint)] border border-[var(--bb-line)] rounded-xl px-4 py-3.5 text-[var(--bb-cream)] text-sm font-sans outline-none focus:border-[var(--bb-sand)] transition-colors"
                />
              </div>
            </div>

            {/* Date + Time */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[var(--bb-sand)] text-[9px] tracking-[2px] font-sans font-semibold mb-1.5 block">
                  FECHA *
                </label>
                <input
                  type="date"
                  required
                  value={form.date}
                  onChange={(e) => updateField("date", e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full bg-[var(--bb-faint)] border border-[var(--bb-line)] rounded-xl px-4 py-3.5 text-[var(--bb-cream)] text-sm font-sans outline-none focus:border-[var(--bb-sand)] transition-colors"
                />
              </div>
              <div>
                <label className="text-[var(--bb-sand)] text-[9px] tracking-[2px] font-sans font-semibold mb-1.5 block">
                  HORA
                </label>
                <select
                  value={form.time}
                  onChange={(e) => updateField("time", e.target.value)}
                  className="w-full bg-[var(--bb-faint)] border border-[var(--bb-line)] rounded-xl px-4 py-3.5 text-[var(--bb-cream)] text-sm font-sans outline-none focus:border-[var(--bb-sand)] transition-colors"
                >
                  {["12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"].map((h) => (
                    <option key={h} value={h}>{h}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Guests + Occasion */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[var(--bb-sand)] text-[9px] tracking-[2px] font-sans font-semibold mb-1.5 block">
                  PERSONAS *
                </label>
                <select
                  value={form.guests}
                  onChange={(e) => updateField("guests", parseInt(e.target.value))}
                  className="w-full bg-[var(--bb-faint)] border border-[var(--bb-line)] rounded-xl px-4 py-3.5 text-[var(--bb-cream)] text-sm font-sans outline-none focus:border-[var(--bb-sand)] transition-colors"
                >
                  {Array.from({ length: 20 }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? "persona" : "personas"}
                    </option>
                  ))}
                  <option value={25}>25+</option>
                  <option value={50}>50+</option>
                </select>
              </div>
              <div>
                <label className="text-[var(--bb-muted)] text-[9px] tracking-[2px] font-sans font-semibold mb-1.5 block">
                  OCASIÓN
                </label>
                <select
                  value={form.occasion}
                  onChange={(e) => updateField("occasion", e.target.value)}
                  className="w-full bg-[var(--bb-faint)] border border-[var(--bb-line)] rounded-xl px-4 py-3.5 text-[var(--bb-cream)] text-sm font-sans outline-none focus:border-[var(--bb-sand)] transition-colors"
                >
                  <option value="">Seleccionar...</option>
                  <option value="pasadia">Pasadía</option>
                  <option value="cumpleanos">Cumpleaños</option>
                  <option value="despedida">Despedida de Solteros</option>
                  <option value="bachelorette">Bachelorette</option>
                  <option value="corporativo">Evento Corporativo</option>
                  <option value="aniversario">Aniversario</option>
                  <option value="otro">Otro</option>
                </select>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="text-[var(--bb-muted)] text-[9px] tracking-[2px] font-sans font-semibold mb-1.5 block">
                NOTAS ADICIONALES
              </label>
              <textarea
                value={form.notes}
                onChange={(e) => updateField("notes", e.target.value)}
                placeholder="Detalles especiales, requerimientos alimenticios, decoración..."
                rows={3}
                className="w-full bg-[var(--bb-faint)] border border-[var(--bb-line)] rounded-xl px-4 py-3.5 text-[var(--bb-cream)] text-sm font-sans outline-none focus:border-[var(--bb-sand)] transition-colors resize-none"
              />
            </div>

            {/* Selected package indicator */}
            <div className="glass-panel rounded-xl p-4 flex items-center justify-between">
              <div>
                <span className="text-[var(--bb-muted)] text-xs font-sans">
                  Paquete:
                </span>
                <span className="text-[var(--bb-cream)] text-sm font-sans font-semibold ml-2">
                  {PACKAGES.find((p) => p.id === form.package)?.name}
                </span>
              </div>
              <span className="text-[var(--bb-sand)] text-sm font-sans font-bold">
                {PACKAGES.find((p) => p.id === form.package)?.price}
              </span>
            </div>

            {error && (
              <p className="text-[var(--bb-coral)] text-sm font-sans text-center">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-[var(--bb-sand)] text-[var(--bb-void)] py-4 rounded-xl text-sm font-sans font-bold disabled:opacity-40 transition-all"
            >
              {submitting ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-[var(--bb-void)] border-t-transparent rounded-full animate-spin" />
                  Enviando...
                </span>
              ) : (
                "Confirmar Reservación"
              )}
            </button>

            <p className="text-[var(--bb-muted)] text-[10px] font-sans text-center">
              Te confirmaremos por WhatsApp en minutos. Cerrado los lunes.
              Mar-Vie 12pm-8pm · Sáb-Dom 12pm-10pm
            </p>
          </form>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-xl font-serif font-light text-[var(--bb-cream)] text-center mb-8">
            Lo Que Dicen Nuestros Invitados
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="glass-panel rounded-2xl p-5">
                <div className="text-[var(--bb-sand)] text-sm mb-3">
                  {"★".repeat(5)}
                </div>
                <p className="text-[var(--bb-cream)] text-sm font-sans leading-relaxed mb-4 italic">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="text-[var(--bb-muted)] text-xs font-sans">
                  <span className="font-semibold text-[var(--bb-cream)]">
                    {t.name}
                  </span>{" "}
                  — {t.from}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section className="py-12">
        <div className="max-w-md mx-auto px-6 text-center">
          <h2 className="text-xl font-serif font-light text-[var(--bb-cream)] mb-3">
            ¿Prefieres Reservar por WhatsApp?
          </h2>
          <p className="text-[var(--bb-muted)] text-sm font-sans mb-5">
            Escríbenos directamente y te ayudamos a planificar tu experiencia
            perfecta.
          </p>
          <a
            href="https://wa.me/573151134606?text=Hola%20quiero%20reservar%20en%20Bethel%20Bellini"
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-sans font-bold"
            style={{
              background: "rgba(0,168,132,0.12)",
              border: "1px solid rgba(0,168,132,0.3)",
              color: "#00A884",
            }}
          >
            💬 Reservar por WhatsApp
          </a>
          <p className="text-[var(--bb-muted)] text-[11px] font-sans mt-4">
            +57 315 113 4606 · Respuesta inmediata
          </p>
        </div>
      </section>

      {/* Bottom SEO */}
      <section className="py-8 border-t border-[var(--bb-line)]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-[var(--bb-muted)] text-xs font-sans leading-relaxed">
            Bethel Bellini Beach Club — Reservaciones para pasadías, fiestas
            privadas, cumpleaños en la playa, despedidas de solteros,
            bachelorette parties y eventos corporativos en Isla Tierra Bomba,
            Cartagena de Indias. A solo 5 minutos en lancha desde Bocagrande.
            El mejor beach club de Cartagena para celebrar.
          </p>
          <Link
            href="/"
            className="text-[var(--bb-sand)] text-sm font-sans font-semibold mt-4 inline-block"
          >
            ← Volver a Bethel Bellini
          </Link>
        </div>
      </section>
    </main>
  );
}
