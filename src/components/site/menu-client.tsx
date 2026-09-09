"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Leaf,
  Minus,
  Plus,
  ShoppingBag,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { ctaClass } from "@/components/site/cta";
import { Reveal } from "@/components/site/motion";
import type { CategoryId, Product } from "@/lib/catalog";
import { selectCatalog } from "@/components/site/catalog-view-model";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

type CatFilter = CategoryId | "all" | "limited";

const dietOptions = [
  { id: "all", label: "All diets" },
  { id: "Vegan", label: "Vegan" },
  { id: "Vegetarian", label: "Vegetarian" },
  { id: "Gluten-free", label: "Gluten-free" },
  { id: "High-protein", label: "High-protein" },
] as const;

type DietFilter = (typeof dietOptions)[number]["id"];
type SortKey = "featured" | "price-asc" | "price-desc" | "calories";

const money = (cents: number, currency = "USD") =>
  `${currency === "USD" ? "$" : `${currency} `}${(cents / 100).toFixed(2)}`;

const sortOptions: { id: SortKey; label: string }[] = [
  { id: "featured", label: "Featured" },
  { id: "price-asc", label: "Price: low to high" },
  { id: "price-desc", label: "Price: high to low" },
  { id: "calories", label: "Fewest calories" },
];

const badgeClass: Record<string, string> = {
  New: "bg-butter text-[#241a06]",
  Limited: "bg-sage-600 text-white",
  "Chef's pick": "bg-card text-foreground border border-border",
  Bestseller: "bg-inverse text-white",
};

function DietChip({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  if (product.diet.length === 0) return null;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-[5px] rounded-full bg-sage-100 px-[10px] py-[5px] text-[11px] font-semibold text-sage-800",
        className,
      )}
    >
      <Leaf className="h-[11px] w-[11px]" strokeWidth={2.4} />
      {product.diet[0]}
    </span>
  );
}

/* ---------------------------------------------------------------- */
/* Product card                                                      */
/* ---------------------------------------------------------------- */

