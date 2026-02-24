import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchProducts = createAsyncThunk('products/fetch', async () => {
  console.log('fetching products...')
  const res = await fetch('https://fakestoreapi.com/products')
  const data = await res.json()
  return data
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
        state.error = action.error.message
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
