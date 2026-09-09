import type { FaqDefaultSection } from "@/site-schema/generated/types";
import React from "react";
import { FaqView, type FaqContent } from "./view";

export const toProps = (section: FaqDefaultSection): FaqContent =>
  section.content as unknown as FaqContent;
const definition = {
  id: "faq.default" as const,
  type: "faq" as const,
  variant: "default" as const,
  toProps,
  render: (section: FaqDefaultSection) => (
    <FaqView content={toProps(section)} />
  ),
};
export default definition;
