# Firebase Setup Instructions

## Current Status
The app is currently running with demo Firebase configuration values. This allows the app to start without errors, but Firebase features (authentication, database, storage) will not work until you configure real Firebase credentials.

## To Set Up Real Firebase Configuration:

1. **Create a Firebase Project:**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Click "Create a project" or "Add project"
   - Follow the setup wizard

2. **Enable Required Services (Free Tier):**
   - **Authentication:** Go to Authentication > Sign-in method > Enable Email/Password
   - **Firestore Database:** Go to Firestore Database > Create database > Start in test mode
   - **⚠️ Skip Storage:** Storage requires a paid plan - we'll use local storage instead

3. **Get Your Configuration:**
   - Go to Project Settings (gear icon) > General tab
   - Scroll down to "Your apps" section
   - Click "Web app" icon (</>) to add a web app
   - Copy the configuration values

4. **Create Environment File:**
   - Create a `.env` file in the project root
   - Add your Firebase configuration:

```env
REACT_APP_FIREBASE_API_KEY=your_actual_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

5. **Restart the Development Server:**
   ```bash
   npm start
   ```

## Security Rules (Optional but Recommended)

### Firestore Rules:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /products/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### Storage Rules:
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /product-images/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## Free Tier Features
With the free tier setup, you get:
- ✅ **Real Authentication** - User login/logout works
- ✅ **Real Database** - Products stored in Firestore
- ⚠️ **Local Image Storage** - Images stored as base64 in browser (not persistent across devices)
- ✅ **All Core Features** - Cart, products, admin panel work perfectly

## Limitations of Free Tier
- Images are stored locally in browser (not shared between devices)
- Image uploads work but are not persistent across different browsers/devices
- For production with image sharing, you'd need Firebase Storage (paid plan)

## Alternative: Use External Image URLs
Instead of uploading images, you can:
1. Host images on free services like Imgur, Cloudinary, or GitHub
2. Use the image URL directly in your products
3. This works perfectly with the free tier!
