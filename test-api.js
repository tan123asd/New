// Test script to verify API integration
import ApiService from '../src/services/api.js';

async function testAPI() {
  console.log('Testing API integration...');
  
  try {
    // Test login with known working credentials
    const credentials = {
      email: 'test@example.com',
      password: 'test123'
    };
    
    console.log('Attempting login with credentials:', credentials);
    const response = await ApiService.login(credentials);
    console.log('Login response:', response);
    
    if (response.success) {
      console.log('✅ Login successful!');
      console.log('Access token received:', response.data.accessToken ? 'Yes' : 'No');
      
      // Test getting user profile
      try {
        const profile = await ApiService.getProfile();
        console.log('✅ Profile fetch successful:', profile);
      } catch (profileError) {
        console.log('❌ Profile fetch failed:', profileError);
      }
    } else {
      console.log('❌ Login failed:', response.message);
    }
    
  } catch (error) {
    console.log('❌ API test failed:', error);
  }
}

// Run the test
testAPI();
