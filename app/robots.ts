import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/verify/", "/domains/register/"],
      },
    ],
    sitemap: "https://dhruvid.com/sitemap.xml",
  };
}
