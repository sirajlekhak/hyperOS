// src/pages/TeamPage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TeamPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faTelegram } from '@fortawesome/free-brands-svg-icons';

const TeamPage = () => {
  const [developers, setDevelopers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/developers.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setDevelopers(data);
      } catch (error) {
        console.error('Error fetching developer data:', error);
      }
    };

    fetchData();
  }, []);

  const handleGoHome = () => {
    navigate('/'); // Navigates back to the homepage
  };

  return (
    <div className="team-container">
      <h1>Our Team</h1>
      <p className="team-description">
        These are people who play an important role in maintaining HyperOS
        from day to day work to monthly updates.
      </p>
      <div className="team-cards">
        {developers.map(dev => (
          <div key={dev.login} className="team-card">
            <img src={dev.avatar_url} alt={dev.login} className="team-avatar" />
            <h2>{dev.name || dev.login}</h2>
            <p className="bio">{dev.bio || 'No bio available'}</p>
            <div className="links-container">
              <a href={dev.html_url} target="_blank" rel="noopener noreferrer" className="team-link icon-link">
                <FontAwesomeIcon icon={faGithub} size="2x" />
              </a>
              {dev.telegram_url && (
                <a href={dev.telegram_url} target="_blank" rel="noopener noreferrer" className="team-link telegram-link icon-link">
                  <FontAwesomeIcon icon={faTelegram} size="2x" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* Back to Top Button */}
      <button className="back-to-top-button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        Back to Top
      </button>
    </div>
  );
};

export default TeamPage;
