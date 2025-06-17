// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5150/api',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3
};

// Authentication Configuration
export const AUTH_CONFIG = {
  USE_FIREBASE_AUTH: process.env.REACT_APP_USE_FIREBASE_AUTH === 'true' || true, // Enable Firebase since backend requires it
  TRADITIONAL_AUTH_FALLBACK: false, // Disable fallback since backend only accepts Firebase
  USE_MOCK_BACKEND: process.env.REACT_APP_USE_MOCK_BACKEND === 'true' || false // Use real backend now - we have controllers!
};

// App Configuration
export const APP_CONFIG = {
  APP_NAME: process.env.REACT_APP_APP_NAME || 'Drug Free',
  VERSION: '1.0.0',
  SUPPORT_EMAIL: 'support@drugfree.com',
  CRISIS_HOTLINE: '+1 (555) 123-4567',
  ENV: process.env.REACT_APP_ENV || 'development'
};

// Feature Flags
export const FEATURES = {
  ENABLE_CHAT: true,
  ENABLE_VIDEO_CALLS: true,
  ENABLE_OFFLINE_MODE: false,
  ENABLE_MOCK_DATA: process.env.REACT_APP_ENABLE_MOCK_DATA === 'true',
  ENABLE_ANALYTICS: true
};
