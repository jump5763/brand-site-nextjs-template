import type { FeaturesStoryDisclosuresSection } from "@/site-schema/generated/types";
import { StoryDisclosuresView, type StoryDisclosuresProps } from "./view";

export const toProps = (
  section: FeaturesStoryDisclosuresSection,
): StoryDisclosuresProps => section.content as unknown as StoryDisclosuresProps;
const definition = {
  id: "features.story-disclosures" as const,
  type: "features" as const,
  variant: "story-disclosures" as const,
  toProps,
  render: (section: FeaturesStoryDisclosuresSection) => (
    <StoryDisclosuresView {...toProps(section)} />
  ),
};
export default definition;
