import Link from "next/link";
import { Leaf } from "lucide-react";
import { cn } from "@/lib/utils";

export function BrandMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "flex h-[38px] w-[38px] items-center justify-center rounded-full bg-butter",
        className,
      )}
      aria-hidden="true"
    >
      <Leaf className="h-[19px] w-[19px] text-[#241a06]" strokeWidth={2.4} />
    </span>
  );
}

export function Brand({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="keke — home"
      className={cn(
        "inline-flex items-center justify-center gap-[11px] rounded-full focus-visible:outline-2 focus-visible:outline-offset-4",
        className,
      )}
    >
      <BrandMark />
      <span className="font-display text-[32px] font-semibold leading-none tracking-[-0.5px] text-foreground">
        keke
      </span>
    </Link>
  );
}
