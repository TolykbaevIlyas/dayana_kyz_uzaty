"use client";

import { useEffect, useState } from "react";

export function useNavScroll(active: boolean) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!active) return;

    const onScroll = () => {
      setScrolled(window.scrollY > 60);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [active]);

  return scrolled;
}
