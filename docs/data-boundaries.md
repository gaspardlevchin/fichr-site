# Frontières de données Fichr

Ce dépôt est le site marketing public. Il reste distinct du logiciel Fichr et ne contient ni sa logique métier, ni son authentification, ni sa base de production.

## 1. Site public

- contenu public, tarifs et pages d’information ;
- aucune donnée de catalogue ou de production ;
- aucun stockage client local ou serveur ;
- formulaire désactivé tant que `NEXT_PUBLIC_BETA_RECEIVER_URL` n’est pas configuré ;
- aucune connexion directe au logiciel Fichr.

## 2. Logiciel Fichr

- exécution locale et accès privé sur invitation dans l’état actuel ;
- une base SQLite locale générée sur l’appareil de chaque utilisateur ;
- les données de production restent sous le contrôle de l’utilisateur ;
- le site marketing n’accède jamais à cette base.

## 3. Futur socle central Fichr

Les comptes et données client sensibles pourront être reçus sur une infrastructure distincte, opérée par Fichr. Cette brique n’est pas implémentée dans ce dépôt.

Avant ouverture, elle devra au minimum disposer d’un accès HTTPS, d’une liste d’origines autorisées, d’une limitation de débit, d’une taille maximale de requête, d’une journalisation minimale, d’une politique de sauvegarde et d’une procédure de suppression. L’ordinateur hôte ne doit pas être exposé directement sans couche d’accès et de chiffrement adaptée.

## Principe non négociable

Le site public, le récepteur de demandes, le service de comptes et les SQLite de production sont quatre périmètres séparés. Les données de production ne transitent pas par le formulaire marketing.
