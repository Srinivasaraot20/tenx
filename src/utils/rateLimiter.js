// utils/rateLimiter.js
/** Simple in‑memory rate limiter – 5 requests per minute per IP */
const limit = 5;
const windowMs = 60 * 1000; // 1 minute
const store = new Map(); // ip -> { count, firstRequest }

export async function rateLimiter(request) {
  const ip = request.headers.get('x-forwarded-for') || request.headers.get('remote-addr') || 'unknown';
  const now = Date.now();
  const record = store.get(ip) || { count: 0, firstRequest: now };

  // reset window if elapsed
  if (now - record.firstRequest > windowMs) {
    record.count = 0;
    record.firstRequest = now;
  }

  record.count += 1;
  store.set(ip, record);

  if (record.count > limit) {
    const err = new Error('Rate limit exceeded');
    err.status = 429;
    throw err;
  }
}
