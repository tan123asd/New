import React, { useState, useEffect, useCallback } from 'react';
import { FaClipboardList, FaChartLine, FaCheckCircle, FaClock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import ApiService from '../services/api';
import SurveyQuestionRenderer from '../components/SurveyQuestionRenderer';
import DatabaseStructureTest from '../components/DatabaseStructureTest';
import AssessmentTest from '../components/AssessmentTest';
import SimpleApiTest from '../components/SimpleApiTest';
import AuthTest from '../components/AuthTest';
import './AssessmentPage.css';

const AssessmentPage = () => {
  const navigate = useNavigate();
  const [surveyData, setSurveyData] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  
  // Database testing state
  const [showDatabaseTest, setShowDatabaseTest] = useState(false);
  const [showAssessmentTest, setShowAssessmentTest] = useState(false);

  // Debug state
  const [showDebug, setShowDebug] = useState(false);

  useEffect(() => {
    console.log('🔍 AssessmentPage mounted');
    console.log('🔐 Checking authentication...');
    
    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    const token = localStorage.getItem('accessToken');
    
    console.log('👤 Current user:', user);
    console.log('🔑 Has token:', !!token);
    
    if (!user || !token) {
      console.log('❌ User not authenticated, redirecting to login...');
      setError('Please log in to access the assessment.');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      return;
    }
    
    console.log('✅ User authenticated, loading survey...');
    loadSuitableSurvey();
  }, [navigate]);

  // ✅ ĐÚNG: Load survey phù hợp với tuổi user
  const loadSuitableSurvey = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🔍 Loading suitable survey for user...');
      console.log('🌐 API Base URL:', process.env.REACT_APP_API_BASE_URL || 'Not set');
      
      // ✅ ĐÚNG: Gọi API lấy survey phù hợp với tuổi
      console.log('📡 Calling getSuitableSurvey()...');
      const response = await ApiService.getSuitableSurvey();
      
      console.log('📥 Raw API response:', response);
      
      if (response && response.success && response.data) {
        const survey = response.data;
        console.log('✅ Suitable survey loaded:', survey);
        
        setSurveyData(survey);
        // ✅ ĐÚNG: Backend trả về Questions với PascalCase
        setQuestions(survey.Questions || []);
        
        console.log(`📝 Loaded ${survey.Questions?.length || 0} questions`);
        console.log('📋 Sample question:', survey.Questions?.[0]);
      } else {
        console.error('❌ Invalid survey response:', response);
        throw new Error('Invalid survey response');
      }
      
    } catch (error) {
      console.error('❌ Failed to load suitable survey:', error);
      console.error('❌ Error details:', {
        message: error.message,
        stack: error.stack,
        response: error.response,
        status: error.status
      });
      
      if (error.message.includes('DateOfBirth')) {
        // ✅ ĐÚNG: Handle error thiếu ngày sinh
        console.log('⚠️ DateOfBirth required, redirecting to profile...');
        setError('Please update your profile with your date of birth first.');
        setTimeout(() => {
          navigate('/profile');
        }, 3000);
      } else if (error.message.includes('Network error')) {
        setError('Network error - please check your connection and try again.');
      } else if (error.status === 401) {
        setError('Authentication required. Please log in again.');
      } else if (error.status === 404) {
        setError('Assessment not found. Please contact support.');
      } else {
        setError(`Failed to load assessment: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  // ✅ ĐÚNG: Handle answer selection
  const handleAnswerChange = (questionId, answerId) => {
    console.log('📝 Answer selected:', { questionId, answerId });
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerId
    }));
  };

  // ✅ ĐÚNG: Submit assessment theo format backend
  const handleSubmitAssessment = async () => {
    try {
      setSubmitting(true);
      
      if (!surveyData || !surveyData.SurveyId) {
        throw new Error('No survey data available');
      }
      
      // Validate all questions are answered
      const unansweredQuestions = questions.filter(q => !answers[q.QuestionId]);
      if (unansweredQuestions.length > 0) {
        alert(`Please answer all questions. You have ${unansweredQuestions.length} unanswered questions.`);
        return;
      }
      
      console.log('🎯 Submitting assessment answers:', answers);
      
      // ✅ ĐÚNG: Submit theo format backend mong đợi
      const surveyId = surveyData.SurveyId;
      
      const submitData = {
        Answers: Object.entries(answers).map(([questionId, answerId]) => ({
          QuestionId: questionId,
          SelectedAnswerId: answerId
        }))
      };
      
      console.log('📤 Submit data format:', submitData);
      
      const response = await ApiService.submitSurveyAnswers(surveyId, submitData);
      
      if (response.success) {
        const result = response.data;
        const score = result.Score || 'N/A';
        const totalPoints = result.TotalPoints || 100;
        const percentage = result.Percentage || 0;
        
        alert(`Assessment submitted successfully!\nYour score: ${score}/${totalPoints} (${percentage}%)`);
        
        // Reset state after successful submission
        setSurveyData(null);
        setQuestions([]);
        setAnswers({});
        
        // Reload for new assessment
        setTimeout(() => {
          loadSuitableSurvey();
        }, 2000);
        
      } else {
        throw new Error(response.message || 'Submission failed');
      }
      
    } catch (error) {
      console.error('❌ Failed to submit assessment:', error);
      alert(`Failed to submit assessment: ${error.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  // Test function to check API connectivity
  const testApiConnection = async () => {
    console.log('🔍 Testing API Connection...');
    
    try {
      // Test 1: Health check
      console.log('📡 Testing health endpoint...');
      const healthResponse = await ApiService.validateApiConnection();
      console.log('✅ Health check:', healthResponse);
      
      // Test 2: Check survey status
      console.log('📡 Testing survey status...');
      const statusResponse = await ApiService.checkSurveyStatus();
      console.log('✅ Survey status:', statusResponse);
      
    } catch (error) {
      console.error('❌ API test failed:', error.message);
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="assessment-page">
        <div className="assessment-container">
          <div className="text-center">
            <div className="loading-spinner"></div>
            <p>Loading assessment...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="assessment-page">
        <div className="assessment-container">
          <div className="text-center">
            <div className="error-message">
              <h2>Unable to Load Assessment</h2>
              <p>{error}</p>
              <button 
                onClick={loadSuitableSurvey}
                className="btn btn-primary"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show assessment questions
  if (surveyData && questions.length > 0) {
    return (
      <div className="assessment-page">
        <div className="assessment-container">
          <div className="assessment-card">
            <div className="assessment-header-info">
              <h1>{surveyData.Title}</h1>
              <p>{surveyData.Description}</p>
              <div className="assessment-progress">
                <span>Questions: {questions.length}</span>
                <span>Duration: ~{Math.ceil(questions.length * 0.75)} minutes</span>
              </div>
            </div>
            
            {/* ✅ ĐÚNG: Render questions với PascalCase mapping */}
            <div className="assessment-questions">
              <SurveyQuestionRenderer 
                questions={questions}
                onAnswerChange={handleAnswerChange}
                answers={answers}
              />
            </div>

            <div className="assessment-actions">
              <button 
                onClick={() => {
                  setSurveyData(null);
                  setQuestions([]);
                  setAnswers({});
                  loadSuitableSurvey();
                }}
                className="assessment-btn assessment-btn-secondary"
              >
                Cancel Assessment
              </button>
              <button 
                onClick={handleSubmitAssessment}
                className="assessment-btn assessment-btn-primary"
                disabled={submitting || questions.some(q => !answers[q.QuestionId])}
              >
                {submitting ? 'Submitting...' : 'Submit Assessment'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show main assessment page
  return (
    <div className="assessment-page">
      <div className="assessment-container">
        <div className="assessment-header">
          <h1>Recovery Assessment</h1>
          <p>Complete this assessment to evaluate your current recovery status and receive personalized recommendations</p>
          
          {/* Debug: Test API Connection Button */}
          <div className="assessment-debug-section" style={{ marginTop: '1rem', padding: '1rem', background: '#f8f9fa', borderRadius: '8px', border: '1px solid #dee2e6' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: '#495057' }}>🔧 Debug Tools</h4>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button 
                onClick={testApiConnection}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '0.875rem'
                }}
              >
                🧪 Test API Connection
              </button>
              <button 
                onClick={() => setShowDatabaseTest(!showDatabaseTest)}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '0.875rem'
                }}
              >
                🗄️ {showDatabaseTest ? 'Hide' : 'Test'} Database Structure
              </button>
              <button 
                onClick={() => setShowAssessmentTest(!showAssessmentTest)}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '0.875rem'
                }}
              >
                🧪 {showAssessmentTest ? 'Hide' : 'Test'} Assessment Integration
              </button>
            </div>
          </div>
        </div>

        {showDatabaseTest && (
          <DatabaseStructureTest />
        )}

        {showAssessmentTest && (
          <AssessmentTest />
        )}

        <div className="assessment-overview">
          <h2 className="assessment-overview-title">Assessment Overview</h2>
          <div className="assessment-overview-grid">
            <div className="assessment-overview-item">
              <FaChartLine className="assessment-overview-icon" />
              <h3 className="assessment-overview-item-title">Progress Tracking</h3>
              <p className="assessment-overview-item-description">Monitor your recovery journey with regular assessments and detailed insights.</p>
            </div>
            <div className="assessment-overview-item">
              <FaClipboardList className="assessment-overview-icon" />
              <h3 className="assessment-overview-item-title">Personalized Insights</h3>
              <p className="assessment-overview-item-description">Receive customized recommendations based on your assessment results.</p>
            </div>
            <div className="assessment-overview-item">
              <FaCheckCircle className="assessment-overview-icon" />
              <h3 className="assessment-overview-item-title">Goal Achievement</h3>
              <p className="assessment-overview-item-description">Set and track goals to maintain motivation and celebrate milestones.</p>
            </div>
          </div>
        </div>

        <div className="assessment-start-section">
          <div className="assessment-start-card">
            <h2>Ready to Start Your Assessment?</h2>
            <p>This assessment will help us understand your current situation and provide personalized recommendations for your recovery journey.</p>
            <button 
              onClick={loadSuitableSurvey}
              className="assessment-btn assessment-btn-primary"
              style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}
            >
              Start Assessment
            </button>
          </div>
        </div>

        {/* Debug Toggle */}
        <button 
          onClick={() => setShowDebug(!showDebug)}
          style={{
            position: 'fixed',
            top: '10px',
            right: '10px',
            padding: '0.5rem',
            backgroundColor: showDebug ? '#dc3545' : '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '0.8rem',
            zIndex: 1000
          }}
        >
          {showDebug ? 'Hide Debug' : 'Show Debug'}
        </button>

        {/* Debug Section */}
        {showDebug && (
          <div className="debug-section">
            <h3>🔧 Debug Tools</h3>
            <button onClick={() => setShowAssessmentTest(!showAssessmentTest)}>
              {showAssessmentTest ? 'Hide' : 'Show'} Assessment Test
            </button>
            {showAssessmentTest && <AssessmentTest />}
            
            <AuthTest />
            <SimpleApiTest />
            
            <DatabaseStructureTest />
          </div>
        )}
      </div>
    </div>
  );
};

export default AssessmentPage;
