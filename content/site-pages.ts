import type { Availability } from "./product-truth";
import type { Locale } from "./locales";

export type LocalizedText = Record<Locale, string>;

export type PageKind = "overview" | "capability" | "use-case" | "conversion" | "legal";

export type SitePage = {
  slug: string;
  kind: PageKind;
  status: Availability;
  title: LocalizedText;
  summary: LocalizedText;
  points: [LocalizedText, LocalizedText, LocalizedText];
  noIndex?: boolean;
};

const text = (fr: string, en: string, de: string, es: string, pt: string, it: string): LocalizedText => ({ fr, en, de, es, pt, it });

const currentPoints: SitePage["points"] = [
  text("Des fichiers entrants relus avant intégration", "Incoming files reviewed before import", "Eingangsdateien werden vor dem Import geprüft", "Archivos revisados antes de importar", "Ficheiros revistos antes da importação", "File controllati prima dell’importazione"),
  text("Une validation humaine à chaque décision sensible", "Human approval for every sensitive decision", "Menschliche Freigabe bei jeder sensiblen Entscheidung", "Validación humana en cada decisión sensible", "Validação humana em cada decisão sensível", "Validazione umana per ogni decisione sensibile"),
  text("Des sorties traçables depuis une source locale", "Traceable outputs from a local source", "Nachvollziehbare Ausgaben aus einer lokalen Quelle", "Salidas trazables desde una fuente local", "Saídas rastreáveis a partir de uma fonte local", "Output tracciabili da una fonte locale"),
];

const plannedPoints: SitePage["points"] = [
  text("Cette capacité n’est pas annoncée comme active", "This capability is not advertised as active", "Diese Funktion wird nicht als aktiv beworben", "Esta capacidad no se anuncia como activa", "Esta capacidade não é anunciada como ativa", "Questa funzione non è indicata come attiva"),
  text("Le périmètre et les garanties restent à valider", "Scope and guarantees still need validation", "Umfang und Garantien müssen noch bestätigt werden", "El alcance y las garantías deben validarse", "O âmbito e as garantias ainda serão validados", "Ambito e garanzie devono ancora essere confermati"),
  text("Aucune synchronisation live n’est simulée sur ce site", "No live synchronisation is simulated on this site", "Auf dieser Website wird keine Live-Synchronisierung simuliert", "Este sitio no simula sincronización en directo", "Este site não simula sincronização em direto", "Questo sito non simula sincronizzazioni live"),
];

const legalPoints: SitePage["points"] = [
  text("Structure juridique à renseigner", "Legal entity to be completed", "Rechtsträger noch einzutragen", "Entidad jurídica pendiente", "Entidade jurídica por preencher", "Entità giuridica da completare"),
  text("Coordonnées et responsable de publication à confirmer", "Contact and publisher details to be confirmed", "Kontakt- und Herausgeberdaten sind zu bestätigen", "Datos de contacto y publicación por confirmar", "Contactos e responsável pela publicação por confirmar", "Contatti e responsabile della pubblicazione da confermare"),
  text("Publication et indexation désactivées avant validation", "Publication and indexing disabled until validation", "Veröffentlichung und Indexierung bis zur Freigabe deaktiviert", "Publicación e indexación desactivadas hasta validación", "Publicação e indexação desativadas até validação", "Pubblicazione e indicizzazione disattivate fino alla convalida"),
];

const page = (
  slug: string,
  kind: PageKind,
  status: Availability,
  title: LocalizedText,
  summary: LocalizedText,
  points: SitePage["points"] = status === "planned" ? plannedPoints : currentPoints,
  noIndex = false,
): SitePage => ({ slug, kind, status, title, summary, points, noIndex });

