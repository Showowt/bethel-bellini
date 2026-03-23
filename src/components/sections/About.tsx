"use client";

import Image from "next/image";

export function About() {
  return (
    <section className="relative bg-bethel-black py-24 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-1/3 h-px bg-gradient-to-r from-transparent via-bethel-coral/30 to-transparent" />
      <div className="absolute bottom-0 right-0 w-1/3 h-px bg-gradient-to-l from-transparent via-bethel-cyan/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src="/gallery/venue-2.jpg"
              alt="Bethel Bellini - Llegada al paraíso"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>

          {/* Content */}
          <div>
            <span className="text-bethel-coral text-xs uppercase tracking-[0.4em] font-light">
              Nuestra Historia
            </span>
            <h2 className="text-4xl md:text-5xl font-light tracking-wide text-white mt-4 leading-tight">
              El Reino del
              <br />
              <span className="text-bethel-coral">Realismo Mágico</span>
            </h2>

            <div className="mt-8 space-y-6 text-white/50 font-light leading-relaxed">
              <p>
                Para quienes ya lo han visto todo y aún buscan lo que el mundo
                no ofrece. A tan solo 5 minutos de Cartagena, en la isla
                ancestral de Tierra Bomba.
              </p>
              <p>
                Arquitectura hecha a mano. Mar abierto al horizonte. Un sonido
                que guía lo que está por venir.
              </p>
              <p className="text-white/70">
                Bethel Bellini — Único, exclusivo y mundial.
              </p>
            </div>

            {/* Features */}
            <div className="mt-12 grid grid-cols-3 gap-8">
              <div>
                <span className="text-3xl font-light text-bethel-cyan">5</span>
                <p className="text-white/40 text-xs uppercase tracking-wider mt-1">
                  Minutos de Cartagena
                </p>
              </div>
              <div>
                <span className="text-3xl font-light text-bethel-cyan">∞</span>
                <p className="text-white/40 text-xs uppercase tracking-wider mt-1">
                  Vista al Mar
                </p>
              </div>
              <div>
                <span className="text-3xl font-light text-bethel-cyan">
                  365
                </span>
                <p className="text-white/40 text-xs uppercase tracking-wider mt-1">
                  Días de Sol
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
