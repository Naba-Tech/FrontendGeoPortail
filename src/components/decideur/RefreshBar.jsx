import { formatDateCourt } from '../../utils/formatters.js'
import styles from './RefreshBar.module.css'

export default function RefreshBar({ lastUpdate, onRefresh, loading }) {
  return (
    <div className={styles.bar}>
      <span className={styles.timestamp}>
        {lastUpdate
          ? <>Mis à jour · <span className={styles.date}>{formatDateCourt(lastUpdate.toISOString())}</span></>
          : 'Chargement en cours…'
        }
      </span>
      <button
        className={styles.btn}
        onClick={onRefresh}
        disabled={loading}
        aria-label="Actualiser les données"
      >
        <span className={loading ? styles.spinning : ''} aria-hidden="true">↺</span>
        Actualiser
      </button>
    </div>
  )
}
