// ═══ Formatage des dates ═══
export function formatDate(iso) {
  if (!iso) return '—'
  const d = new Date(iso)
  return d.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })
    + ' — ' + d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
}

export function formatDateCourt(iso) {
  if (!iso) return '—'
  const d = new Date(iso)
  return d.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })
    + ' — ' + d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
}

export function formatRelative(iso) {
  if (!iso) return ''
  const diff = Date.now() - new Date(iso).getTime()
  const minutes = Math.floor(diff / 60000)
  if (minutes < 1)  return 'À l\'instant'
  if (minutes < 60) return `Il y a ${minutes}min`
  const hours = Math.floor(minutes / 60)
  if (hours < 24)   return `Il y a ${hours}h`
  const days = Math.floor(hours / 24)
  return `Il y a ${days}j`
}

// ═══ Statuts ═══
export function getStatutAnpticLabel(statut) {
  switch (statut) {
    case 'OK':   return '✓ ACTIF'
    case 'WARN': return '⚠ DÉGRADÉ'
    case 'KO':   return '✕ INDISPONIBLE'
    default:     return '— INCONNU'
  }
}

export function getStatutLanLabel(statut) {
  switch (statut) {
    case 'OK':      return '✓ NORMAL'
    case 'ALERTE':  return '⚠ ALERTE'
    case 'INCIDENT':return '✕ INCIDENT'
    default:        return '— INCONNU'
  }
}

export function getStatutColor(statut) {
  switch (statut) {
    case 'OK':   case 'RETABLISSEMENT': return 'ok'
    case 'WARN': case 'ALERTE': case 'WARN_ANPTIC': return 'warn'
    case 'KO':   case 'INCIDENT': case 'PANNE_ANPTIC': case 'PANNE_LAN': return 'ko'
    default: return 'neutral'
  }
}

export function getQualiteLabel(q) {
  if (!q) return '—'
  return q
}

// ═══ Formatage débit ═══
export function formatDebit(val) {
  if (val === null || val === undefined) return '—'
  return val % 1 === 0 ? `${val}` : val.toFixed(1)
}

// ═══ Couleur marqueur carte ═══
export function getMapMarkerColor(anpticStatut) {
  switch (anpticStatut) {
    case 'OK':   return '#0D9B5A'
    case 'WARN': return '#C97C0A'
    case 'KO':   return '#D93535'
    default:     return '#94a3b8'
  }
}
