import type { ProductsCarouselSection } from "@/site-schema/generated/types";
import { ProductsCarouselView, type ProductCarouselProps } from "./view";

export const toProps = (
  section: ProductsCarouselSection,
): ProductCarouselProps => ({
  title: section.content.title,
  description: section.content.description,
  products: section.content
    .products as unknown as ProductCarouselProps["products"],
});

const definition = {
  id: "products.carousel" as const,
  type: "products" as const,
  variant: "carousel" as const,
  toProps,
  render: (section: ProductsCarouselSection) => (
    <ProductsCarouselView {...toProps(section)} />
  ),
};

export default definition;
