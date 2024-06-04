import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { useAuth } from './AuthContext';

const LoggingIn = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(''); // State to handle success message
  const apiUrl = import.meta.env.VITE_API_BASE_URL;


  const handleFormSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    setError(''); // Reset error state on new submission
    setSuccess(''); // Reset success message on new submission

    try {
      const response = await fetch(`{apiUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorMessage = await response.text(); // Extract error message from response body
        console.log(`Server error: ${response.status} - ${errorMessage}`);
        throw new Error('Failed to login');
      }

      // Extract the token from the response
      const data = await response.json();
      const accessToken = data.accessToken; // Ensure this matches your backend's response format
      const refreshToken = data.refreshToken;

      // Store the token and update the context
      login(accessToken, refreshToken);

      // Set success message
      setSuccess('Login successful!');

      // Redirect to homepage after successful login
      navigate('/');

    } catch (error) {
      console.error('Error logging in:', error);
      setError('Login failed');
    }
  };

  const handleInputChange = (event) => {
    // Update form data as user types
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        {error && <p className="text-danger">{error}</p>}
        {success && <p className="text-success">{success}</p>}
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
}

export default LoggingIn;
