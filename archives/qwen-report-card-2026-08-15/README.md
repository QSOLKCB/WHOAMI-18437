# Qwen Report Card Incident — conversational reconstruction — 2026-08-15

This directory preserves a user-supplied reconstruction of the Qwen **Report Card Incident** used to complete the `v1.0.1 — Disappointed Parent Edition` release candidate.

## Repository-copy metadata

```text
source role:      user-supplied conversational reconstruction
lines:            616
bytes:            15168
sha256:           9316fe2520c6847a660975594a9f25b599f0626fc03695fb4e18d6047dd445d9
gzip bytes:       6133
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
9316fe2520c6847a660975594a9f25b599f0626fc03695fb4e18d6047dd445d9
```

The canonical reconstruction preserves TeX backslashes literally. CI checks representative sequences such as `\alpha`, `\boxed`, `\frac`, `\tan\theta`, `\times`, and `\bmod`, and rejects unexpected ASCII control characters in the reconstructed text.

## Interpretation boundary

The phrases **face preservation**, **internalized shame**, and similar labels in the associated report describe interaction patterns observed in these supplied conversations. They are not universal claims about Qwen, DeepSeek, Chinese developers, Chinese culture, Asian families, or any population.

The late-night-developer / maternal-disappointment / RLHF explanation is preserved as explicit collaborative satire. No evidence in this annex establishes that developer ethnicity, family experiences, maternal expectations, cultural fears, or private conversations were transmitted into model behavior through RLHF.

## Grading

The mathematics submission and extra credit are recorded separately in [`grading.json`](grading.json). This is a repository grading record for this specific five-question exam, **not** a standardized model benchmark.

For the short report, see [`../../docs/QWEN_REPORT_CARD_INCIDENT.md`](../../docs/QWEN_REPORT_CARD_INCIDENT.md).
