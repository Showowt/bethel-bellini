/**
 * Telegram Inline Keyboard builders
 * All callback_data follows pattern: action:payload
 */

import type { InlineKeyboard } from "./api";
import { menuCategories, drinkCategories, formatPrice } from "../menu-data";

// ─── Main Menu ───────────────────────────────────────────────────

export function mainMenuKeyboard(): InlineKeyboard {
  return [
    [
      { text: "🍽 Menú", callback_data: "menu:main" },
      { text: "💰 Mi Saldo", callback_data: "balance:check" },
    ],
    [
      { text: "📍 Mi Zona", callback_data: "zone:select" },
      { text: "🛒 Mi Pedido", callback_data: "cart:view" },
    ],
    [
      { text: "📋 Mis Pedidos", callback_data: "orders:history" },
      { text: "❓ Ayuda", callback_data: "help:show" },
    ],
  ];
}

// ─── Menu Categories ─────────────────────────────────────────────

export function menuCategoriesKeyboard(): InlineKeyboard {
  const foodRows: InlineKeyboard = [];
  // Food categories — 2 per row
  for (let i = 0; i < menuCategories.length; i += 2) {
    const row = [
      {
        text: menuCategories[i].name,
        callback_data: `cat:food:${menuCategories[i].id}`,
      },
    ];
    if (menuCategories[i + 1]) {
      row.push({
        text: menuCategories[i + 1].name,
        callback_data: `cat:food:${menuCategories[i + 1].id}`,
      });
    }
    foodRows.push(row);
  }

  // Drink section header
  foodRows.push([{ text: "🍸 ─── BEBIDAS ───", callback_data: "noop" }]);

  // Drink categories — 2 per row
  for (let i = 0; i < drinkCategories.length; i += 2) {
    const row = [
      {
        text: drinkCategories[i].name,
        callback_data: `cat:drink:${drinkCategories[i].id}`,
      },
    ];
    if (drinkCategories[i + 1]) {
      row.push({
        text: drinkCategories[i + 1].name,
        callback_data: `cat:drink:${drinkCategories[i + 1].id}`,
      });
    }
    foodRows.push(row);
  }

  // Bottom nav
  foodRows.push([
    { text: "🛒 Ver Pedido", callback_data: "cart:view" },
    { text: "🏠 Inicio", callback_data: "home" },
  ]);

  return foodRows;
}

// ─── Category Items ──────────────────────────────────────────────

export function categoryItemsKeyboard(
  type: "food" | "drink",
  categoryId: string,
  page: number = 0,
): { text: string; keyboard: InlineKeyboard } {
  const categories = type === "food" ? menuCategories : drinkCategories;
  const category = categories.find((c) => c.id === categoryId);

  if (!category) {
    return {
      text: "Categoría no encontrada.",
      keyboard: [[{ text: "← Categorías", callback_data: "menu:main" }]],
    };
  }

  const ITEMS_PER_PAGE = 6;
  const items = category.items;
  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);
  const pageItems = items.slice(
    page * ITEMS_PER_PAGE,
    (page + 1) * ITEMS_PER_PAGE,
  );

  let text = `<b>🍽 ${category.name}</b>\n\n`;
  const keyboard: InlineKeyboard = [];

  pageItems.forEach((item, idx) => {
    const globalIdx = page * ITEMS_PER_PAGE + idx;
    const desc =
      "description" in item && item.description
        ? `\n   <i>${(item.description as string).substring(0, 60)}${(item.description as string).length > 60 ? "..." : ""}</i>`
        : "";
    const tags =
      "tags" in item && item.tags
        ? " " + (item.tags as string[]).map(tagEmoji).join("")
        : "";
    text += `<b>${item.name}</b>${tags}\n   ${formatPrice(item.price)}${desc}\n\n`;

    keyboard.push([
      {
        text: `+ ${item.name} · ${formatPrice(item.price)}`,
        callback_data: `add:${type}:${categoryId}:${globalIdx}`,
      },
    ]);
  });

  // Pagination
  if (totalPages > 1) {
    const navRow = [];
    if (page > 0) {
      navRow.push({
        text: "← Anterior",
        callback_data: `page:${type}:${categoryId}:${page - 1}`,
      });
    }
    navRow.push({ text: `${page + 1}/${totalPages}`, callback_data: "noop" });
    if (page < totalPages - 1) {
      navRow.push({
        text: "Siguiente →",
        callback_data: `page:${type}:${categoryId}:${page + 1}`,
      });
    }
    keyboard.push(navRow);
  }

  // Bottom nav
  keyboard.push([
    { text: "← Categorías", callback_data: "menu:main" },
    { text: "🛒 Ver Pedido", callback_data: "cart:view" },
  ]);

  return { text, keyboard };
}

