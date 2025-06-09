import axios from 'axios';

// Tạo instance axios với cấu hình mặc định
const api = axios.create({
    baseURL: 'https://dev-our.com/api', // Cập nhật base URL
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
});

// Thêm interceptor để xử lý request
api.interceptors.request.use(
    (config) => {
        // Lấy token từ localStorage nếu có
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Thêm interceptor để xử lý response
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Xử lý lỗi ở đây (ví dụ: refresh token, logout khi token hết hạn, etc.)
        if (error.response?.status === 401) {
            // Xử lý unauthorized
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api; 