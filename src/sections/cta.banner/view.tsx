import type { CtaBannerSection } from "@/site-schema/generated/types";
import type { ResolvedAction } from "@/site-schema/runtime/resolve-link";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { contentIcons as icons } from "@/components/shared/content-icons";
import { Section } from "@/components/shared/section";
import { SectionHeader } from "@/components/shared/section-header";
import { Reveal } from "@/components/shared/reveal";
import { ctaClass } from "@/components/shared/cta";

export type OrderProps = Omit<CtaBannerSection["content"], "action"> & {
  action: ResolvedAction;
};

export default function OrderBannerView({
  id,
  ...content
}: OrderProps & { id: string }) {
  return (
    <Section id={id} aria-labelledby={`${id}-heading`}>
      <Reveal>
        <div className="relative overflow-hidden rounded-[28px] border border-border bg-card px-[22px] py-[56px] tablet:px-[48px] tablet:py-[72px] desktop:px-[80px]">
          <span
            aria-hidden="true"
            className="a-float pointer-events-none absolute -right-[36px] -top-[64px] select-none font-display text-[220px] font-bold leading-none text-sage-100 tablet:text-[300px]"
          >
            {content.monogram}
          </span>
          <div className="relative grid items-end gap-[36px] desktop:grid-cols-[1.3fr_0.7fr] desktop:gap-[64px]">
            <SectionHeader
              headingId={`${id}-heading`}
              eyebrow={content.eyebrow}
              title={content.title}
              description={content.description}
              headingClassName="text-balance"
              descriptionClassName="max-w-[560px]"
            />
            <div className="flex flex-col items-start gap-[20px] desktop:items-end">
              <Link
                href={content.action.href}
                className={ctaClass("primary", "lg")}
              >
                {content.action.label}
                <ArrowRight className="h-[18px] w-[18px]" strokeWidth={2.2} />
              </Link>
              <ul className="flex flex-wrap gap-[10px]">
                {content.perks.map((perk) => {
                  const Icon = icons[perk.icon];
                  return (
                    <li
                      key={perk.label}
                      className="inline-flex items-center gap-[8px] rounded-full border border-border bg-background px-[14px] py-[8px] text-[12px] font-medium text-foreground"
                    >
                      <Icon
                        className="h-[14px] w-[14px] text-sage-600"
                        strokeWidth={2}
                      />
                      {perk.label}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
