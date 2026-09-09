import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { Toaster } from "sonner";
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { loadSiteSchema } from "@/site-schema/runtime/load-site";
import { createSiteShellProps } from "@/site-schema/runtime/site-shell";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://keke.example.com"),
  title: {
    default: "keke — real food, made simple",
    template: "%s · keke",
  },
  description:
    "Seasonal salads and warm grain bowls, made from scratch every morning from produce grown by nearby farms. Pickup and delivery in San Francisco, Los Angeles and Palo Alto.",
  keywords: [
    "healthy salads",
    "grain bowls",
    "farm to table",
    "seasonal food",
    "keke",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "keke",
    title: "keke — real food, made simple",
    description:
      "Seasonal salads and warm grain bowls from nearby farms — made to order, ready in minutes.",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const shell = createSiteShellProps(await loadSiteSchema());
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${cormorant.variable} bg-background font-sans text-foreground antialiased`}
      >
        <span id="top" aria-hidden="true" className="absolute" />
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-inverse focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <Header navLinks={shell.navLinks} storeCount={shell.storeCount} />
        <main id="main-content">{children}</main>
        <Footer locations={shell.locations} />
        <Toaster
          theme="light"
          position="top-center"
          closeButton
          toastOptions={{
            style: {
              background: "#ffffff",
              color: "#22221c",
              border: "1px solid #e5e0d2",
              borderRadius: "14px",
              fontFamily: "var(--font-inter), Inter, Arial, sans-serif",
            },
          }}
        />
      </body>
    </html>
  );
}
