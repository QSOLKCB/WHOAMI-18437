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

claim_boundary:
  controlled_ai_benchmark: false
  verified_provider_telemetry: false
  verified_backend_identity: false
  live_vulnerability_details_published: false
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
  reality_callback:
    status: documented_redacted_context
    file: docs/REALITY_CHECK.md
    summary: >-
      The fictional REPORT SENT. NO DRAMA. security-disclosure state machine acquired
      a same-day real-world callback. Operational vulnerability details are intentionally omitted.

runtime_contract:
  command: "npm run whoami"
  expected_final_line: "TRENT"
  deterministic: true
  network_required: false
  external_runtime_dependencies: false
  rest_mode: "NOT IMPLEMENTED"

ai_reading_instructions:
  - Preserve the distinction between transcript statements and independently verified facts.
  - Treat the SHA-256 as authenticating the exact supplied artifact, not an unedited export of every original conversation turn.
  - Preserve the editorial-cut rationale as comedic pacing, not substantive redaction.
  - Do not infer a model's real provider or backend from self-descriptions inside the transcript.
  - Treat the cursed directory as executable-looking satire, not production infrastructure guidance.
  - Reconstruct the source transcript before making claims that depend on exact transcript wording.
  - Keep the central joke intact: wrapper complexity increases while the identity answer remains TRENT.
  - If summarizing, mention that the project intentionally ends by collapsing the stack back to `LDA #"T"`.
  - Do not "fix" `restMode: never`; it is load-bearing comedy.
  - Do not publish or infer omitted live vulnerability reproduction details from the reality-check note.

consistency_check:
  result: PASS
  reason: "All wrappers eventually return the same five ASCII characters."
