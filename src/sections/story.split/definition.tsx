import type { StorySplitSection } from "@/site-schema/generated/types";
import React from "react";
import StorySplitView, { type StorySplitContent } from "./view";

export const definition = {
  id: "story.split",
  type: "story",
  variant: "split",
  toProps: (section: StorySplitSection) => ({
    content: section.content as StorySplitContent,
  }),
  render: (section: StorySplitSection) => (
    <StorySplitView content={section.content as StorySplitContent} />
  ),
} as const;

export default definition;
