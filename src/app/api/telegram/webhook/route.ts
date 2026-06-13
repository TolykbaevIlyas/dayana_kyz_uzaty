import { NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase";
import {
  answerTelegramCallback,
  getTelegramChatIds,
  isAllowedTelegramChat,
  sendRsvpCsv,
  sendTelegramMessage,
} from "@/lib/telegram";
import {
  fetchRsvpRecords,
  formatRsvpList,
  formatRsvpSummary,
  getRsvpSummary,
} from "@/lib/rsvp";

type TelegramUpdate = {
  message?: {
    text?: string;
    chat: { id: number | string };
  };
  callback_query?: {
    id: string;
    data?: string;
    from?: { id: number | string };
    message?: {
      chat: { id: number | string };
    };
  };
};

export async function POST(request: Request) {
  const secret = process.env.TELEGRAM_WEBHOOK_SECRET;
  const secretIsValid =
    !secret || request.headers.get("x-telegram-bot-api-secret-token") === secret;

  try {
    const update = (await request.json()) as TelegramUpdate;
    const chatId =
      update.message?.chat.id ??
      update.callback_query?.message?.chat.id ??
      update.callback_query?.from?.id;

    if (update.callback_query) {
      try {
        await answerTelegramCallback(update.callback_query.id);
      } catch (error) {
        console.error("Telegram callback answer error:", error);
      }

      if (!secretIsValid) {
        console.warn("Telegram webhook secret mismatch. Check setWebhook secret_token.");
      }

      if (!chatId) {
        return NextResponse.json({ ok: true });
      }

      if (!isAllowedTelegramChat(chatId)) {
        await safeSendTelegramMessage(
          chatId,
          "Этот чат не подключен к RSVP-боту. Добавьте его id в TELEGRAM_CHAT_ID.",
        );
        return NextResponse.json({ ok: true });
      }

      await handleBotAction(chatId, update.callback_query.data ?? "");

      return NextResponse.json({ ok: true });
    }

    if (!secretIsValid) {
      console.warn("Telegram webhook secret mismatch. Check setWebhook secret_token.");
    }

    if (!chatId || !isAllowedTelegramChat(chatId)) {
      return NextResponse.json({ ok: true });
    }

    const command = normalizeCommand(update.message?.text ?? "");
    await handleBotAction(chatId, command);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Telegram webhook error:", error);
    return NextResponse.json({ ok: true });
  }
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    message: "Telegram webhook is ready. Use POST requests from Telegram.",
    configured: {
      botToken: Boolean(process.env.TELEGRAM_BOT_TOKEN),
      chatIds: getTelegramChatIds().length,
      supabaseUrl: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL),
      serviceRole: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
      webhookSecret: Boolean(process.env.TELEGRAM_WEBHOOK_SECRET),
    },
  });
}

async function handleBotAction(chatId: string | number, action: string) {
  const supabase = createSupabaseAdmin();

  if (!supabase) {
    await safeSendTelegramMessage(
      chatId,
      "Supabase не настроен. Заполните NEXT_PUBLIC_SUPABASE_URL и SUPABASE_SERVICE_ROLE_KEY.",
    );
    return;
  }

  if (action === "start" || action === "help" || action === "") {
    await safeSendTelegramMessage(
      chatId,
      [
        "Команды RSVP-бота:",
        "/summary - сводка регистраций",
        "/list - список последних регистраций",
        "/export - CSV выгрузка всех регистраций",
      ].join("\n"),
    );
    return;
  }

  let records;

  try {
    records = await fetchRsvpRecords(supabase);
  } catch (error) {
    console.error("RSVP fetch error:", error);
    await safeSendTelegramMessage(
      chatId,
      "Не удалось получить данные из Supabase. Проверьте SUPABASE_SERVICE_ROLE_KEY и таблицу rsvp_responses.",
    );
    return;
  }

  if (action === "summary") {
    await safeSendTelegramMessage(chatId, formatRsvpSummary(getRsvpSummary(records)));
    return;
  }

  if (action === "list") {
    await safeSendTelegramMessage(chatId, formatRsvpList(records, 30));
    return;
  }

  if (action === "csv" || action === "export") {
    try {
      await sendRsvpCsv(chatId, records);
    } catch (error) {
      console.error("RSVP CSV send error:", error);
      await safeSendTelegramMessage(
        chatId,
        "Не удалось отправить CSV-файл. Проверьте токен бота и попробуйте еще раз.",
      );
    }
    return;
  }

  await safeSendTelegramMessage(
    chatId,
    "Не понял команду. Доступно: /summary, /list, /export.",
  );
}

function normalizeCommand(text: string) {
  return text
    .trim()
    .replace(/^\//, "")
    .split(/\s+/)[0]
    .split("@")[0]
    .toLowerCase();
}

async function safeSendTelegramMessage(chatId: string | number, text: string) {
  try {
    await sendTelegramMessage(chatId, text);
  } catch (error) {
    console.error("Telegram send message error:", error);
  }
}
