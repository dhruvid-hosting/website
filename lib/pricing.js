// ============================================================
//  DHRUVID — CENTRAL PRICING CONFIG
//  Edit this file to change any price shown on the website.
//  All pages (Hosting, Managed, Domains, Home) read from here.
// ============================================================

// ─── Shared Hosting ──────────────────────────────────────────────────────────
// prices  → per-month display figure shown big on the card
// totals  → actual charge per billing period (what appears on the invoice)

export const HOSTING_PLANS = [
  {
    name: "Starter",
    slug: "starter",
    desc: "Personal websites, blogs, testing. Entry point with full cPanel access.",
    prices: {
      monthly:   { INR: 119,  USD: 1.99 },
      quarterly: { INR: 99,   USD: 1.79 },
      annually:  { INR: 83,   USD: 1.39 },
      triennial: { INR: 56,   USD: 0.99 },
    },
    totals: {
      monthly:   { INR: 119,   USD: 1.99  },
      quarterly: { INR: 299,   USD: 5.37  },
      annually:  { INR: 999,   USD: 16.99 },
      triennial: { INR: 1999,  USD: 35.99 },
    },
    features: [
      { text: "1 Website", ok: true },
      { text: "3 GB NVMe SSD Storage", ok: true },
      { text: "20 GB/mo Bandwidth", ok: true },
      { text: "2 Email Accounts", ok: true },
      { text: "Free SSL Certificate", ok: true },
      { text: "LiteSpeed Web Server", ok: true },
      { text: "Website Builder", ok: false },
      { text: "WordPress Staging", ok: false },
      { text: "Python & Node.js", ok: false },
      { text: "Git Version Control", ok: false },
      { text: "Firewall & DDoS Protection", ok: true },
      { text: "Malware & Virus Protection", ok: true },
      { text: "Account Isolation & Brute-force Shield", ok: true },
      { text: "Monthly Backups", ok: true },
      { text: "Free Migration", ok: true },
      { text: "Free Domain", ok: false },
      { text: "Priority Support", ok: false },
      { text: "7-day money back guarantee", ok: true },
    ],
  },
  {
    name: "Business Starter",
    slug: "business-starter",
    popular: true,
    desc: "Small businesses, professionals, service websites. Our most popular plan.",
    prices: {
      monthly:   { INR: 229,  USD: 3.99 },
      quarterly: { INR: 199,  USD: 3.49 },
      annually:  { INR: 166,  USD: 2.89 },
      triennial: { INR: 139,  USD: 2.49 },
    },
    totals: {
      monthly:   { INR: 229,   USD: 3.99  },
      quarterly: { INR: 599,   USD: 10.47 },
      annually:  { INR: 1999,  USD: 34.99 },
      triennial: { INR: 4999,  USD: 89.99 },
    },
    features: [
      { text: "3 Websites", ok: true },
      { text: "10 GB NVMe SSD Storage", ok: true },
      { text: "Unlimited Bandwidth", ok: true },
      { text: "10 Email Accounts", ok: true },
      { text: "Free SSL Certificate", ok: true },
      { text: "LiteSpeed Web Server", ok: true },
      { text: "Website Builder", ok: true },
      { text: "WordPress Staging", ok: true },
      { text: "Python & Node.js", ok: false },
      { text: "Git Version Control", ok: true },
      { text: "Firewall & DDoS Protection", ok: true },
      { text: "Malware & Virus Protection", ok: true },
      { text: "Account Isolation & Brute-force Shield", ok: true },
      { text: "Weekly Backups", ok: true },
      { text: "Free Migration", ok: true },
      { text: "1 Free Domain", ok: true, tooltip: "Free domain registration for 1st year on 3-Year plan only. Renewal at standard rate." },
      { text: "Priority Support", ok: true },
      { text: "7-day money back guarantee", ok: true },
    ],
  },
  {
    name: "Growth Pro",
    slug: "growth-pro",
    desc: "Growing businesses, agencies, multi-site hosting. Unlimited sites and emails.",
    prices: {
      monthly:   { INR: 449,  USD: 7.49 },
      quarterly: { INR: 399,  USD: 6.99 },
      annually:  { INR: 333,  USD: 5.99 },
      triennial: { INR: 278,  USD: 4.99 },
    },
    totals: {
      monthly:   { INR: 449,   USD: 7.49   },
      quarterly: { INR: 1199,  USD: 20.97  },
      annually:  { INR: 3999,  USD: 71.99  },
      triennial: { INR: 9999,  USD: 179.99 },
    },
    features: [
      { text: "5 Websites", ok: true },
      { text: "20 GB NVMe SSD Storage", ok: true },
      { text: "Unlimited Bandwidth", ok: true },
      { text: "15 Email Accounts", ok: true },
      { text: "Free SSL Certificate", ok: true },
      { text: "LiteSpeed Web Server", ok: true },
      { text: "Website Builder", ok: true },
      { text: "WordPress Staging", ok: true },
      { text: "Python & Node.js", ok: true },
      { text: "Git Version Control", ok: true },
      { text: "Firewall & DDoS Protection", ok: true },
      { text: "Malware & Virus Protection", ok: true },
      { text: "Account Isolation & Brute-force Shield", ok: true },
      { text: "Weekly Backups", ok: true },
      { text: "Free Migration", ok: true },
      { text: "1 Free Domain", ok: true, tooltip: "Free domain registration for 1st year on Annual and 3-Year plans. Renewal at standard rate." },
      { text: "Priority Support", ok: true },
      { text: "7-day money back guarantee", ok: true },
    ],
  },
  {
    name: "Scale Pro",
    slug: "scale-pro",
    premium: true,
    desc: "Ecommerce, premium sites, high-traffic agencies. Maximum resources.",
    prices: {
      monthly:   { INR: 799,  USD: 13.99 },
      quarterly: { INR: 699,  USD: 12.49 },
      annually:  { INR: 625,  USD: 10.99 },
      triennial: { INR: 499,  USD: 8.99  },
    },
    totals: {
      monthly:   { INR: 799,   USD: 13.99  },
      quarterly: { INR: 2099,  USD: 37.49  },
      annually:  { INR: 7499,  USD: 131.99 },
      triennial: { INR: 17999, USD: 323.99 },
    },
    features: [
      { text: "10 Websites", ok: true },
      { text: "30 GB NVMe SSD Storage", ok: true },
      { text: "Unlimited Bandwidth", ok: true },
      { text: "25 Email Accounts", ok: true },
      { text: "Free SSL Certificate", ok: true },
      { text: "LiteSpeed Web Server", ok: true },
      { text: "Website Builder", ok: true },
      { text: "WordPress Staging", ok: true },
      { text: "Python & Node.js", ok: true },
      { text: "Git Version Control", ok: true },
      { text: "Firewall & DDoS Protection", ok: true },
      { text: "Malware & Virus Protection", ok: true },
      { text: "Account Isolation & Brute-force Shield", ok: true },
      { text: "Weekly Backups", ok: true },
      { text: "Free Migration", ok: true },
      { text: "1 Free Domain", ok: true, tooltip: "Free domain registration for 1st year on Annual and 3-Year plans. Renewal at standard rate." },
      { text: "24/7 Priority Support", ok: true },
      { text: "7-day money back guarantee", ok: true },
    ],
  },
];

