import React from 'react'
import { Link } from 'react-router-dom'
import { 
  ChefHat, 
  Plus, 
  Calendar, 
  ShoppingList, 
  Clock, 
  Crown,
  AlertCircle,
  CheckCircle,
  Leaf,
  Star
} from 'lucide-react'
import { useAuth } from '../hooks/useAuth'

export function DashboardPage() {
  const { user, canViewRecipe, upgradeToTrial, upgradeToPremium } = useAuth()

  if (!user) return null

  const getTrialInfo = () => {
    if (user.subscriptionType === 'trial' && user.trialEndDate) {
      const daysLeft = Math.ceil((user.trialEndDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
      return { daysLeft, isActive: daysLeft > 0 }
    }
    return { daysLeft: 0, isActive: false }
  }

  const trialInfo = getTrialInfo()
  const recipesLeft = user.maxFreeRecipes - user.freeRecipesViewed

  const mockStats = {
    totalRecipes: user.subscriptionType === 'free' ? user.freeRecipesViewed : 47,
    ingredientsAdded: 23,
    mealsPlanned: user.subscriptionType === 'free' ? 0 : 12,
    wasteReduced: user.subscriptionType === 'free' ? 0 : '2.3kg'
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Bonjour {user.name} ! 👋
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            Prêt à découvrir de nouvelles recettes aujourd'hui ?
          </p>
        </div>

        {/* Subscription Status */}
        {user.subscriptionType === 'free' && (
          <div className="mb-8 p-6 bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-xl">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center mb-2">
                  <AlertCircle className="h-6 w-6 text-orange-600 mr-2" />
                  <h3 className="text-lg font-semibold text-orange-900">Version gratuite</h3>
                </div>
                <p className="text-orange-800 mb-4">
                  Vous avez utilisé {user.freeRecipesViewed}/{user.maxFreeRecipes} recettes gratuites.
                  {recipesLeft > 0 
                    ? ` Il vous reste ${recipesLeft} recette${recipesLeft > 1 ? 's' : ''}.`
                    : ' Passez à Premium pour continuer !'
                  }
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={upgradeToTrial}
                    className="btn-primary"
                  >
                    Essai gratuit 14 jours
                  </button>
                  <button
                    onClick={upgradeToPremium}
                    className="btn-secondary"
                  >
                    Passer à Premium
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {user.subscriptionType === 'trial' && (
          <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-primary-50 border border-blue-200 rounded-xl">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center mb-2">
                  <Clock className="h-6 w-6 text-blue-600 mr-2" />
                  <h3 className="text-lg font-semibold text-blue-900">Essai Premium actif</h3>
                </div>
                <p className="text-blue-800 mb-4">
                  {trialInfo.isActive 
                    ? `Il vous reste ${trialInfo.daysLeft} jour${trialInfo.daysLeft > 1 ? 's' : ''} d'essai gratuit.`
                    : 'Votre essai gratuit a expiré.'
                  }
                  {trialInfo.isActive && ' Profitez de toutes les fonctionnalités Premium !'}
                </p>
                {trialInfo.isActive && (
                  <button
                    onClick={upgradeToPremium}
                    className="btn-primary"
                  >
                    <Crown className="w-4 h-4 mr-2" />
                    Passer à Premium maintenant
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {user.subscriptionType === 'premium' && (
          <div className="mb-8 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center mb-2">
                  <Crown className="h-6 w-6 text-yellow-600 mr-2" />
                  <h3 className="text-lg font-semibold text-yellow-900">Abonné Premium</h3>
                </div>
                <p className="text-yellow-800">
                  Vous avez accès à toutes les fonctionnalités de QuickFood. Merci pour votre confiance !
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card text-center">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ChefHat className="w-6 h-6 text-primary-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{mockStats.totalRecipes}</h3>
            <p className="text-gray-600">Recettes découvertes</p>
          </div>

          <div className="card text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Leaf className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{mockStats.ingredientsAdded}</h3>
            <p className="text-gray-600">Ingrédients ajoutés</p>
          </div>

          <div className="card text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{mockStats.mealsPlanned}</h3>
            <p className="text-gray-600">Repas planifiés</p>
          </div>

          <div className="card text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{mockStats.wasteReduced || '0kg'}</h3>
            <p className="text-gray-600">Gaspillage évité</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Link to="/ingredients" className="card hover:shadow-lg transition-shadow group">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <Plus className="w-6 h-6 text-primary-600" />
              </div>
              <span className="text-sm text-gray-500 group-hover:text-primary-600 transition-colors">
                →
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Ajouter des ingrédients</h3>
            <p className="text-gray-600">
              Listez ce que vous avez dans votre frigo pour découvrir de nouvelles recettes
            </p>
          </Link>

          <Link 
            to="/recipes" 
            className={`card hover:shadow-lg transition-shadow group ${
              !canViewRecipe() ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={(e) => {
              if (!canViewRecipe()) {
                e.preventDefault()
              }
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <ChefHat className="w-6 h-6 text-orange-600" />
              </div>
              <span className="text-sm text-gray-500 group-hover:text-orange-600 transition-colors">
                →
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Découvrir des recettes</h3>
            <p className="text-gray-600">
              Trouvez les meilleures recettes avec vos ingrédients disponibles
            </p>
            {!canViewRecipe() && (
              <div className="mt-2 text-sm text-red-600 font-medium">
                Limite atteinte - Passez à Premium
              </div>
            )}
          </Link>

          <Link 
            to={user.subscriptionType === 'free' ? '/subscription' : '/planning'} 
            className="card hover:shadow-lg transition-shadow group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-sm text-gray-500 group-hover:text-blue-600 transition-colors">
                →
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Planifier vos repas</h3>
            <p className="text-gray-600">
              Organisez vos menus de la semaine et générez votre liste de courses
            </p>
            {user.subscriptionType === 'free' && (
              <div className="mt-2 flex items-center text-sm text-yellow-600 font-medium">
                <Crown className="w-4 h-4 mr-1" />
                Fonctionnalité Premium
              </div>
            )}
          </Link>
        </div>

        {/* Recent Activity */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Activité récente</h2>
          
          {user.subscriptionType === 'free' && user.freeRecipesViewed === 0 ? (
            <div className="text-center py-8">
              <ChefHat className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Commencez votre aventure culinaire !</h3>
              <p className="text-gray-600 mb-4">
                Ajoutez vos premiers ingrédients et découvrez des recettes délicieuses.
              </p>
              <Link to="/ingredients" className="btn-primary">
                Ajouter des ingrédients
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Recette "Pasta aux légumes" consultée</p>
                  <p className="text-sm text-gray-500">Il y a 2 heures</p>
                </div>
              </div>
              
              <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <Plus className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">3 nouveaux ingrédients ajoutés</p>
                  <p className="text-sm text-gray-500">Hier</p>
                </div>
              </div>

              {user.subscriptionType !== 'free' && (
                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                    <Calendar className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Menu de la semaine planifié</p>
                    <p className="text-sm text-gray-500">Il y a 3 jours</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}