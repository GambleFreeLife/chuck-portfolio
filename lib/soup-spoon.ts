// Verified Soup Spoon Cafe facts shared by the homepage and the case study.
// Before: the old site, checked Oct 16, 2026 (archived on the Wayback Machine).
// After: the live site, checked Oct 19 and 20, 2026.
// Website scores only. Sales, leads and ad spend stay off the site until the client approves them.

export const soupSpoon = {
  name: "Soup Spoon Cafe",
  place: "Lansing, Michigan",
  url: "https://soupspooncafe.com/",
  launch: "October 19, 2026",
  caseStudy: "/work/soup-spoon",
  archiveUrl: "https://web.archive.org/web/20261016140926/https://soupspooncafe.com/",
  pageSpeedUrl: "https://pagespeed.web.dev/analysis?url=https%3A%2F%2Fsoupspooncafe.com%2F&form_factor=mobile",
} as const;

const img = "/portfolio/soup-spoon";

export const soupSpoonShots = {
  desktopBefore: { src: `${img}/home-desktop-before.webp`, width: 1409, height: 774, alt: "The old Soup Spoon Cafe homepage on a computer: a logo over a pancake photo and one button" },
  desktopAfter: { src: `${img}/home-desktop-after.webp`, width: 1410, height: 774, alt: "The new Soup Spoon Cafe homepage on a computer, with Order Online, Reserve, the phone number and live open hours" },
  phoneBefore: { src: `${img}/home-phone-before.webp`, width: 780, height: 1480, alt: "The old Soup Spoon Cafe homepage on a phone, with one button" },
  phoneAfter: { src: `${img}/home-phone-after.webp`, width: 780, height: 1480, alt: "The new Soup Spoon Cafe homepage on a phone, with Order online, Reserve a table, Call and Get directions" },
  menuBefore: { src: `${img}/menu-desktop-before.webp`, width: 800, height: 505, alt: "The old Soup Spoon breakfast menu on a separate website" },
  menuAfter: { src: `${img}/menu-desktop-after.webp`, width: 1409, height: 772, alt: "The new Soup Spoon menu page with Order and Reserve buttons" },
  cateringAfter: { src: `${img}/catering-phone-after.webp`, width: 390, height: 740, alt: "The new Soup Spoon catering page on a phone, with prices and a quote button" },
  quoteForm: { src: `${img}/quote-form-phone.webp`, width: 390, height: 740, alt: "The Soup Spoon catering quote form on a phone" },
  bar: { src: `${img}/bar-desktop-after.webp`, width: 1409, height: 772, alt: "The new Soup Spoon The Bar page" },
  events: { src: `${img}/events-desktop-after.webp`, width: 1409, height: 772, alt: "The new Soup Spoon Private Events page" },
  cateringBefore: { src: "/portfolio/20261004/soup-spoon-before.webp", width: 720, height: 4195, alt: "The old Soup Spoon catering page, before the September rebuild" },
} as const;

// Google PageSpeed Insights, homepage, mobile.
// Before: one run, Oct 16, 2026. After: the middle of three runs (86, 87, 87), Oct 19 and 20, 2026.
export const soupSpoonScores = [
  { label: "Performance", before: 69, after: 87 },
  { label: "Accessibility", before: 77, after: 100 },
  { label: "Best Practices", before: 96, after: 100 },
  { label: "SEO", before: 77, after: 100 },
] as const;

export const soupSpoonSpeedIndex = { before: "7.3 s", after: "3.3 s" } as const;

export const soupSpoonScoreNote = "Google PageSpeed Insights, homepage on mobile. Before: Oct 16, 2026. After: the middle of three runs, Oct 19 and 20, 2026. Scores move a few points between runs.";

// Each row was checked on the old site (Oct 16) and on every page of the new site (Oct 20).
export const soupSpoonChecks = [
  { item: "Buttons on the first phone screen", before: "1, and it opened a page with no menu", after: "Order, Reserve, Call and Directions" },
  { item: "Tap to call", before: "The link didn’t dial on any page", after: "Dials from every page" },
  { item: "Directions", before: "No link on any page", after: "On every page" },
  { item: "The menu", before: "On a separate website, with no way to order", after: "On the restaurant’s own site, and the staff edit it" },
  { item: "Opening hours", before: "Three different opening times in the page", after: "One set of hours, with a live open sign" },
  { item: "Page headings for Google", before: "0 of 11 pages", after: "12 of 12 pages" },
  { item: "Search descriptions", before: "0 of 12 pages", after: "12 of 12 pages" },
  { item: "Image descriptions", before: "0 of 51 images", after: "Every image" },
] as const;

export const soupSpoonHeadlineStats = [
  { value: "77 → 100", label: "Google SEO score" },
  { value: "77 → 100", label: "Accessibility score" },
  { value: "7.3 → 3.3 s", label: "Time for the page to fill in on a phone" },
  { value: "1 → 4", label: "One-tap actions on the first phone screen" },
] as const;
