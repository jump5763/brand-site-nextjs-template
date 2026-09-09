import { Section } from "@/components/shared/section";
import type { FeaturesIconGridSection } from "@/site-schema/generated/types";
import { contentIcons as icons } from "@/components/shared/content-icons";
import { Reveal } from "@/components/shared/reveal";

export type ValuesProps = FeaturesIconGridSection["content"];

export default function IconGridView({
  id,
  items,
}: ValuesProps & { id: string }) {
  return (
    <Section spacing="none" id={id} className="pb-[16px] tablet:pb-[24px]">
      <div className="grid divide-y divide-border rounded-[24px] border border-border bg-card tablet:grid-cols-3 tablet:divide-x tablet:divide-y-0">
        {items.map((item, index) => {
          const Icon = icons[item.icon];
          return (
            <Reveal key={item.title} delay={index * 110} className="h-full">
              <div className="flex h-full items-start gap-[16px] px-[24px] py-[22px]">
                <span className="mt-[2px] flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full bg-sage-100">
                  <Icon
                    className="h-[19px] w-[19px] text-sage-700"
                    strokeWidth={2}
                  />
                </span>
                <span>
                  <span className="block text-[15px] font-semibold text-foreground">
                    {item.title}
                  </span>
                  <span className="mt-[4px] block text-[13px] leading-[1.6] text-muted-foreground">
                    {item.text}
                  </span>
                </span>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
