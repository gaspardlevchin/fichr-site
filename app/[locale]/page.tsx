import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LocaleHome } from "../../components/marketing-page";
import { isLocale, locales, type Locale } from "../../content/locales";

const siteRoot = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://gaspardlevchin.github.io/fichr-site/").replace(/\/$/, "");
const socialImage = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/og/fichr-social.jpg`;

const homeMetadata = {
  fr: { title: "Fichr — Des données produit fiables, du fichier à l’export", description: "Une source locale pour structurer, valider et exporter vos données produit." },
  en: { title: "Fichr — Reliable product data, from file to export", description: "A local source to structure, validate and export product data." },
  de: { title: "Fichr — Verlässliche Produktdaten, von der Datei bis zum Export", description: "Eine lokale Quelle zum Strukturieren, Prüfen und Exportieren von Produktdaten." },
  es: { title: "Fichr — Datos de producto fiables, del archivo a la exportación", description: "Una fuente local para estructurar, validar y exportar datos de producto." },
  pt: { title: "Fichr — Dados de produto fiáveis, do ficheiro à exportação", description: "Uma fonte local para estruturar, validar e exportar dados de produto." },
  it: { title: "Fichr — Dati prodotto affidabili, dal file all’esportazione", description: "Una fonte locale per strutturare, validare ed esportare i dati prodotto." },
} satisfies Record<Locale, { title: string; description: string }>;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: value } = await params;
  if (!isLocale(value)) return {};
  const locale = value as Locale;
  const copy = homeMetadata[locale];
  const canonical = `${siteRoot}/${locale}/`;
  return {
    title: copy.title,
    description: copy.description,
    alternates: { canonical, languages: { "x-default": `${siteRoot}/`, ...Object.fromEntries(locales.map((item) => [item, `${siteRoot}/${item}/`])) } },
    openGraph: { type: "website", siteName: "Fichr", title: copy.title, description: copy.description, url: canonical, images: [{ url: socialImage, width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", images: [socialImage] },
    robots: { index: true, follow: true },
  };
}

export default async function LocalizedHome({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: value } = await params;
  if (!isLocale(value)) notFound();
  return <LocaleHome locale={value as Locale} />;
}
