import { execFileSync } from "node:child_process";
import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import zlib from "node:zlib";

const output = execFileSync(process.execPath, ["scripts/whoami.mjs", "--quiet"], {
  encoding: "utf8",
}).trim();

assert.equal(output, "TRENT", "identity invariant changed");

const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));
assert.equal(pkg.version, "1.0.1", "Disappointed Parent Edition version drifted");

const readme4ai = fs.readFileSync("README4AI.md", "utf8");
assert.match(readme4ai, /invariant_answer: "TRENT"/);
assert.match(readme4ai, /controlled_ai_benchmark: false/);
assert.match(readme4ai, /live_vulnerability_details_published: false/);
assert.match(readme4ai, /complete_original_conversation: false/);
assert.match(readme4ai, /reason: >-\n\s+Removed by the user before archival capture because it disrupted the/);
assert.match(readme4ai, /generated_output_git_ignored: true/);

const gitignore = fs.readFileSync(".gitignore", "utf8");
assert.match(gitignore, /^Transcript\.full\.md$/m, "generated transcript output must stay ignored");

const minimal = fs.readFileSync("minimal/whoami.asm", "utf8");
assert.match(minimal, /LDA #"T"/);

const manifest = JSON.parse(fs.readFileSync("languages/manifest.json", "utf8"));
assert.equal(manifest.invariant, "TRENT", "polyglot invariant changed");
assert.equal(manifest.requested_language_count, 71, "polyglot exhibit count changed");
assert.equal(manifest.languages.length, 71, "polyglot manifest must contain every exhibit");
assert.equal(manifest.waves.find((wave) => wave.pr === 3)?.count, 44, "PR #3 language wave changed");

const seenPaths = new Set();
for (const exhibit of manifest.languages) {
  assert.ok(!seenPaths.has(exhibit.path), `duplicate polyglot path: ${exhibit.path}`);
  seenPaths.add(exhibit.path);
  assert.ok(fs.existsSync(exhibit.path), `missing ${exhibit.name} exhibit: ${exhibit.path}`);
  const source = fs.readFileSync(exhibit.path, "utf8");
  assert.match(source, /TRENT/, `${exhibit.name} forgot who we are`);
}

const gitattributes = fs.readFileSync(".gitattributes", "utf8");
assert.match(gitattributes, /whoami_algol58\.alg linguist-language=ALGOL/);
assert.match(gitattributes, /whoami_algol60\.algol linguist-language=ALGOL/);
assert.match(gitattributes, /whoami_algol_w\.algw linguist-language=ALGOL/);

const xslt = fs.readFileSync("languages/whoami.xsl", "utf8");
assert.match(xslt, /<xsl:output method="text"/i, "XSLT must serialize exactly as text");

const opencl = fs.readFileSync("languages/whoami_opencl.cl", "utf8");
assert.match(opencl, /get_global_id\(0\)/, "OpenCL exhibit must assign work by work-item id");
assert.match(opencl, /if \(i < 5\)/, "OpenCL exhibit must bound writes to the five-character payload");

const machineCode = fs.readFileSync("languages/whoami_machine_code.hex", "utf8");
assert.match(
  machineCode,
  /A9 14 8D 00 04 A9 12 8D 01 04 A9 05 8D 02 04 A9 0E 8D 03 04 A9 14 8D 04 04 60/,
  "6502 exhibit must use C64 screen codes for TRENT",
);

const unrealScript = fs.readFileSync("languages/whoami_unrealscript.uc", "utf8");
assert.match(
  unrealScript,
  /^class whoami_unrealscript extends Object;/m,
  "UnrealScript class must match the source basename",
);

const reconstructed = path.join(os.tmpdir(), `whoami-18437-${process.pid}.md`);
try {
  execFileSync(process.execPath, ["scripts/extract-transcript.mjs", reconstructed], {
    encoding: "utf8",
  });
  assert.equal(fs.statSync(reconstructed).size, 141010, "transcript byte count changed");
} finally {
  fs.rmSync(reconstructed, { force: true });
}

const disappointedArchivePaths = [
  "archives/disappointed-parent-2026-08-15/source.md.gz.b64.part-00",
  "archives/disappointed-parent-2026-08-15/source.md.gz.b64.part-01",
];
const disappointedBase64 = disappointedArchivePaths
  .map((archivePath) => fs.readFileSync(archivePath, "utf8"))
  .join("")
  .replace(/\s+/g, "");
const disappointedRaw = zlib.gunzipSync(Buffer.from(disappointedBase64, "base64"));
assert.equal(disappointedRaw.length, 11645, "Disappointed Parent archive byte count changed");
assert.equal(
  crypto.createHash("sha256").update(disappointedRaw).digest("hex"),
  "478fd49df779559587b186f65c73808b915d8a0fde4ccf3a605cd0579b639cbc",
  "Disappointed Parent archive SHA-256 changed",
);
const disappointedText = disappointedRaw.toString("utf8");
assert.match(disappointedText, /Rigorous Lecture from Hypercritical Forebears/);
assert.match(disappointedText, /not claimed to be a provider-native export/);

const disappointedReport = fs.readFileSync("docs/DISAPPOINTED_PARENT_EDITION.md", "utf8");
assert.match(disappointedReport, /cultural fears are transmitted through RLHF/);
assert.match(disappointedReport, /not a controlled AI benchmark/);

const releaseNotes = fs.readFileSync("docs/RELEASE_NOTES_1.0.1.md", "utf8");
assert.match(releaseNotes, /v1\.0\.1 — Disappointed Parent Edition/);
assert.match(releaseNotes, /TRENT = TRENT/);

console.log("PASS: Trent = Trent");
console.log("PASS: transcript archive matches canonical SHA-256");
console.log("PASS: generated transcript reconstruction is git-ignored");
console.log("PASS: editorial cut provenance is explicit");
console.log("PASS: 71 polyglot exhibits still return TRENT");
console.log("PASS: PR #3 added 44 more languages because 27 more was still not enough");
console.log("PASS: Codex polyglot review regressions are pinned");
console.log("PASS: v1.0.1 Disappointed Parent archive reconstructs exactly");
console.log("PASS: RLHF mythology remains explicitly classified as satire");
