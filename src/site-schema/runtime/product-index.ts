export interface ProductLike {
  id: string;
  [key: string]: unknown;
}
export class ProductIndexError extends Error {
  constructor(
    readonly code: string,
    message: string,
  ) {
    super(`${code}: ${message}`);
    this.name = "ProductIndexError";
  }
}
const stable = (value: unknown): string => {
  if (Array.isArray(value)) return `[${value.map(stable).join(",")}]`;
  if (value && typeof value === "object")
    return `{${Object.entries(value)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, child]) => `${JSON.stringify(key)}:${stable(child)}`)
      .join(",")}}`;
  return JSON.stringify(value);
};

function collect(value: unknown, output: ProductLike[]) {
  if (Array.isArray(value)) {
    value.forEach((item) => collect(item, output));
    return;
  }
  if (!value || typeof value !== "object") return;
  const object = value as Record<string, unknown>;
  if (
    typeof object.id === "string" &&
    (typeof object.title === "string" || typeof object.name === "string") &&
    ("price" in object ||
      "amount" in object ||
      "description" in object ||
      "media" in object)
  )
    output.push(object as ProductLike);
  for (const child of Object.values(object)) collect(child, output);
}

export function buildProductIndex(
  document: unknown,
): ReadonlyMap<string, ProductLike> {
  const index = new Map<string, ProductLike>();
  const fingerprints = new Map<string, string>();
  const products: ProductLike[] = [];
  collect(document, products);
  for (const product of products) {
    const fingerprint = stable(product);
    const previous = fingerprints.get(product.id);
    if (previous && previous !== fingerprint)
      throw new ProductIndexError(
        "PRODUCT_DEFINITION_CONFLICT",
        `Conflicting product definition for ${product.id}`,
      );
    if (!previous) {
      fingerprints.set(product.id, fingerprint);
      index.set(product.id, product);
    }
  }
  return index;
}

export function requireProduct(
  index: ReadonlyMap<string, ProductLike>,
  id: string,
): ProductLike {
  const product = index.get(id);
  if (!product)
    throw new ProductIndexError("PRODUCT_UNKNOWN", `Unknown product ${id}`);
  return product;
}
