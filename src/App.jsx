// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/homepage/HomePage';
import TeamPage from './pages/teampage/TeamPage';
import DownloadPage from './pages/downloadpage/DownloadPage';
import PhoneBuildPage from './pages/phonebuild/PhoneBuildPage';
import BlogPage from './pages/blog/BlogPage';
import ManagePhonesPage from './pages/managephones/ManagePhonesPage'; // Import ManagePhonesPage
import LoginPage from './components/LoginPage'; // Import LoginPage
import Footer from './components/footer';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router basename="/hyperOS">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/download" element={<DownloadPage />} />
        <Route path="/builds/:id" element={<PhoneBuildPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/builds" element={<DownloadPage />} />
        <Route path="/manage-phones" element={isLoggedIn ? <ManagePhonesPage /> : <LoginPage onLogin={handleLogin} />} /> {/* Conditional Rendering */}
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
