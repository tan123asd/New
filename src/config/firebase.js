// Firebase configuration
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Firebase config object - Uses environment variables
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "demo-api-key",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "demo-project.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "demo-project",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "demo-project.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "demo-app-id"
};

// Validate Firebase configuration
const validateFirebaseConfig = () => {
  const requiredFields = ['apiKey', 'authDomain', 'projectId'];
  const missingFields = requiredFields.filter(field => !firebaseConfig[field]);
  
  if (missingFields.length > 0) {
    console.error('Missing Firebase configuration fields:', missingFields);
    console.error('Please check your environment variables');
    return false;
  }
  return true;
};

// Initialize Firebase
let app = null;
let auth = null;

try {
  if (validateFirebaseConfig()) {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    console.log('Firebase initialized successfully');
  } else {
    console.warn('Firebase configuration incomplete - some features may not work');
  }
} catch (error) {
  console.error('Firebase initialization failed:', error);
  console.warn('Firebase features will be disabled');
}

export { auth };
export default app;
