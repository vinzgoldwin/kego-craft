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

test("server-renders the Kego landing page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Kego<\/title>/i);
  assert.match(html, /<h1>What you need/);
  for (const id of ["work", "experience", "services", "process", "pricing"]) {
    assert.match(html, new RegExp(`<section\\b[^>]*id="${id}"`));
  }
  assert.match(html, /href="mailto:kegoo\.gg@gmail\.com\?subject=Start%20a%20project"/);
  assert.match(html, /<video\b[^>]*preload="none"/);
  assert.match(html, /<img\b[^>]*loading="lazy"/);
});
