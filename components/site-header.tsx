"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { localeNames, locales, type Locale } from "../content/locales";

const labels = {
  fr: { nav: "Navigation principale", product: "Produit", useCases: "Cas d’usage", pricing: "Tarifs", security: "Sécurité", demo: "Démonstration", beta: "Accès bêta", menu: "Ouvrir le menu", close: "Fermer le menu", language: "Langue" },
  en: { nav: "Main navigation", product: "Product", useCases: "Use cases", pricing: "Pricing", security: "Security", demo: "Demonstration", beta: "Beta access", menu: "Open menu", close: "Close menu", language: "Language" },
  de: { nav: "Hauptnavigation", product: "Produkt", useCases: "Anwendungsfälle", pricing: "Preise", security: "Sicherheit", demo: "Demonstration", beta: "Beta-Zugang", menu: "Menü öffnen", close: "Menü schließen", language: "Sprache" },
  es: { nav: "Navegación principal", product: "Producto", useCases: "Casos de uso", pricing: "Precios", security: "Seguridad", demo: "Demostración", beta: "Acceso beta", menu: "Abrir menú", close: "Cerrar menú", language: "Idioma" },
  pt: { nav: "Navegação principal", product: "Produto", useCases: "Casos de utilização", pricing: "Preços", security: "Segurança", demo: "Demonstração", beta: "Acesso beta", menu: "Abrir menu", close: "Fechar menu", language: "Idioma" },
  it: { nav: "Navigazione principale", product: "Prodotto", useCases: "Casi d’uso", pricing: "Prezzi", security: "Sicurezza", demo: "Dimostrazione", beta: "Accesso beta", menu: "Apri menu", close: "Chiudi menu", language: "Lingua" },
} satisfies Record<Locale, Record<string, string>>;

export function SiteHeader({ locale }: { locale: Locale }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const copy = labels[locale];
  const logoSrc = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/brand/fichr_logo.svg`;
  const href = (slug = "") => `/${locale}${slug ? `/${slug}` : ""}`;

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    const close = () => setMenuOpen(false);
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      close();
      menuButtonRef.current?.focus();
    };
    const closeOutside = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) close();
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOutside);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeOutside);
    };
  }, [menuOpen]);

  const nav = (
    <>
      <Link href={href("produit")} onClick={() => setMenuOpen(false)}>{copy.product}</Link>
      <Link href={href("cas-usage")} onClick={() => setMenuOpen(false)}>{copy.useCases}</Link>
      <Link href={href("securite")} onClick={() => setMenuOpen(false)}>{copy.security}</Link>
      <Link href={href("tarifs")} onClick={() => setMenuOpen(false)}>{copy.pricing}</Link>
    </>
  );

  return (
    <header className="site-header site-header--pages" ref={headerRef}>
      <Link className="brand-link" href={href()} aria-label="Fichr — Accueil">
        <Image src={logoSrc} alt="Fichr" width={130} height={50} priority />
      </Link>
      <nav className="desktop-nav" aria-label={copy.nav}>{nav}</nav>
      <div className="header-actions">
        <Link className="text-action" href={href("demo")}>{copy.demo}</Link>
        <Link className="button button--dark button--compact" href={href("acces-beta")}>{copy.beta}</Link>
        <details className="language-picker">
          <summary aria-label={copy.language}>{locale.toUpperCase()}</summary>
          <div>{locales.map((item) => <Link href={`/${item}`} hrefLang={item} key={item} lang={item}>{localeNames[item]}</Link>)}</div>
        </details>
      </div>
      <button
        className="menu-toggle"
        ref={menuButtonRef}
        type="button"
        aria-controls="locale-mobile-nav"
        aria-expanded={menuOpen}
        aria-label={menuOpen ? copy.close : copy.menu}
        onClick={() => setMenuOpen((value) => !value)}
      ><span /><span /></button>
      <nav id="locale-mobile-nav" className={menuOpen ? "mobile-nav mobile-nav--open" : "mobile-nav"} aria-label={copy.nav}>
        {nav}
        <Link className="button button--dark" href={href("acces-beta")} onClick={() => setMenuOpen(false)}>{copy.beta}</Link>
        <div className="mobile-languages" aria-label={copy.language}>{locales.map((item) => <Link className={item === locale ? "is-current" : ""} href={`/${item}`} key={item}>{item.toUpperCase()}</Link>)}</div>
      </nav>
    </header>
  );
}
