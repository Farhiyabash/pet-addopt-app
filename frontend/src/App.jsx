import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';
import PetsPage from './pages/PetsPage';
import AdoptionsPage from './pages/AdoptionsPage';
import PetDetails from './components/PetDetails'; // Import the PetDetails page
import PrivateRoute from './components/PrivateRoute';
import HomeNavbar from './components/HomeNavbar';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div>
        {isAuthenticated && <HomeNavbar setIsAuthenticated={setIsAuthenticated} />}
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route 
            path="/login" 
            element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} 
          />
          <Route path="/signup" element={<SignupPage />} />

          {/* Protected routes */}
          <Route 
            path="/profile" 
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/pets" 
            element={
              <PrivateRoute>
                <PetsPage />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/adoptions" 
            element={
              <PrivateRoute>
                <AdoptionsPage />
              </PrivateRoute>
            } 
          />

          {/* Pet Details route */}
          <Route 
            path="/pets/:id" 
            element={
              <PrivateRoute>
                <PetDetails /> {/* PetDetails component for specific pet */}
              </PrivateRoute>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
