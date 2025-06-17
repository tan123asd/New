import React, { useState, useEffect } from 'react';
import ApiService from '../services/api';
import DevTools from '../utils/devTools';

const SystemHealthCheck = () => {
  const [healthStatus, setHealthStatus] = useState({
    api: 'checking',
    auth: 'checking',
    endpoints: 'checking'
  });

  useEffect(() => {
    runHealthCheck();
  }, []);

  const runHealthCheck = async () => {
    // Test API connection
    try {
      await ApiService.validateApiConnection();
      setHealthStatus(prev => ({ ...prev, api: 'healthy' }));
    } catch (error) {
      setHealthStatus(prev => ({ ...prev, api: 'error' }));
    }

    // Test auth status
    const token = localStorage.getItem('accessToken');
    setHealthStatus(prev => ({ 
      ...prev, 
      auth: token ? 'authenticated' : 'not_authenticated' 
    }));

    // Test critical endpoints
    try {
      await ApiService.testCriticalEndpoints();
      setHealthStatus(prev => ({ ...prev, endpoints: 'healthy' }));
    } catch (error) {
      setHealthStatus(prev => ({ ...prev, endpoints: 'error' }));
    }

    DevTools.debugLocalStorage();
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'healthy':
      case 'authenticated':
        return '✅';
      case 'error':
      case 'not_authenticated':
        return '❌';
      case 'checking':
        return '⏳';
      default:
        return '❓';
    }
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px' }}>
      <h3>System Health Check</h3>
      <div>
        {getStatusIcon(healthStatus.api)} API Connection: {healthStatus.api}
      </div>
      <div>
        {getStatusIcon(healthStatus.auth)} Authentication: {healthStatus.auth}
      </div>
      <div>
        {getStatusIcon(healthStatus.endpoints)} Endpoints: {healthStatus.endpoints}
      </div>
      <button onClick={runHealthCheck} style={{ marginTop: '10px' }}>
        Run Health Check
      </button>
    </div>
  );
};

export default SystemHealthCheck;
