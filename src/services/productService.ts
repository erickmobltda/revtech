import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  where
} from 'firebase/firestore';
import { db } from '../firebase/config';
import { Product } from '../types/Product';

const PRODUCTS_COLLECTION = 'products';

export class ProductService {
  // Get all products
  static async getProducts(): Promise<Product[]> {
    try {
      const productsRef = collection(db, PRODUCTS_COLLECTION);
      const q = query(productsRef, orderBy('name', 'asc'));
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
        updatedAt: doc.data().updatedAt?.toDate()
      })) as Product[];
    } catch (error) {
      console.error('Error getting products:', error);
      throw error;
    }
  }

  // Get product by ID
  static async getProductById(id: string): Promise<Product | null> {
    try {
      const productRef = doc(db, PRODUCTS_COLLECTION, id);
      const productSnap = await getDoc(productRef);
      
      if (productSnap.exists()) {
        return {
          id: productSnap.id,
          ...productSnap.data(),
          createdAt: productSnap.data().createdAt?.toDate(),
          updatedAt: productSnap.data().updatedAt?.toDate()
        } as Product;
      }
      return null;
    } catch (error) {
      console.error('Error getting product:', error);
      throw error;
    }
  }

  // Search products
  static async searchProducts(searchTerm: string): Promise<Product[]> {
    try {
      const productsRef = collection(db, PRODUCTS_COLLECTION);
      const q = query(productsRef, orderBy('name', 'asc'));
      const querySnapshot = await getDocs(q);
      
      const allProducts = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
        updatedAt: doc.data().updatedAt?.toDate()
      })) as Product[];

      if (!searchTerm.trim()) {
        return allProducts;
      }

      const term = searchTerm.toLowerCase();
      return allProducts.filter(product => 
        product.code.toLowerCase().includes(term) ||
        product.name.toLowerCase().includes(term) ||
        product.nomeFornecedor.toLowerCase().includes(term)
      );
    } catch (error) {
      console.error('Error searching products:', error);
      throw error;
    }
  }

  // Create new product
  static async createProduct(productData: Product): Promise<string> {
    try {
      const productsRef = collection(db, PRODUCTS_COLLECTION);
      const docRef = await addDoc(productsRef, {
        ...productData,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  }

  // Update product
  static async updateProduct(id: string, productData: Partial<Product>): Promise<void> {
    try {
      const productRef = doc(db, PRODUCTS_COLLECTION, id);
      await updateDoc(productRef, {
        ...productData,
        updatedAt: new Date()
      });
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  }

  // Delete product
  static async deleteProduct(id: string): Promise<void> {
    try {
      const productRef = doc(db, PRODUCTS_COLLECTION, id);
      await deleteDoc(productRef);
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  }

  // Upload product image (using local storage as fallback)
  static async uploadProductImage(file: File, productId: string): Promise<string> {
    try {
      // Convert file to base64 for local storage
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const base64String = reader.result as string;
          // Store in localStorage as fallback
          localStorage.setItem(`product_image_${productId}`, base64String);
          resolve(base64String);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  }

  // Delete product image (remove from local storage)
  static async deleteProductImage(imageUrl: string): Promise<void> {
    try {
      // For base64 images, we can't really "delete" them from localStorage
      // This is a limitation of the free tier approach
      console.log('Image deletion not supported in free tier mode');
    } catch (error) {
      console.error('Error deleting image:', error);
      throw error;
    }
  }

  // Get products by supplier
  static async getProductsBySupplier(supplier: string): Promise<Product[]> {
    try {
      const productsRef = collection(db, PRODUCTS_COLLECTION);
      const q = query(productsRef, where('nomeFornecedor', '==', supplier), orderBy('name', 'asc'));
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
        updatedAt: doc.data().updatedAt?.toDate()
      })) as Product[];
    } catch (error) {
      console.error('Error getting products by supplier:', error);
      throw error;
    }
  }

  // Get unique suppliers
  static async getSuppliers(): Promise<string[]> {
    try {
      const products = await this.getProducts();
      const suppliers = Array.from(new Set(products.map(p => p.nomeFornecedor)));
      return suppliers.sort();
    } catch (error) {
      console.error('Error getting suppliers:', error);
      throw error;
    }
  }
}
