# Student Career Guidance Application

A comprehensive React application for student career guidance with Firebase authentication and modern UI components.

## 🚀 Features

- **Authentication System**: Firebase-based login/register with protected routes
- **Career Guidance**: Educational resources, counseling, and program recommendations
- **Assessment Tools**: Student evaluation and survey system
- **Course Management**: Browse and enroll in career-related courses
- **Profile Management**: User dashboard and profile customization
- **Responsive Design**: Modern UI with mobile-first approach

## 🛠️ Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Firebase project with Authentication enabled

### 1. Clone and Install

```bash
git clone <repository-url>
cd New
npm install
```

### 2. Firebase Configuration

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing one
3. Enable Authentication with Email/Password
4. Go to Project Settings > General > Your apps
5. Copy your Firebase config object

### 3. Environment Variables

Create a `.env` file in the root directory:

```env
# Firebase Configuration
REACT_APP_FIREBASE_API_KEY=your_api_key_here
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id

# API Configuration
REACT_APP_API_BASE_URL=http://localhost:8000/api
```

### 4. Start Development Server

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ErrorBoundary.js # Error handling wrapper
│   ├── LoadingSpinner.js # Loading indicators
│   ├── ProtectedRoute.js # Authentication guard
│   └── ...
├── pages/              # Page components
│   ├── HomePage.js     # Landing page
│   ├── LoginPage.js    # Authentication
│   ├── Dashboard.js    # User dashboard
│   └── ...
├── services/           # API and utility services
│   ├── api.js         # API communication
│   ├── validation.js  # Form validation
│   ├── errorHandler.js # Error handling
│   └── firebaseAuth.js # Firebase utilities
├── config/            # Configuration files
│   ├── firebase.js    # Firebase setup
│   └── index.js       # App configuration
└── ...
```

## 🔧 Key Features Implemented

### Authentication & Security
- ✅ Firebase Authentication integration
- ✅ Protected routes for authenticated users
- ✅ Environment variables for sensitive config
- ✅ Token-based API authentication

### Form Validation
- ✅ Client-side validation for all forms
- ✅ Real-time validation feedback
- ✅ Email, password, and required field validation
- ✅ Custom validation hooks

### Error Handling
- ✅ Global error boundary
- ✅ API error handling with user-friendly messages
- ✅ Network error detection
- ✅ Loading states for better UX

### API Integration
- ✅ Axios-based API service
- ✅ Request/response interceptors
- ✅ Automatic token refresh handling
- ✅ Standardized error responses

## 🧪 Testing

### Run Tests
```bash
npm test
```

### Build for Production
```bash
npm run build
```

## 📋 Available Scripts
