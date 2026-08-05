import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const montserrat = localFont({
  src: [
    { path: "../public/fonts/Montserrat-Regular.ttf", weight: "400", style: "normal" },
    { path: "../public/fonts/Montserrat-Medium.ttf", weight: "500", style: "normal" },
    { path: "../public/fonts/Montserrat-SemiBold.ttf", weight: "600", style: "normal" },
  ],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Fichr — Vos données produit, prêtes à être vues",
    template: "%s — Fichr",
  },
  description:
    "Fichr transforme vos fichiers en fiches produit fiables, prêtes pour vos catalogues, vos exports et vos canaux de vente.",
  applicationName: "Fichr",
  keywords: [
    "logiciel catalogue produit",
    "création catalogue",
    "catalogue professionnel",
    "catalogue PDF",
    "gestion données produit",
  ],
  authors: [{ name: "Fichr" }],
  creator: "Fichr",
  publisher: "Fichr",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Fichr",
    title: "Fichr — Vos données produit, prêtes à être vues.",
    description:
      "Structurez, validez et publiez vos informations produit depuis une source fiable.",
  },
  twitter: {
    card: "summary",
    title: "Fichr — Vos données produit, prêtes à être vues.",
    description:
      "Structurez, validez et publiez vos informations produit depuis une source fiable.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={montserrat.variable}>{children}</body>
    </html>
  );
}
