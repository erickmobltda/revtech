import React, { useState, useEffect } from 'react';
import { Product } from '../types/Product';
import './SearchAndFilters.css';

interface SearchAndFiltersProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedSupplier: string;
  onSupplierChange: (supplier: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  products: Product[];
}

const SearchAndFilters: React.FC<SearchAndFiltersProps> = ({
  searchTerm,
  onSearchChange,
  selectedSupplier,
  onSupplierChange,
  sortBy,
  onSortChange,
  products
}) => {
  const [suppliers, setSuppliers] = useState<string[]>([]);

  useEffect(() => {
    // Get unique suppliers from products
    const uniqueSuppliers = [...new Set(products.map(p => p.nomeFornecedor))];
    setSuppliers(uniqueSuppliers.sort());
  }, [products]);

  const handleClearSearch = () => {
    onSearchChange('');
  };

  return (
    <div className="order-controls">
      <div className="search-box">
        <svg className="search-icon" width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
        <input 
          type="text" 
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input" 
          placeholder="Buscar por código, nome ou fornecedor..."
          aria-label="Buscar produtos"
        />
        {searchTerm && (
          <button 
            className="clear-search" 
            onClick={handleClearSearch}
            aria-label="Limpar busca"
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        )}
      </div>

      <div className="filters">
        <select 
          value={selectedSupplier}
          onChange={(e) => onSupplierChange(e.target.value)}
          className="filter-select" 
          aria-label="Filtrar por fornecedor"
        >
          <option value="all">Todos os Fornecedores</option>
          {suppliers.map(supplier => (
            <option key={supplier} value={supplier}>
              {supplier}
            </option>
          ))}
        </select>

        <select 
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="filter-select" 
          aria-label="Ordenar produtos"
        >
          <option value="">Ordenar por</option>
          <option value="name-asc">Nome (A-Z)</option>
          <option value="name-desc">Nome (Z-A)</option>
          <option value="code-asc">Código (A-Z)</option>
          <option value="code-desc">Código (Z-A)</option>
          <option value="supplier">Fornecedor</option>
        </select>
      </div>
    </div>
  );
};

export default SearchAndFilters;
