import React, { useState } from 'react';

// Danh sách câu hỏi và các lựa chọn
const questions = [
  {
    id: 1,
    question: 'Trong 3 tháng qua, bạn có sử dụng các chất gây nghiện nào sau đây không?',
    options: ['Không bao giờ', 'Một hoặc hai lần', 'Hàng tháng', 'Hàng tuần', 'Hàng ngày'],
  },
  {
    id: 2,
    question: 'Bạn thường xuyên cảm thấy thèm muốn sử dụng chất gây nghiện không?',
    options: ['Không bao giờ', 'Một hoặc hai lần', 'Hàng tháng', 'Hàng tuần', 'Hàng ngày'],
  },
  // Có thể thêm nhiều câu hỏi khác tương tự...
];

function AssistSurvey() {
  // Biến state lưu bước câu hỏi hiện tại, bắt đầu từ 0 (câu đầu tiên)
  const [step, setStep] = useState(0);

  // Biến state lưu câu trả lời người dùng, dạng object: { bước: lựa chọn }
  const [answers, setAnswers] = useState({});

  // Biến state để xác định đã hoàn thành khảo sát và hiển thị kết quả
  const [showResult, setShowResult] = useState(false);

  // Hàm gọi khi người dùng chọn một lựa chọn
  const handleSelect = (value) => {
    // Cập nhật câu trả lời cho câu hỏi hiện tại
    setAnswers({ ...answers, [step]: value });
  };

  // Hàm gọi khi nhấn nút "Tiếp theo" hoặc "Hoàn thành"
  const handleNext = () => {
    if (step < questions.length - 1) {
      // Nếu chưa phải câu cuối, chuyển sang câu tiếp theo
      setStep(step + 1);
    } else {
      // Nếu là câu cuối, hiển thị kết quả
      setShowResult(true);
    }
  };

  // Hàm tính tổng điểm từ các câu trả lời
  const getScore = () => {
    let total = 0;
    for (let key in answers) {
      total += answers[key]; // Cộng chỉ số lựa chọn (0,1,2,3,4)
    }
    return total;
  };

  // Hàm đánh giá mức độ dựa trên tổng điểm
  const getLevel = (score) => {
    if (score <= 3) return 'Thấp';
    if (score <= 6) return 'Trung bình';
    return 'Cao';
  };

  // Nếu đã hoàn thành, hiển thị kết quả
  if (showResult) {
    const score = getScore();
    return (
      <div>
        <h2>Kết quả đánh giá</h2>
        <p>Tổng điểm: {score}</p>
        <p>Mức độ nguy cơ: {getLevel(score)}</p>
      </div>
    );
  }

  // Lấy câu hỏi hiện tại dựa trên bước
  const currentQuestion = questions[step];

  return (
    <div>
      {/* Hiển thị số câu hỏi */}
      <h2>Câu {step + 1}</h2>

      {/* Hiển thị nội dung câu hỏi */}
      <p>{currentQuestion.question}</p>

      {/* Duyệt mảng lựa chọn để tạo radio button */}
      {currentQuestion.options.map((option, index) => (
        <div key={index}>
          <label>
            {/* Input radio với name chung cho câu hỏi này */}
            <input
              type="radio"
              name={`question-${step}`} // Tên riêng biệt cho mỗi câu hỏi
              value={index} // Giá trị là chỉ số lựa chọn
              checked={answers[step] === index} // Đánh dấu lựa chọn đúng
              onChange={() => handleSelect(index)} // Cập nhật câu trả lời khi chọn
            />
            {option}
          </label>
        </div>
      ))}

      {/* Nút "Tiếp theo" hoặc "Hoàn thành" */}
      <button 
        onClick={handleNext} 
        disabled={answers[step] === undefined} // Vô hiệu nếu chưa chọn câu trả lời
      >
        {step === questions.length - 1 ? 'Hoàn thành' : 'Tiếp theo'}
      </button>
    </div>
  );
}

export default AssistSurvey;
