import { Outlet, NavLink, useLocation } from 'react-router-dom'
import { useSite } from '../contexts/SiteContext.jsx'
import { useAlertes } from '../contexts/AlerteContext.jsx'
import SiteSelector from '../components/decideur/SiteSelector.jsx'
import LiveBadge from '../components/common/LiveBadge.jsx'
import styles from './DecideurLayout.module.css'

export default function DecideurLayout() {
  const { selectedSite } = useSite()
  const { nonLues } = useAlertes()
  const location = useLocation()

  return (
    <div className={styles.shell}>
      {/* ── En-tête ── */}
      <header className={styles.header}>
        <div className={styles.headerTop}>
          {/* Bandeau drapeau Burkina */}
          <div className={styles.flagBand}>
            <span className={styles.flagRed}></span>
            <span className={styles.flagGreen}></span>
          </div>
          <div className={styles.brandRow}>
            <div className={styles.logoMark}>
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                <rect width="28" height="28" rx="6" fill="#1565C0"/>
                <path d="M14 4L24 9V19L14 24L4 19V9L14 4Z" stroke="#FCD116" strokeWidth="1.5" fill="none"/>
                <circle cx="14" cy="14" r="4" fill="#FCD116"/>
              </svg>
            </div>
            <div>
              <div className={styles.brandName}>GéoPortail RESINA</div>
              <div className={styles.brandSub}>Tableau de bord — Usage Ministériel</div>
            </div>
          </div>
          <LiveBadge />
        </div>

        {/* ── Navigation ── */}
        <nav className={styles.nav} aria-label="Navigation principale">
          <NavLink to="/"       end className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>MON SITE</NavLink>
          <NavLink to="/carte"      className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>CARTE</NavLink>
          <NavLink to="/alertes"    className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>
            ALERTES
            {nonLues > 0 && <span className={styles.badge}>{nonLues}</span>}
          </NavLink>
        </nav>

        {/* ── Site sélectionné ── */}
        <div className={styles.siteBar}>
          <span className={styles.siteLabel}>SITE SÉLECTIONNÉ</span>
          <SiteSelector />
        </div>
      </header>

      {/* ── Contenu ── */}
      <main className={styles.main}>
        <Outlet />
      </main>

      {/* ── Pied de page ── */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <span>ANPTIC — RESINA GéoPortail</span>
          <span className={styles.footerDot}>·</span>
          <span>Données issues du système de supervision NOC</span>
          <span className={styles.footerDot}>·</span>
          <span>Burkina Faso · Ministère de la Transition Digitale</span>
        </div>
      </footer>
    </div>
  )
}
