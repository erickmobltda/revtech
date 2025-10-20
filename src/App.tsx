import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthService } from './services/authService';
import { User } from 'firebase/auth';
import { Product } from './types/Product';
import Header from './components/Header';
import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import Cart from './components/Cart';
import './App.css';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = AuthService.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleAddToCart = (product: Product) => {
    console.log('Adding product to cart:', product);
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
    console.log('Opening cart...');
    setIsCartOpen(true); // Auto-open cart when item is added
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
      if (item.nomeFornecedor) {
        message += `   *Fornecedor:* ${item.nomeFornecedor}\n`;
      }
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
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <Router basename={process.env.NODE_ENV === 'production' ? '/revtech' : '/'}>
      <div className="App">
        <Header 
          user={user} 
          cartCount={cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0)}
          onCartOpen={() => setIsCartOpen(true)}
        />
        <Routes>
          <Route path="/" element={<Home onAddToCart={handleAddToCart} />} />
          <Route 
            path="/admin/login" 
            element={user ? <Navigate to="/admin" /> : <AdminLogin />} 
          />
          <Route 
            path="/admin" 
            element={user ? <AdminDashboard /> : <Navigate to="/admin/login" />} 
          />
        </Routes>
        
        <Cart
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={cartItems}
          onRemove={handleRemoveFromCart}
          onUpdateQuantity={handleUpdateQuantity}
          onSendOrder={handleSendOrder}
        />
      </div>
    </Router>
  );
}

export default App;
