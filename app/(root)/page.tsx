"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  availabilityLabels,
  businessPrice,
  plans,
  type Availability,
} from "../../content/product-truth";
import { localeNames, locales } from "../../content/locales";

const sourceFormats = ["CSV", "XLSX", "JSON"];
const outputFormats = ["TXT", "CSV", "XLSX", "JSON", "PDF"];

const features = [
  {
    number: "01",
    title: "Importez",
    text: "Déposez vos fichiers CSV, XLSX ou JSON. Fichr propose le mapping, repère les lignes à vérifier et conserve l’origine de chaque donnée.",
    detail: "Mapping réutilisable",
  },
  {
    number: "02",
    title: "Validez",
    text: "Nettoyez, enrichissez et contrôlez les fiches dans un catalogue partagé. Les champs manquants et les incohérences deviennent des actions claires.",
    detail: "Audit produit intégré",
  },
  {
    number: "03",
    title: "Diffusez",
    text: "Exportez des fichiers propres et des PDF cohérents. Chaque sortie part de la même source validée, sans copier-coller ni version parallèle.",
    detail: "Exports traçables",
  },
];

function Arrow({ direction = "right" }: { direction?: "right" | "down" }) {
  return <span aria-hidden="true">{direction === "right" ? "→" : "↓"}</span>;
}

