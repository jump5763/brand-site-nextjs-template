import type { CategoryId, Product } from "@/lib/site";

export type CatFilter = CategoryId | "all" | "limited";
export type DietFilter =
  "all" | "Vegan" | "Vegetarian" | "Gluten-free" | "High-protein";
export type SortKey = "featured" | "price-asc" | "price-desc" | "calories";

export function selectCatalog(
  products: readonly Product[],
  cat: CatFilter,
  diet: DietFilter,
  sort: SortKey,
): Product[] {
  const list = products
    .filter((product) =>
      cat === "limited"
        ? product.badge === "Limited"
        : cat === "all" || product.category === cat,
    )
    .filter((product) => diet === "all" || product.diet.includes(diet));
  return [...list].sort((a, b) =>
    sort === "price-asc"
      ? a.priceCents - b.priceCents
      : sort === "price-desc"
        ? b.priceCents - a.priceCents
        : sort === "calories"
          ? a.calories - b.calories
          : 0,
  );
}
