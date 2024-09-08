import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './PhoneBuildPage.css';

const PhoneBuildPage = () => {
  const { id } = useParams(); // Get the id from the URL
  const [phone, setPhone] = useState(null);
  const [sourceChangelog, setSourceChangelog] = useState('');
  const [changelog, setChangelog] = useState('');
  const [installationInstructions, setInstallationInstructions] = useState('');
  const [toggleSourceChangelog, setToggleSourceChangelog] = useState(false);
  const [toggleChangelog, setToggleChangelog] = useState(false);
  const [toggleInstructions, setToggleInstructions] = useState(false);

  useEffect(() => {
    const fetchPhone = async () => {
      try {
        const response = await fetch('/hyperOS/phones.json');
        const data = await response.json();
        const foundPhone = data.phones.find(p => p.id === parseInt(id, 10)); // Match by id
        setPhone(foundPhone);
        // Fetch changelogs and instructions
        if (foundPhone) {
          fetchTextFile(foundPhone.sourceChangelogs, setSourceChangelog);
          fetchTextFile(foundPhone.changelogs, setChangelog);
          fetchTextFile(foundPhone.installationInstructions, setInstallationInstructions);
        }
      } catch (error) {
        console.error('Error fetching phone data:', error);
      }
    };

    const fetchTextFile = async (filePath, setText) => {
      try {
        const response = await fetch(filePath);
        const text = await response.text();
        setText(text);
      } catch (error) {
        console.error('Error fetching text file:', error);
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
        <a href={phone.telegramLink}>Telegram</a> | <a href={phone.githubLink}>GitHub</a>
      </div>

      <div className="download-buttons">
        <a href={phone.recoveryDownload} className="download-button">
          <i className="fas fa-download"></i> Download Recovery
        </a>
        <a href={phone.romDownload} className="download-button">
          <i className="fas fa-download"></i> Download ROM
        </a>
        {phone.previousRomDownload && (
          <a href={phone.previousRomDownload} className="download-button">
            <i className="fas fa-download"></i> Download Archive
          </a>
        )}
      </div>

      {/* Toggle Source Changelog */}
      <div className="changelog-info">
        <button onClick={() => setToggleSourceChangelog(!toggleSourceChangelog)}>
          {toggleSourceChangelog ? 'Hide' : 'Show'} Source Changelog
        </button>
        {toggleSourceChangelog && <pre>{sourceChangelog}</pre>}
      </div>

      {/* Toggle Changelog */}
      <div className="changelog-info">
        <button onClick={() => setToggleChangelog(!toggleChangelog)}>
          {toggleChangelog ? 'Hide' : 'Show'} Changelog
        </button>
        {toggleChangelog && <pre>{changelog}</pre>}
      </div>

      {/* Toggle Installation Instructions */}
      <div className="changelog-info">
        <button onClick={() => setToggleInstructions(!toggleInstructions)}>
          {toggleInstructions ? 'Hide' : 'Show'} Installation Instructions
        </button>
        {toggleInstructions && <pre>{installationInstructions}</pre>}
      </div>

      <div className="support-us">
        <h2>Support Us</h2>
        <p>If you'd like to support our work, you can do so via UPI.</p>
        <a href="upi://pay?pa=YOUR_UPI_ID&pn=YOUR_NAME" className="support-button">Donate via UPI</a>
      </div>
    </div>
  );
};

export default PhoneBuildPage;
