import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBars } from 'react-icons/fa'; // Importing FaBars icon
import './Navbar.css';
import logo from '../assets/logo.png'; // Adjust the path to your logo image

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Check screen width for responsiveness
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 836);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check on mount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Toggle dropdown visibility
  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <NavLink to="/" end>
          <img src={logo} alt="Xiaomi HyperOS Logo" className="logo-image" />
          <h1>Xiaomi Hyper<span>OS</span></h1>
        </NavLink>
      </div>
      
      {!isMobile ? (
        <div className="navbar-links">
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
            About
          </NavLink>
          <NavLink to="/team" className={({ isActive }) => (isActive ? 'active' : '')}>
            Team
          </NavLink>
          <NavLink to="/download" className={({ isActive }) => (isActive ? 'active' : '')}>
            Download
          </NavLink>
          <NavLink to="/blog" className={({ isActive }) => (isActive ? 'active' : '')}>
            Blog
          </NavLink>
        </div>
      ) : (
        <div className="breadcrumb-menu">
          <FaBars className="breadcrumb-icon" onClick={handleDropdownToggle} /> {/* Toggle Icon */}
          {isDropdownOpen && (
            <div className="dropdown-links">
              <NavLink to="/" end onClick={() => setIsDropdownOpen(false)} className={({ isActive }) => (isActive ? 'active' : '')}>
                About
              </NavLink>
              <NavLink to="/team" onClick={() => setIsDropdownOpen(false)} className={({ isActive }) => (isActive ? 'active' : '')}>
                Team
              </NavLink>
              <NavLink to="/download" onClick={() => setIsDropdownOpen(false)} className={({ isActive }) => (isActive ? 'active' : '')}>
                Download
              </NavLink>
              <NavLink to="/blog" onClick={() => setIsDropdownOpen(false)} className={({ isActive }) => (isActive ? 'active' : '')}>
                Blog
              </NavLink>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
