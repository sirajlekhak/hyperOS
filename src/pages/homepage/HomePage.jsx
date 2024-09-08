// src/pages/homepage/HomePage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import phoneImage from '../../assets/phone.png'; // Adjust the path as necessary
import flowerImage from '../../assets/flower.png'; // Adjust the path as necessary
import './HomePage.css'; // Import the CSS specific to the homepage

const HomePage = () => {
  const navigate = useNavigate();

  const handleDownloadClick = () => {
    navigate('/download'); // Navigate to the download page
  };

  return (
    <>
      <div className="main-content">
        <div className="text-content">
          <h2>Xiaomi Hyper<span>OS</span></h2>
          <p>
            HyperOS is a ported ROM offering enhanced performance and unique features. Experience a refined interface with custom optimizations designed to boost your device's capabilities.
          </p>
          <button className="get-button" onClick={handleDownloadClick}>Get HyperOS</button>
        </div>
        <img src={phoneImage} alt="Phone Display" className="homephone-image" />
      </div>

      </>
  );
};

export default HomePage;
