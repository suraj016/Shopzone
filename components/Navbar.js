import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { selectCartItemCount } from '../redux/cartSlice'
import styles from './Navbar.module.css'

export default function Navbar() {
  const router = useRouter()
  const count = useSelector(selectCartItemCount)
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  // helper to check active link
  const isActive = (path) => router.pathname === path

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>

        <Link href="/" className={styles.logo}>
          ShopZone
        </Link>

        <div className={styles.links}>
          <Link
            href="/"
            className={isActive('/') ? `${styles.link} ${styles.active}` : styles.link}
          >
            Home
          </Link>

          <Link
            href="/dashboard"
            className={isActive('/dashboard') ? `${styles.link} ${styles.active}` : styles.link}
          >
            Dashboard
          </Link>

          <div className={styles.cartWrap}>
            <Link
              href="/cart"
              className={isActive('/cart') ? `${styles.link} ${styles.active}` : styles.link}
            >
              Cart
            </Link>
            {mounted && count > 0 && (
              <span className={styles.badge}>{count}</span>
            )}
          </div>
        </div>

      </div>
    </nav>
  )
}
