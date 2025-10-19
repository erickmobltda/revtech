# Product Migration Guide

## What is migrate-products.js?

This script imports all your product data from the original `products-data.js` into Firebase Firestore database. It also creates an admin user for you.

## When to Run It

### ✅ **Run it ONCE when:**
- You've set up Firebase (Authentication + Firestore)
- You want to populate your database with products
- Before your first deployment

### ❌ **Don't run it:**
- Every time the app starts
- If you already have products in your database
- During normal app usage

## How to Run the Migration

### Step 1: Set up Environment Variables

Create a `.env` file in your project root with your Firebase credentials:

```env
FIREBASE_API_KEY=your_api_key_here
FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id
```

### Step 2: Run the Migration

```bash
# Navigate to your project directory
cd /Users/erickmob/Documents/code/revtech

# Run the migration script
node scripts/migrate-products.js
```

### Step 3: What It Does

The script will:
1. ✅ **Create an admin user:**
   - Email: `admin@revtech.com.br`
   - Password: `admin123456`
   - **⚠️ Change this password after first login!**

2. ✅ **Import all products** from your original data
3. ✅ **Set up timestamps** (createdAt, updatedAt)

### Step 4: Verify Migration

After running, check your Firebase console:
1. Go to **Firestore Database**
2. You should see a `products` collection with all your products
3. Go to **Authentication** to see the admin user

## Admin Access

After migration, you can:
1. **Login to your app** with the admin credentials
2. **Access the admin panel** to manage products
3. **Add/edit/delete products** through the web interface

## Troubleshooting

### If migration fails:
- Check your Firebase configuration
- Ensure Firestore is enabled
- Verify your environment variables

### If you need to re-run:
- The script will skip products that already exist
- Admin user creation will show "already exists" message (this is normal)

## Production Deployment

After running the migration locally:
1. Your products will be in your Firebase database
2. Deploy to GitHub Pages
3. Your live app will use the same Firebase database
4. No need to run migration on GitHub Pages

## Security Note

**Change the admin password immediately after first login!**
The default password `admin123456` is only for initial setup.
