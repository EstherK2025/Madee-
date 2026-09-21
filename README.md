# Madee — Boutique en ligne

Site e-commerce de **Madee**, maison de mode modeste et interculturelle qui
habille la femme noire pour qu'elle s'affirme et se sente pleinement
elle-même.

Construit avec **Next.js (App Router)** + **TypeScript**, paiement
**Stripe** & **PayPal**, prêt à déployer sur **Vercel**.

> 💡 **Le site fonctionne immédiatement, sans aucune clé.** Tant que les clés
> de paiement ne sont pas renseignées, le tunnel d'achat tourne en **mode
> démonstration** (aucun débit réel). Vous branchez les vraies clés quand vous
> voulez, sans toucher au code.

---

## 1. Lancer en local

```bash
npm install
cp .env.example .env.local   # (optionnel) pour configurer les paiements
npm run dev                  # http://localhost:3000
```

## 2. Mettre en ligne sur Vercel

1. Poussez ce dépôt sur GitHub (déjà fait si vous lisez ceci sur GitHub).
2. Allez sur [vercel.com](https://vercel.com) → **Add New… → Project**.
3. Importez le dépôt **`madee`**. Vercel détecte Next.js automatiquement —
   laissez tous les réglages par défaut et cliquez **Deploy**.
4. En quelques minutes, votre boutique est en ligne 🎉

Aucune configuration n'est nécessaire pour un premier déploiement (mode démo).

## 3. Activer les vrais paiements

Dans Vercel : **Settings → Environment Variables**, ajoutez les clés voulues,
puis **redeploy**. (Les mêmes clés vont dans `.env.local` pour le local.)

### Stripe — cartes bancaires, Apple/Google Pay
1. Créez un compte sur [stripe.com](https://stripe.com).
2. Dans [Développeurs → Clés API](https://dashboard.stripe.com/apikeys),
   copiez :
   - `STRIPE_SECRET_KEY` (commence par `sk_test_…` puis `sk_live_…`)
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` (commence par `pk_test_…`)
3. Utilisez d'abord les clés **test** (carte de test `4242 4242 4242 4242`),
   puis les clés **live** pour encaisser réellement.

### PayPal
1. Créez une app sur
   [developer.paypal.com](https://developer.paypal.com/dashboard/applications).
2. Copiez le **Client ID** et le **Secret**, puis renseignez :
   - `NEXT_PUBLIC_PAYPAL_CLIENT_ID`
   - `PAYPAL_CLIENT_SECRET`
   - `PAYPAL_ENV` = `sandbox` (test) ou `live` (production)

### Autres variables
- `NEXT_PUBLIC_SITE_URL` : l'URL de votre site en production
  (ex. `https://madee.vercel.app` ou votre domaine). Sert aux redirections
  après paiement.

Voir **`.env.example`** pour la liste complète et commentée.

---

## Gérer la boutique

### Ajouter / modifier des produits
Tout se passe dans **`lib/products.ts`**. Chaque produit a un nom, un prix
(en **centimes** : `18900` = 189,00 €), une catégorie, des tailles, une
description, etc.

### Mettre de vraies photos
1. Placez vos images dans le dossier **`public/`**
   (ex. `public/produits/abaya-nour.jpg`).
2. Dans `lib/products.ts`, ajoutez le champ `image` au produit :
   `image: "/produits/abaya-nour.jpg"`.
   La vignette dégradée est alors remplacée par votre photo.

---

## Structure

```
app/
  page.tsx                 Accueil (hero, maison, valeurs, sélection, manifeste)
  boutique/                Toute la collection
  produit/[slug]/          Fiche produit + ajout au panier
  panier/                  Panier + paiement (Stripe / PayPal)
  commande/succes|annulee  Confirmation de commande
  a-propos/                La Maison / manifeste / contact
  api/
    checkout/              Stripe Checkout (serveur)
    paypal/create|capture  Commande PayPal (serveur)
  components/              En-tête, pied de page, cartes, panier, paiement…
lib/
  products.ts              Le catalogue (à personnaliser)
  cart-context.tsx         Panier (React + localStorage)
  paypal.ts / format.ts    Utilitaires
public/                    Logos + vos photos produit
```

## Sécurité des paiements
Les prix sont **toujours recalculés côté serveur** à partir du catalogue :
un client ne peut pas modifier un prix depuis son navigateur. Les coordonnées
bancaires ne transitent jamais par le serveur Madee (Stripe et PayPal gèrent
la saisie sécurisée).
