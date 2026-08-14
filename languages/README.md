# The Polyglot Identity Museum

PR #2 added 27 languages because six detected languages were clearly not enough.

PR #3 responds to the equally serious discovery that **27 more was also not enough**.

Every source file in this directory implements the same computational breakthrough:

```text
WHOAMI -> TRENT
```

The canonical machine-readable inventory is [`manifest.json`](manifest.json). It now contains **71 exhibits**: the 27-language first wave plus a 44-exhibit second escalation.

## PR #3 escalation

The second wave adds five Amiga-specific exhibits (AmigaBASIC, AMOS BASIC, Blitz BASIC, Amiga E, and ARexx) plus BASIC, ALGOL 58, ALGOL 60, ALGOL 68, ALGOL W, AppleScript, ActionScript, Batchfile, C--, ColdFusion, Delphi, Geometric Description Language (GDL), Hermes, HolyC, microcode, 6502 machine-code bytes, Modula, Modula-2, Modula-3, Mystic Programming Language (MPL), OpenCL, Object Pascal, PL/I, QuakeC, Qalb, Quantum Computation Language (QCL), REXX, Smalltalk, SuperCollider, Structured Text, Morse code, TeX, UNITY, UnrealScript, WebAssembly, XSLT, Zig, Z Shell, and ZPL.

Some historical, theoretical, hardware-level, or niche entries are intentionally **museum-style source specimens**, not promises that every artifact can be compiled by a contemporary toolchain. The invariant is the preserved semantic payload, not toolchain archaeology.

`Microcode` is necessarily illustrative because there is no single architecture-independent microcode language. `Machine code` is represented as actual 6502 opcodes that write `TRENT` into screen memory. `UNITY` is represented as a theoretical-language specimen. Morse code is here because at this point the repository has abandoned all restraint.

GitHub Linguist may group aliases and dialects together, may not recognize every historical language, and may classify some source files under broader parent languages. That is fine. The goal is not to game a percentage; the goal is to make the language bar require emotional support.

## Amiga annex

The Amiga subdirectory is deliberately a mini-museum of languages associated with Amiga development:

```text
languages/amiga/
├── whoami_amigabasic.bas
├── whoami_amos_basic.amos
├── whoami_blitz_basic.bb
├── whoami_amiga_e.e
└── whoami_arexx.rexx
```

## Architectural conclusion

```text
original detected languages:  6
PR #2 additions:             27
PR #3 additions:             44
manifest exhibits:           71
identity changed:            NO
answer:                      TRENT
rest mode:                   NOT IMPLEMENTED
```

If a future contributor adds another programming language, the preferred implementation is the smallest plausible source artifact that preserves `TRENT`.

If the language has no sane concept of strings, printing, files, text, or humans, that is no longer considered a blocker.
