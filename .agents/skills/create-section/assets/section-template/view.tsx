import type { ExampleDefaultSection } from "@/site-schema/generated/types";

export type ExampleProps = {
  id: string;
  content: ExampleDefaultSection["content"];
};

export default function ExampleView({ id, content }: ExampleProps) {
  return (
    <section id={id} className="container-site py-16">
      <h2 className="t-h2">{content.title}</h2>
    </section>
  );
}
