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
  assert.match(html, /rel="icon"[^>]+href="\/favicon\.svg\?v=3"/i);
  assert.match(html, /What you need/);
  assert.match(html, /I(?:&#x2019;|’)ll build it/);
  assert.doesNotMatch(html, /Design and development by Kego/);
  assert.match(html, /A few things/);
  assert.match(html, /Alkemy Chat/);
  assert.match(html, /Biawak KOL/);
  assert.match(html, /Better Watch/);
  assert.match(html, /Simplified Fit/);
  assert.match(html, /\/videos\/simplified-fit\/v2\/demo\.mp4/);
  assert.match(html, /Unmute Simplified Fit demo/);
  assert.match(html, /Asia Mega Pasifik/);
  assert.match(html, /preload="none"/);
  assert.match(html, /What you can/);
  const experience = html.match(/<section[^>]+id="experience"[\s\S]*?<\/section>/)?.[0];
  assert.ok(experience, "experience is readable in the server-rendered page");
  assert.match(experience, /How I<br\s*\/><span>got here\.<\/span>/);
  const companies = [...experience.matchAll(/class="experience-role">([^<]+)/g)]
    .map((match) => match[1]);
  assert.deepEqual(companies, ["Mamikos", "Mekari", "TenderBoard", "SeeMeSol", "SeeMeSol"]);
  assert.match(experience, /SamurAI/);
  assert.equal((experience.match(/loading="lazy"/g) ?? []).length, 5);
  assert.doesNotMatch(experience, /data-reveal|data:image/);
  assert.match(html, /How we’ll<br\s*\/><span>work together\.<\/span>/);
  assert.match(html, /<span>Phase <!-- -->1<\/span><strong>Talk<\/strong><\/div><p>/);
  assert.match(html, /<span>Phase <!-- -->2<\/span><strong>Design<\/strong><\/div><p>/);
  assert.match(html, /<span>Phase <!-- -->3<\/span><strong>Build<\/strong><\/div><p>/);
  assert.match(html, /<span>Phase <!-- -->4<\/span><strong>Launch<\/strong><\/div><p>/);
  assert.doesNotMatch(html, /Start with the problem|See the direction|Try it as it takes shape|Put it to work/);
  assert.doesNotMatch(html, /0[1-3]\s*\/\s*(?:Talk|Build|Launch)/i);
  assert.match(html, /Keep it with me,/);
  assert.match(html, /Have something in mind\?/);
  assert.doesNotMatch(html, /closing-eyebrow/);
  assert.doesNotMatch(html, /Tell me what you want to build\./);
  assert.doesNotMatch(html, /A BETTER SITE|TWO WAYS/);
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview|react-loading-skeleton/);
});
