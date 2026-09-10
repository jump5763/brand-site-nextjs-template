import { Section } from "@/components/shared/section";
import { Eyebrow } from "@/components/shared/eyebrow";
import { Body } from "@/components/ui/typography/Body";
import { Heading } from "@/components/ui/typography/Heading";

export type PageHeroBannerProps = {
  id: string;
  eyebrow?: string;
  title: string;
  description?: string;
  image: { src: string; alt: string };
  meta?: string[];
};

// Compact page opener that owns the single h1 of a populated page.
export default function PageHeroBannerView({
  id,
  eyebrow,
  title,
  description,
  image,
  meta,
}: PageHeroBannerProps) {
  const headingId = `${id}-heading`;

  return (
    <Section id={id} aria-labelledby={headingId} spacing="standard">
      <div className="grid items-center gap-10 desktop:grid-cols-[1.05fr_1fr] desktop:gap-16">
        <div className="animate-fade-up motion-reduce:animate-none">
          {eyebrow ? <Eyebrow className="text-primary">{eyebrow}</Eyebrow> : null}
          <Heading
            level={1}
            variant="display-md"
            id={headingId}
            className="mt-4 max-w-[18ch] text-primary"
          >
            {title}
          </Heading>
          {description ? (
            <Body size="lg" className="mt-6 max-w-[54ch] text-muted-foreground">
              {description}
            </Body>
          ) : null}
          {meta && meta.length > 0 ? (
            <ul className="mt-8 flex flex-wrap gap-3">
              {meta.map((item) => (
                <li
                  key={item}
                  className="rounded-full bg-secondary px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-secondary-foreground"
                >
                  {item}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <div className="animate-fade-in overflow-hidden rounded-[28px] border border-border/60 shadow-[0_36px_80px_-52px_rgba(20,69,61,0.8)] motion-reduce:animate-none">
          <img
            src={image.src}
            alt={image.alt}
            className="aspect-[4/3] size-full object-cover desktop:aspect-[16/11]"
          />
        </div>
      </div>
    </Section>
  );
}
