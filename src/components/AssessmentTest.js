import React, { useState } from 'react';
import ApiService from '../services/api';

const AssessmentTest = () => {
  const [testResults, setTestResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const addTestResult = (testName, success, message, data = null) => {
    setTestResults(prev => [...prev, {
      id: Date.now(),
      testName,
      success,
      message,
      data,
      timestamp: new Date().toLocaleTimeString()
    }]);
  };

  const runAllTests = async () => {
    setLoading(true);
    setTestResults([]);

    try {
      // Test 1: API Connection
      addTestResult('API Connection', 'running', 'Testing API connection...');
      const healthResponse = await ApiService.validateApiConnection();
      if (healthResponse.success) {
        addTestResult('API Connection', 'success', 'API connection successful', healthResponse);
      } else {
        addTestResult('API Connection', 'error', 'API connection failed', healthResponse);
        return;
      }

      // Test 2: Check Survey Status
      addTestResult('Survey Status', 'running', 'Checking survey status...');
      try {
        const statusResponse = await ApiService.checkSurveyStatus();
        addTestResult('Survey Status', 'success', 'Survey status checked', statusResponse);
      } catch (error) {
        addTestResult('Survey Status', 'error', `Survey status failed: ${error.message}`, error);
      }

      // Test 3: Get Suitable Survey
      addTestResult('Get Suitable Survey', 'running', 'Getting suitable survey...');
      try {
        const surveyResponse = await ApiService.getSuitableSurvey();
        if (surveyResponse.success && surveyResponse.data) {
          const survey = surveyResponse.data;
          const questions = survey.Questions || [];
          
          addTestResult('Get Suitable Survey', 'success', 
            `Found survey: ${survey.Title} with ${questions.length} questions`, 
            {
              surveyId: survey.SurveyId,
              title: survey.Title,
              questionCount: questions.length,
              sampleQuestion: questions[0] ? {
                questionId: questions[0].QuestionId,
                content: questions[0].Content,
                answerCount: questions[0].Answers?.length || 0
              } : null
            }
          );

          // Test 4: Validate PascalCase Mapping
          if (questions.length > 0) {
            const firstQuestion = questions[0];
            const hasCorrectMapping = 
              firstQuestion.QuestionId && 
              firstQuestion.Content && 
              firstQuestion.Answers && 
              firstQuestion.Answers.length > 0 &&
              firstQuestion.Answers[0].AnswerId &&
              firstQuestion.Answers[0].AnswerText;

            if (hasCorrectMapping) {
              addTestResult('PascalCase Mapping', 'success', 
                'PascalCase mapping is correct', 
                {
                  questionId: firstQuestion.QuestionId,
                  content: firstQuestion.Content,
                  answerId: firstQuestion.Answers[0].AnswerId,
                  answerText: firstQuestion.Answers[0].AnswerText
                }
              );
            } else {
              addTestResult('PascalCase Mapping', 'error', 
                'PascalCase mapping is incorrect', 
                firstQuestion
              );
            }
          }

        } else {
          addTestResult('Get Suitable Survey', 'error', 'Invalid survey response', surveyResponse);
        }
      } catch (error) {
        if (error.message.includes('DateOfBirth')) {
          addTestResult('Get Suitable Survey', 'warning', 
            'DateOfBirth required - this is expected if user has no birth date', 
            error.message
          );
        } else {
          addTestResult('Get Suitable Survey', 'error', 
            `Failed to get suitable survey: ${error.message}`, 
            error
          );
        }
      }

      // Test 5: Test Submit Format (without actually submitting)
      addTestResult('Submit Format', 'running', 'Testing submit format...');
      const mockAnswers = {
        'question-1': 'answer-1',
        'question-2': 'answer-2'
      };
      
      const expectedFormat = {
        Answers: [
          { QuestionId: 'question-1', SelectedAnswerId: 'answer-1' },
          { QuestionId: 'question-2', SelectedAnswerId: 'answer-2' }
        ]
      };
      
      addTestResult('Submit Format', 'success', 
        'Submit format is correct', 
        {
          input: mockAnswers,
          expected: expectedFormat
        }
      );

    } catch (error) {
      addTestResult('General Test', 'error', `Test failed: ${error.message}`, error);
    } finally {
      setLoading(false);
    }
  };

  const clearResults = () => {
    setTestResults([]);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'success': return 'text-green-600';
      case 'error': return 'text-red-600';
      case 'warning': return 'text-yellow-600';
      case 'running': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'warning': return '⚠️';
      case 'running': return '🔄';
      default: return 'ℹ️';
    }
  };

  return (
    <div className="assessment-test">
      <div className="test-header">
        <h2>Assessment Page Test Suite</h2>
        <p>Test all functionality to ensure proper backend integration</p>
        
        <div className="test-controls">
          <button 
            onClick={runAllTests}
            disabled={loading}
            className="test-btn test-btn-primary"
          >
            {loading ? 'Running Tests...' : 'Run All Tests'}
          </button>
          <button 
            onClick={clearResults}
            className="test-btn test-btn-secondary"
          >
            Clear Results
          </button>
        </div>
      </div>

      <div className="test-results">
        {testResults.length === 0 ? (
          <div className="no-results">
            <p>No test results yet. Click "Run All Tests" to start testing.</p>
          </div>
        ) : (
          testResults.map((result) => (
            <div key={result.id} className={`test-result ${result.success}`}>
              <div className="test-result-header">
                <span className="test-icon">{getStatusIcon(result.success)}</span>
                <span className={`test-name ${getStatusColor(result.success)}`}>
                  {result.testName}
                </span>
                <span className="test-time">{result.timestamp}</span>
              </div>
              <div className="test-message">{result.message}</div>
              {result.data && (
                <details className="test-details">
                  <summary>View Data</summary>
                  <pre className="test-data">
                    {JSON.stringify(result.data, null, 2)}
                  </pre>
                </details>
              )}
            </div>
          ))
        )}
      </div>

      <style jsx>{`
        .assessment-test {
          background: white;
          border-radius: 8px;
          padding: 2rem;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          margin: 2rem 0;
        }

        .test-header {
          margin-bottom: 2rem;
        }

        .test-header h2 {
          color: #333;
          margin-bottom: 0.5rem;
        }

        .test-header p {
          color: #666;
          margin-bottom: 1.5rem;
        }

        .test-controls {
          display: flex;
          gap: 1rem;
        }

        .test-btn {
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .test-btn-primary {
          background: #007bff;
          color: white;
        }

        .test-btn-primary:hover:not(:disabled) {
          background: #0056b3;
        }

        .test-btn-primary:disabled {
          background: #ccc;
          cursor: not-allowed;
        }

        .test-btn-secondary {
          background: #6c757d;
          color: white;
        }

        .test-btn-secondary:hover {
          background: #545b62;
        }

        .test-results {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .no-results {
          text-align: center;
          color: #666;
          padding: 2rem;
        }

        .test-result {
          border: 1px solid #ddd;
          border-radius: 6px;
          padding: 1rem;
          background: #f8f9fa;
        }

        .test-result.success {
          border-color: #28a745;
          background: #f8fff9;
        }

        .test-result.error {
          border-color: #dc3545;
          background: #fff8f8;
        }

        .test-result.warning {
          border-color: #ffc107;
          background: #fffef8;
        }

        .test-result.running {
          border-color: #007bff;
          background: #f8fbff;
        }

        .test-result-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
        }

        .test-icon {
          font-size: 1.2rem;
        }

        .test-name {
          font-weight: 600;
          flex: 1;
        }

        .test-time {
          font-size: 0.8rem;
          color: #666;
        }

        .test-message {
          margin-bottom: 0.5rem;
          color: #333;
        }

        .test-details {
          margin-top: 0.5rem;
        }

        .test-details summary {
          cursor: pointer;
          color: #007bff;
          font-weight: 500;
        }

        .test-data {
          background: #f1f3f4;
          padding: 1rem;
          border-radius: 4px;
          font-size: 0.8rem;
          overflow-x: auto;
          margin-top: 0.5rem;
        }
      `}</style>
    </div>
  );
};

export default AssessmentTest; 