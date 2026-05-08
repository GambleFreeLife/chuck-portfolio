import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chuck Baryames | Website Revenue Leak Fixes for Service Businesses",
  description:
    "I help service businesses fix outdated, unclear, or unfinished websites so more visitors call, book, request quotes, and submit forms.",
  openGraph: {
    images: [
      {
        url: "https://chuck-portfolio.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Landing pages built in 48 hours. $497 flat.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://chuck-portfolio.vercel.app/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
