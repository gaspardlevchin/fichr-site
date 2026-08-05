import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
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
  assert.doesNotMatch(html, /codex-preview|Starter Project|SkeletonPreview|react-loading-skeleton/i);
});

test("keeps the public site separate from the Fichr application", async () => {
  const [page, layout, packageJson, logo] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../public/brand/fichr_logo.svg", import.meta.url), "utf8"),
  ]);

  assert.match(packageJson, /"name": "fichr-site"/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.match(layout, /lang="fr"/);
  assert.match(page, /Canal de démonstration|Accès bientôt disponible|agenda commercial/);
  assert.doesNotMatch(page, /from\s+["'][^"']*(?:server|db)\/|drizzle|better-sqlite3|checkout/i);
  assert.match(logo, /viewBox="360 340 820 310"/);

  await Promise.all([
    access(new URL("../public/fonts/Montserrat-Regular.ttf", import.meta.url)),
    access(new URL("../public/fonts/Montserrat-Medium.ttf", import.meta.url)),
    access(new URL("../public/fonts/Montserrat-SemiBold.ttf", import.meta.url)),
  ]);

  await assert.rejects(access(new URL("../app/_sites-preview", import.meta.url)));
});
