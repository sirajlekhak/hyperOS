import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './PhoneBuildPage.css';

const PhoneBuildPage = () => {
  const { id } = useParams();
  const [phone, setPhone] = useState(null);
  const [toggleSourceChangelog, setToggleSourceChangelog] = useState(false);
  const [toggleChangelog, setToggleChangelog] = useState(false);
  const [toggleInstructions, setToggleInstructions] = useState(false);

  useEffect(() => {
    const fetchPhone = async () => {
      try {
        const response = await fetch('http://localhost:3000/phones'); // Adjust to your API endpoint
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();

        // Find the phone by ID (string comparison)
        const foundPhone = data.find(p => p.id === id);
        if (!foundPhone) throw new Error('Phone not found');

        setPhone(foundPhone);
      } catch (error) {
        console.error('Error fetching phone data:', error);
      }
    };

    fetchPhone();
  }, [id]);

  if (!phone) {
    return <p>Loading phone details...</p>;
  }

  return (
    <div className="phone-build-page">
      <h1>{phone.name} - Build Downloads</h1>
      
      <div className="phone-info-box">
        <p><strong>Codename:</strong> {phone.codename}</p>
        <p><strong>Maintainer:</strong> {phone.maintainer}</p>
        <p><strong>Version:</strong> {phone.version}</p>
        <p><strong>Build date:</strong> {phone.build_date}</p>
        <p><strong>Status:</strong> {phone.status}</p> 
        <div className="social-links">
  <a href={phone.telegramLink} target="_blank" rel="noopener noreferrer" className="social-link">Telegram</a>
  <span> | </span>
  <a href={phone.githubLink} target="_blank" rel="noopener noreferrer" className="social-link">GitHub</a>
</div>
</div>

      <div className="download-buttons">
        <a href={phone.recoveryDownload} className="download-button" target="_blank" rel="noopener noreferrer">
          <i className="fas fa-download"></i> Download Recovery
        </a>
        <a href={phone.romDownload} className="download-button" target="_blank" rel="noopener noreferrer">
          <i className="fas fa-download"></i> Download ROM
        </a>
        {phone.previousRomDownload && (
          <a href={phone.previousRomDownload} className="download-button" target="_blank" rel="noopener noreferrer">
            <i className="fas fa-download"></i> Download Archive
          </a>
        )}
      </div>

      {/* Source Changelog Section */}
      <div className="changelog-info">
        <button onClick={() => setToggleSourceChangelog(!toggleSourceChangelog)}>
          {toggleSourceChangelog ? 'Hide' : 'Show'} Source Changelog
        </button>
        {toggleSourceChangelog && (
          <pre>{phone.sourceChangelogs || 'No source changelog available.'}</pre>
        )}
      </div>

      {/* Changelog Section */}
      <div className="changelog-info">
        <button onClick={() => setToggleChangelog(!toggleChangelog)}>
          {toggleChangelog ? 'Hide' : 'Show'} Changelog
        </button>
        {toggleChangelog && (
          <pre>{phone.changelogs || 'No changelog available.'}</pre>
        )}
      </div>

      {/* Installation Instructions Section */}
      <div className="changelog-info">
        <button onClick={() => setToggleInstructions(!toggleInstructions)}>
          {toggleInstructions ? 'Hide' : 'Show'} Installation Instructions
        </button>
        {toggleInstructions && (
          <pre>{phone.installationInstructions || 'No instructions available.'}</pre>
        )}
      </div>

      <div className="support-us">
        <h2>Support Us</h2>
        <p>If you'd like to support our work, you can do so via UPI.</p>
        <a href="upi://pay?pa=crajmusics@oksbi&pn=Siraj_Alam" className="support-button" target="_blank" rel="noopener noreferrer">Donate via UPI</a>
      </div>
    </div>
  );
};

export default PhoneBuildPage;
