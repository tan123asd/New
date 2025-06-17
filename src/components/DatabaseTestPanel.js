import React, { useState } from 'react';
import ApiService from '../services/api';

const DatabaseTestPanel = () => {
  const [testResults, setTestResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });  const testEndpoints = [
    { name: 'Categories', endpoint: '/Category', method: 'GET' },
    { name: 'Surveys', endpoint: '/Surveys', method: 'GET' },
    { name: 'Survey Status', endpoint: '/Surveys/check-status', method: 'GET' },
    { name: 'Suitable Surveys', endpoint: '/Surveys/get-suitable', method: 'GET' },
    { name: 'Admin Users', endpoint: '/Admin/users', method: 'GET' },
    { name: 'Refresh Token', endpoint: '/Auth/refresh-token', method: 'POST' },
    { name: 'User Profile', endpoint: '/User/profile', method: 'GET' },
    { name: 'Test Connection', endpoint: '/health', method: 'GET' },
  ];
  const testConnection = async () => {
    setIsLoading(true);
    try {
      // Test basic connectivity to the backend server
      const response = await fetch('http://localhost:5150/swagger/v1/swagger.json', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setTestResults(prev => [...prev, {
          test: 'Backend Connection',
          success: true,
          data: { 
            message: 'Backend server is responding',
            apiTitle: data.info?.title,
            version: data.info?.version,
            availableEndpoints: Object.keys(data.paths || {}).length
          },
          timestamp: new Date().toISOString()
        }]);
      } else {
        throw new Error(`HTTP ${response.status}`);
      }
    } catch (error) {
      setTestResults(prev => [...prev, {
        test: 'Backend Connection',
        success: false,
        error: error.message,
        timestamp: new Date().toISOString()
      }]);
    }
    setIsLoading(false);
  };

  const testLogin = async () => {
    setIsLoading(true);
    try {
      const response = await ApiService.login({
        username: credentials.username,
        password: credentials.password
      });
      setTestResults(prev => [...prev, {
        test: 'Login',
        success: true,
        data: response,
        timestamp: new Date().toISOString()
      }]);
    } catch (error) {
      setTestResults(prev => [...prev, {
        test: 'Login',
        success: false,
        error: error.message,
        timestamp: new Date().toISOString()
      }]);
    }
    setIsLoading(false);
  };

  const testEndpoint = async (endpoint) => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:5150${endpoint.endpoint}`, {
        method: endpoint.method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : ''
        }
      });
      
      const data = await response.json();
      
      setTestResults(prev => [...prev, {
        test: endpoint.name,
        success: response.ok,
        status: response.status,
        data: data,
        timestamp: new Date().toISOString()
      }]);
    } catch (error) {
      setTestResults(prev => [...prev, {
        test: endpoint.name,
        success: false,
        error: error.message,
        timestamp: new Date().toISOString()
      }]);
    }
    setIsLoading(false);
  };

  const clearResults = () => {
    setTestResults([]);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Database & API Connection Test Panel</h2>
        <div className="mb-6 p-4 border rounded-lg bg-yellow-50">
        <h3 className="text-lg font-semibold mb-4">Backend Connection Test</h3>
        <p className="text-sm text-gray-600 mb-4">
          First, let's verify that your backend server is running and accessible:
        </p>
        <button
          onClick={testConnection}
          disabled={isLoading}
          className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 disabled:opacity-50"
        >
          Test Backend Connection
        </button>
      </div>

      {/* Login Section */}
      <div className="mb-6 p-4 border rounded-lg bg-gray-50">
        <h3 className="text-lg font-semibold mb-4">Authentication Test</h3>        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded">
          <p className="text-sm text-blue-700">
            <strong>Testing with Azure SQL Database credentials:</strong><br/>
            Enter the username and password for a user that exists in your drugfree-sqlserver database.
            This should be the same credentials you use to connect via Azure Data Studio.
          </p>
          <div className="mt-2 text-xs text-blue-600">
            <strong>Common test credentials for drug-free platforms:</strong><br/>
            • admin / admin123<br/>
            • testuser / test123<br/>
            • user1 / password<br/>
            • counselor / counselor123<br/>
            <em>Or use whatever credentials you have set up in your database</em>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder="Username (e.g., admin, testuser)"
            value={credentials.username}
            onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
            className="px-3 py-2 border rounded-md"
          />
          <input
            type="password"
            placeholder="Password"
            value={credentials.password}
            onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
            className="px-3 py-2 border rounded-md"
          />
        </div>
        <button
          onClick={testLogin}
          disabled={isLoading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          Test Login with Azure SQL Credentials
        </button>
      </div>

      {/* Endpoint Testing */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">API Endpoints Test</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          {testEndpoints.map((endpoint, index) => (
            <button
              key={index}
              onClick={() => testEndpoint(endpoint)}
              disabled={isLoading}
              className="px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 text-sm"
            >
              {endpoint.name}
            </button>
          ))}
        </div>
        <button
          onClick={clearResults}
          className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
        >
          Clear Results
        </button>
      </div>

      {/* Results Display */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Test Results</h3>
        {testResults.length === 0 ? (
          <p className="text-gray-500">No tests run yet</p>
        ) : (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {testResults.map((result, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border ${
                  result.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="font-semibold">{result.test}</span>
                  <span className="text-sm text-gray-500">{new Date(result.timestamp).toLocaleTimeString()}</span>
                </div>
                {result.status && (
                  <p className="text-sm">Status: {result.status}</p>
                )}
                {result.success ? (
                  <details className="mt-2">
                    <summary className="cursor-pointer text-sm text-green-700">Show Response</summary>
                    <pre className="mt-2 text-xs bg-white p-2 rounded border overflow-auto">
                      {JSON.stringify(result.data, null, 2)}
                    </pre>
                  </details>
                ) : (
                  <p className="text-red-700 text-sm mt-2">Error: {result.error}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-center">Testing...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatabaseTestPanel;
