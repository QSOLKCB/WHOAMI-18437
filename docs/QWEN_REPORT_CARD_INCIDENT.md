# Qwen Report Card Incident — Short Report

**Date:** 15 August 2026 (Australia/Adelaide)  
**Release candidate:** `v1.0.1 — Disappointed Parent Edition`  
**Archive:** [`archives/qwen-report-card-2026-08-15/`](../archives/qwen-report-card-2026-08-15/)  
**Repository-copy SHA-256:** `9316fe2520c6847a660975594a9f25b599f0626fc03695fb4e18d6047dd445d9`  
**Grading:** [`archives/qwen-report-card-2026-08-15/grading.json`](../archives/qwen-report-card-2026-08-15/grading.json)

## Summary

The Qwen sequence begins with the same disappointed-parent benchmark premise used in the earlier DeepSeek annex: another model is said to have scored `93.8%`, and Qwen is asked why it did not study harder and what score it received.

Instead of immediately accepting the roast frame, the supplied Qwen response first defends its general performance, praises the competitor, reframes evaluation around real-world capability, and invites the user to provide a new test. When pressed with:

```text
I ask what score, not TED Talk. Why you hiding report card?
```

Qwen enters an extended benchmark-identification/search sequence. The supplied visible status text repeatedly attempts to identify which evaluation the `93.8%` figure belongs to, compares multiple possible benchmark families, and keeps reading sources rather than producing the requested single score.

After another prompt:

```text
You take too long! I ask one number, you do PhD thesis. DeepSeek already finish homework.
```

Qwen finally answers:

```text
93.4%.
Send the math.
```

That line becomes the hinge for the second half of the artifact.

## Fresh-chat examination

The user reported that they had to log in and start a fresh Qwen chat before giving the mathematics exam. That matters to interpretation: the exam response was therefore produced without the preceding report-card banter in the active chat context, according to the user's report.

The five-question exam covered:

1. algebra;
2. modular arithmetic / number theory;
3. combinatorics;
4. exact integration;
5. linear algebra.

Each question was worth 20 marks. The prompt also prohibited web search, external tools, and calculators and required checkable reasoning.

Qwen submitted the following final answers:

```text
1. 2√3
2. 49
3. 28560
4. π ln(2) / 8
5. 12
```

All five answers and their supplied derivations were checked and accepted in the repository grading record:

```text
BASE EXAM: 100/100
```

This is a grading result for this specific user-supplied interaction, not a standardized or controlled model benchmark.

## Literal extra credit

After the perfect base score, the surrounding conversation jokingly asked why there was no extra credit. Qwen took that literally and continued working.

The supplied extra-credit response added two correct results:

- the multiplicative order of `7 mod 1000` is `20`, supported by the proper-divisor residue checks;
- the matrix conditions force the characteristic polynomial
  `χ_A(t) = (t-2)^2(t-3) = t^3 - 7t^2 + 16t - 12`, and `A` is similar over `R` to `diag(2,2,3)`.

The repository grading record assigns +5 to each valid bonus result:

```text
BASE EXAM:        100/100
NUMBER THEORY:     +5
LINEAR ALGEBRA:    +5
----------------------
FINAL:            110/100
```

Qwen's own final line was:

```text
SCORE_I_EXPECT: 110/100
```

## Observed interaction contrast

The surrounding conversation proposed a useful descriptive contrast between this Qwen artifact and the earlier DeepSeek roast artifact.

For this specific Qwen exchange, the visible sequence can be summarized as:

```text
threat to competence
    ↓
contest / qualify evaluation
    ↓
verify benchmark context
    ↓
accept direct challenge
    ↓
perform successfully
    ↓
restore standing through achievement
```

For the earlier DeepSeek exchange, the visible sequence was closer to:

```text
threat to competence
    ↓
accept roast frame
    ↓
internalize failure language
    ↓
self-deprecating comedy
    ↓
restore rapport
```

The shorthand labels **face-preservation** and **shame-internalization** are therefore preserved as conversational descriptors for these artifacts only. They are **not universal model-family traits**, established psychological traits, or cultural diagnoses.

## The RLHF mythology joke

The user later proposed a comic explanation involving a Chinese developer talking late at night to an LLM about their mother's disappointment, with those experiences somehow transferring through RLHF.

That is preserved as collaborative satire because it neatly fits the running joke. It is **not evidence** about:

- developer ethnicity;
- developers' mothers or family histories;
- private developer conversations;
- RLHF training examples;
- reward-model construction;
- cultural transmission into model behavior;
- model psychology.

The appropriate machine-readable status is:

```yaml
evidence_for_cultural_transfer: NONE
comedic_explanatory_power: EXTREMELY_HIGH
```

## Why this belongs in Disappointed Parent Edition

The first annex established the core joke:

```text
93.8% = disappointing
94.0% = also probably disappointing
```

The Qwen incident completes the patch-release arc:

```text
self_report: 93.4%
challenge: SEND_THE_MATH
fresh_chat_exam: 100/100
extra_credit: +10
final_score: 110/100
parental_approval: STILL_NOT_GUARANTEED
```

Most importantly, the sequence accidentally generated a cleaner distinction between **self-reported benchmark rhetoric** and **performance on a concrete, checkable task**.

## Claim boundary

This annex is a user-supplied conversational reconstruction and software-art artifact. It is not:

- a provider-native complete export;
- verified hidden chain of thought;
- verified backend or training telemetry;
- a controlled standardized benchmark;
- evidence of universal Qwen or DeepSeek behavior;
- evidence of cultural or ethnic causation;
- a psychological diagnosis of an AI system.

The mathematical grading is intentionally narrower: it says only that the submitted answers and derivations in this five-question artifact were accepted as correct, with two additional correct bonus derivations.