function AvailabilityBadge({ status }: { status: Availability }) {
  return <span className={`availability-badge availability-badge--${status}`}>{availabilityLabels[status]}</span>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const logoSrc = `${basePath}/brand/fichr_logo.svg`;
  const pageHref = (slug: string) => `${basePath}/fr/${slug}`;

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      menuButtonRef.current?.focus();
    };
    const closeOutside = (event: PointerEvent) => {
      if (headerRef.current?.contains(event.target as Node)) return;
      setMenuOpen(false);
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

  return (
    <>
      <a className="skip-link" href="#content">Aller au contenu</a>

      <header className="site-header" ref={headerRef}>
        <a className="brand-link" href="#top" aria-label="Fichr — Accueil">
          <Image src={logoSrc} alt="Fichr" width={130} height={50} priority />
        </a>

        <nav className="desktop-nav" aria-label="Navigation principale">
          <a href={pageHref("demo")}>Démonstration</a>
          <a href={pageHref("produit")}>Produit</a>
          <a href={pageHref("securite")}>Sécurité</a>
          <a href={pageHref("tarifs")}>Tarifs</a>
        </nav>

        <div className="header-actions">
          <a className="text-action" href={pageHref("demo")}>Voir la démo</a>
          <a className="button button--dark button--compact" href={pageHref("acces-beta")}>Accès bêta</a>
          <details className="language-picker"><summary aria-label="Langue">FR</summary><div>{locales.map((locale) => <a href={`${basePath}/${locale}/`} hrefLang={locale} lang={locale} key={locale}>{localeNames[locale]}</a>)}</div></details>
        </div>

        <button
          className="menu-toggle"
          ref={menuButtonRef}
          type="button"
          aria-controls="mobile-nav"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span /><span />
        </button>

        <nav id="mobile-nav" className={menuOpen ? "mobile-nav mobile-nav--open" : "mobile-nav"} aria-label="Navigation mobile">
          <a href={pageHref("demo")} onClick={() => setMenuOpen(false)}>Démonstration</a>
          <a href={pageHref("produit")} onClick={() => setMenuOpen(false)}>Produit</a>
          <a href={pageHref("securite")} onClick={() => setMenuOpen(false)}>Sécurité</a>
          <a href={pageHref("tarifs")} onClick={() => setMenuOpen(false)}>Tarifs</a>
          <a className="button button--dark" href={pageHref("acces-beta")} onClick={() => setMenuOpen(false)}>Accès bêta</a>
          <div className="mobile-languages" aria-label="Langue">{locales.map((locale) => <a className={locale === "fr" ? "is-current" : ""} href={`${basePath}/${locale}/`} key={locale}>{locale.toUpperCase()}</a>)}</div>
        </nav>
      </header>

      <main id="content">
        <section className="hero" id="top">
          <div className="hero-copy">
            <div className="availability"><span /> Bêta privée</div>
            <h1>Vos données produit, prêtes à être vues.</h1>
            <p>
              Fichr transforme vos fichiers en fiches fiables, prêtes pour vos catalogues, vos exports et vos fichiers de diffusion.
            </p>
            <div className="hero-actions">
              <a className="button button--dark" href={pageHref("demo")}>Voir la démonstration <Arrow /></a>
              <a className="text-action" href={pageHref("tarifs")}>Découvrir les plans bêta <Arrow /></a>
            </div>
          </div>

          <div className="product-window" aria-label="Aperçu statique du catalogue Fichr avec des données de démonstration">
            <div className="window-header">
              <Image src={logoSrc} alt="" width={84} height={32} />
              <div className="window-nav"><span>Imports</span><b>Catalogue</b><span>Exports</span></div>
              <span className="window-avatar">FA</span>
            </div>
            <div className="window-content">
              <div className="window-title">
                <div><small>CATALOGUE</small><strong>Produits</strong><span>Retrouvez, contrôlez et préparez toutes vos fiches.</span></div>
                <span className="window-button">+ Nouvelle fiche</span>
              </div>

              <div className="metrics-card">
                <div><strong>1 248</strong><span>Produits</span></div>
                <div><strong>87</strong><span>À compléter</span></div>
                <div><strong>1 098</strong><span>Prêts</span></div>
                <div><strong>63</strong><span>Validés</span></div>
              </div>

              <div className="catalog-toolbar">
                <div className="fake-search">Rechercher une référence</div>
                <span>Toutes les catégories</span><span>Tous les statuts</span><i>▦</i>
              </div>

              <div className="catalog-cards">
                <article>
                  <div className="product-thumb product-thumb--valve"><i /><i /><i /></div>
                  <div className="product-info"><span className="status status--ready">Prêt</span><strong className="product-name">Vanne inox V42</strong><p>VIN-V42-040 · Industrie</p><div className="completion"><span><i style={{ width: "94%" }} /></span><b>94%</b></div></div>
                </article>
                <article>
                  <div className="product-thumb product-thumb--panel"><i /><i /><i /></div>
                  <div className="product-info"><span className="status status--warning">À compléter</span><strong className="product-name">Panneau AP-6</strong><p>AP6-GR-120 · Acoustique</p><div className="completion"><span><i style={{ width: "68%" }} /></span><b>68%</b></div></div>
                </article>
                <article className="catalog-card--third">
                  <div className="product-thumb product-thumb--light"><i /><i /></div>
                  <div className="product-info"><span className="status status--ready">Validé</span><strong className="product-name">Module LED L8</strong><p>L8-3000K-B · Éclairage</p><div className="completion"><span><i style={{ width: "100%" }} /></span><b>100%</b></div></div>
                </article>
              </div>
            </div>
            <div className="audit-toast"><span>✓</span><div><b>Audit terminé</b><small>1 248 produits contrôlés</small></div></div>
            <p className="demo-label">Interface et données présentées à titre illustratif.</p>
          </div>

          <div className="format-flow" aria-label="Formats pris en charge">
            <div><small>ENTRÉES</small>{sourceFormats.map((format) => <span key={format}>{format}</span>)}</div>
            <i><Arrow /></i>
            <div><small>SORTIES</small>{outputFormats.map((format) => <span key={format}>{format}</span>)}</div>
          </div>
        </section>

        <section className="intro section-shell">
          <p className="section-kicker">Le problème</p>
          <div>
            <h2>Un produit change.<br />Cinq fichiers deviennent faux.</h2>
            <p>
              Tableurs, dossiers d’images, catalogues PDF, fiches revendeurs : l’information se disperse vite. Fichr remet une source structurée au centre, puis vous aide à la garder juste.
            </p>
          </div>
        </section>

        <section className="workflow" id="fonctionnement">
          <div className="section-shell">
            <div className="section-heading">
              <p className="section-kicker">Comment ça marche</p>
              <h2>Un flux simple.<br />Une donnée maîtrisée.</h2>
            </div>
            <div className="feature-grid">
              {features.map((feature) => (
                <article key={feature.number}>
                  <span className="feature-number">{feature.number}</span>
                  <div className={`feature-visual feature-visual--${feature.number}`} aria-hidden="true">
                    {feature.number === "01" ? (
                      <><div className="import-sheet"><b>produits_2026.xlsx</b><span>248 lignes reconnues</span></div><div className="mapping-row"><span>Référence</span><i>→</i><b>SKU</b></div><div className="mapping-row"><span>Prix public</span><i>→</i><b>Prix TTC</b></div><div className="mapping-row"><span>Photo 1</span><i>→</i><b>Image principale</b></div></>
                    ) : feature.number === "02" ? (
                      <><div className="score-ring"><strong>92</strong><span>%</span></div><ul className="audit-list"><li><i>✓</i> Références uniques</li><li><i>✓</i> Prix cohérents</li><li className="audit-warning"><i>!</i> 4 images à compléter</li></ul></>
                    ) : (
                      <><div className="output-file"><span>PDF</span><div><b>Catalogue 2026</b><small>Prêt · 18,4 Mo</small></div><i>↓</i></div><div className="output-file"><span>CSV</span><div><b>Tarifs France</b><small>Prêt · 280 Ko</small></div><i>↓</i></div><div className="output-file"><span>JSON</span><div><b>Archive complète</b><small>Prêt · 4,1 Mo</small></div><i>↓</i></div></>
                    )}
                  </div>
                  <div className="feature-copy"><small>{feature.detail}</small><h3>{feature.title}</h3><p>{feature.text}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="product-proof" id="produit">
          <div className="section-shell product-proof-grid">
            <div className="proof-copy">
              <p className="section-kicker section-kicker--light">Le catalogue vivant</p>
              <h2>La bonne information.<br />Au bon endroit.</h2>
              <p>Chaque fiche réunit le contenu, les fichiers, le statut et l’historique dont vos équipes ont besoin. Une modification reste visible, contrôlable et réutilisable.</p>
              <ul>
                <li><span>01</span>Attributs adaptés à la catégorie</li>
                <li><span>02</span>Images et documents liés au produit</li>
                <li><span>03</span>Validation avant chaque export</li>
                <li><span>04</span>Espaces séparés par marque ou activité</li>
              </ul>
            </div>

            <div className="sheet-stack" aria-label="Exemple de fiche produit statique">
              <div className="sheet-card sheet-card--back"><span>Historique</span><b>6 versions</b></div>
              <div className="sheet-card sheet-card--middle"><span>Fichiers</span><b>12 éléments</b></div>
              <article className="product-sheet">
                <header><Image src={logoSrc} alt="" width={66} height={24} /><span>FICHE PRODUIT / 00142</span></header>
                <div className="sheet-product">
                  <div className="large-valve" aria-hidden="true"><i /><i /><i /></div>
                  <div><span className="status status--ready">Fiche validée</span><h3>Vanne inox V42</h3><p>Commande manuelle · DN40 · Série industrie</p></div>
                </div>
                <dl>
                  <div><dt>Référence</dt><dd>VIN-V42-040</dd></div>
                  <div><dt>Matière</dt><dd>Acier inoxydable 316L</dd></div>
                  <div><dt>Pression</dt><dd>PN 40</dd></div>
                  <div><dt>Température</dt><dd>−20 °C à +180 °C</dd></div>
                  <div><dt>Disponibilité</dt><dd>En stock</dd></div>
                </dl>
                <footer><span>Données de démonstration</span><b>100% complète</b></footer>
              </article>
            </div>
          </div>
        </section>

        <section className="capabilities section-shell">
          <div className="section-heading section-heading--split">
            <div><p className="section-kicker">Tout ce qui compte</p><h2>Solide dans les détails.</h2></div>
            <p>Fichr ne cache pas la donnée derrière une promesse magique. Il vous donne une méthode claire pour la préparer, la contrôler et la sortir proprement.</p>
          </div>
          <div className="capability-grid">
            {[
              ["Formats", "CSV, XLSX et JSON à l’import. TXT, CSV, XLSX, JSON et PDF à l’export."],
              ["Catégories", "Des champs adaptés au type de produit, sans transformer chaque fiche en formulaire infini."],
              ["Contrôle", "Doublons potentiels, données manquantes et complétude visibles avant la publication."],
              ["Fichiers", "Images, notices et documents réunis avec la fiche qui les utilise."],
              ["Espaces", "Des collections distinctes pour séparer marques, activités ou catalogues."],
              ["Historique", "L’origine des imports, les validations et les sorties restent traçables."],
            ].map(([title, text], index) => (
              <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>
            ))}
          </div>
        </section>

        <section className="assistance">
          <div className="section-shell assistance-grid">
            <div>
              <p className="section-kicker">Assistance contrôlée</p>
              <h2>Fichr propose.<br />Vous validez.</h2>
              <p>Les suggestions aident à classer, normaliser ou compléter. Elles restent visibles, explicables et réversibles. Rien ne remplace silencieusement vos données.</p>
            </div>
            <div className="suggestion-card">
              <header><span>Suggestion</span><small>Validation requise</small></header>
              <div className="suggestion-body"><span className="spark">✦</span><div><small>CATÉGORIE PROPOSÉE</small><h3>Robinetterie industrielle</h3><p>Déduite de « vanne », « PN 40 » et « inox 316L ».</p></div></div>
              <div className="suggestion-reasons"><span>3 indices utilisés</span><span>Validation humaine requise</span></div>
              <footer aria-hidden="true"><span>Ignorer</span><span>Appliquer</span></footer>
            </div>
          </div>
        </section>

        <section className="security section-shell" id="securite">
          <div className="security-heading"><p className="section-kicker">Confiance</p><h2>Vos données restent les vôtres.</h2></div>
          <div className="security-grid">
            <article><span>01</span><h3>Production sur l’appareil</h3><p>Chaque utilisateur conserve ses données de production dans une base SQLite locale générée sur son appareil.</p></article>
            <article><span>02</span><h3>Socle central séparé</h3><p>Les comptes et données client sensibles relèveront d’une infrastructure distincte, opérée par Fichr et non du site public.</p></article>
            <article><span>03</span><h3>Actions traçables</h3><p>Imports, validations et exports gardent une origine lisible pour vos équipes.</p></article>
            <article><span>04</span><h3>Contrôle explicite</h3><p>Les connexions externes et fonctions intelligentes restent désactivables et documentées.</p></article>
          </div>
        </section>

        <section className="product-worlds section-shell" aria-labelledby="product-worlds-title">
          <div className="section-heading section-heading--split">
            <div><p className="section-kicker">Même méthode, différents métiers</p><h2 id="product-worlds-title">La donnée avant le décor.</h2></div>
            <p>Pièce industrielle, matière artisanale ou collection expressive : Fichr structure les informations sans imposer une esthétique aux produits.</p>
          </div>
          <div className="product-worlds-grid">
            <figure><Image src={`${basePath}/images/industrial-valve.webp`} alt="Vanne industrielle en acier photographiée sur fond neutre" width={1200} height={900} unoptimized /><figcaption>Industrie · références et caractéristiques</figcaption></figure>
            <figure><Image src={`${basePath}/images/craft-materials.webp`} alt="Échantillons de céramique et de lin sur une table claire" width={1200} height={900} unoptimized /><figcaption>Artisanat · matières et variantes</figcaption></figure>
            <figure><Image src={`${basePath}/images/expressive-materials.webp`} alt="Composition de panneaux acoustiques jaunes et noirs avec quincaillerie" width={1200} height={900} unoptimized /><figcaption>Collection · images et cohérence</figcaption></figure>
          </div>
        </section>

        <section className="pricing" id="tarifs">
          <div className="section-shell">
            <div className="section-heading section-heading--split">
              <div><p className="section-kicker">Tarifs</p><h2>Commencez simplement.</h2></div>
              <p>Les prix sont confirmés pour cette phase. Les fonctions de connectivité restent en développement : chaque capacité est donc marquée selon son état réel.</p>
            </div>
            <div className="pricing-grid">
              {plans.map((plan) => (
                <article className={plan.featured ? "plan plan--featured" : "plan"} key={plan.name}>
                  {plan.featured ? <span className="plan-badge">Cible de distribution</span> : null}
                  <div className="plan-title"><h3>{plan.name}</h3><AvailabilityBadge status={plan.availability} /></div><p>{plan.description}</p>
                  <div className="price"><strong>{plan.price} €</strong><span>/ mois à l’ouverture</span></div>
                  <b className="product-limit">{plan.products}</b>
                  <ul>{plan.features.map((item) => <li key={item.label}><AvailabilityBadge status={item.status} />{item.label}</li>)}</ul>
                  <a className={plan.featured ? "button button--dark" : "button button--light"} href="#contact">Demander des nouvelles de {plan.name}</a>
                </article>
              ))}
            </div>
            <p className="business-note"><b>Business · {businessPrice} € / mois</b> — cadrage, quotas et accompagnement prévus sur mesure. Aucun connecteur direct n’est annoncé comme disponible.</p>
          </div>
        </section>

        <section className="faq section-shell">
          <div><p className="section-kicker">Questions</p><h2>Avant de vous lancer.</h2></div>
          <div className="faq-list">
            <details open><summary>Fichr remplace-t-il mon PIM ?<span>+</span></summary><p>Fichr peut servir de source produit pour les structures qui n’ont pas de PIM, ou de couche de préparation et de contrôle entre vos données existantes et vos supports.</p></details>
            <details><summary>Puis-je importer mes fichiers actuels ?<span>+</span></summary><p>Oui. Fichr prend actuellement en charge les imports CSV, XLSX et JSON avec mapping et revue des lignes avant intégration.</p></details>
            <details><summary>Les connexions aux plateformes sont-elles actives ?<span>+</span></summary><p>Non. Les exports de fichiers et les presets de préparation sont disponibles, dont l’import et l’export Shopify CSV. Les synchronisations live, OAuth, API Fichr, feeds hébergés et webhooks ne sont pas encore activés.</p></details>
            <details><summary>Où sont stockées mes données ?<span>+</span></summary><p>Les données de production restent dans un SQLite local sur votre appareil. Les comptes et données client sensibles seront séparés sur une infrastructure opérée par Fichr ; le site marketing n’héberge ni catalogue ni données de production.</p></details>
          </div>
        </section>

        <section className="final-cta" id="contact">
          <Image src={logoSrc} alt="Fichr" width={132} height={50} />
          <div><p className="section-kicker">Bêta privée</p><h2>Vous gardez les choix.<br />Fichr prend en charge la méthode.</h2></div>
          <div className="final-contact"><p>Le canal de réception des demandes est en cours de validation. La page d’accès est prête, mais aucune coordonnée n’est encore collectée.</p><a className="button button--dark" href={pageHref("acces-beta")}>Préparer mon accès</a></div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-main">
          <Image src={logoSrc} alt="Fichr" width={112} height={42} />
          <p>Structurez. Validez. Publiez.</p>
          <nav aria-label="Pied de page"><a href={pageHref("demo")}>Démonstration</a><a href={pageHref("produit")}>Produit</a><a href={pageHref("securite")}>Sécurité</a><a href={pageHref("tarifs")}>Plans bêta</a></nav>
        </div>
        <div className="footer-bottom"><span>© 2026 Fichr</span><span>Documents juridiques en préparation.</span><a href={pageHref("mentions-legales")}>Mentions légales</a></div>
      </footer>
    </>
  );
}
