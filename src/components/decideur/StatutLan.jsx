import styles from './StatutLan.module.css'

export default function StatutLan({ data, loading }) {
  if (loading) return <div className={styles.card}><Skeleton /></div>

  if (!data) return (
    <div className={styles.card}>
      <div className={styles.noData}>
        <p>Données LAN indisponibles</p>
        <p className={styles.noDataSub}>Le système de supervision ne répond pas.</p>
      </div>
    </div>
  )

  const isOk      = data.statut === 'OK'
  const isAlerte  = data.statut === 'ALERTE'
  const isIncident= data.statut === 'INCIDENT'

  return (
    <section className={styles.card} aria-labelledby="lan-title">
      {/* ── En-tête ── */}
      <div className={styles.moduleHeader}>
        <div className={styles.moduleLeft}>
          <span className={styles.moduleIcon} aria-hidden="true">🏢</span>
          <div>
            <div className={styles.moduleTitle} id="lan-title">RÉSEAU DU BÂTIMENT</div>
            <div className={styles.moduleSub}>LAN interne — Wi-Fi &amp; commutateurs</div>
          </div>
        </div>
        <span className={`${styles.statusBadge} ${isOk ? styles.ok : isAlerte ? styles.warn : styles.ko}`}>
          {isOk ? '✓ NORMAL' : isAlerte ? '⚠ ALERTE' : '✕ INCIDENT'}
        </span>
      </div>

      {/* ── Compteurs ── */}
      <div className={styles.counters}>
        <div className={styles.counterBox}>
          <span className={`${styles.counterVal} ${!isOk ? styles.counterWarn : ''}`}>
            {data.equipementsActifs}
          </span>
          <span className={styles.counterLabel}>actifs sur {data.totalEquipements}</span>
        </div>
        <div className={styles.counterDivider}></div>
        <div className={styles.counterBox}>
          <span className={`${styles.counterVal} ${data.equipementsPannes > 0 ? styles.counterKo : ''}`}>
            {data.equipementsPannes}
          </span>
          <span className={styles.counterLabel}>en panne</span>
        </div>
        <div className={styles.counterDivider}></div>
        <div className={styles.counterBox}>
          <span className={styles.counterVal}>{data.niveauxSurveilles}</span>
          <span className={styles.counterLabel}>niveaux surveillés</span>
        </div>
      </div>

      {/* ── État par niveau ── */}
      <div className={styles.niveauxSection}>
        <div className={styles.niveauxTitle}>ÉTAT PAR NIVEAU</div>
        <div className={styles.niveauxList}>
          {data.niveaux?.map((niveau) => {
            const nOk      = niveau.statut === 'OK'
            const nAlerte  = niveau.statut === 'ALERTE'
            const nIncident= niveau.statut === 'INCIDENT'
            return (
              <div key={niveau.code} className={`${styles.niveauRow} ${nOk ? styles.niveauOk : nAlerte ? styles.niveauWarn : styles.niveauKo}`}>
                <span className={`${styles.niveauDot} ${nOk ? styles.dotOk : nAlerte ? styles.dotWarn : styles.dotKo}`} aria-hidden="true">
                  {nOk ? '✓' : nAlerte ? '⚠' : '●'}
                </span>
                <div className={styles.niveauContent}>
                  <span className={styles.niveauCode}>{niveau.code}</span>
                  <span className={styles.niveauDetail}>{niveau.detail}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── Message de synthèse ── */}
      {isOk && (
        <div className={styles.synthOk}>
          <span className={styles.synthCheckIcon}>✓</span>
          <div>
            <p className={styles.synthTitle}>Aucun problème dans le bâtiment</p>
            <p className={styles.synthDesc}>Tous les équipements réseau sont opérationnels. Aucune action requise.</p>
          </div>
        </div>
      )}

      {(isAlerte || isIncident) && (
        <div className={`${styles.synthAction} ${isIncident ? styles.synthActionKo : styles.synthActionWarn}`}>
          <span className={styles.synthWarnIcon} aria-hidden="true">⚠</span>
          <div>
            <p className={styles.synthActionTitle}>Action requise — Votre DSI</p>
            <p className={styles.synthActionDesc}>
              Des équipements réseau du bâtiment sont hors service. Veuillez en informer votre Direction des Systèmes d'Information pour une intervention technique.
            </p>
          </div>
        </div>
      )}
    </section>
  )
}

function Skeleton() {
  return (
    <div style={{ padding: '16px' }}>
      <div style={{ background: '#e2e8f0', borderRadius: 4, height: 18, width: '55%', marginBottom: 12, animation: 'shimmer 1.5s ease infinite alternate' }}></div>
      <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
        {[1,2,3].map(i => <div key={i} style={{ flex:1, height: 60, background:'#e2e8f0', borderRadius: 8 }}></div>)}
      </div>
      <div style={{ background: '#e2e8f0', borderRadius: 4, height: 14, width: '80%', marginBottom: 8 }}></div>
      <div style={{ background: '#e2e8f0', borderRadius: 4, height: 14, width: '70%', marginBottom: 8 }}></div>
    </div>
  )
}
