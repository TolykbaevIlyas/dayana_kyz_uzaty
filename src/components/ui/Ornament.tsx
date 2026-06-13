"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

export const ORNAMENT_SRC = "/images/Ornament.webp";

export type OrnamentAnimation =
  | "rotate"
  | "float"
  | "pulse"
  | "spin-slow"
  | "sway"
  | "none";

export type OrnamentSize = "xs" | "sm" | "md" | "lg" | "xl";

const SIZES: Record<OrnamentSize, number> = {
  xs: 28,
  sm: 40,
  md: 64,
  lg: 96,
  xl: 140,
};

interface OrnamentProps {
  size?: OrnamentSize;
  animation?: OrnamentAnimation;
  className?: string;
  opacity?: number;
  rotate?: number;
  flip?: "horizontal" | "vertical";
}

function getAnimationProps(animation: OrnamentAnimation) {
  switch (animation) {
    case "rotate":
      return {
        animate: { rotate: 360 },
        transition: { duration: 24, repeat: Infinity, ease: "linear" as const },
      };
    case "spin-slow":
      return {
        animate: { rotate: [0, 8, 0, -8, 0] },
        transition: { duration: 6, repeat: Infinity, ease: "easeInOut" as const },
      };
    case "float":
      return {
        animate: { y: [0, -12, 0] },
        transition: { duration: 4, repeat: Infinity, ease: "easeInOut" as const },
      };
    case "pulse":
      return {
        animate: { scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] },
        transition: { duration: 3, repeat: Infinity, ease: "easeInOut" as const },
      };
    case "sway":
      return {
        animate: { rotate: [-6, 6, -6] },
        transition: { duration: 5, repeat: Infinity, ease: "easeInOut" as const },
      };
    default:
      return {};
  }
}

export function Ornament({
  size = "md",
  animation = "none",
  className,
  opacity = 0.85,
  rotate = 0,
  flip,
}: OrnamentProps) {
  const px = SIZES[size];
  const animProps = getAnimationProps(animation);
  return (
    <motion.div
      className={cn(
        "ornament-img-wrap",
        flip === "horizontal" && "ornament-flip-h",
        flip === "vertical" && "ornament-flip-v",
        className,
      )}
      style={{
        width: px,
        height: px,
        opacity,
        rotate: rotate || undefined,
      }}
      aria-hidden
      {...animProps}
    >
      <Image
        src={ORNAMENT_SRC}
        alt=""
        width={px}
        height={px}
        className="ornament-img"
      />
    </motion.div>
  );
}
