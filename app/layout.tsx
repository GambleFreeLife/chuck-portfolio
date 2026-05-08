import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chuck Baryames | Website Revenue Leak Fixes for Service Businesses",
  description:
    "I help service businesses fix outdated, unclear, or unfinished websites so more visitors call, book, request quotes, and submit forms.",
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
