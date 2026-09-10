"use client";

import { useState } from "react";
import { RotateCcw } from "lucide-react";
import { Section } from "@/components/shared/section";
import { SectionHeader } from "@/components/shared/section-header";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Body } from "@/components/ui/typography/Body";
import { cn } from "@/lib/utils";

export type MenuCatalogDefaultProps = {
  id: string;
  eyebrow?: string;
  title: string;
  description?: string;
  categories: { name: string; description?: string }[];
  items: {
    name: string;
    description: string;
    price: string;
    category: string;
    tags?: string[];
    metadata?: string;
    badge?: string;
    image: { src: string; alt: string };
  }[];
};

type Dish = MenuCatalogDefaultProps["items"][number];
type SortKey = "featured" | "price-asc" | "price-desc" | "name";

const sortOptions: { value: SortKey; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name", label: "Name A\u2013Z" },
];

const parsePrice = (price: string): number => {
  const value = Number.parseFloat(price.replace(/[^0-9.]/g, ""));
  return Number.isFinite(value) ? value : 0;
};

const sortDishes = (dishes: Dish[], sort: SortKey): Dish[] => {
  const next = [...dishes];
  switch (sort) {
    case "price-asc":
      return next.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    case "price-desc":
      return next.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
    case "name":
      return next.sort((a, b) => a.name.localeCompare(b.name, "en"));
    default:
      return next;
  }
};

const chipClass = (selected: boolean) =>
  cn(
    "rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition-colors",
    selected
      ? "bg-primary text-primary-foreground"
      : "border border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-primary",
  );

