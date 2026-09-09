import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { Toaster } from "sonner";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { loadSiteSchema } from "@/site-schema/runtime/load-site";
import { createSiteShellProps } from "@/site-schema/runtime/site-shell";
import { themeToCssVariables } from "@/site-schema/runtime/apply-theme";
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

export async function generateMetadata(): Promise<Metadata> {
  const site = await loadSiteSchema();
  const home = site.pages.find((page) => page.id === "home")!;
  return {
    metadataBase: new URL(site.siteUrl),
    title: {
      default: home.metadata.title,
      template: `%s · ${site.layout.header.content.brandName}`,
    },
    description: home.metadata.description,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const site = await loadSiteSchema();
  const shell = createSiteShellProps(site);
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        style={themeToCssVariables(site.theme)}
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
        <Header {...shell.header} />
        <main id="main-content">{children}</main>
        <Footer {...shell.footer} />
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
