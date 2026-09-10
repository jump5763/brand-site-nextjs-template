import { Facebook, Instagram, Youtube, type LucideIcon } from "lucide-react";
import { SiteContainer } from "@/components/shared/site-container";

export type SiteFooterProps = {
  id: string;
  brandName: string;
  tagline: string;
  social?: { label: string; href: string; icon: "instagram" | "facebook" | "youtube" }[];
  explore: { title: string; links: { label: string; href: string }[] };
  hours: { title: string; entries: { label: string; value: string }[] };
  visit: {
    title: string;
    email: string;
    stores: { name: string; address: string; phone?: string }[];
  };
  backToTop?: { label: string; href: string };
  legalNote: string;
};

const socialIcons: Record<"instagram" | "facebook" | "youtube", LucideIcon> = {
  instagram: Instagram,
  facebook: Facebook,
  youtube: Youtube,
};

const columnHeadingClass =
  "text-[12px] font-semibold uppercase tracking-[0.2em] text-primary-foreground/60";

export default function SiteFooterView({
  id,
  brandName,
  tagline,
  social,
  explore,
  hours,
  visit,
  backToTop,
  legalNote,
}: SiteFooterProps) {
  return (
    <footer
      id={id}
      className="scroll-mt-[88px] bg-primary text-primary-foreground"
    >
      <SiteContainer className="py-16 tablet:py-20 desktop:py-24">
        <div className="grid gap-12 desktop:grid-cols-[1.5fr_1fr_1fr_1.2fr] desktop:gap-10">
          <div className="animate-fade-in motion-reduce:animate-none">
            <p className="font-heading text-[24px] font-semibold uppercase tracking-[0.28em]">
              {brandName}
            </p>
            <p className="mt-4 max-w-[34ch] text-sm leading-relaxed text-primary-foreground/75">
              {tagline}
            </p>
            {social && social.length > 0 ? (
              <ul className="mt-7 flex items-center gap-3">
                {social.map((item) => {
                  const Icon = socialIcons[item.icon];
                  return (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        aria-label={item.label}
                        className="grid size-11 place-items-center rounded-full border border-primary-foreground/25 text-primary-foreground/85 transition-colors duration-200 hover:bg-primary-foreground/10 hover:text-primary-foreground"
                      >
                        <Icon aria-hidden="true" className="size-4" />
                      </a>
                    </li>
                  );
                })}
              </ul>
            ) : null}
          </div>

          <div>
            <h2 className={columnHeadingClass}>{explore.title}</h2>
            <ul className="mt-6 space-y-3">
              {explore.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-primary-foreground/80 underline-offset-4 transition-colors duration-200 hover:text-primary-foreground hover:underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className={columnHeadingClass}>{hours.title}</h2>
            <dl className="mt-6 space-y-3">
              {hours.entries.map((entry) => (
                <div key={entry.label}>
                  <dt className="text-[13px] font-medium text-primary-foreground/60">
                    {entry.label}
                  </dt>
                  <dd className="mt-1 text-sm text-primary-foreground/90">
                    {entry.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <h2 className={columnHeadingClass}>{visit.title}</h2>
            <ul className="mt-6 space-y-6">
              {visit.stores.map((store) => (
                <li key={store.name}>
                  <h3 className="text-sm font-semibold tracking-wide">
                    {store.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-primary-foreground/75">
                    {store.address}
                  </p>
                  {store.phone ? (
                    <p className="mt-1 text-sm text-primary-foreground/75">
                      {store.phone}
                    </p>
                  ) : null}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-primary-foreground/75">
              {visit.email}
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-primary-foreground/15 pt-6 text-xs text-primary-foreground/60 tablet:flex-row tablet:items-center tablet:justify-between">
          <p>{legalNote}</p>
          {backToTop ? (
            <a
              href={backToTop.href}
              className="font-semibold uppercase tracking-[0.18em] underline-offset-4 transition-colors duration-200 hover:text-primary-foreground hover:underline"
            >
              {backToTop.label}
            </a>
          ) : null}
        </div>
      </SiteContainer>
    </footer>
  );
}
