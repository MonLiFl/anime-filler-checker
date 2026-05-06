/**
 * Persistent KV cache via Upstash Redis.
 *
 * Setup:
 *   1. Vercel Dashboard → Integrations → Add Upstash Redis
 *   2. Vercel will automatically set UPSTASH_REDIS_REST_URL and
 *      UPSTASH_REDIS_REST_TOKEN environment variables.
 *
 * Falls back silently to no-op when env vars are missing (local dev).
 */

let redis = null;

function getRedis() {
  if (redis) return redis;
  // Support both Upstash direct env vars and Vercel KV integration env vars
  const url   = process.env.UPSTASH_REDIS_REST_URL  || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  try {
    const { Redis } = require("@upstash/redis");
    redis = new Redis({ url, token });
  } catch {
    redis = null;
  }
  return redis;
}

/**
 * Get a value from KV. Returns null on miss or error.
 * @param {string} key
 * @returns {Promise<any|null>}
 */
async function kvGet(key) {
  const r = getRedis();
  if (!r) return null;
  try {
    return await r.get(key);
  } catch (e) {
    console.error("[KV GET ERROR]", key, e.message);
    return null;
  }
}

/**
 * Get multiple values from KV in a single command (MGET).
 * Returns an array of values in the same order as keys; null on miss or error.
 * Counts as 1 Upstash command regardless of how many keys are requested.
 * @param {string[]} keys
 * @returns {Promise<Array<any|null>>}
 */
async function kvMGet(keys) {
  const r = getRedis();
  if (!r || !keys.length) return keys.map(() => null);
  try {
    return await r.mget(...keys);
  } catch (e) {
    console.error("[KV MGET ERROR]", keys, e.message);
    return keys.map(() => null);
  }
}

/**
 * Set a value in KV with a TTL.
 * @param {string} key
 * @param {any} value  – will be JSON-serialised by Upstash automatically
 * @param {number} ttlSeconds
 */
async function kvSet(key, value, ttlSeconds) {
  const r = getRedis();
  if (!r) return;
  try {
    await r.set(key, value, { ex: ttlSeconds });
  } catch (e) {
    console.error("[KV SET ERROR]", key, e.message);
  }
}

/**
 * Check whether KV is configured (useful for logging).
 */
function kvAvailable() {
  const url   = process.env.UPSTASH_REDIS_REST_URL  || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  return !!(url && token);
}

module.exports = { kvGet, kvMGet, kvSet, kvAvailable };
