import type { StorySequenceSection } from "@/site-schema/generated/types";
import React from "react";
import StorySequenceView, { type StorySequenceItem } from "./view";

export const definition = {
  id: "story.sequence",
  type: "story",
  variant: "sequence",
  toProps: (section: StorySequenceSection) => ({
    content: section.content as { items: StorySequenceItem[] },
  }),
  render: (section: StorySequenceSection) => (
    <StorySequenceView
      content={section.content as { items: StorySequenceItem[] }}
    />
  ),
} as const;

export default definition;
