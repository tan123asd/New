import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { auth } from '../config/firebase';

class FirebaseAuthService {
  constructor() {
    this.user = null;
    this.isInitialized = false;
    this.isAvailable = !!auth;
    
    if (!this.isAvailable) {
      console.warn('FirebaseAuthService: Firebase not available, service disabled');
      return;
    }
    
    // Listen for auth state changes
    onAuthStateChanged(auth, (user) => {
      this.user = user;
      this.isInitialized = true;
      
      if (user) {
        console.log('Firebase: User signed in:', user.email);
        // Get the Firebase token and save it
        user.getIdToken().then(token => {
          localStorage.setItem('accessToken', token);
          localStorage.setItem('user', JSON.stringify({
            id: user.uid,
            email: user.email,
            name: user.displayName || user.email.split('@')[0],
            role: 'user' // Default role
          }));
          
          // Dispatch login success event
          window.dispatchEvent(new CustomEvent('loginSuccess'));
        });
      } else {
        console.log('Firebase: User signed out');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
      }
    });
  }
  async login(email, password) {
    if (!this.isAvailable) {
      throw new Error('Firebase authentication is not available');
    }

    try {
      console.log('Firebase: Attempting login for:', email);
      
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Get Firebase ID token
      const token = await user.getIdToken();
      
      console.log('Firebase: Login successful');
      console.log('Firebase: Token obtained');
      
      return {
        success: true,
        message: 'Login successful',
        data: {
          accessToken: token,
          user: {
            id: user.uid,
            email: user.email,
            name: user.displayName || user.email.split('@')[0],
            role: 'user'
          }
        }
      };
    } catch (error) {
      console.error('Firebase: Login failed:', error);
      
      let errorMessage = 'Login failed';
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'No user found with this email';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Incorrect password';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Too many failed attempts. Please try again later';
          break;
        default:
          errorMessage = error.message;
      }
      
      throw new Error(errorMessage);
    }
  }

  async register(email, password, displayName = null) {
    try {
      console.log('Firebase: Attempting registration for:', email);
      
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Update display name if provided
      if (displayName) {
        await user.updateProfile({ displayName });
      }
      
      // Get Firebase ID token
      const token = await user.getIdToken();
      
      console.log('Firebase: Registration successful');
      
      return {
        success: true,
        message: 'Registration successful',
        data: {
          accessToken: token,
          user: {
            id: user.uid,
            email: user.email,
            name: displayName || user.email.split('@')[0],
            role: 'user'
          }
        }
      };
    } catch (error) {
      console.error('Firebase: Registration failed:', error);
      
      let errorMessage = 'Registration failed';
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'Email is already registered';
          break;
        case 'auth/weak-password':
          errorMessage = 'Password is too weak';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address';
          break;
        default:
          errorMessage = error.message;
      }
      
      throw new Error(errorMessage);
    }
  }

  async logout() {
    try {
      await signOut(auth);
      console.log('Firebase: Logout successful');
      return {
        success: true,
        message: 'Logged out successfully'
      };
    } catch (error) {
      console.error('Firebase: Logout failed:', error);
      // Even if Firebase logout fails, clear local storage
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
      return {
        success: true,
        message: 'Logged out locally'
      };
    }
  }

  getCurrentUser() {
    return this.user;
  }

  isAuthenticated() {
    return !!this.user;
  }

  async getCurrentToken() {
    if (this.user) {
      try {
        return await this.user.getIdToken();
      } catch (error) {
        console.error('Firebase: Failed to get current token:', error);
        return null;
      }
    }
    return null;
  }
}

export default new FirebaseAuthService();
