"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";

const COUNTRY_CODES = [
  { value: "+57", label: "🇨🇴 +57" },
  { value: "+1", label: "🇺🇸 +1" },
  { value: "+34", label: "🇪🇸 +34" },
  { value: "+52", label: "🇲🇽 +52" },
  { value: "+54", label: "🇦🇷 +54" },
  { value: "+55", label: "🇧🇷 +55" },
  { value: "+56", label: "🇨🇱 +56" },
  { value: "+58", label: "🇻🇪 +58" },
];

const TIME_SLOTS = [
  { value: "10:00", label: "10:00 AM" },
  { value: "11:00", label: "11:00 AM" },
  { value: "12:00", label: "12:00 PM" },
  { value: "13:00", label: "1:00 PM" },
  { value: "14:00", label: "2:00 PM" },
  { value: "15:00", label: "3:00 PM" },
  { value: "16:00", label: "4:00 PM" },
  { value: "17:00", label: "5:00 PM" },
];

const GUEST_OPTIONS = [
  { value: "1", label: "1 persona" },
  { value: "2", label: "2 personas" },
  { value: "3", label: "3 personas" },
  { value: "4", label: "4 personas" },
  { value: "5", label: "5 personas" },
  { value: "6", label: "6 personas" },
  { value: "7", label: "7 personas" },
  { value: "8", label: "8+ personas" },
];

interface FormData {
  name: string;
  email: string;
  countryCode: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
}

export function ReservationCard() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    countryCode: "+57",
    phone: "",
    date: "",
    time: "12:00",
    guests: "2",
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
          country_code: formData.countryCode,
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
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (success) {
    return (
      <div className="card-container shimmer-border p-8 text-center">
        <div className="text-6xl mb-4">🌴</div>
        <h3 className="text-2xl font-bold text-bethel-cyan mb-4">
          ¡Reservación Recibida!
        </h3>
        <p className="text-white/70 mb-6">
          Te contactaremos por WhatsApp para confirmar tu reservación en Bethel
          Bellini Beach Club.
        </p>
        <p className="text-bethel-cyan font-semibold">
          {formData.date} • {formData.time} • {formData.guests} personas
        </p>
      </div>
    );
  }

  return (
    <div
      className={`flip-card w-full max-w-md mx-auto ${isFlipped ? "flipped" : ""}`}
      style={{ perspective: "1000px" }}
    >
      <div
        className="flip-card-inner relative w-full"
        style={{
          transformStyle: "preserve-3d",
          transition: "transform 0.8s",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front Side */}
        <div
          className="card-container shimmer-border p-8 flex flex-col items-center"
          style={{ backfaceVisibility: "hidden" }}
        >
          <p className="text-center text-white/80 mb-6 leading-relaxed text-sm">
            <span className="text-bethel-cyan font-semibold">
              El Reino del Realismo Mágico de Bethel Bellini se activa.
            </span>
            <br />
            <br />
            Para quienes ya lo han visto todo y aún buscan lo que el mundo no
            ofrece.
            <br />
            <br />A tan solo 5 minutos de Cartagena, en la isla ancestral de
            Tierra Bomba.
          </p>

          <p className="text-xs text-white/40 mb-6 italic text-center">
            Arquitectura hecha a mano. Mar abierto al horizonte. Un sonido que
            guía lo que está por venir.
          </p>

          <p className="text-bethel-cyan font-bold mb-6 text-center">
            Bethel Bellini
            <br />
            <span className="text-white/60 font-normal text-sm">
              Único, exclusivo y mundial.
            </span>
          </p>

          <Button
            onClick={() => setIsFlipped(true)}
            variant="primary"
            size="lg"
            className="w-full"
          >
            Reservar
          </Button>

          <a
            href="https://wa.me/573001234567"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 text-bethel-cyan hover:text-white transition-colors flex items-center gap-2 text-sm"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Contactar por WhatsApp
          </a>
        </div>

        {/* Back Side - Form */}
        <div
          className="card-container shimmer-border p-8 absolute inset-0"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <button
            onClick={() => setIsFlipped(false)}
            className="absolute top-4 left-4 text-white/50 hover:text-white transition-colors text-sm"
          >
            ← Volver
          </button>

          <h3 className="text-xl font-bold text-center mb-6 text-bethel-cyan">
            Reservar Mesa
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              name="name"
              label="Nombre completo"
              placeholder="Tu nombre"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <Input
              name="email"
              type="email"
              label="Email (opcional)"
              placeholder="tu@email.com"
              value={formData.email}
              onChange={handleChange}
            />

            <div className="grid grid-cols-3 gap-2">
              <Select
                name="countryCode"
                label="País"
                options={COUNTRY_CODES}
                value={formData.countryCode}
                onChange={handleChange}
              />
              <div className="col-span-2">
                <Input
                  name="phone"
                  type="tel"
                  label="Teléfono"
                  placeholder="300 123 4567"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                name="date"
                type="date"
                label="Fecha"
                min={today}
                value={formData.date}
                onChange={handleChange}
                required
              />
              <Select
                name="time"
                label="Hora"
                options={TIME_SLOTS}
                value={formData.time}
                onChange={handleChange}
              />
            </div>

            <Select
              name="guests"
              label="Número de personas"
              options={GUEST_OPTIONS}
              value={formData.guests}
              onChange={handleChange}
            />

            {error && (
              <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-2 text-sm">
                {error}
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full mt-6"
              loading={loading}
            >
              Confirmar Reservación
            </Button>
          </form>
        </div>
      </div>

      <style jsx>{`
        .card-container {
          background: rgba(0, 0, 0, 0.85);
          border: 1px solid rgba(0, 255, 255, 0.2);
          min-height: 420px;
        }
        .shimmer-border {
          position: relative;
        }
        .shimmer-border::before {
          content: "";
          position: absolute;
          inset: -2px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(0, 255, 255, 0.4),
            transparent
          );
          background-size: 200% 100%;
          animation: shimmer 3s ease-in-out infinite;
          z-index: -1;
        }
        @keyframes shimmer {
          0%,
          100% {
            background-position: 200% 0;
          }
          50% {
            background-position: -200% 0;
          }
        }
      `}</style>
    </div>
  );
}