function ProductCard({
  product,
  quantity,
  onAdd,
  onRemove,
}: {
  product: Product;
  quantity: number;
  onAdd: () => void;
  onRemove: () => void;
}) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[20px] border border-border bg-card transition-all duration-300 hover:-translate-y-[2px] hover:shadow-lift">
      <div className="relative aspect-[4/3] overflow-hidden bg-sage-100">
        <img
          src={product.image}
          alt={product.alt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
        />
        {product.badge && (
          <span
            className={cn(
              "absolute left-[12px] top-[12px] rounded-full px-[12px] py-[6px] text-[12px] font-bold shadow-card",
              badgeClass[product.badge],
            )}
          >
            {product.badge}
          </span>
        )}
        <span className="absolute bottom-[12px] right-[12px] rounded-full border border-border bg-card/95 px-[10px] py-[5px] text-[11px] font-medium text-foreground shadow-card">
          {product.calories} kcal
        </span>
      </div>

      <div className="flex flex-1 flex-col p-[18px] tablet:p-[20px]">
        <div className="flex items-start justify-between gap-[14px]">
          <h3 className="text-[17px] font-semibold leading-snug text-foreground">
            {product.name}
          </h3>
          <span className="shrink-0 text-[16px] font-semibold text-foreground">
            {money(product.priceCents)}
          </span>
        </div>
        <p className="mt-[8px] line-clamp-3 text-[13px] leading-[1.65] text-muted-foreground">
          {product.description}
        </p>
        <div className="mt-[16px]">
          <DietChip product={product} />
        </div>

        <div className="mt-auto pt-[18px]">
          {quantity === 0 ? (
            <button
              type="button"
              onClick={onAdd}
              className="inline-flex h-[44px] w-full items-center justify-center gap-[8px] rounded-full border border-border bg-background text-[14px] font-semibold text-foreground transition-colors hover:border-sage-500 hover:bg-sage-50"
            >
              <Plus
                className="h-[16px] w-[16px] text-sage-700"
                strokeWidth={2.4}
              />
              Add to order
            </button>
          ) : (
            <div
              aria-label={`${product.name} quantity ${quantity}`}
              className="inline-flex h-[44px] w-full items-center justify-between rounded-full border border-sage-600 bg-sage-600 px-[8px]"
            >
              <button
                type="button"
                onClick={onRemove}
                aria-label={`Remove one ${product.name}`}
                className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-white text-sage-800 transition-transform hover:scale-[1.05]"
              >
                {quantity === 1 ? (
                  <X className="h-[15px] w-[15px]" strokeWidth={2.6} />
                ) : (
                  <Minus className="h-[15px] w-[15px]" strokeWidth={2.6} />
                )}
              </button>
              <span className="flex items-center gap-[7px] text-[14px] font-bold text-white">
                <Check className="h-[14px] w-[14px]" strokeWidth={3} />
                {quantity} {quantity === 1 ? "in order" : "in order"}
              </span>
              <button
                type="button"
                onClick={onAdd}
                aria-label={`Add one more ${product.name}`}
                className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-white text-sage-800 transition-transform hover:scale-[1.05]"
              >
                <Plus className="h-[15px] w-[15px]" strokeWidth={2.6} />
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

/* ---------------------------------------------------------------- */
/* Menu page                                                         */
/* ---------------------------------------------------------------- */

export interface MenuCatalogProps {
  id: string;
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    action: { label: string; href: string };
    hoursLabel: string;
  };
  limitedDescription: string;
  products: readonly Product[];
  categories: ReadonlyArray<{
    id: CategoryId | "limited";
    label: string;
    description: string;
  }>;
  currency: string;
}

export function MenuClient({
  id,
  hero,
  limitedDescription,
  products: catalogProducts,
  categories: catalogCategories,
  currency = "USD",
}: MenuCatalogProps) {
  const [cat, setCat] = useState<CatFilter>("all");
  const [diet, setDiet] = useState<DietFilter>("all");
  const [sort, setSort] = useState<SortKey>("featured");
  const [bag, setBag] = useState<Record<string, number>>({});
  const [bagOpen, setBagOpen] = useState(false);

  const catChips: { id: CatFilter; label: string }[] = [
    { id: "all", label: "All" },
    ...catalogCategories,
  ];

  const results = useMemo(() => {
    return selectCatalog(catalogProducts, cat, diet, sort);
  }, [cat, diet, sort, catalogProducts]);

  const groups = useMemo(() => {
    if (cat === "all") {
      return catalogCategories
        .filter((category) => category.id !== "limited")
        .map((category) => ({
          key: category.id as string,
          label: category.label,
          description: category.description,
          items: results.filter(
            (product) => product.category === (category.id as CategoryId),
          ),
        }))
        .filter((group) => group.items.length > 0);
    }
    if (cat === "limited") {
      return [
        {
          key: "limited",
          label: "Limited time",
          description: limitedDescription,
          items: results,
        },
      ];
    }
    const meta = categoryById(cat, catalogCategories);
    return [
      {
        key: cat,
        label: meta.label,
        description: meta.description,
        items: results,
      },
    ];
  }, [cat, results, catalogCategories, limitedDescription]);

  const bagList = Object.entries(bag)
    .map(([id, quantity]) => ({
      product: catalogProducts.find((p) => p.id === id),
      quantity,
    }))
    .filter((entry): entry is { product: Product; quantity: number } =>
      Boolean(entry.product),
    );

  const itemCount = bagList.reduce((sum, entry) => sum + entry.quantity, 0);
  const subtotal = bagList.reduce(
    (sum, entry) => sum + entry.product.priceCents * entry.quantity,
    0,
  );

  const add = (id: string) =>
    setBag((current) => ({ ...current, [id]: (current[id] ?? 0) + 1 }));
  const remove = (id: string) =>
    setBag((current) => {
      const next = { ...current };
      if ((next[id] ?? 0) <= 1) delete next[id];
      else next[id] -= 1;
      return next;
    });

  const activeCatLabel = catChips.find((chip) => chip.id === cat)?.label ?? "";

  return (
    <div id={id} className="pb-[140px]">
      {/* Page intro */}
      <section className="pt-[40px] tablet:pt-[72px]">
        <div className="container-site">
          <div className="flex flex-col gap-[32px] desktop:flex-row desktop:items-end desktop:justify-between">
            <div className="max-w-[680px]">
              <p
                className="a-hero t-eyebrow text-sage-700"
                style={{ animationDelay: "0ms" }}
              >
                {hero.eyebrow}
              </p>
              <h1
                className="a-hero mt-[16px] font-display text-[46px] font-semibold leading-[1.05] tracking-[-0.5px] text-foreground tablet:text-[64px]"
                style={{ animationDelay: "90ms" }}
              >
                {hero.title}
              </h1>
              <p
                className="a-hero mt-[20px] max-w-[560px] text-[15px] leading-[1.75] text-muted-foreground"
                style={{ animationDelay: "190ms" }}
              >
                {hero.description}
              </p>
            </div>
            <div
              className="a-hero flex flex-col gap-[12px] desktop:items-end"
              style={{ animationDelay: "300ms" }}
            >
              <Link
                href={hero.action.href}
                className={ctaClass("primary", "md")}
              >
                {hero.action.label}
                <ArrowRight className="h-[16px] w-[16px]" strokeWidth={2.2} />
              </Link>
              <p className="text-[12px] text-muted-foreground">
                {hero.hoursLabel}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky filter bar */}
      <div
        className="sticky top-[var(--header-h)] z-30 bg-background"
        style={{ paddingTop: 12, paddingBottom: 12 }}
      >
        <div className="container-site">
          <div className="flex flex-col gap-[12px] desktop:flex-row desktop:items-center">
            {/* Category chips */}
            <div
              role="tablist"
              aria-label="Menu categories"
              className="no-scrollbar -mx-[16px] flex items-center gap-[10px] overflow-x-auto px-[16px] tablet:mx-0 tablet:flex-1 tablet:px-0"
            >
              {catChips.map((chip) => (
                <button
                  key={chip.id}
                  type="button"
                  role="tab"
                  aria-selected={cat === chip.id}
                  onClick={() => setCat(chip.id)}
                  className={cn(
                    "shrink-0 rounded-full px-[18px] py-[11px] text-[14px] font-semibold transition-all duration-200",
                    cat === chip.id
                      ? "bg-butter text-[#241a06] shadow-[0_1px_0_rgba(28,26,12,0.08)]"
                      : "border border-border bg-card text-foreground hover:border-sage-400 hover:bg-sage-50",
                  )}
                >
                  {chip.label}
                </button>
              ))}
            </div>

            {/* Diet + sort */}
            <div className="flex items-center justify-between gap-[10px] tablet:justify-end">
              <div
                role="group"
                aria-label="Filter by diet"
                className="no-scrollbar flex items-center gap-[8px] overflow-x-auto"
              >
                {dietOptions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setDiet(option.id)}
                    className={cn(
                      "shrink-0 rounded-full border px-[14px] py-[10px] text-[13px] font-medium transition-colors",
                      diet === option.id
                        ? "border-sage-700 bg-sage-700 text-white"
                        : "border-border bg-card text-foreground hover:border-sage-400",
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>

              <div className="relative shrink-0">
                <label htmlFor="menu-sort" className="sr-only">
                  Sort items
                </label>
                <select
                  id="menu-sort"
                  value={sort}
                  onChange={(event) => setSort(event.target.value as SortKey)}
                  className="h-[42px] cursor-pointer appearance-none rounded-full border border-border bg-card pl-[38px] pr-[38px] text-[13px] font-semibold text-foreground transition-colors hover:border-sage-400"
                >
                  {sortOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ArrowUpRight
                  aria-hidden="true"
                  className="pointer-events-none absolute left-[14px] top-1/2 h-[15px] w-[15px] -translate-y-1/2 text-sage-700"
                  strokeWidth={2.2}
                />
                <ChevronDown
                  aria-hidden="true"
                  className="pointer-events-none absolute right-[13px] top-1/2 h-[15px] w-[15px] -translate-y-1/2 text-muted-foreground"
                  strokeWidth={2}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Groups */}
      <div className="container-site mt-[24px] tablet:mt-[40px]">
        <p aria-live="polite" className="text-[13px] text-muted-foreground">
          Showing {results.length} item{results.length === 1 ? "" : "s"}
          {cat !== "all" || diet !== "all" ? (
            <>
              {" "}
              in{" "}
              <span className="font-semibold text-foreground">
                {activeCatLabel}
              </span>
            </>
          ) : null}
        </p>

        <div
          key={`${cat}-${diet}-${sort}`}
          className="mt-[20px] space-y-[80px] tablet:space-y-[96px]"
        >
          {groups.map((group) => (
            <section
              key={group.key}
              id={group.key}
              aria-labelledby={`heading-${group.key}`}
            >
              <Reveal className="flex flex-col gap-[8px] tablet:flex-row tablet:items-end tablet:justify-between">
                <div>
                  <h2
                    id={`heading-${group.key}`}
                    className="t-h3 font-display text-[34px] leading-[1.2] tablet:text-[40px]"
                  >
                    {group.label}
                  </h2>
                  <p className="mt-[8px] max-w-[520px] text-[14px] leading-[1.65] text-muted-foreground">
                    {group.description}
                  </p>
                </div>
              </Reveal>

              <div className="mt-[28px] grid grid-cols-1 gap-[16px] mobile-xs:grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 wide:grid-cols-4">
                {group.items.map((product, index) => (
                  <Reveal
                    key={product.id}
                    delay={Math.min(index * 70, 420)}
                    className="h-full"
                  >
                    <ProductCard
                      product={product}
                      quantity={bag[product.id] ?? 0}
                      onAdd={() => add(product.id)}
                      onRemove={() => remove(product.id)}
                    />
                  </Reveal>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-[72px] rounded-[20px] border border-border bg-card px-[24px] py-[22px] text-[13px] leading-[1.7] text-muted-foreground">
          Allergen &amp; nutrition notes: items are prepared in kitchens that
          handle dairy, gluten, tree nuts, soy, sesame and eggs. Full allergen
          lists and nutrition info are available at the counter or on request —
          just ask the team.
        </div>
      </div>

      {/* Order bag */}
      {itemCount > 0 && (
        <div className="fixed inset-x-0 bottom-[22px] z-30 px-[16px]">
          <button
            type="button"
            onClick={() => setBagOpen(true)}
            className="mx-auto flex w-full max-w-[520px] items-center justify-between gap-[16px] rounded-full bg-inverse py-[12px] pl-[20px] pr-[12px] text-white shadow-lift transition-transform hover:-translate-y-[1px]"
          >
            <span className="flex items-center gap-[12px]">
              <span className="relative flex h-[34px] w-[34px] items-center justify-center rounded-full bg-butter">
                <ShoppingBag
                  className="h-[16px] w-[16px] text-[#241a06]"
                  strokeWidth={2.2}
                />
                <span className="absolute -right-[4px] -top-[4px] flex h-[18px] w-[18px] items-center justify-center rounded-full bg-terra text-[10px] font-bold text-white">
                  {itemCount}
                </span>
              </span>
              <span className="text-left">
                <span className="block text-[13px] text-white/60">
                  Your order
                </span>
                <span className="block text-[15px] font-bold text-white">
                  {money(subtotal, currency)}
                </span>
              </span>
            </span>
            <span className="inline-flex items-center gap-[8px] rounded-full bg-white px-[16px] py-[9px] text-[13px] font-bold text-inverse">
              Review bag
              <ArrowRight className="h-[14px] w-[14px]" strokeWidth={2.4} />
            </span>
          </button>
        </div>
      )}

      {/* Bag sheet */}
      <Sheet open={bagOpen} onOpenChange={setBagOpen}>
        <SheetContent
          side="bottom"
          className="mx-auto w-full rounded-t-[28px] border-x border-t border-border p-0 sm:max-w-[720px]"
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Your order bag</SheetTitle>
            <SheetDescription>Review the items in your order</SheetDescription>
          </SheetHeader>
          <div className="flex h-full max-h-[80vh] flex-col overflow-hidden px-[20px] pb-[24px] pt-[28px] tablet:px-[32px]">
            <div className="flex items-center justify-between">
              <h3 className="text-[20px] font-semibold text-foreground">
                Your order
              </h3>
              <span className="rounded-full border border-border px-[12px] py-[6px] text-[12px] font-medium text-muted-foreground">
                {itemCount} item{itemCount === 1 ? "" : "s"}
              </span>
            </div>

            <div className="mt-[20px] flex-1 space-y-[14px] overflow-y-auto pr-[4px]">
              {bagList.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="flex items-center gap-[14px] rounded-[16px] border border-border bg-card p-[12px]"
                >
                  <img
                    src={product.image}
                    alt=""
                    className="h-[64px] w-[64px] shrink-0 rounded-[12px] object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[14px] font-semibold text-foreground">
                      {product.name}
                    </p>
                    <p className="text-[12px] text-muted-foreground">
                      {money(product.priceCents, currency)} each
                    </p>
                  </div>
                  <div className="flex items-center gap-[10px]">
                    <button
                      type="button"
                      onClick={() => remove(product.id)}
                      aria-label={`Remove one ${product.name}`}
                      className="flex h-[30px] w-[30px] items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-muted"
                    >
                      {quantity === 1 ? (
                        <X className="h-[14px] w-[14px]" strokeWidth={2.4} />
                      ) : (
                        <Minus
                          className="h-[14px] w-[14px]"
                          strokeWidth={2.4}
                        />
                      )}
                    </button>
                    <span
                      aria-live="polite"
                      className="w-[18px] text-center text-[14px] font-bold text-foreground"
                    >
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => add(product.id)}
                      aria-label={`Add one more ${product.name}`}
                      className="flex h-[30px] w-[30px] items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-muted"
                    >
                      <Plus className="h-[14px] w-[14px]" strokeWidth={2.4} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-[20px] border-t border-border pt-[18px]">
              <div className="flex items-center justify-between text-[14px]">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-[17px] font-bold text-foreground">
                  {money(subtotal, currency)}
                </span>
              </div>
              <p className="mt-[6px] text-[12px] leading-[1.6] text-muted-foreground">
                Tax, service fees and delivery calculated at the next step.
              </p>
              <button
                type="button"
                onClick={() => {
                  setBagOpen(false);
                  setBag({});
                  toast("Demo checkout complete", {
                    description:
                      "This is a design preview — connect DoorDash, Uber Eats or your POS to accept real orders.",
                    duration: 5000,
                  });
                }}
                className={ctaClass("primary", "lg", "mt-[18px] w-full")}
              >
                Checkout · {money(subtotal, currency)}
                <ArrowRight className="h-[18px] w-[18px]" strokeWidth={2.2} />
              </button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

const categoryById = (
  id: CategoryId,
  categories: ReadonlyArray<{
    id: CategoryId | "limited";
    label: string;
    description: string;
  }>,
) => {
  const found = categories.find((category) => category.id === id);
  return {
    label: found?.label ?? "Menu",
    description: found?.description ?? "",
  };
};
