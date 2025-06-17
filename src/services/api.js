import axios from 'axios';
import { API_CONFIG } from '../config';

const API_BASE_URL = API_CONFIG.BASE_URL;

// Đảm bảo endpoints match với backend controllers
const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: '/auth/login',
  REGISTER: '/auth/register', 
  LOGOUT: '/auth/logout',
  REFRESH_TOKEN: '/auth/refresh-token',
  
  // Category endpoints
  CATEGORIES: '/category',
  
  // Survey endpoints
  SURVEYS: '/surveys',
  SURVEY_BY_ID: (id) => `/surveys/${id}`,
  USER_SURVEYS: (userId) => `/surveys/user/${userId}`,
  SUITABLE_SURVEYS: (userId) => `/surveys/suitable/${userId}`,
  SURVEY_STATUS: (userId) => `/surveys/status/${userId}`,  // Survey Question endpoints
  SURVEY_QUESTIONS: (surveyId) => `/surveyquestion/${surveyId}`,
  SURVEY_DETAIL: (surveyId) => `/surveys/${surveyId}`,
  
  // Survey Answer endpoints
  SURVEY_ANSWERS: '/surveyanswer',
  // User endpoints
  USER_PROFILE: '/users/me',
  UPDATE_PROFILE: '/users/profile',
  
  // Dashboard endpoints
  DASHBOARD_DATA: (userId) => `/users/${userId}/dashboard`,
  
  // Course endpoints
  COURSES: '/courses',
  COURSE_BY_ID: (id) => `/courses/${id}`,
  COURSE_ENROLL: (id) => `/courses/${id}/enroll`,
  
  // Program endpoints
  PROGRAMS: '/programs',
  PROGRAM_ENROLL: '/programs/enroll',
  
  // Counseling endpoints
  COUNSELING_SESSIONS: '/counseling/sessions',
  COUNSELING_SLOTS: '/counseling/available-slots',
  COUNSELING_BOOK: '/counseling/book',
  
  // Health check
  HEALTH: '/health',
};

// Validation helpers
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Commented out as validation is now handled by backend
// const validatePassword = (password) => {
//   // At least 8 characters, one uppercase, one lowercase, one number
//   const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
//   return passwordRegex.test(password);
// };

const validateRequired = (value, fieldName) => {
  if (!value || (typeof value === 'string' && !value.trim())) {
    throw new Error(`${fieldName} is required`);
  }
};

// Standardized error response format
const createErrorResponse = (error, defaultMessage = 'An error occurred') => {
  if (error.response) {
    // Server responded with error status
    const { status, data } = error.response;
    return {
      success: false,
      message: data?.message || data?.error || defaultMessage,
      status,
      data: data
    };
  } else if (error.request) {
    // Network error
    return {
      success: false,
      message: 'Network error - please check your connection',
      status: 0
    };
  } else {
    // Other error
    return {
      success: false,
      message: error.message || defaultMessage,
      status: 0
    };
  }
};

