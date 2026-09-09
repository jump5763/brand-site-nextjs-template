import type { LocationsMapListSection } from "@/site-schema/generated/types";
import type { ResolvedAction } from "@/site-schema/runtime/resolve-link";
import Link from "next/link";
import { ArrowUpRight, MapPin, Phone } from "lucide-react";
import { Section, Eyebrow } from "@/components/shared/section";
import { Reveal } from "@/components/shared/reveal";
import { ctaClass } from "@/components/shared/cta";

export type LocationsProps = Omit<
  LocationsMapListSection["content"],
  "action"
> & { action: ResolvedAction };

export default function LocationsMapListView({
  id,
  locations,
  ...content
}: LocationsProps & { id: string }) {
  return (
    <Section id={id}>
      <Reveal className="max-w-[720px]">
        <Eyebrow>{content.eyebrow}</Eyebrow>
        <h2 className="t-h2 mt-[14px] text-balance">{content.title}</h2>
        <p className="mt-[16px] text-[15px] leading-[1.7] text-muted-foreground">
          {content.description}
        </p>
      </Reveal>

      <div className="mt-[44px] grid gap-[16px] tablet:grid-cols-2 desktop:grid-cols-3">
        {locations.map((location, index) => {
          const address = `${location.street}, ${location.city}`;
          return (
            <Reveal key={location.id} delay={index * 110} className="h-full">
              <article className="flex h-full flex-col rounded-[20px] border border-border bg-card p-[26px] transition-all duration-300 hover:-translate-y-[2px] hover:shadow-lift">
                <div className="flex items-start gap-[14px]">
                  <span className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full bg-sage-100">
                    <MapPin
                      className="h-[20px] w-[20px] text-sage-700"
                      strokeWidth={2}
                    />
                  </span>
                  <div>
                    <h3 className="text-[17px] font-semibold text-foreground">
                      {location.name}
                    </h3>
                    <p className="mt-[3px] text-[13px] leading-[1.6] text-muted-foreground">
                      {location.street}
                      <br />
                      {location.city}
                    </p>
                  </div>
                </div>

                <dl className="mt-[22px] space-y-[8px] border-t border-border pt-[18px]">
                  {location.hours.map((row) => (
                    <div
                      key={row.day}
                      className="flex items-baseline justify-between gap-[12px] text-[13px]"
                    >
                      <dt className="text-muted-foreground">{row.day}</dt>
                      <dd className="font-medium text-foreground">
                        {row.time}
                      </dd>
                    </div>
                  ))}
                </dl>

                <a
                  href={location.phoneHref}
                  className="mt-[18px] inline-flex items-center gap-[8px] text-[13px] font-semibold text-foreground"
                >
                  <Phone
                    className="h-[14px] w-[14px] text-sage-600"
                    strokeWidth={2}
                  />
                  {location.phone}
                </a>

                <div className="mt-[24px] flex flex-wrap gap-[10px] pt-[2px]">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      address,
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-[8px] rounded-full border border-border px-[16px] py-[10px] text-[13px] font-semibold text-foreground transition-colors hover:border-sage-400 hover:bg-sage-50"
                  >
                    {content.directionsLabel}
                    <ArrowUpRight
                      className="h-[14px] w-[14px]"
                      strokeWidth={2.2}
                    />
                  </a>
                  <Link
                    href={content.action.href}
                    className={ctaClass("primary", "sm", "shadow-none")}
                  >
                    {content.action.label}
                  </Link>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
