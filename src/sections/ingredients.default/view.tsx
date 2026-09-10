import {
  Droplets,
  Flame,
  Heart,
  Leaf,
  Sprout,
  Sun,
  Truck,
  Wheat,
  type LucideIcon,
} from "lucide-react";
import { Section } from "@/components/shared/section";
import { SectionHeader } from "@/components/shared/section-header";
import { Body } from "@/components/ui/typography/Body";

export type IngredientsIconKey =
  | "leaf"
  | "sprout"
  | "droplet"
  | "wheat"
  | "sun"
  | "flame"
  | "heart"
  | "truck";

export type IngredientsDefaultProps = {
  id: string;
  eyebrow?: string;
  title: string;
  description?: string;
  note?: string;
  media: { src: string; alt: string; width?: number; height?: number };
  mediaSecondary?: { src: string; alt: string; width?: number; height?: number };
  items: { name: string; description: string; icon: IngredientsIconKey }[];
};

const ingredientIcons: Record<IngredientsIconKey, LucideIcon> = {
  leaf: Leaf,
  sprout: Sprout,
  droplet: Droplets,
  wheat: Wheat,
  sun: Sun,
  flame: Flame,
  heart: Heart,
  truck: Truck,
};

// Two-column sourcing block below the page h1; the photograph column never leads on mobile.
export default function IngredientsDefaultView({
  id,
  eyebrow,
  title,
  description,
  note,
  media,
  mediaSecondary,
  items,
}: IngredientsDefaultProps) {
  return (
    <Section
      id={id}
      aria-labelledby={`${id}-heading`}
      spacing="spacious"
      className="scroll-mt-[88px]"
    >
      <div className="grid items-center gap-12 desktop:grid-cols-2 desktop:gap-16">
        <div className="animate-fade-up motion-reduce:animate-none">
          <SectionHeader
            eyebrow={eyebrow}
            title={title}
            description={description}
            headingId={`${id}-heading`}
            headingLevel={2}
          />
          <ul className="mt-8 grid gap-8 tablet:grid-cols-2">
            {items.map((item) => {
              const Icon = ingredientIcons[item.icon];
              return (
                <li key={item.name}>
                  <span
                    aria-hidden="true"
                    className="grid size-11 place-items-center rounded-full bg-secondary text-primary"
                  >
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-4 text-[17px] font-semibold text-primary">
                    {item.name}
                  </h3>
                  <Body size="sm" className="mt-2 text-muted-foreground">
                    {item.description}
                  </Body>
                </li>
              );
            })}
          </ul>
          {note ? (
            <Body
              size="sm"
              className="mt-10 border-l-2 border-primary/30 pl-5 italic text-muted-foreground"
            >
              {note}
            </Body>
          ) : null}
        </div>

        <div className="relative animate-fade-in motion-reduce:animate-none">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] border border-border/60 shadow-[0_36px_80px_-52px_rgba(20,69,61,0.8)]">
            <img
              src={media.src}
              alt={media.alt}
              loading="lazy"
              decoding="async"
              className="size-full object-cover"
            />
          </div>
          {mediaSecondary ? (
            <div className="absolute -bottom-6 -left-6 hidden aspect-square w-[42%] overflow-hidden rounded-[22px] border-4 border-background shadow-[0_36px_80px_-52px_rgba(20,69,61,0.8)] tablet:block">
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
