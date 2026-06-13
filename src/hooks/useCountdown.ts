"use client";

import { useEffect, useState } from "react";
import { EVENT } from "@/lib/constants";
import { useMounted } from "@/hooks/useMounted";

export interface CountdownValues {
  days: string;
  hours: string;
  mins: string;
  secs: string;
}

const EMPTY_COUNTDOWN: CountdownValues = {
  days: "000",
  hours: "00",
  mins: "00",
  secs: "00",
};

function pad(value: number, length: number): string {
  return String(value).padStart(length, "0");
}

function calculateCountdown(target: Date): CountdownValues {
  const diff = target.getTime() - Date.now();

  if (diff <= 0) {
    return { ...EMPTY_COUNTDOWN };
  }

  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  const secs = Math.floor((diff % 60000) / 1000);

  return {
    days: pad(days, 3),
    hours: pad(hours, 2),
    mins: pad(mins, 2),
    secs: pad(secs, 2),
  };
}

export function useCountdown(active: boolean): CountdownValues {
  const [values, setValues] = useState<CountdownValues>(EMPTY_COUNTDOWN);
  const mounted = useMounted();

  useEffect(() => {
    if (!mounted || !active) return;

    const target = new Date(EVENT.dateISO);
    const update = () => setValues(calculateCountdown(target));

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [active, mounted]);

  return values;
}
