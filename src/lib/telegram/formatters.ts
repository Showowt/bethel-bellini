/**
 * Telegram message formatters
 * All messages use HTML parse mode
 */

import { formatPrice } from "../menu-data";
import type { CartItem } from "./keyboards";
import { ZONES } from "./keyboards";

// ─── Welcome ─────────────────────────────────────────────────────

export function welcomeMessage(firstName: string): string {
  return [
    `🌴 <b>Bienvenido a Bethel Bellini, ${escapeHtml(firstName)}!</b>`,
    ``,
    `Isla Tierra Bomba · Cartagena`,
    ``,
    `Desde aquí puedes ver el menú, hacer pedidos`,
    `y controlar tu saldo — todo sin moverte de tu zona.`,
    ``,
    `<b>¿Qué quieres hacer?</b>`,
  ].join("\n");
}

// ─── Balance ─────────────────────────────────────────────────────

export function balanceMessage(
  balance: number,
  bandId: string,
  zone: string | null,
): string {
  const zoneName = zone
    ? ZONES.find((z) => z.id === zone)?.name || zone
    : "No seleccionada";
  return [
    `💰 <b>Tu Balance Bellini</b>`,
    ``,
    `<b>${formatPrice(balance)}</b>`,
    `Disponible para consumo`,
    ``,
    `🎫 Banda: <code>${escapeHtml(bandId)}</code>`,
    `📍 Zona: ${escapeHtml(zoneName)}`,
    ``,
    `<i>Recarga tu saldo en el muelle o en el bar principal.</i>`,
  ].join("\n");
}

// ─── Cart ────────────────────────────────────────────────────────

export function cartMessage(cart: CartItem[], balance: number): string {
  if (cart.length === 0) {
    return [
      `🛒 <b>Tu Pedido</b>`,
      ``,
      `Tu pedido está vacío.`,
      `Toca <b>Ver Menú</b> para agregar items.`,
    ].join("\n");
  }

  const total = cart.reduce((s, c) => s + c.price * c.qty, 0);
  const lines = cart.map(
    (c) => `  ${c.qty}× ${escapeHtml(c.name)} — ${formatPrice(c.price * c.qty)}`,
  );

  const sufficient = balance >= total;

  return [
    `🛒 <b>Tu Pedido</b>`,
    ``,
    ...lines,
    `──────────`,
    `<b>Total: ${formatPrice(total)}</b>`,
    ``,
    `💰 Saldo: ${formatPrice(balance)} ${sufficient ? "✅" : "⚠️ Insuficiente"}`,
    sufficient
      ? `Saldo después: ${formatPrice(balance - total)}`
      : `Necesitas recargar ${formatPrice(total - balance)}`,
  ].join("\n");
}

// ─── Item Added ──────────────────────────────────────────────────

export function itemAddedMessage(
  itemName: string,
  cartCount: number,
  cartTotal: number,
): string {
  return `✅ <b>${escapeHtml(itemName)}</b> agregado · ${cartCount} items · ${formatPrice(cartTotal)}`;
}

// ─── Order Confirmed (Guest) ─────────────────────────────────────

export function orderConfirmedMessage(
  orderNumber: string,
  zone: string,
  total: number,
  newBalance: number,
  items: CartItem[],
): string {
  const zoneName = ZONES.find((z) => z.id === zone)?.name || zone;
  const itemLines = items.map(
    (c) => `  ${c.qty}× ${escapeHtml(c.name)}`,
  );

  return [
    `✅ <b>Pedido Confirmado!</b>`,
    ``,
    `📋 Orden: <code>${orderNumber}</code>`,
    `📍 Zona: ${escapeHtml(zoneName)}`,
    ``,
    ...itemLines,
    `──────────`,
    `💵 Total: <b>${formatPrice(total)}</b>`,
    `💰 Nuevo saldo: ${formatPrice(newBalance)}`,
    `⏱ Tiempo estimado: ~8 minutos`,
    ``,
    `🏃 Nuestro runner de zona te llevará tu pedido.`,
    `Relájate y disfruta del paraíso. 🌴`,
  ].join("\n");
}

// ─── Order Status Update (Guest) ─────────────────────────────────

