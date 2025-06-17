// Example component demonstrating useApi hook usage
import React, { useState } from 'react';
import useApi, { useSurveys, useAuth, useCourses, useProfile, useApiData, useApiForm } from '../hooks';
import ApiService from '../services/api';

const ApiHookExample = () => {
  const [selectedExample, setSelectedExample] = useState('basic');

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>🪝 API Hooks Usage Examples</h2>
      
      {/* Navigation */}
      <div style={{ marginBottom: '20px' }}>
        <select 
          value={selectedExample} 
          onChange={(e) => setSelectedExample(e.target.value)}
          style={{ padding: '8px', marginRight: '10px' }}
        >
          <option value="basic">Basic useApi Hook</option>
          <option value="surveys">useSurveys Hook</option>
          <option value="auth">useAuth Hook</option>
          <option value="courses">useCourses Hook</option>
          <option value="profile">useProfile Hook</option>
          <option value="autoload">useApiData Hook</option>
          <option value="form">useApiForm Hook</option>
        </select>
      </div>

      {/* Examples */}
      {selectedExample === 'basic' && <BasicApiExample />}
      {selectedExample === 'surveys' && <SurveysExample />}
      {selectedExample === 'auth' && <AuthExample />}
      {selectedExample === 'courses' && <CoursesExample />}
      {selectedExample === 'profile' && <ProfileExample />}
      {selectedExample === 'autoload' && <AutoLoadExample />}
      {selectedExample === 'form' && <FormExample />}
    </div>
  );
};

