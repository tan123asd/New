import React, { useState, useEffect, useCallback } from 'react';
import { FaClipboardList, FaChartLine, FaCheckCircle, FaClock } from 'react-icons/fa';
import { useSurveys } from '../hooks';
import ApiService from '../services/api';
import SurveyQuestionRenderer from '../components/SurveyQuestionRenderer';
import DatabaseStructureTest from '../components/DatabaseStructureTest';
import './AssessmentPage.css';

const AssessmentPage = () => {  const [assessments, setAssessments] = useState([]);
  const [currentAssessment, setCurrentAssessment] = useState(null);  const [answers, setAnswers] = useState({});
    // New states for question management
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [assessmentQuestions, setAssessmentQuestions] = useState([]);
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  // Database testing state
  const [showDatabaseTest, setShowDatabaseTest] = useState(false);
  
  // Use custom hooks for better state management
  const { surveys, loading: surveysLoading, error: surveysError, fetchSurveys } = useSurveys();

  useEffect(() => {
    fetchAssessments();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // We only want to run this once on mount  // Enhanced data transformation - MAPPING ĐÚNG THEO BACKEND PASCALCASE
  const transformSurveyToAssessment = useCallback((survey) => {
    // ✅ ĐÚNG: Map theo PascalCase từ backend Azure database
    const surveyId = survey.SurveyId || survey.Id || survey.id;
    const surveyTitle = survey.Title || survey.title || 'Untitled Assessment';
    const surveyDescription = survey.Description || survey.description || 'Complete this assessment to track your progress';
    
    // ✅ ĐÚNG: Handle Questions array từ backend
    const questionCount = survey.Questions?.length || 
                         survey.questionCount || 
                         0;
    
    // ✅ ĐÚNG: Handle completion status
    const isCompleted = survey.IsCompleted || 
                       survey.completed || 
                       survey.status === 'completed' ||
                       false;
    
    // ✅ ĐÚNG: Handle timestamps từ backend
    const lastTakenDate = survey.LastTaken || 
                         survey.CompletedAt || 
                         survey.UpdatedAt ||
                         null;
      // ✅ ĐÚNG: Handle score từ backend
    const assessmentScore = survey.Score || 
                           survey.TotalScore || 
                           survey.Result?.Score ||
                           null;

    return {
      id: surveyId,
      title: surveyTitle,
      description: surveyDescription,
      questions: questionCount,
      duration: estimateDuration(questionCount),
      completed: isCompleted,
      lastTaken: lastTakenDate ? new Date(lastTakenDate) : null,
      score: assessmentScore,
      category: survey.Category || survey.CategoryId || 'general',
      difficulty: survey.Difficulty || survey.Level || 'medium',
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
      setAssessments(transformedAssessments);    } else if (surveysError) {
      console.error('AssessmentPage: Error from surveys hook:', surveysError);      
      // ✅ REMOVED: No fallback mock data - show empty state
      setAssessments([]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [surveys, surveysError]);
  // ✅ REMOVED: Mock data function completely removed - only use real API data
  
  // Enhanced duration estimation with more accurate calculations
  const estimateDuration = (questionCount) => {
    if (!questionCount || questionCount === 0) return '5-10 minutes';
    
    // More realistic estimation: 30-45 seconds per question
    const minMinutes = Math.max(5, Math.ceil(questionCount * 0.5));
    const maxMinutes = Math.max(minMinutes + 2, Math.ceil(questionCount * 0.75));
    
    return `${minMinutes}-${maxMinutes} minutes`;
  };  const startAssessment = async (assessment) => {
    setSelectedAssessment(assessment);
    await handleStartAssessment(assessment);
  };

  const handleStartAssessment = async (assessment) => {
    try {
      setLoadingQuestions(true);
      setSelectedAssessment(assessment);
      
      console.log('Loading questions for assessment:', assessment.id);
      const response = await ApiService.getSurvey(assessment.id);
      
      if (response && response.success && response.data && response.data.questions) {
        setAssessmentQuestions(response.data.questions);
        console.log(`Loaded ${response.data.questions.length} questions`);
        
        setCurrentAssessment({
          ...assessment,
          questions: response.data.questions
        });
        setAnswers({});
      } else {
        console.warn('No questions found in survey data');
        setAssessmentQuestions([]);
        alert('Không thể tải câu hỏi. Vui lòng thử lại sau.');
      }
    } catch (error) {
      console.error('Failed to load assessment questions:', error);
      alert('Không thể tải câu hỏi. Vui lòng thử lại sau.');
    } finally {
      setLoadingQuestions(false);
    }  };

  // ✅ REMOVED: Mock questions function completely removed - only use real API data
  
  const handleAnswerChange = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };
  const handleSubmitAssessment = async () => {
    try {
      console.log('✅ AssessmentPage: Submitting assessment answers:', answers);
      
      if (!currentAssessment || !currentAssessment.id) {
        alert('No assessment selected');
        return;
      }
      
      // Validate required questions
      const requiredQuestions = assessmentQuestions.filter(q => q.required);
      const missingAnswers = requiredQuestions.filter(q => !answers[q.QuestionId || q.id]);
      
      if (missingAnswers.length > 0) {
        alert('Please answer all required questions before submitting.');
        return;
      }
      
      // ✅ ĐÚNG: Submit theo format backend Azure mong đợi
      console.log('🎯 Submitting to survey ID:', currentAssessment.id);
      console.log('📤 Raw answers:', answers);
      
      const response = await ApiService.submitSurveyAnswers(currentAssessment.id, answers);
      
      console.log('✅ Submission successful:', response);      
      if (response.success) {
        const score = response.data?.Score || response.data?.score || 'N/A';
        const totalPoints = response.data?.TotalPoints || response.data?.totalPoints || 100;
        const percentage = response.data?.Percentage || response.data?.percentage || 0;
        
        alert(`Assessment submitted successfully! Your score: ${score}/${totalPoints} (${percentage}%)`);
        
        // Update assessment as completed
        setAssessments(prev => prev.map(assessment => 
          assessment.id === currentAssessment.id 
            ? { ...assessment, completed: true, score: score, lastTaken: new Date() }
            : assessment
        ));
        
        // Reset state        setCurrentAssessment(null);
        setSelectedAssessment(null);
        setAssessmentQuestions([]);
        setAnswers({});
      } else {
        alert('Submission failed: ' + (response.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Failed to submit assessment:', error);
      alert('Failed to submit assessment. Please try again.');
    }
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
              setSelectedAssessment(null);
              setAssessmentQuestions([]);
            }}
            className="assessment-btn assessment-btn-secondary"
          >
            Back to Assessments
          </button>
        </div>
      );
    }    return (
      <div className="assessment-questions">
        <SurveyQuestionRenderer 
          questions={assessmentQuestions.map(q => ({
            questionId: q.id,
            content: q.text || q.questionText || 'Question text not available',
            answers: q.options?.map(opt => ({
              answerId: opt.id || opt,
              answerText: opt.text || opt
            })) || []
          }))}
          onAnswerChange={handleAnswerChange}
          answers={answers}
        />
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
                  setSelectedAssessment(null);
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
                  fontSize: '0.875rem'                }}
              >
                🗄️ {showDatabaseTest ? 'Hide' : 'Test'} Database Structure
              </button>
            </div>
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
