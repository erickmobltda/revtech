# GitHub Pages Deployment Guide

## Current Issue
GitHub Pages is currently serving the old HTML file from the root directory instead of your React app.

## Solution: Deploy React App to GitHub Pages

### Method 1: Using GitHub Actions (Recommended)

I've already set up a GitHub Actions workflow for you. Here's what to do:

1. **Push the changes to GitHub:**
   ```bash
   git add .
   git commit -m "Add GitHub Pages deployment for React app"
   git push origin main
   ```

2. **Enable GitHub Pages in your repository:**
   - Go to your GitHub repository
   - Click on "Settings" tab
   - Scroll down to "Pages" section
   - Under "Source", select "GitHub Actions"
   - The workflow will automatically deploy your React app

### Method 2: Manual Deployment

If you prefer manual deployment:

1. **Build the React app:**
   ```bash
   cd revtech-react
   npm run build
   ```

2. **Deploy to GitHub Pages:**
   ```bash
   cd revtech-react
   npm run deploy
   ```

3. **Configure GitHub Pages:**
   - Go to repository Settings > Pages
   - Select "Deploy from a branch"
   - Choose "gh-pages" branch
   - Select "/ (root)" folder

### Method 3: Move React App to Root (Alternative)

If you want to keep the React app in the root directory:

1. **Move React files to root:**
   ```bash
   # Move all React files to root
   mv revtech-react/* .
   mv revtech-react/.* . 2>/dev/null || true
   ```

2. **Update package.json scripts:**
   ```json
   {
     "homepage": "https://yourusername.github.io/your-repo-name"
   }
   ```

3. **Deploy:**
   ```bash
   npm run deploy
   ```

## Recommended Approach

**Use Method 1 (GitHub Actions)** - it's the most reliable and automated approach.

## After Deployment

1. Your React app will be available at: `https://yourusername.github.io/your-repo-name`
2. The old HTML files will be replaced by your React app
3. Any future pushes to main/master will automatically redeploy

## Troubleshooting

- If the deployment fails, check the "Actions" tab in your GitHub repository
- Make sure your repository is public (required for free GitHub Pages)
- Ensure the workflow file is in `.github/workflows/deploy.yml`