// Basic useApi example
const BasicApiExample = () => {
  const { loading, error, data, callApi, reset } = useApi();

  const fetchSurveys = () => {
    callApi(() => ApiService.getSurveys());
  };

  const fetchCategories = () => {
    callApi(() => ApiService.getCategories());
  };

  return (
    <div>
      <h3>Basic useApi Hook</h3>
      <div style={{ marginBottom: '15px' }}>
        <button onClick={fetchSurveys} disabled={loading}>
          Fetch Surveys
        </button>
        <button onClick={fetchCategories} disabled={loading} style={{ marginLeft: '10px' }}>
          Fetch Categories
        </button>
        <button onClick={reset} style={{ marginLeft: '10px' }}>
          Reset
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {data && (
        <div>
          <h4>Data:</h4>
          <pre style={{ background: '#f5f5f5', padding: '10px', overflow: 'auto' }}>
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

// Surveys example
const SurveysExample = () => {
  const { surveys, loading, error, fetchSurveys, fetchUserSurveys, fetchSuitableSurveys, reset } = useSurveys();

  return (
    <div>
      <h3>useSurveys Hook</h3>
      <div style={{ marginBottom: '15px' }}>
        <button onClick={fetchSurveys} disabled={loading}>
          All Surveys
        </button>
        <button onClick={() => fetchUserSurveys()} disabled={loading} style={{ marginLeft: '10px' }}>
          My Surveys
        </button>
        <button onClick={() => fetchSuitableSurveys()} disabled={loading} style={{ marginLeft: '10px' }}>
          Suitable Surveys
        </button>
        <button onClick={reset} style={{ marginLeft: '10px' }}>
          Reset
        </button>
      </div>

      {loading && <p>Loading surveys...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {surveys && (
        <div>
          <h4>Surveys ({surveys.data?.length || 0}):</h4>
          <div style={{ maxHeight: '300px', overflow: 'auto' }}>
            {surveys.data?.map(survey => (
              <div key={survey.id} style={{ padding: '10px', border: '1px solid #ddd', margin: '5px 0' }}>
                <strong>{survey.title}</strong>
                <p>{survey.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Auth example
const AuthExample = () => {
  const { user, loading, error, login, logout, register, isAuthenticated, reset } = useAuth();
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleLogin = () => {
    login(credentials);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <h3>useAuth Hook</h3>
      
      <div style={{ marginBottom: '15px' }}>
        <p><strong>Status:</strong> {isAuthenticated ? '✅ Authenticated' : '❌ Not authenticated'}</p>
        {user && (
          <div>
            <p><strong>User:</strong> {user.email} ({user.role})</p>
          </div>
        )}
      </div>

      {!isAuthenticated ? (
        <div>
          <div style={{ marginBottom: '10px' }}>
            <input
              type="email"
              placeholder="Email"
              value={credentials.email}
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
              style={{ marginRight: '10px', padding: '5px' }}
            />
            <input
              type="password"
              placeholder="Password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              style={{ marginRight: '10px', padding: '5px' }}
            />
          </div>
          <button onClick={handleLogin} disabled={loading}>
            Login
          </button>
        </div>
      ) : (
        <button onClick={handleLogout} disabled={loading}>
          Logout
        </button>
      )}

      {loading && <p>Processing...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
    </div>
  );
};

// Courses example
const CoursesExample = () => {
  const { courses, loading, error, fetchCourses, fetchCourse, enrollCourse, reset } = useCourses();

  return (
    <div>
      <h3>useCourses Hook</h3>
      <div style={{ marginBottom: '15px' }}>
        <button onClick={fetchCourses} disabled={loading}>
          Fetch Courses
        </button>
        <button onClick={reset} style={{ marginLeft: '10px' }}>
          Reset
        </button>
      </div>

      {loading && <p>Loading courses...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {courses && (
        <div>
          <h4>Courses ({courses.data?.length || 0}):</h4>
          <div style={{ maxHeight: '300px', overflow: 'auto' }}>
            {courses.data?.map(course => (
              <div key={course.id} style={{ padding: '10px', border: '1px solid #ddd', margin: '5px 0' }}>
                <strong>{course.title}</strong>
                <p>{course.description}</p>
                <button 
                  onClick={() => enrollCourse(course.id)} 
                  disabled={loading}
                  style={{ marginTop: '5px' }}
                >
                  Enroll
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Profile example
const ProfileExample = () => {
  const { profile, loading, error, fetchProfile, updateProfile, reset } = useProfile();

  return (
    <div>
      <h3>useProfile Hook</h3>
      <div style={{ marginBottom: '15px' }}>
        <button onClick={fetchProfile} disabled={loading}>
          Fetch Profile
        </button>
        <button onClick={reset} style={{ marginLeft: '10px' }}>
          Reset
        </button>
      </div>

      {loading && <p>Loading profile...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {profile && (
        <div>
          <h4>Profile:</h4>
          <pre style={{ background: '#f5f5f5', padding: '10px' }}>
            {JSON.stringify(profile, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

// Auto-load example
const AutoLoadExample = () => {
  const { data, loading, error, refetch } = useApiData(
    () => ApiService.getCategories(),
    [] // Auto-load on mount
  );

  return (
    <div>
      <h3>useApiData Hook (Auto-load)</h3>
      <p>This hook automatically loads data on component mount.</p>
      
      <button onClick={refetch} disabled={loading}>
        Refetch
      </button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {data && (
        <div>
          <h4>Auto-loaded Data:</h4>
          <pre style={{ background: '#f5f5f5', padding: '10px', overflow: 'auto' }}>
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

// Form example
const FormExample = () => {
  const { loading, error, success, submitForm, reset } = useApiForm();
  const [formData, setFormData] = useState({ title: '', description: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock form submission
    submitForm(() => 
      new Promise((resolve) => 
        setTimeout(() => resolve({ success: true, message: 'Form submitted successfully' }), 1000)
      )
    );
  };

  return (
    <div>
      <h3>useApiForm Hook</h3>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            placeholder="Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            style={{ marginRight: '10px', padding: '5px' }}
          />
          <input
            type="text"
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            style={{ padding: '5px' }}
          />
        </div>
        <button type="submit" disabled={loading}>
          Submit Form
        </button>
        <button type="button" onClick={reset} style={{ marginLeft: '10px' }}>
          Reset
        </button>
      </form>

      {loading && <p>Submitting...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {success && <p style={{ color: 'green' }}>✅ Form submitted successfully!</p>}
    </div>
  );
};

export default ApiHookExample;
