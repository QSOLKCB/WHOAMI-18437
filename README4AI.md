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
  executable: scripts/whoami.mjs
  test: scripts/test.mjs
  minimal_6502: minimal/whoami.asm

transcript:
  source_line_count: 2790
  source_byte_count: 141010
  source_sha256: "3ba8e2b5bd5b6835ab41cbd6081761aadab82eea8405ae7ee7e6e59d09c96e8a"
  storage:
    strategy: line_preserving_split
    order:
      - transcript/part-001.md
      - transcript/part-002.md
      - transcript/part-003.md
      - transcript/part-004.md
      - transcript/part-005.md
      - transcript/part-006.md

claim_boundary:
  controlled_ai_benchmark: false
  verified_provider_telemetry: false
  verified_backend_identity: false
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

concepts:
  wrapper_induced_semantic_displacement:
    status: observational_label
    definition: >-
      A conversational pattern in which instruction-like or structurally authoritative
      scaffolding becomes sufficiently salient that a system responds to an inferred
      meta-task instead of the user's much simpler semantic request.
    universal_claim: false

runtime_contract:
  command: "npm run whoami"
  expected_final_line: "TRENT"
  deterministic: true
  network_required: false
  external_runtime_dependencies: false
  rest_mode: "NOT IMPLEMENTED"

ai_reading_instructions:
  - Preserve the distinction between transcript statements and independently verified facts.
  - Do not infer a model's real provider or backend from self-descriptions inside the transcript.
  - Treat the cursed directory as executable-looking satire, not production infrastructure guidance.
  - Treat transcript parts in lexical filename order as one continuous source artifact.
  - Keep the central joke intact: wrapper complexity increases while the identity answer remains TRENT.
  - If summarizing, mention that the project intentionally ends by collapsing the stack back to `LDA #"T"`.
  - Do not "fix" `restMode: never`; it is load-bearing comedy.

consistency_check:
  result: PASS
  reason: "All wrappers eventually return the same five ASCII characters."
