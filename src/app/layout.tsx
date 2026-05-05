import type { Metadata, Viewport } from "next";
import { fontSans, fontDisplay, fontJp, fontMono } from "@/lib/fonts";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Providers } from "@/providers";
import { Announcement } from "@/components/layout/announcement";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CartDrawer } from "@/components/cart/cart-drawer";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — A Ordem`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: ["streetwear", "premium", "drops", "limitado", "underground", "luxury", "masayoshi"],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description,
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-BR"
      className={cn(
        fontSans.variable,
        fontDisplay.variable,
        fontJp.variable,
        fontMono.variable,
        "antialiased"
      )}
    >
      <body className="bg-bg text-fg font-sans selection:bg-blood selection:text-bone">
        <Providers>
          <Announcement />
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <CartDrawer />
        </Providers>
      </body>
    </html>
  );
}
