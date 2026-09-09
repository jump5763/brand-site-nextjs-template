import React from "react";
import Link from "next/link";

export type CtaStoryLinksContent = {
  title: string;
  description: string;
  actions: Array<{ label: string; href: string }>;
};

export default function CtaStoryLinksView({
  content,
}: {
  content: CtaStoryLinksContent;
}) {
  return (
    <section data-section="cta.story-links" className="container-site py-16">
      <div className="rounded-[24px] bg-inverse p-8 text-inverse-foreground tablet:p-12">
        <h2 className="t-h2">{content.title}</h2>
        <p className="mt-4 max-w-2xl text-inverse-foreground/75">
          {content.description}
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          {content.actions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="rounded-full bg-butter px-5 py-3 font-semibold text-[#241a06]"
            >
              {action.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
