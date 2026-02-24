import Head from 'next/head'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProductCard from '../components/ProductCard'
import { setProducts, setSearchQuery, selectFilteredProducts } from '../redux/productsSlice'
import { getAppOrigin, fetchWithTimeout, API_BASE } from '../lib/apiUrl'
import styles from './index.module.css'

async function fetchProductsList(req) {
  try {
    const origin = getAppOrigin(req)
    const res = await fetchWithTimeout(
      `${origin}/api/products`,
      { headers: { Accept: 'application/json' } },
      20000
    )
    if (res.ok) {
      const data = await res.json()
      return Array.isArray(data) ? data : []
    }
  } catch (_) {}
  try {
    const res = await fetchWithTimeout(
      `${API_BASE}/products`,
      { headers: { Accept: 'application/json' } },
      15000
    )
    if (res.ok) {
      const data = await res.json()
      return Array.isArray(data) ? data : []
    }
  } catch (_) {}
  return []
}

export async function getServerSideProps(context) {
  const products = await fetchProductsList(context.req)
  return { props: { products } }
}

export default function Home({ products }) {
  const dispatch = useDispatch()
  const items = useSelector(selectFilteredProducts)
  const status = useSelector(state => state.products.status)
  const searchQuery = useSelector(state => state.products.searchQuery)

  useEffect(() => {
    if (products && products.length > 0) {
      dispatch(setProducts(products))
    }
  }, [])

  const handleSearch = (e) => {
    dispatch(setSearchQuery(e.target.value))
  }

  // TODO: add pagination later
  return (
    <>
      <Head>
        <title>ShopZone | Home</title>
      </Head>

      <div className="container">
        <div className={styles.header}>
          <h1 className={styles.pageTitle}>Products</h1>
          <input
            type="text"
            placeholder="Search products..."
            className={styles.searchBar}
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>

        {status === 'loading' && (
          <p className={styles.msg}>Loading...</p>
        )}

        {status === 'failed' && (
          <p className={styles.msg}>Something went wrong.</p>
        )}

        {status === 'succeeded' && items.length === 0 && (
          <p className={styles.msg}>No products found.</p>
        )}

        <div className={styles.grid}>
          {items.map(prod => (
            <ProductCard
              key={prod.id}
              id={prod.id}
              title={prod.title}
              price={prod.price}
              image={prod.image}
              category={prod.category}
            />
          ))}
        </div>
      </div>
    </>
  )
}
