import { useSite } from '../../contexts/SiteContext.jsx'
import styles from './SiteSelector.module.css'

export default function SiteSelector() {
  const { sites, selectedSiteId, setSelectedSiteId, loading } = useSite()

  return (
    <div className={styles.wrapper}>
      <select
        className={styles.select}
        value={selectedSiteId || ''}
        onChange={e => setSelectedSiteId(e.target.value)}
        disabled={loading.sites}
        aria-label="Sélectionner un site institutionnel"
      >
        {loading.sites && <option>Chargement…</option>}
        {sites.map(site => (
          <option key={site.id} value={site.id}>
            {site.nom}
          </option>
        ))}
      </select>
      <span className={styles.arrow} aria-hidden="true">▼</span>
    </div>
  )
}
