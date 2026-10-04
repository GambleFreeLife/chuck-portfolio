import { PortfolioHome } from "@/components/PortfolioHome";
import type { Metadata } from "next";

export const metadata: Metadata = { alternates: { canonical: "/" } };
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "ProfessionalService", "@id": "https://chuckbaryames.com/#business", name: "Chuck Baryames", url: "https://chuckbaryames.com/", description: "Websites, Google Ads, email campaigns and short video for local service businesses in Michigan.", image: "https://chuckbaryames.com/og-image.jpg?v=20261004", email: "chuck@chuckbaryames.com", areaServed: [{ "@type": "City", name: "Lansing, Michigan" }, { "@type": "State", name: "Michigan" }], founder: { "@id": "https://chuckbaryames.com/#person" }, sameAs: ["https://www.linkedin.com/in/chuckbaryames"] },
    { "@type": "Person", "@id": "https://chuckbaryames.com/#person", name: "Chuck Baryames", url: "https://chuckbaryames.com/", jobTitle: "Web designer and marketer", sameAs: ["https://www.linkedin.com/in/chuckbaryames"] },
  ],
};

export default function HomePage() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} /><PortfolioHome /></>;
}
