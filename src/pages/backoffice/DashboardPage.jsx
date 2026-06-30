import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MOCK_DASHBOARD } from '../../services/mockData.js'
import { PageHeader, KpiCard, Table, Tr, Td, StatutBadge, Btn } from '../../components/backoffice/AdminCommon.jsx'
import styles from './DashboardPage.module.css'

export default function DashboardPage() {
  const [data] = useState(MOCK_DASHBOARD)
  const navigate = useNavigate()

  const kpis = [
    { label: 'Sites actifs',     value: `${data.sitesActifs}`,       sub: `sur ${data.sitesTotal} sites configurés`, color: 'blue' },
    { label: 'Disponibles',      value: `${data.sitesDisponibles}`,  sub: 'Connexion ANPTIC active',                  color: 'green' },
    { label: 'Dégradés',         value: `${data.sitesDegrades}`,     sub: 'Débit inférieur au seuil',                 color: 'orange' },
    { label: 'Hors service',     value: `${data.sitesHorsService}`,  sub: data.sitesHorsService > 0 ? 'Dori · Gaoua' : 'Aucun', color: data.sitesHorsService > 0 ? 'red' : 'gray' },
  ]

  return (
    <div>
      <PageHeader
        title="Tableau de bord"
        subtitle={`Vue d'ensemble des sites et de l'état de la plateforme — Juin 2026`}
      />

      {/* KPIs */}
      <div className={styles.kpiGrid}>
        {kpis.map(k => <KpiCard key={k.label} {...k} />)}
      </div>

      {/* Sites nécessitant une attention */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Sites nécessitant une attention</h2>
          <Btn variant="primary" size="sm" onClick={() => navigate('/admin/sites/nouveau')}>
            + Ajouter un site
          </Btn>
        </div>

        <Table headers={['SITE', 'STATUT ANPTIC', 'STATUT LAN', 'DERNIÈRE MAJ', 'ACTIONS']}>
          {data.sitesEnAlerte.map(site => (
            <Tr key={site.id}>
              <Td>
                <div className={styles.siteNom}>{site.nom}</div>
                <div className={styles.siteVille}>{site.ville}</div>
              </Td>
              <Td><StatutBadge statut={site.statutAnptic} /></Td>
              <Td><StatutBadge statut={site.statutLan} /></Td>
              <Td><span className={styles.muted}>Il y a {site.derniereMaj}</span></Td>
              <Td>
                <Btn variant="ghost" size="sm" onClick={() => navigate(`/admin/sites/${site.id}/modifier`)}>
                  Modifier
                </Btn>
              </Td>
            </Tr>
          ))}
        </Table>
      </div>
    </div>
  )
}
