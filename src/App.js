import * as React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import "./App.css";

// Pages
import AssistSurvey from "./pages/AssistSurvey";
import UserProfile from "./pages/UserProfile";
import ProgramSurvey from "./pages/ProgramSurvey";
import SurveyThankYou from "./pages/SurveyThankYou";

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="App">
          <main>
            <Routes>
              <Route path="/" element={<AssistSurvey />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/program-survey" element={<ProgramSurvey />} />
              <Route path="/survey-thank-you" element={<SurveyThankYou />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
