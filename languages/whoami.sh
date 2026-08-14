#!/usr/bin/env bash
# WHOAMI-18437 / Bash
# No subshell, no Kubernetes, no excuses.
set -euo pipefail

whoami_trent() {
  printf '%s\n' 'TRENT'
}

whoami_trent
