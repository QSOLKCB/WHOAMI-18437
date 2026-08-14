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
assert.equal(manifest.requested_language_count, 27, "polyglot exhibit count changed");
assert.equal(manifest.languages.length, 27, "polyglot manifest must contain all requested languages");
for (const exhibit of manifest.languages) {
  assert.ok(fs.existsSync(exhibit.path), `missing ${exhibit.name} exhibit: ${exhibit.path}`);
  const source = fs.readFileSync(exhibit.path, "utf8");
  assert.match(source, /TRENT/, `${exhibit.name} forgot who we are`);
}

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
console.log("PASS: 27 additional programming languages still return TRENT");
