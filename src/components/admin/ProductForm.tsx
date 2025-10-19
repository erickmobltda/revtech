import React, { useState, useEffect } from 'react';
import { Product, ProductFormData } from '../../types/Product';
import { ProductService } from '../../services/productService';
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
  const [imageFile, setImageFile] = useState<File | undefined>(undefined);
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
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
    if (!formData.nomeFornecedor.trim()) {
      newErrors.nomeFornecedor = 'Fornecedor é obrigatório';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      setUploading(true);
      
      let imageUrl = formData.imageUrl;
      
      // Upload new image if provided
      if (imageFile) {
        const productId = product?.id || 'temp';
        imageUrl = await ProductService.uploadProductImage(imageFile, productId);
      }

      onSave({
        ...formData,
        imageUrl,
        imageFile
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      setErrors({ image: 'Erro ao fazer upload da imagem' });
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
            <label htmlFor="nomeFornecedor">Fornecedor *</label>
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
            <label htmlFor="image">Imagem do Produto</label>
            <div className="image-upload">
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
                disabled={uploading}
                className="file-input"
              />
              <label htmlFor="image" className="file-label">
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                {imageFile ? 'Alterar Imagem' : 'Selecionar Imagem'}
              </label>
            </div>
            
            {imagePreview && (
              <div className="image-preview">
                <img src={imagePreview} alt="Preview" />
                <button
                  type="button"
                  onClick={() => {
                    setImageFile(undefined);
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
            
            {errors.image && <span className="error-text">{errors.image}</span>}
          </div>
        </div>

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
