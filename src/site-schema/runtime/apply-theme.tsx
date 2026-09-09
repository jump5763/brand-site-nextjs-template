import type { CSSProperties, ReactNode } from "react";

export interface V45Theme {
  fonts: { heading: string; typography: string };
  colors: Record<string, string>;
}
export type ThemeStyle = CSSProperties & Record<`--${string}`, string>;
const colorMap: Record<string, string> = {
  background: "--background",
  black900: "--foreground",
  white: "--card",
  primary500: "--primary",
  black100: "--card-foreground",
  secondary100: "--secondary",
  black700: "--muted-foreground",
  black200: "--border",
  primary700: "--ring",
  secondary50: "--muted",
  secondary900: "--secondary-foreground",
};

export function themeToCssVariables(theme: V45Theme): ThemeStyle {
  const style: Record<string, string> = {
    "--font-heading": theme.fonts.heading,
    "--font-typography": theme.fonts.typography,
  };
  for (const [source, target] of Object.entries(colorMap))
    if (theme.colors[source]) style[target] = theme.colors[source];
  return style as ThemeStyle;
}

export function safeJsonLd(value: unknown): string {
  return JSON.stringify(value)
    .replaceAll("<", "\\u003c")
    .replaceAll(">", "\\u003e")
    .replaceAll("&", "\\u0026");
}

export function ThemeStyleProvider({
  theme,
  children,
}: {
  theme: V45Theme;
  children: ReactNode;
}) {
  return <div style={themeToCssVariables(theme)}>{children}</div>;
}
