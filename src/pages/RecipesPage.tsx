import React, { useState } from 'react'
import { Search, Filter, Clock, Users, ChefHat, Heart, Crown, Lock } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'

interface Recipe {
  id: string
  name: string
  description: string
  cookingTime: number
  servings: number
  difficulty: 'Facile' | 'Moyen' | 'Difficile'
  image: string
  ingredients: string[]
  instructions: string[]
  tags: string[]
  matchingIngredients: number
  totalIngredients: number
}

const MOCK_RECIPES: Recipe[] = [
  {
    id: '1',
    name: 'Pasta aux Tomates et Fromage',
    description: 'Une recette simple et délicieuse avec vos ingrédients du frigo',
    cookingTime: 15,
    servings: 2,
    difficulty: 'Facile',
    image: '🍝',
    ingredients: ['Pâtes', 'Tomates', 'Fromage râpé', 'Huile d\'olive', 'Ail'],
    instructions: [
      'Faire cuire les pâtes selon les instructions du paquet',
      'Faire revenir l\'ail dans l\'huile d\'olive',
      'Ajouter les tomates coupées en dés',
      'Mélanger les pâtes avec la sauce',
      'Saupoudrer de fromage râpé'
    ],
    tags: ['Végétarien', 'Rapide'],
    matchingIngredients: 3,
    totalIngredients: 5
  },
  {
    id: '2',
    name: 'Salade de Tomates au Fromage',
    description: 'Une salade fraîche et légère parfaite pour l\'été',
    cookingTime: 5,
    servings: 2,
    difficulty: 'Facile',
    image: '🥗',
    ingredients: ['Tomates', 'Fromage râpé', 'Basilic', 'Huile d\'olive', 'Vinaigre'],
    instructions: [
      'Couper les tomates en rondelles',
      'Disposer sur une assiette',
      'Ajouter le fromage râpé',
      'Assaisonner avec l\'huile et le vinaigre',
      'Garnir de basilic frais'
    ],
    tags: ['Végétarien', 'Healthy', 'Sans cuisson'],
    matchingIngredients: 2,
    totalIngredients: 5
  },
  {
    id: '3',
    name: 'Gratin de Pâtes Premium',
    description: 'Un gratin généreux avec une sauce crémeuse',
    cookingTime: 35,
    servings: 4,
    difficulty: 'Moyen',
    image: '🧄',
    ingredients: ['Pâtes', 'Crème fraîche', 'Fromage râpé', 'Lardons', 'Oignons'],
    instructions: [
      'Préchauffer le four à 180°C',
      'Cuire les pâtes al dente',
      'Préparer une sauce à la crème',
      'Mélanger et enfourner 20 minutes',
      'Gratiner quelques minutes'
    ],
    tags: ['Comfort food', 'Gratinée'],
    matchingIngredients: 2,
    totalIngredients: 5
  },
  {
    id: '4',
    name: 'Risotto aux Champignons Premium',
    description: 'Un risotto crémeux aux champignons de saison',
    cookingTime: 25,
    servings: 3,
    difficulty: 'Moyen',
    image: '🍄',
    ingredients: ['Riz arborio', 'Champignons', 'Bouillon', 'Parmesan', 'Vin blanc'],
    instructions: [
      'Faire revenir les champignons',
      'Ajouter le riz et nacrer',
      'Verser le vin blanc',
      'Ajouter le bouillon louche par louche',
      'Incorporer le parmesan'
    ],
    tags: ['Végétarien', 'Crémeux'],
    matchingIngredients: 0,
    totalIngredients: 5
  },
  {
    id: '5',
    name: 'Tarte aux Légumes Premium',
    description: 'Une tarte colorée aux légumes de saison',
    cookingTime: 40,
    servings: 6,
    difficulty: 'Moyen',
    image: '🥧',
    ingredients: ['Pâte brisée', 'Courgettes', 'Tomates', 'Poivrons', 'Chèvre'],
    instructions: [
      'Étaler la pâte dans un moule',
      'Découper les légumes en rondelles',
      'Disposer harmonieusement',
      'Ajouter le fromage de chèvre',
      'Enfourner 30 minutes à 180°C'
    ],
    tags: ['Végétarien', 'Colorée'],
    matchingIngredients: 1,
    totalIngredients: 5
  }
]

