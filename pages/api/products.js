import { API_BASE, fetchWithTimeout } from '../../lib/apiUrl'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }
  try {
    const response = await fetchWithTimeout(
      `${API_BASE}/products`,
      { headers: { Accept: 'application/json' } },
      15000
    )
    const data = await response.json()
    if (!response.ok) {
      return res.status(response.status).json(Array.isArray(data) ? data : [])
    }
    res.status(200).json(Array.isArray(data) ? data : [])
  } catch (e) {
    res.status(500).json([])
  }
}
