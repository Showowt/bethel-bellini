"use client";

import { useState } from "react";
import {
  menuCategories,
  drinkCategories,
  formatPrice,
  type MenuCategory,
  type DrinkCategory,
} from "@/lib/menu-data";

const TAG_STYLES: Record<string, string> = {
  seafood: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  vegetarian: "bg-green-500/20 text-green-300 border-green-500/30",
  spicy: "bg-red-500/20 text-red-300 border-red-500/30",
  signature: "bg-bethel-cyan/20 text-bethel-cyan border-bethel-cyan/30",
  premium: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
};

const TAG_LABELS: Record<string, string> = {
  seafood: "🦐 Mar",
  vegetarian: "🌿 Veggie",
  spicy: "🌶️ Picante",
  signature: "⭐ Signature",
  premium: "💎 Premium",
};

type TabType = "food" | "drinks";

export function Menu() {
  const [activeTab, setActiveTab] = useState<TabType>("food");
  const [activeCategory, setActiveCategory] = useState<string>("entradas");

  const foodCategories = menuCategories.map((c) => ({
    id: c.id,
    name: c.name,
  }));
  const drinkCats = drinkCategories.map((c) => ({ id: c.id, name: c.name }));

  const currentFoodCategory = menuCategories.find(
    (c) => c.id === activeCategory,
  );
  const currentDrinkCategory = drinkCategories.find(
    (c) => c.id === activeCategory,
  );

  return (
    <section id="menu" className="py-20 bg-bethel-dark">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Menú</span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            Cocina del Caribe con influencias mediterráneas. Ingredientes
            frescos, sabores auténticos.
          </p>
        </div>

        {/* Main Tabs: Food / Drinks */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => {
              setActiveTab("food");
              setActiveCategory("entradas");
            }}
            className={`px-8 py-3 text-sm font-semibold uppercase tracking-wider transition-all ${
              activeTab === "food"
                ? "bg-bethel-cyan text-black"
                : "bg-white/5 text-white/70 hover:bg-white/10"
            }`}
          >
            🍽️ Comida
          </button>
          <button
            onClick={() => {
              setActiveTab("drinks");
              setActiveCategory("cocktails");
            }}
            className={`px-8 py-3 text-sm font-semibold uppercase tracking-wider transition-all ${
              activeTab === "drinks"
                ? "bg-bethel-cyan text-black"
                : "bg-white/5 text-white/70 hover:bg-white/10"
            }`}
          >
            🍹 Bebidas
          </button>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 max-w-4xl mx-auto">
          {(activeTab === "food" ? foodCategories : drinkCats).map(
            (category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 text-xs font-medium transition-all ${
                  activeCategory === category.id
                    ? "bg-white text-black"
                    : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
                }`}
              >
                {category.name}
              </button>
            ),
          )}
        </div>

        {/* Food Menu Grid */}
        {activeTab === "food" && currentFoodCategory && (
          <div className="animate-fadeIn">
            <h3 className="text-2xl font-bold text-center mb-2 text-white">
              {currentFoodCategory.name}
            </h3>
            <p className="text-center text-white/40 text-sm mb-8">
              {currentFoodCategory.nameEn}
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {currentFoodCategory.items.map((item, index) => (
                <div
                  key={index}
                  className="glass p-6 hover:border-bethel-cyan/30 transition-all group"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-lg font-semibold text-white group-hover:text-bethel-cyan transition-colors">
                      {item.name}
                    </h4>
                    <span className="text-bethel-cyan font-bold whitespace-nowrap ml-4">
                      {formatPrice(item.price)}
                    </span>
                  </div>
                  <p className="text-white/50 text-sm leading-relaxed mb-3">
                    {item.description}
                  </p>
                  {item.tags && item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`px-2 py-0.5 text-xs border ${TAG_STYLES[tag]}`}
                        >
                          {TAG_LABELS[tag]}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Drinks Menu Grid */}
        {activeTab === "drinks" && currentDrinkCategory && (
          <div className="animate-fadeIn">
            <h3 className="text-2xl font-bold text-center mb-2 text-white">
              {currentDrinkCategory.name}
            </h3>
            <p className="text-center text-white/40 text-sm mb-8">
              {currentDrinkCategory.nameEn}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {currentDrinkCategory.items.map((item, index) => (
                <div
                  key={index}
                  className="glass p-4 text-center hover:border-bethel-cyan/30 transition-all group"
                >
                  <h4 className="text-sm font-medium text-white group-hover:text-bethel-cyan transition-colors mb-1">
                    {item.name}
                  </h4>
                  <span className="text-bethel-cyan font-bold text-sm">
                    {formatPrice(item.price)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Note about prices */}
        <p className="text-center text-white/30 text-xs mt-12">
          Precios en COP. Los precios incluyen IMPOCONSUMO. Propina sugerida:
          10%.
        </p>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </section>
  );
}
