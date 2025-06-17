import React from 'react';

const SurveyQuestionRenderer = ({ questions, onAnswerChange, answers }) => {
  if (!questions || questions.length === 0) {
    return <div>No questions available</div>;
  }

  return (
    <div className="survey-questions">
      {questions.map((question, index) => {
        // ✅ ĐÚNG: Map theo PascalCase từ backend Azure database
        const questionId = question.QuestionId || question.questionId;
        const questionContent = question.Content || question.content;
        const questionAnswers = question.Answers || question.answers || [];
        
        return (
          <div key={questionId} className="question-item">
            <h3>Câu {index + 1}: {questionContent}</h3>
            <div className="answers">
              {questionAnswers.map((answer) => {
                // ✅ ĐÚNG: Map theo PascalCase từ backend
                const answerId = answer.AnswerId || answer.answerId;
                const answerText = answer.AnswerText || answer.answerText;
                
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
