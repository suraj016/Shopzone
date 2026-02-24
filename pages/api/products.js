import { API_BASE } from '../../lib/apiUrl'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }
  try {
    const response = await fetch(`${API_BASE}/products`, {
      headers: { 'Accept': 'application/json' }
    })
    const data = await response.json()
    res.status(200).json(data)
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch products' })
  }
}
