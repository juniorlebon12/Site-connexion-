import React, { useState } from 'react'
import { Calendar, Plus, ShoppingCart, Clock, Crown } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { Link } from 'react-router-dom'

interface MealPlan {
  id: string
  day: string
  meal: 'petit-déjeuner' | 'déjeuner' | 'dîner'
  recipe: string
  prepTime: number
}

const DAYS = [
  'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'
]

const MEALS = [
  { key: 'petit-déjeuner', label: 'Petit-déjeuner', time: '08:00' },
  { key: 'déjeuner', label: 'Déjeuner', time: '12:00' },
  { key: 'dîner', label: 'Dîner', time: '19:00' }
]

export function PlanningPage() {
  const { user, upgradeToPremium, upgradeToTrial } = useAuth()
  
  const [mealPlans, setMealPlans] = useState<MealPlan[]>([
    {
      id: '1',
      day: 'Lundi',
      meal: 'déjeuner',
      recipe: 'Pasta aux Tomates et Fromage',
      prepTime: 15
    },
    {
      id: '2',
      day: 'Lundi',
      meal: 'dîner',
      recipe: 'Salade de Tomates au Fromage',
      prepTime: 5
    },
    {
      id: '3',
      day: 'Mardi',
      meal: 'déjeuner',
      recipe: 'Gratin de Pâtes',
      prepTime: 35
    }
  ])

  const [showAddForm, setShowAddForm] = useState(false)
  const [selectedDay, setSelectedDay] = useState('Lundi')
  const [selectedMeal, setSelectedMeal] = useState('déjeuner')

  if (!user) return null

  // Vérifier si l'utilisateur a accès à cette fonctionnalité
  const hasAccess = user.subscriptionType === 'premium' || 
                   (user.subscriptionType === 'trial' && user.trialEndDate && new Date() <= user.trialEndDate)

  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Crown className="w-10 h-10 text-yellow-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Planification des repas
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Organisez vos repas de la semaine et générez automatiquement votre liste de courses. 
              Cette fonctionnalité est disponible avec un abonnement Premium.
            </p>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8 max-w-md mx-auto">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Fonctionnalités Premium</h3>
              <ul className="text-left space-y-3 text-gray-600">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
                  Planification des repas pour 7 jours
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
                  Génération automatique de liste de courses
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
                  Calcul des quantités nécessaires
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
                  Suggestions de recettes
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
                  Export PDF de vos menus
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {user.subscriptionType === 'free' && (
                <button
                  onClick={upgradeToTrial}
                  className="btn-primary text-lg px-8 py-3"
                >
                  Essai gratuit 14 jours
                </button>
              )}
              <button
                onClick={upgradeToPremium}
                className="btn-secondary text-lg px-8 py-3"
              >
                <Crown className="w-5 h-5 mr-2" />
                Passer à Premium
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const getMealForDay = (day: string, meal: string) => {
    return mealPlans.find(plan => plan.day === day && plan.meal === meal)
  }

  const generateShoppingList = () => {
    // Simulation de génération de liste de courses
    const ingredients = [
      'Pâtes - 500g',
      'Tomates - 1kg',
      'Fromage râpé - 200g',
      'Crème fraîche - 200ml',
      'Lardons - 150g',
      'Oignons - 2 pièces',
      'Salade - 1 pièce'
    ]
    
    alert('Liste de courses générée :\n\n' + ingredients.join('\n'))
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Planning des repas</h1>
            <p className="text-lg text-gray-600">
              Organisez vos repas de la semaine et simplifiez vos courses
            </p>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={generateShoppingList}
              className="btn-secondary inline-flex items-center"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Liste de courses
            </button>
            <button
              onClick={() => setShowAddForm(true)}
              className="btn-primary inline-flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              Ajouter un repas
            </button>
          </div>
        </div>

        {/* Add meal form */}
        {showAddForm && (
          <div className="card mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Ajouter un repas</h3>
            
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Jour
                </label>
                <select
                  value={selectedDay}
                  onChange={(e) => setSelectedDay(e.target.value)}
                  className="input-field"
                >
                  {DAYS.map(day => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Repas
                </label>
                <select
                  value={selectedMeal}
                  onChange={(e) => setSelectedMeal(e.target.value)}
                  className="input-field"
                >
                  {MEALS.map(meal => (
                    <option key={meal.key} value={meal.key}>{meal.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Recette
                </label>
                <select className="input-field">
                  <option>Pasta aux Tomates et Fromage</option>
                  <option>Salade de Tomates au Fromage</option>
                  <option>Gratin de Pâtes</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3">
              <button className="btn-primary">
                Ajouter au planning
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="btn-secondary"
              >
                Annuler
              </button>
            </div>
          </div>
        )}

        {/* Weekly calendar */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Cette semaine</h2>
          
          <div className="overflow-x-auto">
            <div className="grid grid-cols-8 gap-4 min-w-[800px]">
              {/* Header row */}
              <div className="font-medium text-gray-700">Repas</div>
              {DAYS.map(day => (
                <div key={day} className="font-medium text-gray-700 text-center">
                  {day}
                </div>
              ))}

              {/* Meal rows */}
              {MEALS.map(meal => (
                <React.Fragment key={meal.key}>
                  <div className="flex items-center py-4 border-t border-gray-200">
                    <div className="text-sm font-medium text-gray-900">
                      {meal.label}
                    </div>
                    <div className="text-xs text-gray-500 ml-2">
                      {meal.time}
                    </div>
                  </div>
                  
                  {DAYS.map(day => {
                    const plannedMeal = getMealForDay(day, meal.key)
                    
                    return (
                      <div key={`${day}-${meal.key}`} className="border-t border-gray-200 py-4">
                        {plannedMeal ? (
                          <div className="bg-primary-50 border border-primary-200 rounded-lg p-3">
                            <div className="font-medium text-gray-900 text-sm mb-1">
                              {plannedMeal.recipe}
                            </div>
                            <div className="flex items-center text-xs text-gray-600">
                              <Clock className="w-3 h-3 mr-1" />
                              {plannedMeal.prepTime}min
                            </div>
                          </div>
                        ) : (
                          <button
                            onClick={() => {
                              setSelectedDay(day)
                              setSelectedMeal(meal.key)
                              setShowAddForm(true)
                            }}
                            className="w-full h-16 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 hover:border-gray-400 hover:text-gray-600 transition-colors"
                          >
                            <Plus className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    )
                  })}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Quick stats */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="card text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{mealPlans.length}</h3>
            <p className="text-gray-600">Repas planifiés</p>
          </div>

          <div className="card text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">
              {Math.round(mealPlans.reduce((acc, meal) => acc + meal.prepTime, 0) / mealPlans.length)}min
            </h3>
            <p className="text-gray-600">Temps moyen</p>
          </div>

          <div className="card text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingCart className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">7</h3>
            <p className="text-gray-600">Ingrédients requis</p>
          </div>
        </div>

        {/* Suggestions */}
        <div className="card mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Suggestions pour cette semaine</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                💡
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">Optimisez vos courses</h3>
                <p className="text-sm text-gray-600">
                  Vous pouvez réutiliser les tomates pour 3 recettes cette semaine. 
                  Achetez-en 1kg pour économiser.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                🌱
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">Recette équilibrée manquante</h3>
                <p className="text-sm text-gray-600">
                  Ajoutez une recette avec des légumes verts pour équilibrer votre semaine.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}