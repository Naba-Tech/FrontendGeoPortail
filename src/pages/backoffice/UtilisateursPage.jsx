import { useState } from 'react'
import { MOCK_UTILISATEURS } from '../../services/mockData.js'
import { PageHeader, Table, Tr, Td, StatutBadge, Btn, Modal, Input, Select } from '../../components/backoffice/AdminCommon.jsx'

export default function UtilisateursPage() {
  const [users, setUsers] = useState(MOCK_UTILISATEURS)
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({ nom:'', prenom:'', email:'', role:'ADMIN_SITE' })
  const [saving, setSaving] = useState(false)

  const setF = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleCreate = async () => {
    setSaving(true)
    await new Promise(r => setTimeout(r, 600))
    setUsers(u => [...u, { id: Date.now(), ...form, actif: true, createdAt: new Date().toLocaleDateString('fr-FR') }])
    setSaving(false)
    setShowModal(false)
    setForm({ nom:'', prenom:'', email:'', role:'ADMIN_SITE' })
  }

  const toggleActif = (id) => setUsers(u => u.map(usr => usr.id === id ? { ...usr, actif: !usr.actif } : usr))

  return (
    <div>
      <PageHeader
        title="Utilisateurs"
        subtitle="Gestion des comptes administrateurs du Backoffice DEST/DIG"
        action={<Btn variant="primary" onClick={() => setShowModal(true)}>+ Nouvel utilisateur</Btn>}
      />

      <Table headers={['NOM', 'E-MAIL', 'RÔLE', 'STATUT', 'CRÉÉ LE', 'ACTIONS']}>
        {users.map(u => (
          <Tr key={u.id}>
            <Td>
              <div style={{ fontWeight:600, fontSize:13 }}>{u.prenom} {u.nom}</div>
            </Td>
            <Td><span style={{ fontSize:12 }}>{u.email}</span></Td>
            <Td>
              <span style={{ fontSize:11, background:'#eff6ff', color:'var(--anptic-blue)', padding:'3px 10px', borderRadius:20, fontWeight:600 }}>
                {u.role === 'ADMIN_GLOBAL' ? 'Administrateur global' : 'Administrateur site'}
              </span>
            </Td>
            <Td><StatutBadge statut={u.actif ? 'ACTIF' : 'DESACTIVE'} /></Td>
            <Td><span style={{ fontSize:12, color:'var(--text-muted)' }}>{u.createdAt}</span></Td>
            <Td>
              <div style={{ display:'flex', gap:6 }}>
                <Btn variant="secondary" size="sm" onClick={() => toggleActif(u.id)}>
                  {u.actif ? 'Désactiver' : 'Activer'}
                </Btn>
                <Btn variant="ghost" size="sm">Réinit. MDP</Btn>
              </div>
            </Td>
          </Tr>
        ))}
      </Table>

      {showModal && (
        <Modal
          title="Nouvel utilisateur"
          onClose={() => setShowModal(false)}
          footer={
            <>
              <Btn variant="secondary" onClick={() => setShowModal(false)}>Annuler</Btn>
              <Btn variant="primary" onClick={handleCreate} disabled={saving || !form.nom || !form.email}>
                {saving ? 'Création…' : 'Créer le compte'}
              </Btn>
            </>
          }
        >
          <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
              <Input label="Prénom *" value={form.prenom} onChange={e => setF('prenom', e.target.value)} required />
              <Input label="Nom *" value={form.nom} onChange={e => setF('nom', e.target.value)} required />
            </div>
            <Input label="Adresse e-mail *" type="email" value={form.email} onChange={e => setF('email', e.target.value)} required placeholder="prenom.nom@anptic.bf" />
            <Select label="Rôle" value={form.role} onChange={e => setF('role', e.target.value)}>
              <option value="ADMIN_GLOBAL">Administrateur global</option>
              <option value="ADMIN_SITE">Administrateur site</option>
            </Select>
            <p style={{ fontSize:12, color:'var(--text-muted)' }}>
              Un mot de passe temporaire sera envoyé à l'adresse e-mail indiquée.
            </p>
          </div>
        </Modal>
      )}
    </div>
  )
}
