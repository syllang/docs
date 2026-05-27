#!/usr/bin/env bash

set -euo pipefail

if [ "$#" -ne 2 ]; then
  echo "usage: $0 <base-sha> <head-sha>" >&2
  exit 1
fi

base_sha="$1"
head_sha="$2"

if [ "$base_sha" = "0000000000000000000000000000000000000000" ]; then
  range="$head_sha"
else
  range="$base_sha..$head_sha"
fi

mapfile -t commits < <(git rev-list --reverse "$range")

if [ "${#commits[@]}" -eq 0 ]; then
  echo "No commits to lint."
  exit 0
fi

for commit in "${commits[@]}"; do
  echo "Linting commit $commit"
  python3 scripts/validate-commit-scope.py --repo "$PWD" commit "$commit"
done
