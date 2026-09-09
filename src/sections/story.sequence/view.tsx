import React from "react";
import type { HeroDefaultImage } from "../hero.default/view";

export type StorySequenceItem = {
  id: string;
  title: string;
  description: string;
  media: HeroDefaultImage;
};

export default function StorySequenceView({
  content,
}: {
  content: { items: StorySequenceItem[] };
}) {
  return (
    <section data-section="story.sequence" className="container-site py-16">
      <div className="grid gap-8 desktop:grid-cols-2">
        {content.items.map((item) => (
          <article
            key={item.id}
            className="grid gap-5 rounded-[20px] border border-border bg-card p-5 tablet:grid-cols-[160px_1fr] tablet:items-center"
          >
            <img
              src={item.media.path}
              alt={item.media.alt}
              width={item.media.width}
              height={item.media.height}
              className="aspect-square w-full rounded-[16px] object-cover"
            />
            <div>
              <h2 className="t-h3">{item.title}</h2>
              <p className="mt-3 text-muted-foreground">{item.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
