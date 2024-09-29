import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './PhoneBuildPage.css';

const PhoneBuildPage = () => {
  const { id } = useParams();
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
        const response = await fetch('/hyperOS/phones.json'); // Ensure this path is correct
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();

        const foundPhone = data.phones.find(p => p.id === parseInt(id, 10));
        if (!foundPhone) throw new Error('Phone not found');

        setPhone(foundPhone);

        if (foundPhone) {
          console.log('Fetching text files for:', foundPhone);
          fetchTextFile(`/hyperOS${foundPhone.sourceChangelogs}`, setSourceChangelog);
          fetchTextFile(`/hyperOS${foundPhone.changelogs}`, setChangelog);
          fetchTextFile(`/hyperOS${foundPhone.installationInstructions}`, setInstallationInstructions);
        }
      } catch (error) {
        console.error('Error fetching phone data:', error);
      }
    };

    const fetchTextFile = async (filePath, setText) => {
      try {
        console.log('Fetching file:', filePath);
        const response = await fetch(filePath);
        if (!response.ok) throw new Error('Network response was not ok');
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
      {/* Display the phone image */}
      {phone.image && (
        <img src={phone.image} alt={`${phone.name}`} className="phone-image" />
      )}
      <div className="phone-info-box">
        <p><strong>Codename:</strong> {phone.codename}</p>
        <p><strong>Maintainer:</strong> {phone.maintainer}</p>
        <p><strong>Version:</strong> {phone.version}</p> {/* Display version */}
        <p><strong>Build date:</strong> {phone.build_date}</p> {/* Display release cycle */}
        <p><strong>Status:</strong> {phone.status}</p> 
        <a href={phone.telegramlink}>Telegram</a> | <a href={phone.githublink}>GitHub</a>
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

      <div className="changelog-info">
        <button onClick={() => setToggleSourceChangelog(!toggleSourceChangelog)}>
          {toggleSourceChangelog ? 'Hide' : 'Show'} Source Changelog
        </button>
        {toggleSourceChangelog && <pre>{sourceChangelog || 'No source changelog available.'}</pre>}
      </div>

      <div className="changelog-info">
        <button onClick={() => setToggleChangelog(!toggleChangelog)}>
          {toggleChangelog ? 'Hide' : 'Show'} Changelog
        </button>
        {toggleChangelog && <pre>{changelog || 'No changelog available.'}</pre>}
      </div>

      <div className="changelog-info">
        <button onClick={() => setToggleInstructions(!toggleInstructions)}>
          {toggleInstructions ? 'Hide' : 'Show'} Installation Instructions
        </button>
        {toggleInstructions && <pre>{installationInstructions || 'No instructions available.'}</pre>}
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
