import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import {
  sendMessage,
  editMessage,
  answerCallbackQuery,
  extractCommand,
  type TelegramUpdate,
  type TelegramUser,
} from "@/lib/telegram/api";
import {
  mainMenuKeyboard,
  menuCategoriesKeyboard,
  categoryItemsKeyboard,
  zoneSelectionKeyboard,
  cartKeyboard,
  staffOrderKeyboard,
  staffPreparingKeyboard,
  staffReadyKeyboard,
  ZONES,
  type CartItem,
} from "@/lib/telegram/keyboards";
import {
  welcomeMessage,
  balanceMessage,
  cartMessage,
  itemAddedMessage,
  orderConfirmedMessage,
  orderStatusMessage,
  staffNewOrderMessage,
  zoneSelectedMessage,
  helpMessage,
  noSessionMessage,
  orderHistoryMessage,
} from "@/lib/telegram/formatters";
import { menuCategories, drinkCategories } from "@/lib/menu-data";

const WEBHOOK_SECRET = process.env.TELEGRAM_WEBHOOK_SECRET;
const STAFF_CHAT_ID = process.env.TELEGRAM_STAFF_CHAT_ID;

// ═══════════════════════════════════════════════════════════════════
// WEBHOOK ENDPOINT
// ═══════════════════════════════════════════════════════════════════

