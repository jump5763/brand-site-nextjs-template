import type { StorySplitSection } from "@/site-schema/generated/types";
import type { ResolvedAction } from "@/site-schema/runtime/resolve-link";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Section } from "@/components/shared/section";
import { SectionHeader } from "@/components/shared/section-header";
import { Reveal } from "@/components/shared/reveal";
import { ctaClass } from "@/components/shared/cta";

export type FarmProps = Omit<StorySplitSection["content"], "action"> & {
  action: ResolvedAction;
};

export default function StorySplitView({
  id,
  ...content
}: FarmProps & { id: string }) {
  return (
    <Section id={id} aria-labelledby={`${id}-heading`}>
      <div className="grid items-center gap-[44px] desktop:grid-cols-2 desktop:gap-[96px]">
        <Reveal className="order-2 desktop:order-1">
          <div className="relative">
            <div className="aspect-[4/3] overflow-hidden rounded-[24px] border border-border bg-sage-100 desktop:aspect-[7/6] desktop:rounded-[28px]">
              <img
                src={content.media.path}
                alt={content.media.alt}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -right-[12px] top-[22px] hidden rounded-[18px] border border-border bg-card p-[16px] shadow-lift tablet:block desktop:-right-[28px]">
              <p className="t-eyebrow text-[10px] text-sage-700">
                {content.ingredientsLabel}
              </p>
              <div className="mt-[10px] flex max-w-[220px] flex-wrap gap-[6px]">
                {content.ingredients.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-sage-100 px-[10px] py-[5px] text-[11px] font-medium text-sage-800"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={140} className="order-1 desktop:order-2">
          <SectionHeader
            headingId={`${id}-heading`}
            eyebrow={content.eyebrow}
            title={content.title}
            description={content.description}
            headingClassName="text-balance"
            descriptionClassName="mt-[20px]"
          />
          <ul className="mt-[28px] space-y-[16px]">
            {content.promises.map((promise) => (
              <li key={promise} className="flex items-start gap-[12px]">
                <span className="mt-[2px] flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-full bg-sage-100">
                  <Check
                    className="h-[13px] w-[13px] text-sage-700"
                    strokeWidth={3}
                  />
                </span>
                <span className="text-[14px] leading-[1.65] text-foreground">
                  {promise}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-[36px]">
            <Link
              href={content.action.href}
              className={ctaClass("outline", "md", "shadow-none")}
            >
              {content.action.label}
              <ArrowRight className="h-[16px] w-[16px]" strokeWidth={2.2} />
            </Link>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
