"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Menu as MenuIcon } from "lucide-react";
import { SiteContainer } from "@/components/shared/site-container";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export type SiteHeaderProps = {
  id: string;
  brandName: string;
  brandTagline?: string;
  brandHref: string;
  navigation: { label: string; href: string }[];
  action: { label: string; href: string };
};

export default function SiteHeaderView({
  id,
  brandName,
  brandTagline,
  brandHref,
  navigation,
  action,
}: SiteHeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      id={id}
      className={cn(
        "sticky top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-300",
        scrolled
          ? "border-border/80 bg-background/95 shadow-[0_16px_40px_-32px_rgba(20,69,61,0.7)] backdrop-blur"
          : "border-transparent bg-background",
      )}
    >
      <SiteContainer className="flex h-[72px] items-center justify-between gap-6 desktop:h-[84px]">
        <a href={brandHref} className="flex flex-col justify-center leading-none">
          <span className="font-heading text-[21px] font-semibold uppercase tracking-[0.26em] text-primary desktop:text-[23px]">
            {brandName}
          </span>
          {brandTagline ? (
            <span className="mt-[6px] hidden text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground tablet:block">
              {brandTagline}
            </span>
          ) : null}
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-9 desktop:flex">
          {navigation.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="relative text-sm font-medium text-foreground transition-colors duration-200 after:absolute after:-bottom-[6px] after:left-0 after:h-px after:w-0 after:bg-primary after:transition-all after:duration-300 hover:text-primary hover:after:w-full"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button
            asChild
            className="hidden h-11 rounded-full px-6 text-sm font-semibold tracking-wide shadow-[0_14px_30px_-18px_rgba(20,69,61,0.85)] tablet:inline-flex"
          >
            <a href={action.href}>
              {action.label}
              <ArrowRight aria-hidden="true" />
            </a>
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Open navigation"
                className="grid size-11 place-items-center rounded-full border border-border text-primary transition-colors hover:border-primary/40 hover:bg-secondary desktop:hidden"
              >
                <MenuIcon aria-hidden="true" className="size-5" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="flex w-[86%] max-w-[380px] flex-col gap-8 border-border px-7 py-9"
            >
              <SheetTitle className="sr-only">{brandName}</SheetTitle>
              <p className="font-heading text-[20px] font-semibold uppercase tracking-[0.26em] text-primary">
                {brandName}
              </p>
              <nav aria-label="Mobile" className="flex flex-col">
                {navigation.map((item) => (
                  <SheetClose key={item.label} asChild>
                    <a
                      href={item.href}
                      className="border-b border-border/70 py-4 text-base font-medium text-foreground transition-colors hover:text-primary"
                    >
                      {item.label}
                    </a>
                  </SheetClose>
                ))}
              </nav>
              <SheetClose asChild>
                <a
                  href={action.href}
                  className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary text-sm font-semibold tracking-wide text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  {action.label}
                  <ArrowRight aria-hidden="true" className="size-4" />
                </a>
              </SheetClose>
            </SheetContent>
          </Sheet>
        </div>
      </SiteContainer>
    </header>
  );
}
