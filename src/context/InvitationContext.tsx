"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getTranslation } from "@/lib/translations";
import type { AppPhase, Language, TranslationStrings } from "@/types";

interface InvitationContextValue {
  lang: Language;
  t: TranslationStrings;
  phase: AppPhase;
  mainVisible: boolean;
  timerActive: boolean;
  chooseLang: (lang: Language) => void;
  openEnvelope: () => void;
}

const InvitationContext = createContext<InvitationContextValue | null>(null);

export function InvitationProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>("ru");
  const [phase, setPhase] = useState<AppPhase>("language");
  const [mainVisible, setMainVisible] = useState(false);
  const [timerActive, setTimerActive] = useState(false);

  const t = useMemo(() => getTranslation(lang), [lang]);

  const chooseLang = useCallback((nextLang: Language) => {
    setLang(nextLang);
    window.setTimeout(() => setPhase("envelope"), 600);
  }, []);

  const openEnvelope = useCallback(() => {
    window.setTimeout(() => {
      setPhase("main");
      setMainVisible(true);
      setTimerActive(true);
    }, 1400);
  }, []);

  const value = useMemo(
    () => ({
      lang,
      t,
      phase,
      mainVisible,
      timerActive,
      chooseLang,
      openEnvelope,
    }),
    [lang, t, phase, mainVisible, timerActive, chooseLang, openEnvelope],
  );

  return (
    <InvitationContext.Provider value={value}>
      {children}
    </InvitationContext.Provider>
  );
}

export function useInvitation() {
  const context = useContext(InvitationContext);
  if (!context) {
    throw new Error("useInvitation must be used within InvitationProvider");
  }
  return context;
}
