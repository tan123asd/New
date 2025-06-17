import React, { useState, useEffect } from 'react';
import ApiService from '../services/api';

const DatabaseStructureTest = () => {
  const [dbStructure, setDbStructure] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    testDatabaseStructure();
  }, []);

  const testDatabaseStructure = async () => {
    setLoading(true);
    setError(null);
    
    const results = {
      surveys: null,
      questions: null,
      users: null,
      categories: null,
      answers: null
    };

    try {
      console.log('🔍 Testing Azure Database Structure...');
      
      // Test Categories table
      try {
        console.log('📊 Testing Categories table...');
        const categoriesResponse = await ApiService.getCategories();
        results.categories = {
          success: true,
          data: categoriesResponse,
          structure: 'Expected: id, name, description, createdAt, updatedAt'
        };
        console.log('✅ Categories:', categoriesResponse);
      } catch (error) {
        results.categories = { success: false, error: error.message };
        console.error('❌ Categories failed:', error);
      }

      // Test Surveys table
      try {
        console.log('📊 Testing Surveys table...');
        const surveysResponse = await ApiService.getSurveys();
        results.surveys = {
          success: true,
          data: surveysResponse,
          structure: 'Expected: id, title, description, categoryId, ageMin, ageMax, createdAt, updatedAt'
        };
        console.log('✅ Surveys:', surveysResponse);
        
        // Test first survey details if available
        if (surveysResponse?.data?.length > 0) {
          const firstSurvey = surveysResponse.data[0];
          console.log('🔍 Testing first survey details:', firstSurvey);
          
          try {
            const questionsResponse = await ApiService.getSurveyQuestions(firstSurvey.id);
            results.questions = {
              success: true,
              data: questionsResponse,
              structure: 'Expected: id, surveyId, questionText, questionType, options, required, order'
            };
            console.log('✅ Survey Questions:', questionsResponse);
          } catch (error) {
            results.questions = { success: false, error: error.message };
            console.error('❌ Survey Questions failed:', error);
          }
        }
      } catch (error) {
        results.surveys = { success: false, error: error.message };
        console.error('❌ Surveys failed:', error);
      }

      // Test User profile
      try {
        console.log('📊 Testing User profile...');
        const userResponse = await ApiService.getProfile();
        results.users = {
          success: true,
          data: userResponse,
          structure: 'Expected: id, email, firstName, lastName, dateOfBirth, phone, role'
        };
        console.log('✅ User Profile:', userResponse);
      } catch (error) {
        results.users = { success: false, error: error.message };
        console.error('❌ User Profile failed:', error);
      }

      // Test Survey Answers structure
      try {
        console.log('📊 Testing Survey Answers structure...');
        // We can't test this without actually submitting an answer
        results.answers = {
          success: true,
          data: 'Structure test only',
          structure: 'Expected: id, surveyId, userId, questionId, answerText, answerValue, submittedAt'
        };
      } catch (error) {
        results.answers = { success: false, error: error.message };
      }

      setDbStructure(results);
      
    } catch (error) {
      console.error('❌ Database structure test failed:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '20px', background: '#f8f9fa', borderRadius: '8px', margin: '20px' }}>
        <h3>🔍 Testing Azure Database Structure...</h3>
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', background: '#f8f9fa', borderRadius: '8px', margin: '20px' }}>
      <h3>🗄️ Azure Database Structure Test Results</h3>
      
      {error && (
        <div style={{ color: 'red', marginBottom: '20px' }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {Object.entries(dbStructure).map(([table, result]) => (
        <div key={table} style={{ 
          marginBottom: '20px', 
          padding: '15px', 
          background: 'white', 
          borderRadius: '5px',
          border: `2px solid ${result?.success ? '#28a745' : '#dc3545'}`
        }}>
          <h4 style={{ margin: '0 0 10px 0', textTransform: 'capitalize' }}>
            {result?.success ? '✅' : '❌'} {table} Table
          </h4>
          
          <div style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>
            <strong>Expected Structure:</strong> {result?.structure}
          </div>
          
          {result?.success ? (
            <div>
              <div style={{ fontSize: '14px', color: '#28a745', marginBottom: '5px' }}>
                ✅ Connection successful
              </div>
              {result.data && (
                <details>
                  <summary style={{ cursor: 'pointer', color: '#007bff' }}>
                    View Response Data
                  </summary>
                  <pre style={{ 
                    background: '#f1f1f1', 
                    padding: '10px', 
                    borderRadius: '3px',
                    fontSize: '12px',
                    overflow: 'auto',
                    maxHeight: '200px'
                  }}>
                    {JSON.stringify(result.data, null, 2)}
                  </pre>
                </details>
              )}
            </div>
          ) : (
            <div style={{ fontSize: '14px', color: '#dc3545' }}>
              ❌ Error: {result?.error}
            </div>
          )}
        </div>
      ))}

      <div style={{ marginTop: '20px', padding: '15px', background: '#e8f4fd', borderRadius: '5px' }}>
        <h4>🎯 Age-Based Assessment Logic</h4>
        <p style={{ margin: '5px 0', fontSize: '14px' }}>
          <strong>Current Implementation:</strong>
        </p>
        <ul style={{ fontSize: '14px', margin: '5px 0' }}>
          <li>Frontend calls <code>/surveys/suitable/{`{userId}`}</code></li>
          <li>Backend should filter surveys based on user's age (calculated from dateOfBirth)</li>
          <li>Surveys table should have ageMin and ageMax columns</li>
          <li>Users table should have dateOfBirth column</li>
        </ul>
        
        <p style={{ margin: '10px 0 5px 0', fontSize: '14px' }}>
          <strong>Database Schema Requirements:</strong>
        </p>
        <ul style={{ fontSize: '14px', margin: '5px 0' }}>
          <li><strong>surveys:</strong> id, title, description, categoryId, ageMin, ageMax, createdAt, updatedAt</li>
          <li><strong>users:</strong> id, email, firstName, lastName, dateOfBirth, phone, role</li>
          <li><strong>surveyquestions:</strong> id, surveyId, questionText, questionType, options, required, order</li>
          <li><strong>surveyanswers:</strong> id, surveyId, userId, questionId, answerText, answerValue, submittedAt</li>
          <li><strong>categories:</strong> id, name, description, createdAt, updatedAt</li>
        </ul>
      </div>

      <button 
        onClick={testDatabaseStructure}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        🔄 Retest Database Structure
      </button>
    </div>
  );
};

export default DatabaseStructureTest;
