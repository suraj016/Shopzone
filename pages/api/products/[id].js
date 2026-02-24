import { API_BASE } from '../../../lib/apiUrl'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }
  const { id } = req.query
  if (!id) {
    return res.status(400).json({ error: 'Missing product id' })
  }
  try {
    const response = await fetch(`${API_BASE}/products/${id}`, {
      headers: { 'Accept': 'application/json' }
    })
    const data = await response.json()
    if (!data || !data.id) {
      return res.status(404).json({ error: 'Product not found' })
    }
    res.status(200).json(data)
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch product' })
  }
}
