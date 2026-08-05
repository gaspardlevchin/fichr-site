import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found">
      <p className="section-kicker">Erreur 404</p>
      <h1>Cette fiche est introuvable.</h1>
      <p>La page a peut-être changé d’adresse. Le site Fichr, lui, reste accessible.</p>
      <Link className="button button--dark" href="/">Revenir à l’accueil</Link>
    </main>
  );
}
