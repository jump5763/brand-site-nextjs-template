import type { ComponentProps } from "react";
import { mediaEditingProps } from "@/site-schema/runtime/media-binding";
import type { ResolvedMedia } from "@/site-schema/runtime/resolve-media";

export type SiteImageProps = Omit<ComponentProps<"img">, "src" | "alt"> & {
  media: ResolvedMedia;
};

export function SiteImage({ media, ...props }: SiteImageProps) {
  // eslint-disable-next-line @next/next/no-img-element
  return (
    <img
      {...props}
      {...mediaEditingProps(media)}
      src={media.src}
      alt={media.alt}
    />
  );
}
