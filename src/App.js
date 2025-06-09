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

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/education" element={<EducationHub />} />
            <Route path="/counseling" element={<Counseling />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/programs" element={<ProgramPage />} />
            <Route path="/assessment" element={<AssessmentPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
