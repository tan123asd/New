import React from 'react';

const TestPage = () => {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>🧪 Test Page</h1>
      <p>This is a simple test page to verify routing works.</p>
      <p>If you can see this, routing is working fine!</p>
      <div style={{ marginTop: '20px' }}>
        <a href="/api-test" style={{ 
          padding: '10px 20px', 
          backgroundColor: '#007bff', 
          color: 'white', 
          textDecoration: 'none',
          borderRadius: '4px'
        }}>
          Go to API Test
        </a>
      </div>
    </div>
  );
};

export default TestPage;
