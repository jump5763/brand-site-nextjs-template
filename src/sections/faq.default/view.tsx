import React from "react";
import Link from "next/link";

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  dateCreated?: string;
};
export type FaqContent = {
  title: string;
  description: string;
  items: FaqItem[];
  defaultExpandedIds?: string[];
  action?: { label: string; href?: string; target?: { href?: string } };
};

export function FaqView({ content }: { content: FaqContent }) {
  const href = content.action?.href ?? content.action?.target?.href ?? "#";
  return (
    <section data-section="faq.default" className="container-site py-16">
      <div className="max-w-3xl">
        <h2 className="t-h2">{content.title}</h2>
        <p className="mt-3 text-muted-foreground">{content.description}</p>
      </div>
      <div className="mt-8 divide-y divide-border rounded-2xl border border-border bg-card">
        {content.items.map((item) => (
          <details
            key={item.id}
            open={content.defaultExpandedIds?.includes(item.id)}
            className="group p-5"
          >
            <summary className="cursor-pointer font-semibold">
              {item.question}
            </summary>
            <p className="mt-3 text-muted-foreground">{item.answer}</p>
          </details>
        ))}
      </div>
      {content.action ? (
        <Link
          href={href}
          className="mt-6 inline-flex rounded-full bg-primary px-5 py-3 font-semibold text-primary-foreground"
        >
          {content.action.label}
        </Link>
      ) : null}
    </section>
  );
}

export default FaqView;
