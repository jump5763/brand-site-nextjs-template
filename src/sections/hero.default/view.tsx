import React from "react";
import Link from "next/link";

export type HeroDefaultImage = {
  kind: "image";
  path: string;
  alt: string;
  width: number;
  height: number;
};

export type HeroDefaultAction = {
  label: string;
  href?: string;
  target?: { kind: string; href?: string; pageId?: string; fragment?: string };
  newTab?: boolean;
};

export type HeroDefaultContent = {
  title: string;
  description: string;
  textColor?: string;
  media: HeroDefaultImage[];
  primaryAction?: HeroDefaultAction;
  secondaryAction?: HeroDefaultAction;
  tertiaryAction?: HeroDefaultAction;
};

function actionHref(action: HeroDefaultAction) {
  return action.href ?? action.target?.href ?? "#";
}

export default function HeroDefaultView({
  content,
}: {
  content: HeroDefaultContent;
}) {
  const image = content.media[0];
  const actions = [
    content.primaryAction,
    content.secondaryAction,
    content.tertiaryAction,
  ].filter((action): action is HeroDefaultAction => Boolean(action));

  return (
    <section
      data-section="hero.default"
      className="relative overflow-hidden rounded-[24px] bg-sage-100"
    >
      <div className="grid items-center gap-8 p-8 desktop:grid-cols-2 desktop:p-12">
        <div>
          <h1
            className="t-display"
            style={content.textColor ? { color: content.textColor } : undefined}
          >
            {content.title}
          </h1>
          <p className="t-lead mt-5 text-muted-foreground">
            {content.description}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            {actions.map((action) => (
              <Link
                key={action.label}
                href={actionHref(action)}
                target={action.newTab ? "_blank" : undefined}
                rel={action.newTab ? "noreferrer" : undefined}
                className="rounded-full bg-primary px-5 py-3 font-semibold text-primary-foreground"
              >
                {action.label}
              </Link>
            ))}
          </div>
        </div>
        <img
          src={image.path}
          alt={image.alt}
          width={image.width}
          height={image.height}
          className="h-full max-h-[640px] w-full rounded-[20px] object-cover"
        />
      </div>
    </section>
  );
}
