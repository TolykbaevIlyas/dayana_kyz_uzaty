"use client";

import Image from "next/image";
import { useState } from "react";
import { GALLERY_ITEMS } from "@/lib/constants";
import { useInvitation } from "@/context/InvitationContext";
import { OrnamentLine } from "@/components/ui/OrnamentLine";
import { Ornament } from "@/components/ui/Ornament";
import { Reveal } from "@/components/ui/Reveal";
import { Lightbox } from "@/components/Lightbox";

export function Gallery() {
  const { t } = useInvitation();
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  return (
    <>
      <section className="site-section gallery-section" id="gallery">
        <Ornament
          size="sm"
          animation="float"
          className="section-ornament section-ornament--gallery-l"
          opacity={0.15}
        />
        <Ornament
          size="md"
          animation="rotate"
          className="section-ornament section-ornament--gallery-r"
          opacity={0.1}
          flip="horizontal"
        />
        <div className="container">
          <Reveal>
            <p className="section-eyebrow">{t.galleryEyebrow}</p>
          </Reveal>
          <Reveal>
            <h2 className="section-title">{t.galleryTitle}</h2>
          </Reveal>
          <OrnamentLine />

          <Reveal className="gallery-grid">
            {GALLERY_ITEMS.map((item) => (
              <div
                key={item.id}
                className="gallery-item"
                onClick={() => item.src && setLightboxSrc(item.src)}
                onKeyDown={(e) =>
                  e.key === "Enter" && item.src && setLightboxSrc(item.src)
                }
                role={item.src ? "button" : undefined}
                tabIndex={item.src ? 0 : undefined}
              >
                {item.src ? (
                  <Image
                    src={item.src}
                    alt={item.alt ?? t.galleryTitle}
                    width={600}
                    height={800}
                    style={{ width: "100%", height: "auto" }}
                  />
                ) : (
                  <div
                    className="gallery-placeholder"
                    style={{ aspectRatio: item.aspectRatio }}
                  >
                    {item.emoji}
                  </div>
                )}
              </div>
            ))}
          </Reveal>

          <p
            style={{
              textAlign: "center",
              marginTop: 24,
              fontSize: 12,
              color: "var(--color-plum)",
              opacity: 0.5,
              letterSpacing: 2,
            }}
          >
            {t.galleryNote}
          </p>
        </div>
      </section>

      <Lightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
    </>
  );
}
