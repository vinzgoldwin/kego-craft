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
  assert.match(html, /<title>Kego Works \| Websites and apps by Kego<\/title>/i);
  assert.match(html, /What you need/);
  assert.match(html, /I(?:&#x2019;|’)ll build it/);
  assert.doesNotMatch(html, /Design and development by Kego/);
  assert.match(html, /A few things/);
  assert.match(html, /Alkemy Chat/);
  assert.match(html, /Biawak KOL/);
  assert.match(html, /Better Watch/);
  assert.match(html, /Asia Mega Pasifik/);
  assert.match(html, /preload="none"/);
  assert.match(html, /What you can/);
  assert.match(html, /A short path to/);
  assert.doesNotMatch(html, /0[1-3]\s*\/\s*(?:Talk|Build|Launch)/i);
  assert.match(html, /Keep it with me,/);
  assert.match(html, /Have something in mind\?/);
  assert.doesNotMatch(html, /closing-eyebrow/);
  assert.doesNotMatch(html, /Tell me what you want to build\./);
  assert.doesNotMatch(html, /A BETTER SITE|TWO WAYS/);
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview|react-loading-skeleton/);
});
