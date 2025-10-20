import React, { useState, useEffect } from 'react';
import { Product, ProductFormData } from '../../types/Product';
import './ProductForm.css';

interface ProductFormProps {
  product?: Product | null;
  onSave: (data: ProductFormData) => void;
  onCancel: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({
  product,
  onSave,
  onCancel
}) => {
  const [formData, setFormData] = useState<ProductFormData>({
    code: '',
    name: '',
    nomeFornecedor: '',
    description: '',
    imageUrl: '',
    url: ''
  });
  const [imagePreview, setImagePreview] = useState<string>('');
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (product) {
      setFormData({
        code: product.code,
        name: product.name,
        nomeFornecedor: product.nomeFornecedor,
        description: product.description,
        imageUrl: product.imageUrl,
        url: product.url
      });
      setImagePreview(product.imageUrl || '');
    }
  }, [product]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setFormData(prev => ({
      ...prev,
      imageUrl: url
    }));
    setImagePreview(url);
    
    // Clear error when user starts typing
    if (errors.imageUrl) {
      setErrors(prev => ({
        ...prev,
        imageUrl: ''
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.code.trim()) {
      newErrors.code = 'Código é obrigatório';
    }
    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }
    
    // Validate image URL format if provided
    if (formData.imageUrl.trim() && !isValidUrl(formData.imageUrl)) {
      newErrors.imageUrl = 'URL da imagem deve ser válida';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      setUploading(true);
      setErrors({}); // Clear previous errors
      
      // Ensure fornecedor is empty string if not provided
      const productData = {
        ...formData,
        nomeFornecedor: formData.nomeFornecedor.trim() || ''
      };
      
      onSave(productData);
    } catch (error) {
      console.error('Error saving product:', error);
      setErrors({ general: 'Erro ao salvar produto' });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="product-form">
      <div className="form-header">
        <h2>{product ? 'Editar Produto' : 'Novo Produto'}</h2>
        <button onClick={onCancel} className="btn btn-secondary">
          Cancelar
        </button>
      </div>

      <form onSubmit={handleSubmit} className="form-content">
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="code">Código *</label>
            <input
              type="text"
              id="code"
              name="code"
              value={formData.code}
              onChange={handleInputChange}
              className={errors.code ? 'error' : ''}
              placeholder="Ex: TG1025003"
              disabled={uploading}
            />
            {errors.code && <span className="error-text">{errors.code}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="name">Nome *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={errors.name ? 'error' : ''}
              placeholder="Ex: LAMPADA 1 POLO 24V 21W BA15S"
              disabled={uploading}
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="nomeFornecedor">Fornecedor</label>
            <input
              type="text"
              id="nomeFornecedor"
              name="nomeFornecedor"
              value={formData.nomeFornecedor}
              onChange={handleInputChange}
              className={errors.nomeFornecedor ? 'error' : ''}
              placeholder="Ex: TIGER"
              disabled={uploading}
            />
            {errors.nomeFornecedor && <span className="error-text">{errors.nomeFornecedor}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="url">URL</label>
            <input
              type="url"
              id="url"
              name="url"
              value={formData.url}
              onChange={handleInputChange}
              placeholder="https://exemplo.com/produto"
              disabled={uploading}
            />
          </div>

          <div className="form-group full-width">
            <label htmlFor="description">Descrição</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              placeholder="Descrição detalhada do produto..."
              disabled={uploading}
            />
          </div>

          <div className="form-group full-width">
            <label htmlFor="imageUrl">URL da Imagem</label>
            <input
              type="url"
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleImageUrlChange}
              className={errors.imageUrl ? 'error' : ''}
              placeholder="https://exemplo.com/imagem.jpg"
              disabled={uploading}
            />
            {errors.imageUrl && <span className="error-text">{errors.imageUrl}</span>}
            
            {imagePreview && (
              <div className="image-preview">
                <img src={imagePreview} alt="Preview" onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }} />
                <button
                  type="button"
                  onClick={() => {
                    setFormData(prev => ({ ...prev, imageUrl: '' }));
                    setImagePreview('');
                  }}
                  className="remove-image"
                >
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>

        {errors.general && (
          <div className="error-message">
            {errors.general}
          </div>
        )}

        <div className="form-actions">
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-secondary"
            disabled={uploading}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={uploading}
          >
            {uploading ? 'Salvando...' : (product ? 'Atualizar' : 'Criar')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;

