import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

export type SiteContainerProps = ComponentPropsWithoutRef<"div">;

// Keep the site's width and responsive gutters in one CSS rule.
export function SiteContainer({ className, ...props }: SiteContainerProps) {
  return <div {...props} className={cn("container-site", className)} />;
}
