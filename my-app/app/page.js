"use client";
import React, { useState } from 'react';
import Loader from './components/Loader';
import AuthForm from './components/AuthForm';
import PacknGoUI from './components/UI'



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
    <PacknGoUI/>

  </div>
  )
}

export default App;
