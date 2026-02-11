# 📁 Structure des Images - Terrago

Ce dossier contient toutes les images du site, organisées par catégorie pour faciliter la gestion.

## 📂 Structure des dossiers

```
/images/
├── card/              # Images pour les cartes d'expériences/séminaires
├── producteurs/       # Photos des producteurs et portraits
└── general/           # Images générales du site (logos, backgrounds, etc.)
```

## 🎴 Dossier `card/`

Images utilisées pour les cartes d'expériences et de séminaires :
- `cognac-autour.png`
- `fromage-autour.png`
- `noix-autour.png`
- `olive-autour.png`
- `truffe-autour.png`
- `vigne-ventoux.png`

**Utilisation dans le code :** `/images/card/nom-image.png`

## 👥 Dossier `producteurs/`

Photos des producteurs et portraits :
- `cognac-JF.png` - Photo de Jean-François (Cognac)
- `equipe-nature.png` - Photo d'équipe
- `noixsabinemarie.jpeg` - Photo de Sabine & Marie-Lise (Noix)
- `olives-paolo.png` - Photo de Paolo (Olives)

**Images manquantes à ajouter :**
- `vigneron-portrait.png` - Portrait vigneron
- `terroir-travail-terrain.png` - Photo terroir/travail

**Utilisation dans le code :** `/images/producteurs/nom-image.png`

## 🌐 Dossier `general/`

Images générales du site (à venir) :
- Logos
- Backgrounds
- Icônes générales

**Utilisation dans le code :** `/images/general/nom-image.png`

## 💡 Comment ajouter une nouvelle image

1. **Déterminez la catégorie** :
   - Image de carte → `/images/card/`
   - Photo de producteur → `/images/producteurs/`
   - Image générale → `/images/general/`

2. **Ajoutez l'image** dans le bon dossier

3. **Utilisez-la dans le code** avec le chemin complet :
   ```tsx
   <img src="/images/card/mon-image.png" alt="Description" />
   ```

## ✅ Avantages de cette organisation

- ✅ Facile de trouver les images
- ✅ Code plus lisible (`/images/card/` vs `/images/cognac-autour.png`)
- ✅ Meilleure organisation pour les mises à jour
- ✅ Structure claire pour les nouveaux développeurs
