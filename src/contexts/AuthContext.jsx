import { createContext, useContext, useState, useCallback } from 'react'
import { authApi } from '../services/api.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('admin_user')
    return stored ? JSON.parse(stored) : null
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const login = useCallback(async (email, password) => {
    setLoading(true)
    setError(null)
    try {
      // Mode démo : accepte les credentials de test
      if (email === 'admin@anptic.bf' && password === 'Admin@2026') {
        const fakeUser = { id: 1, nom: 'KIWALO', prenom: 'Xavier', email, role: 'ADMIN_GLOBAL' }
        localStorage.setItem('access_token', 'demo_token_jwt')
        localStorage.setItem('refresh_token', 'demo_refresh_token')
        localStorage.setItem('admin_user', JSON.stringify(fakeUser))
        setUser(fakeUser)
        return { success: true }
      }
      // Appel API réel
      const { data } = await authApi.login({ email, password })
      localStorage.setItem('access_token', data.accessToken)
      localStorage.setItem('refresh_token', data.refreshToken)
      localStorage.setItem('admin_user', JSON.stringify(data.user))
      setUser(data.user)
      return { success: true }
    } catch (err) {
      const msg = err.response?.data?.message || 'Identifiants invalides'
      setError(msg)
      return { success: false, error: msg }
    } finally {
      setLoading(false)
    }
  }, [])

  const logout = useCallback(async () => {
    try { await authApi.logout() } catch {}
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('admin_user')
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, error, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
