# syntax=docker/dockerfile:1

# Build stage - install dependencies
FROM python:3.11-slim AS builder

# Install uv for fast dependency installation
COPY --from=ghcr.io/astral-sh/uv:latest /uv /usr/local/bin/uv

WORKDIR /app

# Copy dependency files
COPY pyproject.toml uv.lock ./

# Install dependencies into a virtual environment
RUN uv sync --frozen --no-dev --no-install-project

# Production stage
FROM python:3.11-slim AS production

WORKDIR /app

# Create non-root user for security
RUN useradd --create-home --shell /bin/bash app

# Copy virtual environment from builder
COPY --from=builder /app/.venv /app/.venv

# Set up environment
ENV PATH="/app/.venv/bin:$PATH"
ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1

# Copy application code
COPY --chown=app:app . .

# Collect static files (requires SECRET_KEY, use dummy for build)
RUN SECRET_KEY=build-time-secret python manage.py collectstatic --noinput

# Switch to non-root user
USER app

# Expose port
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD python -c "import urllib.request; urllib.request.urlopen('http://localhost:8000/api/posts/')" || exit 1

# Run gunicorn
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "--workers", "2", "--access-logfile", "-", "--error-logfile", "-", "cms.wsgi:application"]
