import type { MarqueeDefaultSection } from "@/site-schema/generated/types";
import MarqueeView, { type MarqueeProps } from "./view";

export const toProps = (section: MarqueeDefaultSection): MarqueeProps => ({
  id: section.id,
  items: section.content.items,
});

export default {
  id: "marquee.default",
  type: "marquee",
  variant: "default",
  toProps,
  render: (section: MarqueeDefaultSection) => <MarqueeView {...toProps(section)} />,
} as const;
