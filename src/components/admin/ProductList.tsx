import React, { useState } from 'react';
import { Product } from '../../types/Product';
import './ProductList.css';

interface ProductListProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (productId: string) => void;
  onRefresh: () => void;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  onEdit,
  onDelete,
  onRefresh
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');

  const filteredProducts = products
    .filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.nomeFornecedor.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name, 'pt-BR');
        case 'code':
          return a.code.localeCompare(b.code);
        case 'supplier':
          return a.nomeFornecedor.localeCompare(b.nomeFornecedor, 'pt-BR');
        default:
          return 0;
      }
    });

  return (
    <div className="product-list">
      <div className="list-header">
        <div className="list-controls">
          <div className="search-box">
            <svg className="search-icon" width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            <input
              type="text"
              placeholder="Buscar produtos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="name">Ordenar por Nome</option>
            <option value="code">Ordenar por Código</option>
            <option value="supplier">Ordenar por Fornecedor</option>
          </select>

          <button onClick={onRefresh} className="btn btn-secondary">
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
            Atualizar
          </button>
        </div>

        <div className="list-info">
          <span>{filteredProducts.length} produtos encontrados</span>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="empty-state">
          <svg width="64" height="64" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
          </svg>
          <h3>Nenhum produto encontrado</h3>
          <p>Não há produtos que correspondam aos critérios de busca.</p>
        </div>
      ) : (
        <div className="products-table">
          <div className="table-header">
            <div className="col-image">Imagem</div>
            <div className="col-code">Código</div>
            <div className="col-name">Nome</div>
            <div className="col-supplier">Fornecedor</div>
            <div className="col-actions">Ações</div>
          </div>

          {filteredProducts.map((product) => (
            <div key={product.id} className="table-row">
              <div className="col-image">
                <img
                  src={product.imageUrl || `${process.env.PUBLIC_URL}/images/placeholder.svg`}
                  onError={({ currentTarget: target }) => {
                    // prevent infinite loop if placeholder is missing
                    (target as HTMLImageElement).onerror = null;
                    (target as HTMLImageElement).src = `${process.env.PUBLIC_URL}/images/placeholder.svg`;
                  }}
                  alt={product.name}
                  className="product-thumb"
                />
              </div>
              <div className="col-code">
                <span className="product-code">{product.code}</span>
              </div>
              <div className="col-name">
                <span className="product-name">{product.name}</span>
              </div>
              <div className="col-supplier">
                <span className="product-supplier">
                  {product.nomeFornecedor || <em>Não especificado</em>}
                </span>
              </div>
              <div className="col-actions">
                <button
                  onClick={() => onEdit(product)}
                  className="btn-edit"
                  title="Editar produto"
                >
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                  </svg>
                </button>
                <button
                  onClick={() => onDelete(product.id!)}
                  className="btn-delete"
                  title="Excluir produto"
                >
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
