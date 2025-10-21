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
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"></path>
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
