import Head from 'next/head'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import DashboardCard from '../components/DashboardCard'
import { selectCartItemCount, selectCartTotal } from '../redux/cartSlice'
import styles from './dashboard.module.css'

export default function Dashboard() {
  const products = useSelector(state => state.products.items)
  const count = useSelector(selectCartItemCount)
  const total = useSelector(selectCartTotal)
  const [sortAsc, setSortAsc] = useState(true)

  // made a copyii 
  const sorted = [...products].sort((a, b) => {
    return sortAsc ? a.price - b.price : b.price - a.price
  })

  const handleSort = () => setSortAsc(!sortAsc)

  return (
    <>
      <Head>
        <title>ShopZone | Dashboard</title>
      </Head>

      <div className="container">
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>Dashboard</h1>
          <p className={styles.subtitle}>Store overview</p>
        </div>

        <div className={styles.cardsRow}>
          <DashboardCard
            icon="📦"
            label="Total Products"
            value={products.length}
          />
          <DashboardCard
            icon="🛒"
            label="Items in Cart"
            value={count}
          />
          <DashboardCard
            icon="💰"
            label="Cart Value"
            value={'$' + (total || 0).toFixed(2)}
          />
        </div>

        <div className={styles.tableSection}>
          <div className={styles.tableTop}>
            <h2 className={styles.sectionTitle}>All Products</h2>
            <button
              type="button"
              onClick={handleSort}
              className={styles.sortBtn}
            >
              Sort: {sortAsc ? 'Low → High' : 'High → Low'}
            </button>
          </div>

          {products.length === 0 ? (
            <p className={styles.noData}>
              No products loaded. Visit the Home page first.
            </p>
          ) : (
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {sorted.map((prod, idx) => (
                    <tr
                      key={prod.id}
                      className={idx % 2 === 0 ? styles.evenRow : ''}
                    >
                      <td>{idx + 1}</td>
                      <td>{prod.title}</td>
                      <td>
                        <span className={styles.badge}>
                          {prod.category}
                        </span>
                      </td>
                      <td className={styles.priceCell}>
                        ${(prod.price || 0).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
