import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://gaspardlevchin.github.io/fichr-site/";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date("2026-08-05"),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
