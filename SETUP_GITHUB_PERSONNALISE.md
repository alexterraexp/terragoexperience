# 🚀 Configuration GitHub - Terrago Experience

Guide personnalisé pour votre dépôt : **alexterraexp/terragoexperience**

---

## ⚡ Configuration rapide (5 minutes)

### Étape 1 : Initialiser Git et connecter au dépôt GitHub

Ouvrez le terminal dans Cursor et exécutez ces commandes **une par une** :

```bash
# Aller dans le dossier du projet
cd "/Users/alex/Downloads/terroir-d'exception (1)"

# Initialiser Git
git init

# Ajouter tous les fichiers
git add .

# Premier commit
git commit -m "Initial commit - Terrago website"

# Renommer la branche en main
git branch -M main

# Connecter au dépôt GitHub
git remote add origin https://github.com/alexterraexp/terragoexperience.git

# Pousser vers GitHub
git push -u origin main
```

⚠️ **Note** : Si vous êtes demandé de vous authentifier :
- Utilisez un **Personal Access Token** (pas votre mot de passe)
- Créez-en un ici : https://github.com/settings/tokens
- Sélectionnez les permissions : `repo` (accès complet aux dépôts)

---

## 🔐 Configuration des secrets GitHub

Une fois le code poussé sur GitHub :

1. Allez sur : https://github.com/alexterraexp/terragoexperience
2. Cliquez sur **Settings** (en haut à droite)
3. Dans le menu de gauche : **Secrets and variables** → **Actions**
4. Cliquez sur **New repository secret**

Ajoutez ces 3 secrets :

### Secret 1 : HOSTINGER_FTP_HOST
- **Name** : `HOSTINGER_FTP_HOST`
- **Secret** : Votre adresse FTP Hostinger (ex: `ftp.votresite.com`)

### Secret 2 : HOSTINGER_FTP_USER
- **Name** : `HOSTINGER_FTP_USER`
- **Secret** : Votre nom d'utilisateur FTP

### Secret 3 : HOSTINGER_FTP_PASSWORD
- **Name** : `HOSTINGER_FTP_PASSWORD`
- **Secret** : Votre mot de passe FTP

---

## ✅ Tester le déploiement automatique

1. Faites une petite modification dans votre code (ex: dans `Home.tsx`)
2. Dans le terminal :
   ```bash
   git add .
   git commit -m "Test déploiement automatique"
   git push
   ```
3. Allez sur : https://github.com/alexterraexp/terragoexperience/actions
4. Vous devriez voir le workflow "Deploy to Hostinger" en cours
5. Attendez 2-3 minutes
6. Vérifiez votre site Hostinger - les changements devraient être en ligne !

---

## 🔄 Workflow quotidien

À chaque fois que vous modifiez votre code dans Cursor :

```bash
git add .
git commit -m "Description de vos modifications"
git push
```

Le site sera automatiquement déployé sur Hostinger en 2-3 minutes ! 🎉

---

## 🆘 Problèmes courants

### "Authentication failed" lors du push
➡️ Utilisez un Personal Access Token au lieu de votre mot de passe GitHub

### "Repository not found"
➡️ Vérifiez que vous avez bien les droits sur le dépôt `alexterraexp/terragoexperience`

### Le déploiement échoue
➡️ Vérifiez que les 3 secrets GitHub sont corrects dans Settings → Secrets → Actions

---

## 📚 Liens utiles

- **Dépôt GitHub** : https://github.com/alexterraexp/terragoexperience
- **Actions GitHub** : https://github.com/alexterraexp/terragoexperience/actions
- **Settings** : https://github.com/alexterraexp/terragoexperience/settings
- **Secrets** : https://github.com/alexterraexp/terragoexperience/settings/secrets/actions
