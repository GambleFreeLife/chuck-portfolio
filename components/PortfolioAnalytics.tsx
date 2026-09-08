"use client";
import Script from "next/script";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { getLeadContext } from "@/lib/lead-context";

const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "";
const configured = /^G-[A-Z0-9]+$/.test(measurementId);

export function PortfolioAnalytics() {
  const pathname = usePathname();
  const lastPage = useRef("");
  const initialized = useRef(false);
  useEffect(() => {
    if (!configured || initialized.current) return;
    initialized.current = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer?.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", measurementId, { send_page_view: false, page_location: window.location.origin + window.location.pathname, page_referrer: "", allow_google_signals: false, allow_ad_personalization_signals: false });
  }, []);
  useEffect(() => {
    if (!configured || !pathname || lastPage.current === pathname) return;
    lastPage.current = pathname;
    const context = getLeadContext();
    let referrer = "";
    try { referrer = document.referrer ? new URL(document.referrer).origin : ""; } catch { /* Referrer is optional. */ }
    // Strip query strings, fragments, and checkout identifiers from page URLs.
    window.gtag?.("set", { page_location: `${window.location.origin}${pathname}`, page_referrer: referrer });
    window.gtag?.("event", "page_view", {
      page_location: `${window.location.origin}${pathname}`,
      page_referrer: referrer,
      page_title: document.title,
      ...(context.source ? { campaign_source: context.source } : {}),
      ...(context.medium ? { campaign_medium: context.medium } : {}),
      ...(context.campaign ? { campaign_name: context.campaign } : {}),
    });
  }, [pathname]);
  if (!configured) return null;
  return <Script src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} strategy="afterInteractive" />;
}
