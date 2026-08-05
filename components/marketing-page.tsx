import Link from "next/link";
import { BetaRequestForm } from "./beta-request-form";
import { availabilityLabels, businessPrice, plans } from "../content/product-truth";
import type { Locale } from "../content/locales";
import type { SitePage } from "../content/site-pages";
import { getSitePage } from "../content/site-pages";

const shared = {
  fr: { current: "Ce qui est réel aujourd’hui", boundary: "Limite assumée", local: "Les données de production restent dans un SQLite local sur l’appareil. Le site public n’y accède pas.", noLive: "Les connexions directes, synchronisations live, webhooks et l’API publique restent prévues, pas disponibles.", next: "Voir le produit", beta: "Préparer mon accès", preparation: "Version préparatoire", form: "Réception sécurisée en préparation", formText: "La page et ses contrôles sont prêts. L’envoi reste volontairement désactivé tant qu’un récepteur sécurisé séparé du site public n’est pas configuré.", homeTitle: "Une donnée produit fiable, du fichier à l’export.", homeSummary: "Fichr remet une source locale maîtrisée au centre de vos catalogues, puis vous aide à vérifier chaque sortie." },
  en: { current: "What is real today", boundary: "Clear boundary", local: "Production data stays in local SQLite on the device. The public site cannot access it.", noLive: "Direct connections, live sync, webhooks and the public API are planned, not available.", next: "View the product", beta: "Prepare beta access", preparation: "Draft version", form: "Secure receiver in preparation", formText: "The page and controls are ready. Submission remains disabled until a secure receiver, separate from the public site, is configured.", homeTitle: "Reliable product data, from file to export.", homeSummary: "Fichr puts a controlled local source at the centre of your catalogues and helps you verify every output." },
  de: { current: "Was heute wirklich funktioniert", boundary: "Klare Grenze", local: "Produktionsdaten bleiben lokal in SQLite auf dem Gerät. Die öffentliche Website hat keinen Zugriff.", noLive: "Direkte Verbindungen, Live-Sync, Webhooks und öffentliche API sind geplant, nicht verfügbar.", next: "Produkt ansehen", beta: "Beta-Zugang vorbereiten", preparation: "Vorbereitende Fassung", form: "Sicherer Empfänger in Vorbereitung", formText: "Seite und Prüfungen sind bereit. Der Versand bleibt deaktiviert, bis ein sicherer, getrennter Empfänger konfiguriert ist.", homeTitle: "Verlässliche Produktdaten – von der Datei bis zum Export.", homeSummary: "Fichr stellt eine kontrollierte lokale Quelle ins Zentrum Ihrer Kataloge und hilft, jede Ausgabe zu prüfen." },
  es: { current: "Lo que ya es real", boundary: "Límite claro", local: "Los datos de producción permanecen en SQLite local en el dispositivo. El sitio público no accede a ellos.", noLive: "Conexiones directas, sincronización, webhooks y API pública están previstos, no disponibles.", next: "Ver el producto", beta: "Preparar acceso beta", preparation: "Versión preparatoria", form: "Receptor seguro en preparación", formText: "La página y los controles están listos. El envío seguirá desactivado hasta configurar un receptor seguro separado del sitio público.", homeTitle: "Datos de producto fiables, del archivo a la exportación.", homeSummary: "Fichr sitúa una fuente local controlada en el centro de tus catálogos y ayuda a verificar cada salida." },
  pt: { current: "O que já é real", boundary: "Limite claro", local: "Os dados de produção ficam em SQLite local no dispositivo. O site público não lhes acede.", noLive: "Ligações diretas, sincronização, webhooks e API pública estão previstos, não disponíveis.", next: "Ver o produto", beta: "Preparar acesso beta", preparation: "Versão preparatória", form: "Recetor seguro em preparação", formText: "A página e os controlos estão prontos. O envio fica desativado até existir um recetor seguro separado do site público.", homeTitle: "Dados de produto fiáveis, do ficheiro à exportação.", homeSummary: "A Fichr coloca uma fonte local controlada no centro dos catálogos e ajuda a validar cada saída." },
  it: { current: "Ciò che è già reale", boundary: "Limite chiaro", local: "I dati di produzione restano in SQLite locale sul dispositivo. Il sito pubblico non vi accede.", noLive: "Connessioni dirette, sincronizzazioni live, webhook e API pubblica sono previste, non disponibili.", next: "Vedi il prodotto", beta: "Prepara accesso beta", preparation: "Versione preparatoria", form: "Ricevitore sicuro in preparazione", formText: "La pagina e i controlli sono pronti. L’invio resta disattivato finché non viene configurato un ricevitore sicuro separato dal sito pubblico.", homeTitle: "Dati prodotto affidabili, dal file all’esportazione.", homeSummary: "Fichr mette una fonte locale controllata al centro dei cataloghi e aiuta a verificare ogni output." },
} satisfies Record<Locale, Record<string, string>>;

