import Link from "next/link";
import { ArrowRight, Leaf } from "lucide-react";
import { ctaClass } from "@/components/shared/cta";

export default function NotFound() {
  return (
    <section className="flex min-h-[62vh] items-center pt-[40px]">
      <div className="container-site">
        <div className="mx-auto max-w-[620px] text-center">
          <span className="mx-auto flex h-[64px] w-[64px] items-center justify-center rounded-full bg-butter">
            <Leaf
              className="h-[28px] w-[28px] text-[#241a06]"
              strokeWidth={2.2}
            />
          </span>
          <p className="mt-[28px] font-display text-[96px] font-semibold leading-none text-foreground">
            404
          </p>
          <h1 className="mt-[12px] text-[20px] font-semibold text-foreground">
            This page took the day off.
          </h1>
          <p className="mx-auto mt-[14px] max-w-[420px] text-[15px] leading-[1.7] text-muted-foreground">
            The page you&rsquo;re looking for isn&rsquo;t on the menu — but a
            great salad is. Head back home or straight to the menu.
          </p>
          <div className="mt-[32px] flex flex-wrap items-center justify-center gap-[12px]">
            <Link href="/" className={ctaClass("outline", "md")}>
              Back home
            </Link>
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
