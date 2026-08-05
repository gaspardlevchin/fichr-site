# Fichr Site

Site marketing public de Fichr.

Ce dépôt est volontairement séparé de l’application Fichr. Il contient
uniquement la présence commerciale : positionnement, présentation du produit,
fonctionnement, sécurité, plans et points de conversion. Aucune logique métier,
authentification, base de données ou connexion de paiement de l’application
n’est implémentée ici.

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

## Structure

- `app/page.tsx` : home marketing et contenu produit statique ;
- `app/globals.css` : système visuel et responsive ;
- `public/brand/` : logo officiel Fichr ;
- `public/fonts/` : Montserrat, repris du produit Fichr ;
- `.openai/hosting.json` : configuration de publication Sites.

Les formulaires, l’agenda commercial, les pages légales et le domaine public
doivent être configurés avant la mise en ligne définitive.
