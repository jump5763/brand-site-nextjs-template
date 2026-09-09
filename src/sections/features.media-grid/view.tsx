export interface MediaGridProps {
  title: string;
  description: string;
  items: readonly {
    id: string;
    title: string;
    description: string;
    media?: { path?: string; alt?: string };
  }[];
}
export function MediaGridView({ title, description, items }: MediaGridProps) {
  return (
    <section className="container-site py-16">
      <h2 className="t-h2">{title}</h2>
      <p className="mt-3 text-muted-foreground">{description}</p>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {items.map((item) => (
          <article
            key={item.id}
            className="overflow-hidden rounded-2xl border border-border bg-card"
          >
            {item.media?.path ? (
              <img
                src={item.media.path}
                alt={item.media.alt ?? ""}
                className="aspect-[16/9] w-full object-cover"
              />
            ) : null}
            <div className="p-5">
              <h3 className="font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {item.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
