"use client";

import { EVENT } from "@/lib/constants";
import { Ornament } from "@/components/ui/Ornament";

export function Footer() {
  return (
    <footer className="site-footer">
      <Ornament
        size="sm"
        animation="spin-slow"
        className="footer-ornament"
        opacity={0.35}
      />
      <div className="name">{EVENT.brideName}</div>
      <div className="date">{EVENT.footerDate}</div>
      <div className="hearts">✦ ✦ ✦</div>
      <div className="tagline">{EVENT.eventType}</div>
    </footer>
  );
}
