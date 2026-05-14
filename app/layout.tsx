import type { Metadata } from "next";
import { Instrument_Serif, Outfit } from "next/font/google";
import "./globals.css";

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
  title: "Chuck Baryames | Website Revenue Leak Fixes for Service Businesses",
  description:
    "I help service businesses fix outdated, unclear, or unfinished websites so more visitors call, book, request quotes, and submit forms.",
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
      <body className={`${outfit.variable} ${instrumentSerif.variable}`}>{children}</body>
    </html>
  );
}
