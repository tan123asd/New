import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faInfoCircle,
  faCheckCircle,
  faExclamationCircle,
  faArrowRight,
  faArrowLeft,
  faClipboardList,
  faChartBar,
  faUserShield,
  faLock,
} from '@fortawesome/free-solid-svg-icons';
import './AssessmentPage.css';

const AssessmentPage = () => {
  const [activeTab, setActiveTab] = useState('assist');
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  // ASSIST Assessment Questions
  const assistQuestions = [
    {
      id: 1,
      question: 'Trong 3 tháng qua, bạn đã sử dụng các chất sau bao nhiêu lần?',
      substances: [
        'Rượu bia',
        'Cần sa',
        'Cocain',
        'Thuốc lắc',
        'Heroin',
        'Thuốc an thần',
        'Thuốc kích thích',
        'Các chất khác'
      ],
      options: [
        { value: 0, label: 'Không bao giờ' },
        { value: 1, label: '1-2 lần' },
        { value: 2, label: '3-5 lần' },
        { value: 3, label: '6-9 lần' },
        { value: 4, label: '10 lần trở lên' }
      ]
    },
    {
      id: 2,
      question: 'Trong 3 tháng qua, bạn đã từng cảm thấy thèm muốn hoặc thôi thúc sử dụng các chất trên không?',
      options: [
        { value: 0, label: 'Không bao giờ' },
        { value: 1, label: 'Hiếm khi' },
        { value: 2, label: 'Thỉnh thoảng' },
        { value: 3, label: 'Thường xuyên' },
        { value: 4, label: 'Rất thường xuyên' }
      ]
    },
    {
      id: 3,
      question: 'Trong 3 tháng qua, việc sử dụng các chất trên đã gây ra vấn đề về sức khỏe, xã hội, pháp lý hoặc tài chính cho bạn không?',
      options: [
        { value: 0, label: 'Không' },
        { value: 1, label: 'Có, nhưng không nghiêm trọng' },
        { value: 2, label: 'Có, ở mức độ trung bình' },
        { value: 3, label: 'Có, ở mức độ nghiêm trọng' }
      ]
    },
    {
      id: 4,
      question: 'Trong 3 tháng qua, bạn có từng thất bại trong việc làm những gì thường được mong đợi ở bạn do sử dụng các chất trên không?',
      options: [
        { value: 0, label: 'Không' },
        { value: 1, label: 'Có, nhưng không thường xuyên' },
        { value: 2, label: 'Có, thường xuyên' }
      ]
    },
    {
      id: 5,
      question: 'Bạn bè hoặc người thân có từng bày tỏ lo ngại về việc sử dụng các chất của bạn không?',
      options: [
        { value: 0, label: 'Không' },
        { value: 1, label: 'Có, nhưng không thường xuyên' },
        { value: 2, label: 'Có, thường xuyên' }
      ]
    },
    {
      id: 6,
      question: 'Bạn đã từng cố gắng giảm hoặc ngừng sử dụng các chất trên nhưng không thành công không?',
      options: [
        { value: 0, label: 'Không' },
        { value: 1, label: 'Có, nhưng không thường xuyên' },
        { value: 2, label: 'Có, thường xuyên' }
      ]
    },
    {
      id: 7,
      question: 'Bạn đã từng sử dụng thuốc bằng đường tiêm chích không?',
      options: [
        { value: 0, label: 'Không bao giờ' },
        { value: 1, label: 'Có, nhưng không trong 3 tháng qua' },
        { value: 2, label: 'Có, trong 3 tháng qua' }
      ]
    }
  ];

  // CRAFFT Assessment Questions
  const crafftQuestions = [
    {
      id: 'C',
      question: 'Bạn đã từng lái xe trong khi đang say hoặc đang sử dụng chất gây nghiện không?',
      options: [
        { value: 0, label: 'Không' },
        { value: 1, label: 'Có' }
      ]
    },
    {
      id: 'R',
      question: 'Bạn có từng sử dụng chất gây nghiện để thư giãn, cảm thấy tốt hơn về bản thân, hoặc hòa nhập với mọi người không?',
      options: [
        { value: 0, label: 'Không' },
        { value: 1, label: 'Có' }
      ]
    },
    {
      id: 'A',
      question: 'Bạn có từng sử dụng chất gây nghiện khi ở một mình không?',
      options: [
        { value: 0, label: 'Không' },
        { value: 1, label: 'Có' }
      ]
    },
    {
      id: 'F',
      question: 'Bạn có từng quên những việc bạn đã làm khi đang sử dụng chất gây nghiện không?',
      options: [
        { value: 0, label: 'Không' },
        { value: 1, label: 'Có' }
      ]
    },
    {
      id: 'F',
      question: 'Gia đình hoặc bạn bè có từng nói với bạn rằng bạn nên giảm bớt việc sử dụng chất gây nghiện không?',
      options: [
        { value: 0, label: 'Không' },
        { value: 1, label: 'Có' }
      ]
    },
    {
      id: 'T',
      question: 'Bạn có từng gặp rắc rối khi đang sử dụng chất gây nghiện không?',
      options: [
        { value: 0, label: 'Không' },
        { value: 1, label: 'Có' }
      ]
    }
  ];

  const handleAnswer = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const calculateAssistScore = () => {
    let totalScore = 0;
    Object.entries(answers).forEach(([questionId, value]) => {
      if (questionId.startsWith('assist_')) {
        totalScore += value;
      }
    });
    return totalScore;
  };

  const calculateCrafftScore = () => {
    let totalScore = 0;
    Object.entries(answers).forEach(([questionId, value]) => {
      if (questionId.startsWith('crafft_')) {
        totalScore += value;
      }
    });
    return totalScore;
  };

  const getAssistRiskLevel = (score) => {
    if (score <= 3) return { level: 'Thấp', color: '#4caf50', description: 'Nguy cơ thấp, không cần can thiệp' };
    if (score <= 26) return { level: 'Trung bình', color: '#ff9800', description: 'Nguy cơ trung bình, cần tư vấn ngắn' };
    return { level: 'Cao', color: '#f44336', description: 'Nguy cơ cao, cần can thiệp chuyên sâu' };
  };

  const getCrafftRiskLevel = (score) => {
    if (score <= 2) return { level: 'Thấp', color: '#4caf50', description: 'Nguy cơ thấp, không cần can thiệp' };
    return { level: 'Cao', color: '#f44336', description: 'Nguy cơ cao, cần đánh giá chuyên sâu' };
  };

  const handleNext = () => {
    if (currentStep < (activeTab === 'assist' ? assistQuestions.length : crafftQuestions.length)) {
      setCurrentStep(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentStep(1);
    setShowResults(false);
  };

  const currentQuestions = activeTab === 'assist' ? assistQuestions : crafftQuestions;
  const currentQuestion = currentQuestions[currentStep - 1];

  return (
    <div className="assessment-page">
      <div className="assessment-header">
        <div className="assessment-header-content">
          <h1>Đánh Giá Nguy Cơ Sử Dụng Chất Gây Nghiện</h1>
          <p>Sử dụng công cụ ASSIST và CRAFFT để đánh giá nguy cơ sử dụng chất gây nghiện một cách chuyên nghiệp và bảo mật</p>
        </div>
      </div>

      <div className="assessment-container">
        <div className="assessment-tabs">
          <button
            className={`tab-btn ${activeTab === 'assist' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('assist');
              handleReset();
            }}
          >
            <FontAwesomeIcon icon={faClipboardList} />
            ASSIST
          </button>
          <button
            className={`tab-btn ${activeTab === 'crafft' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('crafft');
              handleReset();
            }}
          >
            <FontAwesomeIcon icon={faChartBar} />
            CRAFFT
          </button>
        </div>

        <div className="assessment-content">
          {!showResults ? (
            <>
              <div className="assessment-progress">
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${(currentStep / currentQuestions.length) * 100}%`
                    }}
                  />
                </div>
                <span className="progress-text">
                  Câu hỏi {currentStep}/{currentQuestions.length}
                </span>
              </div>

              <div className="question-card">
                <div className="question-header">
                  <h3>{currentQuestion.question}</h3>
                  {currentQuestion.substances && (
                    <div className="substances-list">
                      {currentQuestion.substances.map((substance, index) => (
                        <span key={index} className="substance-tag">
                          {substance}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="options-grid">
                  {currentQuestion.options.map((option) => (
                    <button
                      key={option.value}
                      className={`option-btn ${
                        answers[`${activeTab}_${currentQuestion.id}`] === option.value
                          ? 'selected'
                          : ''
                      }`}
                      onClick={() => handleAnswer(`${activeTab}_${currentQuestion.id}`, option.value)}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>

                <div className="question-navigation">
                  {currentStep > 1 && (
                    <button className="btn-back" onClick={handleBack}>
                      <FontAwesomeIcon icon={faArrowLeft} />
                      Quay lại
                    </button>
                  )}
                  <button
                    className="btn-next"
                    onClick={handleNext}
                    disabled={answers[`${activeTab}_${currentQuestion.id}`] === undefined}
                  >
                    {currentStep === currentQuestions.length ? 'Xem kết quả' : 'Tiếp tục'}
                    <FontAwesomeIcon icon={faArrowRight} />
                  </button>
                </div>
              </div>

              <div className="assessment-info">
                <div className="info-card">
                  <FontAwesomeIcon icon={faUserShield} />
                  <h4>Bảo mật thông tin</h4>
                  <p>Tất cả thông tin của bạn sẽ được bảo mật và chỉ được sử dụng cho mục đích đánh giá.</p>
                </div>
                <div className="info-card">
                  <FontAwesomeIcon icon={faInfoCircle} />
                  <h4>Hướng dẫn</h4>
                  <p>Hãy trả lời trung thực để có kết quả đánh giá chính xác nhất.</p>
                </div>
              </div>
            </>
          ) : (
            <div className="results-card">
              <h2>Kết Quả Đánh Giá</h2>
              
              {activeTab === 'assist' ? (
                <>
                  <div className="score-section">
                    <h3>Điểm ASSIST</h3>
                    <div className="score-display">
                      {calculateAssistScore()}
                    </div>
                    <div 
                      className="risk-level"
                      style={{ 
                        backgroundColor: getAssistRiskLevel(calculateAssistScore()).color 
                      }}
                    >
                      {getAssistRiskLevel(calculateAssistScore()).level}
                    </div>
                    <p className="risk-description">
                      {getAssistRiskLevel(calculateAssistScore()).description}
                    </p>
                  </div>

                  <div className="recommendations">
                    <h3>Khuyến nghị</h3>
                    <ul>
                      <li>
                        <FontAwesomeIcon icon={faCheckCircle} />
                        Tham khảo ý kiến chuyên gia tư vấn
                      </li>
                      <li>
                        <FontAwesomeIcon icon={faCheckCircle} />
                        Tham gia các chương trình giáo dục phòng chống ma túy
                      </li>
                      <li>
                        <FontAwesomeIcon icon={faCheckCircle} />
                        Duy trì lối sống lành mạnh
                      </li>
                    </ul>
                  </div>
                </>
              ) : (
                <>
                  <div className="score-section">
                    <h3>Điểm CRAFFT</h3>
                    <div className="score-display">
                      {calculateCrafftScore()}
                    </div>
                    <div 
                      className="risk-level"
                      style={{ 
                        backgroundColor: getCrafftRiskLevel(calculateCrafftScore()).color 
                      }}
                    >
                      {getCrafftRiskLevel(calculateCrafftScore()).level}
                    </div>
                    <p className="risk-description">
                      {getCrafftRiskLevel(calculateCrafftScore()).description}
                    </p>
                  </div>

                  <div className="recommendations">
                    <h3>Khuyến nghị</h3>
                    <ul>
                      <li>
                        <FontAwesomeIcon icon={faCheckCircle} />
                        Tham gia tư vấn chuyên sâu
                      </li>
                      <li>
                        <FontAwesomeIcon icon={faCheckCircle} />
                        Thảo luận với gia đình và bạn bè
                      </li>
                      <li>
                        <FontAwesomeIcon icon={faCheckCircle} />
                        Tìm hiểu về các nguồn hỗ trợ
                      </li>
                    </ul>
                  </div>
                </>
              )}

              <div className="results-actions">
                <button className="btn-primary" onClick={handleReset}>
                  Làm lại đánh giá
                </button>
                <button className="btn-secondary">
                  Đặt lịch tư vấn
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssessmentPage; 