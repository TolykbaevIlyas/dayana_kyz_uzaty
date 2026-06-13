"use client";

import { FEATURES } from "@/lib/constants";
import { useInvitation } from "@/context/InvitationContext";
import { OrnamentLine } from "@/components/ui/OrnamentLine";
import { Ornament } from "@/components/ui/Ornament";
import { Reveal } from "@/components/ui/Reveal";

export function Features() {
  const { t } = useInvitation();

  return (
    <section className="site-section features-section">
      <Ornament
        size="md"
        animation="rotate"
        className="section-ornament section-ornament--features-tl"
        opacity={0.15}
      />
      <Ornament
        size="sm"
        animation="pulse"
        className="section-ornament section-ornament--features-br"
        opacity={0.18}
        flip="horizontal"
      />
      <div className="container">
        <Reveal>
          <p className="section-eyebrow">{t.featEyebrow}</p>
        </Reveal>
        <Reveal>
          <h2 className="section-title">{t.featTitle}</h2>
        </Reveal>
        <OrnamentLine variant="blush" />

        <div className="features-grid">
          {FEATURES.map((feature) => (
            <Reveal key={feature.titleKey} className="feature-card">
              <span className="icon">{feature.icon}</span>
              <div className="title">{t[feature.titleKey]}</div>
              <div className="desc">{t[feature.descKey]}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
