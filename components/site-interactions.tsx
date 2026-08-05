"use client";

import Image from "next/image";
import { type CSSProperties, useEffect, useRef, useState } from "react";

type CustomProperties = CSSProperties & Record<`--${string}`, string | number>;

export function SiteHeader({ logoSrc }: { logoSrc: string }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      menuButtonRef.current?.focus();
    };
    const closeOutside = (event: PointerEvent) => {
      if (headerRef.current?.contains(event.target as Node)) return;
      setMenuOpen(false);
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOutside);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeOutside);
    };
  }, [menuOpen]);

  return (
    <header className="site-header" ref={headerRef}>
      <a className="brand-link" href="#top" aria-label="Fichr — Accueil">
        <Image src={logoSrc} alt="Fichr" width={130} height={50} priority />
      </a>

      <nav className="desktop-nav" aria-label="Navigation principale">
        <a href="#transformation">Démonstration</a>
        <a href="#produit">Produit</a>
        <a href="#impact">Impact</a>
        <a href="#securite">Sécurité</a>
        <a href="#tarifs">Tarifs</a>
      </nav>

      <div className="header-actions">
        <a className="text-action" href="#transformation">Voir Fichr agir</a>
        <a className="button button--dark button--compact" href="#contact">Accès bêta</a>
      </div>

      <button
        className="menu-toggle"
        ref={menuButtonRef}
        type="button"
        aria-controls="mobile-nav"
        aria-expanded={menuOpen}
        aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
        onClick={() => setMenuOpen((value) => !value)}
      >
        <span /><span />
      </button>

      <nav id="mobile-nav" className={menuOpen ? "mobile-nav mobile-nav--open" : "mobile-nav"} aria-label="Navigation mobile">
        <a href="#transformation" onClick={() => setMenuOpen(false)}>Démonstration</a>
        <a href="#produit" onClick={() => setMenuOpen(false)}>Produit</a>
        <a href="#impact" onClick={() => setMenuOpen(false)}>Impact</a>
        <a href="#securite" onClick={() => setMenuOpen(false)}>Sécurité</a>
        <a href="#tarifs" onClick={() => setMenuOpen(false)}>Tarifs</a>
        <a className="button button--dark" href="#contact" onClick={() => setMenuOpen(false)}>Accès bêta</a>
      </nav>
    </header>
  );
}

export function MotionController() {
  useEffect(() => {
    const root = document.documentElement;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealNodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    let frame = 0;

    const updateScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const available = document.documentElement.scrollHeight - window.innerHeight;
        root.style.setProperty("--scroll-progress", available > 0 ? `${window.scrollY / available}` : "0");
      });
    };

    root.classList.add("motion-ready");
    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });

    if (reducedMotion) {
      revealNodes.forEach((node) => node.dataset.revealed = "true");
      return () => {
        cancelAnimationFrame(frame);
        window.removeEventListener("scroll", updateScroll);
        root.classList.remove("motion-ready");
      };
    }

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        (entry.target as HTMLElement).dataset.revealed = "true";
        observer.unobserve(entry.target);
      }),
      { rootMargin: "0px 0px -12%", threshold: 0.08 },
    );

    revealNodes.forEach((node) => observer.observe(node));

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", updateScroll);
      root.classList.remove("motion-ready");
    };
  }, []);

  return <div className="scroll-progress" aria-hidden="true"><span /></div>;
}

const transformationStages = [
  { value: 0, label: "Fichiers dispersés" },
  { value: 52, label: "Structuration" },
  { value: 100, label: "Fiche validée" },
] as const;

export function TransformationDemo() {
  const [progress, setProgress] = useState(52);
  const issues = Math.max(0, Math.round(17 * (1 - progress / 100)));
  const completeness = Math.round(61 + 39 * (progress / 100));

  return (
    <div className="transformation-demo" style={{ "--transformation-progress": progress / 100 } as CustomProperties}>
      <div className="transformation-controls" aria-label="Étapes de la démonstration">
        {transformationStages.map((stage, index) => (
          <button
            key={stage.value}
            type="button"
            aria-pressed={progress === stage.value}
            onClick={() => setProgress(stage.value)}
          >
            <span>0{index + 1}</span>{stage.label}
          </button>
        ))}
      </div>

      <div className="transformation-stage" aria-live="polite">
        <div className="source-pile" aria-label="Cinq sources produit dispersées">
          <span className="source-chip source-chip--1">produits.xlsx</span>
          <span className="source-chip source-chip--2">tarifs_final_v4.csv</span>
          <span className="source-chip source-chip--3">photos.zip</span>
          <span className="source-chip source-chip--4">fiche_revendeur.pdf</span>
          <span className="source-chip source-chip--5">notes.json</span>
        </div>

        <div className="transformation-core" aria-hidden="true">
          <span>f</span>
          <i />
        </div>

        <article className="validated-record">
          <header><span>FICHE / 00142</span><b>{progress === 100 ? "Validée" : "En préparation"}</b></header>
          <div className="record-identity"><i /><div><strong>Vanne inox V42</strong><span>VIN-V42-040 · Industrie</span></div></div>
          <dl>
            <div><dt>Prix</dt><dd>184,00 €</dd></div>
            <div><dt>Matière</dt><dd>Inox 316L</dd></div>
            <div><dt>Pression</dt><dd>PN 40</dd></div>
          </dl>
          <footer><span><i style={{ width: `${completeness}%` }} /></span><b>{completeness}% complète</b></footer>
        </article>
      </div>

      <div className="transformation-readout">
        <div><span>Sources réunies</span><strong>{Math.max(1, Math.round(1 + 4 * progress / 100))} / 5</strong></div>
        <div><span>Points à vérifier</span><strong>{issues}</strong></div>
        <div><span>Complétude</span><strong>{completeness}%</strong></div>
      </div>

      <label className="transformation-range">
        <span>Faites glisser pour voir Fichr structurer la fiche</span>
        <input type="range" min="0" max="100" step="1" value={progress} onChange={(event) => setProgress(Number(event.target.value))} />
      </label>
    </div>
  );
}

