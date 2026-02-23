import styles from './DashboardCard.module.css'

export default function DashboardCard({ icon, label, value }) {
  return (
    <div className={styles.card}>
      {icon && <p className={styles.icon}>{icon}</p>}
      <p className={styles.label}>{label}</p>
      <p className={styles.value}>{value}</p>
    </div>
  )
}
