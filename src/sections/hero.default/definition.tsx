import type { HeroDefaultSection } from "@/site-schema/generated/types";
import React from "react";
import HeroDefaultView, { type HeroDefaultContent } from "./view";

export const definition = {
  id: "hero.default",
  type: "hero",
  variant: "default",
  toProps: (section: HeroDefaultSection) => ({
    content: section.content as HeroDefaultContent,
  }),
  render: (section: HeroDefaultSection) => (
    <HeroDefaultView content={section.content as HeroDefaultContent} />
  ),
} as const;

export default definition;
