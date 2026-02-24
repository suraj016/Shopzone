import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: []
  },
  reducers: {
    addToCart(state, action) {
      // check if prewsesr in cart or nahi
      const existing = state.cartItems.find(i => i.id === action.payload.id)
      if (existing) {
        existing.quantity += 1
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 })
      }
    },
    removeFromCart(state, action) {
      state.cartItems = state.cartItems.filter(i => i.id !== action.payload)
    },
    updateQuantity(state, action) {
      const { id, quantity } = action.payload
      const idx = state.cartItems.findIndex(i => i.id === id)
      if (idx !== -1) {
        if (quantity < 1) return
        state.cartItems[idx].quantity = quantity
      }
    },
    clearCart(state) {
      state.cartItems = []
    }
  }
})

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions
export default cartSlice.reducer

export function selectCartItems(state) {
  return state.cart.cartItems
}

export function selectCartItemCount(state) {
  return state.cart.cartItems.reduce((sum, i) => sum + i.quantity, 0)
}

export function selectCartTotal(state) {
  const total = state.cart.cartItems.reduce(
    (sum, i) => sum + i.price * i.quantity, 0
  )
  return parseFloat(total.toFixed(2))
}
