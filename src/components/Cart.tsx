import React from 'react';
import { Product } from '../types/Product';
import './Cart.css';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: Product[];
  onRemove: (productId: string) => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onSendOrder: () => void;
}

const Cart: React.FC<CartProps> = ({
  isOpen,
  onClose,
  items,
  onRemove,
  onUpdateQuantity,
  onSendOrder
}) => {
  console.log('Cart component props:', { isOpen, itemsCount: items.length, items });
  console.log('Cart items details:', items.map(item => ({ id: item.id, name: item.name, quantity: item.quantity })));
  const totalItems = items.reduce((sum, item) => sum + (item.quantity || 1), 0);

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      onRemove(productId);
    } else {
      onUpdateQuantity(productId, newQuantity);
    }
  };

  const handleClearCart = () => {
    if (window.confirm('Deseja limpar todos os itens do pedido?')) {
      items.forEach(item => onRemove(item.id!));
    }
  };

  return (
    <>
      <div className={`cart-overlay ${isOpen ? 'active' : ''}`} onClick={onClose}></div>
      <div className={`cart-panel ${isOpen ? 'active' : ''}`}>
        <div className="cart-header">
          <h3>Meu Pedido</h3>
          <button className="close-cart" onClick={onClose} aria-label="Fechar pedido">
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <div className="cart-body">
          {items.length === 0 ? (
            <div className="cart-empty">
              <svg width="64" height="64" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
              </svg>
              <p>Seu pedido está vazio</p>
              <small>Adicione produtos para fazer seu pedido</small>
            </div>
          ) : (
            <div className="cart-items">
              {items.map((item) => (
                <div key={item.id} className="cart-item">
                  <img 
                    src={item.imageUrl || `${process.env.PUBLIC_URL}/images/placeholder.svg`} 
                    alt={item.name || 'Imagem do produto'}
                    onError={({ currentTarget: target }) => {
                      (target as HTMLImageElement).onerror = null;
                      (target as HTMLImageElement).src = `${process.env.PUBLIC_URL}/images/placeholder.svg`;
                    }}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="cart-item-info">
                    <div className="cart-item-code">{item.code}</div>
                    <div className="cart-item-name">{item.name}</div>
                    {item.nomeFornecedor && (
                      <div className="cart-item-supplier">{item.nomeFornecedor}</div>
                    )}
                  </div>
                  <div className="cart-item-controls">
                    <div className="quantity-controls">
                      <button 
                        className="qty-btn qty-minus" 
                        onClick={() => handleQuantityChange(item.id!, (item.quantity || 1) - 1)}
                        aria-label="Diminuir quantidade"
                      >
                        −
                      </button>
                      <input 
                        type="number" 
                        className="qty-input" 
                        value={item.quantity || 1}
                        min="1"
                        max="99"
                        onChange={(e) => handleQuantityChange(item.id!, parseInt(e.target.value) || 1)}
                      />
                      <button 
                        className="qty-btn qty-plus" 
                        onClick={() => handleQuantityChange(item.id!, (item.quantity || 1) + 1)}
                        aria-label="Aumentar quantidade"
                      >
                        +
                      </button>
                    </div>
                    <button 
                      className="remove-btn" 
                      onClick={() => onRemove(item.id!)}
                      aria-label="Remover item"
                    >
                      <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>Total de itens:</span>
              <strong>{totalItems}</strong>
            </div>
            
            <button className="btn btn-secondary btn-block" onClick={handleClearCart}>
              Limpar Pedido
            </button>
            
            <button className="btn btn-whatsapp btn-block" onClick={onSendOrder}>
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Enviar Pedido
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
