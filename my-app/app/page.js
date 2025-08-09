"use client";
import React, { useState } from 'react';
import Loader from './components/Loader';
import AuthForm from './components/AuthForm';
import Dashboard from './components/Dashboard';
import TravelPlanner from './components/Budget';

function App() {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleAuthComplete = (authData) => {
    setUser(authData.user);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <Loader onComplete={handleLoadingComplete} />;
  }

  if (!isAuthenticated) {
    return <AuthForm onAuthComplete={handleAuthComplete} />;
  }

  return ( 
  <div>
  
  <Dashboard user={user} onLogout={handleLogout} />
  
  <TravelPlanner />
  </div>
  )
}

export default App;
