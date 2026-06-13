"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface RevealProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "p" | "section";
}

export function Reveal({ children, className, as: Tag = "div" }: RevealProps) {
  return <Tag className={cn("reveal", className)}>{children}</Tag>;
}
