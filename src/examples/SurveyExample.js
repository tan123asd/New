// Example of using Survey APIs with standardized response format
import React, { useState, useEffect } from 'react';
import ApiService from '../services/api';

const SurveyExample = () => {
  const [surveys, setSurveys] = useState([]);
  const [categories, setCategories] = useState([]);
  const [userSurveys, setUserSurveys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedSurvey, setSelectedSurvey] = useState(null);
  const [surveyQuestions, setSurveyQuestions] = useState([]);

  // Fetch all surveys
  const fetchSurveys = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await ApiService.getSurveys();
      
      if (response.success) {
        setSurveys(response.data || []);
        console.log('✅ Surveys loaded:', response.data?.length || 0);
      } else {
        setError(response.message);
      }
    } catch (error) {
      setError(error.message || 'Failed to fetch surveys');
      console.error('🚨 Survey fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await ApiService.getCategories();
      
      if (response.success) {
        setCategories(response.data || []);
        console.log('✅ Categories loaded:', response.data?.length || 0);
      }
    } catch (error) {
      console.error('🚨 Categories fetch error:', error);
    }
  };

  // Fetch user-specific surveys
  const fetchUserSurveys = async () => {
    try {
      const response = await ApiService.getUserSurveys();
      
      if (response.success) {
        setUserSurveys(response.data || []);
        console.log('✅ User surveys loaded:', response.data?.length || 0);
      }
    } catch (error) {
      console.error('🚨 User surveys fetch error:', error);
    }
  };

  // Fetch survey questions
  const fetchSurveyQuestions = async (surveyId) => {
    try {
      setLoading(true);
      
      const response = await ApiService.getSurveyQuestions(surveyId);
      
      if (response.success) {
        setSurveyQuestions(response.data || []);
        console.log('✅ Survey questions loaded:', response.data?.length || 0);
      } else {
        setError(response.message);
      }
    } catch (error) {
      setError(error.message || 'Failed to fetch survey questions');
      console.error('🚨 Survey questions fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Submit survey answer
  const submitAnswer = async (surveyAnswerData) => {
    try {
      setLoading(true);
      
      const response = await ApiService.submitSurveyAnswer(surveyAnswerData);
      
      if (response.success) {
        console.log('✅ Survey answer submitted successfully');
        // Refresh user surveys
        fetchUserSurveys();
      } else {
        setError(response.message);
      }
    } catch (error) {
      setError(error.message || 'Failed to submit survey answer');
      console.error('🚨 Survey answer submit error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Test all Survey APIs
  const testSurveyApis = async () => {
    try {
      const result = await ApiService.testSurveyApis();
      console.log('🧪 Survey API Test Results:', result);
    } catch (error) {
      console.log('❌ Survey API Test Failed:', error);
    }
  };

  useEffect(() => {
    fetchSurveys();
    fetchCategories();
    
    // Fetch user-specific data if logged in
    const currentUser = ApiService.getCurrentUser();
    if (currentUser) {
      fetchUserSurveys();
    }
  }, []);

  return (
    <div className="survey-example">
      <h3>Survey API Usage Example</h3>
      
      {/* Loading State */}
      {loading && <p>Loading...</p>}
      
      {/* Error State */}
      {error && (
        <div className="error-message" style={{ color: 'red' }}>
          Error: {error}
        </div>
      )}
      
      {/* Categories */}
      <div className="categories-section">
        <h4>Categories ({categories.length})</h4>
        <div className="categories-list">
          {categories.map(category => (
            <div key={category.id} className="category-item">
              <strong>{category.name}</strong>
              {category.description && <p>{category.description}</p>}
            </div>
          ))}
        </div>
      </div>
      
      {/* Surveys */}
      <div className="surveys-section">
        <h4>All Surveys ({surveys.length})</h4>
        <div className="surveys-list">
          {surveys.map(survey => (
            <div key={survey.id} className="survey-item">
              <h5>{survey.title}</h5>
              <p>{survey.description}</p>
              <button 
                onClick={() => {
                  setSelectedSurvey(survey);
                  fetchSurveyQuestions(survey.id);
                }}
                disabled={loading}
              >
                View Questions
              </button>
            </div>
          ))}
        </div>
      </div>
      
      {/* User Surveys */}
      <div className="user-surveys-section">
        <h4>My Surveys ({userSurveys.length})</h4>
        <div className="user-surveys-list">
          {userSurveys.map(survey => (
            <div key={survey.id} className="user-survey-item">
              <h5>{survey.title}</h5>
              <p>Status: {survey.status}</p>
              <p>Completed: {survey.completedAt ? new Date(survey.completedAt).toLocaleDateString() : 'Not completed'}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Survey Questions */}
      {selectedSurvey && (
        <div className="survey-questions-section">
          <h4>Questions for: {selectedSurvey.title}</h4>
          <div className="questions-list">
            {surveyQuestions.map(question => (
              <div key={question.id} className="question-item">
                <p><strong>Q{question.order}:</strong> {question.text}</p>
                <p>Type: {question.type}</p>
                {question.options && (
                  <ul>
                    {question.options.map((option, index) => (
                      <li key={index}>{option}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Action Buttons */}
      <div className="actions">
        <button onClick={fetchSurveys} disabled={loading}>
          Refresh Surveys
        </button>
        <button onClick={fetchCategories} disabled={loading}>
          Refresh Categories
        </button>
        <button onClick={fetchUserSurveys} disabled={loading}>
          Refresh My Surveys
        </button>
        <button onClick={testSurveyApis} disabled={loading}>
          Test Survey APIs
        </button>
      </div>
    </div>
  );
};

export default SurveyExample;

/*
Survey API Endpoints Usage:

1. GET /surveys - Lấy tất cả surveys
   ApiService.getSurveys()

2. GET /surveys/{id} - Lấy survey cụ thể
   ApiService.getSurvey(surveyId)

3. GET /surveyquestion/survey/{surveyId} - Lấy questions của survey
   ApiService.getSurveyQuestions(surveyId)

4. POST /surveyanswer - Submit câu trả lời
   ApiService.submitSurveyAnswer(surveyAnswerData)

5. GET /surveys/user/{userId} - Lấy surveys của user
   ApiService.getUserSurveys(userId)

6. GET /surveys/suitable/{userId} - Lấy surveys phù hợp với user
   ApiService.getSuitableSurveys(userId)

7. GET /surveys/status/{userId} - Lấy trạng thái surveys của user
   ApiService.getSurveyStatus(userId)

8. GET /category - Lấy tất cả categories
   ApiService.getCategories()

Expected Response Format:
{
  "success": true,
  "message": "Data retrieved successfully",
  "data": [...]
}
*/
