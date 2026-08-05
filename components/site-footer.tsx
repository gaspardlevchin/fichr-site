import Image from "next/image";
import Link from "next/link";
import type { Locale } from "../content/locales";

const copy = {
  fr: { line: "Structurez. Validez. Exportez.", product: "Produit", useCases: "Cas d’usage", pricing: "Tarifs", about: "À propos", legal: "Mentions légales", privacy: "Confidentialité", a11y: "Accessibilité", draft: "Documents juridiques en préparation" },
  en: { line: "Structure. Validate. Export.", product: "Product", useCases: "Use cases", pricing: "Pricing", about: "About", legal: "Legal notice", privacy: "Privacy", a11y: "Accessibility", draft: "Legal documents in preparation" },
  de: { line: "Strukturieren. Prüfen. Exportieren.", product: "Produkt", useCases: "Anwendungsfälle", pricing: "Preise", about: "Über Fichr", legal: "Impressum", privacy: "Datenschutz", a11y: "Barrierefreiheit", draft: "Rechtliche Dokumente in Vorbereitung" },
  es: { line: "Estructura. Valida. Exporta.", product: "Producto", useCases: "Casos de uso", pricing: "Precios", about: "Acerca de", legal: "Aviso legal", privacy: "Privacidad", a11y: "Accesibilidad", draft: "Documentos legales en preparación" },
  pt: { line: "Estruture. Valide. Exporte.", product: "Produto", useCases: "Casos de utilização", pricing: "Preços", about: "Sobre", legal: "Aviso legal", privacy: "Privacidade", a11y: "Acessibilidade", draft: "Documentos jurídicos em preparação" },
  it: { line: "Struttura. Valida. Esporta.", product: "Prodotto", useCases: "Casi d’uso", pricing: "Prezzi", about: "Chi siamo", legal: "Note legali", privacy: "Privacy", a11y: "Accessibilità", draft: "Documenti legali in preparazione" },
} satisfies Record<Locale, Record<string, string>>;

export function SiteFooter({ locale }: { locale: Locale }) {
  const labels = copy[locale];
  const logoSrc = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/brand/fichr_logo.svg`;
  const href = (slug: string) => `/${locale}/${slug}`;
  return (
    <footer className="site-footer site-footer--pages">
      <div className="footer-main">
        <Link href={`/${locale}`} aria-label="Fichr — Accueil"><Image src={logoSrc} alt="Fichr" width={112} height={42} /></Link>
        <p>{labels.line}</p>
        <nav aria-label="Pied de page">
          <Link href={href("produit")}>{labels.product}</Link><Link href={href("cas-usage")}>{labels.useCases}</Link><Link href={href("tarifs")}>{labels.pricing}</Link><Link href={href("a-propos")}>{labels.about}</Link>
        </nav>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Fichr</span>
        <span>{labels.draft}</span>
        <nav aria-label="Informations juridiques"><Link href={href("mentions-legales")}>{labels.legal}</Link><Link href={href("confidentialite")}>{labels.privacy}</Link><Link href={href("accessibilite")}>{labels.a11y}</Link></nav>
      </div>
    </footer>
  );
}
