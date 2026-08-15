import fs from "node:fs";

const catalog = JSON.parse(fs.readFileSync("gauntlet/models.json", "utf8"));
const tier = process.argv[2] || "core";
const onlyId = process.argv[3] || "";
const validTiers = new Set(["core", "heavy", "all"]);

if (!validTiers.has(tier)) {
  console.error(`Unknown tier: ${tier}`);
  process.exit(2);
}

let selected = catalog.models.filter((model) => tier === "all" || model.tier === tier);
if (onlyId) selected = selected.filter((model) => model.id === onlyId);
if (selected.length === 0) {
  console.error(`No models selected for tier=${tier} model_id=${onlyId || "<none>"}`);
  process.exit(3);
}

const include = selected.map((model) => ({
  id: model.id,
  ollama: model.ollama,
  family: model.family,
  developer_label: model.developer_label,
  country_label: model.country_label,
  tier: model.tier,
  expected_download_gb: model.expected_download_gb,
  experimental: Boolean(model.experimental),
  timeout_minutes: model.timeout_minutes || 45,
}));

console.log(`matrix=${JSON.stringify({ include })}`);