export function RecipesPage() {
  const { user, canViewRecipe, incrementRecipeView, upgradeToTrial, upgradeToPremium } = useAuth()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDifficulty, setSelectedDifficulty] = useState('Toutes')
  const [selectedTag, setSelectedTag] = useState('Tous')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null)

  if (!user) return null

  // Fonction pour voir une recette (avec gestion freemium)
  const handleViewRecipe = (recipe: Recipe) => {
    if (!canViewRecipe()) {
      return // Ne pas permettre la visualisation
    }
    
    setSelectedRecipe(recipe)
    incrementRecipeView()
  }

  // Filtrer les recettes
  const filteredRecipes = MOCK_RECIPES.filter(recipe => {
    const matchesSearch = recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         recipe.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDifficulty = selectedDifficulty === 'Toutes' || recipe.difficulty === selectedDifficulty
    const matchesTag = selectedTag === 'Tous' || recipe.tags.includes(selectedTag)
    
    return matchesSearch && matchesDifficulty && matchesTag
  })

  // Séparer les recettes gratuites et premium
  const freeRecipes = filteredRecipes.slice(0, 2)
  const premiumRecipes = filteredRecipes.slice(2)

  const allTags = Array.from(new Set(MOCK_RECIPES.flatMap(recipe => recipe.tags)))

  const RecipeCard = ({ recipe, isPremium = false }: { recipe: Recipe, isPremium?: boolean }) => {
    const canView = canViewRecipe()
    const isLocked = isPremium && user.subscriptionType === 'free'
    
    return (
      <div className={`card hover:shadow-lg transition-shadow relative ${isLocked ? 'opacity-75' : ''}`}>
        {isLocked && (
          <div className="absolute top-4 right-4 z-10">
            <div className="flex items-center bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
              <Crown className="w-3 h-3 mr-1" />
              Premium
            </div>
          </div>
        )}
        
        <div className="text-center mb-4">
          <div className="text-6xl mb-2">{recipe.image}</div>
          <h3 className="text-lg font-semibold text-gray-900">{recipe.name}</h3>
          <p className="text-sm text-gray-600 mt-1">{recipe.description}</p>
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {recipe.cookingTime}min
          </div>
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-1" />
            {recipe.servings} pers.
          </div>
          <span className={`px-2 py-1 rounded-full text-xs ${
            recipe.difficulty === 'Facile' ? 'bg-green-100 text-green-800' :
            recipe.difficulty === 'Moyen' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {recipe.difficulty}
          </span>
        </div>
        
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-600">Ingrédients disponibles</span>
            <span className="font-medium text-primary-600">
              {recipe.matchingIngredients}/{recipe.totalIngredients}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-primary-600 h-2 rounded-full" 
              style={{ width: `${(recipe.matchingIngredients / recipe.totalIngredients) * 100}%` }}
            ></div>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {recipe.tags.slice(0, 2).map(tag => (
            <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
              {tag}
            </span>
          ))}
          {recipe.tags.length > 2 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
              +{recipe.tags.length - 2}
            </span>
          )}
        </div>
        
        <button
          onClick={() => isLocked ? null : handleViewRecipe(recipe)}
          disabled={isLocked || (!canView && !isPremium)}
          className={`w-full ${
            isLocked 
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
              : (!canView && !isPremium)
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'btn-primary'
          }`}
        >
          {isLocked ? (
            <>
              <Lock className="w-4 h-4 mr-2" />
              Premium requis
            </>
          ) : (!canView && !isPremium) ? (
            'Limite atteinte'
          ) : (
            'Voir la recette'
          )}
        </button>
      </div>
    )
  }

  if (selectedRecipe) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => setSelectedRecipe(null)}
            className="btn-secondary mb-6"
          >
            ← Retour aux recettes
          </button>
          
          <div className="card">
            <div className="text-center mb-8">
              <div className="text-8xl mb-4">{selectedRecipe.image}</div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{selectedRecipe.name}</h1>
              <p className="text-lg text-gray-600">{selectedRecipe.description}</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <Clock className="w-8 h-8 text-primary-600 mx-auto mb-2" />
                <div className="font-semibold text-gray-900">{selectedRecipe.cookingTime} minutes</div>
                <div className="text-sm text-gray-600">Temps de cuisson</div>
              </div>
              <div className="text-center">
                <Users className="w-8 h-8 text-primary-600 mx-auto mb-2" />
                <div className="font-semibold text-gray-900">{selectedRecipe.servings} personnes</div>
                <div className="text-sm text-gray-600">Portions</div>
              </div>
              <div className="text-center">
                <ChefHat className="w-8 h-8 text-primary-600 mx-auto mb-2" />
                <div className="font-semibold text-gray-900">{selectedRecipe.difficulty}</div>
                <div className="text-sm text-gray-600">Difficulté</div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Ingrédients</h2>
                <ul className="space-y-2">
                  {selectedRecipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
                      {ingredient}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Instructions</h2>
                <ol className="space-y-3">
                  {selectedRecipe.instructions.map((instruction, index) => (
                    <li key={index} className="flex items-start">
                      <span className="flex-shrink-0 w-6 h-6 bg-primary-600 text-white text-sm rounded-full flex items-center justify-center mr-3">
                        {index + 1}
                      </span>
                      {instruction}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex flex-wrap gap-2">
                {selectedRecipe.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-primary-100 text-primary-800 text-sm rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Découvrir des recettes</h1>
          <p className="text-lg text-gray-600">
            Trouvez des recettes délicieuses avec vos ingrédients disponibles
          </p>
        </div>

        {/* Subscription reminder for free users */}
        {user.subscriptionType === 'free' && (
          <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-orange-900 mb-1">Version gratuite</h3>
                <p className="text-sm text-orange-800">
                  Vous avez utilisé {user.freeRecipesViewed}/{user.maxFreeRecipes} recettes gratuites.
                  {user.freeRecipesViewed >= user.maxFreeRecipes 
                    ? ' Passez à Premium pour continuer à découvrir des recettes !'
                    : ` Il vous reste ${user.maxFreeRecipes - user.freeRecipesViewed} recette${user.maxFreeRecipes - user.freeRecipesViewed > 1 ? 's' : ''}.`
                  }
                </p>
              </div>
              <div className="flex gap-2">
                <button onClick={upgradeToTrial} className="btn-primary text-sm">
                  Essai gratuit
                </button>
                <button onClick={upgradeToPremium} className="btn-secondary text-sm">
                  Premium
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Search and Filters */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher une recette..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-field pl-10"
                />
              </div>
            </div>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="btn-secondary inline-flex items-center"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filtres
            </button>
          </div>
          
          {showFilters && (
            <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Difficulté</label>
                  <select
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                    className="input-field"
                  >
                    <option value="Toutes">Toutes</option>
                    <option value="Facile">Facile</option>
                    <option value="Moyen">Moyen</option>
                    <option value="Difficile">Difficile</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                  <select
                    value={selectedTag}
                    onChange={(e) => setSelectedTag(e.target.value)}
                    className="input-field"
                  >
                    <option value="Tous">Tous</option>
                    {allTags.map(tag => (
                      <option key={tag} value={tag}>{tag}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Free Recipes */}
        {freeRecipes.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recettes gratuites</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {freeRecipes.map(recipe => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          </div>
        )}

        {/* Premium Recipes */}
        {premiumRecipes.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Recettes Premium</h2>
              {user.subscriptionType === 'free' && (
                <div className="flex items-center text-sm text-yellow-600">
                  <Crown className="w-4 h-4 mr-1" />
                  Abonnement requis
                </div>
              )}
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {premiumRecipes.map(recipe => (
                <RecipeCard key={recipe.id} recipe={recipe} isPremium={true} />
              ))}
            </div>
          </div>
        )}

        {filteredRecipes.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune recette trouvée</h3>
            <p className="text-gray-600">
              Essayez de modifier vos critères de recherche ou ajoutez plus d'ingrédients.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}