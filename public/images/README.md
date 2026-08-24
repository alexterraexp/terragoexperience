# Structure des Images - TerraGo

Ce dossier contient les images locales du site, organisées par catégorie.

## Structure des dossiers

```
/images/
├── card/              # Images pour les cartes d'expériences/séminaires
├── producteurs/       # Photos des producteurs et portraits
└── general/           # Images générales du site
```

## Dossier `card/`

Images pour les cartes d'expériences et de séminaires.

**Utilisation dans le code :** `/images/card/nom-image.png`

## Dossier `producteurs/`

Photos des producteurs et portraits :
- `cognacJF.png` - Photo de Jean-François (Cognac)

**Utilisation dans le code :** `/images/producteurs/nom-image.png`

## Dossier `general/`

Images générales du site (backgrounds, etc.).

**Utilisation dans le code :** `/images/general/nom-image.png`

## Comment ajouter une nouvelle image

1. Déterminez la catégorie (`card/`, `producteurs/`, ou `general/`)
2. Ajoutez l'image dans le bon dossier
3. Utilisez-la avec le chemin complet :
   ```tsx
   <img src="/images/card/mon-image.png" alt="Description" />
   ```
