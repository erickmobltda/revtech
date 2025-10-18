// Script to merge product data from old.js into products-data.js
const fs = require('fs');
const path = require('path');

// Read both files
const productsDataPath = path.join(__dirname, 'js', 'products-data.js');
const oldDataPath = path.join(__dirname, 'js', 'old.js');

const productsDataContent = fs.readFileSync(productsDataPath, 'utf8');
const oldDataContent = fs.readFileSync(oldDataPath, 'utf8');

// Extract PRODUCTS_DATA arrays from both files
const productsDataMatch = productsDataContent.match(/const PRODUCTS_DATA = (\[[\s\S]*?\]);/);
const oldDataMatch = oldDataContent.match(/const PRODUCTS_DATA = (\[[\s\S]*?\]);/);

if (!productsDataMatch || !oldDataMatch) {
  console.error('Could not extract PRODUCTS_DATA from one or both files');
  process.exit(1);
}

const productsData = JSON.parse(productsDataMatch[1]);
const oldData = JSON.parse(oldDataMatch[1]);

console.log(`Products in products-data.js: ${productsData.length}`);
console.log(`Products in old.js: ${oldData.length}`);

// Create a map of old data by code for quick lookup
const oldDataMap = new Map();
oldData.forEach(product => {
  if (product.code) {
    oldDataMap.set(product.code, product);
  }
});

// Update products-data.js with missing properties from old.js
let updatedCount = 0;
const updatedProducts = productsData.map(product => {
  if (product.code && oldDataMap.has(product.code)) {
    const oldProduct = oldDataMap.get(product.code);
    
    // Create updated product with properties from old.js where products-data.js has empty values
    const updatedProduct = { ...product };
    
    if (!updatedProduct.nomeFornecedor && oldProduct.nomeFornecedor) {
      updatedProduct.nomeFornecedor = oldProduct.nomeFornecedor;
    }
    if (!updatedProduct.description && oldProduct.description) {
      updatedProduct.description = oldProduct.description;
    }
    if (!updatedProduct.imageUrl && oldProduct.imageUrl) {
      updatedProduct.imageUrl = oldProduct.imageUrl;
    }
    if (!updatedProduct.url && oldProduct.url) {
      updatedProduct.url = oldProduct.url;
    }
    
    updatedCount++;
    console.log(`Updated product: ${product.code} - ${product.name}`);
    return updatedProduct;
  }
  
  return product;
});

// Generate the new file content
const newFileContent = `// Product Data - Embedded for no-server compatibility
const PRODUCTS_DATA = ${JSON.stringify(updatedProducts, null, 2)};
`;

// Write the updated file
fs.writeFileSync(productsDataPath, newFileContent);

console.log(`\nMerge completed!`);
console.log(`Updated ${updatedCount} products with missing properties from old.js`);
console.log(`Total products in updated file: ${updatedProducts.length}`);
