import { Leaf } from "lucide-react";

export type MarqueeProps = {
  id: string;
  items: string[];
};

// Decorative scrolling band; the second copy stays hidden from assistive tech.
export default function MarqueeView({ id, items }: MarqueeProps) {
  return (
    <section id={id} className="overflow-hidden bg-primary py-5 text-primary-foreground">
      <div className="flex w-max animate-marquee [animation-duration:44s] hover:[animation-play-state:paused] motion-reduce:animate-none">
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            aria-hidden={copy === 1 ? true : undefined}
            className="flex shrink-0 items-center"
          >
            {items.map((item) => (
              <li
                key={item}
                className="flex items-center gap-6 px-6 text-[12px] font-semibold uppercase tracking-[0.24em] text-primary-foreground/95"
              >
                <Leaf aria-hidden="true" className="size-4 shrink-0 text-primary-foreground/60" />
                <span className="whitespace-nowrap">{item}</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}
