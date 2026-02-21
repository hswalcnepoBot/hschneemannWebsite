#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TEMPLATE_FILE="${ROOT_DIR}/src/index.template.html"
OUTPUT_FILE="${ROOT_DIR}/index.html"

render_template() {
  local include_regex='^[[:space:]]*<!--[[:space:]]*@include[[:space:]]+([^[:space:]]+)[[:space:]]*-->[[:space:]]*$'
  while IFS= read -r line || [[ -n "$line" ]]; do
    if [[ "$line" =~ $include_regex ]]; then
      include_file="${ROOT_DIR}/src/${BASH_REMATCH[1]}"
      if [[ ! -f "$include_file" ]]; then
        echo "Missing include file: ${include_file}" >&2
        exit 1
      fi
      cat "$include_file"
    else
      printf '%s\n' "$line"
    fi
  done < "$TEMPLATE_FILE"
}

render_template > "$OUTPUT_FILE"
echo "Built ${OUTPUT_FILE} from ${TEMPLATE_FILE}"
