import React from "react";
import Link from "next/link";
import type { HeroDefaultImage } from "../hero.default/view";

export type StorySplitContent = {
  title: string;
  description: string;
  media: HeroDefaultImage;
  action?: {
    label: string;
    href?: string;
    target?: { href?: string; pageId?: string };
  };
};

export default function StorySplitView({
  content,
}: {
  content: StorySplitContent;
}) {
  const href = content.action?.href ?? content.action?.target?.href ?? "#";
  return (
    <section data-section="story.split" className="container-site py-16">
      <div className="grid items-center gap-10 desktop:grid-cols-2">
        <img
          src={content.media.path}
          alt={content.media.alt}
          width={content.media.width}
          height={content.media.height}
          className="w-full rounded-[20px] object-cover"
        />
        <div>
          <h2 className="t-h2">{content.title}</h2>
          <p className="mt-5 whitespace-pre-line text-muted-foreground">
            {content.description}
          </p>
          {content.action ? (
            <Link
              href={href}
              className="mt-7 inline-flex rounded-full bg-primary px-5 py-3 font-semibold text-primary-foreground"
            >
              {content.action.label}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
