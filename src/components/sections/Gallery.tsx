"use client";

import { useState } from "react";

interface GalleryImage {
  src: string;
  alt: string;
  category: "venue" | "food" | "drinks" | "vibes";
}

// Placeholder images - replace with actual Bethel Bellini photos
const galleryImages: GalleryImage[] = [
  { src: "/gallery/venue-1.jpg", alt: "Beach club vista", category: "venue" },
  { src: "/gallery/venue-2.jpg", alt: "Pool area", category: "venue" },
  { src: "/gallery/venue-3.jpg", alt: "Lounge seating", category: "venue" },
  { src: "/gallery/venue-4.jpg", alt: "Ocean view", category: "venue" },
  { src: "/gallery/food-1.jpg", alt: "Ceviche", category: "food" },
  { src: "/gallery/food-2.jpg", alt: "Seafood platter", category: "food" },
  { src: "/gallery/food-3.jpg", alt: "Grilled fish", category: "food" },
  { src: "/gallery/food-4.jpg", alt: "Risotto negro", category: "food" },
  { src: "/gallery/drinks-1.jpg", alt: "Cocktails", category: "drinks" },
  {
    src: "/gallery/drinks-2.jpg",
    alt: "Champagne service",
    category: "drinks",
  },
  { src: "/gallery/drinks-3.jpg", alt: "Tropical drinks", category: "drinks" },
  { src: "/gallery/vibes-1.jpg", alt: "Sunset party", category: "vibes" },
  { src: "/gallery/vibes-2.jpg", alt: "DJ set", category: "vibes" },
  { src: "/gallery/vibes-3.jpg", alt: "Beach vibes", category: "vibes" },
];

const categories = [
  { id: "all", label: "Todo", labelEn: "All" },
  { id: "venue", label: "El Lugar", labelEn: "Venue" },
  { id: "food", label: "Gastronomía", labelEn: "Food" },
  { id: "drinks", label: "Cócteles", labelEn: "Drinks" },
  { id: "vibes", label: "Ambiente", labelEn: "Vibes" },
];

export function Gallery() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const filteredImages =
    activeFilter === "all"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeFilter);

  return (
    <section id="gallery" className="py-20 bg-bethel-black">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Galería</span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            El Reino del Realismo Mágico en imágenes. Arquitectura hecha a mano,
            mar abierto al horizonte.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveFilter(category.id)}
              className={`px-5 py-2 text-sm font-medium transition-all ${
                activeFilter === category.id
                  ? "bg-bethel-cyan text-black"
                  : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {filteredImages.map((image, index) => (
            <div
              key={index}
              onClick={() => setLightboxImage(image.src)}
              className="aspect-square relative overflow-hidden cursor-pointer group"
            >
              {/* Placeholder gradient until real images are added */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-bethel-cyan/20 via-bethel-dark to-bethel-coral/20
                           flex items-center justify-center text-white/30 text-xs"
              >
                <span className="text-center px-2">{image.alt}</span>
              </div>

              {/* Uncomment when real images are added */}
              {/* <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              /> */}

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Instagram CTA */}
        <div className="text-center mt-12">
          <a
            href="https://instagram.com/bethel_bellini_cartagena"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white font-semibold hover:opacity-90 transition-opacity"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            Síguenos en Instagram
          </a>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white/70 hover:text-white"
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
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div className="max-w-4xl max-h-[80vh] flex items-center justify-center">
            {/* Placeholder - replace with actual image */}
            <div className="w-96 h-96 bg-gradient-to-br from-bethel-cyan/30 to-bethel-coral/30 flex items-center justify-center text-white/50">
              Imagen: {lightboxImage}
            </div>
            {/* <img
              src={lightboxImage}
              alt="Gallery"
              className="max-w-full max-h-full object-contain"
            /> */}
          </div>
        </div>
      )}
    </section>
  );
}
