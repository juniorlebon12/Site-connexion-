import React, { useState } from 'react'
import { Plus, X, Calendar, Search, AlertTriangle, Camera } from 'lucide-react'

interface Ingredient {
  id: string
  name: string
  category: string
  expiryDate?: string
  quantity?: string
  addedDate: string
}

const CATEGORIES = [
  'Légumes',
  'Fruits',
  'Viandes',
  'Poissons',
  'Laitages',
  'Féculents',
  'Épices',
  'Autres'
]

export function IngredientsPage() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    {
      id: '1',
      name: 'Tomates',
      category: 'Légumes',
      expiryDate: '2024-01-20',
      quantity: '500g',
      addedDate: '2024-01-15'
    },
    {
      id: '2',
      name: 'Pâtes',
      category: 'Féculents',
      quantity: '250g',
      addedDate: '2024-01-14'
    },
    {
      id: '3',
      name: 'Fromage râpé',
      category: 'Laitages',
      expiryDate: '2024-01-25',
      quantity: '100g',
      addedDate: '2024-01-16'
    }
  ])

  const [newIngredient, setNewIngredient] = useState({
    name: '',
    category: 'Légumes',
    expiryDate: '',
    quantity: ''
  })

  const [showAddForm, setShowAddForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Tous')

  const handleAddIngredient = () => {
    if (!newIngredient.name.trim()) return

    const ingredient: Ingredient = {
      id: Date.now().toString(),
      name: newIngredient.name,
      category: newIngredient.category,
      expiryDate: newIngredient.expiryDate || undefined,
      quantity: newIngredient.quantity || undefined,
      addedDate: new Date().toISOString().split('T')[0]
    }

    setIngredients([...ingredients, ingredient])
    setNewIngredient({ name: '', category: 'Légumes', expiryDate: '', quantity: '' })
    setShowAddForm(false)
  }

  const handleRemoveIngredient = (id: string) => {
    setIngredients(ingredients.filter(ing => ing.id !== id))
  }

  const getDaysUntilExpiry = (expiryDate: string) => {
    const today = new Date()
    const expiry = new Date(expiryDate)
    const diffTime = expiry.getTime() - today.getTime()
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  const getExpiryStatus = (expiryDate?: string) => {
    if (!expiryDate) return 'none'
    const days = getDaysUntilExpiry(expiryDate)
    if (days < 0) return 'expired'
    if (days <= 2) return 'warning'
    if (days <= 7) return 'soon'
    return 'good'
  }

  const filteredIngredients = ingredients.filter(ingredient => {
    const matchesSearch = ingredient.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'Tous' || ingredient.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const expiringIngredients = ingredients.filter(ing => {
    const status = getExpiryStatus(ing.expiryDate)
    return status === 'warning' || status === 'expired'
  })

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Mes ingrédients</h1>
          <p className="text-lg text-gray-600">
            Gérez vos ingrédients et suivez leurs dates de péremption
          </p>
        </div>

        {/* Alerts for expiring ingredients */}
        {expiringIngredients.length > 0 && (
          <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
            <div className="flex items-center mb-2">
              <AlertTriangle className="h-5 w-5 text-orange-600 mr-2" />
              <h3 className="font-medium text-orange-900">
                Ingrédients à consommer rapidement
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {expiringIngredients.map(ingredient => (
                <span key={ingredient.id} className="inline-flex items-center px-3 py-1 text-sm bg-orange-100 text-orange-800 rounded-full">
                  {ingredient.name}
                  {ingredient.expiryDate && (
                    <span className="ml-1">
                      ({getDaysUntilExpiry(ingredient.expiryDate) < 0 ? 'Expiré' : `${getDaysUntilExpiry(ingredient.expiryDate)}j`})
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un ingrédient..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="input-field md:w-48"
          >
            <option value="Tous">Toutes catégories</option>
            {CATEGORIES.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          <button
            onClick={() => setShowAddForm(true)}
            className="btn-primary inline-flex items-center"
          >
            <Plus className="w-5 h-5 mr-2" />
            Ajouter un ingrédient
          </button>
        </div>

        {/* Add ingredient form */}
        {showAddForm && (
          <div className="card mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Ajouter un ingrédient</h3>
            
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom de l'ingrédient *
                </label>
                <input
                  type="text"
                  value={newIngredient.name}
                  onChange={(e) => setNewIngredient({...newIngredient, name: e.target.value})}
                  placeholder="Ex: Tomates cerises"
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Catégorie
                </label>
                <select
                  value={newIngredient.category}
                  onChange={(e) => setNewIngredient({...newIngredient, category: e.target.value})}
                  className="input-field"
                >
                  {CATEGORIES.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantité
                </label>
                <input
                  type="text"
                  value={newIngredient.quantity}
                  onChange={(e) => setNewIngredient({...newIngredient, quantity: e.target.value})}
                  placeholder="Ex: 500g, 2 pièces"
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date d'expiration
                </label>
                <input
                  type="date"
                  value={newIngredient.expiryDate}
                  onChange={(e) => setNewIngredient({...newIngredient, expiryDate: e.target.value})}
                  className="input-field"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleAddIngredient}
                className="btn-primary"
              >
                Ajouter l'ingrédient
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="btn-secondary"
              >
                Annuler
              </button>
              <button className="btn-secondary inline-flex items-center">
                <Camera className="w-4 h-4 mr-2" />
                Scanner (Bientôt)
              </button>
            </div>
          </div>
        )}

        {/* Ingredients grid */}
        <div className="grid gap-4">
          {filteredIngredients.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchTerm || selectedCategory !== 'Tous' 
                  ? 'Aucun ingrédient trouvé'
                  : 'Aucun ingrédient ajouté'
                }
              </h3>
              <p className="text-gray-600 mb-4">
                {searchTerm || selectedCategory !== 'Tous'
                  ? 'Essayez de modifier vos critères de recherche'
                  : 'Commencez par ajouter vos premiers ingrédients'
                }
              </p>
              {!searchTerm && selectedCategory === 'Tous' && (
                <button
                  onClick={() => setShowAddForm(true)}
                  className="btn-primary"
                >
                  Ajouter un ingrédient
                </button>
              )}
            </div>
          ) : (
            <div className="grid gap-4">
              {CATEGORIES.filter(category => 
                selectedCategory === 'Tous' || selectedCategory === category
              ).map(category => {
                const categoryIngredients = filteredIngredients.filter(ing => ing.category === category)
                
                if (categoryIngredients.length === 0) return null

                return (
                  <div key={category} className="card">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">{category}</h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {categoryIngredients.map(ingredient => {
                        const expiryStatus = getExpiryStatus(ingredient.expiryDate)
                        
                        return (
                          <div key={ingredient.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-medium text-gray-900">{ingredient.name}</h4>
                              <button
                                onClick={() => handleRemoveIngredient(ingredient.id)}
                                className="text-gray-400 hover:text-red-500 transition-colors"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                            
                            {ingredient.quantity && (
                              <p className="text-sm text-gray-600 mb-2">{ingredient.quantity}</p>
                            )}
                            
                            {ingredient.expiryDate && (
                              <div className={`flex items-center text-sm ${
                                expiryStatus === 'expired' ? 'text-red-600' :
                                expiryStatus === 'warning' ? 'text-orange-600' :
                                expiryStatus === 'soon' ? 'text-yellow-600' :
                                'text-green-600'
                              }`}>
                                <Calendar className="w-4 h-4 mr-1" />
                                {expiryStatus === 'expired' ? 'Expiré' :
                                 `Expire dans ${getDaysUntilExpiry(ingredient.expiryDate)} jour${getDaysUntilExpiry(ingredient.expiryDate) > 1 ? 's' : ''}`
                                }
                              </div>
                            )}
                            
                            <div className="text-xs text-gray-500 mt-2">
                              Ajouté le {new Date(ingredient.addedDate).toLocaleDateString('fr-FR')}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Quick actions */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
            <div className="text-sm text-blue-800">
              💡 <strong>Astuce :</strong> Ajoutez les dates d'expiration pour recevoir des notifications et éviter le gaspillage !
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}