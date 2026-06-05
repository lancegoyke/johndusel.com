#!/usr/bin/env bash
# Build johndusel.com as a fully static site into frontend/out/.
#
# The Django backend is only a BUILD-TIME content source: Next.js fetches the
# (frozen) CMS content via getStaticProps, bakes it into HTML, and the result
# needs no backend at runtime. Post images are absolute S3 URLs, so the only
# external runtime dependency is the `johndusel.com` S3 bucket.
#
# Usage:
#   scripts/build-static.sh [path/to/db-backup.sqlite3]
#
# Pass a SQLite backup the first time (e.g. the dated backup from the flexion
# NAS at /mnt/mirror1/Websites/johndusel.com/backups/db/). Subsequent runs reuse
# backend/db.sqlite3 if no path is given.
#
# Prereqs: uv (backend), node + npm (frontend).
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DB_SRC="${1:-}"
PORT="${BACKEND_PORT:-8000}"
SITE_URL="${SITE_URL:-https://johndusel.com}"

cd "$ROOT/backend"
if [[ -n "$DB_SRC" ]]; then
  echo "→ Using DB backup: $DB_SRC"
  cp "$DB_SRC" ./db.sqlite3
fi
if [[ ! -f ./db.sqlite3 ]]; then
  echo "ERROR: backend/db.sqlite3 not found." >&2
  echo "       Pass a backup path, e.g.:" >&2
  echo "       scripts/build-static.sh ~/Downloads/johndusel_db_YYYYMMDD.backup.sqlite3" >&2
  exit 1
fi

# DEBUG=True keeps it a simple local content source (no prod SSL redirects etc.).
export DATABASE_URL="sqlite:///$(pwd)/db.sqlite3"
export SECRET_KEY="${SECRET_KEY:-build-time-only-not-secret}"
export DEBUG=True
export ALLOWED_HOSTS="localhost,127.0.0.1"
export ENVIRONMENT=development

echo "→ Applying migrations (no-op if DB is current)..."
uv run python manage.py migrate --noinput

echo "→ Starting build-time backend on 127.0.0.1:${PORT}..."
uv run python manage.py runserver "127.0.0.1:${PORT}" >/tmp/jd-build-backend.log 2>&1 &
BACKEND_PID=$!
trap 'kill "${BACKEND_PID}" 2>/dev/null || true' EXIT

# Wait for the API (curl handles the retry/backoff; no sleep needed).
if ! curl -s --retry 30 --retry-delay 1 --retry-connrefused -o /dev/null \
        "http://127.0.0.1:${PORT}/api/posts/"; then
  echo "ERROR: build-time backend never answered on :${PORT}. See /tmp/jd-build-backend.log" >&2
  exit 1
fi
echo "  backend is serving content."

cd "$ROOT/frontend"
echo "→ Installing frontend deps..."
npm ci 2>/dev/null || npm install
echo "→ Building static export..."
BASE_API_URL="http://127.0.0.1:${PORT}/api" SITE_URL="${SITE_URL}" SENTRY_DRY_RUN=true npm run build

echo
echo "✅ Static site built at frontend/out/"
echo "   Preview:  cd frontend/out && python3 -m http.server 8081"
echo "   Deploy:   ship frontend/out/ to Hetzner (Caddy file_server) — see docs/STATIC_DEPLOY.md"
