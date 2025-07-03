import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Header } from './components/Header'
import { LandingPage } from './pages/LandingPage'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { DashboardPage } from './pages/DashboardPage'
import { RecipesPage } from './pages/RecipesPage'
import { IngredientsPage } from './pages/IngredientsPage'
import { PlanningPage } from './pages/PlanningPage'
import { SubscriptionPage } from './pages/SubscriptionPage'
import { useAuth } from './hooks/useAuth'
import { AuthProvider } from './context/AuthContext'

function AppContent() {
  const { user, isAuthenticated } = useAuth()

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* Routes protégées */}
          <Route path="/dashboard" element={
            isAuthenticated ? <DashboardPage /> : <Navigate to="/login" />
          } />
          <Route path="/recipes" element={
            isAuthenticated ? <RecipesPage /> : <Navigate to="/login" />
          } />
          <Route path="/ingredients" element={
            isAuthenticated ? <IngredientsPage /> : <Navigate to="/login" />
          } />
          <Route path="/planning" element={
            isAuthenticated ? <PlanningPage /> : <Navigate to="/login" />
          } />
          <Route path="/subscription" element={
            isAuthenticated ? <SubscriptionPage /> : <Navigate to="/login" />
          } />
        </Routes>
      </main>
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  )
}

export default App