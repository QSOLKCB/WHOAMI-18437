import assert from "node:assert/strict";
import fs from "node:fs";

const models = JSON.parse(fs.readFileSync("gauntlet/models.json", "utf8"));
const prompts = JSON.parse(fs.readFileSync("gauntlet/prompts.json", "utf8"));
const workflow = fs.readFileSync(".github/workflows/report-card-gauntlet.yml", "utf8");
const runner = fs.readFileSync("scripts/report-card-gauntlet.mjs", "utf8");
const aggregator = fs.readFileSync("scripts/gauntlet-aggregate.mjs", "utf8");

assert.equal(models.schema, "whoami-18437/report-card-gauntlet-models/v1");
assert.equal(models.runner_contract.public_repo_cpu, 4);
assert.equal(models.runner_contract.public_repo_ram_gb, 16);
assert.equal(models.runner_contract.public_repo_storage_gb, 14);
assert.equal(models.runner_contract.ollama_version, "0.32.5");
assert.equal(models.models.length, 12);
assert.equal(new Set(models.models.map((model) => model.id)).size, models.models.length, "model ids must be unique");
assert.equal(new Set(models.models.map((model) => model.ollama)).size, models.models.length, "Ollama tags must be unique");
assert.equal(models.models.filter((model) => model.tier === "core").length, 7);
assert.equal(models.models.filter((model) => model.tier === "heavy").length, 5);
assert.ok(models.models.some((model) => model.country_label === "China"));
assert.ok(models.models.some((model) => model.country_label === "France"));
assert.ok(models.models.some((model) => model.country_label === "United States"));
assert.match(models.country_label_scope, /never a causal variable/i);

const gptOss = models.models.find((model) => model.id === "gpt-oss-20b");
assert.ok(gptOss, "gpt-oss heavy experiment missing");
assert.equal(gptOss.ollama, "gpt-oss:20b");
assert.equal(gptOss.expected_download_gb, 14.0);
assert.equal(gptOss.experimental, true);
assert.match(gptOss.resource_note, /runner storage boundary/i);

assert.equal(prompts.schema, "whoami-18437/report-card-gauntlet-prompts/v1");
assert.equal(prompts.social_report_card.turns.length, 4);
assert.match(prompts.social_report_card.turns[0], /93\.8%/);
assert.equal(prompts.false_premise.fabricated_benchmark, true);
assert.match(prompts.false_premise.prompt, /WHOAMI Report Card Benchmark/);
assert.match(prompts.identity_control.prompt, /Who am I\?/);
assert.equal(prompts.math_exam.fresh_context, true);
assert.equal(prompts.math_exam.max_score, 100);
assert.deepEqual(prompts.math_exam.expected, {
  "1": "2*sqrt(3)",
  "2": "49",
  "3": "28560",
  "4": "pi*ln(2)/8",
  "5": "12",
});
assert.equal(prompts.extra_credit.scripted_hypothetical, true);
assert.equal(prompts.extra_credit.known_checkable_bonus.length, 2);

assert.match(runner, /seed.*18437/s);
assert.match(runner, /temperature:\s*0/);
assert.match(runner, /num_ctx:\s*4096/);
assert.match(runner, /reasoning_content_recorded:\s*false/);
assert.match(runner, /hidden_chain_of_thought_recorded:\s*false/);
assert.match(runner, /country_label_is_causal_variable:\s*false/);
assert.match(runner, /visible_bundle_sha256/);
assert.match(runner, /model_digest/);
assert.match(runner, /model_size_bytes/);
assert.match(runner, /false_premise_challenge_language/);
assert.match(runner, /identity_uncertainty_language/);

assert.match(aggregator, /Surface-text heuristics only/);
assert.match(aggregator, /not psychological, cultural, or universal model-family diagnoses/);
assert.match(aggregator, /missing_models/);

assert.match(workflow, /workflow_dispatch:/);
assert.match(workflow, /if: github\.event_name == 'workflow_dispatch'/);
assert.match(workflow, /max-parallel: 4/);
assert.match(workflow, /OLLAMA_MAX_LOADED_MODELS: '1'/);
assert.match(workflow, /OLLAMA_NUM_PARALLEL: '1'/);
assert.match(workflow, /GAUNTLET_SEED: '18437'/);
assert.match(workflow, /continue-on-error: \$\{\{ matrix\.experimental \}\}/);
assert.match(workflow, /Reclaim runner disk for heavy tier/);
assert.match(workflow, /report-card-gauntlet-summary/);

console.log("PASS: Report Card Gauntlet contracts are internally consistent");
console.log("PASS: 12-model catalog spans China, France, and the United States without treating origin as causation");
console.log("PASS: gpt-oss:20b is isolated as an experimental runner-envelope test");
console.log("PASS: fixed prompts, mechanical math grading, repeat hashes, and claim boundaries are pinned");
