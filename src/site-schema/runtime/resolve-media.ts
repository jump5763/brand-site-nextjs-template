import { mediaPathError, remoteMediaHosts } from "./media-policy.mjs";
import type { Media } from "../generated/types";
export type MediaInput = Media;
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
export function resolveMedia(
  media: Media,
  options: { publicDir?: string } = {},
): ResolvedMedia {
  const issue = mediaPathError(media.path, options.publicDir);
  if (issue) throw new MediaResolutionError("MEDIA_PATH_INVALID", issue);
  return {
    src: media.path,
    alt: media.alt,
    width: media.width,
    height: media.height,
  };
}
export const allowedRemoteMediaHosts = new Set(remoteMediaHosts);
