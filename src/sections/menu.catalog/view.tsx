"use client";

import { useMemo, useState } from "react";

export interface MenuProduct {
  id: string;
  title: string;
  description: string;
  amount: number | string;
  media?: string;
  alt?: string;
  orderURL?: string;
}

export interface MenuCategory {
  id: string;
  label: string;
  products: readonly MenuProduct[];
}

export interface MenuCatalogViewModel {
  hero: {
    title: string;
    description: string;
    action?: { label: string; href: string };
  };
  categories: readonly MenuCategory[];
  currency?: string;
}

export function MenuCatalogView({ hero, categories }: MenuCatalogViewModel) {
  const [activeCategory, setActiveCategory] = useState("all");
  const products = useMemo(() => {
    if (activeCategory === "all")
      return categories.flatMap((category) => category.products);
    return (
      categories.find((category) => category.id === activeCategory)?.products ??
      []
    );
  }, [activeCategory, categories]);

  return (
    <section
      className="container-site py-16"
      aria-labelledby="menu-catalog-title"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 id="menu-catalog-title" className="t-h1">
            {hero.title}
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            {hero.description}
          </p>
        </div>
        {hero.action ? (
          <a className="font-semibold underline" href={hero.action.href}>
            {hero.action.label}
          </a>
        ) : null}
      </div>
      <div
        className="mt-8 flex flex-wrap gap-2"
        role="tablist"
        aria-label="Menu categories"
      >
        <button
          type="button"
          role="tab"
          aria-selected={activeCategory === "all"}
          onClick={() => setActiveCategory("all")}
          className="rounded-full border px-4 py-2"
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            role="tab"
            aria-selected={activeCategory === category.id}
            onClick={() => setActiveCategory(category.id)}
            className="rounded-full border px-4 py-2"
          >
            {category.label}
          </button>
        ))}
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {products.map((product) => (
          <article
            key={product.id}
            className="overflow-hidden rounded-2xl border border-border bg-card"
          >
            {product.media ? (
              <img
                src={product.media}
                alt={product.alt ?? ""}
                className="aspect-[4/3] w-full object-cover"
              />
            ) : null}
            <div className="p-5">
              <div className="flex justify-between gap-3">
                <h2 className="font-semibold">{product.title}</h2>
                <span>
                  {typeof product.amount === "number"
                    ? `$${(product.amount / 100).toFixed(2)}`
                    : product.amount}
                </span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                {product.description}
              </p>
              <button
                type="button"
                className="mt-4 rounded-full border px-4 py-2 text-sm"
              >
                Add to order
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
