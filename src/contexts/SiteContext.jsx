import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react'
import { MOCK_SITES, MOCK_ANPTIC, MOCK_LAN } from '../services/mockData.js'

const SiteContext = createContext(null)

const USE_MOCK = true // Passer à false quand le backend est prêt

export function SiteProvider({ children }) {
  const [sites, setSites] = useState([])
  const [selectedSiteId, setSelectedSiteId] = useState(null)
  const [anpticData, setAnpticData] = useState(null)
  const [lanData, setLanData] = useState(null)
  const [loading, setLoading] = useState({ sites: false, anptic: false, lan: false })
  const [error, setError] = useState(null)
  const [lastUpdate, setLastUpdate] = useState(null)
  const intervalRef = useRef(null)

  // Charger la liste des sites
  useEffect(() => {
    const fetchSites = async () => {
      setLoading(l => ({ ...l, sites: true }))
      try {
        if (USE_MOCK) {
          await new Promise(r => setTimeout(r, 400))
          setSites(MOCK_SITES)
          setSelectedSiteId(MOCK_SITES[0]?.id)
        } else {
          const { sitesApi } = await import('../services/api.js')
          const { data } = await sitesApi.getAll()
          setSites(data)
          if (data.length) setSelectedSiteId(data[0].id)
        }
      } catch (err) {
        setError('Impossible de charger la liste des sites.')
      } finally {
        setLoading(l => ({ ...l, sites: false }))
      }
    }
    fetchSites()
  }, [])

  // Charger les données ANPTIC + LAN pour le site sélectionné
  const fetchSiteData = useCallback(async (siteId) => {
    if (!siteId) return
    setLoading(l => ({ ...l, anptic: true, lan: true }))
    setError(null)
    try {
      if (USE_MOCK) {
        await new Promise(r => setTimeout(r, 600))
        setAnpticData(MOCK_ANPTIC[siteId] || null)
        setLanData(MOCK_LAN[siteId] || null)
      } else {
        const { sitesApi } = await import('../services/api.js')
        const [anpticRes, lanRes] = await Promise.all([
          sitesApi.getAnptic(siteId),
          sitesApi.getLan(siteId),
        ])
        setAnpticData(anpticRes.data)
        setLanData(lanRes.data)
      }
      setLastUpdate(new Date())
    } catch {
      setError('Les données de supervision sont temporairement indisponibles.')
      setAnpticData(null)
      setLanData(null)
    } finally {
      setLoading(l => ({ ...l, anptic: false, lan: false }))
    }
  }, [])

  // Déclencher le chargement à chaque changement de site
  useEffect(() => {
    if (selectedSiteId) fetchSiteData(selectedSiteId)
  }, [selectedSiteId, fetchSiteData])

  // Auto-refresh toutes les 60 secondes
  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      if (selectedSiteId) fetchSiteData(selectedSiteId)
    }, 60000)
    return () => clearInterval(intervalRef.current)
  }, [selectedSiteId, fetchSiteData])

  const refresh = useCallback(() => fetchSiteData(selectedSiteId), [selectedSiteId, fetchSiteData])

  const selectedSite = sites.find(s => s.id === selectedSiteId) || null

  return (
    <SiteContext.Provider value={{
      sites, selectedSite, selectedSiteId, setSelectedSiteId,
      anpticData, lanData, loading, error, lastUpdate, refresh
    }}>
      {children}
    </SiteContext.Provider>
  )
}

export const useSite = () => {
  const ctx = useContext(SiteContext)
  if (!ctx) throw new Error('useSite must be used within SiteProvider')
  return ctx
}
