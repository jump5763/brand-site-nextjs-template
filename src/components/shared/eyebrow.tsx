import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

// A small introductory label, independent of section layout.
export function Eyebrow({
  className,
  ...props
}: ComponentPropsWithoutRef<"p">) {
  return <p {...props} className={cn("t-eyebrow text-sage-700", className)} />;
}
