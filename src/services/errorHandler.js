// Error handling utilities
import toast from 'react-hot-toast';

export class NotificationService {
  static success(message) {
    toast.success(message);
  }
  
  static error(message) {
    toast.error(message);
  }
  
  static warning(message) {
    toast(message, { icon: '⚠️' });
  }
  
  static info(message) {
    toast(message, { icon: 'ℹ️' });
  }
}

export class ErrorHandler {
  static logError(error, context = '') {
    console.error(`[${new Date().toISOString()}] Error in ${context}:`, error);
    
    // In production, you might want to send errors to a logging service
    if (process.env.NODE_ENV === 'production') {
      // TODO: Send to error tracking service (e.g., Sentry, LogRocket)
    }
  }

  static getErrorMessage(error) {
    if (typeof error === 'string') {
      return error;
    }
    
    if (error?.response?.data?.message) {
      return error.response.data.message;
    }
    
    if (error?.message) {
      return error.message;
    }
    
    return 'An unexpected error occurred';
  }

  static isNetworkError(error) {
    return !error.response && error.request;
  }

  static isAuthError(error) {
    return error?.response?.status === 401;
  }

  static isForbiddenError(error) {
    return error?.response?.status === 403;
  }

  static isValidationError(error) {
    return error?.response?.status === 400;
  }
  static isServerError(error) {
    return error?.response?.status >= 500;
  }

  static handle(error, context = 'Unknown') {
    console.error(`[${context}] Error:`, error);
    
    // Extract meaningful error message
    let message = 'An unexpected error occurred';
    
    if (error.response) {
      // API error
      message = error.response.data?.message || 
                error.response.data?.error || 
                `API Error: ${error.response.status}`;
    } else if (error.message) {
      // JavaScript error
      message = error.message;
    }
    
    // Show toast notification
    NotificationService.error(message);
    
    return {
      success: false,
      message,
      context,
      originalError: error
    };
  }
  
  static success(message, context = 'Operation') {
    console.log(`[${context}] Success:`, message);
    NotificationService.success(message);
    
    return {
      success: true,
      message,
      context
    };
  }
  
  static warning(message, context = 'Warning') {
    console.warn(`[${context}] Warning:`, message);
    NotificationService.warning(message);
    
    return {
      success: true,
      message,
      context,
      type: 'warning'
    };
  }
}

// Toast notification utility
export class NotificationService {
  static success(message) {
    // Basic implementation - you can replace with a toast library
    console.log('✅ Success:', message);
    // TODO: Implement toast notifications
  }

  static error(message) {
    console.error('❌ Error:', message);
    // TODO: Implement toast notifications
  }

  static warning(message) {
    console.warn('⚠️ Warning:', message);
    // TODO: Implement toast notifications
  }

  static info(message) {
    console.info('ℹ️ Info:', message);
    // TODO: Implement toast notifications
  }
}

export default ErrorHandler;
