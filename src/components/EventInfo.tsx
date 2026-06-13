"use client";

import { EVENT } from "@/lib/constants";
import { useInvitation } from "@/context/InvitationContext";
import { OrnamentLine } from "@/components/ui/OrnamentLine";
import { Ornament } from "@/components/ui/Ornament";
import { Reveal } from "@/components/ui/Reveal";

export function EventInfo() {
  const { t } = useInvitation();

  return (
    <section className="site-section event-section" id="event">
      <Ornament
        size="md"
        animation="rotate"
        className="section-ornament section-ornament--event-l"
        opacity={0.14}
      />
      <Ornament
        size="sm"
        animation="float"
        className="section-ornament section-ornament--event-r"
        opacity={0.12}
        flip="horizontal"
      />
      <div className="container">
        <Reveal>
          <p className="section-eyebrow">{t.eventEyebrow}</p>
        </Reveal>
        <Reveal>
          <h2 className="section-title">{t.eventTitle}</h2>
        </Reveal>
        <OrnamentLine />

        <div className="event-cards">
          <Reveal className="event-card">
            <div className="event-icon"></div>
            <div className="event-card-title">{t.evDateL}</div>
            <div className="event-card-val">{t.evDateV}</div>
          </Reveal>

          <Reveal className="event-card">
            <div className="event-icon"></div>
            <div className="event-card-title">{t.evTimeL}</div>
            <div className="event-card-val">{EVENT.time}</div>
          </Reveal>

          <Reveal className="event-card">
            <div className="event-icon"></div>
            <div className="event-card-title">{t.evPlaceL}</div>
            <div className="event-card-val">
              {EVENT.venue.name}
              <br />
              <small style={{ opacity: 0.6, fontSize: 13 }}>
                {EVENT.venue.address}
                <br />
                {EVENT.venue.city}
              </small>
            </div>
          </Reveal>
        </div>

        <div style={{ textAlign: "center", marginTop: 10 }}>
          <Reveal>
            <a
              className="map-btn"
              href={EVENT.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.mapBtn}
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
