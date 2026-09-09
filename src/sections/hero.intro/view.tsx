import React from "react";
import type { HeroDefaultImage } from "../hero.default/view";

export type HeroIntroMedia =
  | HeroDefaultImage
  | { kind: "google-map"; placeId: string; accessibleTitle: string };
export type HeroIntroContent = {
  title: string;
  description: string;
  media: HeroIntroMedia;
};

export default function HeroIntroView({
  content,
}: {
  content: HeroIntroContent;
}) {
  return (
    <section data-section="hero.intro" className="container-site py-16">
      <div className="grid items-center gap-10 desktop:grid-cols-2">
        <div>
          <h1 className="t-display">{content.title}</h1>
          <p className="t-lead mt-5 text-muted-foreground">
            {content.description}
          </p>
        </div>
        {content.media.kind === "image" ? (
          <img
            src={content.media.path}
            alt={content.media.alt}
            width={content.media.width}
            height={content.media.height}
            className="w-full rounded-[20px] object-cover"
          />
        ) : (
          <div
            role="img"
            aria-label={content.media.accessibleTitle}
            data-place-id={content.media.placeId}
            className="flex min-h-72 items-center justify-center rounded-[20px] bg-muted text-muted-foreground"
          >
            Map: {content.media.accessibleTitle}
          </div>
        )}
      </div>
    </section>
  );
}
