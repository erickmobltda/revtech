# Prompt: Build a Single-Page Auto Parts Order System

## Project Overview
Create a modern, responsive single-page application (SPA) for an auto parts company called REVTECH that allows customers to browse products and place orders via WhatsApp. The application must be fully static (no backend) and deployable to GitHub Pages. All page must be in portuguese (BR) and mobile responsive.

## Technical Requirements

### Core Technologies
- **HTML5** - Semantic markup
- **CSS3** or **Tailwind CSS** - Modern, responsive styling
- **Vanilla JavaScript** (or Vue.js/React if preferred) - Client-side functionality
- **JSON** - Product data format (converted from CSV)
- **No backend required** - Everything runs client-side
- **GitHub Pages compatible** - Static files only

### Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive (320px to 1920px+)
- Touch-friendly interface for mobile devices

## Data Structure

### Product Data (products.json)
Convert the CSV file to JSON with the following structure:
```json
[
  {
    "code": "IM11178",
    "name": "INTERRUPTOR FAROL DE MILHA",
    "nomeFornecedor": "MARILIA",
    "description": "",
    "imageUrl": "https://www.furacao.com.br/imagensfuracao/produtosfw/I/IM11178.jpg",
    "url": "https://www.furacao.com.br/produtos/detalhe/IM11178"
  }
]
```

## Application Structure

### 1. Main Page (Landing/Home)
**Purpose:** Introduce the company and its services

**Content Sections:**
- **Hero Section**
  - Company logo
  - Catchy headline: "Peças Automotivas de Qualidade"
  - Call-to-action button: "Faça seu Pedido" (scrolls to order section)
  
- **About Section**
  - Company description
  - Brief history
  - Mission and values
  - Why choose us (quality, variety, service)
  
- **Services Section**
  - Product categories available
  - Delivery information (if applicable)
  - Customer service highlights
  
- **Contact Section**
  - WhatsApp contact button
  - Business hours
  - Location/address (optional)
  - Social media links

### 2. Order Section ("Faça seu Pedido")
**Purpose:** Allow users to search, select, and order products

**Features Required:**

#### A. Product Search & Filter
- **Search Bar**
  - Real-time search as user types
  - Search by: product code, name, or supplier (nomeFornecedor)
  - Clear/reset search button
  - Show "X results found" counter

- **Filters** (Optional but recommended)
  - Filter by supplier (dropdown)
  - Sort by: Name (A-Z), Code, Supplier
  - "Show all" to reset filters

#### B. Product Display
- **Product Card** for each item showing:
  - Product image (with fallback/placeholder if image fails to load)
  - Product code
  - Product name
  - Supplier name
  - "+" button to add to cart
  
- **Product List View**
  - Grid layout on desktop (3-4 columns)
  - Stack on mobile (1 column)
  - Lazy loading or pagination for performance (100 products initially, load more on scroll)
  - Smooth scrolling

#### C. Shopping Cart/Order Summary
- **Mini Cart Icon** (top right corner)
  - Shows count of items selected
  - Click to expand/collapse cart
  
- **Cart Panel/Modal** displaying:
  - List of selected products:
    - Product code
    - Product name
    - Quantity selector (-, number input, +)
    - Remove item button (×)
  - "Clear all" button
  - Total items count
  - "Enviar Pedido" (Send Order) button
  
- **Quantity Management**
  - Default quantity: 1
  - Increment/decrement buttons
  - Manual input allowed (min: 1, max: 999)
  - Update total count automatically

#### D. WhatsApp Integration
When user clicks "Enviar Pedido":

1. **Validation**
   - Check if cart has at least 1 item
   - Show error if cart is empty: "Adicione pelo menos um produto ao pedido"

