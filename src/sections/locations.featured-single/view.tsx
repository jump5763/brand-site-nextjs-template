import type { LocationListItem } from "../locations.map-list/view";

export interface FeaturedLocationProps {
  title: string;
  description: string;
  location: LocationListItem | Record<string, unknown>;
  services: readonly string[];
  storefront?: { path?: string; alt?: string };
  actions: readonly { label: string; href: string }[];
}
export function LocationsFeaturedSingleView({
  title,
  description,
  location,
  services,
  storefront,
  actions,
}: FeaturedLocationProps) {
  const name =
    "name" in location && typeof location.name === "string"
      ? location.name
      : "Our location";
  return (
    <section className="container-site grid gap-8 py-16 md:grid-cols-2">
      <div>
        <h2 className="t-h2">{title}</h2>
        <p className="mt-3 text-muted-foreground">{description}</p>
        <h3 className="mt-6 font-semibold">{name}</h3>
        <ul className="mt-3 list-disc pl-5 text-sm text-muted-foreground">
          {services.map((service) => (
            <li key={service}>{service}</li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap gap-4">
          {actions.map((action) => (
            <a
              key={action.href}
              className="font-semibold underline"
              href={action.href}
            >
              {action.label}
            </a>
          ))}
        </div>
      </div>
      {storefront?.path ? (
        <img
          src={storefront.path}
          alt={storefront.alt ?? ""}
          className="aspect-[4/3] w-full rounded-2xl object-cover"
        />
      ) : null}
    </section>
  );
}
