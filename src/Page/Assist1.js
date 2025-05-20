import React, { useState } from 'react';

import {
  Container,
  Typography,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Button,
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Alert,
} from '@mui/material';


const questions = [
  {
    id: 1,
    question: 'Trong 3 tháng qua, bạn có sử dụng các chất gây nghiện nào sau đây không?',
    options: [
      { value: '0', label: 'Không bao giờ' },
      { value: '1', label: 'Một hoặc hai lần' },
      { value: '2', label: 'Hàng tháng' },
      { value: '3', label: 'Hàng tuần' },
      { value: '4', label: 'Hàng ngày hoặc gần như hàng ngày' },
    ],
  },
  {
    id: 2,
    question: 'Bạn thường xuyên cảm thấy thèm muốn hoặc mong muốn mạnh mẽ sử dụng chất gây nghiện không?',
    options: [
      { value: '0', label: 'Không bao giờ' },
      { value: '1', label: 'Một hoặc hai lần' },
      { value: '2', label: 'Hàng tháng' },
      { value: '3', label: 'Hàng tuần' },
      { value: '4', label: 'Hàng ngày hoặc gần như hàng ngày' },
    ],
  },
  {
    id: 3,
    question: 'Việc sử dụng chất gây nghiện có gây ra vấn đề về sức khỏe, xã hội, pháp lý hoặc tài chính cho bạn không?',
    options: [
      { value: '0', label: 'Không bao giờ' },
      { value: '1', label: 'Một hoặc hai lần' },
      { value: '2', label: 'Hàng tháng' },
      { value: '3', label: 'Hàng tuần' },
      { value: '4', label: 'Hàng ngày hoặc gần như hàng ngày' },
    ],
  },
  {
    id: 4,
    question: 'Bạn có thường xuyên gặp khó khăn trong việc kiểm soát việc sử dụng chất gây nghiện không?',
    options: [
      { value: '0', label: 'Không bao giờ' },
      { value: '1', label: 'Một hoặc hai lần' },
      { value: '2', label: 'Hàng tháng' },
      { value: '3', label: 'Hàng tuần' },
      { value: '4', label: 'Hàng ngày hoặc gần như hàng ngày' },
    ],
  },
  {
    id: 5,
    question: 'Bạn có thường xuyên bỏ qua các hoạt động quan trọng vì việc sử dụng chất gây nghiện không?',
    options: [
      { value: '0', label: 'Không bao giờ' },
      { value: '1', label: 'Một hoặc hai lần' },
      { value: '2', label: 'Hàng tháng' },
      { value: '3', label: 'Hàng tuần' },
      { value: '4', label: 'Hàng ngày hoặc gần như hàng ngày' },
    ],
  },
  {
    id: 6,
    question: 'Bạn có thường xuyên gặp vấn đề với người thân hoặc bạn bè do việc sử dụng chất gây nghiện không?',
    options: [
      { value: '0', label: 'Không bao giờ' },
      { value: '1', label: 'Một hoặc hai lần' },
      { value: '2', label: 'Hàng tháng' },
      { value: '3', label: 'Hàng tuần' },
      { value: '4', label: 'Hàng ngày hoặc gần như hàng ngày' },
    ],
  },
  {
    id: 7,
    question: 'Bạn có thường xuyên gặp khó khăn trong việc thực hiện các trách nhiệm tại nơi làm việc hoặc học tập do việc sử dụng chất gây nghiện không?',
    options: [
      { value: '0', label: 'Không bao giờ' },
      { value: '1', label: 'Một hoặc hai lần' },
      { value: '2', label: 'Hàng tháng' },
      { value: '3', label: 'Hàng tuần' },
      { value: '4', label: 'Hàng ngày hoặc gần như hàng ngày' },
    ],
  },
  {
    id: 8,
    question: 'Bạn có thường xuyên gặp vấn đề về trí nhớ hoặc khả năng tập trung do việc sử dụng chất gây nghiện không?',
    options: [
      { value: '0', label: 'Không bao giờ' },
      { value: '1', label: 'Một hoặc hai lần' },
      { value: '2', label: 'Hàng tháng' },
      { value: '3', label: 'Hàng tuần' },
      { value: '4', label: 'Hàng ngày hoặc gần như hàng ngày' },
    ],
  },
  {
    id: 9,
    question: 'Bạn có thường xuyên gặp vấn đề về sức khỏe thể chất do việc sử dụng chất gây nghiện không?',
    options: [
      { value: '0', label: 'Không bao giờ' },
      { value: '1', label: 'Một hoặc hai lần' },
      { value: '2', label: 'Hàng tháng' },
      { value: '3', label: 'Hàng tuần' },
      { value: '4', label: 'Hàng ngày hoặc gần như hàng ngày' },
    ],
  },
  {
    id: 10,
    question: 'Bạn có thường xuyên gặp vấn đề về tâm lý hoặc cảm xúc do việc sử dụng chất gây nghiện không?',
    options: [
      { value: '0', label: 'Không bao giờ' },
      { value: '1', label: 'Một hoặc hai lần' },
      { value: '2', label: 'Hàng tháng' },
      { value: '3', label: 'Hàng tuần' },
      { value: '4', label: 'Hàng ngày hoặc gần như hàng ngày' },
    ],
  },
];

