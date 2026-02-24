import Head from 'next/head'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProductCard from '../components/ProductCard'
import {
  fetchProducts,
  setSearchQuery,
  selectFilteredProducts,
  selectStatus,
  selectError
} from '../redux/productsSlice'
import styles from './index.module.css'

export default function Home() {
  const dispatch = useDispatch()
  const items = useSelector(selectFilteredProducts)
  const status = useSelector(selectStatus)
  const error = useSelector(selectError)
  const searchQuery = useSelector(state => state.products.searchQuery)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts())
    }
  }, [dispatch, status])

  const handleSearch = (e) => {
    dispatch(setSearchQuery(e.target.value))
  }

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
          <p className={styles.msg}>
            {error || 'Something went wrong.'}
          </p>
        )}

        {status === 'succeeded' && items.length === 0 && (
          <p className={styles.msg}>No products found.</p>
        )}

        {status === 'succeeded' && items.length > 0 && (
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
        )}
      </div>
    </>
  )
}
