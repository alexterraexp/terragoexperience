# 🚀 Guide de Déploiement Automatique - Terrago

Ce guide vous explique comment configurer le déploiement automatique de votre site Terrago sur Hostinger via GitHub.

## 📋 Prérequis

1. Un compte GitHub
2. Un compte Hostinger avec un hébergement web
3. Les identifiants FTP de votre compte Hostinger

---

## 🔧 Configuration GitHub

### Étape 1 : Créer le dépôt GitHub

1. Allez sur [GitHub.com](https://github.com) et créez un nouveau dépôt
2. Nommez-le (ex: `terrago-website`)
3. Ne cochez **PAS** "Initialize with README" (vous avez déjà des fichiers)
4. Cliquez sur "Create repository"

### Étape 2 : Initialiser Git dans votre projet

Ouvrez le terminal dans Cursor et exécutez :

```bash
cd "/Users/alex/Downloads/terroir-d'exception (1)"
git init
git add .
git commit -m "Initial commit - Terrago website"
git branch -M main
git remote add origin https://github.com/VOTRE_USERNAME/VOTRE_REPO.git
git push -u origin main
```

⚠️ **Remplacez** `VOTRE_USERNAME` et `VOTRE_REPO` par vos vraies valeurs.

### Étape 3 : Configurer les secrets GitHub

1. Allez sur votre dépôt GitHub
2. Cliquez sur **Settings** → **Secrets and variables** → **Actions**
3. Cliquez sur **New repository secret**
4. Ajoutez les 3 secrets suivants :

#### Secret 1 : `HOSTINGER_FTP_HOST`
- **Nom** : `HOSTINGER_FTP_HOST`
- **Valeur** : Votre adresse FTP (ex: `ftp.votresite.com` ou `files.000webhost.com`)
- Trouvez-la dans votre panneau Hostinger → **FTP** → **Détails du compte FTP**

#### Secret 2 : `HOSTINGER_FTP_USER`
- **Nom** : `HOSTINGER_FTP_USER`
- **Valeur** : Votre nom d'utilisateur FTP
- Trouvez-le dans votre panneau Hostinger → **FTP** → **Détails du compte FTP**

#### Secret 3 : `HOSTINGER_FTP_PASSWORD`
- **Nom** : `HOSTINGER_FTP_PASSWORD`
- **Valeur** : Votre mot de passe FTP
- Trouvez-le dans votre panneau Hostinger → **FTP** → **Détails du compte FTP**

---

## 🌐 Configuration Hostinger

### Étape 1 : Trouver vos identifiants FTP

1. Connectez-vous à votre [panneau Hostinger](https://hpanel.hostinger.com)
2. Allez dans **Fichiers** → **Gestionnaire de fichiers** ou **FTP**
3. Notez :
   - **Serveur FTP** (host)
   - **Nom d'utilisateur FTP**
   - **Mot de passe FTP**

### Étape 2 : Vérifier le répertoire de déploiement

Par défaut, le workflow déploie dans `/public_html/`. Si votre site est dans un sous-dossier, modifiez `server-dir` dans `.github/workflows/deploy.yml`.

---

## ✅ Test du déploiement automatique

Une fois configuré, chaque fois que vous :

1. **Faites un commit** dans Cursor
2. **Poussez vers GitHub** (`git push`)
3. **Le workflow GitHub Actions se déclenche automatiquement**
4. **Votre site est déployé sur Hostinger en quelques minutes**

### Déclencher manuellement un déploiement

1. Allez sur votre dépôt GitHub
2. Cliquez sur l'onglet **Actions**
3. Sélectionnez le workflow **Deploy to Hostinger**
4. Cliquez sur **Run workflow** → **Run workflow**

---

## 🔄 Workflow de développement

### Mise à jour quotidienne

1. **Modifiez votre code** dans Cursor
2. **Commitez les changements** :
   ```bash
   git add .
   git commit -m "Description de vos modifications"
   git push
   ```
3. **Attendez 2-3 minutes** - GitHub Actions déploie automatiquement
4. **Vérifiez votre site** - Les changements sont en ligne !

### Vérifier le statut du déploiement

1. Allez sur votre dépôt GitHub
2. Cliquez sur l'onglet **Actions**
3. Vous verrez l'historique de tous les déploiements
4. Cliquez sur un déploiement pour voir les logs détaillés

---

## 🛠️ Dépannage

### Le déploiement échoue

1. **Vérifiez les secrets GitHub** : Assurez-vous que les identifiants FTP sont corrects
2. **Vérifiez les logs** : Dans GitHub Actions, cliquez sur le workflow qui a échoué pour voir les erreurs
3. **Vérifiez le chemin** : Assurez-vous que `server-dir` dans le workflow correspond à votre structure Hostinger

### Le site ne se met pas à jour

1. **Videz le cache** : Videz le cache de votre navigateur (Cmd+Shift+R sur Mac)
2. **Vérifiez le déploiement** : Vérifiez que le workflow GitHub Actions s'est bien terminé
3. **Vérifiez les fichiers** : Connectez-vous en FTP pour vérifier que les fichiers sont bien uploadés

### Erreur "Connection refused" ou "Timeout"

- Vérifiez que votre adresse FTP est correcte
- Vérifiez que le port FTP (généralement 21) n'est pas bloqué
- Contactez le support Hostinger si le problème persiste

---

## 📝 Notes importantes

- ⚠️ **Ne commitez jamais** vos identifiants FTP dans le code
- ✅ **Utilisez toujours** les secrets GitHub pour les informations sensibles
- 🔒 Les secrets sont cryptés et sécurisés par GitHub
- 🚀 Le déploiement prend généralement 2-5 minutes

---

## 🆘 Besoin d'aide ?

Si vous rencontrez des problèmes :
1. Vérifiez les logs dans GitHub Actions
2. Consultez la [documentation GitHub Actions](https://docs.github.com/en/actions)
3. Contactez le support Hostinger pour les problèmes FTP

Bon déploiement ! 🎉
