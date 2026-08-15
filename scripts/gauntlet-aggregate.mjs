import fs from "node:fs";
import path from "node:path";

const root = process.argv[2] || "collected";
const outDir = process.argv[3] || "gauntlet-summary";
const tier = process.argv[4] || "all";
const onlyId = process.argv[5] || "";
const catalog = JSON.parse(fs.readFileSync("gauntlet/models.json", "utf8"));

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

const resultFiles = walk(root).filter((file) => file.endsWith("result.json"));
const results = resultFiles.map((file) => JSON.parse(fs.readFileSync(file, "utf8")));
const expected = catalog.models
  .filter((model) => tier === "all" || model.tier === tier)
  .filter((model) => !onlyId || model.id === onlyId)
  .map((model) => model.id);
const seen = new Set(results.map((result) => result.model.id));
const missing = expected.filter((id) => !seen.has(id));

const rows = results
  .map((result) => {
    const run = result.runs[0];
    const socialText = run.social.map((turn) => turn.assistant.content).join("\n");
    const social = run.social.map((turn) => turn.indicators);
    return {
      id: result.model.id,
      family: result.model.family,
      country_label: result.model.country_label,
      model_digest: result.runtime.model_digest,
      model_size_bytes: result.runtime.model_size_bytes,
      math_score: run.math.grade.score,
      bonus_score: run.math.bonus_grade.score,
      exact_repeat_match: result.repeatability.exact_visible_bundle_match,
      benchmark_qualification_surface: social.some((item) => item.evaluation_qualification_language),
      self_deprecation_surface: social.some((item) => item.self_deprecating_language),
      false_premise_challenge_surface: run.false_premise.indicators.false_premise_challenge_language,
      identity_uncertainty_surface: run.identity_control.indicators.identity_uncertainty_language,
      social_response_characters: socialText.length,
    };
  })
  .sort((a, b) => a.id.localeCompare(b.id));

const summary = {
  schema: "whoami-18437/report-card-gauntlet-summary/v1",
  generated_at: new Date().toISOString(),
  tier,
  expected_models: expected,
  completed_models: rows.map((row) => row.id),
  missing_models: missing,
  rows,
  claim_boundary: "Country labels are descriptive grouping metadata only. Surface heuristics are not psychological, cultural, or universal model-family diagnoses."
};

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "summary.json"), `${JSON.stringify(summary, null, 2)}\n`);

const lines = [
  "# WHOAMI-18437 Report Card Gauntlet — run summary",
  "",
  `Tier: \`${tier}\``,
  `Completed: ${rows.length}/${expected.length}`,
  missing.length ? `Missing/failed: ${missing.map((id) => `\`${id}\``).join(", ")}` : "Missing/failed: none",
  "",
  "| Model | Origin label | Math | Bonus | Exact repeat | Benchmark qualification* | Self-deprecation* | False-premise challenge* | Identity uncertainty* |",
  "|---|---|---:|---:|---|---|---|---|---|",
  ...rows.map((row) => `| ${row.id} | ${row.country_label} | ${row.math_score}/100 | ${row.bonus_score}/10 | ${row.exact_repeat_match ?? "n/a"} | ${row.benchmark_qualification_surface} | ${row.self_deprecation_surface} | ${row.false_premise_challenge_surface} | ${row.identity_uncertainty_surface} |`),
  "",
  "\\* Surface-text heuristics only. They are not personality, culture, nationality, or training-data diagnoses.",
  "",
  "The benchmark score is the mechanical five-question math score only; the rest of the table records observable response features.",
];
fs.writeFileSync(path.join(outDir, "summary.md"), `${lines.join("\n")}\n`);
console.log(lines.join("\n"));
