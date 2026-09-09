"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Sprout } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

const AUTOPLAY_MS = 5600;

/* The ui/carousel primitive handles the slide engine (drag, snap, keyboard),
   loop behaviour and ARIA. Autoplay, progress dots and the caption overlay
   are composed here through the exposed CarouselApi. */
export function HeroCarousel({
  slides,
  label,
  caption,
  freshLabel,
}: {
  slides: Array<{ src: string; alt: string }>;
  label: string;
  caption: string;
  freshLabel: string;
}) {
  const [api, setApi] = useState<CarouselApi>();
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [tabHidden, setTabHidden] = useState(false);
  const [motionOk, setMotionOk] = useState(true);
  /* Increments every time a fresh autoplay cycle starts, so the progress
     line restarts its fill in sync with the interval. */
  const [cycle, setCycle] = useState(0);

  /* Keep the caption counter and dots in sync with the selected slide. */
  useEffect(() => {
    if (!api) return;
    const onSelect = () => setIndex(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  /* Respect prefers-reduced-motion: no autoplay, no slow zoom. */
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setMotionOk(!mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  /* Pause autoplay while the tab is hidden. */
  useEffect(() => {
    const onVisibility = () => setTabHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const paused = hovered || tabHidden;

  /* Autoplay — restarts whenever the active slide changes so that manual
     navigation always yields a full pause before the next auto step. */
  useEffect(() => {
    if (!api || paused || !motionOk) return;
    const id = window.setInterval(() => api.scrollNext(), AUTOPLAY_MS);
    setCycle((c) => c + 1);
    return () => window.clearInterval(id);
  }, [api, paused, motionOk, index]);

  return (
    <Carousel
      setApi={setApi}
      opts={{ loop: true }}
      aria-label={label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setHovered(true)}
      onBlurCapture={() => setHovered(false)}
      className="relative h-full w-full overflow-hidden rounded-[24px] border border-border bg-sage-100 shadow-lift desktop:rounded-[28px]"
    >
      <CarouselContent className="ml-0">
        {slides.map((slide, i) => (
          <CarouselItem key={slide.src} className="pl-0">
            <img
              src={slide.src}
              alt={slide.alt}
              loading={i === 0 ? "eager" : "lazy"}
              decoding="async"
              draggable={false}
              className={cn(
                "h-[420px] w-full object-cover tablet:h-[560px] desktop:h-[640px]",
                i === index && motionOk && "a-kenburns",
              )}
            />
          </CarouselItem>
        ))}
      </CarouselContent>

      {/* Overlay: caption chip (top-left), arrows (top-right),
          progress-line pagination (bottom-center) */}
      <div className="pointer-events-none absolute inset-0 p-[14px] tablet:p-[18px]">
        <div className="pointer-events-auto absolute left-[14px] top-[14px] flex items-center gap-[12px] rounded-full border border-border bg-card/95 py-[10px] pl-[12px] pr-[18px] shadow-card backdrop-blur-[2px] tablet:left-[18px] tablet:top-[18px]">
          <span className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-sage-100">
            <Sprout
              className="h-[16px] w-[16px] text-sage-700"
              strokeWidth={2.2}
            />
          </span>
          <span>
            <span className="block text-[13px] font-semibold text-foreground">
              {caption}
            </span>
            <span className="block text-[12px] text-muted-foreground">
              {freshLabel} · {index + 1} of {slides.length}
            </span>
          </span>
        </div>

        <div className="pointer-events-auto absolute right-[14px] top-[14px] flex items-center gap-[4px] rounded-full border border-border bg-card/95 p-[4px] shadow-card backdrop-blur-[2px] tablet:right-[18px] tablet:top-[18px]">
          <button
            type="button"
            onClick={() => api?.scrollPrev()}
            aria-label="Previous photo"
            className="flex h-[38px] w-[38px] items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-600"
          >
            <ArrowLeft className="h-[17px] w-[17px]" strokeWidth={2.2} />
          </button>
          <button
            type="button"
            onClick={() => api?.scrollNext()}
            aria-label="Next photo"
            className="flex h-[38px] w-[38px] items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-600"
          >
            <ArrowRight className="h-[17px] w-[17px]" strokeWidth={2.2} />
          </button>
        </div>

        {/* Progress lines — each segment mirrors one slide; the active one
            fills over the autoplay dwell and stays paused while hovered.
            Clicking a segment jumps straight to that slide. */}
        <div className="pointer-events-auto absolute inset-x-0 bottom-[18px] flex items-center justify-center tablet:bottom-[22px]">
          <div className="flex w-[min(360px,84%)] items-center gap-[8px]">
            {slides.map((slide, i) => {
              const active = i === index;
              return (
                <button
                  key={slide.src}
                  type="button"
                  onClick={() => api?.scrollTo(i)}
                  aria-label={`Go to photo ${i + 1} of ${slides.length}`}
                  aria-current={active ? "true" : undefined}
                  className="flex h-[26px] min-w-0 flex-1 items-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-600"
                >
                  <span
                    className={cn(
                      "relative block h-[4px] w-full overflow-hidden rounded-full",
                      active ? "bg-white/40" : "bg-white/30 hover:bg-white/55",
                    )}
                  >
                    {active && motionOk && (
                      <span
                        key={`progress-${index}-${cycle}`}
                        className="absolute inset-0 origin-left rounded-full bg-butter"
                        style={{
                          animation: `progress-fill ${AUTOPLAY_MS}ms linear both`,
                          animationPlayState: paused ? "paused" : "running",
                        }}
                      />
                    )}
                    {active && !motionOk && (
                      <span className="absolute inset-0 rounded-full bg-butter" />
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </Carousel>
  );
}
