import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  TextField,
  Alert,
  LinearProgress,
  Rating,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Checkbox,
  FormGroup,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  DialogActions,
  Chip,
  Paper,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowBack as ArrowBackIcon, ArrowForward as ArrowForwardIcon, Send as SendIcon } from '@mui/icons-material';

// Các câu hỏi khảo sát trước khi tham gia
const preProgramQuestions = [
  {
    id: 'pre-1',
    question: 'Bạn đánh giá mức độ hiểu biết của mình về ma túy như thế nào?',
    type: 'rating',
    description: 'Đánh giá từ 1-5, trong đó 1 là rất kém và 5 là rất tốt',
  },
  {
    id: 'pre-2',
    question: 'Bạn đã từng tham gia các chương trình phòng chống ma túy chưa?',
    type: 'radio',
    options: ['Chưa từng', '1-2 lần', '3-5 lần', 'Trên 5 lần'],
    description: 'Chọn một phương án phù hợp nhất',
  },
  {
    id: 'pre-3',
    question: 'Bạn mong muốn học được những gì từ chương trình này?',
    type: 'checkbox',
    options: [
      'Kiến thức về ma túy và tác hại',
      'Kỹ năng nhận diện ma túy',
      'Kỹ năng từ chối ma túy',
      'Kỹ năng hỗ trợ người nghiện',
      'Kỹ năng tuyên truyền phòng chống ma túy',
    ],
    description: 'Có thể chọn nhiều phương án',
  },
  {
    id: 'pre-4',
    question: 'Bạn có lo ngại gì khi tham gia chương trình không?',
    type: 'text',
    description: 'Hãy chia sẻ những lo ngại của bạn',
  },
];

// Các câu hỏi khảo sát sau khi tham gia
const postProgramQuestions = [
  {
    id: 'post-1',
    question: 'Bạn đánh giá mức độ hài lòng với chương trình như thế nào?',
    type: 'rating',
    description: 'Đánh giá từ 1-5, trong đó 1 là rất không hài lòng và 5 là rất hài lòng',
  },
  {
    id: 'post-2',
    question: 'Chương trình đã đáp ứng được mong đợi của bạn chưa?',
    type: 'radio',
    options: ['Hoàn toàn không', 'Một phần', 'Phần lớn', 'Hoàn toàn'],
    description: 'Chọn một phương án phù hợp nhất',
  },
  {
    id: 'post-3',
    question: 'Bạn đã học được những gì từ chương trình?',
    type: 'checkbox',
    options: [
      'Kiến thức về ma túy và tác hại',
      'Kỹ năng nhận diện ma túy',
      'Kỹ năng từ chối ma túy',
      'Kỹ năng hỗ trợ người nghiện',
      'Kỹ năng tuyên truyền phòng chống ma túy',
    ],
    description: 'Có thể chọn nhiều phương án',
  },
  {
    id: 'post-4',
    question: 'Bạn có đề xuất gì để cải thiện chương trình không?',
    type: 'text',
    description: 'Hãy chia sẻ ý kiến của bạn',
  },
  {
    id: 'post-5',
    question: 'Bạn có sẵn sàng tham gia các chương trình tương tự trong tương lai không?',
    type: 'radio',
    options: ['Không', 'Có thể', 'Có', 'Rất sẵn sàng'],
    description: 'Chọn một phương án phù hợp nhất',
  },
];

