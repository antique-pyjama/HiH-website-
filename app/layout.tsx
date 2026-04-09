import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { siteSettings } from "@/lib/content";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteSettings.domain),
  title: {
    default: siteSettings.siteName,
    template: `%s | ${siteSettings.siteName}`,
  },
  description: siteSettings.description,
  applicationName: siteSettings.siteName,
  keywords: [
    "Hamburg halal tours",
    "Muslim-friendly Hamburg",
    "halal food tour Hamburg",
    "Hamburg walking tours",
    "FareHarbor",
  ],
  authors: [{ name: siteSettings.siteName }],
  creator: siteSettings.siteName,
  publisher: siteSettings.siteName,
  openGraph: {
    title: siteSettings.siteName,
    description: siteSettings.description,
    url: siteSettings.domain,
    siteName: siteSettings.siteName,
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${siteSettings.siteName} editorial travel preview`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteSettings.siteName,
    description: siteSettings.description,
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-background text-foreground">
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <main className="flex-1 pt-24 md:pt-28">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
