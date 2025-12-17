# syntax=docker/dockerfile:1

# Dependencies stage
FROM node:20-slim AS deps

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Build stage
FROM node:20-slim AS builder

WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build arguments for environment variables needed at build time
ARG BASE_API_URL=http://backend:8000/api
ARG SITE_URL=http://localhost:3000

# Set environment variables for build
ENV BASE_API_URL=$BASE_API_URL
ENV SITE_URL=$SITE_URL
ENV NEXT_TELEMETRY_DISABLED=1
# Skip Sentry source map upload during Docker build (do this in CI instead)
ENV SENTRY_IGNORE_API_RESOLUTION_ERROR=1

# Build the application (skip Sentry upload in Docker, do in CI instead)
RUN SENTRY_DRY_RUN=true npm run build

# Production stage
FROM node:20-slim AS production

WORKDIR /app

# Create non-root user
RUN useradd --create-home --shell /bin/bash app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Copy necessary files from builder
COPY --from=builder --chown=app:app /app/public ./public
COPY --from=builder --chown=app:app /app/.next/standalone ./
COPY --from=builder --chown=app:app /app/.next/static ./.next/static

# Switch to non-root user
USER app

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000', (r) => process.exit(r.statusCode === 200 ? 0 : 1))" || exit 1

# Run the application
CMD ["node", "server.js"]
