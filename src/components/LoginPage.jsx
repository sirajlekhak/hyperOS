import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './LoginPage.css'; // Optional: CSS for styling the login page

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Log values for debugging
    console.log('Username:', username);
    console.log('Password:', password);
    console.log('Expected:', import.meta.env.VITE_ADMIN_USERNAME, import.meta.env.VITE_ADMIN_PASSWORD); // Use import.meta.env

    // Use environment variables for authentication
    if (username === import.meta.env.VITE_ADMIN_USERNAME && password === import.meta.env.VITE_ADMIN_PASSWORD) {
      onLogin(); // Call the onLogin function passed as a prop
      navigate('/manage-phones'); // Redirect to ManagePhonesPage
    } else {
      setError('Invalid credentials'); // Set error message
    }
  };
  
  return (
    <div className="login-page">
      <h1>Login</h1>
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
        {error && <p className="error">{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
