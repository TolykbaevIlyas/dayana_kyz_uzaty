import type { SupabaseClient } from "@supabase/supabase-js";

export type RsvpRecord = {
  id: string;
  created_at: string;
  full_name: string;
  attending: boolean;
  language: "ru" | "kz";
  guest_count: number;
  companions: string[] | null;
  comment: string | null;
};

export type RsvpSummary = {
  totalResponses: number;
  willAttend: number;
  willNotAttend: number;
  totalCompanions: number;
  totalPeople: number;
};

const RSVP_COLUMNS =
  "id,created_at,full_name,attending,language,guest_count,companions,comment";

export async function fetchRsvpRecords(supabase: SupabaseClient) {
  const { data, error } = await supabase
    .from("rsvp_responses")
    .select(RSVP_COLUMNS)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as RsvpRecord[];
}

export function getRsvpSummary(records: RsvpRecord[]): RsvpSummary {
  return records.reduce<RsvpSummary>(
    (summary, record) => {
      summary.totalResponses += 1;

      if (record.attending) {
        summary.willAttend += 1;
        summary.totalCompanions += record.guest_count ?? 0;
        summary.totalPeople += 1 + (record.guest_count ?? 0);
      } else {
        summary.willNotAttend += 1;
      }

      return summary;
    },
    {
      totalResponses: 0,
      willAttend: 0,
      willNotAttend: 0,
      totalCompanions: 0,
      totalPeople: 0,
    },
  );
}

export function formatRsvpList(records: RsvpRecord[], limit = 20) {
  if (records.length === 0) {
    return "Пока нет зарегистрированных гостей.";
  }

  const visibleRecords = records.slice(0, limit);
  const lines = visibleRecords.map((record, index) => {
    const status = record.attending ? "будет" : "не будет";
    const companions = record.attending
      ? `, +${record.guest_count ?? 0}`
      : "";

    return `${index + 1}. ${record.full_name} - ${status}${companions}`;
  });

  if (records.length > limit) {
    lines.push(`...и еще ${records.length - limit}`);
  }

  return lines.join("\n");
}

export function formatRsvpSummary(summary: RsvpSummary) {
  return [
    "Сводка регистраций",
    `Всего ответов: ${summary.totalResponses}`,
    `Будут: ${summary.willAttend}`,
    `Не будут: ${summary.willNotAttend}`,
    `Сопровождающих: ${summary.totalCompanions}`,
    `Всего гостей за столом: ${summary.totalPeople}`,
  ].join("\n");
}

export function createRsvpCsv(records: RsvpRecord[]) {
  const header = [
    "created_at",
    "full_name",
    "attending",
    "guest_count",
    "companions",
    "comment",
    "language",
    "id",
  ];

  const rows = records.map((record) => [
    record.created_at,
    record.full_name,
    record.attending ? "yes" : "no",
    String(record.guest_count ?? 0),
    (record.companions ?? []).join("; "),
    record.comment ?? "",
    record.language,
    record.id,
  ]);

  return [header, ...rows]
    .map((row) => row.map(escapeCsvCell).join(","))
    .join("\n");
}

function escapeCsvCell(value: string) {
  const normalized = value.replace(/\r?\n/g, " ").trim();

  if (/[",\n]/.test(normalized)) {
    return `"${normalized.replace(/"/g, '""')}"`;
  }

  return normalized;
}
