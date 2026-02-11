# 🌾 Terrago - L'immersion au cœur du terroir français

Site web de Terrago, plateforme d'expériences authentiques dans les terroirs français.

## 🚀 Démarrage rapide

### Prérequis

- Node.js (version 20 ou supérieure)
- npm ou yarn

### Installation

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

Le site sera accessible sur `http://localhost:3000`

### Build pour la production

```bash
# Créer la version de production
npm run build

# Prévisualiser la version de production
npm run preview
```

## 📦 Scripts disponibles

- `npm run dev` - Lance le serveur de développement
- `npm run build` - Crée la version optimisée pour la production
- `npm run preview` - Prévisualise la version de production

## 🌐 Déploiement

Ce projet est configuré pour un déploiement automatique sur Hostinger via GitHub Actions.

Voir le guide complet dans [DEPLOY.md](./DEPLOY.md)

### Déploiement automatique

Chaque push sur la branche `main` déclenche automatiquement un déploiement sur Hostinger.

## 📁 Structure du projet

```
├── components/          # Composants React réutilisables
├── pages/               # Pages de l'application
├── public/              # Fichiers statiques (images, etc.)
├── .github/workflows/   # Configuration GitHub Actions
└── dist/                # Fichiers générés (après build)
```

## 🛠️ Technologies utilisées

- React 19
- TypeScript
- Vite
- React Router
- Tailwind CSS

## 📝 Documentation

- [Guide de démarrage](./GUIDE_DEMARRAGE.md)
- [Guide de déploiement](./DEPLOY.md)
- [Configuration email](./EMAIL_SETUP.md)

## 📄 Licence

Propriétaire - Terrago
