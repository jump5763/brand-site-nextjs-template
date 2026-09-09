import type { ExampleDefaultSection } from "@/site-schema/generated/types";

export default function ExampleView({
  content,
}: {
  content: ExampleDefaultSection["content"];
}) {
  return (
    <section className="container-site py-16">
      <h2 className="t-h2">{content.title}</h2>
    </section>
  );
}
