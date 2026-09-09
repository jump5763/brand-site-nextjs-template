export interface StoryDisclosureItem {
  id: string;
  title: string;
  description: string;
  media?: { path?: string; alt?: string };
}
export interface StoryDisclosuresProps {
  items: readonly StoryDisclosureItem[];
}
export function StoryDisclosuresView({ items }: StoryDisclosuresProps) {
  return (
    <section className="container-site grid gap-6 py-16 md:grid-cols-3">
      {items.map((item) => (
        <article
          key={item.id}
          className="overflow-hidden rounded-2xl border border-border bg-card"
        >
          {item.media?.path ? (
            <img
              src={item.media.path}
              alt={item.media.alt ?? ""}
              className="aspect-[4/3] w-full object-cover"
            />
          ) : null}
          <div className="p-5">
            <h2 className="font-semibold">{item.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {item.description}
            </p>
          </div>
        </article>
      ))}
    </section>
  );
}
