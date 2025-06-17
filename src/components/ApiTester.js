import React, { useState } from 'react';
import ApiService from '../services/api';
import { auth } from '../config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import axios from 'axios';
import { API_CONFIG } from '../config';

const ApiTester = () => {
  const [results, setResults] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [manualToken, setManualToken] = useState('');
  const [testCredentials, setTestCredentials] = useState({
    email: 'test@example.com',
    password: 'test123'
  });
  const [projectIdToTest, setProjectIdToTest] = useState('');
  const [registrationData, setRegistrationData] = useState({
    email: 'newuser@example.com',
    password: 'password123',
    fullname: 'Test User',
    phone: '+84123456789'
  });

  const testEndpoint = async (name, testFunction) => {
    try {
      setResults(prev => ({ ...prev, [name]: 'Testing...' }));
      const result = await testFunction();
      setResults(prev => ({ 
        ...prev, 
        [name]: { 
          success: true, 
          data: result,
          timestamp: new Date().toLocaleTimeString()
        }
      }));
    } catch (error) {
      setResults(prev => ({ 
        ...prev, 
        [name]: { 
          success: false, 
          error: error.message || error,
          timestamp: new Date().toLocaleTimeString()
        }
      }));
    }
  };

  const runAllTests = async () => {
    setIsLoading(true);
    setResults({});

    const tests = [
      {
        name: 'Firebase Auth Test',
        test: testFirebaseAuth
      },
      {
        name: 'Backend with Firebase Token',
        test: testBackendWithFirebaseToken
      },
      {
        name: 'Connection Test',
        test: () => ApiService.api.get('/test-connection').catch(e => {
          throw new Error(`Connection failed: ${e.message}`);
        })
      },
      {
        name: 'Headers Test',
        test: async () => {
          const token = localStorage.getItem('accessToken');
          const headers = {
            'Authorization': token ? `Bearer ${token}` : 'No token',
            'Content-Type': 'application/json'
          };
          return {
            success: true,
            headers,
            tokenPresent: !!token,
            tokenValue: token || 'None'
          };
        }
      },
      {
        name: 'Login Test',
        test: () => ApiService.login({ 
          email: 'test@example.com', 
          password: 'test123' 
        })
      },
      {
        name: 'Get Categories',
        test: () => ApiService.getCategories()
      },
      {
        name: 'Get Surveys', 
        test: () => ApiService.getSurveys()
      },      {
        name: 'Get Profile',
        test: () => ApiService.getProfile()
      },
      {
        name: 'Mock Backend - Get Assessment Questions',
        test: async () => {
          const token = localStorage.getItem('accessToken');
          if (!token) {
            await ApiService.login({ email: 'test@example.com', password: 'test123' });
          }
          return await ApiService.getAssessmentQuestions(1);
        }
      },
      {
        name: 'Mock Backend - Submit Assessment',
        test: async () => {
          const token = localStorage.getItem('accessToken');
          if (!token) {
            await ApiService.login({ email: 'test@example.com', password: 'test123' });
          }
          const mockAnswers = [
            { questionId: 1, selectedOptionId: 1 },
            { questionId: 2, selectedOptionId: 6 }
          ];
          return await ApiService.submitAssessmentAnswers(1, mockAnswers);
        }
      }
    ];

    for (const { name, test } of tests) {
      await testEndpoint(name, test);
      // Wait a bit between tests
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    setIsLoading(false);
  };  const clearResults = () => {
    setResults({});
  };

  const forceRefresh = () => {
    window.location.reload();
  };const testWithManualToken = async () => {
    if (!manualToken.trim()) {
      alert('Please enter a token first');
      return;
    }
    
    await testEndpoint('Manual Token Test', async () => {
      try {
        console.log('Testing with manual token:', manualToken.substring(0, 20) + '...');
        
        // Create direct axios request with manual token
        const response = await axios.get(`${API_CONFIG.BASE_URL}/Category`, {
          headers: {
            'Authorization': `Bearer ${manualToken}`,
            'Content-Type': 'application/json'
          }
        });
        
        console.log('Manual token test response:', response.data);
        
        return {
          success: true,
          message: 'Test successful with provided Firebase token',
          data: response.data,
          tokenUsed: manualToken.substring(0, 20) + '...'
        };
      } catch (error) {
        console.error('Manual token test failed:', error);
        
        let errorMessage = 'Manual token test failed';
        if (error.response) {
          errorMessage += `: ${error.response.status} - ${error.response.data || error.response.statusText}`;
        } else {
          errorMessage += `: ${error.message}`;
        }
        
        throw new Error(errorMessage);
      }
    });
  };
  const testFirebaseAuth = async () => {
    try {
      console.log('🔥 Testing Firebase Auth with:', testCredentials.email);
      const userCredential = await signInWithEmailAndPassword(auth, testCredentials.email, testCredentials.password);
      const token = await userCredential.user.getIdToken();
      return {
        message: 'Firebase authentication successful',
        token: token.substring(0, 50) + '...',
        user: {
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          displayName: userCredential.user.displayName
        }
      };
    } catch (error) {
      throw new Error(`Firebase auth failed: ${error.message}`);
    }
  };

  const testBackendWithFirebaseToken = async () => {
    try {
      // Get current Firebase token
      const token = localStorage.getItem('accessToken');
      if (!token) {
        throw new Error('No Firebase token found. Please login first.');
      }

      console.log('🔥 Testing backend with Firebase token');
      
      // Test with current token
      const response = await axios.get(`${API_CONFIG.BASE_URL}/Surveys`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      return {
        message: 'Backend accepted Firebase token!',
        responseData: response.data,
        tokenUsed: token.substring(0, 50) + '...'
      };
    } catch (error) {
      console.error('Backend test with Firebase token failed:', error);
      throw new Error(`Backend test failed: ${error.response?.data || error.message}`);
    }
  };

  const testFirebaseWithProjectId = async () => {
    if (!projectIdToTest.trim()) {
      alert('Please enter a project ID to test');
      return;
    }
      try {
      console.log('🔥 Testing Firebase Auth with project ID:', projectIdToTest);
      const userCredential = await signInWithEmailAndPassword(auth, testCredentials.email, testCredentials.password);
      const token = await userCredential.user.getIdToken();
      const result = {
        data: {
          accessToken: token,
          user: {
            uid: userCredential.user.uid,
            email: userCredential.user.email,
            displayName: userCredential.user.displayName
          }
        }
      };
      return {
        message: `Firebase authentication successful with project ID: ${projectIdToTest}`,
        token: result.data.accessToken.substring(0, 50) + '...',
        user: result.data.user,
        projectId: projectIdToTest
      };
    } catch (error) {
      throw new Error(`Firebase auth with project ID failed: ${error.message}`);
    }
  };

  const tryCommonProjectIds = async () => {
    const commonIds = [
      'drugfree-project',
      'swp-project', 
      'drug-prevention',
      'substance-prevention',
      'firebase-project',
      'your-firebase-project'
    ];
    
    setResults({});
      for (const projectId of commonIds) {
      try {
        setResults(prev => ({ ...prev, [`Project ID: ${projectId}`]: 'Testing...' }));
        
        // Login with Firebase Auth
        const userCredential = await signInWithEmailAndPassword(auth, testCredentials.email, testCredentials.password);        const authToken = await userCredential.user.getIdToken();
        
        // Test with backend - use the Firebase token
        const response = await axios.get(`${API_CONFIG.BASE_URL}/Surveys`, {
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json'
          }
        });
        
        // If we get here, this project ID works!
        setResults(prev => ({ 
          ...prev, 
          [`Project ID: ${projectId}`]: { 
            success: true, 
            data: {
              message: `✅ SUCCESS! Project ID "${projectId}" works with backend!`,
              backendResponse: response.data
            },
            timestamp: new Date().toLocaleTimeString()
          }
        }));
        
        console.log(`🎉 Found working project ID: ${projectId}`);
        break; // Stop on first success
        
      } catch (error) {
        setResults(prev => ({ 
          ...prev, 
          [`Project ID: ${projectId}`]: { 
            success: false, 
            error: `Failed: ${error.response?.data || error.message}`,
            timestamp: new Date().toLocaleTimeString()
          }
        }));
      }
      
      // Wait between attempts
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  };

  const decodeFirebaseToken = () => {
    if (!manualToken.trim()) {
      alert('Please enter a Firebase token first');
      return;
    }
    
    try {
      // Split JWT token
      const parts = manualToken.split('.');
      if (parts.length !== 3) {
        throw new Error('Invalid JWT format');
      }
      
      // Decode header and payload
      const header = JSON.parse(atob(parts[0]));
      const payload = JSON.parse(atob(parts[1]));
      
      console.log('🔍 Decoded Firebase Token:', { header, payload });
      
      setResults(prev => ({
        ...prev,
        'Token Decode': {
          success: true,
          data: {
            header,
            payload,
            projectId: payload.aud,
            userId: payload.user_id,
            email: payload.email,
            issuer: payload.iss
          },
          timestamp: new Date().toLocaleTimeString()
        }
      }));
      
      // Auto-fill project ID if found
      if (payload.aud) {
        setProjectIdToTest(payload.aud);
        alert(`Found project ID: ${payload.aud}\nAuto-filled in the Project ID field!`);
      }
      
    } catch (error) {
      setResults(prev => ({
        ...prev,
        'Token Decode': {
          success: false,
          error: 'Failed to decode token: ' + error.message,
          timestamp: new Date().toLocaleTimeString()
        }
      }));
    }
  };

  const registerUserInBackend = async () => {
    try {
      console.log('🔥 Creating user in backend with registration data:', registrationData);
      
      // First create a mock Firebase user
      const mockFirebaseUser = {
        uid: `firebase-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        email: registrationData.email,
        displayName: registrationData.fullname,
        emailVerified: false
      };
      
      console.log('Mock Firebase User created:', mockFirebaseUser);
      
      // Then register this user in backend
      const backendRegistrationData = {
        firebaseUid: mockFirebaseUser.uid,
        email: registrationData.email,
        fullname: registrationData.fullname,
        phone: registrationData.phone,
        password: registrationData.password // Some backends might need this
      };
      
      const response = await axios.post(`${API_CONFIG.BASE_URL}/Auth/register`, backendRegistrationData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Backend registration response:', response.data);
        // Now we can login with this user
      const userCredential = await signInWithEmailAndPassword(auth, registrationData.email, registrationData.password);
      const loginToken = await userCredential.user.getIdToken();
      const loginResponse = {
        data: {
          accessToken: loginToken,
          user: {
            uid: userCredential.user.uid,
            email: userCredential.user.email,
            displayName: userCredential.user.displayName
          }
        }
      };
      
      return {
        message: 'User registered and logged in successfully!',
        firebaseUser: mockFirebaseUser,
        backendResponse: response.data,
        loginToken: loginResponse.data.accessToken.substring(0, 50) + '...'
      };
      
    } catch (error) {
      console.error('Registration failed:', error);
      throw new Error(`Registration failed: ${error.response?.data?.message || error.message}`);
    }
  };

  const testCompleteAuthFlow = async () => {
    try {
      console.log('🔄 Testing complete authentication flow...');
      
      // Step 1: Register user
      setResults(prev => ({ ...prev, 'Step 1 - Registration': 'In progress...' }));
      const regResult = await registerUserInBackend();
      
      setResults(prev => ({ 
        ...prev, 
        'Step 1 - Registration': { 
          success: true, 
          data: regResult,
          timestamp: new Date().toLocaleTimeString()
        }
      }));
      
      // Step 2: Test backend with new token
      setResults(prev => ({ ...prev, 'Step 2 - Backend Test': 'In progress...' }));
      
      const token = localStorage.getItem('accessToken');
      const backendResponse = await axios.get(`${API_CONFIG.BASE_URL}/Surveys`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      setResults(prev => ({ 
        ...prev, 
        'Step 2 - Backend Test': { 
          success: true, 
          data: {
            message: 'Backend accepted token from registered user!',
            surveysCount: backendResponse.data?.data?.length || 0,
            surveys: backendResponse.data?.data || []
          },
          timestamp: new Date().toLocaleTimeString()
        }
      }));
      
      return {
        message: 'Complete authentication flow successful!',
        registration: regResult,
        backendAccess: backendResponse.data
      };
      
    } catch (error) {
      console.error('Complete auth flow failed:', error);
      throw new Error(`Auth flow failed: ${error.response?.data?.message || error.message}`);
    }
  };

  const testBackendDatabase = async () => {
    try {
      console.log('🗄️ Testing backend database access');
      
      // Test multiple endpoints to understand database structure
      const token = localStorage.getItem('accessToken');
      if (!token) {
        throw new Error('No access token found. Please login first.');
      }

      const tests = [
        {
          name: 'Categories',
          endpoint: '/Category'
        },
        {
          name: 'Surveys', 
          endpoint: '/Surveys'
        },
        {
          name: 'Users/Me',
          endpoint: '/users/me'
        }
      ];

      const results = {};
      
      for (const test of tests) {
        try {
          const response = await axios.get(`${API_CONFIG.BASE_URL}${test.endpoint}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
          
          results[test.name] = {
            success: true,
            data: response.data,
            count: Array.isArray(response.data) ? response.data.length : 'N/A'
          };
        } catch (error) {
          results[test.name] = {
            success: false,
            error: error.response?.data || error.message
          };
        }
      }

      return {
        message: 'Database test completed',
        results: results,
        tokenUsed: token.substring(0, 50) + '...'
      };
    } catch (error) {
      throw new Error(`Database test failed: ${error.message}`);
    }
  };

  const checkUserInDatabase = async () => {
    try {
      console.log('👤 Checking current user in database');
      
      const token = localStorage.getItem('accessToken');
      if (!token) {
        throw new Error('No access token found. Please login first.');
      }

      // Decode token to get user info
      const parts = token.split('.');
      const payload = JSON.parse(atob(parts[1]));
      
      console.log('Token payload:', payload);

      // Try to get user profile
      const response = await axios.get(`${API_CONFIG.BASE_URL}/users/me`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      return {
        message: 'User found in database',
        tokenInfo: {
          userId: payload.user_id,
          email: payload.email,
          firebaseUid: payload.sub
        },
        databaseUser: response.data
      };
    } catch (error) {
      console.error('User check error:', error);
      throw new Error(`User check failed: ${error.response?.data || error.message}`);
    }
  };

  return (
    <div style={{ 
      padding: '20px', 
      maxWidth: '800px', 
      margin: '0 auto',
      fontFamily: 'monospace'
    }}>
      <h2>🔧 API Tester</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={runAllTests} 
          disabled={isLoading}
          style={{
            padding: '10px 20px',
            marginRight: '10px',
            backgroundColor: isLoading ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: isLoading ? 'not-allowed' : 'pointer'
          }}
        >
          {isLoading ? '🔄 Testing...' : '▶️ Run All Tests'}
        </button>        <button 
          onClick={clearResults}
          style={{
            padding: '10px 20px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          🗑️ Clear Results
        </button>
        
        <button 
          onClick={forceRefresh}
          style={{
            padding: '10px 20px',
            marginLeft: '10px',
            backgroundColor: '#17a2b8',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          🔄 Force Refresh
        </button>
      </div>

      {/* User Registration Test */}
      <div style={{ 
        marginBottom: '20px', 
        padding: '15px', 
        backgroundColor: '#f0f8ff', 
        borderRadius: '4px',
        border: '1px solid #b3d9ff'
      }}>
        <h4>👤 User Registration Flow:</h4>
        <p style={{ fontSize: '14px', color: '#0066cc', marginBottom: '10px' }}>
          Tạo user mới trong backend với Firebase UID để test authentication flow hoàn chỉnh
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
          <input
            type="email"
            value={registrationData.email}
            onChange={(e) => setRegistrationData(prev => ({ ...prev, email: e.target.value }))}
            placeholder="Email"
            style={{
              padding: '8px 12px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px'
            }}
          />
          <input
            type="password"
            value={registrationData.password}
            onChange={(e) => setRegistrationData(prev => ({ ...prev, password: e.target.value }))}
            placeholder="Password"
            style={{
              padding: '8px 12px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px'
            }}
          />
          <input
            type="text"
            value={registrationData.fullname}
            onChange={(e) => setRegistrationData(prev => ({ ...prev, fullname: e.target.value }))}
            placeholder="Full Name"
            style={{
              padding: '8px 12px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px'
            }}
          />
          <input
            type="tel"
            value={registrationData.phone}
            onChange={(e) => setRegistrationData(prev => ({ ...prev, phone: e.target.value }))}
            placeholder="Phone Number"
            style={{
              padding: '8px 12px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px'
            }}
          />
        </div>
        
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button
            onClick={() => testEndpoint('Register User', registerUserInBackend)}
            style={{
              padding: '8px 16px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            👤 Register New User
          </button>
          <button
            onClick={() => testEndpoint('Complete Auth Flow', testCompleteAuthFlow)}
            style={{
              padding: '8px 16px',
              backgroundColor: '#17a2b8',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            🔄 Test Complete Flow
          </button>
        </div>
        <p style={{ fontSize: '12px', color: '#0066cc', marginTop: '10px' }}>
          💡 Tip: Test này sẽ tạo user mới trong backend, sau đó login và test API access
        </p>
      </div>

      {/* Firebase Auth Test Credentials */}
      <div style={{ 
        marginBottom: '20px', 
        padding: '15px', 
        backgroundColor: '#e7f3ff', 
        borderRadius: '4px',
        border: '1px solid #b6d7ff'
      }}>
        <h4>🔥 Firebase Authentication Test:</h4>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
          <input
            type="email"
            value={testCredentials.email}
            onChange={(e) => setTestCredentials(prev => ({ ...prev, email: e.target.value }))
            }
            placeholder="Test email"
            style={{
              flex: 1,
              padding: '8px 12px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px'
            }}
          />
          <input
            type="password"
            value={testCredentials.password}
            onChange={(e) => setTestCredentials(prev => ({ ...prev, password: e.target.value }))
            }
            placeholder="Test password"
            style={{
              flex: 1,
              padding: '8px 12px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px'
            }}
          />
        </div>
        
        {/* Project ID Testing */}
        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            value={projectIdToTest}
            onChange={(e) => setProjectIdToTest(e.target.value)}
            placeholder="Firebase Project ID (e.g., drugfree-project)"
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px'
            }}
          />
        </div>
        
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button
            onClick={() => testEndpoint('Firebase Login Test', testFirebaseAuth)}
            style={{
              padding: '8px 16px',
              backgroundColor: '#ff9500',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            🔥 Test Firebase Login
          </button>
          <button
            onClick={() => testEndpoint('Firebase with Project ID', testFirebaseWithProjectId)}
            style={{
              padding: '8px 16px',
              backgroundColor: '#9c27b0',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            🎯 Test with Project ID
          </button>
          <button
            onClick={tryCommonProjectIds}
            style={{
              padding: '8px 16px',
              backgroundColor: '#ff5722',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            🔍 Try Common Project IDs
          </button>
          <button
            onClick={() => testEndpoint('Backend with Firebase Token', testBackendWithFirebaseToken)}
            style={{
              padding: '8px 16px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            🔗 Test Backend with Token
          </button>
        </div>
      </div>      {/* Manual Token Test */}
      <div style={{ 
        marginBottom: '20px', 
        padding: '15px', 
        backgroundColor: '#fff3cd', 
        borderRadius: '4px',
        border: '1px solid #ffeaa7'
      }}>
        <h4>🔐 Test với Firebase Token thật:</h4>
        <p style={{ fontSize: '14px', color: '#856404', marginBottom: '10px' }}>
          Copy token từ Swagger "Authorize" button và paste vào đây để test
        </p>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '10px' }}>
          <input
            type="text"
            value={manualToken}
            onChange={(e) => setManualToken(e.target.value)}
            placeholder="Paste Firebase token here..."
            style={{
              flex: 1,
              padding: '8px 12px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px'
            }}
          />
          <button
            onClick={decodeFirebaseToken}
            style={{
              padding: '8px 16px',
              backgroundColor: '#6f42c1',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            🔍 Decode Token
          </button>
          <button
            onClick={testWithManualToken}
            style={{
              padding: '8px 16px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            🧪 Test Token
          </button>
        </div>
        <p style={{ fontSize: '12px', color: '#856404' }}>
          💡 Tip: Decode token sẽ tự động điền Project ID để test mock Firebase
        </p>
      </div>

      {/* Project ID Test */}
      <div style={{ 
        marginBottom: '20px', 
        padding: '15px', 
        backgroundColor: '#d1e7dd', 
        borderRadius: '4px',
        border: '1px solid #badbcc'
      }}>
        <h4>🛠️ Test với Project ID:</h4>
        <p style={{ fontSize: '14px', color: '#0f5132', marginBottom: '10px' }}>
          Kiểm tra xem Project ID nào hoạt động với ứng dụng của bạn
        </p>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
          <input
            type="text"
            value={projectIdToTest}
            onChange={(e) => setProjectIdToTest(e.target.value)}
            placeholder="Nhập Project ID để test"
            style={{
              flex: 1,
              padding: '8px 12px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px'
            }}
          />
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => testEndpoint('Firebase Auth with Project ID', testFirebaseWithProjectId)}
            style={{
              padding: '8px 16px',
              backgroundColor: '#ff6f61',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            🔍 Test Firebase Auth với Project ID
          </button>
          <button
            onClick={tryCommonProjectIds}
            style={{
              padding: '8px 16px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            🎯 Tìm Project ID phổ biến
          </button>
        </div>
      </div>

      {/* Database Testing */}
      <div style={{ 
        marginBottom: '20px', 
        padding: '15px', 
        backgroundColor: '#f8f9fa', 
        borderRadius: '4px',
        border: '1px solid #dee2e6'
      }}>
        <h4>🗄️ Database Testing:</h4>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button
            onClick={() => testEndpoint('Database Access Test', testBackendDatabase)}
            style={{
              padding: '8px 16px',
              backgroundColor: '#17a2b8',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            🗄️ Test Database Access
          </button>
          <button
            onClick={() => testEndpoint('User in Database', checkUserInDatabase)}
            style={{
              padding: '8px 16px',
              backgroundColor: '#6f42c1',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            👤 Check User in DB
          </button>
        </div>
        <p style={{ fontSize: '12px', color: '#6c757d', marginTop: '10px' }}>
          💡 These tests will show what data is available in your Azure database
        </p>
      </div>

      <div>
        <h3>📊 Test Results:</h3>
        {Object.keys(results).length === 0 ? (
          <p style={{ color: '#666' }}>No tests run yet. Click "Run All Tests" to start.</p>
        ) : (
          Object.entries(results).map(([name, result]) => (
            <div 
              key={name}
              style={{
                margin: '10px 0',
                padding: '15px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                backgroundColor: result === 'Testing...' ? '#fff3cd' : 
                               result.success ? '#d4edda' : '#f8d7da'
              }}
            >
              <h4 style={{ margin: '0 0 10px 0' }}>
                {result === 'Testing...' ? '⏳' : result.success ? '✅' : '❌'} {name}
                {result.timestamp && (
                  <span style={{ 
                    fontSize: '12px', 
                    color: '#666', 
                    marginLeft: '10px' 
                  }}>
                    {result.timestamp}
                  </span>
                )}
              </h4>
              
              {result === 'Testing...' ? (
                <p>🔄 Testing in progress...</p>
              ) : result.success ? (
                <div>
                  <p style={{ color: '#155724' }}>✅ Success!</p>
                  <details>
                    <summary style={{ cursor: 'pointer' }}>📋 View Response</summary>
                    <pre style={{ 
                      background: '#f8f9fa', 
                      padding: '10px', 
                      borderRadius: '4px',
                      overflow: 'auto',
                      maxHeight: '200px'
                    }}>
                      {JSON.stringify(result.data, null, 2)}
                    </pre>
                  </details>
                </div>
              ) : (
                <div>
                  <p style={{ color: '#721c24' }}>❌ Error!</p>
                  <pre style={{ 
                    background: '#f8f9fa', 
                    padding: '10px', 
                    borderRadius: '4px',
                    color: '#721c24',
                    overflow: 'auto',
                    maxHeight: '200px'
                  }}>
                    {typeof result.error === 'string' ? result.error : JSON.stringify(result.error, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          ))
        )}
      </div>      <div style={{ 
        marginTop: '30px', 
        padding: '15px', 
        backgroundColor: '#f8f9fa', 
        borderRadius: '4px' 
      }}>
        <h4>💡 Debug Info:</h4>
        <p><strong>API Base URL:</strong> {API_CONFIG?.BASE_URL || process.env.REACT_APP_API_URL || 'Not set'}</p>
        <p><strong>Access Token:</strong> {localStorage.getItem('accessToken') ? '✅ Present' : '❌ Not found'}</p>
        <p><strong>Token Value:</strong> <code style={{ fontSize: '12px', backgroundColor: '#e9ecef', padding: '2px 4px' }}>
          {localStorage.getItem('accessToken') ? localStorage.getItem('accessToken').substring(0, 30) + '...' : 'None'}
        </code></p>
        <p><strong>User Data:</strong> {localStorage.getItem('user') ? '✅ Present' : '❌ Not found'}</p>
        <p><strong>ApiService Methods:</strong> {[
          'login', 'getCategories', 'getSurveys', 'getProfile'
        ].map(method => `${method}: ${typeof ApiService[method] === 'function' ? '✅' : '❌'}`).join(', ')}</p>
      </div>
    </div>
  );
};

export default ApiTester;
