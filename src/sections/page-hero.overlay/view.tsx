import { ArrowRight } from "lucide-react";
import { Eyebrow } from "@/components/shared/eyebrow";
import { SiteContainer } from "@/components/shared/site-container";
import { Button } from "@/components/ui/button";
import { Body } from "@/components/ui/typography/Body";
import { Heading } from "@/components/ui/typography/Heading";

export type PageHeroOverlayProps = {
  id: string;
  eyebrow?: string;
  headline: string;
  subheadline?: string;
  image: { src: string; alt: string };
  primaryAction: { label: string; href: string };
  secondaryAction?: { label: string; href: string };
  highlights?: { value: string; label: string }[];
};

// Page opening block that owns the single h1 of a populated page.
export default function PageHeroOverlayView({
  id,
  eyebrow,
  headline,
  subheadline,
  image,
  primaryAction,
  secondaryAction,
  highlights,
}: PageHeroOverlayProps) {
  const headingId = `${id}-heading`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className="relative isolate flex min-h-[620px] items-end overflow-hidden tablet:min-h-[760px] desktop:min-h-[92svh]"
    >
      <img
        src={image.src}
        alt={image.alt}
        className="absolute inset-0 size-full object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-foreground/5 to-transparent"
      />
      <SiteContainer className="relative pb-12 pt-28 tablet:pb-16 tablet:pt-32 desktop:pb-24">
        <div className="max-w-[720px] animate-fade-up rounded-[28px] border border-border/60 bg-background/95 p-8 shadow-[0_40px_90px_-50px_rgba(20,69,61,0.75)] backdrop-blur-sm motion-reduce:animate-none tablet:p-10 desktop:p-12">
          {eyebrow ? <Eyebrow className="text-primary">{eyebrow}</Eyebrow> : null}
          <Heading
            level={1}
            variant="display-md"
            id={headingId}
            className="mt-4 max-w-[20ch] text-primary wide:text-[76px]"
          >
            {headline}
          </Heading>
          {subheadline ? (
            <Body size="lg" className="mt-6 max-w-[52ch] text-muted-foreground">
              {subheadline}
            </Body>
          ) : null}
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Button
              asChild
              className="h-12 rounded-full px-7 text-sm font-semibold tracking-wide shadow-[0_18px_36px_-20px_rgba(20,69,61,0.9)]"
            >
              <a href={primaryAction.href}>
                {primaryAction.label}
                <ArrowRight aria-hidden="true" />
              </a>
            </Button>
            {secondaryAction ? (
              <Button
                asChild
                variant="outline"
                className="h-12 rounded-full border-primary/30 px-7 text-sm font-semibold tracking-wide text-primary hover:bg-secondary hover:text-primary"
              >
                <a href={secondaryAction.href}>{secondaryAction.label}</a>
              </Button>
            ) : null}
          </div>
          {highlights && highlights.length > 0 ? (
            <dl className="mt-10 flex flex-wrap gap-x-12 gap-y-5 border-t border-border pt-7">
              {highlights.map((highlight) => (
                <div key={highlight.label}>
                  <dt className="text-[24px] font-semibold leading-none text-primary">
                    {highlight.value}
                  </dt>
                  <dd className="t-eyebrow mt-2 text-muted-foreground">
                    {highlight.label}
                  </dd>
                </div>
              ))}
            </dl>
          ) : null}
        </div>
      </SiteContainer>
    </section>
  );
}
