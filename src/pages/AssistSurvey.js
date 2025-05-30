import React, { useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  LinearProgress,
  Button,
  Box,
  Tabs,
  Tab,
} from '@mui/material';
import { assistQuestions } from '../Survey/AssistQuestions';
import { craffQuestions, calculateCraffScore, getCraffRiskLevel } from '../Survey/CraffQuestions';
import AssistQuestion from '../Survey/AssistQuestion';
import AssistResult from '../Survey/AssistResult';

function AssistSurvey() {
  const [activeTab, setActiveTab] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [assistAnswers, setAssistAnswers] = useState({});
  const [craffAnswers, setCraffAnswers] = useState({});
  const [showAssistResult, setShowAssistResult] = useState(false);
  const [showCraffResult, setShowCraffResult] = useState(false);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setActiveStep(0);
  };

  const handleNext = () => {
    const currentQuestions = activeTab === 0 ? assistQuestions : craffQuestions;
    const currentAnswers = activeTab === 0 ? assistAnswers : craffAnswers;
    const currentQuestion = currentQuestions[activeStep];

    if (!currentAnswers[currentQuestion.id]) {
      return;
    }

    if (activeStep === currentQuestions.length - 1) {
      if (activeTab === 0) {
        setShowAssistResult(true);
      } else {
        setShowCraffResult(true);
      }
    } else {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleAssistAnswerChange = (questionId, value) => {
    setAssistAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleCraffAnswerChange = (questionId, value) => {
    setCraffAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const calculateAssistRiskLevel = () => {
    const totalScore = Object.values(assistAnswers).reduce(
      (sum, value) => sum + parseInt(value || 0, 10),
      0
    );

    if (totalScore <= 3) return { level: 'Thấp', color: 'success' };
    if (totalScore <= 6) return { level: 'Trung bình', color: 'warning' };
    return { level: 'Cao', color: 'error' };
  };

  const currentAssistQuestion = assistQuestions[activeStep];
  const currentCraffQuestion = craffQuestions[activeStep];

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Khảo sát đánh giá nguy cơ
      </Typography>
      <Typography variant="h6" color="text.secondary" align="center" paragraph>
        Công cụ sàng lọc sử dụng chất gây nghiện
      </Typography>

      <Paper sx={{ p: 4, mt: 4 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          centered
          sx={{ mb: 4 }}
        >
          <Tab 
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                ASSIST
                {showAssistResult && (
                  <Box
                    component="span"
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      bgcolor: 'success.main',
                      display: 'inline-block'
                    }}
                  />
                )}
              </Box>
            }
          />
          <Tab 
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                CRAFF
                {showCraffResult && (
                  <Box
                    component="span"
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      bgcolor: 'success.main',
                      display: 'inline-block'
                    }}
                  />
                )}
              </Box>
            }
          />
        </Tabs>

        {activeTab === 0 ? (
          showAssistResult ? (
            <AssistResult
              riskLevel={calculateAssistRiskLevel()}
              onReset={() => {
                setActiveStep(0);
                setAssistAnswers({});
                setShowAssistResult(false);
              }}
              surveyType="ASSIST"
            />
          ) : (
            <>
              <LinearProgress
                variant="determinate"
                value={(activeStep / assistQuestions.length) * 100}
                style={{ width: '100%', height: 10, borderRadius: 5, marginBottom: 20 }}
              />

              <AssistQuestion
                question={currentAssistQuestion}
                value={assistAnswers[currentAssistQuestion.id]}
                onChange={handleAssistAnswerChange}
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
                  disabled={!assistAnswers[currentAssistQuestion.id]}
                  sx={{
                    opacity: assistAnswers[currentAssistQuestion.id] ? 1 : 0.7,
                    '&:hover': {
                      opacity: assistAnswers[currentAssistQuestion.id] ? 0.9 : 0.7,
                    }
                  }}
                >
                  {activeStep === assistQuestions.length - 1 ? 'Hoàn thành' : 'Tiếp theo'}
                </Button>
              </Box>
            </>
          )
        ) : (
          showCraffResult ? (
            <AssistResult
              riskLevel={getCraffRiskLevel(calculateCraffScore(craffAnswers))}
              onReset={() => {
                setActiveStep(0);
                setCraffAnswers({});
                setShowCraffResult(false);
              }}
              surveyType="CRAFF"
            />
          ) : (
            <>
              <LinearProgress
                variant="determinate"
                value={(activeStep / craffQuestions.length) * 100}
                style={{ width: '100%', height: 10, borderRadius: 5, marginBottom: 20 }}
              />

              <AssistQuestion
                question={currentCraffQuestion}
                value={craffAnswers[currentCraffQuestion.id]}
                onChange={handleCraffAnswerChange}
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
                  disabled={!craffAnswers[currentCraffQuestion.id]}
                  sx={{
                    opacity: craffAnswers[currentCraffQuestion.id] ? 1 : 0.7,
                    '&:hover': {
                      opacity: craffAnswers[currentCraffQuestion.id] ? 0.9 : 0.7,
                    }
                  }}
                >
                  {activeStep === craffQuestions.length - 1 ? 'Hoàn thành' : 'Tiếp theo'}
                </Button>
              </Box>
            </>
          )
        )}
      </Paper>
    </Container>
  );
}

export default AssistSurvey; 