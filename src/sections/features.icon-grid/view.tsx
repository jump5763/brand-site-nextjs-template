export interface IconGridProps {
  title: string;
  description: string;
  items: readonly {
    id: string;
    title: string;
    description: string;
    icon?: { path?: string; alt?: string };
  }[];
}
export function IconGridView({ title, description, items }: IconGridProps) {
  return (
    <section className="container-site py-16">
      <h2 className="t-h2">{title}</h2>
      <p className="mt-3 text-muted-foreground">{description}</p>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {items.map((item) => (
          <article
            key={item.id}
            className="rounded-2xl border border-border bg-card p-5"
          >
            {item.icon?.path ? (
              <img
                src={item.icon.path}
                alt={item.icon.alt ?? ""}
                className="h-12 w-12 object-contain"
              />
            ) : null}
            <h3 className="mt-4 font-semibold">{item.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {item.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
