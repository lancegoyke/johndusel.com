# johndusel.com development commands
# Run `just` to see available commands

# Default recipe - list all commands
default:
    @just --list

# ─────────────────────────────────────────────────────────────────────────────
# Backend (Django)
# ─────────────────────────────────────────────────────────────────────────────

# Start Django development server
backend:
    cd backend && uv run python manage.py runserver

# Run Django migrations
migrate:
    cd backend && uv run python manage.py migrate

# Create new migration files
makemigrations:
    cd backend && uv run python manage.py makemigrations

# Create a superuser (uses env vars from .development.env)
createsuperuser:
    cd backend && uv run python manage.py createsuperuser --no-input

# Collect static files
collectstatic:
    cd backend && uv run python manage.py collectstatic --no-input

# Open Django shell
shell:
    cd backend && uv run python manage.py shell

# Run backend tests
test-backend:
    cd backend && uv run python manage.py test

# Run backend tests with coverage
test-backend-cov:
    cd backend && uv run coverage run --source='.' manage.py test && uv run coverage report

# Type check backend with mypy
typecheck:
    cd backend && uv run mypy .

# Format backend code with black
format:
    cd backend && uv run black .

# Check backend formatting without changes
format-check:
    cd backend && uv run black --check .

# ─────────────────────────────────────────────────────────────────────────────
# Frontend (Next.js)
# ─────────────────────────────────────────────────────────────────────────────

# Start Next.js development server
frontend:
    cd frontend && npm run dev

# Build frontend for production
build-frontend:
    cd frontend && npm run build

# Run frontend linter
lint:
    cd frontend && npm run lint

# Install frontend dependencies
npm-install:
    cd frontend && npm install

# ─────────────────────────────────────────────────────────────────────────────
# Static deployment (see docs/STATIC_DEPLOY.md)
# ─────────────────────────────────────────────────────────────────────────────

# Build the fully static site into frontend/out/ (pass a DB backup path the first time)
build-static db="":
    bash scripts/build-static.sh {{db}}

# Preview the built static site locally at http://localhost:8081
preview-static:
    cd frontend/out && python3 -m http.server 8081

# ─────────────────────────────────────────────────────────────────────────────
# Full Stack
# ─────────────────────────────────────────────────────────────────────────────

# Install all dependencies (backend + frontend)
install:
    cd backend && uv sync
    cd frontend && npm install

# Run all tests and checks
check: test-backend format-check typecheck lint

# ─────────────────────────────────────────────────────────────────────────────
# Dependencies
# ─────────────────────────────────────────────────────────────────────────────

# Lock backend dependencies (update uv.lock from pyproject.toml)
lock:
    cd backend && uv lock

# Upgrade all backend dependencies
lock-upgrade:
    cd backend && uv lock --upgrade

# Sync backend dependencies to match uv.lock
sync:
    cd backend && uv sync

# Export requirements.txt for production (from uv.lock)
export-requirements:
    cd backend && uv export --frozen --no-hashes -o requirements.txt

# ─────────────────────────────────────────────────────────────────────────────
# Setup
# ─────────────────────────────────────────────────────────────────────────────

# Initial setup for new developers
setup:
    cd backend && uv sync
    cd backend && uv run python manage.py migrate
    cd frontend && npm install
    @echo "Setup complete! Run 'just backend' and 'just frontend' in separate terminals."
