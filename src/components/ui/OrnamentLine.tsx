import { cn } from "@/lib/cn";
import { Ornament } from "@/components/ui/Ornament";

interface OrnamentLineProps {
  variant?: "rose" | "blush";
  className?: string;
  animate?: boolean;
}

export function OrnamentLine({
  variant = "rose",
  className,
  animate = true,
}: OrnamentLineProps) {
  return (
    <div className={cn("ornament-line reveal", className)}>
      <div className={cn("ornament-line-bar", variant === "blush" && "blush")} />
      <Ornament
        size="sm"
        animation={animate ? "spin-slow" : "none"}
        opacity={variant === "blush" ? 0.75 : 0.9}
      />
      <div className={cn("ornament-line-bar", variant === "blush" && "blush")} />
    </div>
  );
}
