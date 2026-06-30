import { useState } from 'react'
import { MOCK_PUSH_TOKENS, MOCK_SITES } from '../../services/mockData.js'
import { PageHeader, Table, Tr, Td, StatutBadge, Btn } from '../../components/backoffice/AdminCommon.jsx'

export default function NotificationsPushPage() {
  const [tokens, setTokens] = useState(MOCK_PUSH_TOKENS)
  const [activations, setActivations] = useState(
    MOCK_SITES.slice(0,3).map(s => ({ siteId: s.id, nom: s.nom, actif: true, evenements: 'Panne ANPTIC · Panne LAN · Rétablissement' }))
  )

  const supprimer = (id) => setTokens(t => t.filter(tok => tok.id !== id))
  const toggleActivation = (siteId) => setActivations(a => a.map(s => s.siteId === siteId ? { ...s, actif: !s.actif } : s))

  return (
    <div>
      <PageHeader title="Notifications push" subtitle="Gestion des destinataires et activation par site" />

      <h2 style={{ fontSize:15, fontWeight:700, marginBottom:14 }}>Destinataires enregistrés</h2>
      <p style={{ fontSize:12, color:'var(--text-muted)', marginBottom:16 }}>
        Les tokens push sont enregistrés lorsque le décideur active les notifications depuis l'interface mobile.
      </p>

      <Table headers={['PROFIL / NOM', 'SITE(S) CONCERNÉ(S)', 'PLATEFORME', 'ENREGISTRÉ LE', 'STATUT', 'ACTIONS']}>
        {tokens.map(tok => (
          <Tr key={tok.id}>
            <Td><span style={{ fontWeight:600 }}>{tok.profil}</span></Td>
            <Td><span style={{ fontSize:12 }}>{tok.sites.join(' · ')}</span></Td>
            <Td>
              <span style={{ fontSize:11, fontWeight:600, background:'#f1f5f9', padding:'2px 8px', borderRadius:20 }}>
                {tok.plateforme}
              </span>
            </Td>
            <Td><span style={{ fontSize:12, color:'var(--text-muted)' }}>{tok.enregistreLe}</span></Td>
            <Td><StatutBadge statut={tok.statut} /></Td>
            <Td>
              <Btn variant="danger" size="sm" onClick={() => supprimer(tok.id)}>Supprimer</Btn>
            </Td>
          </Tr>
        ))}
      </Table>

      <h2 style={{ fontSize:15, fontWeight:700, margin:'28px 0 14px' }}>Activation par site</h2>
      <Table headers={['SITE', 'NOTIFICATIONS PUSH', 'ÉVÉNEMENTS DÉCLENCHEURS']}>
        {activations.map(a => (
          <Tr key={a.siteId}>
            <Td><span style={{ fontWeight:600 }}>{a.nom}</span></Td>
            <Td>
              <label style={{ display:'flex', alignItems:'center', gap:8, cursor:'pointer' }}>
                <input type="checkbox" checked={a.actif} onChange={() => toggleActivation(a.siteId)} />
                <span style={{ fontSize:12 }}>{a.actif ? 'Activées' : 'Désactivées'}</span>
              </label>
            </Td>
            <Td>
              <span style={{ fontSize:12, color: a.actif ? 'var(--text-secondary)' : 'var(--text-muted)' }}>
                {a.actif ? a.evenements : '—'}
              </span>
            </Td>
          </Tr>
        ))}
      </Table>
    </div>
  )
}
