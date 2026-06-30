import { formatDate, formatDebit } from '../../utils/formatters.js'
import styles from './StatutAnptic.module.css'

export default function StatutAnptic({ data, loading }) {
  if (loading) return <div className={styles.card}><Skeleton /></div>

  const isOk   = data?.statut === 'OK'
  const isWarn = data?.statut === 'WARN'
  const isKo   = data?.statut === 'KO'

  return (
    <section className={styles.card} aria-labelledby="anptic-title">
      {/* ── En-tête du module ── */}
      <div className={styles.moduleHeader}>
        <div className={styles.moduleLeft}>
          <span className={styles.moduleIcon} aria-hidden="true">🌐</span>
          <div>
            <div className={styles.moduleTitle} id="anptic-title">RÉSEAU ANPTIC</div>
            <div className={styles.moduleSub}>Infrastructure nationale — RESINA</div>
          </div>
        </div>
        <span className={`${styles.statusBadge} ${isOk ? styles.ok : isWarn ? styles.warn : styles.ko}`}>
          {isOk ? '✓ ACTIF' : isWarn ? '⚠ DÉGRADÉ' : '✕ INDISPONIBLE'}
        </span>
      </div>

      {/* ── Statut KO ── */}
      {isKo && (
        <div className={styles.koBlock}>
          <div className={styles.koIconRow}>
            <span className={styles.koIcon}>●</span>
            <div>
              <p className={styles.koTitle}>La connexion ANPTIC n'est pas disponible</p>
              {data?.indisponibleDepuis && (
                <p className={styles.koSince}>
                  Indisponible depuis le {formatDate(data.indisponibleDepuis)}
                </p>
              )}
            </div>
          </div>
          <div className={styles.actionBox}>
            <span className={styles.actionIcon} aria-hidden="true">📞</span>
            <span className={styles.actionText}>
              Veuillez contacter les services support de <strong>l'ANPTIC</strong>
            </span>
          </div>
        </div>
      )}

      {/* ── Statut OK ou WARN ── */}
      {(isOk || isWarn) && (
        <>
          <div className={`${styles.okBlock} ${isWarn ? styles.warnBlock : ''}`}>
            <span className={`${styles.checkIcon} ${isWarn ? styles.warnIcon : ''}`}>
              {isOk ? '✓' : '⚠'}
            </span>
            <div>
              <p className={styles.okTitle}>
                {isOk ? 'La connexion ANPTIC est disponible' : 'Connexion ANPTIC dégradée'}
              </p>
              <p className={styles.okDesc}>
                {isOk
                  ? 'Le bâtiment est bien connecté au réseau national RESINA. Toutes les liaisons sont actives.'
                  : 'La connexion est active mais le débit est inférieur aux niveaux normaux.'}
              </p>
            </div>
          </div>

          {/* Métriques débit */}
          <div className={styles.metrics}>
            <div className={styles.metricBox}>
              <span className={styles.metricArrow}>↑</span>
              <span className={styles.metricLabel}>UPLOAD</span>
              <span className={styles.metricValue}>{formatDebit(data?.debitMontant)}</span>
              <span className={styles.metricUnit}>Mbit/s</span>
            </div>
            <div className={styles.metricDivider}></div>
            <div className={styles.metricBox}>
              <span className={styles.metricArrow}>↓</span>
              <span className={styles.metricLabel}>DOWNLOAD</span>
              <span className={styles.metricValue}>{formatDebit(data?.debitDescendant)}</span>
              <span className={styles.metricUnit}>Mbit/s</span>
            </div>
          </div>

          {/* Détails techniques */}
          <div className={styles.details}>
            <div className={styles.detailItem}>
              <span className={styles.detailIcon}>🔗</span>
              <div>
                <span className={styles.detailLabel}>LIAISON</span>
                <span className={styles.detailValue}>{data?.typeLiaison || '—'}</span>
              </div>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailIcon}>📶</span>
              <div>
                <span className={styles.detailLabel}>QUALITÉ</span>
                <span className={`${styles.detailValue} ${isWarn ? styles.warnValue : styles.okValue}`}>
                  {data?.qualiteSignal || '—'}
                </span>
              </div>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailIcon}>⏱</span>
              <div>
                <span className={styles.detailLabel}>LATENCE</span>
                <span className={styles.detailValue}>{data?.latenceMs != null ? `${data.latenceMs} ms` : '—'}</span>
              </div>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailIcon}>📊</span>
              <div>
                <span className={styles.detailLabel}>DISPO 30J</span>
                <span className={styles.detailValue}>{data?.disponibilite30j != null ? `${data.disponibilite30j} %` : '—'}</span>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Pas de données */}
      {!data && !loading && (
        <div className={styles.noData}>
          <p>Données indisponibles</p>
          <p className={styles.noDataSub}>Le système de supervision ne répond pas actuellement.</p>
        </div>
      )}
    </section>
  )
}

function Skeleton() {
  return (
    <div className={styles.skeleton}>
      <div className={`${styles.skLine} ${styles.skHeader}`}></div>
      <div className={styles.skLine}></div>
      <div className={styles.skLine}></div>
      <div className={styles.skMetrics}>
        <div className={styles.skBox}></div>
        <div className={styles.skBox}></div>
      </div>
    </div>
  )
}
