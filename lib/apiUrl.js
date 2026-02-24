export const API_BASE =
  typeof process !== 'undefined' && process.env.NEXT_PUBLIC_API_URL
    ? process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, '')
    : 'https://fakestoreapi.com'

/** Base URL of this app (for server-side fetch to our API routes). Use in getServerSideProps. */
export function getAppOrigin(req) {
  if (typeof process === 'undefined') return ''
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }
  if (req && req.headers && req.headers.host) {
    const proto = req.headers['x-forwarded-proto'] === 'https' ? 'https' : 'http'
    return `${proto}://${req.headers.host}`
  }
  return 'http://localhost:3000'
}