// Full menu catalog: h2 section heading, h3 per category panel, h4 dish names.
export default function MenuCatalogDefaultView({
  id,
  eyebrow,
  title,
  description,
  categories,
  items,
}: MenuCatalogDefaultProps) {
  const headingId = `${id}-heading`;
  const [activeCategory, setActiveCategory] = useState(
    categories[0]?.name ?? "",
  );
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [sort, setSort] = useState<SortKey>("featured");

  const allTags = Array.from(new Set(items.flatMap((item) => item.tags ?? [])));
  const hasActiveFilters = activeTags.length > 0 || sort !== "featured";

  const matchesActiveTags = (dish: Dish) =>
    activeTags.every((tag) => (dish.tags ?? []).includes(tag));

  const filterCategory = (categoryName: string): Dish[] =>
    items.filter(
      (dish) => dish.category === categoryName && matchesActiveTags(dish),
    );

  const toggleTag = (tag: string) =>
    setActiveTags((current) =>
      current.includes(tag)
        ? current.filter((value) => value !== tag)
        : [...current, tag],
    );

  const clearFilters = () => {
    setActiveTags([]);
    setSort("featured");
  };

  const activeDishes = filterCategory(activeCategory);

  return (
    <Section
      id={id}
      aria-labelledby={headingId}
      spacing="standard"
      className="scroll-mt-[88px]"
    >
      <SectionHeader
        eyebrow={eyebrow}
        title={title}
        description={description}
        headingId={headingId}
        headingLevel={2}
      />

      <Tabs
        value={activeCategory}
        onValueChange={setActiveCategory}
        className="mt-10"
      >
        <TabsList className="h-auto w-full justify-start gap-2 overflow-x-auto rounded-full border border-border bg-card p-2 desktop:justify-center">
          {categories.map((category) => (
            <TabsTrigger
              key={category.name}
              value={category.name}
              className="group rounded-full px-5 py-2.5 text-sm font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow"
            >
              {category.name}
              <span className="ml-2 text-xs font-semibold text-muted-foreground group-data-[state=active]:text-primary-foreground/80">
                {filterCategory(category.name).length}
              </span>
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          {allTags.map((tag) => (
            <button
              key={tag}
              type="button"
              aria-pressed={activeTags.includes(tag)}
              onClick={() => toggleTag(tag)}
              className={chipClass(activeTags.includes(tag))}
            >
              {tag}
            </button>
          ))}
          {hasActiveFilters ? (
            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex items-center gap-1 text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              Clear filters
              <RotateCcw aria-hidden="true" className="size-4" />
            </button>
          ) : null}
          <p className="ml-auto text-sm text-muted-foreground">
            {activeDishes.length} {activeDishes.length === 1 ? "dish" : "dishes"}
          </p>
          <Select
            value={sort}
            onValueChange={(value) => {
              const next = sortOptions.find((option) => option.value === value);
              if (next) setSort(next.value);
            }}
          >
            <SelectTrigger
              aria-label="Sort dishes"
              className="h-11 w-[210px] rounded-full border-border bg-card text-sm"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {categories.map((category, index) => {
          const dishes = sortDishes(filterCategory(category.name), sort);
          const categoryHeadingId = `${id}-category-${index}`;
          return (
            <TabsContent
              key={category.name}
              value={category.name}
              className="mt-10 focus-visible:outline-none"
            >
              <h3
                id={categoryHeadingId}
                className="text-[22px] font-semibold text-primary"
              >
                {category.name}
              </h3>
              {category.description ? (
                <Body
                  size="sm"
                  className="mt-3 max-w-[60ch] text-muted-foreground"
                >
                  {category.description}
                </Body>
              ) : null}

              {dishes.length > 0 ? (
                <div className="mt-8 grid gap-6 tablet:grid-cols-2 desktop:grid-cols-3">
                  {dishes.map((dish) => (
                    <article
                      key={`${dish.category}-${dish.name}`}
                      className="group flex h-full flex-col rounded-[24px] border border-border/70 bg-card p-3 shadow-[0_24px_60px_-46px_rgba(20,69,61,0.7)] transition-transform duration-300 hover:-translate-y-1"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden rounded-[18px] bg-secondary">
                        <img
                          src={dish.image.src}
                          alt={dish.image.alt}
                          loading="lazy"
                          decoding="async"
                          className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                        />
                        {dish.badge ? (
                          <span className="absolute left-3 top-3 rounded-full bg-background/95 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
                            {dish.badge}
                          </span>
                        ) : null}
                      </div>

                      <div className="flex flex-1 flex-col px-2 pb-1 pt-5">
                        <h4 className="text-[18px] font-semibold leading-snug text-primary">
                          {dish.name}
                        </h4>
                        <Body size="sm" className="mt-3 text-muted-foreground">
                          {dish.description}
                        </Body>
                        {dish.metadata ? (
                          <p className="mt-3 text-xs text-muted-foreground">
                            {dish.metadata}
                          </p>
                        ) : null}
                        {dish.tags && dish.tags.length > 0 ? (
                          <ul className="mt-4 flex flex-wrap gap-2">
                            {dish.tags.slice(0, 2).map((tag) => (
                              <li
                                key={tag}
                                className="rounded-full bg-secondary px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-secondary-foreground"
                              >
                                {tag}
                              </li>
                            ))}
                          </ul>
                        ) : null}
                        <div className="mt-auto pt-5">
                          <span className="text-[17px] font-semibold text-foreground">
                            {dish.price}
                          </span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="mt-8 rounded-[24px] border border-dashed border-border bg-card p-10 text-center">
                  <p className="text-base font-semibold text-primary">
                    No dishes match your filters
                  </p>
                  <Body
                    size="sm"
                    className="mx-auto mt-3 max-w-[46ch] text-muted-foreground"
                  >
                    Remove a dietary filter or reset the sorting to see more of
                    this category.
                  </Body>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={clearFilters}
                    className="mt-6 h-12 rounded-full border-primary/30 px-7 text-sm font-semibold text-primary hover:bg-secondary hover:text-primary"
                  >
                    Clear filters
                  </Button>
                </div>
              )}
            </TabsContent>
          );
        })}
      </Tabs>
    </Section>
  );
}
