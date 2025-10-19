#!/bin/bash

# GitHub Pages Deployment Script for React App
echo "🚀 Deploying React app to GitHub Pages..."

# Navigate to React app directory
cd revtech-react

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the React app
echo "🔨 Building React app..."
npm run build

# Deploy to GitHub Pages
echo "🌐 Deploying to GitHub Pages..."
npm run deploy

echo "✅ Deployment complete!"
echo "Your app should be available at: https://yourusername.github.io/your-repo-name"
echo "Note: Replace 'yourusername' and 'your-repo-name' with your actual GitHub username and repository name"