2. **Order Message Format**
   ```
   🛒 *Novo Pedido - Furacão Auto Peças*
   
   📝 *Produtos:*
   
   1. *Código:* IM11178
      *Nome:* INTERRUPTOR FAROL DE MILHA
      *Fornecedor:* MARILIA
      *Quantidade:* 2
   
   2. *Código:* SCF30
      *Nome:* JOGO CABO DE VELA
      *Fornecedor:* NGK Velas/Sondas
      *Quantidade:* 1
   
   ---
   📦 *Total de Itens:* 3
   
   ℹ️ _Pedido gerado automaticamente pelo site_
   ```

3. **WhatsApp Link**
   - Format: `https://wa.me/5511999999999?text=ENCODED_MESSAGE`
   - Replace phone number with actual business WhatsApp number
   - URL encode the message properly
   - Open in new tab

4. **Post-Send Actions**
   - Show success message: "Redirecionando para WhatsApp..."
   - Keep cart data (don't clear) in case user needs to resend
   - Optional: Add "Limpar pedido" button after sending

## Design Requirements

### Visual Design
- **Color Scheme**
  - Primary color: Professional blue or company brand color
  - Secondary color: Complementary color
  - Success: Green (for WhatsApp button)
  - Neutral: Grays for text and backgrounds
  - Use color psychology for automotive industry

- **Typography**
  - Modern sans-serif font (e.g., Inter, Roboto, Open Sans)
  - Clear hierarchy (headings, body, small text)
  - Minimum 16px for body text (accessibility)

- **Layout**
  - Clean, spacious design
  - Consistent spacing (use 8px grid system)
  - Card-based UI for products
  - Sticky header with navigation
  - Floating cart button (mobile)

### UX Considerations
- **Loading States**
  - Show skeleton/shimmer while loading products
  - "Loading..." indicator for images
  
- **Empty States**
  - "No products found" when search has no results
  - "Seu carrinho está vazio" when cart is empty
  
- **Error Handling**
  - Graceful fallback if JSON fails to load
  - Image error fallback (show placeholder)
  - Network error message
  
- **Accessibility**
  - ARIA labels for buttons and icons
  - Keyboard navigation support
  - Focus states for interactive elements
  - Alt text for images
  - Color contrast (WCAG AA minimum)

### Mobile-First Design
- Touch-friendly buttons (minimum 44px tap target)
- Swipe gestures for cart (optional)
- Sticky "Enviar Pedido" button on mobile
- Optimized images for mobile bandwidth
- Fast loading time (<3 seconds)

## File Structure
```
project/
├── index.html              # Main HTML file
├── css/
│   └── styles.css          # Main stylesheet (or use Tailwind CDN)
├── js/
│   ├── main.js             # Main application logic
│   ├── products.js         # Product loading and search
│   └── cart.js             # Cart management
├── data/
│   └── products.json       # Product data
├── images/
│   ├── logo.png            # Company logo
│   ├── placeholder.png     # Product image fallback
│   └── hero-bg.jpg         # Hero section background (optional)
└── README.md               # Deployment instructions
```

## Key Features Implementation Guide

### 1. Product Loading
```javascript
// Load products from JSON
async function loadProducts() {
  try {
    const response = await fetch('./data/products.json');
    const products = await response.json();
    return products;
  } catch (error) {
    console.error('Error loading products:', error);
    return [];
  }
}
```

### 2. Search Functionality
```javascript
// Real-time search
function searchProducts(query, products) {
  const searchTerm = query.toLowerCase().trim();
  return products.filter(product => 
    product.code.toLowerCase().includes(searchTerm) ||
    product.name.toLowerCase().includes(searchTerm) ||
    product.nomeFornecedor.toLowerCase().includes(searchTerm)
  );
}
```

### 3. Cart Management
```javascript
// Store cart in localStorage for persistence
const cart = {
  items: JSON.parse(localStorage.getItem('cart')) || [],
  
  add(product) {
    const existing = this.items.find(item => item.code === product.code);
    if (existing) {
      existing.quantity += 1;
    } else {
      this.items.push({ ...product, quantity: 1 });
    }
    this.save();
  },
  
  save() {
    localStorage.setItem('cart', JSON.stringify(this.items));
  },
  
  getTotalItems() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }
};
```

### 4. WhatsApp Message Generator
```javascript
function generateWhatsAppLink(cartItems, phoneNumber) {
  let message = '🛒 *Novo Pedido - Furacão Auto Peças*\n\n📝 *Produtos:*\n\n';
  
  cartItems.forEach((item, index) => {
    message += `${index + 1}. *Código:* ${item.code}\n`;
    message += `   *Nome:* ${item.name}\n`;
    message += `   *Fornecedor:* ${item.nomeFornecedor}\n`;
    message += `   *Quantidade:* ${item.quantity}\n\n`;
  });
  
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  message += `---\n📦 *Total de Itens:* ${totalItems}\n\n`;
  message += `ℹ️ _Pedido gerado automaticamente pelo site_`;
  
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
}
```

## Configuration
Create a `config.js` file for easy customization:
```javascript
const CONFIG = {
  WHATSAPP_NUMBER: '5511999999999', // Replace with actual number
  COMPANY_NAME: 'Furacão Auto Peças',
  PRODUCTS_PER_PAGE: 24,
  ENABLE_LAZY_LOADING: true,
  DEFAULT_PRODUCT_IMAGE: './images/placeholder.png'
};
```

## Performance Optimization
1. **Minimize Dependencies** - Use vanilla JS or lightweight frameworks
2. **Optimize Images** - Use WebP format with fallbacks, lazy loading
3. **Code Splitting** - Separate JS files loaded as needed
4. **Minification** - Minify CSS and JS for production
5. **Caching** - Use localStorage for products (with cache invalidation)
6. **CDN** - Use CDN for frameworks/libraries (Tailwind, Vue, etc.)

## GitHub Pages Deployment

### Prerequisites
1. GitHub repository created
2. All files committed to main/master branch

### Deployment Steps
1. Go to repository Settings
2. Navigate to Pages section
3. Select branch: `main` or `master`
4. Select folder: `/ (root)` or `/docs` if structured that way
5. Click Save
6. Site will be available at: `https://username.github.io/repository-name/`

### Build Checklist
- [ ] Convert CSV to JSON
- [ ] Update WhatsApp phone number in config
- [ ] Add company logo and images
- [ ] Test all features locally
- [ ] Test on mobile devices
- [ ] Optimize and minify assets
- [ ] Set up custom domain (optional)
- [ ] Add Google Analytics (optional)

## Testing Checklist
- [ ] Product search works correctly
- [ ] Add to cart functionality
- [ ] Quantity increment/decrement
- [ ] Remove items from cart
- [ ] Clear cart
- [ ] WhatsApp link generates correctly
- [ ] Message format is readable
- [ ] Mobile responsive on all screen sizes
- [ ] Images load with fallbacks
- [ ] Fast loading time
- [ ] Works offline (cached data)
- [ ] Keyboard navigation
- [ ] Screen reader compatible

## Future Enhancements (Optional)
1. Product categories/tags
2. Favorites/wishlist
3. Recent orders history
4. Customer name/company input before sending
5. Price information (if available)
6. Product details modal with more info
7. Email order option
8. Multi-language support (PT/EN)
9. Dark mode
10. PWA functionality (offline mode)

## Company Information to Include
Please provide:
- Company name
- Logo (high resolution)
- WhatsApp business number
- Company description/about text
- Address (if applicable)
- Business hours
- Social media links
- Brand colors (hex codes)
- Any specific design preferences

## Notes
- Keep the design clean and professional
- Prioritize mobile experience (most users)
- Fast loading is critical for conversion
- Make the "Faça seu Pedido" button prominent
- Use clear, action-oriented language
- Test WhatsApp integration thoroughly
- Ensure proper encoding for special characters in product names
- Consider adding Google Analytics to track usage