export const HOSTING_BILLING_PERIODS = [
  { key: "monthly",   label: "Monthly" },
  { key: "quarterly", label: "Quarterly" },
  { key: "annually",  label: "Annually",  save: "−30%" },
  { key: "triennial", label: "3 Year",    save: "Best" },
];

// ─── Managed Hosting ─────────────────────────────────────────────────────────

export const MANAGED_PLANS = [
  {
    name: "Essential",
    desc: "For small businesses that want professional management without the hassle.",
    prices: {
      monthly: { INR: 499,  USD: 7.99  },
      yearly:  { INR: 499,  USD: 7.99  }, // per-month figure displayed on yearly toggle
    },
    totals: {
      monthly: { INR: 499,   USD: 7.99  },
      yearly:  { INR: 4999,  USD: 79.99 },
    },
    features: [
      { text: "Full cPanel & server setup", ok: true },
      { text: "Email configuration (5 accounts)", ok: true },
      { text: "Security hardening", ok: true },
      { text: "Weekly backup monitoring", ok: true },
      { text: "Monthly maintenance round", ok: true },
      { text: "SSL & DNS management", ok: true },
      { text: "Uptime monitoring", ok: true },
      { text: "Free website build & setup", ok: true },
      { text: "Ongoing maintenance & bug fixes", ok: true },
      { text: "Support response within 24 hrs", ok: true },
      { text: "Daily backup monitoring", ok: false },
      { text: "Performance reports", ok: false },
      { text: "Staging environment", ok: false },
      { text: "Priority response (4 hrs)", ok: false },
    ],
  },
  {
    name: "Professional",
    popular: true,
    desc: "Full-service management for growing businesses with demanding requirements.",
    prices: {
      monthly: { INR: 999,  USD: 14.99 },
      yearly:  { INR: 999,  USD: 14.99 }, // per-month figure displayed on yearly toggle
    },
    totals: {
      monthly: { INR: 999,   USD: 14.99  },
      yearly:  { INR: 9999,  USD: 149.99 },
    },
    features: [
      { text: "Full cPanel & server setup", ok: true },
      { text: "Unlimited email configuration", ok: true },
      { text: "Advanced security hardening", ok: true },
      { text: "Daily backup monitoring", ok: true },
      { text: "Bi-weekly maintenance rounds", ok: true },
      { text: "SSL & DNS management", ok: true },
      { text: "Uptime & performance monitoring", ok: true },
      { text: "Monthly performance reports", ok: true },
      { text: "Staging environment setup", ok: true },
      { text: "Free website build & setup", ok: true },
      { text: "Ongoing maintenance & bug fixes", ok: true },
      { text: "Priority response within 4 hrs", ok: true },
      { text: "Multi-site support", ok: true },
      { text: "Dedicated account manager", ok: true },
    ],
  },
];

