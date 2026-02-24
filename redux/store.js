import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './productsSlice'
import cartReducer from './cartSlice'

function loadCart() {
  try{
    const saved = localStorage.getItem('cart')
    if (!saved) return undefined
    const parsed = JSON.parse(saved)
    if (!Array.isArray(parsed)) return undefined
    return { cartItems: parsed }
  } catch(e) {
    return undefined
  }
}

const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
  },
  preloadedState: {
    cart: loadCart()
  }
})

store.subscribe(() => {
  try {
    const cartItems = store.getState().cart.cartItems
    console.log('cart updated', cartItems)
    localStorage.setItem('cart', JSON.stringify(cartItems))
  } catch(e) {
    
  }
})

export default store
