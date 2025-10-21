import React from 'react';
import './FloatingCartButton.css';

interface FloatingCartButtonProps {
  itemCount: number;
  onClick: () => void;
  isCartOpen?: boolean;
}

const FloatingCartButton: React.FC<FloatingCartButtonProps> = ({ itemCount, onClick, isCartOpen = false }) => {
  if (itemCount === 0 || isCartOpen) return null;

  return (
    <button 
      className="floating-cart-button"
      onClick={onClick}
      aria-label="Ver pedido"
    >
      <div className="cart-icon">
        <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
        </svg>
        {itemCount > 0 && (
          <span className="cart-badge">{itemCount}</span>
        )}
      </div>
      <span className="cart-text">Ver pedido</span>
    </button>
  );
};

export default FloatingCartButton;
