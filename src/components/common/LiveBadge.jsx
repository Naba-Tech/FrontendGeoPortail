import styles from './LiveBadge.module.css'

export default function LiveBadge() {
  return (
    <div className={styles.badge} role="status" aria-live="polite" aria-label="Données en direct">
      <span className={styles.dot} aria-hidden="true"></span>
      EN DIRECT
    </div>
  )
}
