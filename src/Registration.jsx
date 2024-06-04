import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const Registration = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');  // State to handle success message
    const apiUrl = import.meta.env.VITE_API_BASE_URL;

    

    const handleFormSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        setError('');  // Reset error state on new submission
        setSuccess('');  // Reset success state on new submission

        try {
            // Simple form validation
            if (formData.password !== formData.confirmPassword) {
                setError('Passwords do not match');
                return;
            }

            const response = await fetch(`{apiUrl}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password
                }),
            });

            if (!response.ok) {
                const errorMessage = await response.text(); // Extract error message from response body
                console.log(`Server error: ${response.status} - ${errorMessage}`);
                throw new Error('Failed to register');
            }

            // If response is ok, set success message
            setSuccess('Registration successful!');
        } catch (error) {
            console.error('Error registering:', error);
            setError('Registration failed');
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
        <div className="container">
            <h2>Register</h2>
            <form onSubmit={handleFormSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password:</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password:</label>
                    <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {success && <p style={{ color: 'green' }}>{success}</p>}
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
        </div>
    );
};

export default Registration;
