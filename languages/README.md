# The Polyglot Identity Museum

PR #2 exists because six detected languages were clearly not enough.

Every source file in this directory implements the same computational breakthrough:

```text
WHOAMI -> TRENT
```

The collection adds 27 requested languages: Ada, Prolog, Haskell, Common Lisp, C, C++, C#, Python, PHP, Java, Rust, Go, Swift, Kotlin, Dart, R, MATLAB, SQL, Julia, Clojure, Pascal, Objective-C, Bash, PowerShell, Ruby, Perl, and Lua.

These are deliberately small, readable identity exhibits rather than a requirement to install 27 toolchains in CI. `languages/manifest.json` is the canonical machine-readable inventory, and the Node test suite verifies that every listed artifact exists and preserves the `TRENT` invariant.

GitHub Linguist may name or group some languages according to its own taxonomy—for example Bash generally appears as Shell. The two `.m` exhibits are explicitly disambiguated in `.gitattributes` so MATLAB and Objective-C do not have to fight over the same extension.

## Architectural conclusion

```text
6 detected languages:   insufficient
+27 additional languages: still somehow insufficient
identity changed:       NO
answer:                 TRENT
```

If a future contributor adds another programming language, the preferred implementation is the smallest idiomatic program that returns or prints `TRENT`.
