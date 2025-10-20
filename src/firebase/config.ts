import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

// --- START DEBUG LOGS ---
// These logs will show us the exact values that are available during the build.
// In the deployed version, we expect these to be 'undefined'.
console.log("--- Checking Firebase Environment Variables ---");
console.log("API Key:", process.env.REACT_APP_FIREBASE_API_KEY);
console.log("Auth Domain:", process.env.REACT_APP_FIREBASE_AUTH_DOMAIN);
console.log("Project ID:", process.env.REACT_APP_FIREBASE_PROJECT_ID);
// --- END DEBUG LOGS ---


// Firebase configuration
// Your original fallback values (|| "demo-...") are still here.
// If the environment variables are undefined, Firebase will try to initialize
// with these demo values and will likely fail, which the try/catch will capture.
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "demo-api-key",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "demo-project.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "demo-project",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "demo-project.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:123456789:web:abcdef123456"
};


// Declare variables that we will initialize in the try block
let app: FirebaseApp;
let auth: Auth;
let db: Firestore;

try {
  // Initialize Firebase
  app = initializeApp(firebaseConfig);

  // Initialize Firebase services
  auth = getAuth(app);
  db = getFirestore(app);

  console.log("Firebase was initialized successfully!");

} catch (error) {
  console.error("!!! FIREBASE INITIALIZATION FAILED !!!");
  console.error(error);
  // Assign null or handle the error appropriately so the rest of the app
  // knows that Firebase is not available.
  // For now, the error in the console is the most important part.
}

// Export the initialized services
export { app, auth, db };

// Note: Storage is not available in free tier - using local storage instead