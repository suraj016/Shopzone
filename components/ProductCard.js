import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { addToCart } from '../redux/cartSlice'
import styles from './ProductCard.module.css'

export default function ProductCard({ id, title, price, image, category }) {
  const dispatch = useDispatch()
  const router = useRouter()
  const [btnText, setBtnText] = useState('Add to Cart')

  const handleAdd = () => {
    dispatch(addToCart({ id, title, price, image }))
    setBtnText('Added!')
    setTimeout(() => setBtnText('Add to Cart'), 1500)
  }

  // navigate to product page
  const goToProduct = () => router.push('/product/' + id)

  return (
    <div className={styles.card}>
      <div className={styles.imgBox}>
        <img src={image} alt={title} className={styles.img} />
      </div>

      <div className={styles.info}>
        <p className={styles.cat}>{category}</p>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.price}>${(price || 0).toFixed(2)}</p>
      </div>

      <div className={styles.btns}>
        <button
          type="button"
          className={styles.viewBtn}
          onClick={goToProduct}
        >
          View Details
        </button>
        <button
          type="button"
          className={styles.addBtn}
          onClick={handleAdd}
        >
          {btnText}
        </button>
      </div>
    </div>
  )
}
