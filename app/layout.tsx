import type { Metadata } from "next";
import { Instrument_Serif, Outfit } from "next/font/google";
import "./globals.css";
import { PortfolioAnalytics } from "@/components/PortfolioAnalytics";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-outfit",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://chuckbaryames.com"),
  title: "Chuck Baryames | Websites, Local SEO, Google Ads and Brand Video for Local Businesses",
  description:
    "I run marketing for an 11-location family business open since 1922. Websites, local SEO, Google Ads, conversion tracking, and brand video for local service businesses. Send your URL for a free teardown.",
  openGraph: {
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Landing pages built in 48 hours. $497 flat.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${instrumentSerif.variable}`}>{children}<PortfolioAnalytics /></body>
    </html>
  );
}
