import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductService } from '../services/productService';
import { Product, ProductFormData } from '../types/Product';
import ProductList from '../components/admin/ProductList';
import ProductForm from '../components/admin/ProductForm';
import './AdminDashboard.css';

const AdminDashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  // const navigate = useNavigate(); // TODO: Implement navigation if needed

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await ProductService.getProducts();
      setProducts(data);
      setError('');
    } catch (err) {
      setError('Erro ao carregar produtos');
      console.error('Error loading products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProduct = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDeleteProduct = async (productId: string) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      try {
        await ProductService.deleteProduct(productId);
        await loadProducts();
      } catch (err) {
        setError('Erro ao excluir produto');
        console.error('Error deleting product:', err);
      }
    }
  };

  const handleSaveProduct = async (productData: ProductFormData) => {
    try {
      if (editingProduct) {
        // Update existing product
        await ProductService.updateProduct(editingProduct.id!, {
          ...productData,
          imageUrl: productData.imageUrl || editingProduct.imageUrl
        });
      } else {
        // Create new product
        await ProductService.createProduct({
          ...productData,
          imageUrl: productData.imageUrl || ''
        });
      }
      
      await loadProducts();
      setShowForm(false);
      setEditingProduct(null);
    } catch (err) {
      setError('Erro ao salvar produto');
      console.error('Error saving product:', err);
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  if (loading) {
    return (
      <div className="admin-dashboard">
        <div className="loading">
          <div className="spinner"></div>
          <p>Carregando produtos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <div className="admin-nav">
          <h1>Painel Administrativo</h1>
          <div className="admin-actions">
            <button 
              onClick={handleCreateProduct}
              className="btn btn-primary"
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
              </svg>
              Novo Produto
            </button>
            <a href="/" className="btn btn-secondary">
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
              Voltar ao Site
            </a>
          </div>
        </div>
      </div>

      <div className="admin-content">
        {error && (
          <div className="error-message">
            {error}
            <button onClick={() => setError('')} className="close-error">
              ×
            </button>
          </div>
        )}

        {showForm ? (
          <ProductForm
            product={editingProduct}
            onSave={handleSaveProduct}
            onCancel={handleCancelForm}
          />
        ) : (
          <ProductList
            products={products}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
            onRefresh={loadProducts}
          />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
