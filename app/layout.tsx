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
  title: "Chuck Baryames | Websites and Marketing for Michigan Businesses",
  description:
    "Websites, Google Ads, email and short video for Michigan service businesses. Get 3 free fixes for your website. Websites from $750.",
  openGraph: {
    images: [
      {
        url: "/og-image.jpg?v=20261004",
        width: 1200,
        height: 630,
        alt: "Chuck Baryames: Make it easier for your next customer to choose you. Get 3 free fixes for your website. Websites from $750.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.jpg?v=20261004"],
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
