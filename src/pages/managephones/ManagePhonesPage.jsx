import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import the date picker CSS
import './ManagePhonesPage.css';

const ManagePhonesPage = () => {
  const [phones, setPhones] = useState([]);
  const [form, setForm] = useState({
    name: '',
    codename: '',
    brand: '',
    maintainer: '',
    image: '',
    recoveryDownload: '',
    romDownload: '',
    previousRomDownload: '',
    status: 'active',
    version: '',
    build_date: null, // Initialize as null for the date picker
    telegramLink: '',
    githubLink: '',
    sourceChangelogs: '',
    changelogs: '',
    installationInstructions: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showPhoneList, setShowPhoneList] = useState(false);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    const fetchPhones = async () => {
      try {
        const response = await fetch('http://localhost:3000/phones');
        if (!response.ok) {
          throw new Error(`Failed to fetch phones: ${response.statusText}`);
        }
        const data = await response.json();
        setPhones(data);
      } catch (error) {
        console.error('Error fetching phone data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPhones();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleDateChange = (date) => {
    setForm({ ...form, build_date: date }); // Update build_date with Date object
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const confirmAction = window.confirm(isEditing ? 'Are you sure you want to update this phone?' : 'Are you sure you want to add this phone?');
    if (!confirmAction) return; // Exit if the user cancels

    // Prepare the phone data as a JSON object
    const phoneData = {
      id: isEditing ? form.id : uuidv4(),
      name: form.name,
      codename: form.codename,
      brand: form.brand,
      maintainer: form.maintainer,
      image: form.image,
      recoveryDownload: form.recoveryDownload,
      romDownload: form.romDownload,
      previousRomDownload: form.previousRomDownload,
      status: form.status,
      version: form.version,
      build_date: form.build_date ? formatDateToYYYYMMDD(form.build_date) : '', // Convert to 'YYYY-MM-DD'
      telegramLink: form.telegramLink,
      githubLink: form.githubLink,
      sourceChangelogs: form.sourceChangelogs,
      changelogs: form.changelogs,
      installationInstructions: form.installationInstructions
    };

    console.log('Submitting phone data:', phoneData);

    const url = isEditing ? `http://localhost:3000/phones/${form.id}` : 'http://localhost:3000/phones';
    const method = isEditing ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(phoneData),
      });

      if (!response.ok) {
        throw new Error(`Failed to save phone: ${response.statusText}`);
      }

      const updatedPhone = await response.json();

      if (isEditing) {
        setPhones((phones) =>
          phones.map((phone) => (phone.id === updatedPhone.id ? updatedPhone : phone))
        );
        setIsEditing(false);
        setNotification('Phone updated successfully!');
      } else {
        setPhones((phones) => [...phones, updatedPhone]);
        setNotification('Phone added successfully!');
      }

      resetForm();
    } catch (error) {
      console.error('Error saving phone:', error);
      setNotification('Failed to save phone. Please try again.');
    }
  };

  const handleEdit = (phone) => {
    setForm({
      ...phone,
      build_date: new Date(phone.build_date) // Convert 'YYYY-MM-DD' to Date object
    });
    setIsEditing(true);
    setShowPhoneList(false);
    setNotification('');
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this phone?');
    if (!confirmDelete) return; // Exit if the user cancels

    try {
      const response = await fetch(`http://localhost:3000/phones/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete phone');
      }

      setPhones((phones) => phones.filter((phone) => phone.id !== id));
      setNotification('Phone deleted successfully!');
    } catch (error) {
      console.error('Error deleting phone:', error);
    }
  };

  const resetForm = () => {
    setForm({
      name: '',
      codename: '',
      brand: '',
      maintainer: '',
      image: '',
      recoveryDownload: '',
      romDownload: '',
      previousRomDownload: '',
      status: 'active',
      version: '',
      build_date: null, // Reset to null for the date picker
      telegramLink: '',
      githubLink: '',
      sourceChangelogs: '',
      changelogs: '',
      installationInstructions: ''
    });
  };

  const togglePhoneList = () => {
    setShowPhoneList(!showPhoneList);
    setNotification('');
  };

  const formatDateToYYYYMMDD = (date) => {
    if (!date) return ''; // Return empty string if date is undefined or null
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`; // Format date to 'YYYY-MM-DD'
  };

  return (
    <div className="manage-phones-page">
      <h1>Manage HyperOS Builds</h1>

      {/* Notification message */}
      {notification && <div className="notification">{notification}</div>}

      <button onClick={togglePhoneList}>
        {showPhoneList ? 'Hide Build List' : 'Show Build List'}
      </button>

      {loading ? (
        <p>Loading phones...</p>
      ) : (
        <>
          {!showPhoneList && (
            <form onSubmit={handleSubmit} className="phone-form">
              {Object.keys(form).map((key) => (
                key !== 'id' && key !== 'sourceChangelogs' && key !== 'changelogs' && key !== 'installationInstructions' && (
                  key === 'build_date' ? (
                    <div key={key}>
                      <label>Build Date:</label>
                      <DatePicker
                        selected={form.build_date}
                        onChange={handleDateChange}
                        dateFormat="dd.MM.yyyy"
                        placeholderText="Select a date"
                        className="date-picker"
                        required
                      />
                    </div>
                  ) : (
                    <input
                      key={key}
                      type="text"
                      name={key}
                      placeholder={key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                      value={form[key]}
                      onChange={handleChange}
                      required={key !== 'previousRomDownload' && key !== 'telegramLink' && key !== 'githubLink'}
                    />
                  )
                )
              ))}

              {/* Text area for source changelogs */}
              <label>
                Source Changelogs:
                <textarea
                  name="sourceChangelogs"
                  placeholder="Write the source changelogs here..."
                  value={form.sourceChangelogs}
                  onChange={handleChange}
                  rows={4}
                />
              </label>

              {/* Text area for changelogs */}
              <label>
                Changelogs:
                <textarea
                  name="changelogs"
                  placeholder="Write the changelogs here..."
                  value={form.changelogs}
                  onChange={handleChange}
                  rows={4}
                />
              </label>

              {/* Text area for installation instructions */}
              <label>
                Installation Instructions:
                <textarea
                  name="installationInstructions"
                  placeholder="Write the installation instructions here..."
                  value={form.installationInstructions}
                  onChange={handleChange}
                  rows={4}
                />
              </label>

              <button type="submit">{isEditing ? 'Update Phone' : 'Add Your Build'}</button>
            </form>
          )}

{showPhoneList && (
  <div className="phone-list">
    <h2>Build List</h2>
    {phones.length === 0 ? (
      <p>No phones available.</p>
    ) : (
      <ul style={{ listStyleType: 'none', padding: 0 }}> {/* Remove bullet points */}
        {phones.map((phone) => (
          <li key={phone.id} className="phone-item">
            <div className="phone-details">
              <img src={phone.image} alt={`${phone.name} image`} className="phone-image" />
              <div className="phone-info">
                <span className="phone-name">{phone.name}</span>
                <span className="phone-brand">{phone.brand}</span>
                <span className="phone-maintainer"><strong>{phone.maintainer}</strong></span> {/* Bold maintainer */}
                <span className="phone-status">{phone.status}</span>
                <span className="phone-build-date"><strong>{phone.build_date}</strong></span> {/* Bold build date */}
              </div>
            </div>
            <div className="phone-actions">
              <button onClick={() => handleEdit(phone)}>Edit</button>
              <button onClick={() => handleDelete(phone.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    )}
  </div>
)}
        </>
      )}
    </div>
  );
};

export default ManagePhonesPage;
