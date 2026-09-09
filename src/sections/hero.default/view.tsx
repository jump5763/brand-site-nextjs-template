import { Section } from "@/components/shared/section";
import type { HeroDefaultSection } from "@/site-schema/generated/types";
import type { ResolvedAction } from "@/site-schema/runtime/resolve-link";
import Link from "next/link";
import { ArrowRight, Sprout } from "lucide-react";
import { contentIcons as icons } from "@/components/shared/content-icons";
import { ctaClass } from "@/components/shared/cta";
import { HeroCarousel } from "./carousel.client";

export type HeroProps = Omit<
  HeroDefaultSection["content"],
  "primaryAction" | "secondaryAction"
> & { primaryAction: ResolvedAction; secondaryAction: ResolvedAction };

const heroDelay = (ms: number) => ({ animationDelay: `${ms}ms` });

export default function HeroView({
  id,
  ...content
}: HeroProps & { id: string }) {
  return (
    <Section
      spacing="none"
      id={id}
      className="overflow-hidden pb-[16px] pt-[20px] tablet:pt-[44px]"
    >
      <div className="grid items-center gap-[48px] desktop:grid-cols-[1.05fr_0.95fr] desktop:gap-[56px]">
        <div className="max-w-[640px] pb-[8px]">
          <p
            className="a-hero inline-flex items-center gap-[10px] rounded-full border border-border bg-card px-[16px] py-[9px] text-[12px] font-semibold uppercase tracking-[1.2px] text-foreground"
            style={heroDelay(0)}
          >
            <Sprout
              className="h-[16px] w-[16px] text-sage-600"
              strokeWidth={2.2}
            />
            {content.eyebrow}
          </p>
          <h1
            className="a-hero t-display mt-[28px] text-balance text-primary"
            style={heroDelay(90)}
          >
            {content.title}
          </h1>
          <p
            className="a-hero t-lead mt-[24px] max-w-[540px] text-muted-foreground"
            style={heroDelay(190)}
          >
            {content.description}
          </p>
          <div
            className="a-hero mt-[36px] flex flex-wrap items-center gap-[14px]"
            style={heroDelay(290)}
          >
            <Link
              href={content.primaryAction.href}
              className={ctaClass("primary", "lg")}
            >
              {content.primaryAction.label}
              <ArrowRight className="h-[18px] w-[18px]" strokeWidth={2.2} />
            </Link>
            <Link
              href={content.secondaryAction.href}
              className="group inline-flex items-center gap-[8px] rounded-full px-[18px] py-[14px] text-[15px] font-semibold text-foreground"
            >
              {content.secondaryAction.label}
              <ArrowRight
                className="h-[16px] w-[16px] transition-transform group-hover:translate-x-[3px]"
                strokeWidth={2.2}
              />
            </Link>
          </div>
          <ul
            className="a-hero mt-[40px] flex flex-wrap gap-x-[26px] gap-y-[12px] text-[13px] text-muted-foreground"
            style={heroDelay(400)}
          >
            {content.benefits.map((benefit) => {
              const Icon = icons[benefit.icon];
              return (
                <li key={benefit.label} className="flex items-center gap-[8px]">
                  <Icon
                    className="h-[15px] w-[15px] text-sage-600"
                    strokeWidth={2}
                  />
                  {benefit.label}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="a-hero" style={heroDelay(150)}>
          {/* Gentle float on the whole hero media area */}
          <div className="a-float h-[420px] tablet:h-[560px] desktop:h-[640px]">
            <HeroCarousel
              slides={content.media.map((media) => ({
                src: media.path,
                alt: media.alt,
              }))}
              {...content.carousel}
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
