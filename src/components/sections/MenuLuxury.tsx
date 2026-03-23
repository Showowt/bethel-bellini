"use client";

import { useRef } from "react";
import Image from "next/image";
import { menuCategories, drinkCategories, formatPrice } from "@/lib/menu-data";

// Featured signature dishes to highlight
const featuredDishes = [
  {
    name: "Risotto Negro",
    description: "En tinta de calamar con Langostinos rostizados",
    price: 135000,
    image: "/gallery/food-1.jpg",
  },
  {
    name: "Cowboy 1 kg",
    description: "Corte premium Black Angus para compartir",
    price: 650000,
    image: "/gallery/venue-3.jpg",
  },
  {
    name: "Pulpo Rostizado",
    description: "Sobre puré cremoso de yuca y chimichurri",
    price: 65000,
    image: "/gallery/food-1.jpg",
  },
];

function MenuCategory({
  category,
  index,
}: {
  category: (typeof menuCategories)[0];
  index: number;
}) {
  const isEven = index % 2 === 0;

  return (
    <div className="py-16 border-b border-white/5 last:border-b-0">
      {/* Category Header */}
      <div
        className={`flex items-center gap-4 mb-10 ${isEven ? "" : "justify-end"}`}
      >
        <div className={`${isEven ? "" : "text-right"}`}>
          <span className="text-bethel-coral text-xs uppercase tracking-[0.3em] font-light">
            {category.nameEn}
          </span>
          <h3 className="text-3xl md:text-4xl font-light tracking-wide text-white mt-1">
            {category.name}
          </h3>
        </div>
        <div className="h-px flex-1 bg-gradient-to-r from-bethel-coral/50 to-transparent" />
      </div>

      {/* Items Grid */}
      <div className="grid md:grid-cols-2 gap-x-16 gap-y-8">
        {category.items.map((item, itemIndex) => (
          <div key={itemIndex} className="group">
            <div className="flex justify-between items-baseline gap-4">
              <h4 className="text-lg text-white group-hover:text-bethel-cyan transition-colors font-medium">
                {item.name}
              </h4>
              <div className="flex-1 border-b border-dotted border-white/20 mb-1" />
              <span className="text-bethel-coral font-light">
                {formatPrice(item.price)}
              </span>
            </div>
            <p className="text-white/40 text-sm mt-2 leading-relaxed font-light">
              {item.description}
            </p>
            {item.tags && item.tags.length > 0 && (
              <div className="flex gap-2 mt-2">
                {item.tags.includes("signature") && (
                  <span className="text-[10px] uppercase tracking-wider text-bethel-cyan">
                    Chef's Selection
                  </span>
                )}
                {item.tags.includes("premium") && (
                  <span className="text-[10px] uppercase tracking-wider text-bethel-coral">
                    Premium
                  </span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function DrinksSection() {
  const cocktails = drinkCategories.find((c) => c.id === "cocktails");
  const champagne = drinkCategories.find((c) => c.id === "champagne");
  const spirits = drinkCategories.find((c) => c.id === "spirits");

  return (
    <div className="py-16">
      <div className="text-center mb-16">
        <span className="text-bethel-coral text-xs uppercase tracking-[0.3em] font-light">
          Bar & Lounge
        </span>
        <h3 className="text-3xl md:text-4xl font-light tracking-wide text-white mt-2">
          Bebidas
        </h3>
      </div>

      <div className="grid md:grid-cols-3 gap-12">
        {/* Cocktails */}
        {cocktails && (
          <div>
            <h4 className="text-lg text-bethel-cyan mb-6 font-medium tracking-wide">
              Cócteles
            </h4>
            <div className="space-y-3">
              {cocktails.items.slice(0, 8).map((item, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="text-white/70">{item.name}</span>
                  <span className="text-white/40">
                    {formatPrice(item.price)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Champagne */}
        {champagne && (
          <div>
            <h4 className="text-lg text-bethel-cyan mb-6 font-medium tracking-wide">
              Champagne
            </h4>
            <div className="space-y-3">
              {champagne.items.map((item, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="text-white/70">{item.name}</span>
                  <span className="text-white/40">
                    {formatPrice(item.price)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Premium Spirits */}
        {spirits && (
          <div>
            <h4 className="text-lg text-bethel-cyan mb-6 font-medium tracking-wide">
              Tragos Premium
            </h4>
            <div className="space-y-3">
              {spirits.items.slice(0, 8).map((item, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="text-white/70">{item.name}</span>
                  <span className="text-white/40">
                    {formatPrice(item.price)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function MenuLuxury() {
  // Only show key food categories
  const keyCategories = menuCategories.filter((c) =>
    ["entradas", "pescado", "cortes", "pasta"].includes(c.id),
  );

  return (
    <section id="menu" className="relative">
      {/* Hero Section */}
      <div className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url("/gallery/venue-3.jpg")' }}
        >
          <div className="absolute inset-0 bg-black/70" />
        </div>
        <div className="relative z-10 text-center px-4">
          <span className="text-bethel-coral text-xs uppercase tracking-[0.4em] font-light">
            Gastronomía del Caribe
          </span>
          <h2 className="text-5xl md:text-7xl font-light tracking-wide text-white mt-4">
            Nuestra Carta
          </h2>
          <p className="text-white/50 mt-6 max-w-xl mx-auto font-light leading-relaxed">
            Cocina de autor con raíces caribeñas y toques mediterráneos.
            Ingredientes del mar y la tierra, preparados con pasión.
          </p>
        </div>
      </div>

      {/* Featured Dishes */}
      <div className="bg-bethel-black py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-bethel-coral text-xs uppercase tracking-[0.3em] font-light">
              Destacados
            </span>
            <h3 className="text-3xl md:text-4xl font-light tracking-wide text-white mt-2">
              Selección del Chef
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredDishes.map((dish, index) => (
              <div key={index} className="group">
                <div className="aspect-[4/3] relative overflow-hidden mb-4">
                  <Image
                    src={dish.image}
                    alt={dish.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-bethel-coral text-2xl font-light">
                      {formatPrice(dish.price)}
                    </span>
                  </div>
                </div>
                <h4 className="text-xl text-white font-medium">{dish.name}</h4>
                <p className="text-white/40 text-sm mt-1 font-light">
                  {dish.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Full Menu */}
      <div className="bg-bethel-dark">
        <div className="max-w-5xl mx-auto px-4 py-20">
          {keyCategories.map((category, index) => (
            <MenuCategory key={category.id} category={category} index={index} />
          ))}

          <DrinksSection />

          {/* Note */}
          <div className="text-center pt-12 border-t border-white/5">
            <p className="text-white/30 text-xs font-light tracking-wide">
              Precios en COP · Propina sugerida 10% · Menú sujeto a
              disponibilidad
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
