import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { products } from "@/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.SITE_URL;

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/sectors`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/apply`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/store`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    { url: `${base}/rules`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/staff`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.6 },
    { url: `${base}/discord`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];

  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${base}/store/${p.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...productRoutes];
}
