import { useAlertes } from '../../contexts/AlerteContext.jsx'
import { formatRelative } from '../../utils/formatters.js'
import RefreshBar from '../../components/decideur/RefreshBar.jsx'
import { useSite } from '../../contexts/SiteContext.jsx'
import styles from './AlertesPage.module.css'

export default function AlertesPage() {
  const { alertes, loading, nonLues, marquerLu, marquerToutLu, pushPermission, demanderPermissionPush } = useAlertes()
  const { lastUpdate, refresh, loading: siteLoading } = useSite()

  const getTypeIcon = (type) => {
    switch (type) {
      case 'PANNE_ANPTIC':    return { icon: '●', color: '#D93535' }
      case 'WARN_ANPTIC':     return { icon: '●', color: '#C97C0A' }
      case 'PANNE_LAN':       return { icon: '●', color: '#D93535' }
      case 'RETABLISSEMENT':  return { icon: '●', color: '#0D9B5A' }
      default:                return { icon: '●', color: '#94a3b8' }
    }
  }

  return (
    <div className={styles.page}>
      <RefreshBar lastUpdate={lastUpdate} onRefresh={refresh} loading={siteLoading.anptic} />

      {/* Bannière permission push */}
      {pushPermission === 'default' && (
        <div className={styles.pushBanner}>
          <div className={styles.pushBannerIcon} aria-hidden="true">🔔</div>
          <div className={styles.pushBannerContent}>
            <p className={styles.pushBannerTitle}>Activer les alertes en temps réel</p>
            <p className={styles.pushBannerDesc}>
              Recevez une notification immédiate en cas de panne sur vos sites RESINA, même lorsque l'application est fermée.
            </p>
            <div className={styles.pushBannerActions}>
              <button className={styles.btnActiver} onClick={demanderPermissionPush}>
                Activer
              </button>
              <button className={styles.btnPlusTard}>
                Plus tard
              </button>
            </div>
          </div>
        </div>
      )}

      {/* En-tête alertes */}
      <div className={styles.alertesHeader}>
        <div className={styles.alertesTitle}>
          Alertes récentes
          {nonLues > 0 && <span className={styles.nonLuBadge}>{nonLues}</span>}
        </div>
        {nonLues > 0 && (
          <button className={styles.btnMarquerLu} onClick={marquerToutLu}>
            Tout marquer lu
          </button>
        )}
      </div>

      {/* Liste des alertes */}
      {loading ? (
        <div className={styles.loadingState}>
          <span className={styles.spinner}></span>
          Chargement des alertes…
        </div>
      ) : alertes.length === 0 ? (
        <div className={styles.emptyState}>
          <span className={styles.emptyIcon} aria-hidden="true">✓</span>
          <p className={styles.emptyTitle}>Aucune alerte récente</p>
          <p className={styles.emptyDesc}>Tous vos sites RESINA fonctionnent normalement.</p>
        </div>
      ) : (
        <div className={styles.alertesList}>
          {alertes.map(alerte => {
            const { icon, color } = getTypeIcon(alerte.type)
            return (
              <button
                key={alerte.id}
                className={`${styles.alerteRow} ${!alerte.lu ? styles.alerteNonLu : ''}`}
                onClick={() => marquerLu(alerte.id)}
                aria-label={`Alerte ${alerte.siteNom} - ${alerte.message}`}
              >
                {!alerte.lu && <span className={styles.unreadDot} aria-label="Non lu"></span>}
                <span className={styles.alerteColorDot} style={{ color }} aria-hidden="true">{icon}</span>
                <div className={styles.alerteContent}>
                  <p className={styles.alerteSiteNom}>{alerte.siteNom}</p>
                  <p className={styles.alerteMessage}>{alerte.message}</p>
                  <p className={styles.alerteTime}>{formatRelative(alerte.createdAt)}</p>
                </div>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
