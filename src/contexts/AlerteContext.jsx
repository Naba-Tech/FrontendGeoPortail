import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { MOCK_ALERTES } from '../services/mockData.js'

const AlerteContext = createContext(null)

export function AlerteProvider({ children }) {
  const [alertes, setAlertes] = useState([])
  const [loading, setLoading] = useState(false)
  const [pushPermission, setPushPermission] = useState(
    typeof Notification !== 'undefined' ? Notification.permission : 'default'
  )

  useEffect(() => {
    const fetchAlertes = async () => {
      setLoading(true)
      await new Promise(r => setTimeout(r, 500))
      setAlertes(MOCK_ALERTES)
      setLoading(false)
    }
    fetchAlertes()
  }, [])

  const nonLues = alertes.filter(a => !a.lu).length

  const marquerLu = useCallback((id) => {
    setAlertes(prev => prev.map(a => a.id === id ? { ...a, lu: true } : a))
  }, [])

  const marquerToutLu = useCallback(() => {
    setAlertes(prev => prev.map(a => ({ ...a, lu: true })))
  }, [])

  const demanderPermissionPush = useCallback(async () => {
    if (typeof Notification === 'undefined') return
    const perm = await Notification.requestPermission()
    setPushPermission(perm)
  }, [])

  return (
    <AlerteContext.Provider value={{
      alertes, loading, nonLues,
      marquerLu, marquerToutLu,
      pushPermission, demanderPermissionPush
    }}>
      {children}
    </AlerteContext.Provider>
  )
}

export const useAlertes = () => {
  const ctx = useContext(AlerteContext)
  if (!ctx) throw new Error('useAlertes must be used within AlerteProvider')
  return ctx
}
