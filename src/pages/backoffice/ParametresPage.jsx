// ParametresPage.jsx
import { useState } from 'react'
import { MOCK_SITES } from '../../services/mockData.js'
import { PageHeader, Select, Input, Btn } from '../../components/backoffice/AdminCommon.jsx'
import styles from './ParametresPage.module.css'

export default function ParametresPage() {
  const [siteId, setSiteId] = useState('primature')
  const [params, setParams] = useState({ intervalle: 60, debitMin: 10, latenceMax: 200, pushActif: true })
  const [saved, setSaved] = useState(false)

  const setP = (k, v) => setParams(p => ({ ...p, [k]: v }))

  const handleSave = async () => {
    await new Promise(r => setTimeout(r, 500))
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div>
      <PageHeader title="Paramètres de supervision" subtitle="Configuration des seuils d'alerte et intervalles par site" />

      {saved && <div style={{ background:'#dcfce7', border:'1px solid #86efac', borderRadius:6, padding:'10px 16px', color:'#15803d', fontWeight:600, fontSize:13, marginBottom:16 }}>✓ Paramètres enregistrés</div>}

      <div style={{ maxWidth: 320, marginBottom: 20 }}>
        <Select label="Site" value={siteId} onChange={e => setSiteId(e.target.value)}>
          {MOCK_SITES.map(s => <option key={s.id} value={s.id}>{s.nom}</option>)}
        </Select>
      </div>

      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Configuration — {MOCK_SITES.find(s=>s.id===siteId)?.nom}</h2>
        <div className={styles.grid}>
          <Input label="Intervalle d'actualisation (secondes)" type="number" min={10} value={params.intervalle} onChange={e => setP('intervalle', +e.target.value)} />
          <Input label="Débit minimal acceptable (Mbit/s)" type="number" min={1} value={params.debitMin} onChange={e => setP('debitMin', +e.target.value)} />
          <Input label="Latence maximale acceptable (ms)" type="number" min={1} value={params.latenceMax} onChange={e => setP('latenceMax', +e.target.value)} />
        </div>

        <div className={styles.toggleRow}>
          <span className={styles.toggleLabel}>Notifications push activées pour ce site</span>
          <button
            type="button"
            className={`${styles.toggle} ${params.pushActif ? styles.toggleOn : ''}`}
            onClick={() => setP('pushActif', !params.pushActif)}
            role="switch"
            aria-checked={params.pushActif}
          >
            <span className={styles.toggleKnob}></span>
          </button>
        </div>

        <div style={{ display:'flex', justifyContent:'flex-end', marginTop:20 }}>
          <Btn variant="primary" onClick={handleSave}>Enregistrer les paramètres</Btn>
        </div>
      </div>
    </div>
  )
}