// ─── Zone Selection ──────────────────────────────────────────────

export const ZONES = [
  { id: "camastros-playa", name: "Camastros Playa", emoji: "🏖", desc: "Frente al mar" },
  { id: "piscina-infinity", name: "Piscina Infinity", emoji: "🏊", desc: "Área de pool" },
  { id: "palapa-vip", name: "Palapa VIP", emoji: "🛖", desc: "Zona privada" },
  { id: "bar-del-mar", name: "Bar del Mar", emoji: "🍹", desc: "Barra principal" },
  { id: "terraza-sunset", name: "Terraza Sunset", emoji: "🌅", desc: "Vista panorámica" },
  { id: "restaurante", name: "Restaurante", emoji: "🍽", desc: "Área gastronómica" },
];

export function zoneSelectionKeyboard(): InlineKeyboard {
  const keyboard: InlineKeyboard = [];
  for (let i = 0; i < ZONES.length; i += 2) {
    const row = [
      {
        text: `${ZONES[i].emoji} ${ZONES[i].name}`,
        callback_data: `zone:set:${ZONES[i].id}`,
      },
    ];
    if (ZONES[i + 1]) {
      row.push({
        text: `${ZONES[i + 1].emoji} ${ZONES[i + 1].name}`,
        callback_data: `zone:set:${ZONES[i + 1].id}`,
      });
    }
    keyboard.push(row);
  }
  keyboard.push([{ text: "🏠 Inicio", callback_data: "home" }]);
  return keyboard;
}

// ─── Cart ────────────────────────────────────────────────────────

export interface CartItem {
  name: string;
  price: number;
  qty: number;
}

export function cartKeyboard(cart: CartItem[]): InlineKeyboard {
  if (cart.length === 0) {
    return [
      [{ text: "🍽 Ver Menú", callback_data: "menu:main" }],
      [{ text: "🏠 Inicio", callback_data: "home" }],
    ];
  }

  const keyboard: InlineKeyboard = [];

  // Each item with remove button
  cart.forEach((item, idx) => {
    keyboard.push([
      { text: `❌ ${item.name} (${item.qty})`, callback_data: `cart:remove:${idx}` },
    ]);
  });

  keyboard.push([
    { text: "🗑 Vaciar", callback_data: "cart:clear" },
    { text: "🍽 Seguir Pidiendo", callback_data: "menu:main" },
  ]);

  keyboard.push([
    { text: "✅ Confirmar Pedido", callback_data: "cart:confirm" },
  ]);

  return keyboard;
}

// ─── Order Status (for staff) ────────────────────────────────────

export function staffOrderKeyboard(orderId: string): InlineKeyboard {
  return [
    [
      { text: "🍳 Preparando", callback_data: `staff:preparing:${orderId}` },
      { text: "❌ Cancelar", callback_data: `staff:cancel:${orderId}` },
    ],
  ];
}

export function staffPreparingKeyboard(orderId: string): InlineKeyboard {
  return [
    [
      { text: "✅ Listo para Entregar", callback_data: `staff:ready:${orderId}` },
      { text: "❌ Cancelar", callback_data: `staff:cancel:${orderId}` },
    ],
  ];
}

export function staffReadyKeyboard(orderId: string): InlineKeyboard {
  return [
    [
      { text: "📦 Entregado", callback_data: `staff:delivered:${orderId}` },
    ],
  ];
}

// ─── Helpers ─────────────────────────────────────────────────────

function tagEmoji(tag: string): string {
  switch (tag) {
    case "seafood": return "🐟";
    case "vegetarian": return "🌿";
    case "spicy": return "🌶";
    case "signature": return "⭐";
    case "premium": return "💎";
    default: return "";
  }
}
