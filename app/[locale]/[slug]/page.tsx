import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MarketingPage } from "../../../components/marketing-page";
import { isLocale, locales, type Locale } from "../../../content/locales";
import { getSitePage, sitePageSlugs } from "../../../content/site-pages";

const siteRoot = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://gaspardlevchin.github.io/fichr-site/").replace(/\/$/, "");
const socialImage = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/og/fichr-social.jpg`;

export function generateStaticParams() {
  return locales.flatMap((locale) => sitePageSlugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale: value, slug } = await params;
  const page = getSitePage(slug);
  if (!page || !isLocale(value)) return {};
  const locale = value as Locale;
  const canonical = `${siteRoot}/${locale}/${slug}/`;
  return {
    title: `${page.title[locale]} — Fichr`,
    description: page.summary[locale],
    alternates: {
      canonical,
      languages: { "x-default": `${siteRoot}/fr/${slug}/`, ...Object.fromEntries(locales.map((item) => [item, `${siteRoot}/${item}/${slug}/`])) },
    },
    openGraph: { type: "website", siteName: "Fichr", title: `${page.title[locale]} — Fichr`, description: page.summary[locale], url: canonical, images: [{ url: socialImage, width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", images: [socialImage] },
    robots: page.noIndex ? { index: false, follow: false } : { index: true, follow: true },
  };
}

export default async function LocalizedPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: value, slug } = await params;
  const page = getSitePage(slug);
  if (!page || !isLocale(value)) notFound();
  return <MarketingPage page={page} locale={value as Locale} />;
}