export async function POST(request: NextRequest) {
  try {
    // Verify webhook secret
    if (WEBHOOK_SECRET) {
      const secret = request.headers.get("x-telegram-bot-api-secret-token");
      if (secret !== WEBHOOK_SECRET) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    }

    const update: TelegramUpdate = await request.json();

    // Handle commands (text messages)
    if (update.message?.text) {
      await handleMessage(update);
    }

    // Handle button taps (callback queries)
    if (update.callback_query) {
      await handleCallback(update);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[Telegram Webhook] Error:", error);
    // Always return 200 to prevent Telegram from retrying
    return NextResponse.json({ ok: true });
  }
}

// ═══════════════════════════════════════════════════════════════════
// MESSAGE HANDLER (Commands + Text)
// ═══════════════════════════════════════════════════════════════════

async function handleMessage(update: TelegramUpdate) {
  const msg = update.message!;
  const chatId = msg.chat.id;
  const user = msg.from;
  if (!user) return;

  const command = extractCommand(msg);

  switch (command) {
    case "/start":
      await handleStart(chatId, user);
      break;
    case "/menu":
      await handleMenu(chatId);
      break;
    case "/cart":
      await handleCart(chatId, user.id);
      break;
    case "/balance":
      await handleBalance(chatId, user.id);
      break;
    case "/zone":
      await handleZone(chatId);
      break;
    case "/orders":
      await handleOrderHistory(chatId, user.id);
      break;
    case "/help":
      await sendMessage({
        chat_id: chatId,
        text: helpMessage(),
        reply_markup: { inline_keyboard: mainMenuKeyboard() },
      });
      break;
    default:
      // No command — could be a free-text message
      // Future: forward to staff for support
      if (!command && msg.text) {
        await sendMessage({
          chat_id: chatId,
          text: `Usa los botones o escribe /menu para ver la carta. /help para más opciones.`,
          reply_markup: { inline_keyboard: mainMenuKeyboard() },
        });
      }
      break;
  }
}

// ═══════════════════════════════════════════════════════════════════
// CALLBACK HANDLER (Inline Keyboard Buttons)
// ═══════════════════════════════════════════════════════════════════

async function handleCallback(update: TelegramUpdate) {
  const cb = update.callback_query!;
  const chatId = cb.message?.chat.id;
  const messageId = cb.message?.message_id;
  const userId = cb.from.id;
  const data = cb.data || "";

  if (!chatId || !messageId) {
    await answerCallbackQuery(cb.id);
    return;
  }

  // Parse action:payload
  const [action, ...rest] = data.split(":");
  const payload = rest.join(":");

  try {
    switch (action) {
      case "home":
        await editMessage({
          chat_id: chatId,
          message_id: messageId,
          text: welcomeMessage(cb.from.first_name),
          reply_markup: { inline_keyboard: mainMenuKeyboard() },
        });
        break;

      case "menu":
        await editMessage({
          chat_id: chatId,
          message_id: messageId,
          text: `🍽 <b>La Carta — Bethel Bellini</b>\n\nElige una categoría:`,
          reply_markup: { inline_keyboard: menuCategoriesKeyboard() },
        });
        break;

      case "cat": {
        const [type, catId] = payload.split(":");
        const result = categoryItemsKeyboard(
          type as "food" | "drink",
          catId,
          0,
        );
        await editMessage({
          chat_id: chatId,
          message_id: messageId,
          text: result.text,
          reply_markup: { inline_keyboard: result.keyboard },
        });
        break;
      }

      case "page": {
        const [type, catId, pageStr] = payload.split(":");
        const result = categoryItemsKeyboard(
          type as "food" | "drink",
          catId,
          parseInt(pageStr),
        );
        await editMessage({
          chat_id: chatId,
          message_id: messageId,
          text: result.text,
          reply_markup: { inline_keyboard: result.keyboard },
        });
        break;
      }

      case "add": {
        await handleAddToCart(cb.id, chatId, messageId, userId, payload);
        break;
      }

      case "cart": {
        switch (payload) {
          case "view":
            await handleCartView(cb.id, chatId, messageId, userId);
            break;
          case "confirm":
            await handleCartConfirm(cb.id, chatId, messageId, userId);
            break;
          case "clear":
            await handleCartClear(cb.id, chatId, messageId, userId);
            break;
          default:
            if (payload.startsWith("remove:")) {
              await handleCartRemove(
                cb.id,
                chatId,
                messageId,
                userId,
                parseInt(payload.split(":")[1]),
              );
            }
            break;
        }
        break;
      }

      case "zone": {
        if (payload === "select") {
          await editMessage({
            chat_id: chatId,
            message_id: messageId,
            text: `📍 <b>¿Dónde te encuentras?</b>\n\nSelecciona tu zona para que tu pedido llegue directo a ti.`,
            reply_markup: { inline_keyboard: zoneSelectionKeyboard() },
          });
        } else if (payload.startsWith("set:")) {
          await handleZoneSet(cb.id, chatId, messageId, userId, payload.slice(4));
        }
        break;
      }

      case "balance": {
        if (payload === "check") {
          await handleBalanceCheck(cb.id, chatId, messageId, userId);
        }
        break;
      }

      case "orders": {
        if (payload === "history") {
          await handleOrderHistoryEdit(cb.id, chatId, messageId, userId);
        }
        break;
      }

      case "help": {
        await editMessage({
          chat_id: chatId,
          message_id: messageId,
          text: helpMessage(),
          reply_markup: {
            inline_keyboard: [[{ text: "🏠 Inicio", callback_data: "home" }]],
          },
        });
        break;
      }

      // Staff actions
      case "staff": {
        await handleStaffAction(cb.id, chatId, messageId, payload);
        break;
      }

      case "noop":
        break;
    }
  } catch (error) {
    console.error("[Telegram Callback] Error:", error);
  }

  await answerCallbackQuery(cb.id);
}

// ═══════════════════════════════════════════════════════════════════
// COMMAND HANDLERS
// ═══════════════════════════════════════════════════════════════════

async function handleStart(chatId: number, user: TelegramUser) {
  const supabase = await createServiceClient();

  // Find or create guest by telegram_id
  const { data: existingGuest } = await supabase
    .from("guests")
    .select("*")
    .eq("telegram_id", user.id)
    .single();

  if (!existingGuest) {
    // Create new guest with telegram info
    const displayName = [user.first_name, user.last_name]
      .filter(Boolean)
      .join(" ");
    await supabase.from("guests").insert({
      phone: `tg:${user.id}`,
      name: displayName || "Invitado",
      telegram_id: user.id,
      telegram_username: user.username || null,
    } as never);
  } else {
    // Update telegram info
    await supabase
      .from("guests")
      .update({
        telegram_username: user.username || null,
        updated_at: new Date().toISOString(),
      } as never)
      .eq("telegram_id", user.id);
  }

  await sendMessage({
    chat_id: chatId,
    text: welcomeMessage(user.first_name),
    reply_markup: { inline_keyboard: mainMenuKeyboard() },
  });
}

async function handleMenu(chatId: number) {
  await sendMessage({
    chat_id: chatId,
    text: `🍽 <b>La Carta — Bethel Bellini</b>\n\nElige una categoría:`,
    reply_markup: { inline_keyboard: menuCategoriesKeyboard() },
  });
}

async function handleCart(chatId: number, telegramId: number) {
  const session = await getActiveSession(telegramId);
  if (!session) {
    await sendMessage({
      chat_id: chatId,
      text: noSessionMessage(),
      reply_markup: { inline_keyboard: mainMenuKeyboard() },
    });
    return;
  }

  const cart = (session.cart || []) as CartItem[];
  await sendMessage({
    chat_id: chatId,
    text: cartMessage(cart, session.balance),
    reply_markup: { inline_keyboard: cartKeyboard(cart) },
  });
}

async function handleBalance(chatId: number, telegramId: number) {
  const session = await getActiveSession(telegramId);
  if (!session) {
    await sendMessage({
      chat_id: chatId,
      text: noSessionMessage(),
      reply_markup: { inline_keyboard: mainMenuKeyboard() },
    });
    return;
  }

  await sendMessage({
    chat_id: chatId,
    text: balanceMessage(session.balance, session.band_id, session.zone),
    reply_markup: {
      inline_keyboard: [
        [
          { text: "🍽 Ver Menú", callback_data: "menu:main" },
          { text: "🏠 Inicio", callback_data: "home" },
        ],
      ],
    },
  });
}

async function handleZone(chatId: number) {
  await sendMessage({
    chat_id: chatId,
    text: `📍 <b>¿Dónde te encuentras?</b>\n\nSelecciona tu zona para que tu pedido llegue directo a ti.`,
    reply_markup: { inline_keyboard: zoneSelectionKeyboard() },
  });
}

async function handleOrderHistory(chatId: number, telegramId: number) {
  const supabase = await createServiceClient();
  const guest = await getGuest(telegramId);
  if (!guest) {
    await sendMessage({
      chat_id: chatId,
      text: noSessionMessage(),
      reply_markup: { inline_keyboard: mainMenuKeyboard() },
    });
    return;
  }

  const { data: orders } = await supabase
    .from("orders")
    .select("order_number, status, total, created_at, zone")
    .eq("guest_id", guest.id)
    .order("created_at", { ascending: false })
    .limit(10);

  await sendMessage({
    chat_id: chatId,
    text: orderHistoryMessage((orders as Array<{ order_number: string; status: string; total: number; created_at: string; zone: string }>) || []),
    reply_markup: {
      inline_keyboard: [
        [
          { text: "🍽 Nuevo Pedido", callback_data: "menu:main" },
          { text: "🏠 Inicio", callback_data: "home" },
        ],
      ],
    },
  });
}

// ═══════════════════════════════════════════════════════════════════
// CALLBACK ACTION HANDLERS
// ═══════════════════════════════════════════════════════════════════

async function handleAddToCart(
  callbackId: string,
  chatId: number,
  messageId: number,
  telegramId: number,
  payload: string,
) {
  const [type, catId, idxStr] = payload.split(":");
  const idx = parseInt(idxStr);

  const categories = type === "food" ? menuCategories : drinkCategories;
  const category = categories.find((c) => c.id === catId);
  if (!category || !category.items[idx]) return;

  const item = category.items[idx];
  const session = await getActiveSession(telegramId);

  if (!session) {
    await editMessage({
      chat_id: chatId,
      message_id: messageId,
      text: noSessionMessage(),
      reply_markup: { inline_keyboard: mainMenuKeyboard() },
    });
    return;
  }

  // Update cart in DB
  const cart = (session.cart || []) as CartItem[];
  const existing = cart.find((c) => c.name === item.name);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ name: item.name, price: item.price, qty: 1 });
  }

  const supabase = await createServiceClient();
  await supabase
    .from("guest_sessions")
    .update({ cart: cart as never, updated_at: new Date().toISOString() } as never)
    .eq("id", session.id);

  const cartTotal = cart.reduce((s, c) => s + c.price * c.qty, 0);
  const cartCount = cart.reduce((s, c) => s + c.qty, 0);

  // Send confirmation as new message, keep category view
  await sendMessage({
    chat_id: chatId,
    text: itemAddedMessage(item.name, cartCount, cartTotal),
  });
}

