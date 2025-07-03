import React from 'react'
import { Crown, Check, Clock, Star, Zap } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'

export function SubscriptionPage() {
  const { user, upgradeToTrial, upgradeToPremium } = useAuth()

  if (!user) return null

  const getTrialInfo = () => {
    if (user.subscriptionType === 'trial' && user.trialEndDate) {
      const daysLeft = Math.ceil((user.trialEndDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
      return { daysLeft, isActive: daysLeft > 0 }
    }
    return { daysLeft: 0, isActive: false }
  }

  const trialInfo = getTrialInfo()

  const plans = [
    {
      name: 'Gratuit',
      price: 0,
      period: '',
      description: 'Pour découvrir QuickFood',
      features: [
        '5 recettes maximum',
        'Gestion des ingrédients',
        'Filtres de base',
        'Support communautaire'
      ],
      limitations: [
        'Accès limité aux recettes',
        'Pas de planification',
        'Pas de liste de courses automatique'
      ],
      current: user.subscriptionType === 'free',
      cta: 'Plan actuel',
      disabled: true
    },
    {
      name: 'Essai Premium',
      price: 0,
      period: '14 jours',
      description: 'Testez toutes les fonctionnalités gratuitement',
      features: [
        'Recettes illimitées',
        'Planification des repas',
        'Liste de courses automatique',
        'Suivi des dates d\'expiration',
        'Filtres avancés',
        'Suggestions personnalisées',
        'Support prioritaire'
      ],
      current: user.subscriptionType === 'trial',
      cta: user.subscriptionType === 'trial' 
        ? `${trialInfo.daysLeft} jour${trialInfo.daysLeft > 1 ? 's' : ''} restant${trialInfo.daysLeft > 1 ? 's' : ''}`
        : 'Démarrer l\'essai',
      onClick: user.subscriptionType !== 'trial' ? upgradeToTrial : undefined,
      disabled: user.subscriptionType === 'trial' || user.subscriptionType === 'premium',
      highlighted: user.subscriptionType === 'free'
    },
    {
      name: 'Premium',
      price: 4.99,
      period: 'mois',
      yearlyPrice: 39.99,
      description: 'Toute la puissance de QuickFood',
      features: [
        'Tout de l\'essai Premium',
        'Accès prioritaire aux nouvelles fonctionnalités',
        'Export PDF des menus',
        'Analyse nutritionnelle avancée',
        'Suggestions IA améliorées',
        'Support premium 24/7',
        'Sauvegarde cloud sécurisée'
      ],
      current: user.subscriptionType === 'premium',
      cta: user.subscriptionType === 'premium' ? 'Plan actuel' : 'Passer à Premium',
      onClick: user.subscriptionType !== 'premium' ? upgradeToPremium : undefined,
      disabled: user.subscriptionType === 'premium',
      highlighted: user.subscriptionType === 'trial'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choisissez votre plan
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Commencez gratuitement et passez à Premium quand vous êtes prêt. 
            Aucun engagement, résiliez à tout moment.
          </p>
        </div>

        {/* Current subscription status */}
        {user.subscriptionType === 'trial' && (
          <div className="mb-8 p-6 bg-blue-50 border border-blue-200 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center mb-2">
                  <Clock className="h-6 w-6 text-blue-600 mr-2" />
                  <h3 className="text-lg font-semibold text-blue-900">Essai Premium actif</h3>
                </div>
                <p className="text-blue-800">
                  {trialInfo.isActive 
                    ? `Votre essai gratuit se termine dans ${trialInfo.daysLeft} jour${trialInfo.daysLeft > 1 ? 's' : ''}. Passez à Premium pour continuer à profiter de toutes les fonctionnalités.`
                    : 'Votre essai gratuit a expiré. Passez à Premium pour continuer à utiliser toutes les fonctionnalités.'
                  }
                </p>
              </div>
            </div>
          </div>
        )}

        {user.subscriptionType === 'premium' && (
          <div className="mb-8 p-6 bg-yellow-50 border border-yellow-200 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center mb-2">
                  <Crown className="h-6 w-6 text-yellow-600 mr-2" />
                  <h3 className="text-lg font-semibold text-yellow-900">Abonné Premium</h3>
                </div>
                <p className="text-yellow-800">
                  Merci de faire confiance à QuickFood ! Vous avez accès à toutes les fonctionnalités Premium.
                </p>
              </div>
              <div className="text-right">
                <div className="text-sm text-yellow-600">Prochain paiement</div>
                <div className="font-semibold text-yellow-900">15 février 2024</div>
              </div>
            </div>
          </div>
        )}

        {/* Pricing cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`relative ${
                plan.highlighted 
                  ? 'ring-2 ring-primary-500 shadow-lg' 
                  : 'border border-gray-200'
              } bg-white rounded-2xl p-8 flex flex-col`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                    Recommandé
                  </span>
                </div>
              )}

              {plan.current && (
                <div className="absolute -top-4 right-4">
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                    Plan actuel
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}€</span>
                  {plan.period && (
                    <span className="text-gray-600 ml-1">/{plan.period}</span>
                  )}
                </div>

                {plan.yearlyPrice && (
                  <div className="text-sm text-gray-500">
                    ou {plan.yearlyPrice}€/an{' '}
                    <span className="text-green-600 font-medium">
                      (économisez {Math.round((1 - plan.yearlyPrice / (plan.price * 12)) * 100)}%)
                    </span>
                  </div>
                )}
              </div>

              <div className="flex-1">
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                {plan.limitations && (
                  <div className="mb-6">
                    <div className="text-sm font-medium text-gray-900 mb-2">Limitations :</div>
                    <ul className="space-y-1">
                      {plan.limitations.map((limitation, limitIndex) => (
                        <li key={limitIndex} className="text-sm text-gray-500 flex items-start">
                          <span className="w-2 h-2 bg-gray-300 rounded-full mr-2 mt-2 flex-shrink-0"></span>
                          {limitation}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <button
                onClick={plan.onClick}
                disabled={plan.disabled}
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                  plan.current
                    ? 'bg-green-100 text-green-800 cursor-default'
                    : plan.highlighted && !plan.disabled
                    ? 'bg-primary-600 text-white hover:bg-primary-700'
                    : plan.disabled
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-900 text-white hover:bg-gray-800'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Questions fréquentes
          </h2>
          
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">
                Puis-je annuler mon abonnement à tout moment ?
              </h3>
              <p className="text-gray-600">
                Oui, vous pouvez annuler votre abonnement à tout moment depuis votre compte. 
                Aucun frais d'annulation n'est appliqué.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">
                Que se passe-t-il après l'essai gratuit ?
              </h3>
              <p className="text-gray-600">
                À la fin de votre essai de 14 jours, votre compte passera automatiquement en version gratuite. 
                Vous ne serez pas facturé automatiquement.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">
                Mes données sont-elles sécurisées ?
              </h3>
              <p className="text-gray-600">
                Absolutely. Nous utilisons un chiffrement de niveau bancaire pour protéger vos données 
                et nous ne partageons jamais vos informations personnelles avec des tiers.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">
                Y a-t-il des frais cachés ?
              </h3>
              <p className="text-gray-600">
                Non, nos prix sont transparents. Le prix affiché est le prix que vous payez, 
                sans frais cachés ou supplémentaires.
              </p>
            </div>
          </div>
        </div>

        {/* Contact support */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-4 p-6 bg-white rounded-xl border border-gray-200">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
              <Star className="w-6 h-6 text-primary-600" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-gray-900">Besoin d'aide ?</h3>
              <p className="text-sm text-gray-600">
                Notre équipe support est là pour vous aider. Contactez-nous à{' '}
                <a href="mailto:support@quickfood.com" className="text-primary-600 hover:text-primary-500">
                  support@quickfood.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}