function SurveyQuestion({ question, value, onChange, onNext, onBack, isFirst, isLast, progress }) {
  const [error, setError] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  const isAnswerValid = () => {
    if (!value) return false;
    
    switch (question.type) {
      case 'rating':
        return value > 0;
      case 'radio':
        return value !== '';
      case 'checkbox':
        return value.length > 0;
      case 'text':
        return value.trim().length > 0;
      default:
        return false;
    }
  };

  const handleChange = (newValue) => {
    onChange(newValue);
    setError('');
  };

  const handleNext = () => {
    if (!isAnswerValid()) {
      setError('Vui lòng trả lời câu hỏi này');
      return;
    }
    setIsAnimating(true);
    setTimeout(() => {
      onNext();
      setIsAnimating(false);
    }, 300);
  };

  const handleBack = () => {
    setIsAnimating(true);
    setTimeout(() => {
      onBack();
      setIsAnimating(false);
    }, 300);
  };

  return (
    <Paper 
      elevation={2}
      sx={{ 
        p: 3,
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 1,
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)'
      }}
    >
      <Box
        sx={{
          maxWidth: 600,
          mx: 'auto',
          opacity: isAnimating ? 0 : 1,
          transform: isAnimating ? 'translateX(20px)' : 'translateX(0)',
          transition: 'all 0.3s ease-in-out',
        }}
      >
        <Box>
          <LinearProgress
            variant="determinate"
            value={progress}
            style={{ width: '100%', height: 10, borderRadius: 5, marginBottom: 20 }}
          />

          <Typography 
            variant="h6" 
            gutterBottom 
            sx={{ 
              fontWeight: 500,
              color: 'text.primary',
            }}
          >
            {question.question}
          </Typography>
          {question.description && (
            <Typography 
              variant="body2" 
              color="text.secondary" 
              sx={{ mb: 3 }}
            >
              {question.description}
            </Typography>
          )}

          {question.type === 'rating' && (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Rating
                name="survey-rating"
                value={value || 0}
                onChange={(_, newValue) => handleChange(newValue)}
                size="large"
              />
            </Box>
          )}

          {question.type === 'radio' && (
            <FormControl component="fieldset" error={!!error} sx={{ width: '100%' }}>
              <RadioGroup value={value || ''} onChange={(e) => handleChange(e.target.value)}>
                {question.options.map((option) => (
                  <FormControlLabel
                    key={option}
                    value={option}
                    control={<Radio />}
                    label={option}
                    sx={{ mb: 1 }}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          )}

          {question.type === 'checkbox' && (
            <FormControl component="fieldset" error={!!error} sx={{ width: '100%' }}>
              <FormGroup>
                {question.options.map((option) => (
                  <FormControlLabel
                    key={option}
                    control={
                      <Checkbox
                        checked={value?.includes(option) || false}
                        onChange={(e) => {
                          const newValue = e.target.checked
                            ? [...(value || []), option]
                            : (value || []).filter((v) => v !== option);
                          handleChange(newValue);
                        }}
                      />
                    }
                    label={option}
                    sx={{ mb: 1 }}
                  />
                ))}
              </FormGroup>
            </FormControl>
          )}

          {question.type === 'text' && (
            <TextField
              fullWidth
              multiline
              rows={4}
              value={value || ''}
              onChange={(e) => handleChange(e.target.value)}
              error={!!error}
              helperText={error}
              placeholder="Nhập câu trả lời của bạn ở đây..."
              variant="outlined"
            />
          )}

          {error && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            {!isFirst && (
              <Button
                variant="outlined"
                onClick={handleBack}
                startIcon={<ArrowBackIcon />}
                disabled={isAnimating}
              >
                Quay lại
              </Button>
            )}
            <Button
              variant="contained"
              onClick={handleNext}
              endIcon={isLast ? <SendIcon /> : <ArrowForwardIcon />}
              disabled={isAnimating || !isAnswerValid()}
              sx={{ 
                ml: 'auto',
                opacity: isAnswerValid() ? 1 : 0.6,
                '&:hover': {
                  opacity: isAnswerValid() ? 1 : 0.6
                }
              }}
            >
              {isLast ? 'Hoàn thành' : 'Tiếp tục'}
            </Button>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}

function ProgramSurvey() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const surveyType = searchParams.get('type') || 'pre';
  const programId = searchParams.get('programId');

  const [activeStep, setActiveStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [error, setError] = useState(null);
  const [showReview, setShowReview] = useState(false);

  const questions = surveyType === 'pre' ? preProgramQuestions : postProgramQuestions;
  const totalSteps = questions.length;

  // Lưu câu trả lời tạm thời vào localStorage
  useEffect(() => {
    localStorage.setItem(`survey_${programId}_${surveyType}`, JSON.stringify(answers));
  }, [answers, programId, surveyType]);

  useEffect(() => {
    if (!programId) {
      navigate('/');
      return;
    }
  }, [programId, navigate]);

  const handleNext = () => {
    if (activeStep === totalSteps - 1) {
      // Kiểm tra câu trả lời cuối cùng trước khi submit
      const currentAnswer = answers[questions[activeStep].id];
      if (!currentAnswer || 
          (questions[activeStep].type === 'rating' && currentAnswer === 0) ||
          (questions[activeStep].type === 'radio' && currentAnswer === '') ||
          (questions[activeStep].type === 'checkbox' && currentAnswer.length === 0) ||
          (questions[activeStep].type === 'text' && currentAnswer.trim().length === 0)) {
        setError('Vui lòng trả lời câu hỏi này trước khi hoàn thành');
        return;
      }
      handleSubmit();
    } else {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleCloseReview = () => {
    setShowReview(false);
  };

  const handleSubmit = () => {
    // Kiểm tra xem đã trả lời hết các câu hỏi chưa
    const unansweredQuestions = questions.filter(q => {
      const answer = answers[q.id];
      if (!answer) return true;
      
      switch (q.type) {
        case 'rating':
          return answer === 0;
        case 'radio':
          return answer === '';
        case 'checkbox':
          return answer.length === 0;
        case 'text':
          return answer.trim().length === 0;
        default:
          return true;
      }
    });

    if (unansweredQuestions.length > 0) {
      setError('Vui lòng trả lời đầy đủ tất cả các câu hỏi trước khi hoàn thành');
      return;
    }

    setError(null);

    try {
      // Xóa câu trả lời tạm thời
      localStorage.removeItem(`survey_${programId}_${surveyType}`);

      // Đóng dialog review nếu đang mở
      if (showReview) {
        setShowReview(false);
      }

      // Chuyển hướng đến trang cảm ơn ngay lập tức
      navigate('/survey-thank-you', {
        state: {
          programId,
          surveyType,
          answers,
          timestamp: new Date().toISOString(),
        },
        replace: true
      });
    } catch (err) {
      console.error('Error submitting survey:', err);
      setError('Có lỗi xảy ra khi gửi khảo sát. Vui lòng thử lại.');
    }
  };

  const calculateProgress = () => {
    return Math.round((activeStep / totalSteps) * 100);
  };

  const currentQuestion = questions[activeStep];

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h5" component="h1" gutterBottom>
          {surveyType === 'pre' ? 'Khảo sát trước khi tham gia' : 'Khảo sát sau khi tham gia'}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {surveyType === 'pre'
            ? 'Giúp chúng tôi hiểu rõ hơn về bạn trước khi tham gia chương trình'
            : 'Chia sẻ trải nghiệm của bạn sau khi tham gia chương trình'}
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
      )}

      <SurveyQuestion
        question={currentQuestion}
        value={answers[currentQuestion.id]}
        onChange={(value) => {
          setAnswers({
            ...answers,
            [currentQuestion.id]: value,
          });
          // Xóa lỗi khi người dùng thay đổi câu trả lời
          if (error) {
            setError(null);
          }
        }}
        onNext={handleNext}
        onBack={handleBack}
        isFirst={activeStep === 0}
        isLast={activeStep === totalSteps - 1}
        progress={calculateProgress()}
      />

      {/* Dialog xem lại câu trả lời */}
      <Dialog
        open={showReview}
        onClose={handleCloseReview}
        maxWidth="sm"
        fullWidth
        onBackdropClick={(e) => {
          // Ngăn đóng dialog khi click bên ngoài
          e.preventDefault();
        }}
      >
        <DialogTitle>Xem lại câu trả lời</DialogTitle>
        <DialogContent>
          <List>
            {questions.map((question, index) => (
              <ListItem key={question.id} divider>
                <ListItemText
                  primary={`${index + 1}. ${question.question}`}
                  secondary={
                    <Box sx={{ mt: 1 }}>
                      {question.type === 'rating' && (
                        <Rating value={answers[question.id] || 0} readOnly size="small" />
                      )}
                      {question.type === 'radio' && (
                        <Typography variant="body2">
                          {answers[question.id] || 'Chưa trả lời'}
                        </Typography>
                      )}
                      {question.type === 'checkbox' && (
                        <Box>
                          {(answers[question.id] || []).map((option) => (
                            <Chip
                              key={option}
                              label={option}
                              size="small"
                              sx={{ mr: 1, mb: 1 }}
                            />
                          ))}
                        </Box>
                      )}
                      {question.type === 'text' && (
                        <Typography variant="body2">
                          {answers[question.id] || 'Chưa trả lời'}
                        </Typography>
                      )}
                    </Box>
                  }
                />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseReview}>Đóng</Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained" 
            color="primary"
            disabled={!Object.keys(answers).length}
          >
            Hoàn thành
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default ProgramSurvey; 