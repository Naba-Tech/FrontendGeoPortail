import { useState } from 'react'
import { MOCK_AUDIT_LOG } from '../../services/mockData.js'
import { PageHeader, Table, Tr, Td, Btn } from '../../components/backoffice/AdminCommon.jsx'

export default function JournalPage() {
  const [logs] = useState(MOCK_AUDIT_LOG)

  return (
    <div>
      <PageHeader
        title="Journal d'activité"
        subtitle="Traçabilité de toutes les modifications effectuées dans le Backoffice"
        action={<Btn variant="secondary">⬇ Exporter</Btn>}
      />

      <div style={{ marginBottom:16, padding:'10px 16px', background:'#eff6ff', border:'1px solid #bfdbfe', borderRadius:6, fontSize:12, color:'#1e40af' }}>
        📋 Les journaux sont conservés 90 jours minimum conformément aux exigences de sécurité ANPTIC.
      </div>

      <Table headers={['DATE / HEURE', 'UTILISATEUR', 'ACTION', 'DÉTAIL']}>
        {logs.map(log => (
          <Tr key={log.id}>
            <Td>
              <span style={{ fontFamily:'var(--font-mono)', fontSize:12, color:'var(--text-muted)', whiteSpace:'nowrap' }}>
                {log.date}
              </span>
            </Td>
            <Td>
              <span style={{ fontWeight:600, fontSize:12, color:'var(--anptic-blue)' }}>{log.utilisateur}</span>
            </Td>
            <Td>
              <span style={{ fontSize:13 }}>{log.action}</span>
            </Td>
            <Td>
              <span style={{ fontSize:12, color:'var(--text-secondary)' }}>{log.entite}</span>
              {log.detail && <span style={{ fontSize:11, color:'var(--text-muted)', display:'block', marginTop:2 }}>{log.detail}</span>}
            </Td>
          </Tr>
        ))}
      </Table>
    </div>
  )
}
