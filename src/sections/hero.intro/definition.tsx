import type { HeroIntroSection } from "@/site-schema/generated/types";
import React from "react";
import HeroIntroView, { type HeroIntroContent } from "./view";

export const definition = {
  id: "hero.intro",
  type: "hero",
  variant: "intro",
  toProps: (section: HeroIntroSection) => ({
    content: section.content as HeroIntroContent,
  }),
  render: (section: HeroIntroSection) => (
    <HeroIntroView content={section.content as HeroIntroContent} />
  ),
} as const;

export default definition;
