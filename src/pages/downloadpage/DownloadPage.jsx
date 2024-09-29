import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './DownloadPage.css';

const DownloadPage = () => {
  const [phones, setPhones] = useState([]);
  const [filteredPhones, setFilteredPhones] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('All');

  useEffect(() => {
    const fetchPhones = async () => {
      try {
        const response = await fetch('/hyperOS/phones.json');
        const data = await response.json();
        console.log('Fetched phones:', data); // Debug: Check if data is fetched
        setPhones(data.phones);
        setFilteredPhones(data.phones);
      } catch (error) {
        console.error('Error fetching phone data:', error);
      }
    };

    fetchPhones();
  }, []);

  const handleFilter = (brand) => {
    setSelectedBrand(brand);
    if (brand === 'All') {
      setFilteredPhones(phones);
    } else {
      setFilteredPhones(phones.filter(phone => phone.brand === brand));
    }
  };

  return (
    <div className="main">
      <div className="download-page">
        <h1>Download HyperOS Builds</h1>
        <div className="brand-filter">
          {['All', 'Xiaomi', 'Poco', 'Redmi'].map((brand) => (
            <button
              key={brand}
              onClick={() => handleFilter(brand)}
              className={selectedBrand === brand ? 'active' : ''}
            >
              {brand}
            </button>
          ))}
        </div>
        <div className="phone-grid">
          {filteredPhones.map((phone) => (
            <div key={phone.id} className="phone-card">
              <img
                src={phone.image}  // Directly using the image URL from JSON
                alt={phone.name}
                className="phone-image"
              />
              <h2 className="phone-name">{phone.name}</h2>
              <p className="phone-codename">Codename: {phone.codename}</p>
              <p className="phone-maintainer">Maintainer: {phone.maintainer}</p>
              <Link to={`/builds/${phone.id}`} className="get-build-button">
                <i className="fas fa-download"></i> Get Build
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DownloadPage;
