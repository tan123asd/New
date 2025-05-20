import React, { useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  LinearProgress,
  // Stepper,
  // Step,
  // StepLabel,
  Button,
  Box,
} from '@mui/material';
import { assistQuestions } from '../Survey/AssistQuestions';
import AssistQuestion from '../Survey/AssistQuestion';
import AssistResult from '../Survey/AssistResult';

function AssistSurvey() {
  const [activeStep, setActiveStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  const handleNext = () => {
    if (activeStep === assistQuestions.length - 1) {
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

  const handleReset = () => {
    setActiveStep(0);
    setAnswers({});
    setShowResult(false);
  };

  const currentQuestion = assistQuestions[activeStep];

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
            <LinearProgress
              variant="determinate"
              value={(activeStep / assistQuestions.length) * 100}
              style={{ width: '100%', height: 10, borderRadius: 5, marginBottom: 20 }} 
            />

            {/* <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
              {assistQuestions.map((_, index) => (
                <Step key={index}>
                  <StepLabel>Câu {index + 1}</StepLabel>
                </Step>
              ))}
            </Stepper> */}

            <AssistQuestion
              question={currentQuestion}
              value={answers[currentQuestion.id]}
              onChange={handleAnswerChange}
            />

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
                {activeStep === assistQuestions.length - 1 ? 'Hoàn thành' : 'Tiếp theo'}
              </Button>
            </Box>
          </>
        ) : (
          <AssistResult
            riskLevel={calculateRiskLevel()}
            onReset={handleReset}
          />
        )}
      </Paper>
    </Container>
  );
}

export default AssistSurvey; 