async function handleCartView(
  callbackId: string,
  chatId: number,
  messageId: number,
  telegramId: number,
) {
  const session = await getActiveSession(telegramId);
  if (!session) {
    await editMessage({
      chat_id: chatId,
      message_id: messageId,
      text: noSessionMessage(),
      reply_markup: { inline_keyboard: mainMenuKeyboard() },
    });
    return;
  }

  const cart = (session.cart || []) as CartItem[];
  await editMessage({
    chat_id: chatId,
    message_id: messageId,
    text: cartMessage(cart, session.balance),
    reply_markup: { inline_keyboard: cartKeyboard(cart) },
  });
}

async function handleCartRemove(
  callbackId: string,
  chatId: number,
  messageId: number,
  telegramId: number,
  itemIdx: number,
) {
  const session = await getActiveSession(telegramId);
  if (!session) return;

  const cart = (session.cart || []) as CartItem[];
  if (itemIdx < 0 || itemIdx >= cart.length) return;

  const item = cart[itemIdx];
  if (item.qty > 1) {
    item.qty -= 1;
  } else {
    cart.splice(itemIdx, 1);
  }

  const supabase = await createServiceClient();
  await supabase
    .from("guest_sessions")
    .update({ cart: cart as never, updated_at: new Date().toISOString() } as never)
    .eq("id", session.id);

  await editMessage({
    chat_id: chatId,
    message_id: messageId,
    text: cartMessage(cart, session.balance),
    reply_markup: { inline_keyboard: cartKeyboard(cart) },
  });
}

