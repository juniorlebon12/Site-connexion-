import React from 'react'
import { Link } from 'react-router-dom'
import { ChefHat, Clock, Leaf, Star, CheckCircle } from 'lucide-react'

export function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-green-50 pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Trouvez des recettes avec
              <span className="text-primary-600"> vos ingrédients</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Fini le casse-tête du "qu'est-ce qu'on mange ?". QuickFood vous propose des recettes délicieuses 
              avec ce que vous avez déjà dans votre frigo. Rapide, pratique et sans gaspillage !
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/register"
                className="btn-primary text-lg px-8 py-4 inline-flex items-center"
              >
                <ChefHat className="w-5 h-5 mr-2" />
                Essai gratuit 14 jours
              </Link>
              <p className="text-sm text-gray-500">
                Aucune carte bancaire requise
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Pourquoi choisir QuickFood ?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Une approche intelligente de la cuisine quotidienne
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Rapide & Efficace</h3>
              <p className="text-gray-600">
                Toutes nos recettes sont conçues pour être préparées en moins de 30 minutes. 
                Parfait pour les soirées chargées !
              </p>
            </div>

            <div className="text-center p-8 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Leaf className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Zéro Gaspillage</h3>
              <p className="text-gray-600">
                Utilisez ce que vous avez déjà ! Nos algorithmes trouvent les meilleures recettes 
                avec vos ingrédients disponibles.
              </p>
            </div>

            <div className="text-center p-8 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Personnalisé</h3>
              <p className="text-gray-600">
                Filtres pour végétariens, sans gluten, healthy... Trouvez exactement ce qui 
                correspond à vos goûts et besoins.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Commencez gratuitement
            </h2>
            <p className="text-lg text-gray-600">
              Testez toutes les fonctionnalités pendant 14 jours, puis choisissez votre plan
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Plan Gratuit */}
            <div className="card text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Gratuit</h3>
              <div className="text-3xl font-bold text-gray-900 mb-6">0€</div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-600">5 recettes maximum</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-600">Ajouter des ingrédients</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-600">Filtres de base</span>
                </li>
              </ul>
              <Link to="/register" className="btn-secondary w-full">
                Commencer gratuitement
              </Link>
            </div>

            {/* Plan Essai */}
            <div className="card text-center border-2 border-primary-500 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Recommandé
                </span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Essai Premium</h3>
              <div className="text-3xl font-bold text-gray-900 mb-6">
                Gratuit
                <span className="text-lg text-gray-500 font-normal"> / 14 jours</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-600">Recettes illimitées</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-600">Planning des repas</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-600">Liste de courses auto</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-600">Suivi des péremptions</span>
                </li>
              </ul>
              <Link to="/register" className="btn-primary w-full">
                Démarrer l'essai
              </Link>
            </div>

            {/* Plan Premium */}
            <div className="card text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Premium</h3>
              <div className="text-3xl font-bold text-gray-900 mb-6">
                4,99€
                <span className="text-lg text-gray-500 font-normal"> / mois</span>
              </div>
              <div className="text-sm text-gray-500 mb-6">ou 39,99€/an (économisez 33%)</div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-600">Toutes les fonctionnalités</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-600">Support prioritaire</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-600">Nouvelles fonctionnalités</span>
                </li>
              </ul>
              <Link to="/register" className="btn-secondary w-full">
                Choisir Premium
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Prêt à révolutionner votre cuisine ?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Rejoignez des milliers d'utilisateurs qui ont déjà simplifié leur quotidien avec QuickFood
          </p>
          <Link
            to="/register"
            className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-colors inline-flex items-center"
          >
            <ChefHat className="w-5 h-5 mr-2" />
            Commencer maintenant
          </Link>
        </div>
      </section>
    </div>
  )
}