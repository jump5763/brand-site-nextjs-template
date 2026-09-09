export interface LocationListItem {
  id: string;
  name: string;
  address: Record<string, unknown>;
  phone?: string;
  email?: string;
  businessHours?: unknown;
  placeId?: string;
}
export interface LocationMapListProps {
  title: string;
  description: string;
  locations: readonly LocationListItem[];
}

export function LocationsMapListView({
  title,
  description,
  locations,
}: LocationMapListProps) {
  return (
    <section
      className="container-site py-16"
      aria-labelledby="locations-map-list-title"
    >
      <h2 id="locations-map-list-title" className="t-h2">
        {title}
      </h2>
      <p className="mt-3 max-w-2xl text-muted-foreground">{description}</p>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {locations.map((location) => (
          <article
            key={location.id}
            className="rounded-2xl border border-border bg-card p-5"
          >
            <h3 className="font-semibold">{location.name}</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {Object.values(location.address)
                .filter((value): value is string => typeof value === "string")
                .join(", ")}
            </p>
            {location.phone ? (
              <a
                className="mt-3 block text-sm underline"
                href={`tel:${location.phone}`}
              >
                {location.phone}
              </a>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}
