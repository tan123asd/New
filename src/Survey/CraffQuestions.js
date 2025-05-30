export const craffQuestions = [
  {
    id: 'C1',
    question: 'Bạn có bao giờ lái xe sau khi uống rượu hoặc sử dụng ma túy không?',
    options: [
      { value: '0', label: 'Không bao giờ' },
      { value: '1', label: 'Có' }
    ],
    category: 'Car'
  },
  {
    id: 'C2',
    question: 'Bạn có bao giờ sử dụng rượu hoặc ma túy để thư giãn, cảm thấy tốt hơn về bản thân, hoặc hòa nhập với bạn bè không?',
    options: [
      { value: '0', label: 'Không bao giờ' },
      { value: '1', label: 'Có' }
    ],
    category: 'Relax'
  },
  {
    id: 'C3',
    question: 'Bạn có bao giờ sử dụng rượu hoặc ma túy một mình không?',
    options: [
      { value: '0', label: 'Không bao giờ' },
      { value: '1', label: 'Có' }
    ],
    category: 'Alone'
  },
  {
    id: 'C4',
    question: 'Bạn có bao giờ quên những việc đã làm khi đang sử dụng rượu hoặc ma túy không?',
    options: [
      { value: '0', label: 'Không bao giờ' },
      { value: '1', label: 'Có' }
    ],
    category: 'Forget'
  },
  {
    id: 'C5',
    question: 'Gia đình hoặc bạn bè có bao giờ nói với bạn rằng bạn nên giảm bớt việc uống rượu hoặc sử dụng ma túy không?',
    options: [
      { value: '0', label: 'Không bao giờ' },
      { value: '1', label: 'Có' }
    ],
    category: 'Family'
  },
  {
    id: 'C6',
    question: 'Bạn có bao giờ gặp rắc rối khi đang sử dụng rượu hoặc ma túy không?',
    options: [
      { value: '0', label: 'Không bao giờ' },
      { value: '1', label: 'Có' }
    ],
    category: 'Friends'
  }
];

export const calculateCraffScore = (answers) => {
  return Object.values(answers).reduce((sum, value) => sum + parseInt(value || 0, 10), 0);
};

export const getCraffRiskLevel = (score) => {
  if (score >= 2) {
    return {
      level: 'Cao',
      color: 'error',
      description: 'Có dấu hiệu của việc sử dụng chất gây nghiện có vấn đề. Cần được tư vấn và can thiệp chuyên môn.'
    };
  } else if (score === 1) {
    return {
      level: 'Trung bình',
      color: 'warning',
      description: 'Có một số dấu hiệu cần lưu ý. Nên tham khảo ý kiến chuyên gia để được đánh giá chi tiết hơn.'
    };
  } else {
    return {
      level: 'Thấp',
      color: 'success',
      description: 'Không có dấu hiệu của việc sử dụng chất gây nghiện có vấn đề.'
    };
  }
}; 