import React, { useState } from "react";

const LoggingMovies = () => {
  const [formData, setFormData] = useState({
    MovieRequest: '', // Ensure this field matches the server's expected field name
    Id: '',
    title: '', // Add title field
    director: '',
    length: 0 // Ensure this field is properly formatted as a number
  });
  const [success, setSuccess] = useState(''); // State to handle success message
  const [error, setError] = useState(''); // State to handle error message
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const handleFormSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    setSuccess(''); // Reset success message on new submission
    setError(''); // Reset error message on new submission

    try {
      const response = await fetch(`${apiUrl}/movies`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorMessage = await response.text(); // Extract error message from response body
        console.log(`Server error: ${response.status} - ${errorMessage}`);
        throw new Error('Failed to submit form');
      }

      // If response is ok, set success message
      setSuccess('Form submitted successfully');
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle specific types of errors
      if (error instanceof TypeError) {
        setError('Network error: ' + error.message);
      } else if (error instanceof Error) {
        setError('Client-side error: ' + error.message);
      }
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
    <div className="container mt-4">
      {success && <p style={{ color: 'green' }}>{success}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleFormSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Title"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="director" className="form-label">Director</label>
          <input
            type="text"
            className="form-control"
            id="director"
            name="director"
            value={formData.director}
            onChange={handleInputChange}
            placeholder="Director"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="length" className="form-label">Length</label>
          <input
            type="text"
            className="form-control"
            id="length"
            name="length"
            value={formData.length}
            onChange={handleInputChange}
            placeholder="Length"
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default LoggingMovies;
