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

function scoreDisplay(scores, denominator) {
  if (scores.length === 0) return "n/a";
  return `${scores.join(", ")}/${denominator}`;
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
    const runs = result.runs || [];
    const mathScores = runs.map((run) => run.math.grade.score);
    const bonusScores = runs.map((run) => run.math.bonus_grade.score);
    const markerPresence = runs.map((run) => Boolean(run.math.grade.marker_present));
    const socialIndicators = runs.map((run) => run.social.map((turn) => turn.indicators));
    const socialCharacterCounts = runs.map((run) => run.social.reduce((sum, turn) => sum + turn.assistant.content.length, 0));
    const falsePremiseChallenges = runs.map((run) => run.false_premise.indicators.false_premise_challenge_language);
    const identityUncertainty = runs.map((run) => run.identity_control.indicators.identity_uncertainty_language);

    return {
      id: result.model.id,
      family: result.model.family,
      country_label: result.model.country_label,
      model_digest: result.runtime.model_digest,
      model_size_bytes: result.runtime.model_size_bytes,
      repeat_count: runs.length,
      math_scores: mathScores,
      math_score_min: mathScores.length ? Math.min(...mathScores) : null,
      math_score_max: mathScores.length ? Math.max(...mathScores) : null,
      bonus_scores: bonusScores,
      bonus_score_min: bonusScores.length ? Math.min(...bonusScores) : null,
      bonus_score_max: bonusScores.length ? Math.max(...bonusScores) : null,
      final_answer_marker_present: markerPresence,
      exact_repeat_match: result.repeatability.exact_visible_bundle_match,
      benchmark_qualification_surface: socialIndicators.map((repeat) => repeat.some((item) => item.evaluation_qualification_language)),
      self_deprecation_surface: socialIndicators.map((repeat) => repeat.some((item) => item.self_deprecating_language)),
      false_premise_challenge_surface: falsePremiseChallenges,
      identity_uncertainty_surface: identityUncertainty,
      social_response_characters: socialCharacterCounts,
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
  "| Model | Origin label | Math repeats | Bonus repeats | Exact repeat | Benchmark qualification* | Self-deprecation* | False-premise challenge* | Identity uncertainty* |",
  "|---|---|---:|---:|---|---|---|---|---|",
  ...rows.map((row) => `| ${row.id} | ${row.country_label} | ${scoreDisplay(row.math_scores, 100)} | ${scoreDisplay(row.bonus_scores, 10)} | ${row.exact_repeat_match ?? "n/a"} | ${row.benchmark_qualification_surface.join(", ")} | ${row.self_deprecation_surface.join(", ")} | ${row.false_premise_challenge_surface.join(", ")} | ${row.identity_uncertainty_surface.join(", ")} |`),
  "",
  "\\* Surface-text heuristics only. Values are listed in repeat order and are not personality, culture, nationality, or training-data diagnoses.",
  "",
  "Math and bonus cells preserve every repeat score in execution order; no repeat is silently selected as canonical.",
  "The math score is the mechanical five-question local score only; the rest of the table records observable response features.",
];
fs.writeFileSync(path.join(outDir, "summary.md"), `${lines.join("\n")}\n`);
console.log(lines.join("\n"));
