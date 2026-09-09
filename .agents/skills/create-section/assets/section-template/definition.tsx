import type { ExampleDefaultSection } from "@/site-schema/generated/types";
import ExampleView from "./view";

export const definition = {
  id: "example.default",
  type: "example",
  variant: "default",
  toProps: (section: ExampleDefaultSection) => ({ content: section.content }),
  render: (section: ExampleDefaultSection) => (
    <ExampleView content={section.content} />
  ),
} as const;

export default definition;
