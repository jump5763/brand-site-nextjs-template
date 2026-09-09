import type { CtaStoryLinksSection } from "@/site-schema/generated/types";
import React from "react";
import CtaStoryLinksView, { type CtaStoryLinksContent } from "./view";

export const definition = {
  id: "cta.story-links",
  type: "cta",
  variant: "story-links",
  toProps: (section: CtaStoryLinksSection) => ({
    content: section.content as CtaStoryLinksContent,
  }),
  render: (section: CtaStoryLinksSection) => (
    <CtaStoryLinksView content={section.content as CtaStoryLinksContent} />
  ),
} as const;

export default definition;
