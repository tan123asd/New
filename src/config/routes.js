// Complete routing documentation for the application
/*
ROUTING STRUCTURE OVERVIEW

Public Routes (No Authentication Required):
├── / (HomePage) - Landing page
├── /login (LoginPage) - User authentication
├── /education (EducationHub) - Public education content
├── /unauthorized (UnauthorizedPage) - 403 error page
└── /simple-test (TestPage) - Public test page

Protected Routes (Authentication Required):
├── /dashboard (Dashboard) - User dashboard
├── /counseling (Counseling) - Counseling services
├── /courses (CoursesPage) - Training courses
├── /programs (ProgramPage) - Prevention programs
├── /assessment (AssessmentPage) - Survey assessments
│   └── index (SurveyStatus) - Default assessment view
└── /profile (ProfilePage) - User profile management

Admin-Only Routes (Admin Role Required):
├── /test-db (DatabaseTestPanel) - Database testing tools
└── /api-test (ApiTester) - API testing interface

PROTECTION LEVELS:

1. Public Access
   - No authentication required
   - Accessible to all users
   - Examples: /, /login, /education

2. Protected Access (ProtectedRoute)
   - Requires valid accessToken and user data
   - Redirects to /login if not authenticated
   - Preserves return URL for post-login redirect
   - Examples: /dashboard, /profile, /courses

3. Role-based Access (RoleProtectedRoute) 
   - Requires authentication + specific role
   - Redirects to /unauthorized if insufficient permissions
   - Supports multiple allowed roles
   - Examples: /test-db (admin), /api-test (admin)

AUTHENTICATION FLOW:

1. User accesses protected route
2. ProtectedRoute/RoleProtectedRoute checks:
   - accessToken in localStorage
   - user data in localStorage  
   - user role (for role-based routes)
3. Redirect scenarios:
   - No auth → /login with return URL
   - Wrong role → /unauthorized
   - Valid access → Render component

NESTED ROUTES:

/assessment (Protected)
├── index → SurveyStatus component
└── Could add more nested routes like:
    ├── /assessment/take/:id
    ├── /assessment/results
    └── /assessment/history

ROLE HIERARCHY:

Current roles supported:
- admin: Full access to all routes
- user: Standard user access to protected routes
- moderator: (Future implementation)

RETURN URL HANDLING:

When redirected to login, the original URL is preserved:
- User tries to access /dashboard
- Gets redirected to /login
- After successful login, automatically redirected to /dashboard

ERROR HANDLING:

- Invalid routes → Default React Router 404
- Unauthorized access → /unauthorized page
- Authentication errors → /login with error message
- Corrupted user data → Clear localStorage + /login

SECURITY CONSIDERATIONS:

✅ Token validation on route access
✅ Role-based access control  
✅ Secure redirects with state preservation
✅ Error boundary wrapping entire app
✅ Graceful handling of corrupted localStorage
✅ Console logging for debugging (removable in production)

DEVELOPMENT ROUTES:

- /simple-test: Always accessible for testing
- /test-db: Admin-only database testing
- /api-test: Admin-only API testing

These can be disabled in production by environment variables.
*/

export const ROUTE_CONFIG = {
  PUBLIC: {
    HOME: '/',
    LOGIN: '/login', 
    EDUCATION: '/education',
    UNAUTHORIZED: '/unauthorized',
    SIMPLE_TEST: '/simple-test'
  },
  PROTECTED: {
    DASHBOARD: '/dashboard',
    COUNSELING: '/counseling', 
    COURSES: '/courses',
    PROGRAMS: '/programs',
    ASSESSMENT: '/assessment',
    PROFILE: '/profile'
  },
  ADMIN: {
    TEST_DB: '/test-db',
    API_TEST: '/api-test'
  }
};

export const ROLES = {
  ADMIN: 'admin',
  USER: 'user', 
  MODERATOR: 'moderator'
};

export default ROUTE_CONFIG;
