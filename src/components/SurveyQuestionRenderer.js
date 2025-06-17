import React from 'react';

const SurveyQuestionRenderer = ({ questions, onAnswerChange, answers }) => {
  if (!questions || questions.length === 0) {
    return <div>No questions available</div>;
  }

  return (
    <div className="survey-questions">
      {questions.map((question, index) => (
        <div key={question.questionId} className="question-item">
          <h3>Câu {index + 1}: {question.content}</h3>
          <div className="answers">
            {question.answers?.map((answer) => (
              <label key={answer.answerId} className="answer-option">
                <input 
                  type="radio" 
                  name={`question_${question.questionId}`} 
                  value={answer.answerId}
                  checked={answers[question.questionId] === answer.answerId}
                  onChange={(e) => onAnswerChange(question.questionId, e.target.value)}
                />
                <span>{answer.answerText}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SurveyQuestionRenderer;
