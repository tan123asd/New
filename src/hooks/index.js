// Additional specialized hooks for common API patterns
import { useState, useEffect, useCallback } from 'react';
import ApiService from '../services/api';
import { useApi } from './useApi';

// Hook for surveys data
export const useSurveys = () => {
  const { loading, error, data, callApi, reset } = useApi();
  const fetchSurveys = useCallback(() => {
    return callApi(() => ApiService.getSurveys());
  }, []);

  const fetchUserSurveys = useCallback((userId = null) => {
    return callApi(() => ApiService.getUserSurveys(userId));
  }, []);

  const fetchSuitableSurveys = useCallback((userId = null) => {
    return callApi(() => ApiService.getSuitableSurveys(userId));
  }, []);

  return {
    surveys: data,
    loading,
    error,
    fetchSurveys,
    fetchUserSurveys,
    fetchSuitableSurveys,
    reset
  };
};

// Hook for authentication
export const useAuth = () => {
  const { loading, error, callApi, reset } = useApi();
  const [user, setUser] = useState(ApiService.getCurrentUser());
  const login = useCallback(async (credentials) => {
    try {
      const result = await callApi(() => ApiService.login(credentials));
      if (result.success) {
        setUser(ApiService.getCurrentUser());
      }
      return result;
    } catch (err) {
      throw err;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await ApiService.logout();
      setUser(null);
      reset();
    } catch (err) {
      console.error('Logout error:', err);
      // Force logout even if API call fails
      setUser(null);
      reset();
    }
  }, [reset]);

  const register = useCallback(async (userData) => {
    return callApi(() => ApiService.register(userData));
  }, []);

  return {
    user,
    loading,
    error,
    login,
    logout,
    register,
    isAuthenticated: !!user,
    reset
  };
};

// Hook for courses data
export const useCourses = () => {
  const { loading, error, data, callApi, reset } = useApi();
  const fetchCourses = useCallback(() => {
    return callApi(() => ApiService.getCourses());
  }, []);
  const fetchCourse = useCallback((courseId) => {
    return callApi(() => ApiService.getCourse(courseId));
  }, []);
  const enrollCourse = useCallback((courseId) => {
    return callApi(() => ApiService.enrollCourse(courseId));
  }, []);

  return {
    courses: data,
    loading,
    error,
    fetchCourses,
    fetchCourse,
    enrollCourse,
    reset
  };
};

// Hook for user profile
export const useProfile = () => {
  const { loading, error, data, callApi, reset } = useApi();
  const fetchProfile = useCallback(() => {
    return callApi(() => ApiService.getProfile());
  }, []);

  const updateProfile = useCallback((profileData) => {
    return callApi(() => ApiService.updateProfile(profileData));
  }, []);

  return {
    profile: data,
    loading,
    error,
    fetchProfile,
    updateProfile,
    reset
  };
};

// Hook for data fetching with auto-load
export const useApiData = (apiCall, dependencies = []) => {
  const { loading, error, data, callApi, reset } = useApi();
  const fetchData = useCallback(() => {
    if (apiCall) {
      return callApi(apiCall);
    }
  }, [apiCall]);

  useEffect(() => {
    fetchData();
  }, dependencies); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    data,
    loading,
    error,
    refetch: fetchData,
    reset
  };
};

// Hook for form submission with API
export const useApiForm = () => {
  const { loading, error, callApi, reset } = useApi();
  const [success, setSuccess] = useState(false);
  const submitForm = useCallback(async (apiCall) => {
    setSuccess(false);
    try {
      const result = await callApi(apiCall);
      setSuccess(true);
      return result;
    } catch (err) {
      setSuccess(false);
      throw err;
    }
  }, []);

  const resetForm = useCallback(() => {
    setSuccess(false);
    reset();
  }, [reset]);

  return {
    loading,
    error,
    success,
    submitForm,
    reset: resetForm
  };
};

export default useApi;
