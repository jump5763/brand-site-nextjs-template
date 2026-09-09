import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

/**
 * Keke design system — px-first.
 * Every explicit spatial or typographic length resolves to px values.
 * Only the registered breakpoints below may change layout.
 */
const toPx = (n: number) => `${n * 4}px`;

const spacing: Record<string, string> = { px: "1px", 0: "0" };
const spacingSteps = [
  0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 20, 24, 28,
  32, 36, 40, 44, 48, 52, 56, 60, 64, 72, 80, 96,
];
for (const step of spacingSteps) spacing[String(step)] = toPx(step);

const fontSize: Record<string, [string, { lineHeight: string }]> = {
  xs: ["12px", { lineHeight: "1.5" }],
  sm: ["14px", { lineHeight: "1.5" }],
  base: ["16px", { lineHeight: "1.6" }],
  lg: ["18px", { lineHeight: "1.6" }],
  xl: ["20px", { lineHeight: "1.5" }],
  "2xl": ["24px", { lineHeight: "1.4" }],
  "3xl": ["30px", { lineHeight: "1.3" }],
  "4xl": ["36px", { lineHeight: "1.25" }],
  "5xl": ["44px", { lineHeight: "1.2" }],
  "6xl": ["52px", { lineHeight: "1.15" }],
  "7xl": ["64px", { lineHeight: "1.1" }],
  "8xl": ["80px", { lineHeight: "1.05" }],
  "9xl": ["96px", { lineHeight: "1" }],
};

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      ...defaultTheme.screens,
      "mobile-xs": { max: "430px" },
      tablet: "769px",
      desktop: "1024px",
      wide: "1440px",
    },
    extend: {
      spacing,
      fontSize,
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Arial",
          "sans-serif",
        ],
        display: [
          "var(--font-cormorant)",
          "Cormorant Garamond",
          "Georgia",
          "Times New Roman",
          "serif",
        ],
        serif: [
          "var(--font-cormorant)",
          "Cormorant Garamond",
          "Georgia",
          "serif",
        ],
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        inverse: {
          DEFAULT: "hsl(var(--inverse))",
          foreground: "hsl(var(--inverse-foreground))",
        },
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        /* Keke brand scale — Keke yellow + brand orange */
        butter: {
          50: "#FFF9E3",
          100: "#FFF2C2",
          200: "#FFE694",
          300: "#FFD95C",
          400: "#FFD03A",
          DEFAULT: "#FFC826",
          600: "#F0B40F",
          700: "#D79C04",
          800: "#B07F00",
          900: "#8A6300",
        },
        terra: {
          50: "#FEF2E8",
          100: "#FDE2CF",
          300: "#F8A56F",
          DEFAULT: "#F26814",
          600: "#DE5B10",
          700: "#BC4C0C",
          800: "#933A07",
        },
        /* Sage green family — fresh supporting accents */
        sage: {
          50: "#F4F6EE",
          100: "#E9EEDE",
          200: "#D7E1C7",
          300: "#C2CFAA",
          400: "#A9BA8C",
          500: "#8FA473",
          600: "#74895E",
          700: "#5A6C47",
          800: "#48573A",
          900: "#39452F",
        },
      },
      borderRadius: {
        none: "0",
        sm: "10px",
        md: "14px",
        lg: "16px",
        xl: "24px",
        "2xl": "28px",
        "3xl": "32px",
        full: "9999px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(28,28,24,0.04), 0 12px 28px -18px rgba(28,28,24,0.14)",
        lift: "0 2px 4px rgba(28,28,24,0.05), 0 22px 44px -20px rgba(28,28,24,0.18)",
        pill: "0 1px 2px rgba(28,28,24,0.06), 0 10px 24px -16px rgba(28,28,24,0.12)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
