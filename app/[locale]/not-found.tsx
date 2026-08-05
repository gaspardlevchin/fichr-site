import Link from "next/link";

export default function LocaleNotFound() {
  return (
    <main id="content" className="not-found">
      <p className="section-kicker">Erreur 404</p>
      <h1>Cette fiche est introuvable.</h1>
      <p>La page demandée n’existe pas dans cette version du site Fichr.</p>
      <Link className="button button--dark" href="/">Revenir à l’accueil</Link>
    </main>
  );
}
