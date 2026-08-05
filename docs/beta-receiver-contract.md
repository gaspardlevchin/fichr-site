# Contrat du récepteur de demandes bêta

Le formulaire devient actif uniquement quand `NEXT_PUBLIC_BETA_RECEIVER_URL` est défini au build. Sans cette variable, les champs et l’envoi sont désactivés et aucune fausse confirmation n’est affichée.

## Requête

`POST` JSON vers l’URL configurée :

```json
{
  "email": "personne@organisation.example",
  "organisation": "Organisation",
  "volume": "101-1000",
  "need": "Structurer et contrôler un catalogue",
  "consent": true,
  "locale": "fr",
  "source": "fichr-site"
}
```

Les valeurs de `volume` sont `1-100`, `101-1000`, `1001-10000` ou `10000+`. Les langues sont `fr`, `en`, `de`, `es`, `pt` et `it`.

## Réponse

- tout statut `2xx` confirme la réception ;
- tout autre statut ou erreur réseau affiche un échec explicite ;
- le site ne simule jamais une réussite et ne persiste pas la demande localement.

## Pré-requis côté récepteur

- HTTPS sur l’URL publique finale ;
- CORS limité aux domaines du site Fichr ;
- validation serveur stricte de tous les champs ;
- refus si le consentement n’est pas `true` ;
- limitation de débit et protection anti-abus ;
- minimisation des logs et durée de conservation documentée ;
- réponse sans information sensible.
