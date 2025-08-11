#!/bin/bash

echo "🚀 Deploying Utah Government Contracting Hub to GitHub Pages..."

# Build the React application
echo "📦 Building React application..."
cd frontend
npm run build

# Copy B2B networking hub HTML to build directory
echo "📋 Copying B2B networking hub HTML..."
cp ../b2b_networking_hub.html build/

# Copy APEX logo to build directory
echo "🖼️ Copying APEX logo..."
cp ../APEX_BLACK_300dpi.png build/

# Go back to root
cd ..

echo "✅ Build completed! Files are ready in frontend/build/"
echo "🌐 Deploying to GitHub Pages..."

# Deploy to GitHub Pages
cd frontend
npm run deploy

echo "🎉 Deployment completed!"
echo "🌐 Your application is now available at: https://shayneismagic.github.io/APEX_GOEO_UTAH"
echo "📱 B2B Networking Hub: https://shayneismagic.github.io/APEX_GOEO_UTAH/b2b_networking_hub.html" 