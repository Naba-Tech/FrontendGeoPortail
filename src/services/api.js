import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL || '/api/v1'

// ── Instance publique (Interface Décideur) ──
export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
})

// ── Instance admin (Backoffice JWT) ──
export const adminApi = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
})

// Intercepteur : ajout du token JWT
adminApi.interceptors.request.use(config => {
  const token = localStorage.getItem('access_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Intercepteur : refresh token automatique
adminApi.interceptors.response.use(
  res => res,
  async err => {
    const original = err.config
    if (err.response?.status === 401 && !original._retry) {
      original._retry = true
      try {
        const refresh = localStorage.getItem('refresh_token')
        const { data } = await axios.post(`${BASE_URL}/auth/refresh`, { refreshToken: refresh })
        localStorage.setItem('access_token', data.accessToken)
        original.headers.Authorization = `Bearer ${data.accessToken}`
        return adminApi(original)
      } catch {
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        window.location.href = '/admin/login'
      }
    }
    return Promise.reject(err)
  }
)

// ════════════════════════════════════════════
//  ENDPOINTS — Interface Décideur
// ════════════════════════════════════════════

export const sitesApi = {
  getAll: ()           => api.get('/sites'),
  getAnptic: (id)      => api.get(`/sites/${id}/anptic`),
  getLan: (id)         => api.get(`/sites/${id}/lan`),
  getAlertes: (id)     => api.get(`/sites/${id}/alertes`),
  subscribePush: (data)=> api.post('/push/subscribe', data),
}

// ════════════════════════════════════════════
//  ENDPOINTS — Backoffice Admin
// ════════════════════════════════════════════

export const authApi = {
  login:   (creds) => adminApi.post('/auth/login', creds),
  logout:  ()      => adminApi.post('/auth/logout'),
  refresh: (token) => adminApi.post('/auth/refresh', { refreshToken: token }),
}

export const adminSitesApi = {
  getAll:    (params) => adminApi.get('/admin/sites', { params }),
  getById:   (id)     => adminApi.get(`/admin/sites/${id}`),
  create:    (data)   => adminApi.post('/admin/sites', data),
  update:    (id, d)  => adminApi.put(`/admin/sites/${id}`, d),
  delete:    (id)     => adminApi.delete(`/admin/sites/${id}`),
  dashboard: ()       => adminApi.get('/admin/dashboard'),
}

export const adminEquipementsApi = {
  getBySite:  (siteId)      => adminApi.get(`/admin/sites/${siteId}/equipements`),
  create:     (data)        => adminApi.post('/admin/equipements', data),
  update:     (id, data)    => adminApi.put(`/admin/equipements/${id}`, data),
  delete:     (id)          => adminApi.delete(`/admin/equipements/${id}`),
}

export const adminCartoApi = {
  getAll:  ()           => adminApi.get('/admin/cartographie'),
  update:  (id, data)   => adminApi.put(`/admin/cartographie/${id}`, data),
  exportGeoJson: ()     => adminApi.get('/admin/cartographie/export'),
}

export const adminParamsApi = {
  getBySite: (id)       => adminApi.get(`/admin/sites/${id}/parametres`),
  update:    (id, data) => adminApi.put(`/admin/sites/${id}/parametres`, data),
}

export const adminPushApi = {
  getTokens:      ()       => adminApi.get('/admin/push/tokens'),
  deleteToken:    (id)     => adminApi.delete(`/admin/push/tokens/${id}`),
  getActivations: ()       => adminApi.get('/admin/push/activations'),
  updateActivation:(id, d) => adminApi.put(`/admin/push/activations/${id}`, d),
}

export const adminUsersApi = {
  getAll:  ()           => adminApi.get('/admin/utilisateurs'),
  getById: (id)         => adminApi.get(`/admin/utilisateurs/${id}`),
  create:  (data)       => adminApi.post('/admin/utilisateurs', data),
  update:  (id, data)   => adminApi.put(`/admin/utilisateurs/${id}`, data),
  delete:  (id)         => adminApi.delete(`/admin/utilisateurs/${id}`),
  resetPwd:(id)         => adminApi.post(`/admin/utilisateurs/${id}/reset-password`),
}

export const adminAuditApi = {
  getAll: (params) => adminApi.get('/admin/audit-log', { params }),
}
