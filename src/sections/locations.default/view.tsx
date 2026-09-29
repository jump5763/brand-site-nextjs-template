"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/shared/section";
import { SectionHeader } from "@/components/shared/section-header";
import { GoogleMap } from "@/components/ui/google-map";
import { Body } from "@/components/ui/typography/Body";
import { cn } from "@/lib/utils";

export type LocationsDefaultProps = {
  id: string;
  eyebrow?: string;
  title: string;
  description?: string;
  mapNote?: string;
  stores: {
    name: string;
    address: string;
    phone?: string;
    hours: { label: string; value: string }[];
    mapQuery: string;
    mapZoom?: number;
    directions?: { label: string; href: string };
  }[];
};

// Client island: choosing a store card points the embedded map at that store.
// The card keeps its heading and details as real content; a stretched button
// owns the selection so no control wraps other interactive elements.
export default function LocationsDefaultView({
  id,
  eyebrow,
  title,
  description,
  mapNote,
  stores,
}: LocationsDefaultProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const safeIndex =
    activeIndex >= 0 && activeIndex < stores.length ? activeIndex : 0;
  const activeStore = stores[safeIndex];

  return (
    <Section
      id={id}
      aria-labelledby={`${id}-heading`}
      spacing="spacious"
      className="scroll-mt-[88px]"
    >
      <SectionHeader
        eyebrow={eyebrow}
        title={title}
        description={description}
        headingId={`${id}-heading`}
        headingLevel={2}
      />

      <div className="mt-12 grid gap-10 desktop:grid-cols-[minmax(320px,420px)_1fr] desktop:gap-12">
        <ul className="flex flex-col gap-4">
          {stores.map((store, index) => {
            const active = index === safeIndex;
            const headingId = `${id}-store-${index}`;
            return (
              <li
                key={store.name}
                className={cn(
                  "relative rounded-[24px] border p-6 transition-colors",
                  active
                    ? "border-primary/40 bg-card shadow-[0_24px_60px_-46px_rgba(20,69,61,0.7)]"
                    : "border-border/70 bg-card/60 hover:border-primary/25",
                )}
              >
                <button
                  type="button"
                  aria-pressed={active}
                  aria-labelledby={headingId}
                  onClick={() => setActiveIndex(index)}
                  className="absolute inset-0 rounded-[24px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
                <h3
                  id={headingId}
                  className="text-[18px] font-semibold text-primary"
                >
                  {store.name}
                </h3>
                <Body size="sm" className="mt-2 text-muted-foreground">
                  {store.address}
                </Body>
                {store.phone ? (
                  <p className="mt-1 text-sm text-muted-foreground">
                    {store.phone}
                  </p>
                ) : null}
                <div className="mt-4 space-y-1">
                  {store.hours.map((entry) => (
                    <div
                      key={entry.label}
                      className="flex items-baseline justify-between gap-4 text-sm"
                    >
                      <span className="text-muted-foreground">
                        {entry.label}
                      </span>
                      <span className="text-foreground">{entry.value}</span>
                    </div>
                  ))}
                </div>
                {store.directions ? (
                  <a
                    href={store.directions.href}
                    className="relative mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary underline-offset-4 hover:underline"
                  >
                    {store.directions.label}
                    <ArrowUpRight aria-hidden="true" className="size-4" />
                  </a>
                ) : null}
              </li>
            );
          })}
        </ul>

        <div>
          <div className="relative min-h-[380px] overflow-hidden rounded-[28px] border border-border/60 bg-secondary shadow-[0_36px_80px_-52px_rgba(20,69,61,0.8)] desktop:min-h-[520px]">
            <GoogleMap
              mode="place"
              query={activeStore.mapQuery}
              zoom={activeStore.mapZoom ?? 14}
              title={activeStore.name}
              className="absolute inset-0"
            />
          </div>
          {mapNote ? (
            <Body size="sm" className="mt-4 text-muted-foreground">
              {mapNote}
            </Body>
          ) : null}
        </div>
      </div>
    </Section>
  );
}
