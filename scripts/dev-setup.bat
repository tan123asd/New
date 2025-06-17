@echo off
REM Development setup script for Windows

echo 🚀 Setting up development environment...

REM Check if .env exists
if not exist .env (
    echo 📝 Creating .env file from template...
    copy .env.example .env
    echo ⚠️  Please update .env with your Firebase configuration!
    echo 📖 See README.md for setup instructions
)

REM Install dependencies
echo 📦 Installing dependencies...
npm install

REM Check Firebase config
echo 🔥 Checking Firebase configuration...
findstr /C:"demo-api-key" src\config\firebase.js >nul
if %errorlevel% equ 0 (
    echo ⚠️  Warning: Firebase is still using demo configuration!
    echo 📝 Please update environment variables in .env file
)

REM Start development server
echo 🎯 Starting development server...
npm start
