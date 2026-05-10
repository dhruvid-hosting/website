import type { MetadataRoute } from "next";

const BASE = "https://dhruvid.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const routes: MetadataRoute.Sitemap = [
    { url: BASE,                        lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE}/hosting/`,          lastModified: now, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${BASE}/managed/`,          lastModified: now, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${BASE}/domains/`,          lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE}/affiliate/`,        lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/contact/`,          lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/privacy/`,          lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
    { url: `${BASE}/terms/`,            lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
    { url: `${BASE}/refund/`,           lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
    { url: `${BASE}/sla/`,              lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
    { url: `${BASE}/spam/`,             lastModified: now, changeFrequency: "yearly",  priority: 0.2 },
    { url: `${BASE}/acceptable-use/`,   lastModified: now, changeFrequency: "yearly",  priority: 0.2 },
    { url: `${BASE}/domain-policy/`,    lastModified: now, changeFrequency: "yearly",  priority: 0.2 },
  ];

  return routes;
}
