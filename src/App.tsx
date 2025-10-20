import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthService } from './services/authService';
import { User } from 'firebase/auth';
import Header from './components/Header';
import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import './App.css';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = AuthService.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <Router basename={process.env.NODE_ENV === 'production' ? '/revtech' : '/'}>
      <div className="App">
        <Header user={user} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route 
            path="/admin/login" 
            element={user ? <Navigate to="/admin" /> : <AdminLogin />} 
          />
          <Route 
            path="/admin" 
            element={user ? <AdminDashboard /> : <Navigate to="/admin/login" />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
