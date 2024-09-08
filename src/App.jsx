// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/homepage/HomePage';
import TeamPage from './pages/teampage/TeamPage';
import DownloadPage from './pages/downloadpage/DownloadPage';
import PhoneBuildPage from './pages/phonebuild/PhoneBuildPage';

const App = () => {
  return (
    <Router basename="/hyperOS">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/download" element={<DownloadPage />} />
        <Route path="/builds/:id" element={<PhoneBuildPage />} />
      </Routes>
    </Router>
  );
};

export default App;
