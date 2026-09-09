import { existsSync } from "node:fs";
import { resolve } from "node:path";

export interface MediaInput {
  kind: "image" | string;
  path: string;
  alt?: string;
  width?: number;
  height?: number;
}
export interface ResolvedMedia {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}
export class MediaResolutionError extends Error {
  constructor(
    readonly code: string,
    message: string,
  ) {
    super(`${code}: ${message}`);
    this.name = "MediaResolutionError";
  }
}

const DEFAULT_REMOTE_HOSTS = new Set([
  "images.unsplash.com",
  "lh3.googleusercontent.com",
  "www.mrkeke.com",
]);

export function resolveMedia(
  media: MediaInput,
  options: {
    publicDir?: string;
    allowedRemoteHosts?: ReadonlySet<string>;
  } = {},
): ResolvedMedia {
  if (!media || media.kind !== "image" || typeof media.path !== "string")
    throw new MediaResolutionError(
      "MEDIA_INVALID",
      "Image media requires kind=image and path",
    );
  if (media.path.startsWith("/media/")) {
    const publicDir = options.publicDir ?? resolve(process.cwd(), "public");
    const localPath = resolve(publicDir, `.${media.path}`);
    if (
      !localPath.startsWith(resolve(publicDir, "media")) ||
      !existsSync(localPath)
    )
      throw new MediaResolutionError(
        "MEDIA_LOCAL_NOT_FOUND",
        `Local media does not exist: ${media.path}`,
      );
    return {
      src: media.path,
      alt: media.alt ?? "",
      width: media.width,
      height: media.height,
    };
  }
  let url: URL;
  try {
    url = new URL(media.path);
  } catch {
    throw new MediaResolutionError(
      "MEDIA_PATH_INVALID",
      `Invalid media URL: ${media.path}`,
    );
  }
  if (url.protocol !== "https:")
    throw new MediaResolutionError(
      "MEDIA_PROTOCOL_INVALID",
      "Remote media must use https",
    );
  const hosts = options.allowedRemoteHosts ?? DEFAULT_REMOTE_HOSTS;
  if (!hosts.has(url.hostname))
    throw new MediaResolutionError(
      "MEDIA_HOST_NOT_ALLOWED",
      `Remote media host is not allowlisted: ${url.hostname}`,
    );
  return {
    src: url.toString(),
    alt: media.alt ?? "",
    width: media.width,
    height: media.height,
  };
}

export const allowedRemoteMediaHosts = DEFAULT_REMOTE_HOSTS;
