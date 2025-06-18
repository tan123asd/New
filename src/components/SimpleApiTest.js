import React, { useState } from 'react';
import ApiService from '../services/api';

const SimpleApiTest = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const addResult = (test, success, message, data = null) => {
    setResults(prev => [...prev, { test, success, message, data, time: new Date().toLocaleTimeString() }]);
  };

  const testApiConnection = async () => {
    setLoading(true);
    setResults([]);

    try {
      // Test 1: Basic health check
      addResult('Health Check', 'running', 'Testing basic API connection...');
      const health = await ApiService.validateApiConnection();
      if (health.success) {
        addResult('Health Check', 'success', 'API is reachable', health);
      } else {
        addResult('Health Check', 'error', 'API not reachable', health);
        return;
      }

      // Test 2: Check if user is authenticated
      addResult('Authentication', 'running', 'Checking user authentication...');
      const user = ApiService.getCurrentUser();
      if (user) {
        addResult('Authentication', 'success', `User logged in: ${user.email || user.id}`, user);
      } else {
        addResult('Authentication', 'error', 'No user found - please log in first', null);
        return;
      }

      // Test 3: Try to get survey status
      addResult('Survey Status', 'running', 'Checking survey status...');
      try {
        const status = await ApiService.checkSurveyStatus();
        addResult('Survey Status', 'success', 'Survey status endpoint works', status);
      } catch (error) {
        addResult('Survey Status', 'error', `Survey status failed: ${error.message}`, error);
      }

      // Test 4: Try to get suitable survey
      addResult('Get Suitable Survey', 'running', 'Trying to get suitable survey...');
      try {
        const survey = await ApiService.getSuitableSurvey();
        if (survey.success && survey.data) {
          addResult('Get Suitable Survey', 'success', 
            `Found survey: ${survey.data.Title} with ${survey.data.Questions?.length || 0} questions`, 
            {
              surveyId: survey.data.SurveyId,
              title: survey.data.Title,
              questionCount: survey.data.Questions?.length || 0
            }
          );
        } else {
          addResult('Get Suitable Survey', 'error', 'Invalid survey response', survey);
        }
      } catch (error) {
        if (error.message.includes('DateOfBirth')) {
          addResult('Get Suitable Survey', 'warning', 'DateOfBirth required - user needs to update profile', error.message);
        } else {
          addResult('Get Suitable Survey', 'error', `Failed: ${error.message}`, error);
        }
      }

    } catch (error) {
      addResult('General', 'error', `Test failed: ${error.message}`, error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      background: 'white', 
      padding: '1rem', 
      borderRadius: '8px', 
      margin: '1rem 0',
      border: '1px solid #ddd'
    }}>
      <h3 style={{ margin: '0 0 1rem 0' }}>🔧 Simple API Test</h3>
      
      <button 
        onClick={testApiConnection}
        disabled={loading}
        style={{
          padding: '0.5rem 1rem',
          backgroundColor: loading ? '#ccc' : '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: loading ? 'not-allowed' : 'pointer',
          marginBottom: '1rem'
        }}
      >
        {loading ? 'Testing...' : 'Test API Connection'}
      </button>

      <div style={{ fontSize: '0.9rem' }}>
        {results.map((result, index) => (
          <div key={index} style={{ 
            marginBottom: '0.5rem',
            padding: '0.5rem',
            backgroundColor: result.success === 'success' ? '#d4edda' : 
                           result.success === 'error' ? '#f8d7da' : 
                           result.success === 'warning' ? '#fff3cd' : '#d1ecf1',
            borderRadius: '4px',
            border: `1px solid ${
              result.success === 'success' ? '#c3e6cb' : 
              result.success === 'error' ? '#f5c6cb' : 
              result.success === 'warning' ? '#ffeaa7' : '#bee5eb'
            }`
          }}>
            <strong>{result.test}:</strong> {result.message}
            <div style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.25rem' }}>
              {result.time}
            </div>
            {result.data && (
              <details style={{ marginTop: '0.5rem' }}>
                <summary style={{ cursor: 'pointer', color: '#007bff' }}>View Data</summary>
                <pre style={{ 
                  fontSize: '0.75rem', 
                  backgroundColor: '#f8f9fa', 
                  padding: '0.5rem', 
                  borderRadius: '4px',
                  overflow: 'auto'
                }}>
                  {JSON.stringify(result.data, null, 2)}
                </pre>
              </details>
            )}
          </div>
        ))}
      </div>

      {results.length === 0 && !loading && (
        <p style={{ color: '#666', fontStyle: 'italic' }}>
          Click "Test API Connection" to start debugging
        </p>
      )}
    </div>
  );
};

export default SimpleApiTest; 