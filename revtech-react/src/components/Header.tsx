import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User } from 'firebase/auth';
import { AuthService } from '../services/authService';
import './Header.css';

interface HeaderProps {
  user: User | null;
}

const Header: React.FC<HeaderProps> = ({ user }) => {
  const [cartCount, setCartCount] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await AuthService.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header className="header">
      <div className="container">
        <nav className="navbar">
          <div className="logo">
            <Link to="/">
              <img src="/images/logo-revtech.svg" alt="REVTECH Logo" />
            </Link>
          </div>
          
          <ul className="nav-menu">
            <li><a href="#home">Início</a></li>
            <li><a href="#about">Sobre</a></li>
            <li><a href="#services">Serviços</a></li>
            <li><a href="#order">Fazer Pedido</a></li>
            <li><a href="#contact">Contato</a></li>
          </ul>

          <div className="nav-actions">
            <button 
              className="cart-toggle" 
              onClick={() => setIsCartOpen(true)}
              aria-label="Abrir carrinho"
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
              {cartCount > 0 && (
                <span className="cart-badge">{cartCount}</span>
              )}
            </button>

            {user ? (
              <div className="admin-actions">
                <Link to="/admin" className="admin-link">
                  Admin
                </Link>
                <button onClick={handleSignOut} className="btn btn-secondary">
                  Sair
                </button>
              </div>
            ) : (
              <Link to="/admin/login" className="admin-link">
                Admin
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
