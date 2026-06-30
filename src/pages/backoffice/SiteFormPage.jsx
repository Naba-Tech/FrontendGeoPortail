import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { MOCK_SITES } from '../../services/mockData.js'
import { PageHeader, Input, Select, Btn } from '../../components/backoffice/AdminCommon.jsx'
import styles from './SiteFormPage.module.css'

const REGIONS = ['Centre','Sahel','Sud-Ouest','Nord','Est','Boucle du Mouhoun','Cascades','Centre-Est','Centre-Nord','Centre-Ouest','Centre-Sud','Hauts-Bassins','Plateau-Central']
const TYPES_EQUIPEMENT = ['Switches + Bornes Wi-Fi','Bornes Wi-Fi uniquement','Switches uniquement','Routeurs + Switches']

export default function SiteFormPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = !!id

  const [form, setForm] = useState({
    nom: '', ville: '', region: 'Centre', netxmsNodeId: '',
    contactDsiNom: '', contactDsiTel: '',
    latitude: '', longitude: '', infoSurvol: '',
    niveaux: [{ etage: 'RDC', libelle: 'Rez-de-chaussée', type: 'Switches + Bornes Wi-Fi', nbEquipements: 4 }],
  })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (isEdit) {
      const site = MOCK_SITES.find(s => s.id === id)
      if (site) {
        setForm(f => ({
          ...f,
          nom: site.nom,
          ville: site.ville,
          region: site.region,
          netxmsNodeId: site.netxmsNodeId,
          contactDsiNom: site.contactDsiNom,
          contactDsiTel: site.contactDsiTel,
          latitude: site.latitude,
          longitude: site.longitude,
          infoSurvol: site.infoSurvol || '',
        }))
      }
    }
  }, [id, isEdit])

  const setField = (key, val) => setForm(f => ({ ...f, [key]: val }))

  const addNiveau = () => setForm(f => ({
    ...f,
    niveaux: [...f.niveaux, { etage: `R+${f.niveaux.length}`, libelle: '', type: 'Bornes Wi-Fi uniquement', nbEquipements: 4 }]
  }))

  const updateNiveau = (i, key, val) => setForm(f => ({
    ...f,
    niveaux: f.niveaux.map((n, idx) => idx === i ? { ...n, [key]: val } : n)
  }))

  const removeNiveau = (i) => setForm(f => ({
    ...f,
    niveaux: f.niveaux.filter((_, idx) => idx !== i)
  }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    await new Promise(r => setTimeout(r, 800)) // simuler appel API
    setSaving(false)
    setSaved(true)
    setTimeout(() => navigate('/admin/sites'), 1000)
  }

  return (
    <div>
      <PageHeader
        title={isEdit ? 'Modifier un site' : 'Nouveau site'}
        subtitle={isEdit ? `${form.nom} — ${form.ville}` : 'Créer un nouveau site institutionnel'}
      />

      {saved && (
        <div className={styles.successBanner}>✓ Site enregistré avec succès. Redirection…</div>
      )}

      <div className={styles.infoBox}>
        ℹ️ Les informations saisies ici complètent les données collectées automatiquement par NetXMS. Elles ne modifient pas NetXMS.
      </div>

      <form onSubmit={handleSubmit} className={styles.formGrid}>
        {/* Identification */}
        <div className={styles.formCard}>
          <h2 className={styles.cardTitle}>Identification du site</h2>
          <div className={styles.grid2}>
            <Input label="Nom usuel du site *" value={form.nom} onChange={e => setField('nom', e.target.value)} required placeholder="Ministère de l'Économie" />
            <Input label="Ville / Localisation *" value={form.ville} onChange={e => setField('ville', e.target.value)} required placeholder="Ouagadougou" />
            <Select label="Région administrative" value={form.region} onChange={e => setField('region', e.target.value)}>
              {REGIONS.map(r => <option key={r}>{r}</option>)}
            </Select>
            <Input label="ID nœud NetXMS *" type="number" value={form.netxmsNodeId} onChange={e => setField('netxmsNodeId', e.target.value)} required placeholder="1042" />
          </div>
          <p className={styles.hint}>Identifiant de l'objet dans NetXMS (Network Objects)</p>
        </div>

        {/* Contact DSI */}
        <div className={styles.formCard}>
          <h2 className={styles.cardTitle}>Contact DSI du bâtiment</h2>
          <div className={styles.grid2}>
            <Input label="Nom du contact DSI" value={form.contactDsiNom} onChange={e => setField('contactDsiNom', e.target.value)} placeholder="Moussa OUEDRAOGO" />
            <Input label="Téléphone DSI" type="tel" value={form.contactDsiTel} onChange={e => setField('contactDsiTel', e.target.value)} placeholder="+226 70 11 22 33" />
          </div>
        </div>

        {/* GPS */}
        <div className={styles.formCard}>
          <h2 className={styles.cardTitle}>Coordonnées GPS (carte décideur)</h2>
          <div className={styles.grid2}>
            <Input label="Latitude" type="number" step="0.0001" value={form.latitude} onChange={e => setField('latitude', e.target.value)} placeholder="12.3569" />
            <Input label="Longitude" type="number" step="0.0001" value={form.longitude} onChange={e => setField('longitude', e.target.value)} placeholder="-1.5333" />
          </div>
          <Input label="Info affichée au survol du marqueur" value={form.infoSurvol} onChange={e => setField('infoSurvol', e.target.value)} placeholder="Hub central RESINA" />
        </div>

        {/* Équipements LAN par étage */}
        <div className={styles.formCard}>
          <h2 className={styles.cardTitle}>Équipements LAN par étage</h2>
          <div className={styles.niveauxTable}>
            <div className={styles.niveauxHeader}>
              <span>ÉTAGE</span>
              <span>LIBELLÉ AFFICHÉ</span>
              <span>TYPE PRINCIPAL</span>
              <span>NB ÉQUIP.</span>
              <span></span>
            </div>
            {form.niveaux.map((n, i) => (
              <div key={i} className={styles.niveauRow}>
                <input className={styles.cellInput} value={n.etage} onChange={e => updateNiveau(i, 'etage', e.target.value)} placeholder="RDC" />
                <input className={styles.cellInput} value={n.libelle} onChange={e => updateNiveau(i, 'libelle', e.target.value)} placeholder="Rez-de-chaussée" />
                <select className={styles.cellInput} value={n.type} onChange={e => updateNiveau(i, 'type', e.target.value)}>
                  {TYPES_EQUIPEMENT.map(t => <option key={t}>{t}</option>)}
                </select>
                <input className={styles.cellInput} type="number" value={n.nbEquipements} onChange={e => updateNiveau(i, 'nbEquipements', +e.target.value)} min={1} />
                <button type="button" className={styles.removeBtn} onClick={() => removeNiveau(i)} aria-label="Supprimer ce niveau">✕</button>
              </div>
            ))}
          </div>
          <button type="button" className={styles.addNiveauBtn} onClick={addNiveau}>
            + Ajouter un niveau
          </button>
        </div>

        {/* Actions */}
        <div className={styles.formActions}>
          <Btn variant="secondary" onClick={() => navigate('/admin/sites')}>Annuler</Btn>
          <Btn variant="primary" type="submit" disabled={saving}>
            {saving ? 'Enregistrement…' : 'Enregistrer'}
          </Btn>
        </div>
      </form>
    </div>
  )
}
