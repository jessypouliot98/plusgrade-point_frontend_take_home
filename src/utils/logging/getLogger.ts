// Mock implementation to DataDog / Sentry / etc.

export function getLogger() {
  return {
    error: (msg: string, details: { cause?: unknown }) => {
      console.error(new Error(msg, { cause: details.cause }));
    }
  }
}