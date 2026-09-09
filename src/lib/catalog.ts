import type { CatalogProduct } from "@/site-schema/generated/types";

export type CategoryId = string;
export type Product = Omit<CatalogProduct, "media"> & {
  image: string;
  alt: string;
};
export const money = (cents: number, currency = "USD") =>
  `${currency === "USD" ? "$" : `${currency} `}${(cents / 100).toFixed(2)}`;
export function toProduct(product: CatalogProduct): Product {
  const { media, ...content } = product;
  return { ...content, image: media.path, alt: media.alt };
}
