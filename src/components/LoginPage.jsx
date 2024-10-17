import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './LoginPage.css'; // Optional: CSS for styling the login page

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state

  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when the login process starts

    // Simulate the login process with environment variables
    setTimeout(() => {
      if (username === import.meta.env.VITE_ADMIN_USERNAME && password === import.meta.env.VITE_ADMIN_PASSWORD) {
        onLogin(); // Call the onLogin function passed as a prop
        navigate('/manage-phones'); // Redirect to ManagePhonesPage
      } else {
        setError('Invalid credentials'); // Set error message
      }
      setLoading(false); // Set loading to false once login process is complete
    }, 1000); // Simulate a delay (can be replaced by actual API call)
  };

  return (
    <div className="login-page">
      <h1>Login</h1>
      
      {/* Show loading message or spinner while logging in */}
      {loading ? (
        <p>Logging in, please wait...</p> // This can be replaced with a spinner or other loading UI
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="error">{error}</p>} {/* Display error message if login fails */}
          <button type="submit">Login</button>
        </form>
      )}
    </div>
  );
};

export default LoginPage;
