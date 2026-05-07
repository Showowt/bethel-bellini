/**
 * Telegram Bot API — Low-level helpers
 * Direct HTTP calls to the Telegram Bot API.
 * No external library needed — just fetch.
 */

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const API_BASE = `https://api.telegram.org/bot${BOT_TOKEN}`;

// ─── Types ───────────────────────────────────────────────────────

export interface TelegramUpdate {
  update_id: number;
  message?: TelegramMessage;
  callback_query?: TelegramCallbackQuery;
}

export interface TelegramMessage {
  message_id: number;
  from?: TelegramUser;
  chat: TelegramChat;
  date: number;
  text?: string;
  entities?: TelegramMessageEntity[];
}

export interface TelegramCallbackQuery {
  id: string;
  from: TelegramUser;
  message?: TelegramMessage;
  data?: string;
}

export interface TelegramUser {
  id: number;
  is_bot: boolean;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
}

export interface TelegramChat {
  id: number;
  type: "private" | "group" | "supergroup" | "channel";
  title?: string;
  first_name?: string;
}

export interface TelegramMessageEntity {
  type: string;
  offset: number;
  length: number;
}

export interface InlineKeyboardButton {
  text: string;
  callback_data?: string;
  url?: string;
}

export type InlineKeyboard = InlineKeyboardButton[][];

interface SendMessageOptions {
  chat_id: number;
  text: string;
  parse_mode?: "HTML" | "MarkdownV2";
  reply_markup?: {
    inline_keyboard: InlineKeyboard;
  };
}

interface EditMessageOptions {
  chat_id: number;
  message_id: number;
  text: string;
  parse_mode?: "HTML" | "MarkdownV2";
  reply_markup?: {
    inline_keyboard: InlineKeyboard;
  };
}

// ─── API Calls ───────────────────────────────────────────────────

async function call(method: string, body: Record<string, unknown>) {
  const res = await fetch(`${API_BASE}/${method}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!data.ok) {
    console.error(`[Telegram] ${method} failed:`, data);
  }
  return data;
}

export async function sendMessage(opts: SendMessageOptions) {
  return call("sendMessage", {
    chat_id: opts.chat_id,
    text: opts.text,
    parse_mode: opts.parse_mode || "HTML",
    reply_markup: opts.reply_markup,
  });
}

export async function editMessage(opts: EditMessageOptions) {
  return call("editMessageText", {
    chat_id: opts.chat_id,
    message_id: opts.message_id,
    text: opts.text,
    parse_mode: opts.parse_mode || "HTML",
    reply_markup: opts.reply_markup,
  });
}

export async function answerCallbackQuery(
  callback_query_id: string,
  text?: string,
  show_alert?: boolean,
) {
  return call("answerCallbackQuery", {
    callback_query_id,
    text,
    show_alert,
  });
}

export async function deleteMessage(chat_id: number, message_id: number) {
  return call("deleteMessage", { chat_id, message_id });
}

export async function setWebhook(url: string, secret_token?: string) {
  return call("setWebhook", {
    url,
    secret_token,
    allowed_updates: ["message", "callback_query"],
    max_connections: 40,
  });
}

export async function getWebhookInfo() {
  return call("getWebhookInfo", {});
}

// ─── Helper to extract command from message ──────────────────────

export function extractCommand(message: TelegramMessage): string | null {
  if (!message.text || !message.entities) return null;
  const botCommand = message.entities.find((e) => e.type === "bot_command");
  if (!botCommand) return null;
  const cmd = message.text.substring(
    botCommand.offset,
    botCommand.offset + botCommand.length,
  );
  // Strip @BotName suffix
  return cmd.split("@")[0].toLowerCase();
}
