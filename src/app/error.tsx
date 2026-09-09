"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Leaf } from "lucide-react";
import { ctaClass } from "@/components/site/cta";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="flex min-h-[62vh] items-center pt-[40px]">
      <div className="container-site">
        <div className="mx-auto max-w-[560px] text-center">
          <span className="mx-auto flex h-[64px] w-[64px] items-center justify-center rounded-full bg-butter">
            <Leaf
              className="h-[28px] w-[28px] text-[#241a06]"
              strokeWidth={2.2}
            />
          </span>
          <h1 className="mt-[28px] text-[24px] font-semibold text-foreground">
            Something went wrong in the kitchen.
          </h1>
          <p className="mx-auto mt-[14px] max-w-[420px] text-[15px] leading-[1.7] text-muted-foreground">
            Our chefs are on it. Give the page another try — or explore the menu
            while we fix things.
          </p>
          <div className="mt-[32px] flex flex-wrap items-center justify-center gap-[12px]">
            <button
              type="button"
              onClick={reset}
              className={ctaClass("outline", "md")}
            >
              Try again
            </button>
            <Link href="/menu" className={ctaClass("primary", "md")}>
              Browse the menu
              <ArrowRight className="h-[16px] w-[16px]" strokeWidth={2.2} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
