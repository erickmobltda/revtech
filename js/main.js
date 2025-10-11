// Main Application Logic
class App {
  constructor() {
    this.currentView = 'all'; // 'all' or limited view
    this.searchTimeout = null;
  }

  // Initialize application
  async init() {
    try {
      // Show loading state
      this.showLoading();

      // Load products
      await productManager.loadProducts();

      // Initialize UI
      this.initializeUI();
      this.setupEventListeners();
      this.renderProducts();
      this.updateCart();

      // Subscribe to cart changes
      cart.subscribe(() => this.updateCart());

      // Hide loading state
      this.hideLoading();
    } catch (error) {
      console.error('Error initializing app:', error);
      this.showError(CONFIG.MESSAGES.ERROR_LOADING);
    }
  }

  // Initialize UI elements
  initializeUI() {
    // Populate supplier filter
    this.populateSupplierFilter();

    // Set initial cart count
    this.updateCartCount();

    // Smooth scroll for navigation
    this.setupSmoothScroll();
  }

  // Setup event listeners
  setupEventListeners() {
    // Search input
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        clearTimeout(this.searchTimeout);
        this.searchTimeout = setTimeout(() => {
          this.handleSearch(e.target.value);
        }, 300);
      });
    }

    // Clear search button
    const clearSearchBtn = document.getElementById('clearSearch');
    if (clearSearchBtn) {
      clearSearchBtn.addEventListener('click', () => {
        searchInput.value = '';
        this.handleSearch('');
      });
    }

    // Supplier filter
    const supplierFilter = document.getElementById('supplierFilter');
    if (supplierFilter) {
      supplierFilter.addEventListener('change', (e) => {
        this.handleSupplierFilter(e.target.value);
      });
    }

    // Sort dropdown
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        this.handleSort(e.target.value);
      });
    }

    // Cart toggle
    const cartToggle = document.getElementById('cartToggle');
    const cartPanel = document.getElementById('cartPanel');
    const closeCart = document.getElementById('closeCart');
    
    if (cartToggle && cartPanel) {
      cartToggle.addEventListener('click', () => {
        cartPanel.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    }

    if (closeCart && cartPanel) {
      closeCart.addEventListener('click', () => {
        cartPanel.classList.remove('active');
        document.body.style.overflow = '';
      });
    }

    // Close cart when clicking overlay
    if (cartPanel) {
      cartPanel.addEventListener('click', (e) => {
        if (e.target === cartPanel) {
          cartPanel.classList.remove('active');
          document.body.style.overflow = '';
        }
      });
    }

    // Clear cart button
    const clearCartBtn = document.getElementById('clearCart');
    if (clearCartBtn) {
      clearCartBtn.addEventListener('click', () => {
        if (confirm('Deseja limpar todos os itens do carrinho?')) {
          cart.clear();
        }
      });
    }

    // Send order button
    const sendOrderBtn = document.getElementById('sendOrder');
    if (sendOrderBtn) {
      sendOrderBtn.addEventListener('click', () => {
        this.handleSendOrder();
      });
    }

    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuBtn && mobileMenu) {
      mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        // Toggle body scroll when menu is open
        if (mobileMenu.classList.contains('active')) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = '';
        }
      });

      // Close mobile menu when clicking on links
      mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          mobileMenu.classList.remove('active');
          document.body.style.overflow = '';
        });
      });

      // Close mobile menu when clicking outside
      document.addEventListener('click', (e) => {
        if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
          mobileMenu.classList.remove('active');
          document.body.style.overflow = '';
        }
      });
    }

    // Load more button (if pagination used)
    const loadMoreBtn = document.getElementById('loadMore');
    if (loadMoreBtn) {
      loadMoreBtn.addEventListener('click', () => {
        this.loadMoreProducts();
      });
    }

    // Show all button
    const showAllBtn = document.getElementById('showAll');
    if (showAllBtn) {
      showAllBtn.addEventListener('click', () => {
        this.currentView = 'all';
        this.renderProducts();
        showAllBtn.style.display = 'none';
      });
    }
  }

  // Setup smooth scroll for anchor links
  setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        }
      });
    });
  }

  // Handle search
  handleSearch(query) {
    productManager.search(query);
    this.renderProducts();
    this.updateResultsCount();
  }

  // Handle supplier filter
  handleSupplierFilter(supplier) {
    productManager.filterBySupplier(supplier);
    this.renderProducts();
    this.updateResultsCount();
  }

  // Handle sort
  handleSort(criteria) {
    productManager.sort(criteria);
    this.renderProducts();
  }

  // Populate supplier filter dropdown
  populateSupplierFilter() {
    const supplierFilter = document.getElementById('supplierFilter');
    if (!supplierFilter) return;

    const suppliers = productManager.getSuppliers();
    
    suppliers.forEach(supplier => {
      const option = document.createElement('option');
      option.value = supplier;
      option.textContent = supplier;
      supplierFilter.appendChild(option);
    });
  }

  // Render products
  renderProducts() {
    const container = document.getElementById('productsGrid');
    if (!container) return;

    const products = this.currentView === 'all' 
      ? productManager.filteredProducts 
      : productManager.getPage(1);

    if (products.length === 0) {
      container.innerHTML = `
        <div class="no-products">
          <svg width="64" height="64" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <p>${CONFIG.MESSAGES.NO_PRODUCTS_FOUND}</p>
        </div>
      `;
      return;
    }

    container.innerHTML = products.map(product => this.createProductCard(product)).join('');

    // Add event listeners to add-to-cart buttons
    container.querySelectorAll('.add-to-cart-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const productCode = e.currentTarget.dataset.code;
        const product = productManager.getProductByCode(productCode);
        if (product) {
          this.addToCart(product, e.currentTarget);
        }
      });
    });

    // Show/hide "Show All" button
    const showAllBtn = document.getElementById('showAll');
    if (showAllBtn && this.currentView !== 'all' && productManager.hasMore()) {
      showAllBtn.style.display = 'block';
    }
  }

  // Create product card HTML
  createProductCard(product) {
    return `
      <div class="product-card" data-code="${product.code}">
        <div class="product-image">
          <img 
            src="${product.imageUrl}" 
            alt="${product.name}"
            loading="lazy"
            onerror="this.src='${CONFIG.DEFAULT_PRODUCT_IMAGE}'"
          />
        </div>
        <div class="product-info">
          <div class="product-code">${product.code}</div>
          <h3 class="product-name">${product.name}</h3>
          <div class="product-supplier">${product.nomeFornecedor}</div>
        </div>
        <button class="add-to-cart-btn" data-code="${product.code}" aria-label="Adicionar ao carrinho">
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
          </svg>
          <span>Adicionar</span>
        </button>
      </div>
    `;
  }

  // Add product to cart with animation
  addToCart(product, button) {
    cart.add(product);
    
    // Visual feedback
    button.classList.add('added');
    setTimeout(() => {
      button.classList.remove('added');
    }, 1000);

    // Show toast notification
    this.showToast(CONFIG.MESSAGES.ADD_TO_CART_SUCCESS);
  }

  // Update cart display
  updateCart() {
    this.updateCartCount();
    this.renderCartItems();
  }

  // Update cart count badge
  updateCartCount() {
    const badge = document.getElementById('cartCount');
    const count = cart.getTotalItems();
    
    if (badge) {
      badge.textContent = count;
      badge.style.display = count > 0 ? 'flex' : 'none';
    }
  }

  // Render cart items
  renderCartItems() {
    const container = document.getElementById('cartItems');
    const emptyState = document.getElementById('cartEmpty');
    const cartFooter = document.getElementById('cartFooter');
    
    if (!container) return;

    const items = cart.getItems();

    if (items.length === 0) {
      container.innerHTML = '';
      if (emptyState) emptyState.style.display = 'block';
      if (cartFooter) cartFooter.style.display = 'none';
      return;
    }

    if (emptyState) emptyState.style.display = 'none';
    if (cartFooter) cartFooter.style.display = 'block';

    container.innerHTML = items.map(item => this.createCartItem(item)).join('');

    // Update total items count
    const totalEl = document.getElementById('totalItems');
    if (totalEl) {
      totalEl.textContent = cart.getTotalItems();
    }

    // Add event listeners to cart item controls
    this.setupCartItemListeners();
  }

  // Create cart item HTML
  createCartItem(item) {
    return `
      <div class="cart-item" data-code="${item.code}">
        <img src="${item.imageUrl}" alt="${item.name}" onerror="this.src='${CONFIG.DEFAULT_PRODUCT_IMAGE}'">
        <div class="cart-item-info">
          <div class="cart-item-code">${item.code}</div>
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-supplier">${item.nomeFornecedor}</div>
        </div>
        <div class="cart-item-controls">
          <div class="quantity-controls">
            <button class="qty-btn qty-minus" data-code="${item.code}" aria-label="Diminuir quantidade">−</button>
            <input type="number" class="qty-input" value="${item.quantity}" min="${CONFIG.MIN_QUANTITY}" max="${CONFIG.MAX_QUANTITY}" data-code="${item.code}">
            <button class="qty-btn qty-plus" data-code="${item.code}" aria-label="Aumentar quantidade">+</button>
          </div>
          <button class="remove-btn" data-code="${item.code}" aria-label="Remover item">
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </div>
    `;
  }

  // Setup cart item event listeners
  setupCartItemListeners() {
    // Quantity minus buttons
    document.querySelectorAll('.qty-minus').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const code = e.currentTarget.dataset.code;
        cart.decrementQuantity(code);
      });
    });

    // Quantity plus buttons
    document.querySelectorAll('.qty-plus').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const code = e.currentTarget.dataset.code;
        cart.incrementQuantity(code);
      });
    });

    // Quantity input
    document.querySelectorAll('.qty-input').forEach(input => {
      input.addEventListener('change', (e) => {
        const code = e.currentTarget.dataset.code;
        const value = e.currentTarget.value;
        if (!cart.updateQuantity(code, value)) {
          // Reset to current value if invalid
          e.currentTarget.value = cart.getItems().find(i => i.code === code)?.quantity || 1;
        }
      });
    });

    // Remove buttons
    document.querySelectorAll('.remove-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const code = e.currentTarget.dataset.code;
        cart.remove(code);
      });
    });
  }

  // Handle send order
  handleSendOrder() {
    if (cart.isEmpty()) {
      this.showToast(CONFIG.MESSAGES.CART_VALIDATION_ERROR, 'error');
      return;
    }

    const whatsappLink = cart.generateWhatsAppLink();
    
    if (whatsappLink) {
      this.showToast(CONFIG.MESSAGES.WHATSAPP_REDIRECT, 'success');
      
      // Open WhatsApp in new tab
      setTimeout(() => {
        window.open(whatsappLink, '_blank');
      }, 500);
    }
  }

  // Update results count
  updateResultsCount() {
    const countEl = document.getElementById('resultsCount');
    if (countEl) {
      const count = productManager.getFilteredCount();
      countEl.textContent = `${count} ${CONFIG.MESSAGES.PRODUCTS_FOUND}`;
    }
  }

  // Show loading state
  showLoading() {
    const container = document.getElementById('productsGrid');
    if (container) {
      container.innerHTML = `
        <div class="loading-state">
          <div class="spinner"></div>
          <p>${CONFIG.MESSAGES.LOADING}</p>
        </div>
      `;
    }
  }

  // Hide loading state
  hideLoading() {
    // Loading is hidden when products are rendered
  }

  // Show error message
  showError(message) {
    const container = document.getElementById('productsGrid');
    if (container) {
      container.innerHTML = `
        <div class="error-state">
          <svg width="64" height="64" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <p>${message}</p>
          <button onclick="location.reload()" class="retry-btn">Tentar Novamente</button>
        </div>
      `;
    }
  }

  // Show toast notification
  showToast(message, type = 'success') {
    // Remove existing toasts
    document.querySelectorAll('.toast').forEach(t => t.remove());

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    // Animate in
    setTimeout(() => toast.classList.add('show'), 10);

    // Remove after 3 seconds
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  // Load more products (for pagination)
  loadMoreProducts() {
    const moreProducts = productManager.loadMore();
    if (moreProducts.length > 0) {
      const container = document.getElementById('productsGrid');
      const newCards = moreProducts.map(p => this.createProductCard(p)).join('');
      container.insertAdjacentHTML('beforeend', newCards);

      // Re-attach event listeners to new cards
      container.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        if (!btn.hasAttribute('data-listener')) {
          btn.setAttribute('data-listener', 'true');
          btn.addEventListener('click', (e) => {
            const productCode = e.currentTarget.dataset.code;
            const product = productManager.getProductByCode(productCode);
            if (product) {
              this.addToCart(product, e.currentTarget);
            }
          });
        }
      });
    }

    // Hide load more button if no more products
    const loadMoreBtn = document.getElementById('loadMore');
    if (loadMoreBtn && !productManager.hasMore()) {
      loadMoreBtn.style.display = 'none';
    }
  }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  app.init();
});

