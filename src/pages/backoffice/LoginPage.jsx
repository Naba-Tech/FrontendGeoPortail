import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext.jsx'
import styles from './LoginPage.module.css'

export default function LoginPage() {
  const { login, loading, error } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPwd, setShowPwd] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await login(form.email, form.password)
    if (result.success) navigate('/admin/dashboard')
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        {/* Logo */}
        <div className={styles.logoArea}>
          <svg width="48" height="48" viewBox="0 0 28 28" fill="none" aria-hidden="true">
            <rect width="28" height="28" rx="6" fill="#0A3D7A"/>
            <path d="M14 4L24 9V19L14 24L4 19V9L14 4Z" stroke="#FCD116" strokeWidth="1.5" fill="none"/>
            <circle cx="14" cy="14" r="4" fill="#FCD116"/>
          </svg>
          <h1 className={styles.title}>GéoPortail RESINA</h1>
          <p className={styles.subtitle}>Backoffice DEST/DIG — Accès réservé</p>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          {error && (
            <div className={styles.errorBox} role="alert">
              <span aria-hidden="true">⚠</span> {error}
            </div>
          )}

          <div className={styles.field}>
            <label htmlFor="email" className={styles.label}>Adresse e-mail</label>
            <input
              id="email"
              type="email"
              className={styles.input}
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              placeholder="votre.email@anptic.bf"
              required
              autoComplete="email"
              autoFocus
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="password" className={styles.label}>Mot de passe</label>
            <div className={styles.pwdWrapper}>
              <input
                id="password"
                type={showPwd ? 'text' : 'password'}
                className={styles.input}
                value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                placeholder="••••••••"
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                className={styles.showPwd}
                onClick={() => setShowPwd(s => !s)}
                aria-label={showPwd ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
              >
                {showPwd ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          <button type="submit" className={styles.btnSubmit} disabled={loading || !form.email || !form.password}>
            {loading ? <span className={styles.spinner}></span> : null}
            {loading ? 'Connexion…' : 'Se connecter'}
          </button>
        </form>

        {/* Indice démo */}
        <div className={styles.demoHint}>
          <strong>Démo :</strong> admin@anptic.bf / Admin@2026
        </div>

        <p className={styles.restriction}>
          🔒 Accès réservé au réseau interne ANPTIC
        </p>
      </div>
    </div>
  )
}
