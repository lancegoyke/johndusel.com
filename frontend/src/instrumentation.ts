import * as Sentry from "@sentry/nextjs";

// @sentry/nextjs v8+ loads the server/edge configs from Next's
// instrumentation hook instead of auto-injecting them. With `output: "export"`
// these only run during the build (static page generation).
export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("../sentry.server.config");
  }
  if (process.env.NEXT_RUNTIME === "edge") {
    await import("../sentry.edge.config");
  }
}

export const onRequestError = Sentry.captureRequestError;
