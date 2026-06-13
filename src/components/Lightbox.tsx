"use client";

import { cn } from "@/lib/cn";

interface LightboxProps {
  src: string | null;
  onClose: () => void;
}

export function Lightbox({ src, onClose }: LightboxProps) {
  return (
    <div
      className={cn("lightbox", src && "open")}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal={!!src}
      aria-hidden={!src}
    >
      <button
        type="button"
        className="lightbox-close"
        onClick={onClose}
        aria-label="Закрыть"
      >
        ✕
      </button>
      {src && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt="" />
      )}
    </div>
  );
}
