"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Clock, MapPin, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Brand } from "@/components/site/brand";
import { ctaClass } from "@/components/site/cta";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

import type { HeaderProps } from "@/site-schema/runtime/site-shell";
export function Header({
  navLinks,
  action,
  brandName,
  homeHref,
  locationsLabel,
  hoursLabel,
  email,
}: HeaderProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 14);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const height = scrolled ? "76px" : "96px";
    document.documentElement.style.setProperty("--header-h", height);
  }, [scrolled]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href;

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full bg-background transition-[padding] duration-300",
        scrolled
          ? "px-3 pb-[6px] pt-[8px] tablet:px-4"
          : "px-3 pb-[10px] pt-[14px] tablet:px-4",
      )}
    >
      <div
        className={cn(
          "relative mx-auto flex max-w-[1760px] items-center justify-between rounded-full border border-border bg-card transition-all duration-300",
          scrolled
            ? "h-[62px] shadow-pill"
            : "h-[72px] shadow-[0_1px_0_rgba(28,28,24,0.03)]",
          "pl-[16px] pr-[10px] tablet:pl-[22px]",
        )}
      >
        {/* Left zone — mobile menu / desktop nav */}
        <div className="flex items-center gap-[26px]">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                className="flex h-[44px] w-[44px] items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-muted desktop:hidden"
                aria-label="Open navigation menu"
              >
                <Menu className="h-[20px] w-[20px]" strokeWidth={2} />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full max-w-[420px] border-l border-border bg-card p-0"
            >
              <div className="flex h-full flex-col overflow-y-auto px-[24px] pb-[28px] pt-[28px]">
                <div className="flex items-center justify-between pr-[28px]">
                  <Brand name={brandName} href={homeHref} />
                </div>

                <nav
                  aria-label="Mobile navigation"
                  className="mt-[44px] flex flex-col"
                >
                  {navLinks.map((link) => (
                    <SheetClose key={link.href} asChild>
                      <Link
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "group flex items-center justify-between border-b border-border py-[20px] text-[15px] font-medium transition-colors hover:text-sage-700",
                          isActive(link.href)
                            ? "text-foreground"
                            : "text-foreground/80",
                        )}
                      >
                        {link.label}
                        <ArrowUpRight
                          className="h-[18px] w-[18px] text-muted-foreground transition-transform group-hover:-translate-y-[2px] group-hover:translate-x-[2px]"
                          strokeWidth={2}
                        />
                      </Link>
                    </SheetClose>
                  ))}
                </nav>

                <SheetClose asChild>
                  <Link
                    href={action.href}
                    className={ctaClass("primary", "lg", "mt-[36px] w-full")}
                  >
                    {action.label}
                    <ArrowUpRight
                      className="h-[18px] w-[18px]"
                      strokeWidth={2.2}
                    />
                  </Link>
                </SheetClose>

                <div className="mt-[36px] space-y-[16px] border-t border-border pt-[24px]">
                  <p className="flex items-center gap-[10px] text-[13px] text-muted-foreground">
                    <MapPin className="h-[16px] w-[16px] text-sage-600" />
                    {locationsLabel}
                  </p>
                  <p className="flex items-center gap-[10px] text-[13px] text-muted-foreground">
                    <Clock className="h-[16px] w-[16px] text-sage-600" />
                    {hoursLabel}
                  </p>
                  <p className="text-[13px] text-muted-foreground">
                    Contact{" "}
                    <a
                      href={`mailto:${email}`}
                      className="font-semibold text-foreground underline decoration-sage-300 underline-offset-4 hover:decoration-sage-500"
                    >
                      {email}
                    </a>
                  </p>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Desktop navigation */}
          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-[26px] desktop:flex"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={cn(
                  "relative py-[8px] text-[14px] font-medium transition-colors",
                  isActive(link.href)
                    ? "text-foreground"
                    : "text-foreground/75 hover:text-foreground",
                )}
              >
                {link.label}
                {isActive(link.href) && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-[2px] mx-auto h-[2px] w-[16px] rounded-full bg-butter"
                  />
                )}
              </Link>
            ))}
          </nav>
        </div>

        {/* Center — brand */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <span className="pointer-events-auto inline-block">
            <Brand name={brandName} href={homeHref} />
          </span>
        </div>

        {/* Right zone — order CTA */}
        <div className="flex items-center">
          <Link
            href={action.href}
            className={ctaClass(
              "primary",
              "sm",
              "h-[44px] px-[20px] text-[14px] desktop:h-[46px] desktop:px-[26px] desktop:text-[15px]",
            )}
          >
            {action.label}
            <ArrowUpRight
              className="hidden h-[16px] w-[16px] desktop:inline-block"
              strokeWidth={2.2}
            />
          </Link>
        </div>
      </div>
    </header>
  );
}
