import React from 'react';
import {
  Box,
  Typography,
  Alert,
  Button,
} from '@mui/material';

const AssistResult = ({ riskLevel, onReset, surveyType }) => {
  const getRecommendations = () => {
    if (surveyType === 'ASSIST') {
      return [
        'Tham khảo ý kiến chuyên gia y tế để được đánh giá chi tiết hơn',
        'Tham gia các khóa học và chương trình hỗ trợ phù hợp',
        'Liên hệ với đường dây nóng hỗ trợ: 1800-xxxx'
      ];
    } else {
      return [
        'Tham khảo ý kiến chuyên gia tư vấn về sử dụng chất gây nghiện',
        'Tham gia các chương trình can thiệp sớm',
        'Tìm hiểu thêm về các rủi ro và tác hại của việc sử dụng chất gây nghiện',
        'Xây dựng kỹ năng từ chối và đối phó với áp lực từ bạn bè'
      ];
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom align="center">
        Kết quả đánh giá {surveyType}
      </Typography>
      <Alert
        severity={riskLevel.color}
        sx={{ mb: 3, fontSize: '1.1rem' }}
      >
        Mức độ nguy cơ: {riskLevel.level}
      </Alert>
      <Typography paragraph>
        {riskLevel.description}
      </Typography>
      <Typography paragraph>
        Chúng tôi khuyến nghị bạn nên:
      </Typography>
      <ul>
        {getRecommendations().map((recommendation, index) => (
          <li key={index}>
            <Typography>
              {recommendation}
            </Typography>
          </li>
        ))}
      </ul>
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Button
          variant="contained"
          onClick={onReset}
        >
          Làm lại khảo sát
        </Button>
      </Box>
    </Box>
  );
};

export default AssistResult; 