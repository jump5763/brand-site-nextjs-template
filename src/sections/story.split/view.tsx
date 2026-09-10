import { Section } from "@/components/shared/section";
import { SectionHeader } from "@/components/shared/section-header";
import { Button } from "@/components/ui/button";
import { Body } from "@/components/ui/typography/Body";

export type StorySplitProps = {
  id: string;
  eyebrow?: string;
  title: string;
  paragraphs: string[];
  media: { src: string; alt: string; width?: number; height?: number };
  mediaSecondary?: { src: string; alt: string; width?: number; height?: number };
  stats?: { value: string; label: string }[];
  action?: { label: string; href: string };
};

// Editorial story block; the collage column flips to the left on desktop so it alternates with neighbours.
export default function StorySplitView({
  id,
  eyebrow,
  title,
  paragraphs,
  media,
  mediaSecondary,
  stats,
  action,
}: StorySplitProps) {
  return (
    <Section
      id={id}
      aria-labelledby={`${id}-heading`}
      spacing="spacious"
      className="scroll-mt-[88px]"
    >
      <div className="grid items-center gap-12 desktop:grid-cols-[1.05fr_1fr] desktop:gap-16">
        <div className="animate-fade-up motion-reduce:animate-none">
          <SectionHeader
            eyebrow={eyebrow}
            title={title}
            headingId={`${id}-heading`}
            headingLevel={2}
          />
          {paragraphs.map((paragraph, index) => (
            <Body
              key={`${index}-${paragraph}`}
              size="lg"
              className={
                index === 0
                  ? "mt-8 max-w-[58ch] text-muted-foreground"
                  : "mt-5 max-w-[58ch] text-muted-foreground"
              }
            >
              {paragraph}
            </Body>
          ))}
          {stats && stats.length > 0 ? (
            <dl className="mt-10 grid grid-cols-2 gap-8 border-t border-border pt-8 tablet:grid-cols-3">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="text-[28px] font-semibold leading-none text-primary">
                    {stat.value}
                  </dt>
                  <dd className="t-eyebrow mt-2 text-muted-foreground">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>
          ) : null}
          {action ? (
            <Button
              asChild
              variant="outline"
              className="mt-10 h-12 rounded-full border-primary/30 px-7 text-sm font-semibold text-primary hover:bg-secondary hover:text-primary"
            >
              <a href={action.href}>{action.label}</a>
            </Button>
          ) : null}
        </div>

        <div className="relative isolate animate-fade-in motion-reduce:animate-none desktop:order-first">
          <div
            aria-hidden="true"
            className="absolute -left-6 -top-6 -z-10 hidden size-[38%] rounded-[28px] bg-secondary/60 tablet:block"
          />
          <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] border border-border/60 shadow-[0_36px_80px_-52px_rgba(20,69,61,0.8)]">
            <img
              src={media.src}
              alt={media.alt}
              loading="lazy"
              decoding="async"
              className="size-full object-cover"
            />
          </div>
          {mediaSecondary ? (
            <div className="absolute -bottom-8 -right-6 hidden aspect-square w-[38%] overflow-hidden rounded-[22px] border-4 border-background shadow-[0_36px_80px_-52px_rgba(20,69,61,0.8)] tablet:block">
              <img
                src={mediaSecondary.src}
                alt={mediaSecondary.alt}
                loading="lazy"
                decoding="async"
                className="size-full object-cover"
              />
            </div>
          ) : null}
        </div>
      </div>
    </Section>
  );
}
