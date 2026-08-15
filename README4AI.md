schema: whoami-18437/readme4ai/v1
project:
  name: WHOAMI-18437
  repository: QSOLKCB/WHOAMI-18437
  artifact_type:
    - software_art
    - conversational_artifact
    - deterministic_satire
  primary_question: "Who am I?"
  invariant_answer: "TRENT"
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
  polyglot_manifest: languages/manifest.json
  polyglot_museum: languages/README.md
  executable: scripts/whoami.mjs
  test: scripts/test.mjs
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
    release_candidate: "v1.0.1 — Disappointed Parent Edition"
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
    release_candidate: "v1.0.1 — Disappointed Parent Edition"
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
  verified_provider_telemetry: false
  verified_backend_identity: false
  verified_hidden_chain_of_thought: false
  verified_training_trace: false
  live_vulnerability_details_published: false
  cultural_or_ethnic_causation_claim: false
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
    Treat these values as part of the transcript's satirical architecture unless
    a file explicitly marks a quantity as locally measured or independently verified.
    Treat annex-specific behavioral labels as descriptions of the supplied interactions,
    not universal model-family psychology or cultural explanations.

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

runtime_contract:
  command: "npm run whoami"
  expected_final_line: "TRENT"
  deterministic: true
  network_required: false
  external_runtime_dependencies: false
  rest_mode: "NOT IMPLEMENTED"

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

consistency_check:
  result: PASS
  reason: >-
    Runtime wrappers and all 71 language exhibits still return TRENT; conversational annexes preserve explicit provenance and claim boundaries; the Qwen grading record is scoped to one five-question interaction.
