// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Page/Home';
import Assist1 from './Page/Assist1';
import UserProfile from './Page/UserProfile';
import DoctorProfile from './Page/DoctorProfile';
import DoctorDetail from './Page/DoctorDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/assist" element={<Assist1 />} />
        <Route path="/profile" element={<UserProfile />} />
      
        
        <Route path="/doctors" element={<DoctorProfile />} />
        <Route path="/doctor/:id" element={<DoctorDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
