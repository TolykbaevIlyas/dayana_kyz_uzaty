"use client";

import { cn } from "@/lib/cn";
import { useInvitation } from "@/context/InvitationContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { LanguageScreen } from "@/components/LanguageScreen";
import { EnvelopeScreen } from "@/components/EnvelopeScreen";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { InvitationNotes } from "@/components/InvitationNotes";
import { Timer } from "@/components/Timer";
import { EventInfo } from "@/components/EventInfo";
import { Story } from "@/components/Story";
import { Features } from "@/components/Features";
import { DressCode } from "@/components/DressCode";
import { RSVP } from "@/components/RSVP";
import { Footer } from "@/components/Footer";

export function InvitationApp() {
  const { mainVisible } = useInvitation();
  useScrollReveal(mainVisible);

  return (
    <>
      <LanguageScreen />
      <EnvelopeScreen />

      <div className={cn("main-site", mainVisible && "visible")}>
        <Navigation />
        <Hero />
        <InvitationNotes />
        <Timer />
        <EventInfo />
        <Story />
        <Features />
        {/* <DressCode /> */}
        <RSVP />
        <Footer />
      </div>
    </>
  );
}
