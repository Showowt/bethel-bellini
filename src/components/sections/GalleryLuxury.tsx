"use client";

import { useState } from "react";
import Image from "next/image";

interface GalleryImage {
  src: string;
  alt: string;
  span?: "wide" | "tall" | "normal";
}

const galleryImages: GalleryImage[] = [
  {
    src: "/gallery/venue-2.jpg",
    alt: "Llegada al paraíso - Muelle con trono dorado",
    span: "wide",
  },
  {
    src: "/gallery/venue-1.jpg",
    alt: "Entrada Bethel Bellini",
    span: "tall",
  },
  {
    src: "/gallery/food-1.jpg",
    alt: "Arroz meloso de mariscos",
    span: "normal",
  },
  {
    src: "/gallery/venue-3.jpg",
    alt: "Vista al mar desde arquitectura de bambú",
    span: "normal",
  },
  {
    src: "/gallery/vibes-1.jpg",
    alt: "Noches mágicas con iluminación escénica",
    span: "wide",
  },
];

export function GalleryLuxury() {
  const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null);

  return (
    <section id="gallery" className="relative">
      {/* Header */}
      <div className="bg-bethel-black py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="text-bethel-coral text-xs uppercase tracking-[0.4em] font-light">
            Galería
          </span>
          <h2 className="text-4xl md:text-5xl font-light tracking-wide text-white mt-4">
            El Reino del Realismo Mágico
          </h2>
          <p className="text-white/40 mt-6 max-w-xl mx-auto font-light">
            Arquitectura hecha a mano. Mar abierto al horizonte. Un sonido que
            guía lo que está por venir.
          </p>
        </div>
      </div>

      {/* Masonry-style Grid */}
      <div className="bg-bethel-dark">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
            {galleryImages.map((image, index) => {
              const spanClass =
                image.span === "wide"
                  ? "col-span-2"
                  : image.span === "tall"
                    ? "row-span-2"
                    : "";

              return (
                <div
                  key={index}
                  onClick={() => setLightboxImage(image)}
                  className={`relative overflow-hidden cursor-pointer group ${spanClass} ${
                    image.span === "wide" ? "aspect-[2/1]" : "aspect-square"
                  }`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500" />

                  {/* Caption on hover */}
                  <div className="absolute inset-0 flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <p className="text-white text-sm font-light">{image.alt}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Instagram CTA */}
      <div className="bg-bethel-black py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-white/40 text-sm font-light mb-6">
            Descubre más momentos en nuestras redes
          </p>
          <a
            href="https://instagram.com/bethel_bellini_cartagena"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-white hover:text-bethel-cyan transition-colors group"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            <span className="text-lg tracking-wide">
              @bethel_bellini_cartagena
            </span>
            <svg
              className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 bg-black/98 z-50 flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <button
            className="absolute top-6 right-6 text-white/50 hover:text-white z-10 transition-colors"
            onClick={() => setLightboxImage(null)}
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div className="relative w-full max-w-5xl">
            <Image
              src={lightboxImage.src}
              alt={lightboxImage.alt}
              width={1400}
              height={900}
              className="object-contain w-full max-h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            />
            <p className="text-center text-white/50 mt-6 text-sm font-light tracking-wide">
              {lightboxImage.alt}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
