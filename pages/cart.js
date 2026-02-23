import Head from 'next/head'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import {
  removeFromCart,
  updateQuantity,
  clearCart,
  selectCartItems,
  selectCartTotal,
  selectCartItemCount
} from '../redux/cartSlice'
import styles from './cart.module.css'

export default function Cart() {
  const dispatch = useDispatch()
  const cartItems = useSelector(selectCartItems)
  const total = useSelector(selectCartTotal)
  const count = useSelector(selectCartItemCount)

  const handleRemove = (id) => {
    dispatch(removeFromCart(id))
  }

  const handleQty = (id, qty) => {
    if (qty < 1) return
    dispatch(updateQuantity({ id, quantity: qty }))
  }

  function onClear() {
    const ok = window.confirm('Clear everything from cart?')
    if (ok) dispatch(clearCart())
  }

  const onCheckout = () => alert('Feature coming soon!')

  if (cartItems.length === 0) {
    return (
      <>
        <Head>
          <title>ShopZone | Cart</title>
        </Head>
        <div className="container">
          <h1 className={styles.pageTitle}>Your Cart</h1>
          <div className={styles.empty}>
            <p>Your cart is empty</p>
            <Link href="/" className={styles.continueLink}>
              ← Continue Shopping
            </Link>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>ShopZone | Cart</title>
      </Head>

      <div className="container">
        <h1 className={styles.pageTitle}>Your Cart ({count} items)</h1>

        <div className={styles.cartWrap}>
          <div className={styles.itemsList}>
            {cartItems.map(item => (
              <div key={item.id} className={styles.cartItem}>

                <img
                  src={item.image}
                  alt={item.title}
                  className={styles.itemImg}
                />

                <div className={styles.itemInfo}>
                  <p className={styles.itemTitle}>{item.title}</p>
                  <p className={styles.itemPrice}>
                    ${item.price.toFixed(2)} each
                  </p>
                </div>

                <div className={styles.qtyControls}>
                  <button
                    type="button"
                    className={styles.qtyBtn}
                    onClick={() => handleQty(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    −
                  </button>
                  <span className={styles.qtyNum}>{item.quantity}</span>
                  <button
                    type="button"
                    className={styles.qtyBtn}
                    onClick={() => handleQty(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>

                <p className={styles.subtotal}>
                  ${(item.price * item.quantity).toFixed(2)}
                </p>

                <button
                  type="button"
                  className={styles.removeBtn}
                  onClick={() => handleRemove(item.id)}
                >
                  ×
                </button>

              </div>
            ))}
          </div>

          <div className={styles.summary}>
            <p className={styles.totalText}>
              Total: ${(total || 0).toFixed(2)}
            </p>
            <div className={styles.summaryBtns}>
              <button
                type="button"
                className={styles.clearBtn}
                onClick={onClear}
              >
                Clear Cart
              </button>
              <button
                type="button"
                className={styles.checkoutBtn}
                onClick={onCheckout}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
