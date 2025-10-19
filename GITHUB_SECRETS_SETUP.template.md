# GitHub Secrets Setup for Firebase

## Why GitHub Secrets?

The `.env` file is not pushed to GitHub (for security), so we need to configure Firebase credentials using GitHub Secrets for deployment.

## Step-by-Step Setup

### 1. Get Your Firebase Configuration

From your Firebase console, copy these values from your web app configuration:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "your-project-id.firebaseapp.com", 
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### 2. Add GitHub Secrets

1. **Go to your GitHub repository**
2. **Click "Settings" tab**
3. **In the left sidebar, click "Secrets and variables" → "Actions"**
4. **Click "New repository secret"**
5. **Add each secret:**

| Secret Name | Value | Description |
|-------------|-------|-------------|
| `REACT_APP_FIREBASE_API_KEY` | Your API key | Firebase API key |
| `REACT_APP_FIREBASE_AUTH_DOMAIN` | Your auth domain | Firebase auth domain |
| `REACT_APP_FIREBASE_PROJECT_ID` | Your project ID | Firebase project ID |
| `REACT_APP_FIREBASE_STORAGE_BUCKET` | Your storage bucket | Firebase storage bucket |
| `REACT_APP_FIREBASE_MESSAGING_SENDER_ID` | Your sender ID | Firebase messaging sender ID |
| `REACT_APP_FIREBASE_APP_ID` | Your app ID | Firebase app ID |

### 3. Deploy

Once you've added all secrets:

```bash
git add .
git commit -m "Add Firebase configuration with GitHub Secrets"
git push origin main
```

The GitHub Actions workflow will automatically:
1. Use your secrets to build the app
2. Deploy to GitHub Pages
3. Your Firebase integration will work in production!

## Security Notes

- ✅ **Secrets are encrypted** - Only GitHub Actions can access them
- ✅ **Not visible in logs** - Secrets are masked in build logs
- ✅ **Repository specific** - Each repo has its own secrets
- ✅ **Easy to update** - Change secrets anytime without code changes

## Alternative: Public Firebase Config (Less Secure)

If you prefer not to use secrets, you can hardcode the config in your code, but this is less secure:

```javascript
// In src/firebase/config.ts
const firebaseConfig = {
  apiKey: "your-public-api-key",
  authDomain: "your-project.firebaseapp.com",
  // ... rest of config
};
```

**Note:** Firebase API keys are designed to be public, but using secrets is still the best practice for production apps.
