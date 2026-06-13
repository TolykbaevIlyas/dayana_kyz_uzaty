"use client";

import { cn } from "@/lib/cn";
import { EVENT } from "@/lib/constants";
import { useInvitation } from "@/context/InvitationContext";
import { useNavScroll } from "@/hooks/useNavScroll";

export function Navigation() {
  const { t, mainVisible } = useInvitation();
  const scrolled = useNavScroll(mainVisible);

  if (!mainVisible) return null;

  return (
    <nav className={cn("site-nav", scrolled && "scrolled")} id="navbar">
      <span className="nav-logo">{EVENT.brideName}</span>
      <div className="nav-links">
        <a href="#event">{t.navEvent}</a>
        <a href="#gallery">{t.navGallery}</a>
        <a href="#rsvp">{t.navRsvp}</a>
      </div>
    </nav>
  );
}