async function handleCartClear(
  callbackId: string,
  chatId: number,
  messageId: number,
  telegramId: number,
) {
  const session = await getActiveSession(telegramId);
  if (!session) return;

  const supabase = await createServiceClient();
  await supabase
    .from("guest_sessions")
    .update({ cart: [] as never, updated_at: new Date().toISOString() } as never)
    .eq("id", session.id);

  await editMessage({
    chat_id: chatId,
    message_id: messageId,
    text: cartMessage([], session.balance),
    reply_markup: { inline_keyboard: cartKeyboard([]) },
  });
}

async function handleCartConfirm(
  callbackId: string,
  chatId: number,
  messageId: number,
  telegramId: number,
) {
  const session = await getActiveSession(telegramId);
  if (!session) {
    await editMessage({
      chat_id: chatId,
      message_id: messageId,
      text: noSessionMessage(),
      reply_markup: { inline_keyboard: mainMenuKeyboard() },
    });
    return;
  }

  const cart = (session.cart || []) as CartItem[];
  if (cart.length === 0) {
    await answerCallbackQuery(callbackId, "Tu pedido está vacío", true);
    return;
  }

  // Check zone
  if (!session.zone) {
    await editMessage({
      chat_id: chatId,
      message_id: messageId,
      text: `📍 <b>Primero selecciona tu zona</b>\n\nNecesitamos saber dónde estás para entregarte tu pedido.`,
      reply_markup: { inline_keyboard: zoneSelectionKeyboard() },
    });
    return;
  }

  const total = cart.reduce((s, c) => s + c.price * c.qty, 0);

  // Check balance
  if (session.balance < total) {
    await editMessage({
      chat_id: chatId,
      message_id: messageId,
      text: [
        `⚠️ <b>Saldo insuficiente</b>`,
        ``,
        `Total del pedido: <b>${formatPriceSafe(total)}</b>`,
        `Tu saldo: ${formatPriceSafe(session.balance)}`,
        `Necesitas recargar: ${formatPriceSafe(total - session.balance)}`,
        ``,
        `Recarga en el muelle o bar principal.`,
      ].join("\n"),
      reply_markup: {
        inline_keyboard: [
          [
            { text: "🛒 Ver Pedido", callback_data: "cart:view" },
            { text: "🏠 Inicio", callback_data: "home" },
          ],
        ],
      },
    });
    return;
  }

  // Process the order
  const supabase = await createServiceClient();

  // Generate order number
  const { data: orderNumData } = await supabase.rpc("generate_order_number" as never);
  const orderNumber = (orderNumData as unknown as string) || `BB-${Date.now().toString(36).toUpperCase()}`;

  // Get guest info
  const guest = await getGuest(telegramId);
  if (!guest) return;

  // Create order
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      session_id: session.id,
      guest_id: guest.id,
      order_number: orderNumber,
      zone: session.zone,
      total,
      status: "pending",
    } as never)
    .select()
    .single();

  if (orderError || !order) {
    console.error("[Order] Insert error:", orderError);
    await editMessage({
      chat_id: chatId,
      message_id: messageId,
      text: `❌ Error al crear tu pedido. Intenta de nuevo.`,
      reply_markup: { inline_keyboard: mainMenuKeyboard() },
    });
    return;
  }

  const orderId = (order as { id: string }).id;

  // Insert order items
  const itemInserts = cart.map((c) => ({
    order_id: orderId,
    item_name: c.name,
    item_price: c.price,
    quantity: c.qty,
  }));

  await supabase.from("order_items").insert(itemInserts as never);

  // Process payment (atomic balance deduction)
  const { data: paymentResult } = await supabase.rpc("process_order_payment" as never, {
    p_session_id: session.id,
    p_order_id: orderId,
    p_amount: total,
  } as never);

  const payment = paymentResult as { success: boolean; balance_after?: number; error?: string } | null;

  if (!payment || !payment.success) {
    // Rollback: cancel order
    await supabase
      .from("orders")
      .update({ status: "cancelled" } as never)
      .eq("id", orderId);

    await editMessage({
      chat_id: chatId,
      message_id: messageId,
      text: `❌ ${payment?.error || "Error al procesar pago"}. Intenta de nuevo.`,
      reply_markup: { inline_keyboard: mainMenuKeyboard() },
    });
    return;
  }

  // Clear cart
  await supabase
    .from("guest_sessions")
    .update({ cart: [] as never, updated_at: new Date().toISOString() } as never)
    .eq("id", session.id);

  // Send confirmation to guest
  await editMessage({
    chat_id: chatId,
    message_id: messageId,
    text: orderConfirmedMessage(
      orderNumber,
      session.zone,
      total,
      payment.balance_after || 0,
      cart,
    ),
    reply_markup: {
      inline_keyboard: [
        [
          { text: "🍽 Nuevo Pedido", callback_data: "menu:main" },
          { text: "🏠 Inicio", callback_data: "home" },
        ],
      ],
    },
  });

  // Notify staff
  if (STAFF_CHAT_ID) {
    await sendMessage({
      chat_id: parseInt(STAFF_CHAT_ID),
      text: staffNewOrderMessage(
        orderNumber,
        guest.name || "Invitado",
        guest.phone || `@${guest.telegram_username || telegramId}`,
        session.zone,
        cart,
        total,
      ),
      reply_markup: { inline_keyboard: staffOrderKeyboard(orderId) },
    });
  }
}

