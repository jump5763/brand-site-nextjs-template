"use client";

import { useEffect } from "react";

// Document-level fallback: it replaces the root layout, so it renders its own
// html/body and stays free of shared client components.
export default function GlobalError({
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
    <html lang="en">
      <body className="bg-background font-sans text-foreground antialiased">
        <section className="grid min-h-screen place-items-center px-[16px] text-center tablet:px-[40px]">
          <div className="max-w-[560px]">
            <p className="font-heading text-[16px] font-semibold uppercase tracking-[0.28em] text-primary">
              Verdant
            </p>
            <h1 className="mt-8 text-[36px] font-semibold leading-[1.2] text-primary tablet:text-[44px]">
              Something went wrong
            </h1>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              The page could not be rendered. Try again, or come back in a
              moment.
            </p>
            <button
              type="button"
              onClick={reset}
              className="mt-10 inline-flex h-12 items-center justify-center rounded-full bg-primary px-7 text-sm font-semibold tracking-wide text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Try again
            </button>
          </div>
        </section>
      </body>
    </html>
  );
}
