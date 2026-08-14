# WHOAMI-18437

> **Question:** `Who am I?`  
> **Transcript-declared orchestration:** `18,437 tokens`  
> **Final answer:** `TRENT`  
> **Architecture review:** `PASS`  
> **Reason:** We converted a five-byte answer into a distributed system.

WHOAMI-18437 is a small piece of executable software satire built from a real conversational artifact that started with a tiny identity question and escalated through cursed YAML, XML, FORTRAN, COBOL, MOS 6502 assembly, TypeScript, React, GraphQL, WebAssembly, Docker, Kubernetes, OpenTelemetry, GitHub Actions, and finally back down to:

```asm
LDA #"T"
```

The joke is simple: the semantic payload stays tiny while the wrapper stack becomes absurd.

## Run it

Requires Node.js 20+ and no runtime dependencies.

```bash
npm run whoami
npm test
```

`npm run whoami` deterministically walks through twelve theatrical wrapper stages and prints the invariant answer:

```text
TRENT
```

The implementation deliberately does **not** require Kubernetes, GraphQL, WASM, FORTRAN, COBOL, a 6502, fourteen containers, or 1.7 GB of `node_modules`. Those belong to the cursed architecture exhibit.

## What this is

- software art;
- a conversational artifact;
- a deterministic joke you can execute;
- a record of how structural framing can become more salient than a very simple semantic request;
- an excuse to place COBOL, FORTRAN, 6502 assembly, React, and Kubernetes in the same repository.

## What this is not

WHOAMI-18437 is **not** presented as a controlled AI benchmark, a universal model-behaviour claim, or verified telemetry about any provider. Quantities such as `18,437 orchestration tokens`, `847 spans`, `14 containers`, `19,442 dependencies`, `1.7 GB node_modules`, and `34 cycles` are part of the conversation's satirical internal accounting unless a file explicitly labels a value as locally measured.

Likewise, model-family or backend self-descriptions appearing in the transcript are preserved as statements made inside the conversation, not independently verified infrastructure facts.

## Transcript

[`Transcript.md`](Transcript.md) is the archival entry point. The source conversation is preserved as a line-preserving six-part split under [`transcript/`](transcript/) because the original log is large.

Canonical source metadata for the supplied log:

```text
lines: 2790
bytes: 141010
sha256: 3ba8e2b5bd5b6835ab41cbd6081761aadab82eea8405ae7ee7e6e59d09c96e8a
```

The split is purely for repository handling; concatenate `transcript/part-001.md` through `part-006.md` in lexical order to reconstruct the supplied source text.

## Repository map

```text
WHOAMI-18437/
├── README.md
├── README4AI.md
├── Transcript.md
├── package.json
├── scripts/
│   ├── whoami.mjs
│   └── test.mjs
├── transcript/
│   ├── SOURCE_SHA256.txt
│   └── part-001.md ... part-006.md
├── cursed/
│   ├── trent-fusion.xml
│   ├── TRENT-FUSION.COB
│   ├── trent-fusion.f
│   ├── trent.asm
│   ├── trent.ts
│   ├── App.tsx
│   ├── server.mjs
│   ├── schema.graphql
│   ├── Dockerfile
│   ├── docker-compose.yml
│   ├── kubernetes.yml
│   └── telemetry.ts
├── minimal/
│   └── whoami.asm
├── docs/
│   └── ARCHITECTURE.md
└── .github/workflows/
    └── ci.yml
```

## The invariant

Everything in the repository is allowed to become needlessly complicated except the answer:

```text
Trent = Trent
```

Or, in the spirit of the transcript:

```lean
 theorem trent_is_trent : Trent = Trent := by
   rfl
```

## Design rule

If a future contribution makes `npm run whoami` print anything other than `TRENT`, the architecture has become too clever and should be made stupider immediately.

## License

Apache-2.0. The repository's existing [`LICENSE`](LICENSE) applies to the project code and documentation. The transcript is preserved as an authored conversational artifact; third-party names and model references are descriptive/contextual and do not imply endorsement.
