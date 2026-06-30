import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSite } from '../../contexts/SiteContext.jsx'
import { MOCK_ANPTIC } from '../../services/mockData.js'
import { getMapMarkerColor } from '../../utils/formatters.js'
import RefreshBar from '../../components/decideur/RefreshBar.jsx'
import styles from './CartePage.module.css'

export default function CartePage() {
  const { sites, selectedSiteId, setSelectedSiteId, lastUpdate, refresh, loading } = useSite()
  const navigate = useNavigate()
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const markersRef = useRef([])
  const [mapReady, setMapReady] = useState(false)

  // Initialise la carte Leaflet une seule fois
  useEffect(() => {
    if (mapInstanceRef.current || !mapRef.current) return

    import('leaflet').then(L => {
      const map = L.default.map(mapRef.current, {
        center: [12.3569, -1.5333],
        zoom: 7,
        zoomControl: true,
        attributionControl: false,
      })

      L.default.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '© OpenStreetMap'
      }).addTo(map)

      mapInstanceRef.current = map
      setMapReady(true)
    })

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  // Place les marqueurs quand la carte et les sites sont prêts
  useEffect(() => {
    if (!mapReady || !mapInstanceRef.current || !sites.length) return
    import('leaflet').then(L => {
      // Supprimer anciens marqueurs
      markersRef.current.forEach(m => m.remove())
      markersRef.current = []

      sites.forEach(site => {
        const anptic = MOCK_ANPTIC[site.id]
        const color  = getMapMarkerColor(anptic?.statut || 'KO')
        const isSelected = site.id === selectedSiteId

        const icon = L.default.divIcon({
          className: '',
          html: `<div style="
            width:${isSelected ? 18 : 14}px;
            height:${isSelected ? 18 : 14}px;
            background:${color};
            border-radius:50%;
            border:${isSelected ? '3px solid white' : '2px solid white'};
            box-shadow:0 2px 6px rgba(0,0,0,0.35);
            transition:all 0.2s;
          "></div>`,
          iconSize: [isSelected ? 18 : 14, isSelected ? 18 : 14],
          iconAnchor: [isSelected ? 9 : 7, isSelected ? 9 : 7],
        })

        const marker = L.default.marker([site.latitude, site.longitude], { icon })
          .addTo(mapInstanceRef.current)
          .bindPopup(`
            <div style="font-family:var(--font-sans,sans-serif);min-width:160px;">
              <strong style="font-size:13px;">${site.nom}</strong><br/>
              <span style="font-size:11px;color:#64748b;">${site.ville}</span><br/>
              <span style="font-size:11px;margin-top:4px;display:block;font-weight:600;color:${color};">
                ${anptic?.statut === 'OK' ? '✓ Disponible' : anptic?.statut === 'WARN' ? '⚠ Dégradé' : '✕ Hors service'}
              </span>
              ${site.infoSurvol ? `<span style="font-size:10px;color:#94a3b8;">${site.infoSurvol}</span>` : ''}
            </div>
          `, { closeButton: false })
          .on('click', () => {
            setSelectedSiteId(site.id)
            navigate('/')
          })

        markersRef.current.push(marker)
      })
    })
  }, [mapReady, sites, selectedSiteId, setSelectedSiteId, navigate])

  const getStatutLabel = (statut) => {
    switch (statut) {
      case 'OK':   return { label: 'Disponible',   cls: styles.disponible }
      case 'WARN': return { label: 'Dégradé',      cls: styles.degrade }
      case 'KO':   return { label: 'Hors service', cls: styles.horsService }
      default:     return { label: 'Inconnu',      cls: styles.horsService }
    }
  }

  const handleSiteClick = (siteId) => {
    setSelectedSiteId(siteId)
    navigate('/')
  }

  return (
    <div className={styles.page}>
      <RefreshBar lastUpdate={lastUpdate} onRefresh={refresh} loading={loading.anptic} />

      {/* Légende */}
      <div className={styles.legend}>
        <span className={styles.legendItem}><span className={`${styles.dot} ${styles.dotOk}`}></span>Disponible</span>
        <span className={styles.legendItem}><span className={`${styles.dot} ${styles.dotWarn}`}></span>Dégradé</span>
        <span className={styles.legendItem}><span className={`${styles.dot} ${styles.dotKo}`}></span>Hors service</span>
      </div>

      {/* Carte Leaflet */}
      <div className={styles.mapContainer}>
        <div ref={mapRef} className={styles.map}></div>
        {!mapReady && (
          <div className={styles.mapLoader}>
            <span className={styles.spinner}></span>
            Chargement de la carte…
          </div>
        )}
      </div>

      <p className={styles.mapHint}>Appuyez sur un marqueur pour voir le détail</p>

      {/* Liste de tous les sites */}
      <div className={styles.sitesList}>
        <div className={styles.sitesTitle}>TOUS LES SITES RESINA</div>
        {sites.map(site => {
          const anptic = MOCK_ANPTIC[site.id]
          const { label, cls } = getStatutLabel(anptic?.statut)
          const isActive = site.id === selectedSiteId
          return (
            <button
              key={site.id}
              className={`${styles.siteRow} ${isActive ? styles.siteRowActive : ''}`}
              onClick={() => handleSiteClick(site.id)}
            >
              <div className={styles.siteRowLeft}>
                <span
                  className={styles.siteDot}
                  style={{ background: getMapMarkerColor(anptic?.statut) }}
                ></span>
                <div>
                  <div className={styles.siteName}>{site.nom}</div>
                  <div className={styles.siteVille}>{site.ville}</div>
                </div>
              </div>
              <span className={`${styles.siteStatut} ${cls}`}>{label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
