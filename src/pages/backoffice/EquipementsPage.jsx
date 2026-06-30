// EquipementsPage.jsx
import { useState } from 'react'
import { MOCK_SITES, MOCK_LAN } from '../../services/mockData.js'
import { PageHeader, Table, Tr, Td, StatutBadge, Btn, Select } from '../../components/backoffice/AdminCommon.jsx'

export default function EquipementsPage() {
  const [siteId, setSiteId] = useState('primature')
  const site = MOCK_SITES.find(s => s.id === siteId)
  const lan  = MOCK_LAN[siteId]

  return (
    <div>
      <PageHeader title="Équipements LAN" subtitle="Gestion des équipements réseau par bâtiment et par étage" />

      <div style={{ maxWidth: 320, marginBottom: 20 }}>
        <Select label="Site" value={siteId} onChange={e => setSiteId(e.target.value)}>
          {MOCK_SITES.map(s => <option key={s.id} value={s.id}>{s.nom}</option>)}
        </Select>
      </div>

      {lan?.niveaux?.map(niveau => (
        <div key={niveau.code} style={{ marginBottom: 20 }}>
          <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 8, color: 'var(--text-primary)' }}>
            {niveau.code} — {niveau.libelle}
          </div>
          <Table headers={['ÉTAGE', 'TYPE', 'ACTIFS / TOTAL', 'STATUT', 'DÉTAIL']}>
            <Tr>
              <Td>{niveau.code}</Td>
              <Td>Bornes Wi-Fi + Switches</Td>
              <Td>{niveau.equipementsActifs} / {niveau.equipementsTotal}</Td>
              <Td><StatutBadge statut={niveau.statut} /></Td>
              <Td><span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{niveau.detail}</span></Td>
            </Tr>
          </Table>
        </div>
      ))}
    </div>
  )
}
