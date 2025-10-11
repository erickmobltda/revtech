// Cart Management Module
class ShoppingCart {
  constructor() {
    this.items = this.loadFromStorage();
    this.listeners = [];
  }

  // Load cart from localStorage
  loadFromStorage() {
    try {
      const stored = localStorage.getItem(CONFIG.CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading cart from storage:', error);
      return [];
    }
  }

  // Save cart to localStorage
  save() {
    try {
      localStorage.setItem(CONFIG.CART_STORAGE_KEY, JSON.stringify(this.items));
      this.notifyListeners();
    } catch (error) {
      console.error('Error saving cart to storage:', error);
    }
  }

  // Add product to cart
  add(product) {
    const existing = this.items.find(item => item.code === product.code);
    
    if (existing) {
      existing.quantity += 1;
    } else {
      this.items.push({
        code: product.code,
        name: product.name,
        nomeFornecedor: product.nomeFornecedor,
        imageUrl: product.imageUrl,
        quantity: 1
      });
    }
    
    this.save();
    return true;
  }

  // Remove product from cart
  remove(productCode) {
    this.items = this.items.filter(item => item.code !== productCode);
    this.save();
  }

  // Update quantity
  updateQuantity(productCode, quantity) {
    const item = this.items.find(item => item.code === productCode);
    
    if (item) {
      const newQuantity = parseInt(quantity);
      
      if (newQuantity >= CONFIG.MIN_QUANTITY && newQuantity <= CONFIG.MAX_QUANTITY) {
        item.quantity = newQuantity;
        this.save();
        return true;
      }
    }
    
    return false;
  }

  // Increment quantity
  incrementQuantity(productCode) {
    const item = this.items.find(item => item.code === productCode);
    
    if (item && item.quantity < CONFIG.MAX_QUANTITY) {
      item.quantity += 1;
      this.save();
      return true;
    }
    
    return false;
  }

  // Decrement quantity
  decrementQuantity(productCode) {
    const item = this.items.find(item => item.code === productCode);
    
    if (item && item.quantity > CONFIG.MIN_QUANTITY) {
      item.quantity -= 1;
      this.save();
      return true;
    }
    
    return false;
  }

  // Clear all items
  clear() {
    this.items = [];
    this.save();
  }

  // Get total items count
  getTotalItems() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  // Get cart items
  getItems() {
    return [...this.items];
  }

  // Check if cart is empty
  isEmpty() {
    return this.items.length === 0;
  }

  // Generate WhatsApp message
  generateWhatsAppMessage() {
    if (this.isEmpty()) {
      return null;
    }

    let message = `🛒 *Novo Pedido - ${CONFIG.COMPANY_NAME}*\n\n📝 *Produtos:*\n\n`;
    
    this.items.forEach((item, index) => {
      message += `${index + 1}. *Código:* ${item.code}\n`;
      message += `   *Nome:* ${item.name}\n`;
      message += `   *Fornecedor:* ${item.nomeFornecedor}\n`;
      message += `   *Quantidade:* ${item.quantity}\n\n`;
    });
    
    const totalItems = this.getTotalItems();
    message += `---\n📦 *Total de Itens:* ${totalItems}\n\n`;
    message += `ℹ️ _Pedido gerado automaticamente pelo site_`;
    
    return message;
  }

  // Generate WhatsApp link
  generateWhatsAppLink() {
    const message = this.generateWhatsAppMessage();
    
    if (!message) {
      return null;
    }
    
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodedMessage}`;
  }

  // Subscribe to cart changes
  subscribe(listener) {
    this.listeners.push(listener);
  }

  // Notify all listeners of changes
  notifyListeners() {
    this.listeners.forEach(listener => listener(this.items));
  }
}

// Create global cart instance
const cart = new ShoppingCart();

