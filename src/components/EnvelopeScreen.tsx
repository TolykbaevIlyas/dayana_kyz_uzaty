"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { useInvitation } from "@/context/InvitationContext";
import { Ornament } from "@/components/ui/Ornament";

export function EnvelopeScreen() {
  const { phase, t, openEnvelope } = useInvitation();
  const [opened, setOpened] = useState(false);
  const [flapOpen, setFlapOpen] = useState(false);
  const [letterRise, setLetterRise] = useState(false);
  const [hintHidden, setHintHidden] = useState(false);

  const isActive = phase === "envelope" || phase === "main";
  const isFadingOut = phase === "main";

  const handleOpen = () => {
    if (opened) return;
    setOpened(true);
    setFlapOpen(true);
    setHintHidden(true);

    window.setTimeout(() => setLetterRise(true), 400);
    openEnvelope();
  };

  return (
    <div
      className={cn(
        "env-screen",
        isActive && "active",
        isFadingOut && "fade-out",
      )}
    >
      <Ornament
        size="md"
        animation="float"
        className="env-ornament env-ornament--left"
        opacity={0.3}
      />
      <Ornament
        size="md"
        animation="sway"
        className="env-ornament env-ornament--right"
        opacity={0.25}
        flip="horizontal"
      />
      <div
        className="envelope-wrap"
        onClick={handleOpen}
        onKeyDown={(e) => e.key === "Enter" && handleOpen()}
        role="button"
        tabIndex={0}
        aria-label={t.envHint}
      >
        <div className="envelope">
          <div className="envelope-body">
            <div className="env-pattern" aria-hidden />
          </div>
          <div className={cn("env-flap", flapOpen && "open")} />
          <div className={cn("env-seal", flapOpen && "hide")}>
            <svg viewBox="0 0 28 28" aria-hidden>
              <path d="M14 2 C14 2 8 6 4 12 C2 15 2 18 4 21 C6 24 10 26 14 26 C18 26 22 24 24 21 C26 18 26 15 24 12 C20 6 14 2 14 2Z" />
              <circle cx="14" cy="14" r="4" fill="rgba(247,234,218,0.4)" />
            </svg>
          </div>
          <div className={cn("env-letter", letterRise && "rise")}>
            <div className="env-letter-text">
              {t.envLetter.split("\n").map((line, i) => (
                <span key={i}>
                  {line}
                  {i < t.envLetter.split("\n").length - 1 && <br />}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <p
        className="env-hint"
        style={{ opacity: hintHidden ? 0 : undefined }}
      >
        {t.envHint}
      </p>
    </div>
  );
}
