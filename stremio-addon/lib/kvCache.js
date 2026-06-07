/**
 * KV cache — no-op stub.
 *
 * The hosted addon previously used Upstash Redis for cross-invocation caching.
 * That dependency has been removed; functions now resolve to no-ops so the
 * addon runs with zero external services. Self-hosters who want persistent
 * caching can replace this file with their own implementation that exposes
 * the same `kvGet` / `kvSet` / `kvAvailable` signatures.
 */

async function kvGet() {
  return null;
}

async function kvSet() {
  // no-op
}

function kvAvailable() {
  return false;
}

module.exports = { kvGet, kvSet, kvAvailable };

