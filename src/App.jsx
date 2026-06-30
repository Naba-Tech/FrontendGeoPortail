import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext.jsx'
import { SiteProvider } from './contexts/SiteContext.jsx'
import { AlerteProvider } from './contexts/AlerteContext.jsx'
import ProtectedRoute from './routes/ProtectedRoute.jsx'

// Layouts
import DecideurLayout from './layouts/DecideurLayout.jsx'
import AdminLayout from './layouts/AdminLayout.jsx'

// Pages Décideur
import MonSitePage from './pages/decideur/MonSitePage.jsx'
import CartePage from './pages/decideur/CartePage.jsx'
import AlertesPage from './pages/decideur/AlertesPage.jsx'

// Pages Backoffice
import LoginPage from './pages/backoffice/LoginPage.jsx'
import DashboardPage from './pages/backoffice/DashboardPage.jsx'
import SitesPage from './pages/backoffice/SitesPage.jsx'
import SiteFormPage from './pages/backoffice/SiteFormPage.jsx'
import EquipementsPage from './pages/backoffice/EquipementsPage.jsx'
import CartographiePage from './pages/backoffice/CartographiePage.jsx'
import ParametresPage from './pages/backoffice/ParametresPage.jsx'
import NotificationsPushPage from './pages/backoffice/NotificationsPushPage.jsx'
import UtilisateursPage from './pages/backoffice/UtilisateursPage.jsx'
import JournalPage from './pages/backoffice/JournalPage.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <SiteProvider>
          <AlerteProvider>
            <Routes>
              {/* ── Interface Décideur ── */}
              <Route path="/" element={<DecideurLayout />}>
                <Route index element={<MonSitePage />} />
                <Route path="carte" element={<CartePage />} />
                <Route path="alertes" element={<AlertesPage />} />
              </Route>

              {/* ── Backoffice DEST/DIG ── */}
              <Route path="/admin/login" element={<LoginPage />} />
              <Route path="/admin" element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }>
                <Route index element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="dashboard" element={<DashboardPage />} />
                <Route path="sites" element={<SitesPage />} />
                <Route path="sites/nouveau" element={<SiteFormPage />} />
                <Route path="sites/:id/modifier" element={<SiteFormPage />} />
                <Route path="equipements" element={<EquipementsPage />} />
                <Route path="cartographie" element={<CartographiePage />} />
                <Route path="parametres" element={<ParametresPage />} />
                <Route path="notifications" element={<NotificationsPushPage />} />
                <Route path="utilisateurs" element={<UtilisateursPage />} />
                <Route path="journal" element={<JournalPage />} />
              </Route>

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AlerteProvider>
        </SiteProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
