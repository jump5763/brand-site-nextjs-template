import Link from "next/link";
import { ArrowUpRight, ArrowUp, Leaf, Mail, MapPin, Phone } from "lucide-react";
import { BrandMark } from "@/components/site/brand";
import { ctaClass } from "@/components/site/cta";

const exploreLinks = [
  { label: "Menu", href: "/menu" },
  { label: "Locations", href: "/#locations" },
  { label: "Our story", href: "/#about" },
  { label: "Contact", href: "/#contact" },
  { label: "Order online", href: "/menu" },
];

type FooterLocation = {
  id: string;
  name: string;
  street: string;
  city: string;
  hours: Array<{ time: string }>;
};
export function Footer({ locations }: { locations: FooterLocation[] }) {
  return (
    <footer
      id="contact"
      className="bg-background pb-[20px] pt-[16px] tablet:pb-[28px]"
    >
      <div className="container-site">
        <div className="overflow-hidden rounded-[28px] bg-inverse text-inverse-foreground">
          {/* Contact header strip */}
          <div className="grid gap-[36px] px-[20px] pb-[44px] pt-[52px] tablet:px-[44px] desktop:grid-cols-[1.4fr_1fr] desktop:gap-[80px] desktop:px-[64px]">
            <div>
              <p className="t-eyebrow text-sage-300">Store & order support</p>
              <h2 className="mt-[16px] max-w-[560px] font-display text-[36px] font-semibold leading-[1.12] text-white tablet:text-[44px]">
                Questions, custom orders or just a craving?
              </h2>
              <p className="mt-[16px] max-w-[520px] text-[15px] leading-[1.7] text-white/70">
                Call the closest keke or write to our kitchen team — we answer
                every message during store hours.
              </p>
            </div>
            <div className="flex flex-col justify-center gap-[14px]">
              <a
                href="tel:+14155550117"
                className="group inline-flex items-center gap-[14px] rounded-full border border-white/15 bg-white/0 px-[20px] py-[18px] transition-colors hover:bg-white/10"
              >
                <Phone
                  className="h-[18px] w-[18px] text-butter"
                  strokeWidth={2}
                />
                <span>
                  <span className="block text-[13px] text-white/60">
                    Call the store
                  </span>
                  <span className="block text-[16px] font-semibold text-white group-hover:underline">
                    (415) 555-0117
                  </span>
                </span>
              </a>
              <a
                href="mailto:hello@kekesalads.com"
                className="group inline-flex items-center gap-[14px] rounded-full border border-white/15 bg-white/0 px-[20px] py-[18px] transition-colors hover:bg-white/10"
              >
                <Mail
                  className="h-[18px] w-[18px] text-butter"
                  strokeWidth={2}
                />
                <span>
                  <span className="block text-[13px] text-white/60">
                    Email the kitchen
                  </span>
                  <span className="block text-[16px] font-semibold text-white group-hover:underline">
                    hello@kekesalads.com
                  </span>
                </span>
              </a>
            </div>
          </div>

          <div className="h-px bg-white/10" />

          {/* Main columns */}
          <div className="grid grid-cols-1 gap-[40px] px-[20px] py-[52px] tablet:grid-cols-2 tablet:px-[44px] desktop:grid-cols-[1.3fr_0.8fr_1.2fr_1fr] desktop:gap-[48px] desktop:px-[64px]">
            <div>
              <div className="flex items-center gap-[12px]">
                <BrandMark className="bg-butter" />
                <span className="font-display text-[36px] font-semibold leading-none tracking-[-0.5px] text-white">
                  keke
                </span>
              </div>
              <p className="mt-[22px] max-w-[300px] text-[15px] leading-[1.7] text-white/65">
                Seasonal salads & warm grain bowls from nearby farms — made to
                order, never made in advance.
              </p>
              <ul className="mt-[24px] flex flex-wrap gap-[8px]">
                {["Plant-forward", "Vegan-friendly", "Gluten-free options"].map(
                  (item) => (
                    <li
                      key={item}
                      className="inline-flex items-center gap-[6px] rounded-full border border-white/15 px-[12px] py-[6px] text-[12px] text-white/75"
                    >
                      <Leaf
                        className="h-[12px] w-[12px] text-sage-300"
                        strokeWidth={2}
                      />
                      {item}
                    </li>
                  ),
                )}
              </ul>
            </div>

            <nav aria-label="Footer navigation">
              <p className="t-eyebrow text-white/50">Explore</p>
              <ul className="mt-[20px] space-y-[12px]">
                {exploreLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="inline-flex items-center gap-[6px] text-[15px] text-white/80 transition-colors hover:text-butter"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <p className="t-eyebrow text-white/50">Stores & hours</p>
              <ul className="mt-[20px] space-y-[20px]">
                {locations.map((location) => (
                  <li key={location.id} className="flex items-start gap-[10px]">
                    <MapPin
                      className="mt-[3px] h-[16px] w-[16px] shrink-0 text-sage-300"
                      strokeWidth={2}
                    />
                    <div className="text-[14px] leading-[1.6]">
                      <p className="font-semibold text-white">
                        {location.name}
                      </p>
                      <p className="text-white/60">
                        {location.street}, {location.city}
                      </p>
                      <p className="mt-[2px] text-white/45">
                        Open daily · {location.hours[0].time}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="t-eyebrow text-white/50">Contact</p>
              <ul className="mt-[20px] space-y-[14px] text-[14px] text-white/70">
                <li>
                  <a
                    href="mailto:hello@kekesalads.com"
                    className="underline decoration-sage-400/60 underline-offset-4 hover:decoration-sage-300 hover:text-white"
                  >
                    hello@kekesalads.com
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+14155550117"
                    className="underline decoration-sage-400/60 underline-offset-4 hover:decoration-sage-300 hover:text-white"
                  >
                    (415) 555-0117
                  </a>
                </li>
                <li className="pt-[4px] text-white/50">
                  Press & partnerships
                  <br />
                  press@kekesalads.com
                </li>
              </ul>
            </div>
          </div>

          <div className="h-px bg-white/10" />

          {/* Legal row */}
          <div className="flex flex-col gap-[16px] px-[20px] py-[26px] tablet:flex-row tablet:items-center tablet:justify-between tablet:px-[44px] desktop:px-[64px]">
            <p className="text-[13px] text-white/50">
              © {new Date().getFullYear()} keke, Inc. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center gap-[20px] text-[13px] text-white/50">
              <span>Real food, made simple.</span>
              <a
                href="#top"
                className="inline-flex items-center gap-[6px] rounded-full border border-white/15 px-[16px] py-[8px] transition-colors hover:border-white/40 hover:text-white"
              >
                Back to top
                <ArrowUp className="h-[13px] w-[13px]" strokeWidth={2.2} />
              </a>
              <Link
                href="/menu"
                className={ctaClass(
                  "primary",
                  "sm",
                  "h-[40px] px-[18px] text-[13px]",
                )}
              >
                Order online
                <ArrowUpRight className="h-[14px] w-[14px]" strokeWidth={2.2} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
