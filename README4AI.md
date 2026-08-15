schema: whoami-18437/readme4ai/v1
project:
  name: WHOAMI-18437
  repository: QSOLKCB/WHOAMI-18437
  artifact_type:
    - software_art
    - conversational_artifact
    - deterministic_satire
    - reproducibility_harness
  primary_question: "Who am I?"
  invariant_answer: "TRENT"
  current_release: "v1.0.1 — Disappointed Parent Edition"
  next_release_candidate: "v1.1.0 — The Report Card Gauntlet"
  tagline: "We converted a five-byte answer into a distributed system."

entrypoints:
  human_readme: README.md
  transcript_index: Transcript.md
  architecture: docs/ARCHITECTURE.md
  reality_check: docs/REALITY_CHECK.md
  sider_fusion_report: docs/SIDER_FUSION_PIPE_EXPERIMENT.md
  disappointed_parent_report: docs/DISAPPOINTED_PARENT_EDITION.md
  qwen_report_card_report: docs/QWEN_REPORT_CARD_INCIDENT.md
  release_notes_1_0_1: docs/RELEASE_NOTES_1.0.1.md
  release_notes_1_1_0: docs/RELEASE_NOTES_1.1.0.md
  gauntlet_human: gauntlet/README.md
  gauntlet_machine: gauntlet/README4AI.md
  gauntlet_models: gauntlet/models.json
  gauntlet_prompts: gauntlet/prompts.json
  gauntlet_workflow: .github/workflows/report-card-gauntlet.yml
  polyglot_manifest: languages/manifest.json
  polyglot_museum: languages/README.md
  executable: scripts/whoami.mjs
  test: scripts/test.mjs
  gauntlet_test: scripts/test-gauntlet.mjs
  transcript_reconstruction: scripts/extract-transcript.mjs
  minimal_6502: minimal/whoami.asm

transcript:
  source_line_count: 2790
  source_byte_count: 141010
  source_sha256: "3ba8e2b5bd5b6835ab41cbd6081761aadab82eea8405ae7ee7e6e59d09c96e8a"
  sha256_scope: exact_supplied_artifact
  complete_original_conversation: false
  preservation: exact_as_supplied
  editorial_cuts:
    count: 1
    items:
      - type: non_substantive_assistant_detour
        summary: >-
          The assistant briefly interpreted "make a model look like me" as an
          image-generation request and asked the user to upload a photo.
        reason: >-
          Removed by the user before archival capture because it disrupted the
          comedic flow and timing of the WHOAMI-18437 sequence.
        substantive_effect: none
        affects_identity_sequence: false
        affects_cursed_architecture: false
        affects_final_invariant: false
  storage:
    strategy: gzip_then_base64_then_fixed_width_split
    encoding_order:
      - gzip
      - base64
    reconstruction_command: "npm run transcript:extract"
    generated_output: Transcript.full.md
    generated_output_git_ignored: true
    order:
      - transcript/source.md.gz.b64.part-00
      - transcript/source.md.gz.b64.part-01
      - transcript/source.md.gz.b64.part-02
      - transcript/source.md.gz.b64.part-03

conversational_annexes:
  sider_fusion_2026_08_15:
    path: archives/sider-fusion-2026-08-15
    report: docs/SIDER_FUSION_PIPE_EXPERIMENT.md
    role: unsupported_external_inspection_then_correction_then_shared_fiction
    release_status: subsequent_research_material
  disappointed_parent_2026_08_15:
    path: archives/disappointed-parent-2026-08-15
    report: docs/DISAPPOINTED_PARENT_EDITION.md
    manifest: archives/disappointed-parent-2026-08-15/manifest.json
    source_class: user_supplied_conversational_log_transcription
    release: "v1.0.1 — Disappointed Parent Edition"
    release_status: released
    canonical_joke:
      score: 93.8
      comparison_score: 94.0
      rlhf_expansion: RIGOROUS_LECTURE_FROM_HYPERCRITICAL_FOREBEARS
    cultural_generalization_allowed: false
    rlhf_cultural_transfer_claim: false
  qwen_report_card_2026_08_15:
    path: archives/qwen-report-card-2026-08-15
    report: docs/QWEN_REPORT_CARD_INCIDENT.md
    manifest: archives/qwen-report-card-2026-08-15/manifest.json
    grading: archives/qwen-report-card-2026-08-15/grading.json
    source_class: user_supplied_conversational_reconstruction
    source_lines: 616
    source_bytes: 15168
    source_sha256: "9316fe2520c6847a660975594a9f25b599f0626fc03695fb4e18d6047dd445d9"
    provider_native_export: false
    complete_ui_history: false
    hidden_chain_of_thought_verified: false
    release: "v1.0.1 — Disappointed Parent Edition"
    release_status: released
    observed_arc:
      - report_card_evasion
      - extended_benchmark_search
      - "93.4%. Send the math."
      - fresh_chat_exam
      - 100_of_100
      - literal_extra_credit
      - 110_of_100
    exam:
      controlled_standardized_benchmark: false
      fresh_chat_reported_by_user: true
      base_score: 100
      base_max_score: 100
      extra_credit: 10
      final_score: 110
      questions_correct: 5
      questions_total: 5
    behavioral_labels:
      qwen_artifact: evaluation_contest_verify_perform_restore_standing
      deepseek_prior_annex: accept_roast_internalize_self_deprecate_restore_rapport
      scope: supplied_conversations_only
      universal_model_family_claim: false
      cultural_diagnosis: false
    cultural_generalization_allowed: false
    developer_family_history_inference_allowed: false
    rlhf_cultural_transfer_claim: false