const pricingCopy = {
  fr: { month: "/ mois", descriptions: ["Le socle utile pour structurer et fiabiliser un premier catalogue.", "Le niveau de distribution prévu pour plusieurs marques et destinations.", "Le niveau d’intégration et d’automatisation prévu pour les flux complexes.", "Cadrage et accompagnement prévus sur mesure."], features: [["Imports CSV, XLSX et JSON", "Audit, validation, images et fichiers", "Exports TXT, CSV, XLSX, JSON et PDF", "Canal Shopify sous forme de fichier"], ["Tout le socle Starter", "Diagnostics avancés par destination", "Connexions directes standards", "API en lecture et flux hébergés"], ["Tout le socle Starter", "Suggestions IA ciblées", "Mappings personnalisés", "API complète, webhooks et automatisations"]] },
  en: { month: "/ month", descriptions: ["The useful foundation for structuring and checking a first catalogue.", "The planned distribution level for several brands and destinations.", "The planned integration and automation level for complex flows.", "Planned tailored scope and support."], features: [["CSV, XLSX and JSON imports", "Audit, approval, images and files", "TXT, CSV, XLSX, JSON and PDF exports", "Shopify channel as a file"], ["Everything in Starter", "Advanced destination diagnostics", "Standard direct connections", "Read API and hosted feeds"], ["Everything in Starter", "Targeted AI suggestions", "Custom mappings", "Full API, webhooks and automation"]] },
  de: { month: "/ Monat", descriptions: ["Die Grundlage für einen ersten strukturierten und geprüften Katalog.", "Die geplante Verteilungsebene für mehrere Marken und Ziele.", "Die geplante Integrations- und Automatisierungsebene für komplexe Abläufe.", "Geplanter individueller Rahmen und Support."], features: [["CSV-, XLSX- und JSON-Importe", "Audit, Freigabe, Bilder und Dateien", "TXT-, CSV-, XLSX-, JSON- und PDF-Exporte", "Shopify-Kanal als Datei"], ["Alles aus Starter", "Erweiterte Ziel-Diagnosen", "Direkte Standardverbindungen", "Lese-API und gehostete Feeds"], ["Alles aus Starter", "Gezielte KI-Vorschläge", "Individuelle Mappings", "Vollständige API, Webhooks und Automatisierung"]] },
  es: { month: "/ mes", descriptions: ["La base útil para estructurar y revisar un primer catálogo.", "El nivel de distribución previsto para varias marcas y destinos.", "El nivel de integración y automatización previsto para flujos complejos.", "Alcance y acompañamiento a medida previstos."], features: [["Importación CSV, XLSX y JSON", "Auditoría, validación, imágenes y archivos", "Exportación TXT, CSV, XLSX, JSON y PDF", "Canal Shopify mediante archivo"], ["Todo Starter", "Diagnóstico avanzado por destino", "Conexiones directas estándar", "API de lectura y feeds alojados"], ["Todo Starter", "Sugerencias IA dirigidas", "Mapeos personalizados", "API completa, webhooks y automatizaciones"]] },
  pt: { month: "/ mês", descriptions: ["A base útil para estruturar e validar um primeiro catálogo.", "O nível de distribuição previsto para várias marcas e destinos.", "O nível de integração e automação previsto para fluxos complexos.", "Enquadramento e acompanhamento personalizados previstos."], features: [["Importações CSV, XLSX e JSON", "Auditoria, validação, imagens e ficheiros", "Exportações TXT, CSV, XLSX, JSON e PDF", "Canal Shopify por ficheiro"], ["Tudo do Starter", "Diagnósticos avançados por destino", "Ligações diretas standard", "API de leitura e feeds alojados"], ["Tudo do Starter", "Sugestões IA direcionadas", "Mapeamentos personalizados", "API completa, webhooks e automações"]] },
  it: { month: "/ mese", descriptions: ["La base utile per strutturare e verificare un primo catalogo.", "Il livello di distribuzione previsto per più marchi e destinazioni.", "Il livello di integrazione e automazione previsto per flussi complessi.", "Ambito e supporto su misura previsti."], features: [["Importazioni CSV, XLSX e JSON", "Audit, approvazione, immagini e file", "Esportazioni TXT, CSV, XLSX, JSON e PDF", "Canale Shopify tramite file"], ["Tutto Starter", "Diagnostica avanzata per destinazione", "Connessioni dirette standard", "API di lettura e feed ospitati"], ["Tutto Starter", "Suggerimenti IA mirati", "Mappature personalizzate", "API completa, webhook e automazioni"]] },
} satisfies Record<Locale, { month: string; descriptions: [string, string, string, string]; features: [string[], string[], string[]] }>;

function Status({ page, locale }: { page: SitePage; locale: Locale }) {
  const label = locale === "fr" ? availabilityLabels[page.status] : page.status === "available" ? "Available" : page.status === "beta" ? "Private beta" : page.status === "planned" ? "Planned" : "To confirm";
  return <span className={`availability-badge availability-badge--${page.status}`}>{label}</span>;
}

