import React, { useState, useEffect, useCallback } from 'react';
import { ProductService } from '../services/productService';
import { Product } from '../types/Product';
import ProductGrid from '../components/ProductGrid';
import SearchAndFilters from '../components/SearchAndFilters';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import Contact from '../components/Contact';
import './Home.css';

interface HomeProps {
  onAddToCart: (product: Product) => void;
  onRemoveFromCart: (productId: string) => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  cartItems: Product[];
}

const Home: React.FC<HomeProps> = ({ onAddToCart, onRemoveFromCart, onUpdateQuantity, cartItems }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSupplier, setSelectedSupplier] = useState('all');
  const [sortBy, setSortBy] = useState('');

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await ProductService.getProducts();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar produtos');
      console.error('Error loading products:', err);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortProducts = useCallback(() => {
    let filtered = [...products];

    // Apply search filter
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(product =>
        product.code.toLowerCase().includes(term) ||
        product.name.toLowerCase().includes(term) ||
        (product.nomeFornecedor && product.nomeFornecedor.toLowerCase().includes(term))
      );
    }

    // Apply supplier filter
    if (selectedSupplier !== 'all') {
      filtered = filtered.filter(product => product.nomeFornecedor === selectedSupplier);
    }

    // Apply sorting
    if (sortBy) {
      switch (sortBy) {
        case 'name-asc':
          filtered.sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));
          break;
        case 'name-desc':
          filtered.sort((a, b) => b.name.localeCompare(a.name, 'pt-BR'));
          break;
        case 'code-asc':
          filtered.sort((a, b) => a.code.localeCompare(b.code));
          break;
        case 'code-desc':
          filtered.sort((a, b) => b.code.localeCompare(b.code));
          break;
        case 'supplier':
          filtered.sort((a, b) => a.nomeFornecedor.localeCompare(b.nomeFornecedor, 'pt-BR'));
          break;
      }
    }

    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedSupplier, sortBy]);

  useEffect(() => {
    filterAndSortProducts();
  }, [filterAndSortProducts]);


  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Carregando produtos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <p>{error}</p>
        <button onClick={loadProducts} className="btn btn-primary">
          Tentar Novamente
        </button>
      </div>
    );
  }

  return (
    <div className="home">
      <Hero />
      <About />
      <Services />
      
      <section className="section" id="order">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Faça seu Pedido</h2>
            <p className="section-subtitle">Busque, selecione e peça via WhatsApp</p>
          </div>

          <SearchAndFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedSupplier={selectedSupplier}
            onSupplierChange={setSelectedSupplier}
            sortBy={sortBy}
            onSortChange={setSortBy}
            products={products}
          />

          <div className="results-info">
            <span>{filteredProducts.length} produtos encontrados</span>
          </div>

          <ProductGrid
            products={filteredProducts}
            onAddToCart={onAddToCart}
            onRemoveFromCart={onRemoveFromCart}
            onUpdateQuantity={onUpdateQuantity}
            cartItems={cartItems}
          />
        </div>
      </section>

      <Contact />
    </div>
  );
};

export default Home;
