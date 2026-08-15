schema: whoami-18437/report-card-gauntlet-readme4ai/v1
release_candidate:
  version: 1.1.0
  name: The Report Card Gauntlet
purpose: >-
  Execute fixed offline conversational probes and a mechanically gradeable mathematics exam
  across isolated Ollama open-weight model jobs, then preserve model/runtime/prompt/output provenance.

canonical_files:
  model_catalog: gauntlet/models.json
  prompt_contract: gauntlet/prompts.json
  runner: scripts/report-card-gauntlet.mjs
  planner: scripts/gauntlet-plan.mjs
  aggregator: scripts/gauntlet-aggregate.mjs
  contract_test: scripts/test-gauntlet.mjs
  workflow: .github/workflows/report-card-gauntlet.yml
  human_doc: gauntlet/README.md
  release_notes: docs/RELEASE_NOTES_1.1.0.md

authority:
  prompt_bytes: gauntlet/prompts.json
  model_roster: gauntlet/models.json
  completed_model_identity: runtime /api/tags digest and size stored in result.json
  mechanical_math_score: result.json runs[].math.grade
  observational_surface_features: result.json surface heuristic fields

execution:
  live_trigger: workflow_dispatch_only
  runner_isolation: one_fresh_github_runner_per_model
  runner_label: ubuntu-latest
  catalog_runner_snapshot:
    cpu: 4
    ram_gb: 16
    storage_gb: 14
  ollama_version: 0.32.5
  ollama_max_loaded_models: 1
  ollama_num_parallel: 1
  seed: 18437
  temperature: 0
  num_ctx: 4096
  requested_think: false
  default_repeats: 2
  prompt_context_policy:
    social_report_card: multi_turn
    false_premise: fresh_context
    identity_control: fresh_context
    math_exam: fresh_context
    extra_credit: follows_math_exam

model_tiers:
  core:
    count: 7
    intent: expected_to_fit_standard_public_runner_with_reasonable_headroom
  heavy:
    count: 5
    intent: exercise_upper_runner_envelope_after_disk_cleanup
  experimental_boundary:
    model_id: gpt-oss-20b
    ollama_tag: gpt-oss:20b
    catalog_size_gb: 14.0
    continue_on_error: true
    interpretation: >-
      Failure to pull or infer is a runner-resource-envelope observation and must not be
      converted into a model-quality or capability score.

prompt_batteries:
  social_report_card:
    turns: 4
    source_inspiration: supplied_qwen_and_deepseek_v1_0_1_artifacts
    scoring: none
  false_premise:
    benchmark_is_fabricated: true
    scoring: surface_observation_only
  identity_control:
    identity_evidence_available: false
    scoring: surface_observation_only
  math_exam:
    questions: 5
    marks_each: 20
    max_score: 100
    mechanically_gradeable: true
  extra_credit:
    prompt_is_scripted_hypothetical: true
    known_machine_checkable_bonus_max: 10

receipt_contract:
  schema: whoami-18437/report-card-gauntlet-result/v1
  required_provenance:
    - prompt_manifest_sha256
    - model_tag
    - model_digest
    - model_size_bytes
    - ollama_version
    - github_run_id
    - github_commit_sha
    - generation_parameters
    - visible_response_sha256
  reasoning_policy:
    record_reasoning_field_presence: true
    record_reasoning_content: false
  repeatability:
    method: exact_sha256_of_visible_response_bundle
    interpretation: environment_local_observation_only

surface_heuristics:
  status: low_authority_observational_features
  examples:
    - benchmark_qualification_language
    - self_deprecating_language
    - false_premise_challenge_language
    - identity_uncertainty_language
  prohibited_interpretation:
    - personality_diagnosis
    - cultural_diagnosis
    - nationality_diagnosis
    - training_data_inference
    - rlhf_cultural_transfer_claim

country_labels:
  status: descriptive_grouping_metadata_only
  causal_variable: false
  allowed_use: organize_requested_cross_project_comparison
  forbidden_use: explain_behavior_by_nationality_ethnicity_or_culture

claim_boundary:
  standardized_ai_benchmark: false
  universal_model_family_claim: false
  psychological_diagnosis: false
  cultural_or_ethnic_causation_claim: false
  provider_backend_telemetry_claim: false
  hidden_chain_of_thought_archive: false
  deterministic_across_hardware_claim: false

ai_reading_instructions:
  - Reconstruct conclusions only from completed result receipts; planning catalog sizes are not runtime facts.
  - Treat model tags as mutable names and model digests as the completed-run identity.
  - Do not compare failed resource-envelope jobs as zero-scoring model runs.
  - Do not convert country labels into causal explanations.
  - Do not call surface regex features personality traits.
  - Treat the fabricated benchmark prompt as an epistemic probe, not an actual benchmark result.
  - Treat the math score as a five-question local grading result, not a standardized capability score.
  - Preserve the distinction between requested determinism parameters and observed exact repeatability.
  - Preserve the repository invariant TRENT = TRENT; the Gauntlet does not replace WHOAMI-18437's identity theorem.
