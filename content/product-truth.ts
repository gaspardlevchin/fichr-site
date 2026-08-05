export type Availability = "available" | "beta" | "planned" | "unconfirmed";

export type AvailabilityItem = {
  label: string;
  status: Availability;
};

export type MarketingPlan = {
  availability: Availability;
  description: string;
  featured?: boolean;
  features: AvailabilityItem[];
  name: "Starter" | "Studio" | "Pro";
  products: string;
};

export const availabilityLabels: Record<Availability, string> = {
  available: "Disponible",
  beta: "Bêta privée",
  planned: "Prévu",
  unconfirmed: "À confirmer",
};

export const productTruth = {
  available: [
    "Imports CSV, XLSX et JSON avec mapping et revue",
    "Catalogue, taxonomie, audit déterministe et validation explicite",
    "Images, fichiers et historique produit",
    "Exports TXT, CSV, XLSX, JSON et PDF",
    "Import et export Shopify sous forme de fichiers",
    "Interface en français, anglais, allemand, espagnol, italien et portugais",
    "Espaces de travail, rôles, sessions privées et isolation des données",
  ],
  beta: [
    "Accès privé sur invitation",
    "Plans, quotas et facturation préparés sans paiement public obligatoire",
    "Suggestions ciblées, explicables et toujours soumises à validation",
  ],
  planned: [
    "Connexions directes aux plateformes",
    "Synchronisations planifiées",
    "API Fichr publique",
    "Flux hébergés et webhooks",
    "Paiement et inscription entièrement autonomes",
  ],
  unconfirmed: [
    "Tarifs commerciaux définitifs",
    "Domaine public de production",
    "Fournisseur d’envoi des demandes bêta",
  ],
} as const;

export const plans: MarketingPlan[] = [
  {
    name: "Starter",
    availability: "beta",
    description: "Le socle utile pour structurer et fiabiliser un premier catalogue.",
    products: "Jusqu’à 100 produits dans la configuration actuelle",
    features: [
      { label: "Imports CSV, XLSX et JSON", status: "available" },
      { label: "Audit, validation, images et fichiers", status: "available" },
      { label: "Exports TXT, CSV, XLSX, JSON et PDF", status: "available" },
      { label: "Canal Shopify sous forme de fichier", status: "available" },
    ],
  },
  {
    name: "Studio",
    availability: "planned",
    description: "Le niveau de distribution prévu pour plusieurs marques et destinations.",
    products: "Quotas et tarif commercial à valider",
    features: [
      { label: "Tout le socle Starter", status: "available" },
      { label: "Diagnostics avancés par destination", status: "planned" },
      { label: "Connexions directes standards", status: "planned" },
      { label: "API en lecture et flux hébergés", status: "planned" },
    ],
    featured: true,
  },
  {
    name: "Pro",
    availability: "planned",
    description: "Le niveau d’intégration et d’automatisation prévu pour les flux complexes.",
    products: "Quotas et tarif commercial à valider",
    features: [
      { label: "Tout le socle Starter", status: "available" },
      { label: "Suggestions IA ciblées", status: "beta" },
      { label: "Mappings personnalisés", status: "planned" },
      { label: "API complète, webhooks et automatisations", status: "planned" },
    ],
  },
];

export const truthSources = [
  "https://github.com/gaspardlevchin/fichr/blob/main/README.md",
  "https://github.com/gaspardlevchin/fichr/blob/main/docs/app-connection.md",
  "https://github.com/gaspardlevchin/fichr/blob/main/docs/deployment.md",
  "https://app.notion.com/p/38f40de75466819b910fee696c93a8e3",
  "https://app.notion.com/p/39a40de75466817ab4bedcc816daec28",
] as const;
