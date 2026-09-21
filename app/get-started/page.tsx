import { PortfolioHome } from "@/components/PortfolioHome";
// New projects are scoped before payment. Existing payment handlers remain intact.
export default function GetStartedPage() {
  return <PortfolioHome initialService="landing-page" inquiryOnly />;
}
