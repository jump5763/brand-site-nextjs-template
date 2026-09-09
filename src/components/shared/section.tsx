import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

// Shared spacing and heading treatment used by the editorial sections.
export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="t-eyebrow text-sage-700">{children}</p>;
}

export function Section({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={cn("py-[64px] tablet:py-[96px]", className)}>
      <div className="container-site">{children}</div>
    </section>
  );
}
