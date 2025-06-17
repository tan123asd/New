// Example of using API with standardized response format
import React, { useState, useEffect } from 'react';
import ApiService from '../services/api';

const ExampleApiUsage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Example: Fetching data with standardized response format
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // API call - response will be in format: { success, message, data }
      const response = await ApiService.getCourses();
      
      if (response.success) {
        setData(response.data);
        console.log('✅ Success:', response.message);
      } else {
        setError(response.message);
        console.log('❌ Error:', response.message);
      }
    } catch (error) {
      // Error is already formatted by interceptor
      setError(error.message || 'An error occurred');
      console.error('🚨 API Error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Example: Posting data with error handling
  const submitData = async (formData) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await ApiService.createCourse(formData);
      
      if (response.success) {
        console.log('✅ Course created:', response.message);
        // Handle successful creation
        fetchData(); // Refresh data
      } else {
        setError(response.message);
      }
    } catch (error) {
      // Standardized error format from interceptor
      setError(error.message);
      
      // Additional error handling based on status
      if (error.status === 400) {
        console.log('📝 Validation error:', error.data);
      } else if (error.status === 401) {
        console.log('🔐 Authentication required');
        // User will be automatically redirected by interceptor
      } else if (error.status === 403) {
        console.log('🚫 Access forbidden');
      } else if (error.status >= 500) {
        console.log('🔧 Server error');
      }
    } finally {
      setLoading(false);
    }
  };

  // Test API response format
  const testApiFormat = async () => {
    try {
      const result = await ApiService.testApiResponseFormat();
      console.log('🧪 API Format Test Result:', result);
    } catch (error) {
      console.log('❌ API Format Test Failed:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="api-example">
      <h3>API Usage Example</h3>
      
      {/* Loading State */}
      {loading && <p>Loading...</p>}
      
      {/* Error State */}
      {error && (
        <div className="error-message" style={{ color: 'red' }}>
          Error: {error}
        </div>
      )}
      
      {/* Success State */}
      {data && (
        <div className="data-display">
          <h4>Data loaded successfully:</h4>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
      
      {/* Action Buttons */}
      <div className="actions">
        <button onClick={fetchData} disabled={loading}>
          Refresh Data
        </button>
        <button onClick={testApiFormat} disabled={loading}>
          Test API Format
        </button>
      </div>
    </div>
  );
};

export default ExampleApiUsage;

/*
Expected API Response Formats:

SUCCESS RESPONSE:
{
  "success": true,
  "message": "Data retrieved successfully",
  "data": {
    "courses": [...],
    "total": 10
  }
}

ERROR RESPONSE:
{
  "success": false,
  "message": "Invalid request parameters",
  "data": null
}

VALIDATION ERROR RESPONSE:
{
  "success": false,
  "message": "Validation failed",
  "data": {
    "email": ["Email is required"],
    "password": ["Password must be at least 8 characters"]
  }
}
*/
