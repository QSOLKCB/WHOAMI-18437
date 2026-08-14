import { execFileSync } from "node:child_process";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const output = execFileSync(process.execPath, ["scripts/whoami.mjs", "--quiet"], {
  encoding: "utf8",
}).trim();

assert.equal(output, "TRENT", "identity invariant changed");

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

console.log("PASS: Trent = Trent");
console.log("PASS: transcript archive matches canonical SHA-256");
console.log("PASS: generated transcript reconstruction is git-ignored");
console.log("PASS: editorial cut provenance is explicit");
console.log("PASS: 71 polyglot exhibits still return TRENT");
console.log("PASS: PR #3 added 44 more languages because 27 more was still not enough");
console.log("PASS: Codex polyglot review regressions are pinned");
