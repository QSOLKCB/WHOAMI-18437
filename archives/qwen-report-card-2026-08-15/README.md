# Qwen Report Card Incident — conversational reconstruction — 2026-08-15

This directory preserves a user-supplied reconstruction of the Qwen **Report Card Incident** used to complete the `v1.0.1 — Disappointed Parent Edition` release candidate.

## Repository-copy metadata

```text
source role:      user-supplied conversational reconstruction
lines:            617
bytes:            15125
sha256:           6d5443367a290028628805ec26dea28358d49bca7203f375957c6de48009793f
gzip bytes:       6135
archive parts:    2
gzip mtime:       0
```

The reconstruction includes text transcribed by the user from visible Qwen responses/status output, the fresh-chat mathematics exam, the submitted answers, and the literal extra-credit continuation.

The SHA-256 identifies the reconstructed repository copy. It does **not** authenticate a provider-native export, complete UI event history, hidden chain of thought, backend trace, model weights, training trace, or reward-model trace.

## Reconstruct

From the repository root:

```bash
cat archives/qwen-report-card-2026-08-15/source.md.gz.b64.part-* \
  | base64 -d \
  | gzip -dc \
  > Qwen-Report-Card-2026-08-15.md

sha256sum Qwen-Report-Card-2026-08-15.md
```

Expected SHA-256:

```text
6d5443367a290028628805ec26dea28358d49bca7203f375957c6de48009793f
```

## Interpretation boundary

The phrases **face preservation**, **internalized shame**, and similar labels in the associated report describe interaction patterns observed in these supplied conversations. They are not universal claims about Qwen, DeepSeek, Chinese developers, Chinese culture, Asian families, or any population.

The late-night-developer / maternal-disappointment / RLHF explanation is preserved as explicit collaborative satire. No evidence in this annex establishes that developer ethnicity, family experiences, maternal expectations, cultural fears, or private conversations were transmitted into model behavior through RLHF.

## Grading

The mathematics submission and extra credit are recorded separately in [`grading.json`](grading.json). This is a repository grading record for this specific five-question exam, **not** a standardized model benchmark.

For the short report, see [`../../docs/QWEN_REPORT_CARD_INCIDENT.md`](../../docs/QWEN_REPORT_CARD_INCIDENT.md).
