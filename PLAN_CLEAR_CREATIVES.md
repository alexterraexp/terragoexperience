# Plan : Ajouter la logique d'effacement des créatifs

## Problème

Après avoir supprimé le flag `clear_creatives`, il n'y a plus de moyen d'effacer les créatifs.

**Logique précédente (supprimée) :**
```python
if clear_creatives:
    creative_ref = {}
```

**Problème actuel :**
- `creatives: null` → Bloc ignoré (`if creatives is not None:` est False)
- `creatives: {}` → Dict vide, aucune catégorie traitée  
- `creatives: {"logo": [], "image": [], "video": []}` → Tableaux vides mais `any(creative_ref_by_type.values())` est False → mise à jour ignorée

## Solution

Ajouter la logique pour détecter ces cas et effacer les créatifs :

### Dans la fonction qui traite `creatives` (probablement `update_offer_branch` ou similaire)

```python
# Update creatives section (creative_ref)
if creatives is None:
    # Explicitement null - effacer tout creative_ref
    branch_update_data["creative_ref"] = {}
elif creatives == {}:
    # Dict vide - effacer tout creative_ref
    branch_update_data["creative_ref"] = {}
elif creatives is not None:
    # Traiter les créatifs catégorisés directement (logo, image, video)
    creative_ref_by_type = {"logo": [], "image": [], "video": []}
    explicitly_provided_categories = set()  # Suivre les catégories explicitement fournies
    
    # Traiter chaque catégorie séparément
    for category in ["logo", "image", "video"]:
        category_creatives = creatives.get(category)
        if category_creatives is not None:
            explicitly_provided_categories.add(category)
            
            # Si tableau vide, marquer pour effacement
            if len(category_creatives) == 0:
                creative_ref_by_type[category] = []
                continue  # Passer au traitement, mais catégorie marquée comme fournie
            
            # Traiter les tableaux non vides (logique de validation existante)
            # ... code de validation et traitement existant ...
    
    # Mettre à jour creative_ref - gérer les catégories vides et non vides
    if explicitly_provided_categories:
        # Commencer avec creative_ref existant (préserver les types non mis à jour)
        if "creative_ref" not in branch_update_data:
            branch_update_data["creative_ref"] = {}
        
        new_creative_ref = branch_update_data.get("creative_ref", {}).copy()
        if not new_creative_ref:
            new_creative_ref = {}
        
        # Effacer ou mettre à jour les catégories explicitement fournies
        for category in explicitly_provided_categories:
            # REMPLACER par le tableau fourni (vide ou avec éléments)
            new_creative_ref[category] = creative_ref_by_type[category]
        
        # Les types NON dans la requête sont préservés automatiquement
        branch_update_data["creative_ref"] = new_creative_ref
```

## Résultat attendu

- `creatives: null` → Efface tout `creative_ref`
- `creatives: {}` → Efface tout `creative_ref`
- `creatives: {"logo": [], "image": [], "video": []}` → Efface ces catégories
- `creatives: {"logo": [...], "image": []}` → Met à jour logo, efface image, préserve video
- Les fichiers fournis via `files` seront fusionnés/ajoutés après l'effacement
