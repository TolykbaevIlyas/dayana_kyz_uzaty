"use client";

import { useState } from "react";
import { useInvitation } from "@/context/InvitationContext";
import { OrnamentLine } from "@/components/ui/OrnamentLine";
import { Ornament } from "@/components/ui/Ornament";
import { Reveal } from "@/components/ui/Reveal";
import type { Attending } from "@/types";

export function RSVP() {
  const { lang, t } = useInvitation();
  const [name, setName] = useState("");
  const [attending, setAttending] = useState<Attending>(null);
  const [guestCount, setGuestCount] = useState(0);
  const [companions, setCompanions] = useState<string[]>([]);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const changeCount = (delta: number) => {
    const next = Math.max(0, Math.min(10, guestCount + delta));
    setGuestCount(next);
    setCompanions((prev) => {
      if (next > prev.length) {
        return [...prev, ...Array(next - prev.length).fill("")];
      }
      return prev.slice(0, next);
    });
  };

  const setAttend = (value: Attending) => {
    setAttending(value);
    if (value !== "yes") {
      setGuestCount(0);
      setCompanions([]);
    }
  };

  const updateCompanion = (index: number, value: string) => {
    setCompanions((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  const handleSubmit = async () => {
    if (!name.trim()) {
      alert(t.errName);
      return;
    }
    if (!attending) {
      alert(t.errAttend);
      return;
    }

    setSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: name.trim(),
          attending: attending === "yes",
          language: lang,
          guestCount: attending === "yes" ? guestCount : 0,
          companions: attending === "yes"
            ? companions.map((c) => c.trim()).filter(Boolean)
            : [],
          comment: comment.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error("RSVP failed");
      }

      setSubmitted(true);
    } catch {
      setSubmitError(
        lang === "ru"
          ? "Не удалось отправить ответ. Проверьте подключение и попробуйте еще раз."
          : "Жауап жіберілмеді. Байланысты тексеріп, қайта көріңіз.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="site-section rsvp-section" id="rsvp">
      <Ornament
        size="md"
        animation="sway"
        className="section-ornament section-ornament--rsvp"
        opacity={0.12}
      />
      <div className="container">
        <Reveal>
          <p className="section-eyebrow">{t.rsvpEyebrow}</p>
        </Reveal>
        <Reveal>
          <h2 className="section-title">{t.rsvpTitle}</h2>
        </Reveal>
        <OrnamentLine />

        <Reveal className="rsvp-form">
          {!submitted ? (
            <div id="form-content">
              <div className="form-group">
                <label className="form-label" htmlFor="inp-name">
                  {t.lblName}
                </label>
                <input
                  id="inp-name"
                  className="form-input"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t.inpNamePh}
                />
              </div>

              <div className="form-group">
                <span className="form-label">{t.lblAttend}</span>
                <div className="attend-group">
                  <button
                    type="button"
                    className={`attend-btn${attending === "yes" ? " selected" : ""}`}
                    onClick={() => setAttend("yes")}
                  >
                    {t.btnYes}
                  </button>
                  <button
                    type="button"
                    className={`attend-btn${attending === "no" ? " selected" : ""}`}
                    onClick={() => setAttend("no")}
                  >
                    {t.btnNo}
                  </button>
                </div>
              </div>

              {attending === "yes" && (
                <div className="form-group">
                  <span className="form-label">{t.lblGuests}</span>
                  <div className="guests-counter">
                    <button
                      type="button"
                      className="count-btn"
                      onClick={() => changeCount(-1)}
                      aria-label="Уменьшить"
                    >
                      −
                    </button>
                    <span className="count-num">{guestCount}</span>
                    <button
                      type="button"
                      className="count-btn"
                      onClick={() => changeCount(1)}
                      aria-label="Увеличить"
                    >
                      +
                    </button>
                  </div>
                  <div id="companion-list">
                    {companions.map((companion, index) => (
                      <input
                        key={index}
                        className="form-input companion-input"
                        type="text"
                        value={companion}
                        onChange={(e) => updateCompanion(index, e.target.value)}
                        placeholder={`${t.companionPh} ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className="form-group">
                <label className="form-label" htmlFor="inp-comment">
                  {t.lblComment}
                </label>
                <textarea
                  id="inp-comment"
                  className="form-textarea"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder={t.inpCommentPh}
                />
              </div>

              <button
                type="button"
                className="submit-btn"
                onClick={handleSubmit}
                disabled={submitting}
              >
                {submitting ? t.submitting : t.lblSubmit}
              </button>
              {submitError && <p className="form-error">{submitError}</p>}
            </div>
          ) : (
            <div className="thank-you show">
              <div className="ty-icon">🌸</div>
              <div className="ty-title">{t.tyTitle}</div>
              <p className="ty-text">
                {attending === "yes" ? t.tyText : t.tyNoText}
              </p>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
