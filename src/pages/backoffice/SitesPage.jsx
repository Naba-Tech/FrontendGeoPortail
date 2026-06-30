import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MOCK_SITES, MOCK_ANPTIC } from '../../services/mockData.js'
import { PageHeader, Table, Tr, Td, StatutBadge, Btn, Input } from '../../components/backoffice/AdminCommon.jsx'
import styles from './SitesPage.module.css'

export default function SitesPage() {
  const [sites] = useState(MOCK_SITES)
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const filtered = sites.filter(s =>
    s.nom.toLowerCase().includes(search.toLowerCase()) ||
    s.ville.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <PageHeader
        title="Gestion des sites"
        subtitle="Créer, modifier ou désactiver les bâtiments institutionnels connectés au RESINA"
        action={
          <Btn variant="primary" onClick={() => navigate('/admin/sites/nouveau')}>
            + Nouveau site
          </Btn>
        }
      />

      {/* Barre de recherche */}
      <div className={styles.toolbar}>
        <span className={styles.count}>Sites configurés <strong>{filtered.length}</strong></span>
        <div className={styles.searchWrap}>
          <Input
            placeholder="Rechercher un site…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      <Table headers={['NOM DU SITE', 'VILLE', 'NŒUD NETXMS', 'ÉQUIPEMENTS', 'STATUT', 'ACTIONS']}>
        {filtered.map(site => {
          const anptic = MOCK_ANPTIC[site.id]
          return (
            <Tr key={site.id}>
              <Td>
                <div className={styles.siteNom}>{site.nom}</div>
                <div className={styles.siteRegion}>{site.region}</div>
              </Td>
              <Td>{site.ville}</Td>
              <Td><span className={styles.mono}>{site.netxmsNodeId}</span></Td>
              <Td>{site.totalEquipements} équip.</Td>
              <Td>
                <StatutBadge statut={anptic?.statut === 'KO' ? 'KO' : anptic?.statut === 'WARN' ? 'WARN' : 'OK'} />
              </Td>
              <Td>
                <div className={styles.actions}>
                  <Btn variant="secondary" size="sm" onClick={() => navigate(`/admin/sites/${site.id}/modifier`)}>
                    Modifier
                  </Btn>
                </div>
              </Td>
            </Tr>
          )
        })}
      </Table>
    </div>
  )
}
