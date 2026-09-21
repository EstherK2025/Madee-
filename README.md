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

### Stripe — webhook (e-mail de confirmation après paiement carte)
Pour que la cliente reçoive son e-mail après un paiement **carte**, créez un
webhook Stripe :
1. [Développeurs → Webhooks](https://dashboard.stripe.com/webhooks) → **Add
   endpoint**.
2. URL : `https://VOTRE-SITE/api/webhooks/stripe`
3. Événement à écouter : **`checkout.session.completed`**.
4. Copiez le **Signing secret** (`whsec_…`) dans `STRIPE_WEBHOOK_SECRET`.

(PayPal n'a pas besoin de webhook : l'e-mail part automatiquement après le
paiement.)

### Autres variables
- `NEXT_PUBLIC_SITE_URL` : l'URL de votre site en production
  (ex. `https://madee.vercel.app` ou votre domaine). Sert aux redirections
  après paiement et aux liens dans les e-mails.

Voir **`.env.example`** pour la liste complète et commentée.

---

## 4. E-mails & numéro de suivi (Resend)

La boutique envoie 3 e-mails, aux couleurs Madee :

| Quand | À qui | Contenu |
|-------|-------|---------|
| Paiement confirmé | **Cliente** | Confirmation de commande |
| Paiement confirmé | **Vous** (`SHOP_EMAIL`) | Nouvelle commande + bouton « Envoyer le suivi » |
| Vous envoyez le suivi | **Cliente** | Colis expédié + numéro et lien de suivi |

### Activer les e-mails (gratuit)
1. Créez un compte sur [resend.com](https://resend.com) (offre gratuite :
   3 000 e-mails/mois).
2. **Clé API** : [API Keys](https://resend.com/api-keys) → copiez-la dans
   `RESEND_API_KEY`.
3. **Domaine d'envoi** : pour écrire à vos clientes, vérifiez un domaine dans
   [Domains](https://resend.com/domains) (ajout de quelques lignes DNS).
   Puis mettez `EMAIL_FROM="Madee <commandes@votredomaine.com>"`.
   *Sans domaine vérifié, Resend n'autorise l'envoi qu'à votre propre adresse
   (parfait pour tester).*
4. `SHOP_EMAIL` = votre adresse (pour recevoir les commandes).

### Le flux « numéro de suivi » (comme sur une vraie boutique)
Le numéro de suivi est créé par le transporteur **au moment où vous déposez le
colis** — impossible de l'obtenir avant. Le déroulé :

1. La cliente commande → vous recevez l'e-mail « **Nouvelle commande à
   expédier sous 48h** » avec un bouton.
2. Vous préparez et **déposez le colis** (La Poste, Mondial Relay…), le
   transporteur vous donne le numéro de suivi.
3. Vous cliquez le bouton de l'e-mail (ou allez sur **`/admin/expedition`**),
   vous collez le numéro + choisissez le transporteur, et **la cliente reçoit
   aussitôt** son e-mail de suivi avec le bon lien de suivi.

L'espace `/admin/expedition` est **protégé par mot de passe** : définissez
`ADMIN_PASSWORD` (une variable d'environnement) — c'est le mot de passe que
vous saisirez pour envoyer un suivi.

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