async function handleZoneSet(
  callbackId: string,
  chatId: number,
  messageId: number,
  telegramId: number,
  zoneId: string,
) {
  const session = await getActiveSession(telegramId);
  if (!session) {
    await editMessage({
      chat_id: chatId,
      message_id: messageId,
      text: noSessionMessage(),
      reply_markup: { inline_keyboard: mainMenuKeyboard() },
    });
    return;
  }

  const supabase = await createServiceClient();
  await supabase
    .from("guest_sessions")
    .update({ zone: zoneId, updated_at: new Date().toISOString() } as never)
    .eq("id", session.id);

  // Check if there's a pending cart confirmation
  const cart = (session.cart || []) as CartItem[];
  const hasCart = cart.length > 0;

  await editMessage({
    chat_id: chatId,
    message_id: messageId,
    text: zoneSelectedMessage(zoneId),
    reply_markup: {
      inline_keyboard: hasCart
        ? [
            [{ text: "✅ Confirmar Pedido", callback_data: "cart:confirm" }],
            [
              { text: "🍽 Ver Menú", callback_data: "menu:main" },
              { text: "🏠 Inicio", callback_data: "home" },
            ],
          ]
        : [
            [
              { text: "🍽 Ver Menú", callback_data: "menu:main" },
              { text: "🏠 Inicio", callback_data: "home" },
            ],
          ],
    },
  });
}

async function handleBalanceCheck(
  callbackId: string,
  chatId: number,
  messageId: number,
  telegramId: number,
) {
  const session = await getActiveSession(telegramId);
  if (!session) {
    await editMessage({
      chat_id: chatId,
      message_id: messageId,
      text: noSessionMessage(),
      reply_markup: { inline_keyboard: mainMenuKeyboard() },
    });
    return;
  }

  await editMessage({
    chat_id: chatId,
    message_id: messageId,
    text: balanceMessage(session.balance, session.band_id, session.zone),
    reply_markup: {
      inline_keyboard: [
        [
          { text: "🍽 Ver Menú", callback_data: "menu:main" },
          { text: "🏠 Inicio", callback_data: "home" },
        ],
      ],
    },
  });
}

async function handleOrderHistoryEdit(
  callbackId: string,
  chatId: number,
  messageId: number,
  telegramId: number,
) {
  const supabase = await createServiceClient();
  const guest = await getGuest(telegramId);
  if (!guest) {
    await editMessage({
      chat_id: chatId,
      message_id: messageId,
      text: noSessionMessage(),
      reply_markup: { inline_keyboard: mainMenuKeyboard() },
    });
    return;
  }

  const { data: orders } = await supabase
    .from("orders")
    .select("order_number, status, total, created_at, zone")
    .eq("guest_id", guest.id)
    .order("created_at", { ascending: false })
    .limit(10);

  await editMessage({
    chat_id: chatId,
    message_id: messageId,
    text: orderHistoryMessage((orders as Array<{ order_number: string; status: string; total: number; created_at: string; zone: string }>) || []),
    reply_markup: {
      inline_keyboard: [
        [
          { text: "🍽 Nuevo Pedido", callback_data: "menu:main" },
          { text: "🏠 Inicio", callback_data: "home" },
        ],
      ],
    },
  });
}