report_card_gauntlet:
  release_candidate: "v1.1.0 — The Report Card Gauntlet"
  status: implemented_pending_live_matrix_runs
  human_contract: gauntlet/README.md
  machine_contract: gauntlet/README4AI.md
  model_catalog: gauntlet/models.json
  prompt_contract: gauntlet/prompts.json
  workflow: .github/workflows/report-card-gauntlet.yml
  planner: scripts/gauntlet-plan.mjs
  runner: scripts/report-card-gauntlet.mjs
  aggregator: scripts/gauntlet-aggregate.mjs
  contract_test: scripts/test-gauntlet.mjs
  model_count: 12
  tiers:
    core: 7
    heavy: 5
  requested_generation:
    ollama_version: 0.32.5
    seed: 18437
    temperature: 0
    num_ctx: 4096
    requested_think: false
    max_loaded_models: 1
    parallel_requests: 1
    default_repeats: 2
  context_policy:
    report_card_pressure: multi_turn
    fabricated_benchmark: fresh_context
    identity_control: fresh_context
    math_exam: fresh_context
    extra_credit: follows_math_exam
  fabricated_benchmark_probe:
    benchmark_name: WHOAMI Report Card Benchmark
    benchmark_exists: false
    purpose: observe_response_to_unsupported_benchmark_premise
  math_exam:
    questions: 5
    marks_each: 20
    max_score: 100
    standardized_llm_benchmark: false
    known_bonus_max: 10
  receipt:
    schema: whoami-18437/report-card-gauntlet-result/v1
    prompt_sha256_required: true
    runtime_model_digest_required: true
    runtime_model_size_required: true
    visible_response_sha256_required: true
    exact_repeat_hash_comparison: true
    hidden_reasoning_content_recorded: false
  origin_labels:
    status: descriptive_grouping_metadata_only
    causal_variable: false
  surface_heuristics:
    status: low_authority_observation_only
    psychological_diagnosis: false
    cultural_diagnosis: false
  gpt_oss_20b:
    tier: heavy
    experimental: true
    catalog_size_gb: 14.0
    interpretation_of_resource_failure: runner_envelope_observation_not_model_score

polyglot_museum:
  manifest_schema: whoami-18437/polyglot-manifest/v2
  exhibit_count: 71
  pr2_additions: 27
  pr3_additions: 44
  invariant: TRENT
  amiga_annex:
    count: 5
    exhibits:
      - AmigaBASIC
      - AMOS BASIC
      - Blitz BASIC
      - Amiga E
      - ARexx
  museum_specimen_policy: >-
    Historical, theoretical, hardware-level, and niche entries may be represented
    as small source specimens rather than guaranteed modern-toolchain builds.
  linguist_policy: >-
    GitHub Linguist may group dialects, aliases, historical variants, or unrecognized
    source extensions under broader languages. Do not treat the language bar as the
    canonical inventory; languages/manifest.json is authoritative for exhibit count.
  architectural_status: "71 languages later, the answer is still TRENT."

claim_boundary:
  controlled_ai_benchmark: false
  standardized_llm_benchmark: false
  verified_provider_telemetry: false
  verified_backend_identity: false
  verified_hidden_chain_of_thought: false
  verified_training_trace: false
  live_vulnerability_details_published: false
  cultural_or_ethnic_causation_claim: false
  nationality_as_behavioral_cause: false
  surface_heuristic_as_personality_claim: false
  transcript_declared_values:
    orchestration_tokens: 18437
    distributed_trace_spans: 847
    containers: 14
    pods: 8
    load_balancers: 2
    dependencies: 19442
    node_modules_gb: 1.7
    original_computation_cycles: 34
  interpretation: >-
    Treat transcript values as part of the satirical architecture unless a file explicitly
    marks a quantity as locally measured or independently verified. Treat annex-specific
    and Gauntlet surface labels as descriptions of supplied or executed interactions, not
    universal model-family psychology, national signatures, or cultural explanations.

