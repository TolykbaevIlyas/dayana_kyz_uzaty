"use client";

import { AnimatePresence, motion } from "framer-motion";
import { EVENT } from "@/lib/constants";
import { getEventCalendar } from "@/lib/calendar";
import { useInvitation } from "@/context/InvitationContext";
import { useCountdown } from "@/hooks/useCountdown";
import { Ornament } from "@/components/ui/Ornament";
import { Reveal } from "@/components/ui/Reveal";

const TIMER_UNITS = [
  { key: "days" as const, labelKey: "timerDays" as const },
  { key: "hours" as const, labelKey: "timerHours" as const },
  { key: "mins" as const, labelKey: "timerMins" as const },
  { key: "secs" as const, labelKey: "timerSecs" as const },
];

function CountdownDigit({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="timer-unit">
      <div className="timer-unit-glow" aria-hidden />
      <div className="timer-unit-face">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={value}
            className="timer-num"
            initial={{ y: -18, opacity: 0, filter: "blur(4px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            exit={{ y: 18, opacity: 0, filter: "blur(4px)" }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {value}
          </motion.span>
        </AnimatePresence>
      </div>
      <div className="timer-label">{label}</div>
    </div>
  );
}

function EventCalendar() {
  const { t, lang } = useInvitation();
  const cal = getEventCalendar(lang);
  const weekdays =
    lang === "ru"
      ? ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]
      : ["Дс", "Сс", "Ср", "Бс", "Жм", "Сн", "Жк"];

  return (
    <motion.div
      className="timer-calendar"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="timer-calendar-header">
        <Ornament size="xs" animation="pulse" opacity={0.7} />
        <div>
          <p className="timer-calendar-month">
            {cal.monthName} {cal.year}
          </p>
          <p className="timer-calendar-weekday">{cal.weekdayFull}</p>
        </div>
        <Ornament size="xs" animation="pulse" opacity={0.7} flip="horizontal" />
      </div>

      <div className="timer-calendar-weekdays">
        {weekdays.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>

      <div className="timer-calendar-grid">
        {cal.weeks.flat().map((cell, index) => (
          <span
            key={index}
            className={
              cell === cal.day ? "timer-cal-day timer-cal-day--active" : "timer-cal-day"
            }
          >
            {cell ?? ""}
          </span>
        ))}
      </div>

      <div className="timer-calendar-footer">
        <span className="timer-calendar-date">{EVENT.dateDisplay[lang]}</span>
        <span className="timer-calendar-time">
          {t.timerAt} {EVENT.time}
        </span>
      </div>
    </motion.div>
  );
}

export function Timer() {
  const { t, timerActive } = useInvitation();
  const countdown = useCountdown(timerActive);

  return (
    <section className="timer-section" id="timer">
      <Ornament
        size="lg"
        animation="rotate"
        className="timer-ornament timer-ornament--tl"
        opacity={0.18}
      />
      <Ornament
        size="md"
        animation="float"
        className="timer-ornament timer-ornament--tr"
        opacity={0.22}
        flip="horizontal"
      />
      <Ornament
        size="sm"
        animation="sway"
        className="timer-ornament timer-ornament--bl"
        opacity={0.2}
      />
      <Ornament
        size="xl"
        animation="rotate"
        className="timer-ornament timer-ornament--br"
        opacity={0.12}
        flip="horizontal"
      />

      <div className="timer-inner">
        <Reveal>
          <p className="section-eyebrow">{t.timerEyebrow}</p>
        </Reveal>
        <Reveal>
          <h2 className="section-title">{t.timerTitle}</h2>
        </Reveal>

        <div className="timer-ornament-center">
          <Ornament size="md" animation="spin-slow" opacity={0.9} />
        </div>

        <div className="timer-layout">
          <EventCalendar />

          <div className="timer-countdown-wrap">
            <motion.div
              className="timer-grid"
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              {TIMER_UNITS.map(({ key, labelKey }, index) => (
                <div key={key} className="timer-unit-group">
                  <CountdownDigit value={countdown[key]} label={t[labelKey]} />
                  {index < TIMER_UNITS.length - 1 && (
                    <motion.span
                      className="timer-separator"
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      aria-hidden
                    >
                      :
                    </motion.span>
                  )}
                </div>
              ))}
            </motion.div>

            <motion.p
              className="timer-event-note"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              {t.timerDateLabel}
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
