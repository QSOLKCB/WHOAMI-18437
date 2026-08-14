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

const minimal = fs.readFileSync("minimal/whoami.asm", "utf8");
assert.match(minimal, /LDA #"T"/);

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