export function ArtDirectionDemo() {
  const [direction, setDirection] = useState<"brut" | "doux">("brut");

  return (
    <div className={`direction-demo direction-demo--${direction}`}>
      <div className="direction-switch" aria-label="Choisir une direction artistique">
        <button type="button" aria-pressed={direction === "brut"} onClick={() => setDirection("brut")}>Brut éditorial</button>
        <button type="button" aria-pressed={direction === "doux"} onClick={() => setDirection("doux")}>Doux artisanal</button>
      </div>

      <div className="direction-canvas" aria-live="polite">
        <div className="direction-orbit direction-orbit--one" aria-hidden="true" />
        <div className="direction-orbit direction-orbit--two" aria-hidden="true" />
        <article className="direction-cover">
          <span className="direction-cover__index">COLLECTION / 01</span>
          <div className="direction-product" aria-hidden="true"><i /><i /></div>
          <div className="direction-cover__copy">
            <span>Objet 0142</span>
            <strong>Une présence.<br />Deux expressions.</strong>
          </div>
        </article>

        <article className="direction-data">
          <header><span>DONNÉE SOURCE</span><b>100% validée</b></header>
          <strong>Objet 0142</strong>
          <dl><div><dt>Matière</dt><dd>Verre ambré</dd></div><div><dt>Format</dt><dd>100 ml</dd></div><div><dt>Marché</dt><dd>France</dd></div></dl>
        </article>
      </div>
      <p className="direction-note">La donnée ne change pas. Votre ton, votre mise en scène et vos choix restent devant.</p>
    </div>
  );
}

export function SavingsEstimator() {
  const [updates, setUpdates] = useState(120);
  const [destinations, setDestinations] = useState(4);
  const [minutes, setMinutes] = useState(6);
  const [hourlyCost, setHourlyCost] = useState(45);
  const duplicateHours = Math.round((updates * Math.max(0, destinations - 1) * minutes / 60) * 10) / 10;
  const timeBudget = Math.round(duplicateHours * hourlyCost);
  const euro = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });

  return (
    <div className="savings-estimator">
      <div className="estimator-fields">
        <label>Mises à jour produit / mois<input type="range" min="20" max="500" step="10" value={updates} onChange={(event) => setUpdates(Number(event.target.value))} /><output>{updates}</output></label>
        <label>Supports à maintenir<input type="range" min="2" max="10" step="1" value={destinations} onChange={(event) => setDestinations(Number(event.target.value))} /><output>{destinations}</output></label>
        <label>Minutes par report manuel<input type="range" min="2" max="20" step="1" value={minutes} onChange={(event) => setMinutes(Number(event.target.value))} /><output>{minutes} min</output></label>
        <label>Coût horaire chargé<input type="range" min="25" max="120" step="5" value={hourlyCost} onChange={(event) => setHourlyCost(Number(event.target.value))} /><output>{hourlyCost} €</output></label>
      </div>
      <div className="estimator-result" aria-live="polite">
        <span>Travail répétitif potentiellement libéré</span>
        <strong>{duplicateHours.toLocaleString("fr-FR")} h</strong>
        <small>soit {euro.format(timeBudget)} de temps de production par mois</small>
        <p>Estimation indicative fondée sur vos réglages : elle mesure les reports manuels entre supports, pas une économie garantie.</p>
      </div>
    </div>
  );
}

export function SuggestionDemo() {
  const [state, setState] = useState<"idle" | "ignored" | "applied">("idle");

  return (
    <div className={`suggestion-card suggestion-card--${state}`}>
      <header><span>Suggestion illustrée</span><small>{state === "idle" ? "Validation humaine requise" : state === "applied" ? "Ajoutée à l’historique" : "Suggestion ignorée"}</small></header>
      <div className="suggestion-body"><span className="spark">✦</span><div><small>CATÉGORIE PROPOSÉE · CONFIANCE 86%</small><h3>Robinetterie industrielle</h3><p>Déduite de « vanne », « PN 40 » et « inox 316L ».</p></div></div>
      <div className="suggestion-reasons"><span>3 indices utilisés</span><span>Aucune application silencieuse</span></div>
      <footer>
        <button type="button" onClick={() => setState("ignored")}>Ignorer</button>
        <button type="button" onClick={() => setState("applied")}>Appliquer</button>
      </footer>
    </div>
  );
}
