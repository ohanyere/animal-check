// /api/utils/errorHandler.js
export function formatError(error) {
  return {
    message: error.message,
    stack: process.env.NODE_ENV === "development" ? error.stack : null,
  };
}
