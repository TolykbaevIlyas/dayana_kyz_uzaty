"use client";

import { Ornament } from "@/components/ui/Ornament";
import { Reveal } from "@/components/ui/Reveal";
import { useInvitation } from "@/context/InvitationContext";
import type { Language } from "@/types";

const NOTES: Record<Language, readonly string[]> = {
  kz: [
    "Келініздер, қуанышымыздың қадірменді қонағы болыныздар!",
    "Сіздерді аяулы қызымыз\n\nДаянаның\n\nұзату тойына арналған салтанатты ақ дастарханымыздың қадірлі қонағы болуға шақырамыз!",
  ],
  ru: [
    "Приглашаем вас стать почетными гостями нашей радости!",
    "Приглашаем вас стать нашими почетными гостями за торжественным белым столом на свадьбе нашей дорогой дочери Даяны!",
  ],
} as const;

export function InvitationNotes() {
  const { lang } = useInvitation();
  const notes = NOTES[lang];

  return (
    <section
      className="invitation-notes-section"
      aria-label={lang === "ru" ? "Текст приглашения" : "Шақыру мәтіні"}
    >
      <Ornament
        size="sm"
        animation="sway"
        className="invitation-notes-ornament invitation-notes-ornament--left"
        opacity={0.18}
      />
      <Ornament
        size="sm"
        animation="float"
        className="invitation-notes-ornament invitation-notes-ornament--right"
        opacity={0.14}
        flip="horizontal"
      />

      <div className="container invitation-notes-inner">
        {notes.map((note, index) => (
          <Reveal key={note} className="invitation-note">
            <span className="invitation-note-mark" aria-hidden>
              {index === 0 ? "I" : "II"}
            </span>
            <p>
              {note.split("\n\n").map((line, lineIndex) => (
                <span key={line}>
                  {line}
                  {lineIndex < note.split("\n\n").length - 1 && <br />}
                </span>
              ))}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
