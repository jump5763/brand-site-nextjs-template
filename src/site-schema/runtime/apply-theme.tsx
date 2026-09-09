import type { CSSProperties } from "react";
import type { Theme } from "../generated/types";

const colorMap = {
  background: ["background"],
  black900: ["foreground", "card-foreground", "popover-foreground"],
  white: ["card", "popover"],
  primary500: ["primary"],
  primary900: ["primary-foreground"],
  secondary100: ["secondary"],
  secondary900: ["secondary-foreground", "accent-foreground"],
  secondary50: ["muted"],
  secondary200: ["accent"],
  black700: ["muted-foreground"],
  black200: ["border", "input"],
  secondary700: ["ring"],
  black800: ["inverse"],
  primary50: ["inverse-foreground"],
} as const;
const fonts = {
  Inter: "var(--font-inter)",
  "Cormorant Garamond": "var(--font-cormorant)",
};
function hsl(value: string): string {
  if (value.startsWith("hsl(")) return value.slice(4, -1);
  const [r, g, b] = [1, 3, 5].map(
    (i) => parseInt(value.slice(i, i + 2), 16) / 255,
  );
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b),
    delta = max - min,
    light = (max + min) / 2;
  const saturation = delta === 0 ? 0 : delta / (1 - Math.abs(2 * light - 1));
  const hue =
    delta === 0
      ? 0
      : 60 *
        (max === r
          ? ((g - b) / delta + 6) % 6
          : max === g
            ? (b - r) / delta + 2
            : (r - g) / delta + 4);
  return `${hue} ${saturation * 100}% ${light * 100}%`;
}
export function themeToCssVariables(theme: Theme): CSSProperties {
  const variables: Record<string, string> = {
    "--font-heading": fonts[theme.fonts.heading],
    "--font-typography": fonts[theme.fonts.typography],
  };
  for (const [key, tokens] of Object.entries(colorMap))
    if (theme.colors[key])
      for (const token of tokens)
        variables[`--${token}`] = hsl(theme.colors[key]);
  return variables;
}
