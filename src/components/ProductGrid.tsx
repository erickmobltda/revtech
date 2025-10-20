import React from 'react';
import { Product } from '../types/Product';
import './ProductGrid.css';

interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, onAddToCart }) => {
  if (products.length === 0) {
    return (
      <div className="no-products">
        <svg width="64" height="64" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <p>Nenhum produto encontrado</p>
        <small>Tente ajustar os filtros de busca</small>
      </div>
    );
  }

  const PLACEHOLDER = `${process.env.PUBLIC_URL}/images/placeholder.svg`;
  const normalizeImageUrl = (url?: string) => {
    if (!url) return PLACEHOLDER;
    if (/localhost:\d+/.test(url)) return PLACEHOLDER;
    if (url.endsWith('/images/placeholder.svg')) return PLACEHOLDER;
    return url;
  };

  return (
    <div className="products-grid">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <div className="product-image">
            <img 
              src={normalizeImageUrl(product.imageUrl)} 
              alt={product.name}
              loading="lazy"
              decoding="async"
              onError={({ currentTarget: target }) => {
                (target as HTMLImageElement).onerror = null;
                (target as HTMLImageElement).src = PLACEHOLDER;
              }}
            />
          </div>
          <div className="product-info">
            <div className="product-code">{product.code}</div>
            <h3 className="product-name">{product.name}</h3>
            <div className="product-supplier">{product.nomeFornecedor}</div>
          </div>
          <button 
            className="add-to-cart-btn" 
            onClick={() => onAddToCart(product)}
            aria-label="Adicionar ao carrinho"
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
            </svg>
            <span>Adicionar</span>
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
