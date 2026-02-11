# 👀 Comment voir un aperçu de votre site

## Option 1 : Build statique (recommandé pour un aperçu)

Cette méthode crée une version statique de votre site que vous pouvez ouvrir directement.

### Étapes :

1. **Ouvrez le terminal** dans Cursor (`Terminal` → `New Terminal`)

2. **Installez les dépendances** (une seule fois) :
   ```bash
   npm install
   ```

3. **Créez la version statique** :
   ```bash
   npm run build
   ```
   ⏱️ Cela prend environ 30 secondes à 1 minute.

4. **Prévisualisez la version build** :
   ```bash
   npm run preview
   ```

5. **Ouvrez votre navigateur** sur l'adresse affichée (généralement `http://localhost:4173/`)

✅ **Avantage** : Vous avez une version finale, comme si le site était en ligne.

---

## Option 2 : Mode développement (pour voir les changements en temps réel)

Si vous voulez voir le site ET pouvoir modifier les fichiers pour voir les changements instantanément :

1. **Ouvrez le terminal** dans Cursor

2. **Installez les dépendances** (une seule fois) :
   ```bash
   npm install
   ```

3. **Lancez le serveur de développement** :
   ```bash
   npm run dev
   ```

4. **Ouvrez votre navigateur** sur l'adresse affichée (généralement `http://localhost:3000/`)

✅ **Avantage** : Toute modification dans les fichiers se reflète automatiquement dans le navigateur.

---

## 📁 Où sont les fichiers générés ?

Après `npm run build`, les fichiers statiques sont dans le dossier `dist/`.

Vous pouvez :
- Ouvrir `dist/index.html` directement dans votre navigateur (mais certaines fonctionnalités peuvent ne pas marcher)
- Utiliser `npm run preview` pour un meilleur résultat

---

## 🎯 Quelle option choisir ?

- **Pour juste voir le site** → Option 1 (`npm run build` puis `npm run preview`)
- **Pour développer et voir les changements** → Option 2 (`npm run dev`)

Les deux options vous permettent de voir votre site dans le navigateur ! 🌐
