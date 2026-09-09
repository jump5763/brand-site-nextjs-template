import type { ReactNode } from "react";

export interface ProductCarouselItem {
  id: string;
  title: string;
  description: string;
  amount: number | string;
  media?: string;
  alt?: string;
  orderURL?: string;
  detailsURL?: string;
}

export interface ProductCarouselProps {
  title: string;
  description: string;
  products: readonly ProductCarouselItem[];
  footer?: ReactNode;
}

export function ProductsCarouselView({
  title,
  description,
  products,
}: ProductCarouselProps) {
  return (
    <section
      aria-labelledby="products-carousel-title"
      className="container-site py-16"
    >
      <h2 id="products-carousel-title" className="t-h2">
        {title}
      </h2>
      <p className="mt-3 max-w-2xl text-muted-foreground">{description}</p>
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
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-semibold">{product.title}</h3>
                <span className="shrink-0">
                  {typeof product.amount === "number"
                    ? `$${(product.amount / 100).toFixed(2)}`
                    : product.amount}
                </span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                {product.description}
              </p>
              {product.orderURL ? (
                <a
                  className="mt-4 inline-block text-sm font-semibold underline"
                  href={product.orderURL}
                >
                  Order online
                </a>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
