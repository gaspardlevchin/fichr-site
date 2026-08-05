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
  const [page, layout, packageJson, logo, productTruth, betaForm] = await Promise.all([
    readFile(new URL("../app/(root)/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/(root)/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../public/brand/fichr_logo.svg", import.meta.url), "utf8"),
    readFile(new URL("../content/product-truth.ts", import.meta.url), "utf8"),
    readFile(new URL("../components/beta-request-form.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(packageJson, /"name": "fichr-site"/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.match(layout, /lang="fr"/);
  assert.match(page, /aucune coordonnée n’est encore collectée/);
  assert.doesNotMatch(page, /from\s+["'][^"']*(?:server|db)\/|drizzle|better-sqlite3|checkout/i);
  assert.match(productTruth, /direct_channel_connections|Connexions directes aux plateformes|Connexions directes standards/);
  assert.match(productTruth, /status: "planned"/);
  assert.match(productTruth, /price:\s*19/);
  assert.match(productTruth, /price:\s*29/);
  assert.match(productTruth, /price:\s*59/);
  assert.match(productTruth, /businessPrice = 129/);
  assert.match(productTruth, /SQLite locale/);
  assert.match(page, /site marketing n’héberge ni catalogue ni données de production/);
  assert.match(betaForm, /NEXT_PUBLIC_BETA_RECEIVER_URL/);
  assert.match(betaForm, /disabled=\{!enabled/);
  assert.doesNotMatch(betaForm, /localStorage|sessionStorage/);
  assert.match(logo, /viewBox="360 340 820 310"/);

  await Promise.all([
    access(new URL("../public/fonts/Montserrat-Regular.woff2", import.meta.url)),
    access(new URL("../public/fonts/Montserrat-Medium.woff2", import.meta.url)),
    access(new URL("../public/fonts/Montserrat-SemiBold.woff2", import.meta.url)),
  ]);

  await assert.rejects(access(new URL("../app/_sites-preview", import.meta.url)));
});

test("renders localized public pages without exposing the local application", async () => {
  const [french, english, legal, missing] = await Promise.all([
    render("/fr/securite"),
    render("/en/produit"),
    render("/fr/mentions-legales"),
    render("/en/product"),
  ]);

  assert.equal(french.status, 200);
  const frenchHtml = await french.text();
  assert.match(frenchHtml, /<html[^>]*lang="fr-FR"/i);
  assert.match(frenchHtml, /SQLite local/);
  assert.match(frenchHtml, /site public n’y accède pas/);

  assert.equal(english.status, 200);
  const englishHtml = await english.text();
  assert.match(englishHtml, /<html[^>]*lang="en-GB"/i);
  assert.match(englishHtml, /A local product source/);

  assert.equal(missing.status, 404);

  assert.equal(legal.status, 200);
  const legalHtml = await legal.text();
  assert.match(legalHtml, /name="robots" content="noindex, nofollow"/);
  assert.match(legalHtml, /Structure juridique à renseigner/);
});

test("publishes crawl metadata and a dedicated not-found page", async () => {
  const [robots, sitemap, notFound] = await Promise.all([
    render("/robots.txt"),
    render("/sitemap.xml"),
    readFile(new URL("../app/not-found.tsx", import.meta.url), "utf8"),
  ]);

  assert.equal(robots.status, 200);
  assert.match(await robots.text(), /Sitemap:\s+https:\/\/gaspardlevchin\.github\.io\/fichr-site\/sitemap\.xml/);
  assert.equal(sitemap.status, 200);
  const sitemapText = await sitemap.text();
  assert.match(sitemapText, /https:\/\/gaspardlevchin\.github\.io\/fichr-site\/fr\/produit\//);
  assert.doesNotMatch(sitemapText, /mentions-legales|confidentialite|\/cgv\//);
  assert.match(notFound, /Cette fiche est introuvable\./);
});
