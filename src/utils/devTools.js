// Development utilities for debugging
export class DevTools {
  static logApiCall(endpoint, method, data = null) {
    if (process.env.NODE_ENV === 'development') {
      console.group(`🌐 API Call: ${method} ${endpoint}`);
      if (data) console.log('📤 Request data:', data);
      console.groupEnd();
    }
  }

  static logApiResponse(endpoint, response) {
    if (process.env.NODE_ENV === 'development') {
      console.group(`📡 API Response: ${endpoint}`);
      console.log('📥 Response:', response);
      console.groupEnd();
    }
  }

  static logStateChange(component, oldState, newState) {
    if (process.env.NODE_ENV === 'development') {
      console.group(`🔄 State Change: ${component}`);
      console.log('Old state:', oldState);
      console.log('New state:', newState);
      console.groupEnd();
    }
  }

  static debugLocalStorage() {
    if (process.env.NODE_ENV === 'development') {
      console.group('💾 LocalStorage Debug');
      console.log('Access Token:', localStorage.getItem('accessToken') ? 'Present' : 'Missing');
      console.log('User Data:', localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : 'Missing');
      console.log('Refresh Token:', localStorage.getItem('refreshToken') ? 'Present' : 'Missing');
      console.groupEnd();
    }
  }
}

export default DevTools;
