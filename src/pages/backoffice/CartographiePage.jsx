import { useState } from 'react'
import { MOCK_SITES } from '../../services/mockData.js'
import { PageHeader, Table, Tr, Td, Btn, Input } from '../../components/backoffice/AdminCommon.jsx'
import styles from './CartographiePage.module.css'

export default function CartographiePage() {
  const [sites, setSites] = useState(MOCK_SITES.map(s => ({ ...s })))
  const [saved, setSaved] = useState(null)

  const update = (id, key, val) => setSites(prev => prev.map(s => s.id === id ? { ...s, [key]: val } : s))

  const save = async (id) => {
    await new Promise(r => setTimeout(r, 400))
    setSaved(id)
    setTimeout(() => setSaved(null), 1500)
  }

  const getStatutCarte = (s) => {
    if (s.latitude && s.longitude) return { label: 'Positionné', cls: styles.statOk }
    return { label: 'À positionner', cls: styles.statWarn }
  }

  return (
    <div>
      <PageHeader
        title="Cartographie"
        subtitle="Positionnement des sites sur la carte du Burkina Faso"
        action={<Btn variant="secondary">⬇ Exporter GeoJSON</Btn>}
      />

      <div className={styles.infoBox}>
        📍 Les coordonnées GPS définissent la position du marqueur sur la carte décideur.
        Utiliser le GPS terrain (outil DEST réf. lot 4) pour obtenir les coordonnées exactes.
      </div>

      <div className={styles.tableWrap}>
        <Table headers={['SITE', 'LATITUDE', 'LONGITUDE', 'INFO AU SURVOL', 'STATUT CARTE', 'ACTIONS']}>
          {sites.map(site => {
            const { label, cls } = getStatutCarte(site)
            return (
              <Tr key={site.id}>
                <Td>
                  <div className={styles.siteNom}>{site.nom}</div>
                  <div className={styles.siteVille}>{site.ville}</div>
                </Td>
                <Td>
                  <input
                    className={styles.coordInput}
                    type="number" step="0.0001"
                    value={site.latitude || ''}
                    onChange={e => update(site.id, 'latitude', e.target.value)}
                    placeholder="12.3569"
                  />
                </Td>
                <Td>
                  <input
                    className={styles.coordInput}
                    type="number" step="0.0001"
                    value={site.longitude || ''}
                    onChange={e => update(site.id, 'longitude', e.target.value)}
                    placeholder="-1.5333"
                  />
                </Td>
                <Td>
                  <input
                    className={styles.coordInput}
                    value={site.infoSurvol || ''}
                    onChange={e => update(site.id, 'infoSurvol', e.target.value)}
                    placeholder="Hub central RESINA"
                  />
                </Td>
                <Td><span className={`${styles.statBadge} ${cls}`}>{label}</span></Td>
                <Td>
                  <Btn variant={saved === site.id ? 'secondary' : 'primary'} size="sm" onClick={() => save(site.id)}>
                    {saved === site.id ? '✓ Enregistré' : 'Enregistrer'}
                  </Btn>
                </Td>
              </Tr>
            )
          })}
        </Table>
      </div>
    </div>
  )
}
