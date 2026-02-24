import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../redux/cartSlice'
import styles from './product.module.css'

export async function getServerSideProps({ params }) {
  try {
    const res = await fetch('https://fakestoreapi.com/products/' + params.id)
    const product = await res.json()
    if (!product || !product.id) return { notFound: true }
    return { props: { product } }
  } catch(e) {
    return { notFound: true }
  }
}

export default function ProductDetail({ product }) {
  const dispatch = useDispatch()
  const [btnText, setBtnText] = useState('Add to Cart')

  // was debugging this earlier
  console.log(product)

  const handleAdd = () => {
    dispatch(addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image
    }))
    setBtnText('Added to Cart!')
    setTimeout(() => setBtnText('Add to Cart'), 1500)
  }

  return (  
    <>
      <Head>
        <title>ShopZone | {product.title}</title>
      </Head>

      <div className="container"> 
        <Link href="/" className={styles.back}>
          ← Back to Home
        </Link>

        <div className={styles.layout}>

          <div className={styles.imgWrap}>
            <img
              src={product.image}
              alt={product.title}
              className={styles.img}
            />
          </div>

          <div className={styles.details}>
            <p className={styles.cat}>{product.category}</p>

            <h1 className={styles.title}>{product.title}</h1>

            {product.rating && (
              <p className={styles.rating}>
                ⭐ {product.rating.rate} ({product.rating.count} reviews)
              </p>
            )}

            <p className={styles.price}>
              ${(product.price || 0).toFixed(2)}
            </p>

            <p className={styles.desc}>
              {product.description}
            </p>

            <button
              type="button"
              className={styles.addBtn}
              onClick={handleAdd}
            >
              {btnText}
            </button>
          </div>

        </div>
      </div>
    </>
  )
}
