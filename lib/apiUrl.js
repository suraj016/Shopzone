const envUrl = typeof process !== 'undefined' && process.env.NEXT_PUBLIC_API_URL
const trimmed = envUrl && String(envUrl).trim()
export const API_BASE = trimmed ? String(trimmed).replace(/\/$/, '') : 'https://fakestoreapi.com'

/** Base URL of this app. Use in getServerSideProps when calling our API routes. */
export function getAppOrigin(req) {
  if (typeof process === 'undefined') return ''
  if (req && req.headers && req.headers.host) {
    const proto = req.headers['x-forwarded-proto'] === 'https' ? 'https' : 'http'
    return `${proto}://${req.headers.host}`
  }
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
  return 'http://localhost:3000'
}

/** Fetch with timeout (ms). */
export function fetchWithTimeout(url, opts = {}, ms = 15000) {
  const ctrl = new AbortController()
  const t = setTimeout(() => ctrl.abort(), ms)
  return fetch(url, { ...opts, signal: ctrl.signal }).finally(() => clearTimeout(t))
}