export const sitePages: SitePage[] = [
  page("demo", "overview", "available",
    text("Démonstration", "Demonstration", "Demonstration", "Demostración", "Demonstração", "Dimostrazione"),
    text("Un parcours statique et fidèle pour comprendre Fichr, sans connexion au logiciel local.", "A faithful static walkthrough of Fichr, with no connection to the local software.", "Ein originalgetreuer statischer Rundgang – ohne Verbindung zur lokalen Software.", "Un recorrido estático fiel, sin conexión con el software local.", "Uma demonstração estática fiel, sem ligação ao software local.", "Un percorso statico fedele, senza collegamento al software locale.")),
  page("produit", "overview", "available",
    text("Produit", "Product", "Produkt", "Producto", "Produto", "Prodotto"),
    text("Une source produit locale pour importer, structurer, contrôler et produire des fichiers fiables.", "A local product source to import, structure, check and produce reliable files.", "Eine lokale Produktquelle für Import, Struktur, Prüfung und verlässliche Dateien.", "Una fuente local para importar, estructurar, revisar y producir archivos fiables.", "Uma fonte local para importar, estruturar, validar e produzir ficheiros fiáveis.", "Una fonte locale per importare, strutturare, controllare e produrre file affidabili.")),
  page("imports", "capability", "available",
    text("Imports", "Imports", "Importe", "Importaciones", "Importações", "Importazioni"),
    text("Importez CSV, XLSX et JSON avec mapping, revue des lignes et origine conservée.", "Import CSV, XLSX and JSON with mapping, row review and retained provenance.", "CSV, XLSX und JSON mit Mapping, Zeilenprüfung und Herkunft importieren.", "Importa CSV, XLSX y JSON con mapeo, revisión y origen conservado.", "Importe CSV, XLSX e JSON com mapeamento, revisão e origem preservada.", "Importa CSV, XLSX e JSON con mappatura, revisione e origine conservata.")),
  page("catalogue", "capability", "available",
    text("Catalogue", "Catalogue", "Katalog", "Catálogo", "Catálogo", "Catalogo"),
    text("Centralisez les références, attributs, catégories, images et fichiers dans un espace local maîtrisé.", "Centralise references, attributes, categories, images and files in a controlled local workspace.", "Referenzen, Attribute, Kategorien, Bilder und Dateien lokal bündeln.", "Centraliza referencias, atributos, categorías, imágenes y archivos en local.", "Centralize referências, atributos, categorias, imagens e ficheiros localmente.", "Centralizza riferimenti, attributi, categorie, immagini e file in locale.")),
  page("audit", "capability", "available",
    text("Audit produit", "Product audit", "Produktaudit", "Auditoría de producto", "Auditoria de produto", "Audit prodotto"),
    text("Repérez les champs manquants, doublons et incohérences avec des règles lisibles.", "Find missing fields, duplicates and inconsistencies with readable rules.", "Fehlende Felder, Duplikate und Widersprüche mit lesbaren Regeln finden.", "Detecta campos ausentes, duplicados e incoherencias con reglas claras.", "Detete campos em falta, duplicados e incoerências com regras claras.", "Individua campi mancanti, duplicati e incoerenze con regole leggibili.")),
  page("fichiers", "capability", "available",
    text("Images et fichiers", "Images and files", "Bilder und Dateien", "Imágenes y archivos", "Imagens e ficheiros", "Immagini e file"),
    text("Rattachez les médias aux bonnes fiches et gardez leur provenance visible.", "Attach media to the right records and keep its provenance visible.", "Medien den richtigen Datensätzen zuordnen und ihre Herkunft sichtbar halten.", "Asocia los medios a las fichas correctas y conserva su origen visible.", "Associe os ficheiros às fichas certas e mantenha a origem visível.", "Collega i media alle schede corrette e mantieni visibile la provenienza.")),
  page("exports", "capability", "available",
    text("Exports", "Exports", "Exporte", "Exportaciones", "Exportações", "Esportazioni"),
    text("Produisez TXT, CSV, XLSX, JSON et PDF depuis les données que vous avez validées.", "Produce TXT, CSV, XLSX, JSON and PDF from data you have approved.", "TXT, CSV, XLSX, JSON und PDF aus freigegebenen Daten erzeugen.", "Genera TXT, CSV, XLSX, JSON y PDF desde datos validados.", "Produza TXT, CSV, XLSX, JSON e PDF a partir de dados validados.", "Produci TXT, CSV, XLSX, JSON e PDF dai dati approvati.")),
  page("securite", "capability", "available",
    text("Sécurité et données", "Security and data", "Sicherheit und Daten", "Seguridad y datos", "Segurança e dados", "Sicurezza e dati"),
    text("Les données de production restent dans un SQLite local ; le futur socle client sensible sera séparé.", "Production data stays in local SQLite; the future sensitive customer layer will remain separate.", "Produktionsdaten bleiben lokal in SQLite; sensible Kundendaten werden getrennt geführt.", "Los datos de producción permanecen en SQLite local; los datos sensibles irán separados.", "Os dados de produção ficam em SQLite local; os dados sensíveis ficarão separados.", "I dati di produzione restano in SQLite locale; quelli sensibili saranno separati.")),
  page("intelligence-assistee", "capability", "beta",
    text("Intelligence assistée", "Assisted intelligence", "Assistierte Intelligenz", "Inteligencia asistida", "Inteligência assistida", "Intelligenza assistita"),
    text("Des suggestions ciblées et explicables, toujours soumises à votre validation.", "Targeted, explainable suggestions that always require your approval.", "Gezielte, erklärbare Vorschläge, die immer Ihre Freigabe brauchen.", "Sugerencias explicables que siempre requieren tu validación.", "Sugestões explicáveis que exigem sempre a sua validação.", "Suggerimenti mirati e spiegabili, sempre soggetti alla tua approvazione.")),
  page("direction-artistique", "capability", "available",
    text("Direction de présentation", "Presentation direction", "Präsentationsrichtung", "Dirección de presentación", "Direção de apresentação", "Direzione di presentazione"),
    text("Préparez des contenus cohérents sans transformer Fichr en outil de mise en page ou de création graphique.", "Prepare consistent content without turning Fichr into a layout or graphic design tool.", "Konsistente Inhalte vorbereiten, ohne Fichr zum Layoutprogramm zu machen.", "Prepara contenidos coherentes sin convertir Fichr en una herramienta de diseño.", "Prepare conteúdos coerentes sem transformar Fichr numa ferramenta de design.", "Prepara contenuti coerenti senza trasformare Fichr in uno strumento grafico.")),
  page("cas-usage", "overview", "available",
    text("Cas d’usage", "Use cases", "Anwendungsfälle", "Casos de uso", "Casos de utilização", "Casi d’uso"),
    text("Des flux concrets pour les équipes qui travaillent encore entre tableurs, images et catalogues.", "Practical workflows for teams still working across spreadsheets, images and catalogues.", "Konkrete Abläufe für Teams zwischen Tabellen, Bildern und Katalogen.", "Flujos concretos para equipos entre hojas de cálculo, imágenes y catálogos.", "Fluxos concretos para equipas entre folhas de cálculo, imagens e catálogos.", "Flussi concreti per team che lavorano tra fogli, immagini e cataloghi.")),
  page("fabricants", "use-case", "available",
    text("Fabricants", "Manufacturers", "Hersteller", "Fabricantes", "Fabricantes", "Produttori"),
    text("Fiabilisez références, variantes et caractéristiques avant de livrer vos réseaux.", "Make references, variants and specifications reliable before supplying your network.", "Referenzen, Varianten und Merkmale vor der Weitergabe absichern.", "Asegura referencias, variantes y características antes de distribuir.", "Valide referências, variantes e características antes da distribuição.", "Rendi affidabili riferimenti, varianti e caratteristiche prima della distribuzione.")),
  page("distributeurs", "use-case", "available",
    text("Distributeurs", "Distributors", "Händler", "Distribuidores", "Distribuidores", "Distributori"),
    text("Réconciliez des fichiers fournisseurs hétérogènes sans perdre l’origine des informations.", "Reconcile varied supplier files without losing data provenance.", "Unterschiedliche Lieferantendateien zusammenführen, ohne Herkunft zu verlieren.", "Concilia archivos de proveedores sin perder el origen de los datos.", "Concilie ficheiros de fornecedores sem perder a origem dos dados.", "Riconcilia file fornitori diversi senza perdere la provenienza.")),
  page("studios", "use-case", "available",
    text("Studios et agences", "Studios and agencies", "Studios und Agenturen", "Estudios y agencias", "Estúdios e agências", "Studi e agenzie"),
    text("Recevez une matière produit propre avant la rédaction, le catalogue ou l’intégration.", "Receive clean product material before copywriting, catalogue work or integration.", "Saubere Produktdaten vor Text, Katalog oder Integration erhalten.", "Recibe material de producto limpio antes de redactar o maquetar.", "Receba dados de produto limpos antes da redação ou integração.", "Ricevi dati prodotto puliti prima di testi, cataloghi o integrazioni.")),
  page("artisans", "use-case", "available",
    text("Artisans et petites équipes", "Craftspeople and small teams", "Handwerk und kleine Teams", "Artesanos y equipos pequeños", "Artesãos e pequenas equipas", "Artigiani e piccoli team"),
    text("Passez de fichiers épars à un catalogue maîtrisé sans déployer un PIM lourd.", "Move from scattered files to a controlled catalogue without deploying a heavy PIM.", "Von verstreuten Dateien zum kontrollierten Katalog – ohne schweres PIM.", "Pasa de archivos dispersos a un catálogo controlado sin un PIM pesado.", "Passe de ficheiros dispersos a um catálogo controlado sem um PIM pesado.", "Passa da file sparsi a un catalogo controllato senza un PIM complesso.")),
  page("tarifs", "conversion", "beta",
    text("Tarifs", "Pricing", "Preise", "Precios", "Preços", "Prezzi"),
    text("Starter 19 €, Studio 29 €, Pro 59 € et Business 129 € par mois à l’ouverture.", "Starter €19, Studio €29, Pro €59 and Business €129 per month at launch.", "Starter 19 €, Studio 29 €, Pro 59 € und Business 129 € pro Monat zum Start.", "Starter 19 €, Studio 29 €, Pro 59 € y Business 129 € al mes en el lanzamiento.", "Starter 19 €, Studio 29 €, Pro 59 € e Business 129 € por mês no lançamento.", "Starter 19 €, Studio 29 €, Pro 59 € e Business 129 € al mese al lancio.")),
  page("a-propos", "overview", "available",
    text("À propos", "About", "Über Fichr", "Acerca de", "Sobre", "Chi siamo"),
    text("Fichr se concentre sur une chose : rendre les données produit simples à vérifier et à transmettre.", "Fichr focuses on one thing: making product data easy to verify and hand over.", "Fichr konzentriert sich darauf, Produktdaten einfach prüf- und übertragbar zu machen.", "Fichr hace que los datos de producto sean fáciles de revisar y transmitir.", "A Fichr torna os dados de produto fáceis de validar e transmitir.", "Fichr rende i dati prodotto facili da verificare e trasmettere.")),
  page("contact", "conversion", "unconfirmed",
    text("Contact", "Contact", "Kontakt", "Contacto", "Contacto", "Contatti"),
    text("Le canal sécurisé de réception est en préparation ; aucune donnée n’est collectée ici pour le moment.", "The secure receiving channel is being prepared; no data is collected here yet.", "Der sichere Kontaktkanal wird vorbereitet; hier werden noch keine Daten erhoben.", "El canal seguro se está preparando; aún no se recogen datos aquí.", "O canal seguro está a ser preparado; ainda não são recolhidos dados aqui.", "Il canale sicuro è in preparazione; qui non vengono ancora raccolti dati.")),
  page("support", "conversion", "unconfirmed",
    text("Support", "Support", "Support", "Soporte", "Suporte", "Supporto"),
    text("Le parcours de support sera ouvert avec la bêta privée et documentera chaque point de contact.", "The support journey will open with the private beta and document every contact point.", "Der Support startet mit der privaten Beta und dokumentiert alle Kontaktpunkte.", "El soporte se abrirá con la beta privada y documentará cada contacto.", "O suporte abrirá com a beta privada e documentará cada contacto.", "Il supporto aprirà con la beta privata e documenterà ogni contatto.")),
  page("connexion", "conversion", "unconfirmed",
    text("Connexion", "Sign in", "Anmeldung", "Acceso", "Iniciar sessão", "Accesso"),
    text("Fichr fonctionne aujourd’hui en local et sur invitation : aucune connexion web publique n’est proposée.", "Fichr currently runs locally and by invitation; there is no public web sign-in.", "Fichr läuft derzeit lokal und auf Einladung; es gibt keine öffentliche Web-Anmeldung.", "Fichr funciona en local y por invitación; no existe acceso web público.", "A Fichr funciona localmente e por convite; não existe acesso web público.", "Fichr funziona in locale e su invito; non esiste un accesso web pubblico.")),
  page("acces-beta", "conversion", "beta",
    text("Accès bêta", "Beta access", "Beta-Zugang", "Acceso beta", "Acesso beta", "Accesso beta"),
    text("Le parcours est prêt côté site, mais l’envoi restera désactivé tant que le récepteur sécurisé n’est pas configuré.", "The site journey is ready, but submission stays disabled until a secure receiver is configured.", "Der Ablauf ist vorbereitet; der Versand bleibt bis zum sicheren Empfänger deaktiviert.", "El recorrido está listo, pero el envío seguirá desactivado hasta configurar un receptor seguro.", "O percurso está pronto, mas o envio fica desativado até existir um recetor seguro.", "Il percorso è pronto, ma l’invio resta disattivato finché non è configurato un ricevitore sicuro.")),
  ...[
    ["mentions-legales", text("Mentions légales", "Legal notice", "Impressum", "Aviso legal", "Aviso legal", "Note legali")],
    ["confidentialite", text("Confidentialité", "Privacy", "Datenschutz", "Privacidad", "Privacidade", "Privacy")],
    ["cookies", text("Cookies", "Cookies", "Cookies", "Cookies", "Cookies", "Cookie")],
    ["cgv", text("Conditions de vente", "Terms of sale", "Verkaufsbedingungen", "Condiciones de venta", "Condições de venda", "Condizioni di vendita")],
    ["dpa", text("Traitement des données", "Data processing", "Datenverarbeitung", "Tratamiento de datos", "Tratamento de dados", "Trattamento dei dati")],
    ["accessibilite", text("Accessibilité", "Accessibility", "Barrierefreiheit", "Accesibilidad", "Acessibilidade", "Accessibilità")],
  ].map(([slug, title]) => page(
    slug as string,
    "legal",
    "unconfirmed",
    title as LocalizedText,
    text("Document préparatoire non publié : les informations juridiques doivent encore être validées.", "Unpublished draft: legal information still needs validation.", "Unveröffentlichter Entwurf: Rechtliche Angaben müssen noch bestätigt werden.", "Borrador no publicado: la información jurídica debe validarse.", "Rascunho não publicado: a informação jurídica ainda deve ser validada.", "Bozza non pubblicata: le informazioni legali devono ancora essere convalidate."),
    legalPoints,
    true,
  )),
];

export const sitePageSlugs = sitePages.map(({ slug }) => slug);

export function getSitePage(slug: string): SitePage | undefined {
  return sitePages.find((item) => item.slug === slug);
}
