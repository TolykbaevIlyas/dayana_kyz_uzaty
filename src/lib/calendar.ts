import { EVENT } from "@/lib/constants";
import type { Language } from "@/types";

const MONTHS: Record<Language, string[]> = {
  ru: [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ],
  kz: [
    "Қаңтар",
    "Ақпан",
    "Наурыз",
    "Сәуір",
    "Мамыр",
    "Маусым",
    "Шілде",
    "Тамыз",
    "Қыркүйек",
    "Қазан",
    "Қараша",
    "Желтоқсан",
  ],
};

const WEEKDAYS: Record<Language, string[]> = {
  ru: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
  kz: ["Дс", "Сс", "Ср", "Бс", "Жм", "Сн", "Жк"],
};

const WEEKDAY_FULL: Record<Language, string[]> = {
  ru: [
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
    "Воскресенье",
  ],
  kz: [
    "Дүйсенбі",
    "Сейсенбі",
    "Сәрсенбі",
    "Бейсенбі",
    "Жұма",
    "Сенбі",
    "Жексенбі",
  ],
};

export interface EventCalendarData {
  year: number;
  month: number;
  day: number;
  monthName: string;
  weekdayShort: string;
  weekdayFull: string;
  weeks: (number | null)[][];
}

function mondayBasedOffset(date: Date): number {
  const day = date.getDay();
  return day === 0 ? 6 : day - 1;
}

export function getEventCalendar(lang: Language): EventCalendarData {
  const eventDate = new Date(EVENT.dateISO);
  const year = eventDate.getFullYear();
  const month = eventDate.getMonth();
  const day = eventDate.getDate();

  const firstOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startOffset = mondayBasedOffset(firstOfMonth);

  const cells: (number | null)[] = [
    ...Array.from({ length: startOffset }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  while (cells.length % 7 !== 0) {
    cells.push(null);
  }

  const weeks: (number | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }

  const weekdayIndex = mondayBasedOffset(eventDate);

  return {
    year,
    month,
    day,
    monthName: MONTHS[lang][month],
    weekdayShort: WEEKDAYS[lang][weekdayIndex],
    weekdayFull: WEEKDAY_FULL[lang][weekdayIndex],
    weeks,
  };
}
