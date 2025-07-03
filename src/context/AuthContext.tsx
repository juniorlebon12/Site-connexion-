import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export interface User {
  id: string
  email: string
  name: string
  subscriptionType: 'free' | 'trial' | 'premium'
  trialStartDate?: Date
  trialEndDate?: Date
  freeRecipesViewed: number
  maxFreeRecipes: number
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  canViewRecipe: () => boolean
  incrementRecipeView: () => void
  upgradeToTrial: () => void
  upgradeToPremium: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  // Simulation d'une base de données locale
  const mockUsers = [
    {
      id: '1',
      email: 'demo@quickfood.com',
      password: 'demo123',
      name: 'Utilisateur Demo',
      subscriptionType: 'free' as const,
      freeRecipesViewed: 2,
      maxFreeRecipes: 5
    }
  ]

  useEffect(() => {
    // Vérifier si un utilisateur est déjà connecté (localStorage)
    const savedUser = localStorage.getItem('quickfood_user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulation d'une API
    const foundUser = mockUsers.find(u => u.email === email && u.password === password)
    
    if (foundUser) {
      const user: User = {
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.name,
        subscriptionType: foundUser.subscriptionType,
        freeRecipesViewed: foundUser.freeRecipesViewed,
        maxFreeRecipes: foundUser.maxFreeRecipes
      }
      
      setUser(user)
      localStorage.setItem('quickfood_user', JSON.stringify(user))
      return true
    }
    
    return false
  }

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    // Simulation d'inscription avec essai gratuit de 14 jours
    const trialStartDate = new Date()
    const trialEndDate = new Date()
    trialEndDate.setDate(trialStartDate.getDate() + 14)

    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
      subscriptionType: 'trial',
      trialStartDate,
      trialEndDate,
      freeRecipesViewed: 0,
      maxFreeRecipes: 5
    }

    setUser(newUser)
    localStorage.setItem('quickfood_user', JSON.stringify(newUser))
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('quickfood_user')
  }

  const canViewRecipe = (): boolean => {
    if (!user) return false
    
    if (user.subscriptionType === 'premium') return true
    
    if (user.subscriptionType === 'trial') {
      const now = new Date()
      if (user.trialEndDate && now <= user.trialEndDate) return true
      // Essai expiré, retour au mode gratuit
      setUser(prev => prev ? { ...prev, subscriptionType: 'free' } : null)
      return false
    }
    
    // Mode gratuit
    return user.freeRecipesViewed < user.maxFreeRecipes
  }

  const incrementRecipeView = () => {
    if (user && user.subscriptionType === 'free') {
      const updatedUser = { ...user, freeRecipesViewed: user.freeRecipesViewed + 1 }
      setUser(updatedUser)
      localStorage.setItem('quickfood_user', JSON.stringify(updatedUser))
    }
  }

  const upgradeToTrial = () => {
    if (user) {
      const trialStartDate = new Date()
      const trialEndDate = new Date()
      trialEndDate.setDate(trialStartDate.getDate() + 14)

      const updatedUser = {
        ...user,
        subscriptionType: 'trial' as const,
        trialStartDate,
        trialEndDate
      }
      
      setUser(updatedUser)
      localStorage.setItem('quickfood_user', JSON.stringify(updatedUser))
    }
  }

  const upgradeToPremium = () => {
    if (user) {
      const updatedUser = { ...user, subscriptionType: 'premium' as const }
      setUser(updatedUser)
      localStorage.setItem('quickfood_user', JSON.stringify(updatedUser))
    }
  }

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      register,
      logout,
      canViewRecipe,
      incrementRecipeView,
      upgradeToTrial,
      upgradeToPremium
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}