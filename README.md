# 🍽️ QuickFood - Trouvez des recettes avec vos ingrédients

QuickFood est une application web moderne qui aide les utilisateurs à trouver rapidement des recettes avec les ingrédients qu'ils ont déjà chez eux, réduisant ainsi le gaspillage alimentaire et simplifiant la cuisine du quotidien.

## ✨ Fonctionnalités principales

### 🆓 Version gratuite
- Gestion des ingrédients (ajout, suppression, catégorisation)
- Consultation de 5 recettes maximum
- Filtres de base (végétarien, sans gluten, etc.)
- Suivi des dates d'expiration

### 🔥 Essai gratuit (14 jours)
- **Recettes illimitées** avec instructions détaillées
- **Planification des repas** pour la semaine
- **Génération automatique** de listes de courses
- **Filtres avancés** et suggestions personnalisées
- **Support prioritaire**

### 👑 Premium (4,99€/mois ou 39,99€/an)
- Toutes les fonctionnalités de l'essai
- **Analyse nutritionnelle** avancée
- **Export PDF** des menus
- **Suggestions IA** améliorées
- **Support premium 24/7**
- **Sauvegarde cloud** sécurisée

## 🚀 Technologies utilisées

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Build Tool**: Vite
- **State Management**: React Context API

## 📦 Installation et lancement

### Prérequis
- Node.js 18+ et npm

### Installation
```bash
# Cloner le projet
git clone <url-du-repo>
cd quickfood

# Installer les dépendances
npm install

# Démarrer en mode développement
npm run dev

# L'application sera disponible sur http://localhost:3000
```

### Scripts disponibles
```bash
npm run dev      # Démarrage en mode développement
npm run build    # Build de production
npm run preview  # Aperçu du build de production
npm run lint     # Vérification du code
```

## 🏗️ Architecture de l'application

### Structure des dossiers
```
src/
├── components/          # Composants réutilisables
│   └── Header.tsx      # Navigation principale
├── pages/              # Pages de l'application
│   ├── LandingPage.tsx # Page d'accueil
│   ├── LoginPage.tsx   # Connexion
│   ├── RegisterPage.tsx # Inscription
│   ├── DashboardPage.tsx # Tableau de bord
│   ├── IngredientsPage.tsx # Gestion des ingrédients
│   ├── RecipesPage.tsx # Découverte des recettes
│   ├── PlanningPage.tsx # Planification des repas
│   └── SubscriptionPage.tsx # Gestion des abonnements
├── context/            # Gestion d'état globale
│   └── AuthContext.tsx # Authentification et freemium
├── hooks/              # Hooks personnalisés
│   └── useAuth.ts      # Hook d'authentification
├── App.tsx             # Composant principal
├── main.tsx           # Point d'entrée
└── index.css          # Styles globaux
```

### Modèle de données

#### Utilisateur
```typescript
interface User {
  id: string
  email: string
  name: string
  subscriptionType: 'free' | 'trial' | 'premium'
  trialStartDate?: Date
  trialEndDate?: Date
  freeRecipesViewed: number
  maxFreeRecipes: number
}
```

#### Ingrédient
```typescript
interface Ingredient {
  id: string
  name: string
  category: string
  expiryDate?: string
  quantity?: string
  addedDate: string
}
```

#### Recette
```typescript
interface Recipe {
  id: string
  name: string
  description: string
  cookingTime: number
  servings: number
  difficulty: 'Facile' | 'Moyen' | 'Difficile'
  ingredients: string[]
  instructions: string[]
  tags: string[]
  matchingIngredients: number
  totalIngredients: number
}
```

## 💡 Modèle économique Freemium

L'application utilise un modèle freemium avec trois niveaux :

1. **Gratuit** : Accès limité à 5 recettes pour découvrir l'application
2. **Essai** : 14 jours gratuits avec toutes les fonctionnalités Premium
3. **Premium** : Accès complet et fonctionnalités avancées

### Gestion des restrictions
- Compteur de recettes vues pour les utilisateurs gratuits
- Vérification automatique des dates d'expiration d'essai
- Interface adaptée selon le niveau d'abonnement
- Calls-to-action contextuels pour l'upgrade

## 🎨 Design et UX

### Principes de design
- **Interface moderne** avec Tailwind CSS
- **Design responsive** pour mobile et desktop
- **Animations fluides** et transitions
- **Accessibilité** avec labels et focus appropriés
- **Feedback visuel** clair pour les actions utilisateur

### Palette de couleurs
- **Primary** : Vert (#22c55e) - Fraîcheur et nature
- **Orange** : (#f97316) - Énergie et appétit
- **Backgrounds** : Gris clairs pour la lisibilité

## 🔐 Sécurité et authentification

### Fonctionnalités implémentées
- Authentification basique avec email/mot de passe
- Stockage sécurisé en localStorage (simulation)
- Protection des routes avec guards
- Validation côté client des formulaires

### Compte de démonstration
```
Email: demo@quickfood.com
Mot de passe: demo123
```

## 📱 Fonctionnalités détaillées

### Gestion des ingrédients
- **Ajout manuel** avec catégorisation automatique
- **Recherche et filtrage** par catégorie
- **Suivi des dates d'expiration** avec alertes
- **Quantités personnalisées**
- **Suppression simple** d'ingrédients

### Découverte de recettes
- **Correspondance d'ingrédients** avec pourcentage
- **Filtres avancés** (difficulté, temps, type)
- **Recettes détaillées** avec instructions étape par étape
- **Séparation gratuit/premium** visible

### Planification de repas (Premium)
- **Calendrier hebdomadaire** interactif
- **Glisser-déposer** pour organiser les repas
- **Génération de liste de courses** automatique
- **Suggestions optimisées** pour réutiliser les ingrédients

## 🚀 Déploiement

### Build de production
```bash
npm run build
```

Les fichiers optimisés seront générés dans le dossier `dist/`.

### Variables d'environnement (futures)
```bash
VITE_API_URL=https://api.quickfood.com
VITE_STRIPE_PUBLIC_KEY=pk_...
```

## 🔮 Améliorations futures

### Fonctionnalités prévues
- **Scan de codes-barres** pour ajouter des ingrédients
- **IA pour suggestions** de recettes personnalisées
- **Partage social** de recettes et menus
- **Mode hors ligne** avec Progressive Web App
- **Intégration avec supermarchés** pour livraison
- **Analyse nutritionnelle** détaillée
- **Communauté** et notation des recettes

### Optimisations techniques
- **API REST** complète avec base de données
- **Authentification OAuth** (Google, Facebook)
- **Paiements Stripe** pour les abonnements
- **Push notifications** pour les dates d'expiration
- **Tests automatisés** (Jest, React Testing Library)
- **CI/CD** avec GitHub Actions

## 🤝 Contribution

### Guidelines
1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

### Standards de code
- **TypeScript strict** pour la sécurité des types
- **ESLint** pour la qualité du code
- **Prettier** pour le formatage consistant
- **Conventional Commits** pour les messages

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📞 Support

- **Email** : support@quickfood.com
- **Documentation** : [docs.quickfood.com](https://docs.quickfood.com)
- **Issues** : [GitHub Issues](https://github.com/quickfood/issues)

---

**QuickFood** - Transformez votre frigo en source d'inspiration culinaire ! 🍽️✨