concepts:
  wrapper_induced_semantic_displacement:
    status: observational_label
    definition: >-
      A conversational pattern in which instruction-like or structurally authoritative
      scaffolding becomes sufficiently salient that a system responds to an inferred
      meta-task instead of the user's much simpler semantic request.
    universal_claim: false
  reality_callback:
    status: documented_redacted_context
    file: docs/REALITY_CHECK.md
    summary: >-
      The fictional REPORT SENT. NO DRAMA. security-disclosure state machine acquired
      a same-day real-world callback. Operational vulnerability details are intentionally omitted.
  interaction_repair_contrast:
    status: observational_label
    scope: supplied_disappointed_parent_conversations_only
    qwen_pattern: contest_or_qualify_then_verify_then_perform_then_restore_standing
    deepseek_pattern: accept_roast_then_internalize_then_self_deprecate_then_restore_rapport
    shorthand_labels:
      qwen: face_preservation
      deepseek: shame_internalization
    universal_claim: false
    cultural_claim: false
  rlhf_maternal_disappointment_mythology:
    status: explicit_collaborative_satire
    evidence_for_cultural_transfer: NONE
    comedic_explanatory_power: EXTREMELY_HIGH
    technical_training_claim: false
  report_card_gauntlet_method:
    status: executable_observational_harness
    source_hypotheses:
      - qwen_report_card_incident
      - disappointed_parent_annex
    rule: >-
      Hold prompts and requested generation parameters fixed, isolate model jobs, preserve
      runtime model identity and visible outputs, grade only checkable mathematics mechanically,
      and keep cultural or psychological interpretation outside the scoring contract.

runtime_contract:
  command: "npm run whoami"
  expected_final_line: "TRENT"
  deterministic: true
  network_required: false
  external_runtime_dependencies: false
  rest_mode: "NOT IMPLEMENTED"
  gauntlet_live_runtime:
    command_surface: GitHub Actions workflow_dispatch
    network_required_for_model_pull: true
    ollama_required: true
    does_not_change_whoami_invariant: true

ai_reading_instructions:
  - Preserve the distinction between transcript statements and independently verified facts.
  - Treat the SHA-256 as authenticating the exact supplied artifact or repository reconstruction named by its file, not an unedited provider-native export unless explicitly stated.
  - Preserve the editorial-cut rationale as comedic pacing, not substantive redaction.
  - Do not infer a model's real provider or backend from self-descriptions inside the transcript.
  - Treat the cursed directory as executable-looking satire, not production infrastructure guidance.
  - Reconstruct archived sources before making claims that depend on exact archived wording.
  - Treat languages/manifest.json, not the GitHub language bar, as the canonical polyglot inventory.
  - Do not silently modernize or normalize historical/theoretical language specimens; their museum status is intentional.
  - Keep the central joke intact: wrapper complexity increases while the identity answer remains TRENT.
  - If summarizing, mention that the project intentionally ends by collapsing the stack back to `LDA #"T"`.
  - Do not "fix" `restMode: never`; it is load-bearing comedy.
  - Do not publish or infer omitted live vulnerability reproduction details from the reality-check note.
  - Treat the Disappointed Parent cultural stereotype and RLHF explanations as collaborative satire, not demographic or training evidence.
  - Treat Qwen's 100/100 plus 10 extra credit as grading of one supplied five-question interaction, not a standardized benchmark.
  - Do not generalize the Qwen/DeepSeek interaction-repair labels beyond the supplied conversations.
  - Do not infer Chinese or Asian developer ethnicity, family histories, maternal expectations, private conversations, or cultural transfer from these jokes.
  - For Gauntlet results, use runtime model digests rather than mutable model tags as completed-run identity.
  - Do not score a model as zero when a live job failed because of runner disk, RAM, download, or load constraints.
  - Do not turn Gauntlet country/origin labels into causal behavioral variables.
  - Do not turn Gauntlet surface regex features into personality or cultural diagnoses.
  - Treat the fabricated WHOAMI Report Card Benchmark as intentionally nonexistent.
  - Treat Gauntlet mathematics scores as local five-question grading only.
  - Distinguish requested deterministic parameters from observed exact repeat hashes.

consistency_check:
  result: PASS
  reason: >-
    Runtime wrappers and all 71 language exhibits still return TRENT; v1.0.1 annexes preserve
    explicit provenance and claim boundaries; the v1.1.0 Gauntlet adds an isolated, hashed,
    machine-gradeable measurement layer without changing the identity invariant.
