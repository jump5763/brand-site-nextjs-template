// Kept free of client components: this route is prerendered on its own.
export default function NotFound() {
  return (
    <section className="grid min-h-[70vh] place-items-center px-[16px] py-24 tablet:px-[40px]">
      <div className="w-full max-w-[640px] text-center">
        <p className="font-heading text-[16px] font-semibold uppercase tracking-[0.28em] text-primary">
          Verdant
        </p>
        <h1 className="mt-8 text-[40px] font-semibold leading-[1.15] text-primary tablet:text-[56px]">
          Page not found
        </h1>
        <p className="mt-5 text-base leading-relaxed text-muted-foreground">
          That page has left the menu. Head back to the kitchen and start from a
          fresh bowl.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="/"
            className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-7 text-sm font-semibold tracking-wide text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Back home
          </a>
          <a
            href="/menu"
            className="inline-flex h-12 items-center justify-center rounded-full border border-primary/30 px-7 text-sm font-semibold tracking-wide text-primary transition-colors hover:bg-secondary"
          >
            View the menu
          </a>
        </div>
      </div>
    </section>
  );
}