function AssistSurvey() {
  const [activeStep, setActiveStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  const handleNext = () => {
    if (activeStep === questions.length - 1) {
      setShowResult(true);
    } else {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const calculateRiskLevel = () => {
    const totalScore = Object.values(answers).reduce(
      (sum, value) => sum + parseInt(value || 0, 10),
      0
    );

    if (totalScore <= 3) return { level: 'Thấp', color: 'success' };
    if (totalScore <= 6) return { level: 'Trung bình', color: 'warning' };
    return { level: 'Cao', color: 'error' };
  };

  const currentQuestion = questions[activeStep];

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Khảo sát đánh giá nguy cơ ASSIST
      </Typography>
      <Typography variant="h6" color="text.secondary" align="center" paragraph>
        Công cụ sàng lọc sử dụng chất gây nghiện được phát triển bởi WHO
      </Typography>

      <Paper sx={{ p: 4, mt: 4 }}>
        {!showResult ? (
          <>
            <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
              {questions.map((_, index) => (
                <Step key={index}>
                  <StepLabel>Câu {index + 1}</StepLabel>
                </Step>
              ))}
            </Stepper>

            <FormControl component="fieldset" sx={{ width: '100%' }}>
              <FormLabel component="legend" sx={{ mb: 2 }}>
                {currentQuestion.question}
              </FormLabel>
              <RadioGroup
                value={answers[currentQuestion.id] || ''}
                onChange={(e) =>
                  handleAnswerChange(currentQuestion.id, e.target.value)
                }
              >
                {currentQuestion.options.map((option) => (
                  <FormControlLabel
                    key={option.value}
                    value={option.value}
                    control={<Radio />}
                    label={option.label}
                  />
                ))}
              </RadioGroup>
            </FormControl>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
              <Button
                variant="outlined"
                onClick={handleBack}
                disabled={activeStep === 0}
              >
                Quay lại
              </Button>
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={!answers[currentQuestion.id]}
              >
                {activeStep === questions.length - 1 ? 'Hoàn thành' : 'Tiếp theo'}
              </Button>
            </Box>
          </>
        ) : (
          <Box>
            <Typography variant="h5" gutterBottom align="center">
              Kết quả đánh giá
            </Typography>
            <Alert
              severity={calculateRiskLevel().color}
              sx={{ mb: 3, fontSize: '1.1rem' }}
            >
              Mức độ nguy cơ: {calculateRiskLevel().level}
            </Alert>
            <Typography paragraph>
              Dựa trên câu trả lời của bạn, chúng tôi đánh giá mức độ nguy cơ của
              bạn là {calculateRiskLevel().level.toLowerCase()}. Đây là một đánh
              giá sơ bộ và không thay thế cho tư vấn chuyên môn.
            </Typography>
            <Typography paragraph>
              Chúng tôi khuyến nghị bạn nên:
            </Typography>
            <ul>
              <li>
                <Typography>
                  Tham khảo ý kiến chuyên gia y tế để được đánh giá chi tiết hơn
                </Typography>
              </li>
              <li>
                <Typography>
                  Tham gia các khóa học và chương trình hỗ trợ phù hợp
                </Typography>
              </li>
              <li>
                <Typography>
                  Liên hệ với đường dây nóng hỗ trợ: 1800-xxxx
                </Typography>
              </li>
            </ul>
            <Box sx={{ mt: 4, textAlign: 'center' }}>
              <Button
                variant="contained"
                onClick={() => {
                  setActiveStep(0);
                  setAnswers({});
                  setShowResult(false);
                }}
              >
                Làm lại khảo sát
              </Button>
            </Box>
          </Box>
        )}
      </Paper>
    </Container>
  );
}

export default AssistSurvey; 