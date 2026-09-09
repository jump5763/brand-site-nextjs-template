import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";
import { SiteContainer } from "./site-container";

export type SectionProps = ComponentPropsWithoutRef<"section"> & {
  container?: "site" | "none";
  spacing?: "none" | "standard" | "spacious";
  containerClassName?: string;
};

const spacingClasses = {
  none: "py-0",
  standard: "py-[var(--section-space-y)]",
  spacious: "py-[var(--section-space-y-spacious)]",
} as const;

// Own the section boundary and spacing; content layout belongs to the caller.
export function Section({
  container = "site",
  spacing = "standard",
  containerClassName,
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section {...props} className={cn(spacingClasses[spacing], className)}>
      {container === "site" ? (
        <SiteContainer className={containerClassName}>{children}</SiteContainer>
      ) : (
        children
      )}
    </section>
  );
}
