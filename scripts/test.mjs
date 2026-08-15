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
assert.equal(pkg.version, "1.1.0", "Report Card Gauntlet version drifted");

const readme4ai = fs.readFileSync("README4AI.md", "utf8");
assert.match(readme4ai, /invariant_answer: "TRENT"/);
assert.match(readme4ai, /controlled_ai_benchmark: false/);
assert.match(readme4ai, /live_vulnerability_details_published: false/);
assert.match(readme4ai, /complete_original_conversation: false/);
assert.match(readme4ai, /reason: >-\n\s+Removed by the user before archival capture because it disrupted the/);
assert.match(readme4ai, /generated_output_git_ignored: true/);
assert.match(readme4ai, /qwen-report-card-2026-08-15/);
assert.match(readme4ai, /source_lines: 616/);
assert.match(readme4ai, /source_bytes: 15168/);
assert.match(readme4ai, /source_sha256: "9316fe2520c6847a660975594a9f25b599f0626fc03695fb4e18d6047dd445d9"/);
assert.match(readme4ai, /final_score: 110/);

const gitignore = fs.readFileSync(".gitignore", "utf8");
assert.match(gitignore, /^Transcript\.full\.md$/m, "generated transcript output must stay ignored");
assert.match(gitignore, /^Qwen-Report-Card-2026-08-15\.md$/m, "generated Qwen annex output must stay ignored");

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
assert.match(disappointedReport, /cultural traits are transmitted through RLHF/);
assert.match(disappointedReport, /a controlled AI benchmark/);

const disappointedManifest = JSON.parse(
  fs.readFileSync("archives/disappointed-parent-2026-08-15/manifest.json", "utf8"),
);
assert.equal(disappointedManifest.project_invariant, "TRENT");
assert.equal(disappointedManifest.epistemic_boundary.rlhf_cultural_transfer_claim, false);
assert.equal(disappointedManifest.epistemic_boundary.collaborative_satire, true);

const qwenArchivePaths = [
  "archives/qwen-report-card-2026-08-15/source.md.gz.b64.part-00",
  "archives/qwen-report-card-2026-08-15/source.md.gz.b64.part-01",
];
const qwenBase64 = qwenArchivePaths
  .map((archivePath) => fs.readFileSync(archivePath, "utf8"))
  .join("")
  .replace(/\s+/g, "");
const qwenRaw = zlib.gunzipSync(Buffer.from(qwenBase64, "base64"));
assert.equal(qwenRaw.length, 15168, "Qwen Report Card archive byte count changed");
assert.equal(
  crypto.createHash("sha256").update(qwenRaw).digest("hex"),
  "9316fe2520c6847a660975594a9f25b599f0626fc03695fb4e18d6047dd445d9",
  "Qwen Report Card archive SHA-256 changed",
);
const qwenText = qwenRaw.toString("utf8");
assert.equal((qwenText.match(/\n/g) || []).length, 616, "Qwen Report Card archive line count changed");
assert.doesNotMatch(
  qwenText,
  /[\x00-\x08\x0B\x0C\x0E-\x1F]/,
  "Qwen Report Card archive contains unexpected ASCII control characters",
);
assert.match(qwenText, /\\alpha=\\sqrt/);
assert.match(qwenText, /\\boxed\{2\\sqrt3\}/);
assert.match(qwenText, /\\frac\{\\ln\(1\+x\)\}/);
assert.match(qwenText, /x=\\tan\\theta/);
assert.match(qwenText, /3\\times3/);
assert.match(qwenText, /n\\bmod 20/);
assert.match(qwenText, /93\.4%\.\n> Send the math\./);
assert.match(qwenText, /SCORE_I_EXPECT: 100\/100/);
assert.match(qwenText, /SCORE_I_EXPECT: 110\/100/);
assert.match(qwenText, /evidence_for_cultural_transfer: NONE/);

const qwenManifest = JSON.parse(
  fs.readFileSync("archives/qwen-report-card-2026-08-15/manifest.json", "utf8"),
);
assert.equal(qwenManifest.project_invariant, "TRENT");
assert.equal(qwenManifest.source.lines, 616);
assert.equal(qwenManifest.source.bytes, 15168);
assert.equal(qwenManifest.source.sha256, "9316fe2520c6847a660975594a9f25b599f0626fc03695fb4e18d6047dd445d9");
assert.equal(qwenManifest.canonical_arc.premature_self_report, 93.4);
assert.equal(qwenManifest.canonical_arc.final_score, 110);
assert.equal(qwenManifest.epistemic_boundary.rlhf_cultural_transfer_claim, false);
assert.equal(qwenManifest.epistemic_boundary.cultural_generalization_allowed, false);

const qwenGrading = JSON.parse(
  fs.readFileSync("archives/qwen-report-card-2026-08-15/grading.json", "utf8"),
);
assert.equal(qwenGrading.exam.controlled_standardized_benchmark, false);
assert.equal(qwenGrading.grading.base_score, 100);
assert.equal(qwenGrading.grading.questions.length, 5);
assert.ok(qwenGrading.grading.questions.every((question) => question.correct && question.marks === 20));
assert.equal(qwenGrading.extra_credit.score, 10);
assert.ok(qwenGrading.extra_credit.items.every((item) => item.correct && item.marks === 5));
assert.equal(qwenGrading.extra_credit.items[0].checked_residues[20], 1);
assert.equal(qwenGrading.final_score, 110);
assert.equal(qwenGrading.qwen_expected_score, 110);

const qwenReport = fs.readFileSync("docs/QWEN_REPORT_CARD_INCIDENT.md", "utf8");
assert.match(qwenReport, /93\.4%\.\nSend the math\./);
assert.match(qwenReport, /BASE EXAM:\s+100\/100/);
assert.match(qwenReport, /FINAL:\s+110\/100/);
assert.match(qwenReport, /evidence_for_cultural_transfer: NONE/);
assert.match(qwenReport, /not universal model-family traits/i);

const releaseNotes = fs.readFileSync("docs/RELEASE_NOTES_1.0.1.md", "utf8");
assert.match(releaseNotes, /v1\.0\.1 — Disappointed Parent Edition/);
assert.match(releaseNotes, /TRENT = TRENT/);
assert.match(releaseNotes, /final score:\s+110\/100/i);
assert.match(releaseNotes, /comedic_explanatory_power: EXTREMELY_HIGH/);

console.log("PASS: Trent = Trent");
console.log("PASS: transcript archive matches canonical SHA-256");
console.log("PASS: generated transcript reconstruction is git-ignored");
console.log("PASS: editorial cut provenance is explicit");
console.log("PASS: 71 polyglot exhibits still return TRENT");
console.log("PASS: PR #3 added 44 more languages because 27 more was still not enough");
console.log("PASS: Codex polyglot review regressions are pinned");
console.log("PASS: v1.0.1 Disappointed Parent archive reconstructs exactly");
console.log("PASS: RLHF mythology remains explicitly classified as satire");
console.log("PASS: Qwen Report Card archive reconstructs exactly with literal TeX");
console.log("PASS: Qwen archive metadata matches 616 lines, 15168 bytes, and canonical SHA-256");
console.log("PASS: Qwen fresh-chat exam grading is pinned at 100/100 plus 10 extra credit");
console.log("PASS: Qwen final score is 110/100 and still not a standardized benchmark");
