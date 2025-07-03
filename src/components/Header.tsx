import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ChefHat, User, LogOut, Crown, Clock } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'

export function Header() {
  const { user, isAuthenticated, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const isActive = (path: string) => location.pathname === path

  const getSubscriptionBadge = () => {
    if (!user) return null

    if (user.subscriptionType === 'premium') {
      return (
        <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
          <Crown className="w-3 h-3 mr-1" />
          Premium
        </span>
      )
    }

    if (user.subscriptionType === 'trial') {
      const daysLeft = user.trialEndDate ? 
        Math.ceil((user.trialEndDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : 0
      
      return (
        <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
          <Clock className="w-3 h-3 mr-1" />
          Essai {daysLeft}j
        </span>
      )
    }

    const recipesLeft = user.maxFreeRecipes - user.freeRecipesViewed
    return (
      <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
        {recipesLeft}/{user.maxFreeRecipes} gratuit
      </span>
    )
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <ChefHat className="h-8 w-8 text-primary-600" />
            <span className="text-2xl font-bold text-gray-900">QuickFood</span>
          </Link>

          {/* Navigation */}
          {isAuthenticated && (
            <nav className="hidden md:flex space-x-8">
              <Link
                to="/dashboard"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/dashboard')
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                }`}
              >
                Tableau de bord
              </Link>
              <Link
                to="/ingredients"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/ingredients')
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                }`}
              >
                Mes ingrédients
              </Link>
              <Link
                to="/recipes"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/recipes')
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                }`}
              >
                Recettes
              </Link>
              <Link
                to="/planning"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/planning')
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                }`}
              >
                Planning
              </Link>
            </nav>
          )}

          {/* User menu */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {getSubscriptionBadge()}
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <User className="h-5 w-5 text-gray-400" />
                    <span className="text-sm font-medium text-gray-700">{user?.name}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-red-600 transition-colors"
                  >
                    <LogOut className="h-4 w-4 mr-1" />
                    Déconnexion
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors"
                >
                  Connexion
                </Link>
                <Link
                  to="/register"
                  className="btn-primary text-sm"
                >
                  Essai gratuit
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}