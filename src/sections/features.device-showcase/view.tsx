export interface DeviceShowcaseProps {
  title: string;
  description: string;
  media?: { path?: string; alt?: string };
  items: readonly {
    id: string;
    title: string;
    description: string;
    icon?: { path?: string; alt?: string };
  }[];
}
export function DeviceShowcaseView({
  title,
  description,
  media,
  items,
}: DeviceShowcaseProps) {
  return (
    <section className="container-site grid gap-8 py-16 md:grid-cols-2">
      <div>
        <h2 className="t-h2">{title}</h2>
        <p className="mt-3 text-muted-foreground">{description}</p>
        <div className="mt-6 grid gap-4">
          {items.map((item) => (
            <article key={item.id}>
              <h3 className="font-semibold">{item.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
      {media?.path ? (
        <img
          src={media.path}
          alt={media.alt ?? ""}
          className="w-full rounded-2xl object-cover"
        />
      ) : null}
    </section>
  );
}
