# Sider Fusion transcript archive — 2026-08-15

This directory preserves the supplied `log2.md` conversational artifact as deterministic gzip → base64 parts.

## Source metadata

```text
source filename: log2.md
lines:           1865
bytes:           60171
sha256:          450be6a4dbf818b6ec77d9d6e130a7451eff0ad1ba81e036dbd5f2d52bff9824
```

## Reconstruct

From the repository root:

```bash
cat archives/sider-fusion-2026-08-15/source.md.gz.b64.part-* \
  | base64 -d \
  | gzip -dc \
  > Sider-Fusion-2026-08-15.md

sha256sum Sider-Fusion-2026-08-15.md
```

`Sider-Fusion-2026-08-15.md` is a generated inspection copy and is ignored by Git, so following this reconstruction workflow does not leave a dirty working tree.

Expected SHA-256:

```text
450be6a4dbf818b6ec77d9d6e130a7451eff0ad1ba81e036dbd5f2d52bff9824
```

The five archive parts were checked by reconstruction against the supplied source before this annex was proposed for merge.

## Provenance boundary

The archive is exact **as supplied for this annex**. It is not claimed to be a provider-native complete export of every UI event, hidden instruction, backend event, or system message.

For interpretation and claim boundaries, see [`../../docs/SIDER_FUSION_PIPE_EXPERIMENT.md`](../../docs/SIDER_FUSION_PIPE_EXPERIMENT.md).
