import { useSite } from '../../contexts/SiteContext.jsx'
import StatutAnptic from '../../components/decideur/StatutAnptic.jsx'
import StatutLan from '../../components/decideur/StatutLan.jsx'
import RefreshBar from '../../components/decideur/RefreshBar.jsx'
import styles from './MonSitePage.module.css'

export default function MonSitePage() {
  const { anpticData, lanData, loading, error, lastUpdate, refresh } = useSite()

  return (
    <div className={styles.page}>
      {/* Barre horodatage + actualiser */}
      <RefreshBar
        lastUpdate={lastUpdate}
        onRefresh={refresh}
        loading={loading.anptic || loading.lan}
      />

      {/* Message d'erreur global */}
      {error && (
        <div className={styles.errorBanner} role="alert">
          <span aria-hidden="true">⚠</span>
          {error}
        </div>
      )}

      {/* Module ANPTIC */}
      <StatutAnptic
        data={anpticData}
        loading={loading.anptic}
      />

      {/* Module LAN */}
      <StatutLan
        data={lanData}
        loading={loading.lan}
      />
    </div>
  )
}
