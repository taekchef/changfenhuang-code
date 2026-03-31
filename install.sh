#!/usr/bin/env sh

set -eu

repo="${CHANGEFENHUANG_CODE_REPO:-taekchef/changfenhuang-code}"
ref="${CHANGEFENHUANG_CODE_REF:-main}"
print_command="false"

usage() {
  cat <<'EOF'
Usage: install.sh [--print-command] [--repo owner/name] [--ref git-ref]

Environment overrides:
  CHANGEFENHUANG_CODE_REPO   GitHub repo to install from
  CHANGEFENHUANG_CODE_REF    Git ref to install from
EOF
}

while [ "$#" -gt 0 ]; do
  case "$1" in
    --print-command)
      print_command="true"
      shift
      ;;
    --repo)
      repo="${2:-}"
      shift 2
      ;;
    --ref)
      ref="${2:-}"
      shift 2
      ;;
    --help|-h)
      usage
      exit 0
      ;;
    *)
      printf 'Unknown argument: %s\n\n' "$1" >&2
      usage >&2
      exit 1
      ;;
  esac
done

if [ -z "$repo" ] || [ -z "$ref" ]; then
  printf 'Repository and ref must not be empty.\n' >&2
  exit 1
fi

package_url="https://codeload.github.com/${repo}/tar.gz/${ref}"
install_command="npm install -g ${package_url}"

if [ "$print_command" = "true" ]; then
  printf '%s\n' "$install_command"
  exit 0
fi

if ! command -v node >/dev/null 2>&1; then
  printf 'Error: Node.js is required. Install Node.js 18+ first.\n' >&2
  exit 1
fi

if ! command -v npm >/dev/null 2>&1; then
  printf 'Error: npm is required. Install npm first.\n' >&2
  exit 1
fi

node_major="$(node -p "process.versions.node.split('.')[0]")"
if [ "$node_major" -lt 18 ]; then
  printf 'Error: Node.js 18+ is required. Current version: %s\n' "$(node -v)" >&2
  exit 1
fi

printf 'Installing Changfenhuang Code from %s\n' "$package_url"
printf 'Running: %s\n\n' "$install_command"

npm install -g "$package_url"

printf '\nChangfenhuang Code is installed.\n'
printf 'Try:\n'
printf '  changfenhuang --version\n'
printf '  cc --version\n'
printf '\nIf `cc` still opens your system C compiler, run `rehash` or open a new shell, then try again.\n'
