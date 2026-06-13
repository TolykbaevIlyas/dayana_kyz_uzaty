import type { RsvpRecord } from "@/lib/rsvp";
import { createRsvpCsv } from "@/lib/rsvp";

type TelegramReplyMarkup = {
  inline_keyboard: Array<Array<{ text: string; callback_data: string }>>;
};

const TELEGRAM_API = "https://api.telegram.org";
const TELEGRAM_TIMEOUT_MS = 9000;

function getBotToken() {
  return process.env.TELEGRAM_BOT_TOKEN;
}

export function getTelegramChatIds() {
  return (process.env.TELEGRAM_CHAT_ID ?? "")
    .split(",")
    .map((chatId) => chatId.trim())
    .filter(Boolean);
}

export function isTelegramConfigured() {
  return Boolean(getBotToken() && getTelegramChatIds().length > 0);
}

export function isAllowedTelegramChat(chatId: string | number) {
  return getTelegramChatIds().includes(String(chatId));
}

export async function sendTelegramMessage(
  chatId: string | number,
  text: string,
  replyMarkup?: TelegramReplyMarkup,
) {
  const token = getBotToken();

  if (!token) {
    return;
  }

  const response = await fetch(`${TELEGRAM_API}/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    signal: AbortSignal.timeout(TELEGRAM_TIMEOUT_MS),
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "HTML",
      disable_web_page_preview: true,
      reply_markup: replyMarkup,
    }),
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }
}

export async function answerTelegramCallback(callbackQueryId: string, text = "Запрос принят") {
  const token = getBotToken();

  if (!token) {
    return;
  }

  await fetch(`${TELEGRAM_API}/bot${token}/answerCallbackQuery`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    signal: AbortSignal.timeout(TELEGRAM_TIMEOUT_MS),
    body: JSON.stringify({
      callback_query_id: callbackQueryId,
      text,
      show_alert: false,
    }),
  });
}

export async function sendTelegramDocument(
  chatId: string | number,
  filename: string,
  content: string,
  caption?: string,
) {
  const token = getBotToken();

  if (!token) {
    return;
  }

  const formData = new FormData();
  formData.append("chat_id", String(chatId));
  formData.append(
    "document",
    new Blob([content], { type: "text/csv;charset=utf-8" }),
    filename,
  );

  if (caption) {
    formData.append("caption", caption);
  }

  const response = await fetch(`${TELEGRAM_API}/bot${token}/sendDocument`, {
    method: "POST",
    signal: AbortSignal.timeout(TELEGRAM_TIMEOUT_MS),
    body: formData,
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }
}

export async function notifyRsvpRegistration(record: Omit<RsvpRecord, "id" | "created_at">) {
  if (!isTelegramConfigured()) {
    return;
  }

  const companions = record.companions?.filter(Boolean) ?? [];
  const text = [
    "Новая регистрация на кыз узату",
    "",
    `Имя: ${escapeHtml(record.full_name)}`,
    `Статус: ${record.attending ? "будет" : "не будет"}`,
    record.attending ? `Сопровождающих: ${record.guest_count}` : null,
    companions.length > 0
      ? `Имена гостей: ${escapeHtml(companions.join(", "))}`
      : null,
    record.comment ? `Комментарий: ${escapeHtml(record.comment)}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  await Promise.all(
    getTelegramChatIds().map((chatId) =>
      sendTelegramMessage(chatId, text, {
        inline_keyboard: [
          [
            { text: "Сводка", callback_data: "summary" },
            { text: "Список", callback_data: "list" },
          ],
          [{ text: "CSV выгрузка", callback_data: "csv" }],
        ],
      }),
    ),
  );
}

export async function sendRsvpCsv(chatId: string | number, records: RsvpRecord[]) {
  const date = new Date().toISOString().slice(0, 10);
  const csv = createRsvpCsv(records);

  await sendTelegramDocument(
    chatId,
    `rsvp-${date}.csv`,
    csv,
    `Выгрузка RSVP: ${records.length} записей`,
  );
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
