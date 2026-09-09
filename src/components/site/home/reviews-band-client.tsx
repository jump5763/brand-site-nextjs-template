"use client";

import { useRef, useState } from "react";
import { ArrowRight, Star } from "lucide-react";
import { Reveal } from "@/components/site/motion";
import type { ReviewsProps } from "@/lib/home-view-model";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="t-eyebrow text-sage-700">{children}</p>;
}

export function ReviewsBandClient({
  id,
  reviews,
  eyebrow,
  title,
}: ReviewsProps & { id: string }) {
  const scroller = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  const updateArrows = () => {
    const element = scroller.current;
    if (!element) return;
    setCanLeft(element.scrollLeft > 8);
    setCanRight(
      element.scrollLeft < element.scrollWidth - element.clientWidth - 8,
    );
  };

  const move = (direction: 1 | -1) => {
    const element = scroller.current;
    if (!element) return;
    const card = element.querySelector<HTMLElement>("[data-review-card]");
    const amount = card ? card.offsetWidth + 16 : 360;
    element.scrollBy({ left: amount * direction, behavior: "smooth" });
  };

  return (
    <section
      id={id}
      className="!pb-[40px] !pt-[64px] tablet:!pb-[56px] tablet:!pt-[96px]"
    >
      <div className="container-site">
        <div className="flex flex-col gap-[24px] tablet:flex-row tablet:items-end tablet:justify-between">
          <Reveal>
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 className="t-h2 mt-[14px]">{title}</h2>
          </Reveal>
          <Reveal delay={120} className="flex items-center gap-[10px]">
            <button
              type="button"
              onClick={() => move(-1)}
              disabled={!canLeft}
              aria-label="Previous reviews"
              className="flex h-[44px] w-[44px] items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-muted disabled:opacity-35"
            >
              <ArrowRight
                className="h-[17px] w-[17px] rotate-180"
                strokeWidth={2}
              />
            </button>
            <button
              type="button"
              onClick={() => move(1)}
              disabled={!canRight}
              aria-label="Next reviews"
              className="flex h-[44px] w-[44px] items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-muted disabled:opacity-35"
            >
              <ArrowRight className="h-[17px] w-[17px]" strokeWidth={2} />
            </button>
          </Reveal>
        </div>

        <div
          ref={scroller}
          onScroll={updateArrows}
          className="no-scrollbar -mx-[16px] mt-[36px] flex snap-x gap-[16px] overflow-x-auto px-[16px] pb-[10px] tablet:mx-0 tablet:px-0"
        >
          {reviews.map((review, index) => (
            <Reveal
              key={review.author}
              data-review-card
              delay={index * 90}
              className="w-[320px] shrink-0 snap-start mobile-xs:w-[290px] tablet:w-[420px]"
            >
              <figure className="flex h-full flex-col rounded-[20px] border border-border bg-card p-[24px] transition-shadow hover:shadow-card">
                <div
                  className="flex items-center gap-[3px]"
                  aria-label="5 out of 5 stars"
                >
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Star
                      key={starIndex}
                      className="h-[16px] w-[16px] fill-butter text-butter"
                      strokeWidth={1}
                    />
                  ))}
                </div>
                <blockquote className="mt-[18px] flex-1 font-display text-[21px] font-medium leading-[1.35] text-foreground">
                  &ldquo;{review.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-[22px] flex items-center justify-between border-t border-border pt-[18px]">
                  <span>
                    <span className="block text-[14px] font-semibold text-foreground">
                      {review.author}
                    </span>
                    <span className="block text-[12px] text-muted-foreground">
                      {review.location}
                    </span>
                  </span>
                  <span className="rounded-full border border-border px-[12px] py-[6px] text-[11px] font-medium text-muted-foreground">
                    {review.source}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
