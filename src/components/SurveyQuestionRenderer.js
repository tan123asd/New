import React from 'react';

const SurveyQuestionRenderer = ({ questions, onAnswerChange, answers }) => {
  if (!questions || questions.length === 0) {
    return <div>No questions available</div>;
  }

  return (
    <div className="survey-questions">
      {questions.map((question, index) => {
        // ✅ ĐÚNG: Map theo PascalCase từ backend Azure database
        const questionId = question.QuestionId;
        const questionContent = question.Content;
        const questionAnswers = question.Answers || [];
        
        if (!questionId || !questionContent) {
          console.warn('Invalid question data:', question);
          return null;
        }
        
        return (
          <div key={questionId} className="question-item">
            <h3>Câu {index + 1}: {questionContent}</h3>
            <div className="answers">
              {questionAnswers.map((answer) => {
                // ✅ ĐÚNG: Map theo PascalCase từ backend
                const answerId = answer.AnswerId;
                const answerText = answer.AnswerText;
                
                if (!answerId || !answerText) {
                  console.warn('Invalid answer data:', answer);
                  return null;
                }
                
                return (
                  <label key={answerId} className="answer-option">
                    <input 
                      type="radio" 
                      name={`question_${questionId}`} 
                      value={answerId}
                      checked={answers[questionId] === answerId}
                      onChange={(e) => onAnswerChange(questionId, e.target.value)}
                    />
                    <span>{answerText}</span>
                  </label>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SurveyQuestionRenderer;
