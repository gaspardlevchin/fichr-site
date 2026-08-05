# Fichr Site

Site marketing public et multilingue de Fichr.

Ce dépôt est volontairement séparé de l’application Fichr. Il contient
uniquement la présence commerciale : positionnement, présentation du produit,
fonctionnement, sécurité, plans et points de conversion. Aucune logique métier,
authentification, base de production ou connexion de paiement de l’application
n’est implémentée ici.

Le logiciel reste local-first : les données de production vivent dans un
SQLite généré sur l’appareil de l’utilisateur. Le futur socle de comptes et de
données client sensibles est un service distinct, non implémenté dans ce dépôt.
Voir [`docs/data-boundaries.md`](docs/data-boundaries.md).

## Développement

Prérequis : Node.js `>=22.13.0`.

```bash
npm install
npm run dev
```

## Vérification

```bash
npm run lint
npm test
```

`npm test` produit le build Cloudflare-compatible et vérifie le HTML rendu,
les métadonnées et les éléments de marque essentiels.

`npm run build:pages` génère les 173 routes statiques pour GitHub Pages. Le
français, l’anglais, l’allemand, l’espagnol, le portugais et l’italien sont
pré-rendus avec leurs balises `lang`, canonical et hreflang.

## Structure

- `app/(root)/page.tsx` : accueil marketing français ;
- `app/[locale]/` : pages localisées et pré-rendues ;
- `components/` : navigation, pages partagées et formulaire bêta préparé ;
- `content/` : vérité produit, langues et inventaire des pages ;
- `app/globals.css` : système visuel et responsive ;
- `public/brand/` : logo officiel Fichr ;
- `public/fonts/` : Montserrat, repris du produit Fichr ;
- `.openai/hosting.json` : configuration de publication Sites.

## Demandes bêta

Le formulaire reste désactivé sans récepteur sécurisé. Son contrat et les
garanties attendues sont documentés dans
[`docs/beta-receiver-contract.md`](docs/beta-receiver-contract.md). Aucune
donnée n’est envoyée tant que `NEXT_PUBLIC_BETA_RECEIVER_URL` est absente.

L’identité juridique, le récepteur sécurisé et le domaine de production final
doivent être configurés avant l’ouverture publique définitive.