export const MANAGED_BILLING_PERIODS = [
  { key: "monthly", label: "Monthly" },
  { key: "yearly",  label: "Yearly", save: "2 Months Free" },
];

// ─── Domain Registration ──────────────────────────────────────────────────────

export const DOMAIN_PRICES = {
  com:     { INR: 999,  USD: 12, period: "yr" },
  in:      { INR: 699,  USD: 9,  period: "yr" },
  "co.in": { INR: 499,  USD: 6,  period: "yr" },
  net:     { INR: 899,  USD: 11, period: "yr" },
  org:     { INR: 849,  USD: 10, period: "yr" },
  io:      { INR: 3499, USD: 42, period: "yr" },
  store:   { INR: 599,  USD: 7,  period: "yr" },
  online:  { INR: 399,  USD: 5,  period: "yr" },
};

export const DEFAULT_DOMAIN_MARKUP = 40; // % applied to unlisted TLDs over reseller cost
export const DEFAULT_TLDS = ["com", "in", "co.in", "net", "org", "io", "store", "online"];

// ─── Helper functions ─────────────────────────────────────────────────────────

function fmtPrice(amount, currency) {
  if (currency === "USD") return amount.toFixed(2);
  return amount.toLocaleString("en-IN");
}

// Returns the "Billed …" subtitle for a hosting plan card.
export function hostingBillingLabel(plan, period, currency, symbol) {
  const total = plan.totals[period][currency];
  const f = fmtPrice(total, currency);
  switch (period) {
    case "monthly":   return `Billed ${symbol}${f}/month`;
    case "quarterly": return `Billed ${symbol}${f} / 3 mo`;
    case "annually":  return `Billed ${symbol}${f}/year`;
    case "triennial": return `Billed ${symbol}${f} / 3 years`;
    default:          return "";
  }
}

// Returns the "Billed …" subtitle for a managed plan card.
export function managedBillingLabel(plan, period, currency, symbol) {
  const total = plan.totals[period][currency];
  const f = fmtPrice(total, currency);
  switch (period) {
    case "monthly": return `Billed ${symbol}${f}/month`;
    case "yearly":  return `Billed ${symbol}${f}/year · 2 months free`;
    default:        return "";
  }
}

// Returns { price, currency, period } for the domain registration page.
export function getRetailPrice(tld, resellerPrice, currency = "INR") {
  const cur = currency === "USD" ? "USD" : "INR";
  if (DOMAIN_PRICES[tld]) {
    return { price: DOMAIN_PRICES[tld][cur], currency: cur, period: DOMAIN_PRICES[tld].period };
  }
  if (resellerPrice != null) {
    return { price: Math.ceil(resellerPrice * (1 + DEFAULT_DOMAIN_MARKUP / 100)), currency: cur, period: "yr" };
  }
  return null;
}
