import type { ComponentPropsWithoutRef, ReactNode } from "react";
import type { HeadingLevel } from "@/components/ui/typography/Heading";
import { Body, type BodySize } from "@/components/ui/typography/Body";
import { cn } from "@/lib/utils";
import { Eyebrow } from "./eyebrow";

export type SectionHeaderProps = Omit<
  ComponentPropsWithoutRef<"div">,
  "title" | "children"
> & {
  title: ReactNode;
  headingId: string;
  headingLevel?: HeadingLevel;
  eyebrow?: ReactNode;
  description?: ReactNode;
  descriptionSize?: BodySize;
  headingClassName?: string;
  eyebrowClassName?: string;
  descriptionClassName?: string;
};

// Compose editorial headings and shared body typography without owning placement.
export function SectionHeader({
  title,
  headingId,
  headingLevel = 2,
  eyebrow,
  description,
  descriptionSize = "md",
  headingClassName,
  eyebrowClassName,
  descriptionClassName,
  ...props
}: SectionHeaderProps) {
  const HeadingTag = `h${headingLevel}` as `h${HeadingLevel}`;
  const hasEyebrow =
    eyebrow !== undefined &&
    eyebrow !== null &&
    eyebrow !== false &&
    eyebrow !== "";
  const hasDescription =
    description !== undefined &&
    description !== null &&
    description !== false &&
    description !== "";

  return (
    <div {...props}>
      {hasEyebrow ? (
        <Eyebrow className={eyebrowClassName}>{eyebrow}</Eyebrow>
      ) : null}
      <HeadingTag
        id={headingId}
        className={cn(
          "t-h2",
          hasEyebrow ? "mt-[14px]" : undefined,
          headingClassName,
        )}
      >
        {title}
      </HeadingTag>
      {hasDescription ? (
        <Body
          size={descriptionSize}
          className={cn(
            "mt-[16px] text-muted-foreground",
            descriptionClassName,
          )}
        >
          {description}
        </Body>
      ) : null}
    </div>
  );
}
