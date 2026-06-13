import { NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase";
import { notifyRsvpRegistration } from "@/lib/telegram";
import type { RsvpPayload } from "@/types";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as RsvpPayload;

    if (!body.fullName?.trim()) {
      return NextResponse.json(
        { error: "fullName is required" },
        { status: 400 },
      );
    }

    if (typeof body.attending !== "boolean") {
      return NextResponse.json(
        { error: "attending is required" },
        { status: 400 },
      );
    }

    const payload = {
      full_name: body.fullName.trim(),
      attending: body.attending,
      language: body.language ?? "ru",
      guest_count: body.attending ? (body.guestCount ?? 0) : 0,
      companions: body.attending ? (body.companions ?? []) : [],
      comment: body.comment?.trim() || null,
      ip_address:
        request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
        request.headers.get("x-real-ip"),
      user_agent: request.headers.get("user-agent"),
    };

    const supabase = createSupabaseAdmin();

    if (supabase) {
      const { error } = await supabase.from("rsvp_responses").insert(payload);

      if (error) {
        console.error("Supabase insert error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
    } else {
      console.info("RSVP received (no Supabase configured):", payload);
    }

    try {
      await notifyRsvpRegistration({
        full_name: payload.full_name,
        attending: payload.attending,
        language: payload.language,
        guest_count: payload.guest_count,
        companions: payload.companions,
        comment: payload.comment,
      });
    } catch (error) {
      console.error("Telegram notification error:", error);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("RSVP route error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