export function LocaleHome({ locale }: { locale: Locale }) {
  const copy = shared[locale];
  return (
    <main id="content" className="inside-page" lang={locale}>
      <section className="inside-hero inside-hero--home">
        <div><span className="availability"><i /> Fichr · local-first</span><h1>{copy.homeTitle}</h1><p>{copy.homeSummary}</p><div className="inside-actions"><Link className="button button--dark" href={`/${locale}/produit`}>{copy.next} →</Link><Link className="text-action" href={`/${locale}/demo`}>Demo</Link></div></div>
        <div className="data-route" aria-label="Fichr workflow"><span>CSV · XLSX · JSON</span><b>Fichr</b><span>TXT · CSV · XLSX · JSON · PDF</span></div>
      </section>
      <section className="inside-section inside-grid"><div><p className="section-kicker">{copy.current}</p><h2>SQLite local.<br />Validation humaine.</h2></div><div className="truth-panel"><p>{copy.local}</p><p>{copy.noLive}</p></div></section>
      <section className="page-cta"><p className="section-kicker">Bêta privée</p><h2>{copy.beta}</h2><Link className="button button--dark" href={`/${locale}/acces-beta`}>{copy.beta} →</Link></section>
    </main>
  );
}

export function MarketingPage({ page, locale }: { page: SitePage; locale: Locale }) {
  const copy = shared[locale];
  const isConversion = page.kind === "conversion";
  const isLegal = page.kind === "legal";
  const hasPreparedForm = page.slug === "acces-beta" || page.slug === "contact";
  return (
    <main id="content" className="inside-page" lang={locale}>
      <section className="inside-hero">
        <div><Status page={page} locale={locale} /><p className="page-slug">Fichr / {page.slug}</p><h1>{page.title[locale]}</h1><p>{page.summary[locale]}</p></div>
        <aside><span>SQLite</span><strong>Local-first</strong><small>CSV · XLSX · JSON → TXT · CSV · XLSX · JSON · PDF</small></aside>
      </section>

      {page.slug === "tarifs" ? <Pricing locale={locale} /> : null}

      <section className="inside-section">
        <div className="section-heading"><p className="section-kicker">{isLegal ? copy.preparation : copy.current}</p><h2>{page.title[locale]}</h2></div>
        <div className="page-points">{page.points.map((point, index) => <article key={point.fr}><span>0{index + 1}</span><p>{point[locale]}</p></article>)}</div>
      </section>

      {page.slug === "produit" ? <RelatedPages locale={locale} slugs={["imports", "catalogue", "audit", "fichiers", "exports", "securite", "intelligence-assistee", "direction-artistique"]} /> : null}
      {page.slug === "cas-usage" ? <RelatedPages locale={locale} slugs={["fabricants", "distributeurs", "studios", "artisans"]} /> : null}

      {!isLegal ? <section className="boundary-section"><div><p className="section-kicker">{copy.boundary}</p><h2>Local ≠ cloud.</h2></div><div><p>{copy.local}</p><p>{copy.noLive}</p></div></section> : null}

      {isConversion ? <section className={hasPreparedForm ? "receiver-panel receiver-panel--form" : "receiver-panel"} aria-labelledby="receiver-title"><span aria-hidden="true">↳</span><div><p className="section-kicker">{copy.preparation}</p><h2 id="receiver-title">{copy.form}</h2><p>{copy.formText}</p>{hasPreparedForm ? <BetaRequestForm locale={locale} /> : null}</div>{!hasPreparedForm ? <button className="button button--dark" type="button" disabled>{copy.form}</button> : null}</section> : null}

      {!isLegal && !isConversion ? <section className="page-cta"><p className="section-kicker">Fichr</p><h2>{copy.beta}</h2><div className="inside-actions"><Link className="button button--dark" href={`/${locale}/acces-beta`}>{copy.beta} →</Link><Link className="text-action" href={`/${locale}/produit`}>{copy.next}</Link></div></section> : null}
    </main>
  );
}

function RelatedPages({ locale, slugs }: { locale: Locale; slugs: string[] }) {
  const pages = slugs.map(getSitePage).filter((page): page is SitePage => Boolean(page));
  return (
    <section className="related-pages" aria-label="Related pages">
      {pages.map((page, index) => <Link href={`/${locale}/${page.slug}`} key={page.slug}><span>{String(index + 1).padStart(2, "0")}</span><h2>{page.title[locale]}</h2><p>{page.summary[locale]}</p><i aria-hidden="true">→</i></Link>)}
    </section>
  );
}

function Pricing({ locale }: { locale: Locale }) {
  const copy = pricingCopy[locale];
  return (
    <section className="inside-pricing" aria-label="Pricing">
      {plans.map((plan, planIndex) => <article key={plan.name}><span className="plan-name">{plan.name}</span><strong>{plan.price} €</strong><small>{copy.month}</small><p>{copy.descriptions[planIndex]}</p><ul>{plan.features.map((feature, featureIndex) => <li key={feature.label}><span className={`dot dot--${feature.status}`} />{copy.features[planIndex][featureIndex]}</li>)}</ul></article>)}
      <article><span className="plan-name">Business</span><strong>{businessPrice} €</strong><small>{copy.month}</small><p>{copy.descriptions[3]}</p></article>
    </section>
  );
}