class ApiService {
  constructor() {
    this.token = localStorage.getItem('accessToken');
    
    // Create axios instance
    this.api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add request interceptor to include auth token
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );    // Add response interceptor for error handling
    this.api.interceptors.response.use(
      (response) => {
        // Backend trả về format: { success: bool, message: string, data: object }
        return response.data;
      },
      (error) => {
        console.error('API Error:', error);
        if (error.response) {
          const status = error.response.status;
          const data = error.response.data;
          
          if (status === 401) {
            console.warn('Unauthorized access, logging out user');
            this.logout();
            window.location.href = '/login';
          }
          
          // Backend error format
          let errorMessage = 'Request failed';
          if (data && typeof data === 'object') {
            errorMessage = data.message || data.Message || 'Unknown error';
          } else if (typeof data === 'string') {
            errorMessage = data;
          }
          
          return Promise.reject({
            success: false,
            message: errorMessage,
            status,
            data: data?.data || null
          });
        } else if (error.request) {
          return Promise.reject({
            success: false,
            message: 'Network error - please check your connection'
          });
        } else {
          return Promise.reject({
            success: false,
            message: error.message || 'Unknown error occurred'
          });
        }
      }
    );  }

  // Helper methods
  getCurrentUserId() {
    try {
      const userData = localStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        return user.id || user.userId || user.email; // Fallback to email if no ID
      }
    } catch (error) {
      console.error('Error getting current user ID:', error);
    }
    return null;
  }

  getCurrentUser() {
    try {
      const userData = localStorage.getItem('user');
      if (userData) {
        return JSON.parse(userData);
      }
    } catch (error) {
      console.error('Error getting current user:', error);
    }
    return null;
  }
  // Authentication methods - CẬP NHẬT THEO BACKEND API
  async login(credentials) {
    console.log('🔐 ApiService: Login attempt for:', credentials.email);
    console.log('🌐 API URL:', `${API_BASE_URL}${API_ENDPOINTS.LOGIN}`);
    
    try {
      const response = await this.api.post(API_ENDPOINTS.LOGIN, {
        email: credentials.email,
        password: credentials.password
      });
      
      console.log('✅ Login API Response:', response);
      console.log('🔑 Access Token:', response.data?.accessToken ? 'Present' : 'Missing');
      
      if (response.success && response.data && response.data.accessToken) {
        console.log('💾 Storing token and user data');
        this.token = response.data.accessToken;
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        localStorage.setItem('user', JSON.stringify({
          email: response.data.email,
          fullname: response.data.fullname,
          role: response.data.role
        }));
        return response;
      } else {
        throw new Error('Invalid API response structure');
      }
    } catch (error) {
      console.error('❌ Login failed:', error);
      throw error;
    }
  }
  async register(userData) {
    try {
      const response = await this.api.post(API_ENDPOINTS.REGISTER, {
        email: userData.email,
        password: userData.password,
        fullname: userData.fullname,
        phone: userData.phone || '',
        gender: userData.gender || '',
        dateOfBirth: userData.dateOfBirth || null,
        address: userData.address || ''
      });
      
      if (response.success) {
        return response;
      } else {
        throw new Error(response.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  }
  async refreshToken() {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }
      
      const response = await this.api.post(API_ENDPOINTS.REFRESH_TOKEN, refreshToken);
      
      if (response.success && response.data) {
        this.token = response.data.accessToken;
        localStorage.setItem('accessToken', response.data.accessToken);
        if (response.data.refreshToken) {
          localStorage.setItem('refreshToken', response.data.refreshToken);
        }
        return response.data.accessToken;
      } else {
        throw new Error('Failed to refresh token');
      }
    } catch (error) {
      console.error('Token refresh failed:', error);
      this.logout();
      throw error;
    }
  }

  async logout() {
    try {
      const userId = this.getCurrentUserId();
      if (userId) {
        await this.api.post(API_ENDPOINTS.LOGOUT, userId);
      }
    } catch (error) {
      console.warn('Logout API call failed:', error);
    }
    
    this.token = null;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');    delete this.api.defaults.headers.Authorization;
    return { success: true, message: 'Logged out successfully' };
  }

  // Profile methods - CẢI THIỆN
  async getProfile() {
    try {
      const user = this.getCurrentUser();
      if (user) {
        return {
          success: true,
          data: user
        };
      }
      return await this.api.get(API_ENDPOINTS.USER_PROFILE);
    } catch (error) {
      console.warn('getProfile failed, using stored user data');
      const userData = localStorage.getItem('user');
      if (userData) {
        return {
          success: true,
          data: JSON.parse(userData)
        };
      }
      throw error;
    }
  }

  async updateProfile(profileData) {
    try {
      // Client-side validation
      if (profileData.email && !validateEmail(profileData.email)) {
        throw new Error('Invalid email format');
      }

      const response = await this.api.put(API_ENDPOINTS.UPDATE_PROFILE, profileData);
      if (response.success && response.data) {
        // Update local storage
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response;
    } catch (error) {
      console.error('Failed to update profile:', error);
      throw error;
    }
  }
  // Categories
  async getCategories() {
    try {
      return await this.api.get(API_ENDPOINTS.CATEGORIES);
    } catch (error) {
      console.warn('getCategories API call failed:', error);
      throw error;
    }
  }

  // Survey methods - CẬP NHẬT THEO BACKEND CONTROLLERS
  async getSurveys() {
    try {
      return await this.api.get(API_ENDPOINTS.SURVEYS);
    } catch (error) {
      console.warn('getSurveys API call failed:', error);
      throw error;
    }
  }

  async getSurvey(id) {
    try {
      return await this.api.get(API_ENDPOINTS.SURVEY_BY_ID(id));
    } catch (error) {
      console.warn('getSurvey API call failed:', error);
      throw error;
    }
  }
  async getSurveyQuestions(surveyId) {
    try {
      return await this.api.get(API_ENDPOINTS.SURVEY_QUESTIONS(surveyId));
    } catch (error) {
      console.error('Failed to fetch survey questions:', error);
      throw error;
    }
  }

  async getSurveyWithQuestions(surveyId) {
    try {
      // Gọi endpoint chi tiết survey để lấy thông tin survey và questions
      return await this.api.get(API_ENDPOINTS.SURVEY_DETAIL(surveyId));
    } catch (error) {
      console.error('Failed to fetch survey with questions:', error);
      throw error;
    }
  }

  async submitSurveyAnswer(surveyAnswerData) {
    try {
      return await this.api.post(API_ENDPOINTS.SURVEY_ANSWERS, surveyAnswerData);
    } catch (error) {
      console.error('Failed to submit survey answer:', error);
      throw error;
    }
  }

  async getUserSurveys(userId = null) {
    try {
      const targetUserId = userId || this.getCurrentUserId();
      if (!targetUserId) {
        throw new Error('No user ID available');
      }
      return await this.api.get(API_ENDPOINTS.USER_SURVEYS(targetUserId));
    } catch (error) {
      console.warn('getUserSurveys API call failed:', error);
      throw error;
    }
  }

  async getSuitableSurveys(userId = null) {
    try {
      const targetUserId = userId || this.getCurrentUserId();
      if (!targetUserId) {
        throw new Error('No user ID available');
      }
      return await this.api.get(API_ENDPOINTS.SUITABLE_SURVEYS(targetUserId));
    } catch (error) {
      console.warn('getSuitableSurveys API call failed:', error);
      throw error;
    }
  }

  async getSurveyStatus(userId = null) {
    try {
      const targetUserId = userId || this.getCurrentUserId();
      if (!targetUserId) {
        throw new Error('No user ID available');
      }
      return await this.api.get(API_ENDPOINTS.SURVEY_STATUS(targetUserId));
    } catch (error) {
      console.warn('getSurveyStatus API call failed:', error);
      throw error;
    }  }
  // Courses methods - CẢI THIỆN
  async getCourses() {
    try {
      return await this.api.get(API_ENDPOINTS.COURSES);
    } catch (error) {
      console.warn('getCourses API call failed, using mock data');
      return {
        success: true,
        data: [
          {
            id: 1,
            title: 'Recovery Fundamentals',
            description: 'Master the essential concepts and strategies for successful addiction recovery.',
            instructor: 'Dr. Sarah Johnson',
            duration: '8 weeks',
            lessons: 24,
            students: 1250,
            rating: 4.9,
            level: 'Beginner',
            price: 'Free',
            enrolled: true,
            progress: 65
          },
          {
            id: 2,
            title: 'Advanced Recovery Strategies',
            description: 'Deep dive into advanced techniques for maintaining long-term sobriety.',
            instructor: 'Dr. Michael Chen',
            duration: '6 weeks',
            lessons: 18,
            students: 850,
            rating: 4.8,
            level: 'Intermediate',
            price: 'Free',
            enrolled: false,
            progress: 0
          },
          {
            id: 3,
            title: 'Family Support Systems',
            description: 'Learn how to build and maintain strong family support networks.',
            instructor: 'Dr. Lisa Martinez',
            duration: '4 weeks',
            lessons: 12,
            students: 650,
            rating: 4.7,
            level: 'Beginner',
            price: 'Free',
            enrolled: false,
            progress: 0
          }
        ]
      };
    }  }

  // Counseling
  async getCounselingSlots() {
    try {
      return await this.api.get(API_ENDPOINTS.COUNSELING_SLOTS);
    } catch (error) {
      console.warn('getCounselingSlots API call failed:', error);
      return createErrorResponse(error, 'Failed to fetch counseling slots');
    }
  }

  async bookCounselingSlot(slotId) {
    try {
      validateRequired(slotId, 'Slot ID');
      
      const userId = this.getCurrentUserId();
      if (!userId) {
        throw new Error('No user ID available');
      }

      return await this.api.post(API_ENDPOINTS.COUNSELING_BOOK, {
        slotId,
        userId
      });
    } catch (error) {
      console.warn('bookCounselingSlot API call failed:', error);
      return createErrorResponse(error, 'Failed to book counseling slot');
    }  }

  // Helper method to test API response format
  async testApiResponseFormat() {
    try {
      console.log('🧪 Testing API Response Format...');
      
      // Test a simple endpoint to verify response format
      const response = await this.api.get(API_ENDPOINTS.HEALTH);
      
      console.log('✅ API Response Format Test:', {
        hasSuccess: response.hasOwnProperty('success'),
        hasMessage: response.hasOwnProperty('message'),
        hasData: response.hasOwnProperty('data'),
        response: response
      });
      
      return {
        success: true,
        message: 'API response format test completed',
        data: response
      };
    } catch (error) {
      console.log('⚠️ API Response Format Test Error:', error);
      
      // Check if error follows the expected format
      const isValidErrorFormat = error.hasOwnProperty('success') && 
                                error.hasOwnProperty('message');
      
      console.log('Error format validation:', {
        isValidFormat: isValidErrorFormat,
        error: error
      });
      
      return {
        success: false,
        message: 'API response format test failed',
        data: error
      };
    }
  }

  // Test authentication flow
  async testAuthenticationFlow() {
    try {
      console.log('🧪 Testing Authentication Flow...');
      
      // Check if user is logged in
      const currentUser = this.getCurrentUser();
      if (currentUser) {
        console.log('✅ User is logged in:', currentUser.email);
        
        // Test token refresh if available
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          console.log('🔄 Testing token refresh...');
          try {
            await this.refreshToken();
            console.log('✅ Token refresh successful');
          } catch (error) {
            console.log('❌ Token refresh failed:', error.message);
          }
        }
      } else {
        console.log('❌ No user logged in');
      }
      
      return {
        success: true,
        message: 'Authentication flow test completed',
        data: {
          isLoggedIn: !!currentUser,
          user: currentUser,
          hasRefreshToken: !!localStorage.getItem('refreshToken'),
          hasAccessToken: !!localStorage.getItem('accessToken')
        }
      };
    } catch (error) {
      console.log('❌ Authentication flow test failed:', error);
      return {
        success: false,
        message: 'Authentication flow test failed',
        data: error
      };
    }
  }

  // Test Survey APIs
  async testSurveyApis() {
    try {
      console.log('🧪 Testing Survey APIs...');
      
      const results = {};
      
      // Test get surveys
      try {
        console.log('📋 Testing getSurveys...');
        const surveys = await this.getSurveys();
        results.getSurveys = {
          success: true,
          count: surveys.data?.length || 0,
          message: 'Surveys fetched successfully'
        };
      } catch (error) {
        results.getSurveys = {
          success: false,
          message: error.message
        };
      }
      
      // Test get categories
      try {
        console.log('📂 Testing getCategories...');
        const categories = await this.getCategories();
        results.getCategories = {
          success: true,
          count: categories.data?.length || 0,
          message: 'Categories fetched successfully'
        };
      } catch (error) {
        results.getCategories = {
          success: false,
          message: error.message
        };
      }
      
      // Test user-specific APIs (if user is logged in)
      const currentUser = this.getCurrentUser();
      if (currentUser) {
        console.log('👤 Testing user-specific APIs...');
        
        try {
          const userSurveys = await this.getUserSurveys();
          results.getUserSurveys = {
            success: true,
            count: userSurveys.data?.length || 0,
            message: 'User surveys fetched successfully'
          };
        } catch (error) {
          results.getUserSurveys = {
            success: false,
            message: error.message
          };
        }
        
        try {
          const suitableSurveys = await this.getSuitableSurveys();
          results.getSuitableSurveys = {
            success: true,
            count: suitableSurveys.data?.length || 0,
            message: 'Suitable surveys fetched successfully'
          };
        } catch (error) {
          results.getSuitableSurveys = {
            success: false,
            message: error.message
          };
        }
        
        try {
          const surveyStatus = await this.getSurveyStatus();
          results.getSurveyStatus = {
            success: true,
            data: surveyStatus.data,
            message: 'Survey status fetched successfully'
          };
        } catch (error) {
          results.getSurveyStatus = {
            success: false,
            message: error.message
          };
        }
      } else {
        results.userApis = {
          success: false,
          message: 'User not logged in - skipping user-specific API tests'
        };
      }
      
      console.log('✅ Survey API test results:', results);
      
      return {
        success: true,
        message: 'Survey API tests completed',
        data: results
      };
    } catch (error) {
      console.log('❌ Survey API test failed:', error);
      return {
        success: false,
        message: 'Survey API test failed',
        data: error      };
    }
  }

  // Dashboard methods
  async getDashboardData(userId = null) {
    try {
      const targetUserId = userId || this.getCurrentUserId();
      return await this.api.get(API_ENDPOINTS.DASHBOARD_DATA(targetUserId));
    } catch (error) {
      console.warn('getDashboardData failed, using mock data');
      return {
        success: true,
        data: {
          daysSober: 15,
          completedCourses: 3,
          upcomingAppointments: 2,
          streakDays: 15,
          progress: {
            education: 65,
            counseling: 40,
            assessment: 80
          }
        }
      };
    }
  }

  async getCourse(courseId) {
    try {
      return await this.api.get(API_ENDPOINTS.COURSE_BY_ID(courseId));
    } catch (error) {
      console.error('Failed to fetch course:', error);
      throw error;
    }
  }

  async enrollCourse(courseId) {
    try {
      return await this.api.post(API_ENDPOINTS.COURSE_ENROLL(courseId));
    } catch (error) {
      console.error('Failed to enroll course:', error);
      throw error;
    }
  }

  async getPrograms() {
    try {
      return await this.api.get(API_ENDPOINTS.PROGRAMS);
    } catch (error) {
      console.error('Failed to fetch programs:', error);
      throw error;
    }
  }
}

const apiService = new ApiService();
export default apiService;
