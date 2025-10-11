// Products Management Module
class ProductManager {
  constructor() {
    this.allProducts = [];
    this.filteredProducts = [];
    this.currentPage = 1;
    this.isLoading = false;
  }

  // Load products from embedded data (no server required)
  async loadProducts() {
    this.isLoading = true;
    
    try {
      // Use embedded product data from products-data.js
      if (typeof PRODUCTS_DATA !== 'undefined') {
        this.allProducts = PRODUCTS_DATA;
      } else {
        // Fallback: try to fetch from JSON (requires server)
        const response = await fetch('./data/products.json');
        
        if (!response.ok) {
          throw new Error('Failed to load products');
        }
        
        this.allProducts = await response.json();
      }
      
      this.filteredProducts = [...this.allProducts];
      this.isLoading = false;
      
      return this.allProducts;
    } catch (error) {
      console.error('Error loading products:', error);
      this.isLoading = false;
      throw error;
    }
  }

  // Search products by query
  search(query) {
    if (!query || query.trim() === '') {
      this.filteredProducts = [...this.allProducts];
      return this.filteredProducts;
    }

    const searchTerm = query.toLowerCase().trim();
    
    this.filteredProducts = this.allProducts.filter(product => 
      product.code.toLowerCase().includes(searchTerm) ||
      product.name.toLowerCase().includes(searchTerm) ||
      product.nomeFornecedor.toLowerCase().includes(searchTerm)
    );
    
    this.currentPage = 1; // Reset to first page
    return this.filteredProducts;
  }

  // Filter by supplier
  filterBySupplier(supplier) {
    if (!supplier || supplier === 'all') {
      this.filteredProducts = [...this.allProducts];
      return this.filteredProducts;
    }

    this.filteredProducts = this.allProducts.filter(product => 
      product.nomeFornecedor === supplier
    );
    
    this.currentPage = 1; // Reset to first page
    return this.filteredProducts;
  }

  // Sort products
  sort(criteria) {
    switch (criteria) {
      case 'name-asc':
        this.filteredProducts.sort((a, b) => 
          a.name.localeCompare(b.name, 'pt-BR')
        );
        break;
      
      case 'name-desc':
        this.filteredProducts.sort((a, b) => 
          b.name.localeCompare(a.name, 'pt-BR')
        );
        break;
      
      case 'code-asc':
        this.filteredProducts.sort((a, b) => 
          a.code.localeCompare(b.code)
        );
        break;
      
      case 'code-desc':
        this.filteredProducts.sort((a, b) => 
          b.code.localeCompare(a.code)
        );
        break;
      
      case 'supplier':
        this.filteredProducts.sort((a, b) => 
          a.nomeFornecedor.localeCompare(b.nomeFornecedor, 'pt-BR')
        );
        break;
      
      default:
        // No sorting
        break;
    }
    
    return this.filteredProducts;
  }

  // Get unique suppliers for filter dropdown
  getSuppliers() {
    const suppliers = [...new Set(this.allProducts.map(p => p.nomeFornecedor))];
    return suppliers.sort((a, b) => a.localeCompare(b, 'pt-BR'));
  }

  // Get paginated products
  getPage(page = 1) {
    const start = (page - 1) * CONFIG.PRODUCTS_PER_PAGE;
    const end = start + CONFIG.PRODUCTS_PER_PAGE;
    
    return this.filteredProducts.slice(start, end);
  }

  // Get total pages
  getTotalPages() {
    return Math.ceil(this.filteredProducts.length / CONFIG.PRODUCTS_PER_PAGE);
  }

  // Get filtered products count
  getFilteredCount() {
    return this.filteredProducts.length;
  }

  // Get total products count
  getTotalCount() {
    return this.allProducts.length;
  }

  // Get product by code
  getProductByCode(code) {
    return this.allProducts.find(p => p.code === code);
  }

  // Load more products (for infinite scroll)
  loadMore() {
    if (this.currentPage < this.getTotalPages()) {
      this.currentPage++;
      return this.getPage(this.currentPage);
    }
    return [];
  }

  // Check if more products available
  hasMore() {
    return this.currentPage < this.getTotalPages();
  }

  // Reset filters
  resetFilters() {
    this.filteredProducts = [...this.allProducts];
    this.currentPage = 1;
    return this.filteredProducts;
  }
}

// Create global product manager instance
const productManager = new ProductManager();

