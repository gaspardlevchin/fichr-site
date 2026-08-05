import type { MetadataRoute } from "next";
import { locales } from "../content/locales";
import { sitePages } from "../content/site-pages";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://gaspardlevchin.github.io/fichr-site/";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const localizedPages: MetadataRoute.Sitemap = locales.flatMap((locale) => [
    {
      url: new URL(`${locale}/`, siteUrl).toString(),
      lastModified: new Date("2026-08-05"),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    ...sitePages.filter(({ noIndex }) => !noIndex).map(({ slug, kind }) => ({
      url: new URL(`${locale}/${slug}/`, siteUrl).toString(),
      lastModified: new Date("2026-08-05"),
      changeFrequency: "monthly" as const,
      priority: kind === "conversion" ? 0.8 : 0.7,
    })),
  ]);

  return [
    {
      url: siteUrl,
      lastModified: new Date("2026-08-05"),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...localizedPages,
  ];
}
