"use client";

import { motion } from "framer-motion";
import { EVENT } from "@/lib/constants";
import { cn } from "@/lib/cn";
import { useInvitation } from "@/context/InvitationContext";
import { Ornament } from "@/components/ui/Ornament";
import type { Language } from "@/types";

export function LanguageScreen() {
  const { phase, chooseLang } = useInvitation();
  const hidden = phase !== "language";

  return (
    <motion.div
      className={cn("lang-screen", hidden && "hide")}
      initial={false}
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ duration: 0.9, ease: [0.77, 0, 0.18, 1] }}
    >
      <Ornament
        size="lg"
        animation="pulse"
        className="lang-ornament"
        opacity={0.85}
      />
      <p className="lang-title">{EVENT.eventType}</p>
      <p className="lang-sub">{EVENT.langSub}</p>
      <div className="lang-btns">
        <LangButton lang="ru" label="Русский" onSelect={chooseLang} />
        <LangButton lang="kz" label="Қазақша" onSelect={chooseLang} />
      </div>
    </motion.div>
  );
}

function LangButton({
  lang,
  label,
  onSelect,
}: {
  lang: Language;
  label: string;
  onSelect: (lang: Language) => void;
}) {
  return (
    <motion.button
      type="button"
      className="lang-btn"
      onClick={() => onSelect(lang)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {label}
    </motion.button>
  );
}
