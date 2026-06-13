"use client";

import { useInvitation } from "@/context/InvitationContext";
import { OrnamentLine } from "@/components/ui/OrnamentLine";
import { Ornament } from "@/components/ui/Ornament";
import { Reveal } from "@/components/ui/Reveal";

export function Story() {
  const { t } = useInvitation();

  return (
    <section className="site-section story-section">
      <Ornament
        size="lg"
        animation="sway"
        className="section-ornament section-ornament--story"
        opacity={0.1}
      />
      <div className="container">
        <Reveal>
          <p className="section-eyebrow">{t.storyEyebrow}</p>
        </Reveal>
        <Reveal>
          <h2 className="section-title">{t.storyTitle}</h2>
        </Reveal>
        <OrnamentLine />

        <Reveal className="story-text">
          <span className="story-quote">&ldquo;</span>
          {t.storyText.split("\n\n").map((paragraph, index) => (
            <span key={index}>
              {paragraph}
              {index < t.storyText.split("\n\n").length - 1 && (
                <>
                  <br />
                  <br />
                </>
              )}
            </span>
          ))}
          <span className="story-quote">&rdquo;</span>
        </Reveal>
      </div>
    </section>
  );
}
