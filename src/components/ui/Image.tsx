import type {ComponentProps} from "react";

export type ImageProps = ComponentProps<"img">;

declare const process: {
  env: {
    NEXT_PUBLIC_IMAGE_CDN?: string;
  };
};

function resolveImageSource(src: ImageProps["src"]) {
  const cdnBaseUrl = typeof process === "undefined"
    ? ""
    : process.env.NEXT_PUBLIC_IMAGE_CDN?.replace(/\/+$/, "") ?? "";

  if (typeof src !== "string" || !src.startsWith("/") || src.startsWith("//") || cdnBaseUrl.length === 0) {
    return src;
  }

  return `${cdnBaseUrl}${src}`;
}

export function Image({src, ...props}: ImageProps) {
  // The shared component intentionally stays framework-agnostic.
  // eslint-disable-next-line @next/next/no-img-element
  return <img {...props} alt={props.alt ?? ""} src={resolveImageSource(src)} />;
}
