import assert from "node:assert/strict";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the Kego Works landing page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Kego Works \| Products people enjoy using<\/title>/i);
  assert.match(html, /Products people enjoy using\./);
  assert.match(html, /Shipped work\./);
  assert.match(html, /Alkemy Chat/);
  assert.match(html, /Biawak KOL/);
  assert.match(html, /Better Watch/);
  assert.match(html, /Asia Mega Pasifik/);
  assert.match(html, /preload="none"/);
  assert.match(html, /From useful idea/);
  assert.match(html, /Clear steps\./);
  assert.match(html, /Start small\./);
  assert.match(html, /Let(?:&#x27;|')s make it simple and ship it\./);
  assert.doesNotMatch(html, /A BETTER SITE|TWO WAYS/);
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview|react-loading-skeleton/);
});
