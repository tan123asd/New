import React from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  Card,
  CardContent,
  Divider,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

function SurveyThankYou() {
  const location = useLocation();
  const navigate = useNavigate();
  const { programId, surveyType } = location.state || {};

  if (!programId || !surveyType) {
    navigate('/');
    return null;
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <CheckCircleOutlineIcon
          color="success"
          sx={{ fontSize: 80, mb: 2 }}
        />
        <Typography variant="h4" component="h1" gutterBottom>
          Cảm ơn bạn đã tham gia khảo sát!
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" paragraph>
          {surveyType === 'pre'
            ? 'Chúng tôi đã nhận được phản hồi của bạn trước khi tham gia chương trình.'
            : 'Chúng tôi đã nhận được phản hồi của bạn sau khi tham gia chương trình.'}
        </Typography>
        <Typography variant="body1" paragraph>
          Ý kiến của bạn rất quan trọng trong việc cải thiện chất lượng chương trình.
          Chúng tôi sẽ sử dụng thông tin này để:
        </Typography>

        <Card sx={{ maxWidth: 600, mx: 'auto', mb: 4 }}>
          <CardContent>
            <Typography variant="body1" component="div">
              <ul style={{ textAlign: 'left', paddingLeft: '1.5rem' }}>
                <li>Đánh giá hiệu quả của chương trình</li>
                <li>Xác định các điểm cần cải thiện</li>
                <li>Điều chỉnh nội dung và phương pháp giảng dạy</li>
                <li>Phát triển các chương trình mới phù hợp hơn</li>
              </ul>
            </Typography>
          </CardContent>
        </Card>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ mt: 4 }}>
          <Button
            variant="contained"
            onClick={() => navigate('/')}
            sx={{ mr: 2 }}
          >
            Về trang chủ
          </Button>
          {surveyType === 'pre' && (
            <Button
              variant="outlined"
              onClick={() => navigate(`/program-details?id=${programId}`)}
            >
              Xem thông tin chương trình
            </Button>
          )}
        </Box>
      </Paper>
    </Container>
  );
}

export default SurveyThankYou; 