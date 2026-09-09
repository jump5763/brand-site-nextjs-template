"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import { ArrowLeft, ArrowRight, Pause, Play, Sprout } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

const AUTOPLAY_MS = 5600;

/* Section-owned example: Embla supplies the clock; this component owns
   playback intent, environmental pauses, snap pagination, and presentation. */
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
  const [selection, setSelection] = useState({ index: 0, count: 0 });
  const [motionOk, setMotionOk] = useState(false);
  const [rotationEnabled, setRotationEnabled] = useState(false);
  const [autoplay] = useState(() =>
    Autoplay({
      delay: AUTOPLAY_MS,
      playOnInit: false,
      stopOnInteraction: true,
      stopOnFocusIn: false,
      stopOnMouseEnter: false,
    }),
  );
  const rootRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement | null>(null);
  const pointerIntent = useRef(false);
  const playback = useRef<{
    setEnabled: (enabled: boolean) => void;
    syncProgress: () => void;
  } | null>(null);
  const setProgressRef = useCallback((node: HTMLSpanElement | null) => {
    progressRef.current = node;
    playback.current?.syncProgress();
  }, []);
  const { index, count } = selection;

  useEffect(() => {
    const root = rootRef.current;
    if (!api || !root) return;
    const document = root.ownerDocument;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let live = true;
    let hovered = root.matches(":hover");
    let enabled = !media.matches && !root.contains(document.activeElement);
    let progress: Animation | undefined;

    const syncProgress = () => {
      progress?.cancel();
      progress = undefined;
      const node = progressRef.current;
      if (!node) return;
      const remaining = autoplay.timeUntilNext();
      node.style.transform = "scaleX(1)";
      if (remaining === null || remaining <= 0 || media.matches) return;
      progress = node.animate(
        [
          { transform: `scaleX(${Math.max(0, 1 - remaining / AUTOPLAY_MS)})` },
          { transform: "scaleX(1)" },
        ],
        { duration: remaining, fill: "forwards" },
      );
    };
    const reconcile = () => {
      if (!live) return;
      const shouldPlay =
        enabled &&
        !hovered &&
        !document.hidden &&
        !media.matches &&
        api.scrollSnapList().length > 1;
      if (shouldPlay) {
        if (!autoplay.isPlaying()) autoplay.play();
      } else {
        autoplay.stop();
      }
    };
    const setEnabled = (value: boolean) => {
      enabled = value && !media.matches;
      setRotationEnabled(enabled);
      reconcile();
    };
    const syncSelection = () => {
      const next = {
        index: api.selectedScrollSnap(),
        count: api.scrollSnapList().length,
      };
      setSelection((current) =>
        current.index === next.index && current.count === next.count
          ? current
          : next,
      );
    };
    const onReInit = () => {
      syncSelection();
      reconcile();
    };
    const onFocus = () => setEnabled(false);
    const onPointerDown = () => setEnabled(false);
    const onMouseEnter = () => {
      hovered = true;
      reconcile();
    };
    const onMouseLeave = () => {
      hovered = false;
      reconcile();
    };
    const onMotionChange = () => {
      setMotionOk(!media.matches);
      if (media.matches) setEnabled(false);
      else reconcile();
    };
    // The plugin also observes visibility. Reconcile after all handlers, even
    // when reInit changes listener order, so an old resume flag cannot win.
    const onVisibility = () => queueMicrotask(reconcile);

    playback.current = { setEnabled, syncProgress };
    api.on("select", syncSelection);
    api.on("reInit", onReInit);
    api.on("pointerDown", onPointerDown);
    api.on("autoplay:timerset", syncProgress);
    api.on("autoplay:timerstopped", syncProgress);
    root.addEventListener("focusin", onFocus);
    root.addEventListener("mouseenter", onMouseEnter);
    root.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("visibilitychange", onVisibility);
    media.addEventListener("change", onMotionChange);
    syncSelection();
    setMotionOk(!media.matches);
    setRotationEnabled(enabled);
    reconcile();

    return () => {
      live = false;
      playback.current = null;
      api.off("select", syncSelection);
      api.off("reInit", onReInit);
      api.off("pointerDown", onPointerDown);
      api.off("autoplay:timerset", syncProgress);
      api.off("autoplay:timerstopped", syncProgress);
      root.removeEventListener("focusin", onFocus);
      root.removeEventListener("mouseenter", onMouseEnter);
      root.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      media.removeEventListener("change", onMotionChange);
      autoplay.stop();
      progress?.cancel();
    };
  }, [api, autoplay]);

  return (
    <Carousel
      ref={rootRef}
      setApi={setApi}
      opts={{ loop: true }}
      plugins={[autoplay]}
      aria-label={label}
      className="relative h-full w-full overflow-hidden rounded-[24px] border border-border bg-sage-100 shadow-lift desktop:rounded-[28px]"
    >
      <button
        type="button"
        disabled={!api || count <= 1 || !motionOk}
        aria-label={
          rotationEnabled
            ? "Stop automatic slide rotation"
            : "Start automatic slide rotation"
        }
        title={
          rotationEnabled
            ? "Stop automatic slide rotation"
            : "Start automatic slide rotation"
        }
        onPointerDown={() => {
          pointerIntent.current = !rotationEnabled;
        }}
        onClick={(event) => {
          // Pointer intent precedes focus-in, which independently stops rotation.
          playback.current?.setEnabled(
            event.detail > 0 ? pointerIntent.current : !rotationEnabled,
          );
        }}
        className="absolute bottom-[58px] right-[14px] z-10 flex h-[36px] w-[36px] items-center justify-center rounded-full border border-border bg-card/95 text-foreground shadow-card backdrop-blur-[2px] transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-600 disabled:opacity-50 tablet:bottom-[62px] tablet:right-[18px]"
      >
        {rotationEnabled ? (
          <Pause aria-hidden="true" className="h-[16px] w-[16px]" />
        ) : (
          <Play aria-hidden="true" className="h-[16px] w-[16px]" />
        )}
      </button>
      <CarouselContent>
        {slides.map((slide, i) => (
          <CarouselItem
            key={slide.src}
            aria-label={`${i + 1} of ${slides.length}`}
          >
            <img
              src={slide.src}
              alt={slide.alt}
              loading={i === 0 ? "eager" : "lazy"}
              decoding="async"
              draggable={false}
              className={cn(
                "h-[420px] w-full object-cover tablet:h-[560px] desktop:h-[640px]",
                i === index && motionOk && rotationEnabled
                  ? "a-kenburns"
                  : undefined,
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
              {freshLabel} · {slides.length ? index + 1 : 0} of {slides.length}
            </span>
          </span>
        </div>

        <div className="pointer-events-auto absolute right-[14px] top-[14px] flex items-center gap-[4px] rounded-full border border-border bg-card/95 p-[4px] shadow-card backdrop-blur-[2px] tablet:right-[18px] tablet:top-[18px]">
          <button
            type="button"
            disabled={!api || count <= 1}
            onClick={() => {
              api?.scrollPrev(!motionOk);
              autoplay.reset();
            }}
            aria-label="Previous photo"
            className="flex h-[38px] w-[38px] items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-600"
          >
            <ArrowLeft className="h-[17px] w-[17px]" strokeWidth={2.2} />
          </button>
          <button
            type="button"
            disabled={!api || count <= 1}
            onClick={() => {
              api?.scrollNext(!motionOk);
              autoplay.reset();
            }}
            aria-label="Next photo"
            className="flex h-[38px] w-[38px] items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-600"
          >
            <ArrowRight className="h-[17px] w-[17px]" strokeWidth={2.2} />
          </button>
        </div>

        {/* Pagination follows snap points; only this Hero uses one image per snap.
            The plugin clock drives progress, including resets after reInit. */}
        <div className="pointer-events-auto absolute inset-x-0 bottom-[18px] flex items-center justify-center tablet:bottom-[22px]">
          <div className="flex w-[min(360px,84%)] items-center gap-[8px]">
            {Array.from({ length: count }, (_, i) => {
              const active = i === index;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    if (!active) {
                      api?.scrollTo(i, !motionOk);
                      autoplay.reset();
                    }
                  }}
                  aria-label={`Go to photo ${i + 1} of ${count}`}
                  aria-current={active ? "true" : undefined}
                  aria-disabled={active ? "true" : undefined}
                  className="flex h-[26px] min-w-0 flex-1 items-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-600"
                >
                  <span
                    className={cn(
                      "relative block h-[4px] w-full overflow-hidden rounded-full",
                      active ? "bg-white/40" : "bg-white/30 hover:bg-white/55",
                    )}
                  >
                    {active ? (
                      <span
                        key={`progress-${index}`}
                        ref={setProgressRef}
                        className="absolute inset-0 origin-left rounded-full bg-butter"
                      />
                    ) : null}
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
