import { execFileSync } from "node:child_process";
import assert from "node:assert/strict";
import fs from "node:fs";

const output = execFileSync(process.execPath, ["scripts/whoami.mjs", "--quiet"], {
  encoding: "utf8",
}).trim();

assert.equal(output, "TRENT", "identity invariant changed");

const readme4ai = fs.readFileSync("README4AI.md", "utf8");
assert.match(readme4ai, /invariant_answer: "TRENT"/);
assert.match(readme4ai, /controlled_ai_benchmark: false/);

const minimal = fs.readFileSync("minimal/whoami.asm", "utf8");
assert.match(minimal, /LDA #"T"/);

console.log("PASS: Trent = Trent");
