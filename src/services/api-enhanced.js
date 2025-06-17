import axios from 'axios';
import { API_CONFIG } from '../config';

const API_BASE_URL = API_CONFIG.BASE_URL;

// Validation helpers
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  // At least 8 characters, one uppercase, one lowercase, one number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

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
    );

    // Add response interceptor for error handling
    this.api.interceptors.response.use(
      (response) => {
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
          
          let errorMessage = 'Request failed';
          if (typeof data === 'string') {
            errorMessage = data;
          } else if (data && data.message) {
            errorMessage = data.message;
          }
          
          return Promise.reject({
            success: false,
            message: errorMessage,
            status,
            data
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
    );
  }

  // Helper methods
  getCurrentUserId() {
    try {
      const userData = localStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        return user.id || user.userId;
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

  // Authentication with validation
  async login(credentials) {
    console.log('ApiService: Login called with:', credentials.email);
    
    try {
      // Client-side validation
      validateRequired(credentials.email, 'Email');
      validateRequired(credentials.password, 'Password');
      
      if (!validateEmail(credentials.email)) {
        throw new Error('Invalid email format');
      }

      console.log('ApiService: Attempting real API call to:', `${API_BASE_URL}/auth/login`);
      const response = await this.api.post('/auth/login', credentials);
      
      console.log('ApiService: Real API response:', response);
      
      if (response.success && response.data && response.data.accessToken) {
        console.log('ApiService: Real API login successful');
        this.token = response.data.accessToken;
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        return response;
      } else {
        throw new Error('Invalid API response structure');
      }
      
    } catch (error) {
      console.warn('Real API login failed:', error.message);
      return createErrorResponse(error, 'Login failed');
    }
  }

  async register(userData) {
    try {
      // Client-side validation
      validateRequired(userData.email, 'Email');
      validateRequired(userData.password, 'Password');
      validateRequired(userData.fullName, 'Full Name');
      
      if (!validateEmail(userData.email)) {
        throw new Error('Invalid email format');
      }
      
      if (!validatePassword(userData.password)) {
        throw new Error('Password must be at least 8 characters with uppercase, lowercase, and number');
      }

      const response = await this.api.post('/auth/register', userData);
      return response;
    } catch (error) {
      return createErrorResponse(error, 'Registration failed');
    }
  }

  async logout() {
    try {
      // Call API to invalidate token on server
      await this.api.post('/auth/logout');
    } catch (error) {
      console.warn('Logout API call failed:', error);
    } finally {
      // Always clear local storage
      this.token = null;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
    }
  }

  // Profile
  async getProfile() {
    try {
      const userId = this.getCurrentUserId();
      if (!userId) {
        throw new Error('No user ID available');
      }
      return await this.api.get(`/users/${userId}`);
    } catch (error) {
      console.warn('getProfile API call failed:', error);
      return createErrorResponse(error, 'Failed to fetch profile');
    }
  }

  async updateProfile(profileData) {
    try {
      const userId = this.getCurrentUserId();
      if (!userId) {
        throw new Error('No user ID available');
      }
      
      // Client-side validation
      if (profileData.email && !validateEmail(profileData.email)) {
        throw new Error('Invalid email format');
      }

      return await this.api.put(`/users/${userId}`, profileData);
    } catch (error) {
      console.warn('updateProfile API call failed:', error);
      return createErrorResponse(error, 'Failed to update profile');
    }
  }

  // Categories
  async getCategories() {
    try {
      return await this.api.get('/categories');
    } catch (error) {
      console.warn('getCategories API call failed:', error);
      return createErrorResponse(error, 'Failed to fetch categories');
    }
  }

  // Surveys
  async getSurveys() {
    try {
      return await this.api.get('/surveys');
    } catch (error) {
      console.warn('getSurveys API call failed:', error);
      return createErrorResponse(error, 'Failed to fetch surveys');
    }
  }

  async getSurvey(id) {
    try {
      validateRequired(id, 'Survey ID');
      return await this.api.get(`/surveys/${id}`);
    } catch (error) {
      console.warn('getSurvey API call failed:', error);
      return createErrorResponse(error, 'Failed to fetch survey');
    }
  }

  async getUserSurveys(userId = null) {
    try {
      const targetUserId = userId || this.getCurrentUserId();
      if (!targetUserId) {
        throw new Error('No user ID available');
      }
      return await this.api.get(`/surveys/user/${targetUserId}`);
    } catch (error) {
      console.warn('getUserSurveys API call failed:', error);
      return createErrorResponse(error, 'Failed to fetch user surveys');
    }
  }

  async getSuitableSurveys(userId = null) {
    try {
      const targetUserId = userId || this.getCurrentUserId();
      if (!targetUserId) {
        throw new Error('No user ID available');
      }
      return await this.api.get(`/surveys/suitable/${targetUserId}`);
    } catch (error) {
      console.warn('getSuitableSurveys API call failed:', error);
      return createErrorResponse(error, 'Failed to fetch suitable surveys');
    }
  }

  async getSurveyStatus(userId = null) {
    try {
      const targetUserId = userId || this.getCurrentUserId();
      if (!targetUserId) {
        throw new Error('No user ID available');
      }
      return await this.api.get(`/surveys/status/${targetUserId}`);
    } catch (error) {
      console.warn('getSurveyStatus API call failed:', error);
      return createErrorResponse(error, 'Failed to fetch survey status');
    }
  }

  async submitSurveyResponse(surveyId, responses) {
    try {
      validateRequired(surveyId, 'Survey ID');
      validateRequired(responses, 'Survey responses');
      
      const userId = this.getCurrentUserId();
      if (!userId) {
        throw new Error('No user ID available');
      }

      const payload = {
        surveyId,
        userId,
        responses
      };

      return await this.api.post('/surveys/submit', payload);
    } catch (error) {
      console.warn('submitSurveyResponse API call failed:', error);
      return createErrorResponse(error, 'Failed to submit survey');
    }
  }

  // Courses
  async getCourses() {
    try {
      return await this.api.get('/courses');
    } catch (error) {
      console.warn('getCourses API call failed:', error);
      return createErrorResponse(error, 'Failed to fetch courses');
    }
  }

  async getCourse(id) {
    try {
      validateRequired(id, 'Course ID');
      return await this.api.get(`/courses/${id}`);
    } catch (error) {
      console.warn('getCourse API call failed:', error);
      return createErrorResponse(error, 'Failed to fetch course');
    }
  }

  async enrollCourse(courseId) {
    try {
      validateRequired(courseId, 'Course ID');
      
      const userId = this.getCurrentUserId();
      if (!userId) {
        throw new Error('No user ID available');
      }

      return await this.api.post('/courses/enroll', {
        courseId,
        userId
      });
    } catch (error) {
      console.warn('enrollCourse API call failed:', error);
      return createErrorResponse(error, 'Failed to enroll in course');
    }
  }

  // Programs  
  async getPrograms() {
    try {
      return await this.api.get('/programs');
    } catch (error) {
      console.warn('getPrograms API call failed:', error);
      return createErrorResponse(error, 'Failed to fetch programs');
    }
  }

  async getProgram(id) {
    try {
      validateRequired(id, 'Program ID');
      return await this.api.get(`/programs/${id}`);
    } catch (error) {
      console.warn('getProgram API call failed:', error);
      return createErrorResponse(error, 'Failed to fetch program');
    }
  }

  async enrollProgram(programId) {
    try {
      validateRequired(programId, 'Program ID');
      
      const userId = this.getCurrentUserId();
      if (!userId) {
        throw new Error('No user ID available');
      }

      return await this.api.post('/programs/enroll', {
        programId,
        userId
      });
    } catch (error) {
      console.warn('enrollProgram API call failed:', error);
      return createErrorResponse(error, 'Failed to enroll in program');
    }
  }

  // Counseling
  async getCounselingSlots() {
    try {
      return await this.api.get('/counseling/slots');
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

      return await this.api.post('/counseling/book', {
        slotId,
        userId
      });
    } catch (error) {
      console.warn('bookCounselingSlot API call failed:', error);
      return createErrorResponse(error, 'Failed to book counseling slot');
    }
  }
}

export default new ApiService();