export function orderStatusMessage(
  orderNumber: string,
  status: string,
): string {
  const statusMap: Record<string, string> = {
    preparing: "🍳 Tu pedido está <b>en preparación</b>",
    ready: "✅ Tu pedido está <b>listo!</b> Un runner va en camino",
    delivered: "📦 Tu pedido ha sido <b>entregado</b>. ¡Buen provecho!",
    cancelled: "❌ Tu pedido ha sido <b>cancelado</b>",
  };

  return [
    `📋 Pedido <code>${orderNumber}</code>`,
    ``,
    statusMap[status] || `Estado: ${status}`,
  ].join("\n");
}

// ─── Staff Notification ──────────────────────────────────────────

export function staffNewOrderMessage(
  orderNumber: string,
  guestName: string,
  guestPhone: string,
  zone: string,
  items: CartItem[],
  total: number,
): string {
  const zoneName = ZONES.find((z) => z.id === zone)?.name || zone;
  const itemLines = items.map(
    (c) => `  ${c.qty}× ${escapeHtml(c.name)} — ${formatPrice(c.price * c.qty)}`,
  );

  return [
    `🔔 <b>NUEVO PEDIDO ${orderNumber}</b>`,
    ``,
    `👤 ${escapeHtml(guestName)}`,
    `📱 ${escapeHtml(guestPhone)}`,
    `📍 <b>${escapeHtml(zoneName)}</b>`,
    ``,
    ...itemLines,
    `──────────`,
    `💵 Total: <b>${formatPrice(total)}</b>`,
  ].join("\n");
}

// ─── Zone Selected ───────────────────────────────────────────────

export function zoneSelectedMessage(zoneId: string): string {
  const zone = ZONES.find((z) => z.id === zoneId);
  if (!zone) return "📍 Zona actualizada.";
  return `${zone.emoji} Zona actualizada: <b>${zone.name}</b>\n${zone.desc}\n\nTu pedido se entregará aquí.`;
}

// ─── Help ────────────────────────────────────────────────────────

export function helpMessage(): string {
  return [
    `❓ <b>Ayuda — Bethel Bellini Bot</b>`,
    ``,
    `<b>Comandos:</b>`,
    `/start — Inicio`,
    `/menu — Ver la carta`,
    `/cart — Ver tu pedido`,
    `/balance — Consultar saldo`,
    `/zone — Cambiar zona`,
    `/orders — Historial de pedidos`,
    `/help — Esta ayuda`,
    ``,
    `<b>¿Cómo funciona?</b>`,
    `1. Recarga tu saldo en el muelle o bar`,
    `2. Selecciona tu zona`,
    `3. Navega el menú y agrega items`,
    `4. Confirma tu pedido`,
    `5. Un runner te lo lleva 🏃`,
    ``,
    `<b>¿Necesitas ayuda?</b>`,
    `Escribe tu mensaje y un miembro del equipo te asistirá.`,
  ].join("\n");
}

// ─── No Session ──────────────────────────────────────────────────

export function noSessionMessage(): string {
  return [
    `⚠️ <b>No tienes una sesión activa</b>`,
    ``,
    `Necesitas hacer check-in primero.`,
    `Visita el muelle o escanea tu banda para activar tu sesión.`,
    ``,
    `O usa /start para comenzar.`,
  ].join("\n");
}

// ─── Order History ───────────────────────────────────────────────

export function orderHistoryMessage(
  orders: Array<{
    order_number: string;
    status: string;
    total: number;
    created_at: string;
    zone: string;
  }>,
): string {
  if (orders.length === 0) {
    return `📋 <b>Mis Pedidos</b>\n\nNo tienes pedidos aún. ¡Navega el menú para hacer tu primer pedido!`;
  }

  const statusEmoji: Record<string, string> = {
    pending: "⏳",
    preparing: "🍳",
    ready: "✅",
    delivered: "📦",
    cancelled: "❌",
  };

  const lines = orders.map((o) => {
    const emoji = statusEmoji[o.status] || "❓";
    const date = new Date(o.created_at);
    const time = date.toLocaleTimeString("es-CO", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "America/Bogota",
    });
    return `${emoji} <code>${o.order_number}</code> · ${formatPrice(o.total)} · ${time}`;
  });

  return [`📋 <b>Mis Pedidos</b>`, ``, ...lines].join("\n");
}

// ─── HTML escape ─────────────────────────────────────────────────

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
