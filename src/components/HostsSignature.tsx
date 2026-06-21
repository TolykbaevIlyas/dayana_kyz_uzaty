"use client";

import { Ornament } from "@/components/ui/Ornament";
import { Reveal } from "@/components/ui/Reveal";
import { useInvitation } from "@/context/InvitationContext";

export function HostsSignature() {
  const { lang } = useInvitation();
  const isRu = lang === "ru";

  return (
    <section className="hosts-section" aria-label={isRu ? "Организаторы" : "Той иелері"}>
      <Ornament
        size="sm"
        animation="float"
        className="hosts-ornament hosts-ornament--left"
        opacity={0.16}
      />
      <Ornament
        size="sm"
        animation="sway"
        className="hosts-ornament hosts-ornament--right"
        opacity={0.14}
        flip="horizontal"
      />

      <div className="container">
        <Reveal className="hosts-card">
          <p className="hosts-text">
            {isRu ? "С уважением" : "Той иелері"}
          </p>
          <p className="hosts-names">
            {isRu ? "Бейбит - Айсулу" : "Бейбіт - Айсулу"}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
