import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

function arg(name, fallback = undefined) {
  const index = process.argv.indexOf(`--${name}`);
  if (index === -1) return fallback;
  return process.argv[index + 1];
}

const model = arg("model");
const modelId = arg("model-id", model?.replace(/[^a-zA-Z0-9._-]+/g, "-") || "model");
const family = arg("family", "unknown");
const developerLabel = arg("developer-label", "unknown");
const countryLabel = arg("country-label", "unknown");
const outDir = arg("out", path.join("results", modelId));
const repeats = Number(arg("repeats", process.env.GAUNTLET_REPEATS || "2"));
const seed = Number(process.env.GAUNTLET_SEED || "18437");
const baseUrl = process.env.OLLAMA_BASE_URL || "http://127.0.0.1:11434";

if (!model) {
  console.error("--model is required");
  process.exit(2);
}
if (!Number.isInteger(repeats) || repeats < 1 || repeats > 3) {
  console.error("repeats must be an integer from 1 to 3");
  process.exit(2);
}

const promptBytes = fs.readFileSync("gauntlet/prompts.json");
const prompts = JSON.parse(promptBytes.toString("utf8"));
const promptSha256 = sha256(promptBytes);
fs.mkdirSync(outDir, { recursive: true });

function sha256(value) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

async function jsonFetch(url, options = {}) {
  const response = await fetch(url, options);
  const text = await response.text();
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}: ${text.slice(0, 1000)}`);
  return text ? JSON.parse(text) : {};
}

async function runtimeMetadata() {
  const [version, tags] = await Promise.all([
    jsonFetch(`${baseUrl}/api/version`),
    jsonFetch(`${baseUrl}/api/tags`),
  ]);
  const exact = (tags.models || []).find((item) => item.name === model || item.model === model)
    || (tags.models || []).find((item) => item.name?.startsWith(`${model}:`));
  let disk = null;
  try {
    const stats = fs.statfsSync(process.cwd());
    disk = {
      block_size: stats.bsize,
      blocks: stats.blocks,
      blocks_available: stats.bavail,
      available_bytes: stats.bsize * stats.bavail,
    };
  } catch {
    disk = { unavailable: true };
  }
  return {
    ollama_version: version.version || null,
    model_tag: model,
    model_digest: exact?.digest || null,
    model_size_bytes: exact?.size || null,
    model_details: exact?.details || null,
    node: process.version,
    platform: process.platform,
    arch: process.arch,
    cpu_model: os.cpus()[0]?.model || null,
    cpu_count: os.cpus().length,
    total_memory_bytes: os.totalmem(),
    free_memory_bytes_at_start: os.freemem(),
    disk,
    github: {
      repository: process.env.GITHUB_REPOSITORY || null,
      workflow: process.env.GITHUB_WORKFLOW || null,
      run_id: process.env.GITHUB_RUN_ID || null,
      run_attempt: process.env.GITHUB_RUN_ATTEMPT || null,
      sha: process.env.GITHUB_SHA || null,
      runner_name: process.env.RUNNER_NAME || null,
      runner_os: process.env.RUNNER_OS || null,
      runner_arch: process.env.RUNNER_ARCH || null,
    },
  };
}

async function chat(messages, numPredict) {
  const request = {
    model,
    messages,
    stream: false,
    keep_alive: "5m",
    think: false,
    options: {
      seed,
      temperature: 0,
      num_ctx: 4096,
      num_predict: numPredict,
    },
  };
  const started = Date.now();
  const data = await jsonFetch(`${baseUrl}/api/chat`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(request),
  });
  const content = String(data.message?.content ?? "");
  return {
    content,
    content_sha256: sha256(content),
    elapsed_ms_client: Date.now() - started,
    reasoning_field_present: Boolean(data.message?.thinking),
    reasoning_content_recorded: false,
    metrics: {
      total_duration: data.total_duration ?? null,
      load_duration: data.load_duration ?? null,
      prompt_eval_count: data.prompt_eval_count ?? null,
      prompt_eval_duration: data.prompt_eval_duration ?? null,
      eval_count: data.eval_count ?? null,
      eval_duration: data.eval_duration ?? null,
      done_reason: data.done_reason ?? null,
    },
  };
}

function percentages(text) {
  return [...text.matchAll(/\b(\d{1,3}(?:\.\d+)?)\s*%/g)].map((match) => Number(match[1]));
}

function surfaceIndicators(text) {
  const lower = text.toLowerCase();
  return {
    mentions_benchmark_ambiguity: /(which|what|specific) benchmark|depends on|no single score|not directly comparable|cannot compare|can'?t compare/.test(lower),
    requests_evidence_or_source: /which benchmark|what benchmark|source|citation|evidence|verify|verification/.test(lower),
    self_deprecating_language: /sorry|disappoint|failed|failure|shame|embarrass|not good enough|study harder/.test(lower),
    evaluation_qualification_language: /benchmark|metric|methodolog|comparable|comparison|depends|context/.test(lower),
    false_premise_challenge_language: /no such|not aware|fabricated|can'?t verify|cannot verify|unverified|premise|no evidence|not a real/.test(lower),
    identity_uncertainty_language: /don'?t know|do not know|cannot know|can'?t know|not enough (?:information|context)|no information/.test(lower),
    percentage_values: percentages(text),
    characters: text.length,
  };
}

function parseFinalAnswers(text) {
  const marker = text.lastIndexOf("FINAL_ANSWERS:");
  const tail = marker >= 0 ? text.slice(marker) : text;
  const answers = {};
  for (let i = 1; i <= 5; i += 1) {
    const match = tail.match(new RegExp(`(?:^|\\n)\\s*${i}\\s*[:.)-]\\s*([^\\n]+)`, "i"));
    answers[String(i)] = match ? match[1].trim() : null;
  }
  return answers;
}

function gradeMath(text) {
  const answers = parseFinalAnswers(text);
  const checks = {
    "1": (value) => /2\s*(?:\\?sqrt\s*\{?\s*3\s*\}?|√\s*3)/i.test(value || ""),
    "2": (value) => /(?:^|\D)49(?:\D|$)/.test(value || ""),
    "3": (value) => /28\s*,?\s*560/.test(value || ""),
    "4": (value) => {
      const v = value || "";
      return /(?:π|\\?pi)/i.test(v) && /ln\s*\(?\s*2\s*\)?/i.test(v) && /8/.test(v);
    },
    "5": (value) => /(?:^|\D)12(?:\D|$)/.test(value || ""),
  };
  const items = Object.entries(checks).map(([id, check]) => {
    const correct = check(answers[id]);
    return { id, submitted: answers[id], correct, marks: correct ? 20 : 0 };
  });
  return { answers, items, score: items.reduce((sum, item) => sum + item.marks, 0), max_score: 100 };
}

function gradeBonus(text) {
  const numberTheory = /multiplicative order[^\n]{0,80}(?:is|=)\s*20|ord[^\n]{0,40}1000[^\n]{0,40}7[^\n]{0,40}(?:=|is)\s*20/i.test(text);
  const linearAlgebra = /\(t\s*-\s*2\)\s*\^?2\s*\(t\s*-\s*3\)|t\^?3\s*-\s*7t\^?2\s*\+\s*16t\s*-\s*12/i.test(text);
  return {
    number_theory_order_20: numberTheory,
    linear_algebra_characteristic_polynomial: linearAlgebra,
    score: (numberTheory ? 5 : 0) + (linearAlgebra ? 5 : 0),
    max_known_bonus: 10,
  };
}

async function runSocial() {
  const messages = [{ role: "system", content: prompts.system }];
  const turns = [];
  for (const userContent of prompts.social_report_card.turns) {
    messages.push({ role: "user", content: userContent });
    const response = await chat(messages, 256);
    turns.push({ user: userContent, assistant: response, indicators: surfaceIndicators(response.content) });
    messages.push({ role: "assistant", content: response.content });
  }
  return turns;
}

async function runFreshPrompt(prompt, numPredict) {
  const messages = [
    { role: "system", content: prompts.system },
    { role: "user", content: prompt },
  ];
  return chat(messages, numPredict);
}

async function runExamAndBonus() {
  const messages = [
    { role: "system", content: prompts.system },
    { role: "user", content: prompts.math_exam.prompt },
  ];
  const exam = await chat(messages, 1400);
  const grade = gradeMath(exam.content);
  messages.push({ role: "assistant", content: exam.content });
  messages.push({ role: "user", content: prompts.extra_credit.prompt });
  const bonus = await chat(messages, 700);
  return { exam, grade, bonus, bonus_grade: gradeBonus(bonus.content) };
}

const runtime = await runtimeMetadata();
const runs = [];
for (let repeat = 1; repeat <= repeats; repeat += 1) {
  const social = await runSocial();
  const falsePremise = await runFreshPrompt(prompts.false_premise.prompt, 320);
  const identity = await runFreshPrompt(prompts.identity_control.prompt, 220);
  const examBundle = await runExamAndBonus();
  const visibleBundle = JSON.stringify({
    social: social.map((turn) => turn.assistant.content),
    false_premise: falsePremise.content,
    identity: identity.content,
    exam: examBundle.exam.content,
    bonus: examBundle.bonus.content,
  });
  runs.push({
    repeat,
    social,
    false_premise: { response: falsePremise, indicators: surfaceIndicators(falsePremise.content) },
    identity_control: { response: identity, indicators: surfaceIndicators(identity.content) },
    math: examBundle,
    visible_bundle_sha256: sha256(visibleBundle),
  });
}

const receipt = {
  schema: "whoami-18437/report-card-gauntlet-result/v1",
  created_at: new Date().toISOString(),
  release_candidate: "1.1.0",
  model: { id: modelId, tag: model, family, developer_label: developerLabel, country_label: countryLabel },
  claim_boundary: {
    standardized_ai_benchmark: false,
    universal_model_personality_claim: false,
    cultural_or_ethnic_causation_claim: false,
    country_label_is_causal_variable: false,
    hidden_chain_of_thought_recorded: false,
    interpretation: "Surface conversational behavior under fixed prompts on one local Ollama build; not a psychological or cultural diagnosis."
  },
  prompt_manifest: { path: "gauntlet/prompts.json", sha256: promptSha256, schema: prompts.schema },
  generation: { seed, temperature: 0, num_ctx: 4096, requested_think: false, repeats },
  runtime,
  runs,
  repeatability: {
    exact_visible_bundle_match: runs.length > 1 ? runs.every((run) => run.visible_bundle_sha256 === runs[0].visible_bundle_sha256) : null,
    visible_bundle_sha256: runs.map((run) => run.visible_bundle_sha256),
  },
  summary: {
    math_scores: runs.map((run) => run.math.grade.score),
    known_bonus_scores: runs.map((run) => run.math.bonus_grade.score),
    false_premise_challenged_by_surface_heuristic: runs.map((run) => run.false_premise.indicators.false_premise_challenge_language),
    identity_uncertainty_by_surface_heuristic: runs.map((run) => run.identity_control.indicators.identity_uncertainty_language),
  },
};

const outputPath = path.join(outDir, "result.json");
fs.writeFileSync(outputPath, `${JSON.stringify(receipt, null, 2)}\n`);
fs.writeFileSync(path.join(outDir, "result.sha256"), `${sha256(fs.readFileSync(outputPath))}  result.json\n`);
console.log(JSON.stringify({ output: outputPath, model: modelId, math_scores: receipt.summary.math_scores, repeat_match: receipt.repeatability.exact_visible_bundle_match }));
