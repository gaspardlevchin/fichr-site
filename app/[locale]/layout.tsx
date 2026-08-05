import type { Metadata } from "next";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import { SiteFooter } from "../../components/site-footer";
import { SiteHeader } from "../../components/site-header";
import { isLocale, localeTags, locales, type Locale } from "../../content/locales";
import "../globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://gaspardlevchin.github.io/fichr-site/";

const montserrat = localFont({
  src: [
    { path: "../../public/fonts/Montserrat-Regular.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/Montserrat-Medium.woff2", weight: "500", style: "normal" },
    { path: "../../public/fonts/Montserrat-SemiBold.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-montserrat",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "Fichr",
  authors: [{ name: "Fichr" }],
  creator: "Fichr",
  publisher: "Fichr",
  icons: { icon: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/brand/fichr_logo.svg` },
};

export default async function LocaleLayout({ children, params }: Readonly<{ children: React.ReactNode; params: Promise<{ locale: string }> }>) {
  const { locale: value } = await params;
  if (!isLocale(value)) notFound();
  const locale = value as Locale;
  return (
    <html lang={localeTags[locale]}>
      <body className={montserrat.variable}>
        <a className="skip-link" href="#content">Skip to content</a>
        <SiteHeader locale={locale} />
        {children}
        <SiteFooter locale={locale} />
      </body>
    </html>
  );
}
