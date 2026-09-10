import { Quote, Star } from "lucide-react";
import { Section } from "@/components/shared/section";
import { SectionHeader } from "@/components/shared/section-header";
import { Body } from "@/components/ui/typography/Body";

export type TestimonialsGridProps = {
  id: string;
  eyebrow?: string;
  title: string;
  description?: string;
  items: {
    quote: string;
    name: string;
    location: string;
    rating?: number;
    media?: { src: string; alt: string; width?: number; height?: number };
  }[];
};

// Social-proof band; reviewer names, ratings and locations stay plain text, never headings.
export default function TestimonialsGridView({
  id,
  eyebrow,
  title,
  description,
  items,
}: TestimonialsGridProps) {
  return (
    <Section
      id={id}
      aria-labelledby={`${id}-heading`}
      spacing="spacious"
      className="scroll-mt-[88px] bg-secondary/40"
    >
      <div className="mx-auto max-w-[720px] text-center">
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          description={description}
          headingId={`${id}-heading`}
          headingLevel={2}
          className="mx-auto max-w-[56ch]"
        />
      </div>

      <div className="mt-12 grid gap-6 tablet:grid-cols-2 desktop:grid-cols-3">
        {items.map((item) => (
          <figure
            key={`${item.name}-${item.location}`}
            className="relative flex h-full animate-fade-up flex-col rounded-[24px] border border-border/70 bg-card p-7 shadow-[0_24px_60px_-46px_rgba(20,69,61,0.7)] motion-reduce:animate-none"
          >
            <Quote
              aria-hidden="true"
              className="absolute right-6 top-6 size-6 text-primary/15"
            />
            {item.rating ? (
              <div
                role="img"
                aria-label={`${item.rating} out of 5 stars`}
                className="flex items-center gap-1 text-primary"
              >
                {Array.from({ length: item.rating }).map((_, index) => (
                  <Star
                    key={index}
                    aria-hidden="true"
                    className="size-4 fill-current"
                  />
                ))}
              </div>
            ) : null}
            <Body size="lg" className="mt-5 flex-1 text-foreground">
              {item.quote}
            </Body>
            <figcaption className="mt-7 flex items-center gap-3">
              {item.media ? (
                <img
                  src={item.media.src}
                  alt={item.media.alt}
                  loading="lazy"
                  decoding="async"
                  className="size-11 rounded-full object-cover"
                />
              ) : (
                <span
                  aria-hidden="true"
                  className="grid size-11 place-items-center rounded-full bg-secondary text-sm font-semibold text-secondary-foreground"
                >
                  {item.name.charAt(0)}
                </span>
              )}
              <div>
                <p className="text-sm font-semibold text-primary">{item.name}</p>
                <p className="text-xs text-muted-foreground">{item.location}</p>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
