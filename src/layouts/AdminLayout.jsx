import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext.jsx'
import styles from './AdminLayout.module.css'

const NAV_ITEMS = [
  { section: 'SUPERVISION', items: [
    { to: '/admin/dashboard',     label: 'Tableau de bord', icon: '⊞' },
    { to: '/admin/sites',         label: 'Gestion des sites', icon: '🏢' },
    { to: '/admin/equipements',   label: 'Équipements LAN', icon: '📡' },
  ]},
  { section: 'CONFIGURATION', items: [
    { to: '/admin/cartographie',  label: 'Cartographie', icon: '🗺️' },
    { to: '/admin/parametres',    label: 'Paramètres supervision', icon: '⚙️' },
    { to: '/admin/notifications', label: 'Notifications push', icon: '🔔' },
  ]},
  { section: 'ADMINISTRATION', items: [
    { to: '/admin/utilisateurs',  label: 'Utilisateurs', icon: '👤' },
    { to: '/admin/journal',       label: "Journal d'activité", icon: '📋' },
  ]},
]

export default function AdminLayout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/admin/login')
  }

  return (
    <div className={styles.shell}>
      {/* ── Sidebar ── */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <div className={styles.logo}>
            <svg width="24" height="24" viewBox="0 0 28 28" fill="none" aria-hidden="true">
              <rect width="28" height="28" rx="6" fill="#1565C0"/>
              <path d="M14 4L24 9V19L14 24L4 19V9L14 4Z" stroke="#FCD116" strokeWidth="1.5" fill="none"/>
              <circle cx="14" cy="14" r="4" fill="#FCD116"/>
            </svg>
          </div>
          <div>
            <div className={styles.sidebarTitle}>GéoPortail RESINA</div>
            <div className={styles.sidebarRole}>BACKOFFICE DEST/DIG</div>
          </div>
        </div>

        <nav className={styles.nav} aria-label="Navigation admin">
          {NAV_ITEMS.map(group => (
            <div key={group.section} className={styles.navGroup}>
              <div className={styles.navSection}>{group.section}</div>
              {group.items.map(item => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}
                >
                  <span className={styles.navIcon} aria-hidden="true">{item.icon}</span>
                  {item.label}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>

        {/* Profil utilisateur */}
        <div className={styles.userBlock}>
          <div className={styles.avatar}>
            {user?.prenom?.[0]}{user?.nom?.[0]}
          </div>
          <div className={styles.userInfo}>
            <div className={styles.userName}>{user?.prenom} {user?.nom}</div>
            <div className={styles.userRole}>{user?.role === 'ADMIN_GLOBAL' ? 'Administrateur global' : 'Administrateur site'}</div>
          </div>
          <button onClick={handleLogout} className={styles.logoutBtn} title="Déconnexion" aria-label="Se déconnecter">
            ⏏
          </button>
        </div>
      </aside>

      {/* ── Contenu principal ── */}
      <div className={styles.content}>
        {/* Topbar */}
        <header className={styles.topbar}>
          <div className={styles.topbarLeft}>
            <span className={styles.netxmsStatus}>
              <span className={styles.statusDot}></span>
              Connecté à NetXMS
            </span>
          </div>
          <button className={styles.refreshBtn} onClick={() => window.location.reload()}>
            ↺ Actualiser
          </button>
        </header>

        <main className={styles.main}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
