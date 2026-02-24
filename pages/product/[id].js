import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../../redux/cartSlice'
import styles from './product.module.css'

export default function ProductDetail() {
  const router = useRouter()
  const { id } = router.query
  const dispatch = useDispatch()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  const productsFromRedux = useSelector(state => state.products.items)

  useEffect(() => {
    if (!id) return

    const numId = Number(id)
    const fromRedux = productsFromRedux.find(p => p.id === numId)
    if (fromRedux) {
      setProduct(fromRedux)
      setLoading(false)
      return
    }

    let cancelled = false
    setLoading(true)
    setNotFound(false)

    fetch(`/api/products/${id}`, { headers: { Accept: 'application/json' } })
      .then(res => {
        if (cancelled) return
        if (!res.ok) {
          setNotFound(true)
          setLoading(false)
          return
        }
        return res.json()
      })
      .then(data => {
        if (cancelled) return
        if (data && data.id) {
          setProduct(data)
        } else {
          setNotFound(true)
        }
        setLoading(false)
      })
      .catch(() => {
        if (!cancelled) {
          setNotFound(true)
          setLoading(false)
        }
      })

    return () => { cancelled = true }
  }, [id, productsFromRedux])

  const [btnText, setBtnText] = useState('Add to Cart')

  const handleAdd = () => {
    if (!product) return
    dispatch(addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image
    }))
    setBtnText('Added to Cart!')
    setTimeout(() => setBtnText('Add to Cart'), 1500)
  }

  if (loading) {
    return (
      <>
        <Head><title>ShopZone | Loading...</title></Head>
        <div className="container">
          <Link href="/" className={styles.back}>← Back to Home</Link>
          <p className={styles.loading}>Loading product...</p>
        </div>
      </>
    )
  }

  if (notFound || !product) {
    return (
      <>
        <Head><title>ShopZone | Not Found</title></Head>
        <div className="container">
          <Link href="/" className={styles.back}>← Back to Home</Link>
          <p className={styles.loading}>Product not found.</p>
        </div>
      </>
    )
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
