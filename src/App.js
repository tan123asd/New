// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Page/Home';
import Assist1 from './Page/Assist1';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/assist" element={<Assist1 />} />
      </Routes>
    </Router>
  );
}

export default App;
