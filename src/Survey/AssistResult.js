import React from 'react';
import {
  Box,
  Typography,
  Alert,
  Button,
} from '@mui/material';

const AssistResult = ({ riskLevel, onReset }) => {
  return (
    <Box>
      <Typography variant="h5" gutterBottom align="center">
        Kết quả đánh giá
      </Typography>
      <Alert
        severity={riskLevel.color}
        sx={{ mb: 3, fontSize: '1.1rem' }}
      >
        Mức độ nguy cơ: {riskLevel.level}
      </Alert>
      <Typography paragraph>
        Dựa trên câu trả lời của bạn, chúng tôi đánh giá mức độ nguy cơ của
        bạn là {riskLevel.level.toLowerCase()}. Đây là một đánh
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
          onClick={onReset}
        >
          Làm lại khảo sát
        </Button>
      </Box>
    </Box>
  );
};

export default AssistResult; 