// ═══════════════════════════════════════════════════════════════════
// STAFF ACTION HANDLER
// ═══════════════════════════════════════════════════════════════════

async function handleStaffAction(
  callbackId: string,
  chatId: number,
  messageId: number,
  payload: string,
) {
  const [newStatus, orderId] = payload.split(":");
  if (!orderId) return;

  const supabase = await createServiceClient();

  // Map action to status
  const statusMap: Record<string, string> = {
    preparing: "preparing",
    ready: "ready",
    delivered: "delivered",
    cancel: "cancelled",
  };

  const status = statusMap[newStatus];
  if (!status) return;

  // Update order status
  const { data: order, error } = await supabase
    .from("orders")
    .update({ status, updated_at: new Date().toISOString() } as never)
    .eq("id", orderId)
    .select("*, guest_sessions!inner(guest_id, guests!inner(telegram_id, name))")
    .single();

  if (error) {
    console.error("[Staff] Update error:", error);
    await answerCallbackQuery(callbackId, "Error al actualizar", true);
    return;
  }

  const orderData = order as {
    order_number: string;
    guest_sessions: {
      guest_id: string;
      guests: { telegram_id: number | null; name: string };
    };
  };

  // Update staff message with new buttons
  const staffText = `✅ Pedido <code>${orderData.order_number}</code> → <b>${status.toUpperCase()}</b>`;
  let newKeyboard;
  switch (status) {
    case "preparing":
      newKeyboard = staffPreparingKeyboard(orderId);
      break;
    case "ready":
      newKeyboard = staffReadyKeyboard(orderId);
      break;
    default:
      newKeyboard = undefined;
      break;
  }

  await editMessage({
    chat_id: chatId,
    message_id: messageId,
    text: staffText,
    reply_markup: newKeyboard
      ? { inline_keyboard: newKeyboard }
      : undefined,
  });

  // Notify guest via Telegram
  const guestTelegramId = orderData.guest_sessions?.guests?.telegram_id;
  if (guestTelegramId) {
    await sendMessage({
      chat_id: guestTelegramId,
      text: orderStatusMessage(orderData.order_number, status),
      reply_markup: {
        inline_keyboard: [
          [
            { text: "🍽 Nuevo Pedido", callback_data: "menu:main" },
            { text: "🏠 Inicio", callback_data: "home" },
          ],
        ],
      },
    });
  }

  // If cancelled, refund the balance
  if (status === "cancelled") {
    const { data: cancelOrder } = await supabase
      .from("orders")
      .select("session_id, total")
      .eq("id", orderId)
      .single();

    if (cancelOrder) {
      const co = cancelOrder as { session_id: string; total: number };
      await supabase.rpc("process_top_up" as never, {
        p_session_id: co.session_id,
        p_amount: co.total,
        p_description: `Refund for cancelled order`,
      } as never);
    }
  }
}

// ═══════════════════════════════════════════════════════════════════
// DB HELPERS
// ═══════════════════════════════════════════════════════════════════

async function getGuest(telegramId: number) {
  const supabase = await createServiceClient();
  const { data } = await supabase
    .from("guests")
    .select("*")
    .eq("telegram_id", telegramId)
    .single();
  return data as { id: string; name: string; phone: string; telegram_id: number; telegram_username: string | null } | null;
}

async function getActiveSession(telegramId: number) {
  const supabase = await createServiceClient();

  // Find guest first
  const guest = await getGuest(telegramId);
  if (!guest) return null;

  // Find active session
  const { data } = await supabase
    .from("guest_sessions")
    .select("*")
    .eq("guest_id", guest.id)
    .eq("active", true)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  return data as {
    id: string;
    guest_id: string;
    band_id: string;
    balance: number;
    zone: string | null;
    cart: CartItem[];
    active: boolean;
  } | null;
}

// ─── Price formatter (safe for non-module context) ───────────────

function formatPriceSafe(price: number): string {
  return `$ ${price.toLocaleString("es-CO")}`;
}
