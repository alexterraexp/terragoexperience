# 🚀 Guide de Démarrage - Terrago

Ce guide vous explique comment lancer votre site web pour la première fois dans Cursor.

## 📋 Prérequis

Avant de commencer, vous devez avoir installé **Node.js** sur votre Mac.

### Vérifier si Node.js est installé

1. Ouvrez le **Terminal** dans Cursor :
   - Menu : `Terminal` → `New Terminal`
   - Ou raccourci clavier : `Cmd + ù` (ou `Ctrl + ù`)

2. Tapez cette commande :
   ```bash
   node --version
   ```

3. Si vous voyez un numéro de version (ex: `v20.10.0`), c'est bon ! ✅
   Si vous voyez `command not found`, il faut installer Node.js.

### Installer Node.js (si nécessaire)

1. **Option 1 - Via le site officiel (recommandé)** :
   - Allez sur https://nodejs.org/
   - Téléchargez la version **LTS** (Long Term Support)
   - Installez le fichier `.pkg` téléchargé
   - Suivez les instructions d'installation

2. **Option 2 - Via Homebrew** (si vous avez Homebrew installé) :
   ```bash
   brew install node
   ```

3. Après l'installation, **fermez et rouvrez** le terminal dans Cursor.

---

## 🎯 Étapes pour lancer le site

### Étape 1 : Ouvrir le terminal dans Cursor

- Menu : `Terminal` → `New Terminal`
- Ou raccourci : `Cmd + ù` (Mac) ou `Ctrl + ù` (Windows/Linux)

### Étape 2 : Aller dans le dossier du projet

Le terminal devrait déjà être dans le bon dossier. Sinon, tapez :

```bash
cd "/Users/alex/Downloads/terroir-d'exception (1)"
```

### Étape 3 : Installer les dépendances

C'est la première fois que vous lancez le projet, il faut installer les bibliothèques nécessaires :

```bash
npm install
```

⏱️ **Cela peut prendre 1-2 minutes** la première fois. Vous verrez des messages de téléchargement.

### Étape 4 : Lancer le serveur de développement

Une fois l'installation terminée, lancez le serveur :

```bash
npm run dev
```

### Étape 5 : Ouvrir le site dans votre navigateur

Après avoir tapé `npm run dev`, vous verrez quelque chose comme :

```
  VITE v6.2.0  ready in 500 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

1. **Cliquez sur le lien** `http://localhost:3000/` dans le terminal
2. Ou **copiez-collez** cette adresse dans votre navigateur (Chrome, Safari, Firefox...)

🎉 **Votre site est maintenant en ligne !**

---

## 🛠️ Commandes utiles

### Arrêter le serveur

Dans le terminal où tourne `npm run dev`, appuyez sur :
- `Ctrl + C` (Mac/Linux)
- `Cmd + C` (Mac)

### Relancer le serveur

```bash
npm run dev
```

### Construire le site pour la production

```bash
npm run build
```

### Prévisualiser la version de production

```bash
npm run preview
```

---

## ❓ Problèmes courants

### "command not found: node"

➡️ Node.js n'est pas installé. Suivez les instructions dans la section "Prérequis" ci-dessus.

### "npm: command not found"

➡️ Node.js n'est pas correctement installé. Réinstallez Node.js et redémarrez le terminal.

### "Port 3000 already in use"

➡️ Un autre programme utilise déjà le port 3000. Vous pouvez :
- Arrêter l'autre programme
- Ou modifier le port dans `vite.config.ts`

### Le site ne se charge pas

➡️ Vérifiez que :
1. Le terminal affiche "ready" (pas d'erreur)
2. Vous utilisez bien l'adresse `http://localhost:3000/`
3. Aucun pare-feu ne bloque la connexion

---

## 📝 Notes importantes

- **Ne fermez pas le terminal** pendant que le serveur tourne
- **Les modifications** que vous faites dans les fichiers sont **automatiquement rechargées** dans le navigateur
- Le site tourne **uniquement sur votre ordinateur** (localhost)

---

## 🆘 Besoin d'aide ?

Si vous rencontrez un problème, vérifiez :
1. Que Node.js est bien installé (`node --version`)
2. Que vous êtes dans le bon dossier
3. Que toutes les dépendances sont installées (`npm install`)

Bon développement ! 🚀
