import React, { useState, useEffect } from 'react';
import { ProductService } from '../services/productService';
import { Product } from '../types/Product';
import ProductGrid from '../components/ProductGrid';
import SearchAndFilters from '../components/SearchAndFilters';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import Contact from '../components/Contact';
import Cart from '../components/Cart';
import './Home.css';

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSupplier, setSelectedSupplier] = useState('all');
  const [sortBy, setSortBy] = useState('');
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    filterAndSortProducts();
  }, [products, searchTerm, selectedSupplier, sortBy, filterAndSortProducts]);

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

  const filterAndSortProducts = () => {
    let filtered = [...products];

    // Apply search filter
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(product =>
        product.code.toLowerCase().includes(term) ||
        product.name.toLowerCase().includes(term) ||
        product.nomeFornecedor.toLowerCase().includes(term)
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
  };

  const handleAddToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const generateWhatsAppMessage = () => {
    if (cartItems.length === 0) return '';

    let message = `🛒 *Novo Pedido - REVTECH REPRESENTAÇÃO*\n\n📝 *Produtos:*\n\n`;
    
    cartItems.forEach((item, index) => {
      message += `${index + 1}. *Código:* ${item.code}\n`;
      message += `   *Nome:* ${item.name}\n`;
      message += `   *Fornecedor:* ${item.nomeFornecedor}\n`;
      message += `   *Quantidade:* ${item.quantity || 1}\n\n`;
    });
    
    const totalItems = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
    message += `---\n📦 *Total de Itens:* ${totalItems}\n\n`;
    message += `ℹ️ _Pedido gerado automaticamente pelo site_`;
    
    return message;
  };

  const handleSendOrder = () => {
    const message = generateWhatsAppMessage();
    if (message) {
      const encodedMessage = encodeURIComponent(message);
      const whatsappLink = `https://wa.me/5547984293996?text=${encodedMessage}`;
      window.open(whatsappLink, '_blank');
    }
  };

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
            onAddToCart={handleAddToCart}
          />
        </div>
      </section>

      <Contact />

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemove={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantity}
        onSendOrder={handleSendOrder}
      />
    </div>
  );
};

export default Home;
