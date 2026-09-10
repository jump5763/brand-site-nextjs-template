"use client";

import { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Section } from "@/components/shared/section";
import { SectionHeader } from "@/components/shared/section-header";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Body } from "@/components/ui/typography/Body";

export type FeaturedDishesCarouselProps = {
  id: string;
  eyebrow?: string;
  title: string;
  description?: string;
  items: {
    name: string;
    description: string;
    price: string;
    badge?: string;
    image: { src: string; alt: string };
    action?: { label: string; href: string };
  }[];
  action?: { label: string; href: string };
};

const controlClassName =
  "size-12 rounded-full border border-border bg-card text-primary transition-colors [&_svg]:size-5 hover:bg-primary hover:text-primary-foreground disabled:opacity-40";

// Season highlight rail; owns no h1 and keeps dish names at h3 under its h2.
export default function FeaturedDishesCarouselView({
  id,
  eyebrow,
  title,
  description,
  items,
  action,
}: FeaturedDishesCarouselProps) {
  const headingId = `${id}-heading`;
  const [api, setApi] = useState<CarouselApi>();
  const [position, setPosition] = useState(1);
  const [count, setCount] = useState(items.length);

  useEffect(() => {
    if (!api) return;
    const sync = () => {
      setPosition(api.selectedScrollSnap() + 1);
      setCount(api.scrollSnapList().length);
    };
    sync();
    api.on("select", sync);
    api.on("reInit", sync);
    return () => {
      api.off("select", sync);
      api.off("reInit", sync);
    };
  }, [api]);

  return (
    <Section id={id} aria-labelledby={headingId} spacing="standard">
      <Carousel
        opts={{ align: "start", loop: true }}
        plugins={[
          Autoplay({
            delay: 4500,
            stopOnInteraction: false,
            stopOnMouseEnter: true,
          }),
        ]}
        setApi={setApi}
        aria-labelledby={headingId}
      >
        <div className="flex flex-wrap items-end justify-between gap-6 animate-fade-up motion-reduce:animate-none">
          <SectionHeader
            eyebrow={eyebrow}
            title={title}
            description={description}
            headingId={headingId}
            headingLevel={2}
            className="max-w-[52ch]"
            descriptionClassName="max-w-[46ch]"
          />
          <div className="hidden items-center gap-3 tablet:flex">
            <CarouselPrevious className={controlClassName}>
              <ChevronLeft aria-hidden="true" />
              <span className="sr-only">Previous dishes</span>
            </CarouselPrevious>
            <CarouselNext className={controlClassName}>
              <ChevronRight aria-hidden="true" />
              <span className="sr-only">Next dishes</span>
            </CarouselNext>
          </div>
        </div>

        <CarouselContent className="mt-12 -ml-5">
          {items.map((item) => (
            <CarouselItem
              key={item.name}
              className="basis-[86%] pl-5 tablet:basis-1/2 desktop:basis-1/3"
            >
              <article className="group flex h-full flex-col rounded-[24px] border border-border/70 bg-card p-3 shadow-[0_24px_60px_-46px_rgba(20,69,61,0.7)] transition-transform duration-300 hover:-translate-y-1">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[18px] bg-secondary">
                  <img
                    src={item.image.src}
                    alt={item.image.alt}
                    loading="lazy"
                    decoding="async"
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                  {item.badge ? (
                    <span className="absolute left-3 top-3 rounded-full bg-background/95 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
                      {item.badge}
                    </span>
                  ) : null}
                </div>
                <div className="flex flex-1 flex-col px-2 pb-1 pt-5">
                  <h3 className="text-[19px] font-semibold leading-snug text-primary">
                    {item.name}
                  </h3>
                  <Body size="sm" className="mt-3 text-muted-foreground">
                    {item.description}
                  </Body>
                  <div className="mt-auto flex items-center justify-between gap-3 pt-5">
                    <span className="text-[17px] font-semibold text-foreground">
                      {item.price}
                    </span>
                    {item.action ? (
                      <a
                        href={item.action.href}
                        className="inline-flex items-center gap-1 text-sm font-medium text-primary underline-offset-4 hover:underline"
                      >
                        {item.action.label}
                        <ArrowRight aria-hidden="true" className="size-4" />
                      </a>
                    ) : null}
                  </div>
                </div>
              </article>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-6">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">{position}</span>
          {" / "}
          {count}
        </p>
        {action ? (
          <Button
            asChild
            variant="outline"
            className="h-12 rounded-full border-primary/30 px-7 text-sm font-semibold text-primary hover:bg-secondary hover:text-primary"
          >
            <a href={action.href}>
              {action.label}
              <ArrowRight aria-hidden="true" />
            </a>
          </Button>
        ) : null}
      </div>
    </Section>
  );
}
