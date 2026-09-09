import { cn } from "@/lib/utils";

export type BtnVariant = "primary" | "outline" | "on-inverse" | "ink" | "sage";
export type BtnSize = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-[10px] whitespace-nowrap rounded-full font-semibold transition-all duration-200 select-none disabled:pointer-events-none disabled:opacity-45";

const variants: Record<BtnVariant, string> = {
  primary:
    "bg-butter text-[#241a06] hover:bg-butter-600 active:translate-y-[1px] shadow-[0_1px_0_rgba(28,26,12,0.06)]",
  outline:
    "border border-border bg-card text-foreground hover:border-[color:rgba(34,34,28,0.3)] hover:bg-muted/60",
  "on-inverse":
    "border border-white/25 bg-white/0 text-white hover:border-white/50 hover:bg-white/10",
  ink: "bg-inverse text-inverse-foreground hover:opacity-90 active:translate-y-[1px]",
  sage: "bg-sage-100 text-sage-800 hover:bg-sage-200",
};

const sizes: Record<BtnSize, string> = {
  sm: "h-[40px] px-[18px] text-[13px]",
  md: "h-[48px] px-[24px] text-[15px]",
  lg: "h-[56px] px-[30px] text-[16px]",
};

export function ctaClass(
  variant: BtnVariant = "primary",
  size: BtnSize = "md",
  className?: string,
) {
  return cn(base, variants[variant], sizes[size], className);
}

export function dietChipClass(active: boolean) {
  return cn(
    "inline-flex h-[34px] items-center gap-[6px] rounded-full border px-[14px] text-[13px] font-medium transition-colors",
    active
      ? "border-sage-600 bg-sage-600 text-white"
      : "border-border bg-card text-foreground hover:border-sage-400 hover:bg-sage-50",
  );
}
