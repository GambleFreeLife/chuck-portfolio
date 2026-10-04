"use client";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { getLeadContext } from "@/lib/lead-context";
import { analyticsAllowed, analyticsEnvironment } from "@/lib/analytics";
// Public Google tag ID for the owner-approved Chuck Portfolio property.
const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-SHJDZ2K0BS";
const configured = /^G-[A-Z0-9]+$/.test(measurementId);
export function PortfolioAnalytics() {
  const pathname = usePathname();
  const [enabled, setEnabled] = useState(false);
  const lastPage = useRef("");
  useEffect(() => {
    const sync = () => {
      const allowed = configured && analyticsAllowed();
      window.portfolioAnalyticsAllowed = allowed;
      (window as unknown as Record<string, unknown>)[`ga-disable-${measurementId}`] = !allowed;
      setEnabled(allowed);
    };
    sync(); window.addEventListener("portfolio-analytics-preference", sync);
    return () => window.removeEventListener("portfolio-analytics-preference", sync);
  }, []);
  useEffect(() => {
    if (!enabled || !pathname) { lastPage.current = ""; return; }
    const pageUrl = window.location.origin + pathname;
    if (lastPage.current === pageUrl) return;
    lastPage.current = pageUrl;
    window.dataLayer = window.dataLayer || [];
    if (!window.gtag) {
      window.gtag = function () { window.dataLayer?.push(arguments); };
      window.gtag("js", new Date());
    }
    window.gtag("config", measurementId, { send_page_view: false, page_location: pageUrl, page_referrer: "", allow_google_signals: false, allow_ad_personalization_signals: false, cookie_expires: 60 * 60 * 24 * 60, ...analyticsEnvironment(window.location.hostname) });
    const context = getLeadContext();
    const knownCampaigns: Record<string, [string, string]> = { profile: ["linkedin", "social"], cold_email: ["email", "outreach"], site_credit: ["baryamescleaners", "referral"] };
    const expected = knownCampaigns[context.campaign];
    const campaign = expected && expected[0] === context.source && expected[1] === context.medium ? { campaign_source: context.source, campaign_medium: context.medium, campaign_name: context.campaign } : {};
    let referrer = "";
    try { referrer = document.referrer ? new URL(document.referrer).origin : ""; } catch { /* Optional. */ }
    window.gtag("set", { page_location: pageUrl, page_referrer: referrer });
    window.gtag("event", "page_view", { page_location: pageUrl, page_referrer: referrer, page_title: document.title, ...campaign });
  }, [enabled, pathname]);
  if (!enabled) return null;
  return <Script src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} strategy="afterInteractive" />;
}
