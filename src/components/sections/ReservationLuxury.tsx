"use client";

import { useState } from "react";

const TIME_SLOTS = [
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];

interface FormData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
  message: string;
}

export function ReservationLuxury() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "12:00",
    guests: "2",
    message: "",
  });

  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email || null,
          phone: formData.phone,
          country_code: "+57",
          date: formData.date,
          time: formData.time,
          guests: parseInt(formData.guests),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Error al enviar reservación");
      }

      setSuccess(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al enviar reservación",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (success) {
    return (
      <section id="reservar" className="relative bg-bethel-dark py-24">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="w-16 h-16 mx-auto mb-6 border border-bethel-cyan/30 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-bethel-cyan"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 className="text-3xl font-light text-white mb-4">
            Reservación Recibida
          </h3>
          <p className="text-white/50 font-light">
            Te contactaremos por WhatsApp para confirmar tu reservación en
            Bethel Bellini Beach Club.
          </p>
          <div className="mt-8 p-6 border border-white/10">
            <p className="text-bethel-coral font-light">
              {formData.date} · {formData.time} · {formData.guests} personas
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="reservar" className="relative bg-bethel-dark">
      <div className="grid md:grid-cols-2">
        {/* Left - Image */}
        <div
          className="relative min-h-[400px] md:min-h-[700px] bg-cover bg-center"
          style={{ backgroundImage: 'url("/gallery/vibes-1.jpg")' }}
        >
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex items-center justify-center p-8">
            <div className="text-center">
              <span className="text-bethel-coral text-xs uppercase tracking-[0.4em] font-light">
                Experiencia
              </span>
              <h2 className="text-4xl md:text-5xl font-light tracking-wide text-white mt-4">
                Reservar Mesa
              </h2>
              <p className="text-white/50 mt-6 max-w-sm mx-auto font-light">
                Asegura tu lugar en el Reino del Realismo Mágico
              </p>
            </div>
          </div>
        </div>

        {/* Right - Form */}
        <div className="bg-bethel-black p-8 md:p-16 flex items-center">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md mx-auto space-y-6"
          >
            {/* Name */}
            <div>
              <label className="block text-white/40 text-xs uppercase tracking-wider mb-2">
                Nombre Completo
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:border-bethel-cyan outline-none transition-colors font-light"
                placeholder="Tu nombre"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-white/40 text-xs uppercase tracking-wider mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:border-bethel-cyan outline-none transition-colors font-light"
                placeholder="tu@email.com"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-white/40 text-xs uppercase tracking-wider mb-2">
                Teléfono / WhatsApp
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:border-bethel-cyan outline-none transition-colors font-light"
                placeholder="+57 300 123 4567"
              />
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-white/40 text-xs uppercase tracking-wider mb-2">
                  Fecha
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  min={today}
                  required
                  className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:border-bethel-cyan outline-none transition-colors font-light"
                />
              </div>
              <div>
                <label className="block text-white/40 text-xs uppercase tracking-wider mb-2">
                  Hora
                </label>
                <select
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:border-bethel-cyan outline-none transition-colors font-light appearance-none cursor-pointer"
                >
                  {TIME_SLOTS.map((time) => (
                    <option key={time} value={time} className="bg-bethel-black">
                      {time}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Guests */}
            <div>
              <label className="block text-white/40 text-xs uppercase tracking-wider mb-2">
                Número de Personas
              </label>
              <select
                name="guests"
                value={formData.guests}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:border-bethel-cyan outline-none transition-colors font-light appearance-none cursor-pointer"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                  <option key={n} value={n} className="bg-bethel-black">
                    {n} {n === 1 ? "persona" : "personas"}
                  </option>
                ))}
                <option value="10+" className="bg-bethel-black">
                  Más de 10 personas
                </option>
              </select>
            </div>

            {/* Error */}
            {error && (
              <div className="py-3 text-bethel-coral text-sm font-light">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-8 py-4 border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-500 font-light tracking-wider text-sm uppercase disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Enviando..." : "Confirmar Reservación"}
            </button>

            {/* WhatsApp alternative */}
            <p className="text-center text-white/30 text-xs font-light pt-4">
              ¿Prefieres contactarnos directamente?{" "}
              <a
                href="https://wa.me/573001234567"
                target="_blank"
                rel="noopener noreferrer"
                className="text-bethel-cyan hover:text-white transition-colors"
              >
                Escríbenos por WhatsApp
              </a>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
