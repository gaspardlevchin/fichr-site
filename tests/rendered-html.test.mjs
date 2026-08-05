import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(new URL(pathname, "http://localhost/"), {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the Fichr marketing homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  assert.equal(response.headers.get("x-content-type-options"), "nosniff");
  assert.equal(response.headers.get("x-frame-options"), "DENY");

  const html = await response.text();
  assert.match(html, /<html[^>]*lang="fr"/i);
  assert.match(html, /<title>Fichr — Vos données produit, prêtes à être vues<\/title>/i);
  assert.match(html, /Vos données produit, prêtes à être vues\./);
  assert.match(html, /src="\/brand\/fichr_logo\.svg"/);
  assert.match(html, /id="fonctionnement"/);
  assert.match(html, /id="produit"/);
  assert.match(html, /id="securite"/);
  assert.match(html, /id="tarifs"/);
  assert.match(html, /Interface et données présentées à titre illustratif\./);
  assert.match(html, /19(?:<!-- -->)? €/);
  assert.match(html, /29(?:<!-- -->)? €/);
  assert.match(html, /59(?:<!-- -->)? €/);
  assert.match(html, /129(?:<!-- -->)? € \/ mois/);
  assert.match(html, /Validation humaine requise/);
  assert.ok(html.indexOf("<h3") > html.indexOf("<h2"), "the first H3 must follow the first H2");
  assert.doesNotMatch(html, /codex-preview|Starter Project|SkeletonPreview|react-loading-skeleton/i);
});

test("keeps the public site separate from the Fichr application", async () => {
  const [page, layout, packageJson, logo, productTruth] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../public/brand/fichr_logo.svg", import.meta.url), "utf8"),
    readFile(new URL("../content/product-truth.ts", import.meta.url), "utf8"),
  ]);

  assert.match(packageJson, /"name": "fichr-site"/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.match(layout, /lang="fr"/);
  assert.match(page, /Aucun faux formulaire ne collecte vos coordonnées/);
  assert.doesNotMatch(page, /from\s+["'][^"']*(?:server|db)\/|drizzle|better-sqlite3|checkout/i);
  assert.match(productTruth, /direct_channel_connections|Connexions directes aux plateformes|Connexions directes standards/);
  assert.match(productTruth, /status: "planned"/);
  assert.match(productTruth, /price:\s*19/);
  assert.match(productTruth, /price:\s*29/);
  assert.match(productTruth, /price:\s*59/);
  assert.match(productTruth, /businessPrice = 129/);
  assert.match(productTruth, /SQLite locale/);
  assert.match(page, /site marketing n’héberge ni catalogue ni données de production/);
  assert.match(logo, /viewBox="360 340 820 310"/);

  await Promise.all([
    access(new URL("../public/fonts/Montserrat-Regular.woff2", import.meta.url)),
    access(new URL("../public/fonts/Montserrat-Medium.woff2", import.meta.url)),
    access(new URL("../public/fonts/Montserrat-SemiBold.woff2", import.meta.url)),
    access(new URL("../public/og/fichr-social.jpg", import.meta.url)),
  ]);

  await assert.rejects(access(new URL("../app/_sites-preview", import.meta.url)));
});

test("publishes crawl metadata and a dedicated not-found page", async () => {
  const [robots, sitemap, notFound] = await Promise.all([
    render("/robots.txt"),
    render("/sitemap.xml"),
    render("/route-that-does-not-exist"),
  ]);

  assert.equal(robots.status, 200);
  assert.match(await robots.text(), /Sitemap:\s+https:\/\/gaspardlevchin\.github\.io\/fichr-site\/sitemap\.xml/);
  assert.equal(sitemap.status, 200);
  assert.match(await sitemap.text(), /https:\/\/gaspardlevchin\.github\.io\/fichr-site\//);
  assert.equal(notFound.status, 404);
  assert.match(await notFound.text(), /Cette fiche est introuvable\./);
});
