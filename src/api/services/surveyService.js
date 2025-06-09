import api from '../config';

export const surveyService = {
    // Kiểm tra trạng thái survey
    checkStatus: async (userId) => {
        try {
            const response = await api.get('/Surveys/check-status', {
                params: {
                    userId: userId
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Lấy danh sách surveys (nếu cần)
    getSurveys: async () => {
        try {
            const response = await api.get('/Surveys');
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Tạo survey mới (nếu cần)
    createSurvey: async (surveyData) => {
        try {
            const response = await api.post('/Surveys', surveyData);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}; 