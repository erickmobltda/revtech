// Configuration file for REVTECH Auto Parts
const CONFIG = {
  // WhatsApp Configuration
  WHATSAPP_NUMBER: '5547991817609', // Replace with actual WhatsApp number
  COMPANY_NAME: 'REVTECH REPRESENTAÇÃO',
  
  // Product Display Settings
  PRODUCTS_PER_PAGE: 24,
  ENABLE_LAZY_LOADING: true,
  DEFAULT_PRODUCT_IMAGE: './images/placeholder.svg',
  
  // Cart Settings
  MIN_QUANTITY: 1,
  MAX_QUANTITY: 999,
  
  // Local Storage Keys
  CART_STORAGE_KEY: 'revtech_cart',
  
  // UI Messages (Portuguese BR)
  MESSAGES: {
    CART_EMPTY: 'Seu carrinho está vazio',
    ADD_TO_CART_SUCCESS: 'Produto adicionado ao carrinho!',
    NO_PRODUCTS_FOUND: 'Nenhum produto encontrado',
    LOADING: 'Carregando produtos...',
    ERROR_LOADING: 'Erro ao carregar produtos. Tente novamente.',
    WHATSAPP_REDIRECT: 'Redirecionando para WhatsApp...',
    CART_VALIDATION_ERROR: 'Adicione pelo menos um produto ao pedido',
    PRODUCTS_FOUND: 'produtos encontrados'
  }
};

