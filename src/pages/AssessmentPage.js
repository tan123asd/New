import React, { useState, useEffect, useCallback } from 'react';
import { FaClipboardList, FaChartLine, FaCheckCircle, FaClock } from 'react-icons/fa';
import { useSurveys } from '../hooks';
import ApiService from '../services/api';
import './AssessmentPage.css';

const AssessmentPage = () => {
  const [assessments, setAssessments] = useState([]);
  const [currentAssessment, setCurrentAssessment] = useState(null);  const [answers, setAnswers] = useState({});
  
  // New states for question management
  const [assessmentQuestions, setAssessmentQuestions] = useState([]);
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  
  // Use custom hooks for better state management
  const { surveys, loading: surveysLoading, error: surveysError, fetchSurveys } = useSurveys();

  useEffect(() => {
    fetchAssessments();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // We only want to run this once on mount
  // Enhanced data transformation with better backend response handling
  const transformSurveyToAssessment = useCallback((survey) => {
    // Handle different possible response formats from backend
    const surveyId = survey.id || survey.surveyId || survey._id;
    const surveyTitle = survey.title || survey.name || survey.surveyTitle || 'Untitled Assessment';
    const surveyDescription = survey.description || survey.desc || survey.surveyDescription || 'Complete this assessment to track your progress';
    
    // Handle questions count from different possible fields
    const questionCount = survey.questions?.length || 
                         survey.questionCount || 
                         survey.questionsCount || 
                         survey.totalQuestions || 
                         0;
    
    // Handle completion status from different possible fields
    const isCompleted = survey.completed || 
                       survey.isCompleted || 
                       survey.status === 'completed' ||
                       false;
    
    // Handle last taken date from different possible fields
    const lastTakenDate = survey.lastTaken || 
                         survey.lastCompleted || 
                         survey.completedAt || 
                         survey.updatedAt ||
                         null;
    
    // Handle score from different possible fields
    const assessmentScore = survey.score || 
                           survey.totalScore || 
                           survey.result?.score ||
                           null;

    return {
      id: surveyId,
      title: surveyTitle,
      description: surveyDescription,
      questions: questionCount,
      duration: estimateDuration(questionCount),      completed: isCompleted,
      lastTaken: lastTakenDate ? new Date(lastTakenDate) : null,
      score: assessmentScore,
      category: survey.category || survey.categoryId || 'general',
      difficulty: survey.difficulty || survey.level || 'medium',
      surveyData: survey // Keep original data for reference
    };
  }, []); // Dependencies for useCallback

  const fetchAssessments = async () => {
    try {
      console.log('AssessmentPage: Fetching assessments from API...');
      
      // Use the custom hook to fetch surveys
      await fetchSurveys();
      
    } catch (error) {
      console.error('Failed to fetch assessments:', error);
      // Error handling is managed by the custom hook
    }
  };

  // Test function to check API connectivity
  const testApiConnection = async () => {
    console.log('🔍 Testing API Connection...');
    
    try {
      // Test 1: Health check
      console.log('📡 Testing health endpoint...');
      const healthResponse = await ApiService.api.get('/health');
      console.log('✅ Health check:', healthResponse);
    } catch (error) {
      console.error('❌ Health check failed:', error.message);
    }
    
    try {
      // Test 2: Get all surveys
      console.log('📡 Testing surveys endpoint...');
      const surveysResponse = await ApiService.getAllSurveys();
      console.log('✅ Surveys response:', surveysResponse);
      
      if (surveysResponse && surveysResponse.success && surveysResponse.data) {
        const surveys = surveysResponse.data;
        console.log(`✅ Found ${surveys.length} surveys`);
        
        if (surveys.length > 0) {
          const testSurvey = surveys[0];
          console.log('🧪 Testing with first survey:', testSurvey);
          
          // Test 3: Get survey details
          try {
            console.log('📡 Testing survey detail endpoint...');
            const detailResponse = await ApiService.getSurveyWithQuestions(testSurvey.id);
            console.log('✅ Survey detail response:', detailResponse);
          } catch (detailError) {
            console.error('❌ Survey detail failed:', detailError.message);
          }
          
          // Test 4: Get survey questions
          try {
            console.log('📡 Testing survey questions endpoint...');
            const questionsResponse = await ApiService.getSurveyQuestions(testSurvey.id);
            console.log('✅ Survey questions response:', questionsResponse);
          } catch (questionsError) {
            console.error('❌ Survey questions failed:', questionsError.message);
          }
        } else {
          console.warn('⚠️ No surveys found in database');
        }
      }
    } catch (error) {
      console.error('❌ Surveys endpoint failed:', error.message);
    }
  };

  // Transform surveys data when it changes
  useEffect(() => {
    if (surveys && Array.isArray(surveys)) {
      console.log('AssessmentPage: Raw surveys data:', surveys);
      
      const transformedAssessments = surveys.map(transformSurveyToAssessment);
      
      console.log('AssessmentPage: Transformed assessments:', transformedAssessments);
      setAssessments(transformedAssessments);
    } else if (surveysError) {
      console.error('AssessmentPage: Error from surveys hook:', surveysError);      
      // Use fallback mock data when API fails
      setAssessments(getMockAssessments());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [surveys, surveysError]);

  const getMockAssessments = () => {
    return [
      {
        id: 'mock-1',
        title: 'Recovery Progress Assessment',
        description: 'Evaluate your current progress in recovery',
        questions: 15,
        duration: '10-15 minutes',
        completed: false,
        lastTaken: null,
        score: null,
        category: 'recovery',
        difficulty: 'medium'
      },
      {
        id: 'mock-2',
        title: 'Mental Health Check-in',
        description: 'Assess your current mental health status',
        questions: 20,
        duration: '15-20 minutes',
        completed: false,
        lastTaken: null,
        score: null,
        category: 'mental-health',
        difficulty: 'medium'
      }
    ];
  };

  // Enhanced duration estimation with more accurate calculations
  const estimateDuration = (questionCount) => {
    if (!questionCount || questionCount === 0) return '5-10 minutes';
    
    // More realistic estimation: 30-45 seconds per question
    const minMinutes = Math.max(5, Math.ceil(questionCount * 0.5));
    const maxMinutes = Math.max(minMinutes + 2, Math.ceil(questionCount * 0.75));
    
    return `${minMinutes}-${maxMinutes} minutes`;
  };
  const startAssessment = async (assessment) => {
    await handleStartAssessment(assessment);
  };
  const handleStartAssessment = async (assessment) => {
    try {
      console.log('🚀 AssessmentPage: Starting assessment:', assessment.id);
      console.log('📋 Assessment data:', assessment);
      setLoadingQuestions(true);
      
      // Method 1: Try getSurveyWithQuestions (preferred - gets survey + questions)
      console.log('📡 Attempting API Call 1: getSurveyWithQuestions()');
      console.log('🔗 Endpoint: /surveys/' + assessment.id);
      
      const response = await ApiService.getSurveyWithQuestions(assessment.id);
      
      console.log('📥 API Response 1:', response);
      
      if (response && response.success && response.data) {
        const surveyData = response.data;
        const questions = surveyData.questions || [];
        
        console.log('✅ Success: Found', questions.length, 'questions');
        console.log('📝 Questions data:', questions);
        
        setAssessmentQuestions(questions);
        
        const detailedAssessment = {
          ...assessment,
          ...surveyData,
          questions: questions
        };
        
        console.log('✅ Assessment with questions loaded successfully');
        setCurrentAssessment(detailedAssessment);        setAnswers({});
      } else {
        console.warn('⚠️ API Call 1 failed: Invalid response structure');
        console.log('Response details:', { response });
        throw new Error('Failed to load survey questions from primary endpoint');
      }
    } catch (error) {
      console.error('❌ Primary API call failed:', error);
      
      // Method 2: Fallback to getSurveyQuestions (questions only)
      try {
        console.log('📡 Attempting API Call 2 (Fallback): getSurveyQuestions()');
        console.log('🔗 Endpoint: /SurveyQuestion/' + assessment.id);
        
        const questionsResponse = await ApiService.getSurveyQuestions(assessment.id);
        
        console.log('📥 API Response 2:', questionsResponse);
        
        if (questionsResponse && questionsResponse.success) {
          const questions = questionsResponse.data || [];
          console.log('✅ Fallback Success: Found', questions.length, 'questions');
          console.log('📝 Questions data:', questions);
          
          setAssessmentQuestions(questions);
          setCurrentAssessment({
            ...assessment,
            questions: questions
          });
          setAnswers({});
        } else {
          console.warn('⚠️ API Call 2 failed: Invalid response structure');
          console.log('Response details:', { questionsResponse });
          throw new Error('Failed to load questions from fallback endpoint');
        }} catch (fallbackError) {
        console.error('Fallback also failed:', fallbackError);
        
        // ❌ DISABLE MOCK DATA FOR TESTING - Show error instead
        console.error('❌ NO QUESTIONS AVAILABLE - Both API endpoints failed');
        console.error('Primary endpoint (/surveys/{id}) failed:', error.message);
        console.error('Fallback endpoint (/SurveyQuestion/{id}) failed:', fallbackError.message);
        
        // Set empty questions to show "no questions" message
        setAssessmentQuestions([]);
        setCurrentAssessment({
          ...assessment,
          questions: []
        });
        setAnswers({});
        
        // Show user-friendly error message
        alert(`❌ Không thể tải câu hỏi cho assessment "${assessment.title}". 
        
Chi tiết lỗi:
- API chính (/surveys/${assessment.id}): ${error.message}
- API dự phòng (/SurveyQuestion/${assessment.id}): ${fallbackError.message}

Vui lòng:
1. Kiểm tra backend đã chạy chưa
2. Kiểm tra các endpoint API đã được implement chưa
3. Kiểm tra network connection`);
      }
    } finally {
      setLoadingQuestions(false);
    }
  };

  const getMockQuestions = (assessmentId) => {
    // Mock questions for testing
    return [
      {
        id: 1,
        text: "How would you rate your overall mood today?",
        type: "multiple-choice",
        required: true,
        options: [
          { id: 1, text: "Very Poor" },
          { id: 2, text: "Poor" },
          { id: 3, text: "Fair" },
          { id: 4, text: "Good" },
          { id: 5, text: "Excellent" }
        ]
      },
      {
        id: 2,
        text: "How many hours of sleep did you get last night?",
        type: "multiple-choice", 
        required: true,
        options: [
          { id: 1, text: "Less than 4 hours" },
          { id: 2, text: "4-6 hours" },
          { id: 3, text: "6-8 hours" },
          { id: 4, text: "More than 8 hours" }
        ]
      }
    ];
  };
  const handleAnswerChange = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleSubmitAssessment = async () => {
    try {
      console.log('AssessmentPage: Submitting assessment answers:', answers);
      
      // Validate required questions
      const requiredQuestions = assessmentQuestions.filter(q => q.required);
      const missingAnswers = requiredQuestions.filter(q => !answers[q.id]);
      
      if (missingAnswers.length > 0) {
        alert('Please answer all required questions before submitting.');
        return;
      }
      
      // Transform answers to the format expected by the API
      const formattedAnswers = Object.entries(answers).map(([questionId, selectedOptionId]) => ({
        questionId: parseInt(questionId),
        selectedOptionId: selectedOptionId
      }));
      
      console.log('AssessmentPage: Formatted answers:', formattedAnswers);
      
      // Submit assessment answers
      const response = await ApiService.submitSurveyAnswer({
        surveyId: currentAssessment.id,
        userId: ApiService.getCurrentUserId(),
        answers: formattedAnswers
      });
      
      console.log('AssessmentPage: Submission response:', response);
      
      if (response && response.success) {
        const score = response.data?.score || 'N/A';
        const totalPoints = response.data?.totalPoints || 100;
        const percentage = response.data?.percentage || 0;
        
        alert(`Assessment submitted successfully! Your score: ${score}/${totalPoints} (${percentage}%)`);
        
        // Update assessment as completed
        setAssessments(prev => prev.map(assessment => 
          assessment.id === currentAssessment.id 
            ? { ...assessment, completed: true, score: score, lastTaken: new Date() }
            : assessment
        ));
          // Go back to assessments list
        setCurrentAssessment(null);
        setAssessmentQuestions([]);
        setAnswers({});
      } else {
        throw new Error(response?.message || 'Submission failed');
      }
    } catch (error) {
      console.error('Failed to submit assessment:', error);
      alert('Failed to submit assessment. Please try again.');    }
  };

  const renderAssessmentQuestions = () => {
    if (loadingQuestions) {
      return (
        <div className="assessment-loading">
          <div className="assessment-loading-spinner"></div>
          <p>Loading questions...</p>
        </div>
      );
    }

    if (!assessmentQuestions || assessmentQuestions.length === 0) {
      return (
        <div className="assessment-no-questions">
          <p>No questions available for this assessment.</p>          <button 
            onClick={() => {
              setCurrentAssessment(null);
              setAssessmentQuestions([]);
            }}
            className="assessment-btn assessment-btn-secondary"
          >
            Back to Assessments
          </button>
        </div>
      );
    }

    return (
      <div className="assessment-questions">
        {assessmentQuestions.map((question, questionIndex) => (
          <div key={question.id} className="assessment-question-container">
            <div className="assessment-question-header">
              <h3 className="assessment-question-title">
                Question {questionIndex + 1} of {assessmentQuestions.length}
              </h3>
              {question.required && (
                <span className="assessment-question-required-badge">Required</span>
              )}
            </div>
            
            <div className="assessment-question-text">
              {question.text || question.questionText || 'Question text not available'}
            </div>

            <div className="assessment-question-options">
              {question.options && Array.isArray(question.options) && question.options.length > 0 ? (
                question.options.map((option, optionIndex) => {
                  const optionValue = option.id || option;
                  const optionText = option.text || option;
                  
                  return (
                    <div 
                      key={option.id || optionIndex} 
                      className={`assessment-option ${answers[question.id] === optionValue ? 'selected' : ''}`}
                      onClick={() => handleAnswerChange(question.id, optionValue)}
                    >
                      <div className="assessment-option-radio">
                        {answers[question.id] === optionValue && <div className="assessment-option-radio-selected"></div>}
                      </div>
                      <span className="assessment-option-text">{optionText}</span>
                    </div>
                  );
                })
              ) : (
                <div className="assessment-text-input">
                  <textarea
                    value={answers[question.id] || ''}
                    onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                    placeholder="Enter your response..."
                    rows={3}
                  />
                </div>
              )}
            </div>
            
            {question.required && !answers[question.id] && (
              <div className="assessment-question-required">* This field is required</div>
            )}
          </div>
        ))}
      </div>
    );
  };

  // Show loading state while fetching surveys
  if (surveysLoading && assessments.length === 0) {
    return (
      <div className="assessment-page">
        <div className="assessment-container">
          <div className="text-center">
            <div className="loading-spinner"></div>
            <p>Loading assessments...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show error state if there's an error and no fallback data
  if (surveysError && assessments.length === 0) {
    return (
      <div className="assessment-page">
        <div className="assessment-container">
          <div className="text-center">
            <div className="error-message">
              <h2>Unable to Load Assessments</h2>
              <p>There was an error loading your assessments. Please try again later.</p>
              <button 
                onClick={fetchAssessments}
                className="btn btn-primary"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }  if (currentAssessment) {
    return (
      <div className="assessment-page">
        <div className="assessment-container">
          <div className="assessment-card">
            <div className="assessment-header-info">
              <h1>{currentAssessment.title}</h1>
              <p>{currentAssessment.description}</p>
              <div className="assessment-progress">
                <span>Questions: {assessmentQuestions.length || 0}</span>
                <span>Duration: {currentAssessment.duration}</span>
              </div>
            </div>
            
            {/* Render questions using the new method */}
            {renderAssessmentQuestions()}

            <div className="assessment-actions">              <button 
                onClick={() => {
                  setCurrentAssessment(null);
                  setAssessmentQuestions([]);
                  setAnswers({});
                }}
                className="assessment-btn assessment-btn-secondary"
              >
                Back to Assessments
              </button>
              <button 
                onClick={handleSubmitAssessment}
                className="assessment-btn assessment-btn-primary"
                disabled={
                  loadingQuestions || 
                  (assessmentQuestions.some(q => q.required && !answers[q.id]))
                }
              >
                {loadingQuestions ? 'Loading...' : 'Submit Assessment'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="assessment-page">
      <div className="assessment-container">        <div className="assessment-header">
          <h1>Recovery Assessments</h1>
          <p>Track your progress and evaluate your recovery journey with our comprehensive assessments</p>
          
          {/* Debug: Test API Connection Button */}
          <div className="assessment-debug-section" style={{ marginTop: '1rem', padding: '1rem', background: '#f8f9fa', borderRadius: '8px', border: '1px solid #dee2e6' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: '#495057' }}>🔧 Debug Tools</h4>
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
            <small style={{ display: 'block', marginTop: '0.5rem', color: '#6c757d' }}>
              Click to test if backend APIs are working. Check browser console for detailed logs.
            </small>
          </div>
        </div>

        <div className="assessment-grid">
          {assessments.map((assessment) => (
            <div key={assessment.id} className="assessment-card">
              <div className="assessment-card-header">
                <div className="assessment-card-icon">
                  <FaClipboardList />
                </div>
                <div className="assessment-card-content">
                  <h3 className="assessment-card-title">{assessment.title}</h3>
                  <p className="assessment-card-description">{assessment.description}</p>
                </div>
              </div>
              
              <div className="assessment-card-meta">
                <div className="assessment-meta-item">
                  <FaClipboardList />
                  <span>{assessment.questions} questions</span>
                </div>
                <div className="assessment-meta-item">
                  <FaClock />
                  <span>{assessment.duration}</span>
                </div>
              </div>
              
              {assessment.completed ? (
                <div className="assessment-completed">
                  <div className="assessment-score">
                    <span className="assessment-score-label">Last completed:</span>
                    <span className="assessment-score-value">{assessment.lastTaken}</span>
                  </div>
                  <div className="assessment-score">
                    <span className="assessment-score-label">Score:</span>
                    <span className="assessment-score-value assessment-score-number">{assessment.score}/100</span>
                  </div>
                  <div className="assessment-status">
                    <FaCheckCircle />
                    <span>Completed</span>
                  </div>
                  <button
                    onClick={() => startAssessment(assessment)}
                    className="assessment-btn assessment-btn-primary"
                  >
                    Retake Assessment
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => startAssessment(assessment)}
                  className="assessment-btn assessment-btn-primary"
                >
                  Start Assessment
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="assessment-overview">
          <h2 className="assessment-overview-title">Your Progress Overview</h2>
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
      </div>
    </div>
  );
};

export default AssessmentPage;
