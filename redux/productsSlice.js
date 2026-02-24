import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { API_BASE } from '../lib/apiUrl'

export const fetchProducts = createAsyncThunk('products/fetch', async (_, { rejectWithValue }) => {
  console.log('fetching products...')
  const res = await fetch(`${API_BASE}/products`)
  const data = await res.json()
  if (!res.ok) {
    return rejectWithValue(data?.message || 'Failed to fetch')
  }
  return Array.isArray(data) ? data : []
})

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
    searchQuery: ''
  },
  reducers: {
    setSearchQuery(state, action) {
      state.searchQuery = action.payload
    },
    setProducts(state, action) {
      state.items = action.payload
      state.status = 'succeeded'
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload || action.error?.message || 'Failed to load products'
      })
  }
})

export const { setSearchQuery, setProducts } = productsSlice.actions
export default productsSlice.reducer

export function selectFilteredProducts(state) {
  const q = state.products.searchQuery
  if (!q || !q.trim()) return state.products.items
  return state.products.items.filter(item =>
    item.title.toLowerCase().includes(q.toLowerCase().trim())
  )
}

export const selectAllProducts = (state) => state.products.items
export const selectStatus = (state) => state.products.status
export const selectError = (state) => state.products.error
