<<<<<<< HEAD
# GéoPortail RESINA — Frontend

Interface de supervision simplifiée pour décideurs institutionnels (Ministre, SG, Directeurs) et Backoffice d'administration DEST/DIG, dans le cadre du réseau RESINA de l'ANPTIC (Burkina Faso).

## 🧱 Stack technique

- **React 18** + **Vite**
- **React Router v6** — routage
- **Axios** — communication HTTP
- **Leaflet / React-Leaflet** — cartographie interactive
- **CSS Modules** — styles isolés, design system basé sur variables CSS
- **date-fns** — formatage de dates

## 📂 Structure du projet

```
src/
├── components/
│   ├── common/          # LiveBadge, etc.
│   ├── decideur/         # StatutAnptic, StatutLan, SiteSelector, RefreshBar
│   └── backoffice/        # AdminCommon (Table, Btn, Modal, Toast, etc.)
├── pages/
│   ├── decideur/          # MonSitePage, CartePage, AlertesPage
│   └── backoffice/        # LoginPage, DashboardPage, SitesPage, etc.
├── layouts/
│   ├── DecideurLayout.jsx # Layout mobile-first avec navigation + site sélectionné
│   └── AdminLayout.jsx    # Layout desktop avec sidebar
├── contexts/
│   ├── AuthContext.jsx    # Authentification JWT backoffice
│   ├── SiteContext.jsx    # Site sélectionné + données ANPTIC/LAN + auto-refresh
│   └── AlerteContext.jsx  # Alertes + notifications push
├── routes/
│   └── ProtectedRoute.jsx # Garde de route pour le backoffice
├── services/
│   ├── api.js             # Instances Axios + tous les endpoints REST
│   └── mockData.js        # Données simulées (mode démo sans backend)
├── utils/
│   └── formatters.js      # Formatage dates, statuts, débits
├── App.jsx                # Déclaration des routes
├── main.jsx                # Point d'entrée
└── index.css                # Design system global (variables CSS)
```

## 🚀 Démarrage

```bash
npm install
npm run dev
```

L'application démarre sur `http://localhost:3000`.

- **Interface Décideur** : `http://localhost:3000/`
- **Backoffice** : `http://localhost:3000/admin/login`
  - Identifiants démo : `admin@anptic.bf` / `Admin@2026`

## 🔌 Mode Mock vs Backend réel

Par défaut, l'application fonctionne **en mode démo** avec des données simulées (`src/services/mockData.js`), ce qui permet de tester l'intégralité de l'interface sans backend.

Pour connecter le vrai backend Spring Boot :

1. Ouvrir `src/contexts/SiteContext.jsx`
2. Passer `const USE_MOCK = true` à `const USE_MOCK = false`
3. Configurer `VITE_API_URL` dans un fichier `.env` (voir `.env.example`)
4. Pour le Backoffice, modifier `src/contexts/AuthContext.jsx` afin de retirer le court-circuit de connexion démo

Le proxy Vite (`vite.config.js`) redirige déjà `/api/*` vers `http://localhost:8080` en développement.

## 🎨 Design System

Toutes les couleurs, espacements et typographies sont centralisés dans `src/index.css` sous forme de variables CSS (`--anptic-blue`, `--status-ok`, `--space-md`, etc.), conformément à la charte graphique ANPTIC définie dans le cahier des charges :

- Bleu institutionnel : `#0A3D7A`
- Statuts : Vert `#0D9B5A` / Orange `#C97C0A` / Rouge `#D93535`
- Police : Plus Jakarta Sans (texte), JetBrains Mono (valeurs numériques)

## 📱 Responsive

- **Interface Décideur** : mobile-first, breakpoints 320/375/390/414/768/1024px, zones tactiles ≥ 44×44px
- **Backoffice** : desktop-first avec sidebar fixe, adaptation tablette/mobile (sidebar masquée < 768px)

## 🗺️ Fonctionnalités couvertes (CDC v2 + Amendements 1 & 2)

| Module | Statut |
|---|---|
| Vue "Mon Site" (ANPTIC + LAN) | ✅ |
| Vue "Carte" (Leaflet, marqueurs colorés) | ✅ |
| Vue "Alertes" (notifications push, liste horodatée) | ✅ |
| Backoffice — Dashboard KPIs | ✅ |
| Backoffice — Gestion des sites (CRUD) | ✅ |
| Backoffice — Équipements LAN par étage | ✅ |
| Backoffice — Cartographie GPS | ✅ |
| Backoffice — Paramètres de supervision | ✅ |
| Backoffice — Notifications push | ✅ |
| Backoffice — Utilisateurs | ✅ |
| Backoffice — Journal d'activité | ✅ |
| Authentification JWT (login/logout/refresh) | ✅ |

## 📦 Build production

```bash
npm run build
```

Génère le dossier `dist/` prêt à déployer sur Nginx ou Apache.

---

**ANPTIC — Ministère de la Transition Digitale, des Postes et des Communications Électroniques — Burkina Faso**
=======
# GeoPortail
>>>>>>> 24e39c88a7914fc8458c52d49f7038152324db2a
