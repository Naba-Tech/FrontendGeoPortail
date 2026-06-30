import styles from './AdminCommon.module.css'

/* ── PageHeader ── */
export function PageHeader({ title, subtitle, action }) {
  return (
    <div className={styles.pageHeader}>
      <div>
        <h1 className={styles.pageTitle}>{title}</h1>
        {subtitle && <p className={styles.pageSubtitle}>{subtitle}</p>}
      </div>
      {action && <div className={styles.pageAction}>{action}</div>}
    </div>
  )
}

/* ── KPI Card ── */
export function KpiCard({ label, value, sub, color }) {
  const colorMap = { blue: '#0A3D7A', green: '#0D9B5A', orange: '#C97C0A', red: '#D93535', gray: '#64748b' }
  const c = colorMap[color] || colorMap.blue
  return (
    <div className={styles.kpiCard}>
      <p className={styles.kpiLabel}>{label}</p>
      <p className={styles.kpiValue} style={{ color: c }}>{value}</p>
      {sub && <p className={styles.kpiSub}>{sub}</p>}
    </div>
  )
}

/* ── Table ── */
export function Table({ headers, children, empty = 'Aucun résultat.' }) {
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            {headers.map((h, i) => <th key={i} className={styles.th}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {children || (
            <tr><td colSpan={headers.length} className={styles.tdEmpty}>{empty}</td></tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export function Td({ children, center }) {
  return <td className={`${styles.td} ${center ? styles.tdCenter : ''}`}>{children}</td>
}

export function Tr({ children, onClick }) {
  return <tr className={`${styles.tr} ${onClick ? styles.trClickable : ''}`} onClick={onClick}>{children}</tr>
}

/* ── Statut Badge ── */
export function StatutBadge({ statut }) {
  const map = {
    'OK':           { label: '✓ Normal',        cls: styles.badgeOk },
    'ACTIF':        { label: '✓ Actif',          cls: styles.badgeOk },
    'WARN':         { label: '⚠ Dégradé',        cls: styles.badgeWarn },
    'ALERTE':       { label: '⚠ Alerte',         cls: styles.badgeWarn },
    'KO':           { label: '✕ Hors service',   cls: styles.badgeKo },
    'INCIDENT':     { label: '✕ Incident',       cls: styles.badgeKo },
    'DESACTIVE':    { label: '— Désactivé',      cls: styles.badgeGray },
    'EXPIRE':       { label: '⏱ Expiré',         cls: styles.badgeGray },
  }
  const { label, cls } = map[statut] || { label: statut, cls: styles.badgeGray }
  return <span className={`${styles.badge} ${cls}`}>{label}</span>
}

/* ── Bouton ── */
export function Btn({ children, onClick, variant = 'primary', size = 'md', disabled, type = 'button', className = '' }) {
  const variantCls = { primary: styles.btnPrimary, secondary: styles.btnSecondary, danger: styles.btnDanger, ghost: styles.btnGhost }
  const sizeCls    = { sm: styles.btnSm, md: styles.btnMd, lg: styles.btnLg }
  return (
    <button
      type={type}
      className={`${styles.btn} ${variantCls[variant] || ''} ${sizeCls[size] || ''} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

/* ── Input ── */
export function Input({ label, id, error, ...props }) {
  return (
    <div className={styles.fieldGroup}>
      {label && <label htmlFor={id} className={styles.fieldLabel}>{label}</label>}
      <input id={id} className={`${styles.fieldInput} ${error ? styles.fieldInputError : ''}`} {...props} />
      {error && <p className={styles.fieldError}>{error}</p>}
    </div>
  )
}

/* ── Select ── */
export function Select({ label, id, children, error, ...props }) {
  return (
    <div className={styles.fieldGroup}>
      {label && <label htmlFor={id} className={styles.fieldLabel}>{label}</label>}
      <select id={id} className={`${styles.fieldSelect} ${error ? styles.fieldInputError : ''}`} {...props}>
        {children}
      </select>
      {error && <p className={styles.fieldError}>{error}</p>}
    </div>
  )
}

/* ── Modal ── */
export function Modal({ title, onClose, children, footer }) {
  return (
    <div className={styles.modalOverlay} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className={styles.modalCard}>
        <div className={styles.modalHeader}>
          <h2 id="modal-title" className={styles.modalTitle}>{title}</h2>
          <button className={styles.modalClose} onClick={onClose} aria-label="Fermer">✕</button>
        </div>
        <div className={styles.modalBody}>{children}</div>
        {footer && <div className={styles.modalFooter}>{footer}</div>}
      </div>
    </div>
  )
}

/* ── Toast ── */
export function Toast({ message, type = 'success', onClose }) {
  const map = { success: styles.toastOk, error: styles.toastKo, info: styles.toastInfo }
  return (
    <div className={`${styles.toast} ${map[type] || ''}`} role="alert">
      <span>{type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}</span>
      <span>{message}</span>
      <button className={styles.toastClose} onClick={onClose} aria-label="Fermer">✕</button>
    </div>
  )
}

/* ── Loader ── */
export function Loader({ text = 'Chargement…' }) {
  return (
    <div className={styles.loader}>
      <span className={styles.loaderSpinner}></span>
      <span>{text}</span>
    </div>
  )
}
