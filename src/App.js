import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import "./App.css";

// Pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import EducationHub from "./pages/EducationHub";
import Counseling from "./pages/Counseling";
import Dashboard from "./pages/Dashboard";
import CoursesPage from "./pages/CoursesPage";
import ProgramPage from "./pages/ProgramPage";
import AssessmentPage from "./pages/AssessmentPage";
import ProfilePage from "./pages/ProfilePage";
import UnauthorizedPage from "./pages/UnauthorizedPage";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import SurveyStatus from "./components/SurveyStatus";
import ErrorBoundary from "./components/ErrorBoundary";
import DatabaseTestPanel from "./components/DatabaseTestPanel";
import ApiTester from "./components/ApiTester";
import TestPage from "./components/TestPage";
import ProtectedRoute from "./components/ProtectedRoute";
import RoleProtectedRoute from "./components/RoleProtectedRoute";

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="app-container">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/education" element={<EducationHub />} />
              <Route path="/unauthorized" element={<UnauthorizedPage />} />
              
              {/* Protected Routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              
              <Route path="/counseling" element={
                <ProtectedRoute>
                  <Counseling />
                </ProtectedRoute>
              } />
              
              <Route path="/courses" element={
                <ProtectedRoute>
                  <CoursesPage />
                </ProtectedRoute>
              } />
              
              <Route path="/programs" element={
                <ProtectedRoute>
                  <ProgramPage />
                </ProtectedRoute>
              } />
              
              <Route path="/assessment" element={
                <ProtectedRoute>
                  <AssessmentPage />
                </ProtectedRoute>
              }>
                <Route index element={<SurveyStatus />} />
              </Route>
              
              <Route path="/profile" element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              } />
              
              {/* Admin Routes */}
              <Route path="/test-db" element={
                <RoleProtectedRoute allowedRoles={['admin']}>
                  <DatabaseTestPanel />
                </RoleProtectedRoute>
              } />
              
              <Route path="/api-test" element={
                <RoleProtectedRoute allowedRoles={['admin']}>
                  <ApiTester />
                </RoleProtectedRoute>
              } />
              
              <Route path="/simple-test" element={<TestPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
