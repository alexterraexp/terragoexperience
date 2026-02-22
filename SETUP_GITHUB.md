# ⚡ Configuration rapide GitHub + Déploiement automatique

Guide étape par étape pour mettre en place le déploiement automatique en 10 minutes.

## 🎯 Objectif

À chaque fois que vous faites `git push` depuis Cursor, votre site sera automatiquement déployé sur Hostinger.

---

## 📝 Étapes à suivre
 
### 1️⃣ Créer le dépôt GitHub (2 min)

1. Allez sur [github.com/new](https://github.com/new)
2. Nommez votre dépôt (ex: `terrago-website`)
3. **Ne cochez PAS** "Initialize with README"
4. Cliquez sur **Create repository**

### 2️⃣ Initialiser Git dans votre projet (1 min)

Ouvrez le terminal dans Cursor et exécutez :

```bash
cd "/Users/alex/Downloads/terroir-d'exception (1)"

# Initialiser Git
git init

# Ajouter tous les fichiers
git add .

# Premier commit
git commit -m "Initial commit - Terrago website"

# Renommer la branche en main
git branch -M main

# Ajouter le dépôt distant (remplacez par votre URL)
git remote add origin https://github.com/alexterraexp/terragoexperience.git

# Pousser vers GitHub
git push -u origin main
```

⚠️ **Important** : Remplacez `VOTRE_USERNAME` et `VOTRE_REPO` par vos vraies valeurs GitHub.

### 3️⃣ Configurer les secrets GitHub (3 min)

1. Allez sur votre dépôt GitHub (ex: `https://github.com/VOTRE_USERNAME/VOTRE_REPO`)
2. Cliquez sur **Settings** (en haut à droite)
3. Dans le menu de gauche, cliquez sur **Secrets and variables** → **Actions**
4. Cliquez sur **New repository secret**

Ajoutez ces 3 secrets un par un :

#### Secret 1 : HOSTINGER_FTP_HOST
- **Name** : `HOSTINGER_FTP_HOST`
- **Secret** : Votre adresse FTP (ex: `ftp.votresite.com`)
- Trouvez-la dans Hostinger → **Fichiers** → **FTP**

#### Secret 2 : HOSTINGER_FTP_USER
- **Name** : `HOSTINGER_FTP_USER`
- **Secret** : Votre nom d'utilisateur FTP

#### Secret 3 : HOSTINGER_FTP_PASSWORD
- **Name** : `HOSTINGER_FTP_PASSWORD`
- **Secret** : Votre mot de passe FTP

### 4️⃣ Trouver vos identifiants Hostinger (2 min)

1. Connectez-vous à [hpanel.hostinger.com](https://hpanel.hostinger.com)
2. Allez dans **Fichiers** → **Gestionnaire de fichiers**
3. Ou allez dans **Fichiers** → **FTP**
4. Notez :
   - Serveur FTP (host)
   - Nom d'utilisateur FTP
   - Mot de passe FTP

### 5️⃣ Tester le déploiement (2 min)

1. Faites une petite modification dans votre code (ex: dans `Home.tsx`)
2. Dans le terminal de Cursor :
   ```bash
   git add .
   git commit -m "Test déploiement automatique"
   git push
   ```
3. Allez sur GitHub → **Actions**
4. Vous devriez voir le workflow "Deploy to Hostinger" en cours
5. Attendez 2-3 minutes
6. Vérifiez votre site Hostinger - les changements devraient être en ligne !

---

## ✅ C'est fait !

Maintenant, chaque fois que vous :
1. Modifiez votre code dans Cursor
2. Faites `git add .`, `git commit -m "..."`, `git push`
3. Le site se déploie automatiquement sur Hostinger en 2-3 minutes

---

## 🆘 Problèmes courants

### "Repository not found"
➡️ Vérifiez que l'URL du dépôt distant est correcte dans `git remote -v`

### "Permission denied"
➡️ Vous devez vous authentifier avec GitHub. Utilisez un token d'accès personnel ou SSH.

### Le déploiement échoue
➡️ Vérifiez que les 3 secrets GitHub sont corrects (host, user, password)

### Le site ne se met pas à jour
➡️ Videz le cache de votre navigateur (Cmd+Shift+R)

---

## 📚 Documentation complète

Pour plus de détails, consultez [DEPLOY.md](./DEPLOY.md)
