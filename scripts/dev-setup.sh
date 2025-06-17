#!/bin/bash

# Development setup script
echo "🚀 Setting up development environment..."

# Check if .env exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp .env.example .env
    echo "⚠️  Please update .env with your Firebase configuration!"
    echo "📖 See README.md for setup instructions"
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check Firebase config
echo "🔥 Checking Firebase configuration..."
if grep -q "demo-api-key" src/config/firebase.js; then
    echo "⚠️  Warning: Firebase is still using demo configuration!"
    echo "📝 Please update environment variables in .env file"
fi

# Start development server
echo "🎯 Starting development server..."
npm start
