# 🌿 Le Grenier de Mézos — Site Web Officiel de la Recyclerie - 40170

Site web one-pager officiel et moderne pour **Le Grenier de Mézos**, recyclerie et ressourcerie solidaire située à Mézos dans les Landes (40).

![Le Grenier de Mézos](https://img.shields.io/badge/Association-Solidaire-2D5A43?style=flat-square)
![Localisation](https://img.shields.io/badge/Lieu-M%C3%A9zos%20(40170)-informational?style=flat-square)
![Stack](https://img.shields.io/badge/Stack-React%20%7C%20Vite%20%7C%20TailwindCSS-success?style=flat-square)

---

## 📌 Informations officielles de la recyclerie

- **Nom :** Le Grenier de Mézos (Association Le Grenier)
- **Adresse :** Zone Artisanale, Quartier Saint Jouan, 40170 Mézos (Landes, Nouvelle-Aquitaine)
- **Téléphone :** `05 58 42 65 00`
- **Email enlèvements :** `enlevements.grenier@gmail.com`
- **Lien Google Maps :** [Ouvrir la fiche Google Maps](https://www.google.com/maps/search/?api=1&query=Le+Grenier+de+M%C3%A9zos+Zone+Artisanale+40170+M%C3%A9zos)

### 🕒 Horaires d'ouverture
- **Mardi au Vendredi :** 09h00 - 12h00 / 14h30 - 18h30
- **Samedi :** 10h00 - 12h00 / 14h30 - 18h30
- **Dimanche :** 14h30 - 18h30
- **Lundi :** Fermé au public (tri & ateliers)

---

## 🚀 Comment publier ce projet sur votre compte GitHub ?

### Option 1 : Via le terminal (Ligne de commande Git)

1. **Créez un nouveau dépôt vide sur votre compte GitHub :**
   Rendez-vous sur [github.com/new](https://github.com/new) et créez un dépôt nommé par exemple `grenier-de-mezos` (ne cochez pas "Add a README" ni "Add .gitignore").

2. **Dans le dossier du projet, exécutez les commandes suivantes :**

```bash
# 1. Initialiser le dépôt git
git init
git branch -M main

# 2. Ajouter tous les fichiers
git add .

# 3. Créer le commit initial
git commit -m "feat: site officiel Le Grenier de Mézos (recyclerie & ressourcerie)"

# 4. Lier votre dépôt GitHub (remplacez VOTRE_UTILISATEUR par votre pseudo GitHub)
git remote add origin https://github.com/VOTRE_UTILISATEUR/grenier-de-mezos.git

# 5. Pousser le code vers GitHub
git push -u origin main
```

---

## 🌐 Déploiement en ligne gratuit

Une fois le code sur GitHub, vous pouvez mettre le site en ligne gratuitement :

### Option A : Déploiement sur Vercel (le plus simple)
1. Rendez-vous sur [vercel.com](https://vercel.com) et connectez-vous avec votre compte GitHub.
2. Cliquez sur **"Add New Project"** puis sélectionnez votre dépôt `grenier-de-mezos`.
3. Cliquez sur **"Deploy"** : votre site sera automatiquement en ligne avec HTTPS et actualisé à chaque modification de code !

### Option B : Déploiement sur GitHub Pages
Dans l'onglet **Settings > Pages** de votre dépôt GitHub, sélectionnez **GitHub Actions** pour un déploiement continu gratuit.

---

## 🛠️ Développement local

### Prérequis
- Node.js version 18 ou supérieure
- npm

### Installation et démarrage
```bash
# Installer les dépendances
npm install

# Démarrer le serveur de développement local
npm run dev

# Compiler pour la production
npm run build

# Prévisualiser la version de production
npm run preview
```

---

## 📁 Architecture du projet

```
├── index.html                    # Entrée HTML avec balises SEO, métadonnées & polices
├── package.json                  # Dépendances & scripts de build Vite
├── README.md                     # Documentation officielle du projet
├── src/
│   ├── App.tsx                   # Page principale one-pager
│   ├── main.tsx                  # Montage React 19
│   ├── index.css                 # Configuration Tailwind CSS v4 & typographie
│   ├── types.ts                  # Interfaces TypeScript
│   ├── data/
│   │   └── grenierData.ts        # Données certifiées (coordonnées, horaires, rayons, FAQ)
│   ├── utils/
│   │   └── schedule.ts           # Calcul en temps réel de l'état d'ouverture (heure française)
│   └── components/
│       ├── Header.tsx            # Barre de navigation avec badge d'ouverture en direct
│       ├── Hero.tsx              # Bannière d'accueil & fiche de contact rapide
│       ├── PracticalInfo.tsx     # Google Maps interactif, horaires détaillés & accès
│       ├── DonationsAndPickups.tsx# Dépôts & formulaire de demande d'enlèvement
│       ├── AcceptedItemsGuide.tsx# Guide de tri (acceptés vs refusés avec recherche)
│       ├── ShopShowcase.tsx      # Présentation des rayons de la boutique solidaire
│       ├── ImpactValues.tsx      # Valeurs écologiques et solidarité dans les Landes
│       ├── FAQ.tsx               # Foire aux questions pratiques
│       ├── Footer.tsx            # Pied de page avec liens & contacts
│       └── GitHubModal.tsx       # Modale d'aide interactive pour publier sur GitHub
```

---

## 💚 Licence & Crédits
Site développé pour l'association **Le Grenier de Mézos** — Pour le réemploi, la réduction des déchets et la solidarité locale dans les Landes.
