# 📧 Configuration de l'envoi d'email

## ✅ Fonctionnalité implémentée

L'envoi d'email est maintenant configuré pour envoyer toutes les informations du formulaire de séminaire à **alexso.terrago@gmail.com** lorsque l'utilisateur clique sur "Finaliser le brief".

## 🔧 Comment ça fonctionne

Le système utilise **FormSubmit** (https://formsubmit.co/), un service gratuit qui permet d'envoyer des emails directement depuis le frontend sans configuration backend.

### Ce qui est envoyé dans l'email :

- **Informations client** : Prénom, Nom, Email, Entreprise
- **Détails du séminaire** : Nombre de participants, Période souhaitée
- **Formats d'expérience** : Formats sélectionnés (Producteur, Table Commune, etc.)
- **Produits à l'honneur** : Produits sélectionnés (Vins, Huile d'olive, etc.)
- **Logistique** : Hébergement, Transport, Types d'hébergement
- **Message complémentaire** : Message libre de l'utilisateur

## 📝 Première utilisation

Lors de la première soumission depuis votre domaine, FormSubmit enverra un email de vérification à **alexso.terrago@gmail.com**. Vous devrez :

1. Ouvrir l'email de vérification
2. Cliquer sur le lien de confirmation
3. Après confirmation, tous les futurs emails seront envoyés directement

## ⚠️ Alternative : EmailJS (plus professionnel)

Si vous préférez une solution plus professionnelle avec plus de contrôle, vous pouvez utiliser **EmailJS** :

1. Créez un compte sur https://www.emailjs.com/
2. Configurez un service email (Gmail, Outlook, etc.)
3. Créez un template d'email
4. Remplacez la fonction `handleSubmit` dans `pages/Seminaires.tsx` avec le code EmailJS

### Exemple avec EmailJS :

```typescript
import emailjs from '@emailjs/browser';

const handleSubmit = async () => {
  setIsSubmitting(true);
  
  const templateParams = {
    to_email: 'alexso.terrago@gmail.com',
    from_name: `${formData.prenom} ${formData.nom}`,
    from_email: formData.email,
    message: emailContent,
    // ... autres données
  };

  try {
    await emailjs.send(
      'YOUR_SERVICE_ID',
      'YOUR_TEMPLATE_ID',
      templateParams,
      'YOUR_PUBLIC_KEY'
    );
    setSubmitSuccess(true);
  } catch (error) {
    console.error('Erreur:', error);
  } finally {
    setIsSubmitting(false);
  }
};
```

## 🎯 Test

Pour tester l'envoi d'email :

1. Remplissez le formulaire de séminaire
2. Cliquez sur "Finaliser le brief"
3. Vérifiez votre boîte mail (alexso.terrago@gmail.com)
4. Vous devriez recevoir un email avec toutes les informations

## 📧 Format de l'email reçu

L'email sera formaté avec :
- Un sujet clair : "Nouvelle demande de séminaire - [Nom de l'entreprise]"
- Toutes les informations organisées par sections
- Un format lisible et professionnel

---

**Note** : FormSubmit est gratuit jusqu'à 50 soumissions par mois. Pour un usage plus intensif, considérez EmailJS ou un service backend personnalisé.

---

## 📋 Formulaire « Recommander un producteur »

### Notification par email (déjà en place)

Le formulaire envoie chaque recommandation à **alexso.terrago@gmail.com** via **FormSubmit** (même service que les séminaires). Vous recevez un email à chaque envoi, avec :

- Nom du producteur / exploitation
- Votre nom et email
- Contact du producteur
- Message (secteur, région, etc.)

Aucune configuration supplémentaire n’est nécessaire pour recevoir ces emails.

### Répertoire type Excel (optionnel : Formspree)

Pour avoir en plus **un tableau de toutes les recommandations** (consultable en ligne et exportable en CSV/Excel) :

1. Créez un compte sur **Formspree** : https://formspree.io/
2. Créez un nouveau formulaire (ex. « Recommandations producteurs »).
3. Récupérez l’**ID du formulaire** (ex. `xyzabcde` dans l’URL `https://formspree.io/f/xyzabcde`).
4. Dans le projet, créez ou éditez un fichier **`.env`** ou **`.env.local`** à la racine et ajoutez :
   ```env
   VITE_FORMSPREE_RECOMMEND_ID=xyzabcde
   ```
   (remplacez `xyzabcde` par votre vrai ID Formspree.)
5. Redémarrez le serveur de dev (`npm run dev`) puis rechargez la page.

Dès que `VITE_FORMSPREE_RECOMMEND_ID` est défini, les soumissions du formulaire « Recommander un producteur » passent par Formspree : vous recevez toujours l’email, et vous voyez toutes les recommandations dans le **tableau de bord Formspree**, avec export CSV/Excel possible.

Sans cette variable, le site continue d’utiliser FormSubmit : vous recevez uniquement les emails, sans tableau récapitulatif.
