import React, { useState, useEffect } from "react";

function Movies() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [editMovie, setEditMovie] = useState(null); // State to store the movie being edited

  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    fetch(`${apiUrl}/movies`)
      .then(response => {
        console.log("Response:", response); // Debug: Log the response
        if (!response.ok) {
          return response.text().then(errorText => {
            throw new Error(`Error ${response.status}: ${response.statusText} - ${errorText}`);
          });
        }
        return response.json();
      })
      .then(data => {
        console.log("Data:", data); // Debug: Log the received data
        setData(data); // Set the entire array of movie data
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(error.message); // Set error message to state
      });
  }, [apiUrl]);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/movies/${id}`, {
        method: 'DELETE',
      });
      console.log("Delete Response:", response); // Debug: Log the delete response

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Error ${response.status}: ${response.statusText} - ${errorText}`);
        throw new Error(`Failed to delete movie. Error ${response.status}: ${response.statusText} - ${errorText}`);
      }

      // If delete is successful, update the state to remove the deleted movie
      setData(prevData => prevData.filter(movie => movie.id !== id));
    } catch (error) {
      console.error('Error deleting movie:', error);
      setError(error.message); // Set error message to state
    }
  };

  const handleEdit = (movie) => {
    setEditMovie(movie); // Set the movie to be edited
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditMovie(prevMovie => ({ ...prevMovie, [name]: value }));
  };

  const handleUpdate = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${apiUrl}/movies/${editMovie.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editMovie),
      });
      console.log("Update Response:", response); // Debug: Log the update response

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Error ${response.status}: ${response.statusText} - ${errorText}`);
        throw new Error(`Failed to update movie. Error ${response.status}: ${response.statusText} - ${errorText}`);
      }

      // Update the state with the updated movie data
      setData(prevData => prevData.map(movie => (movie.id === editMovie.id ? editMovie : movie)));
      setEditMovie(null); // Clear the edit form
    } catch (error) {
      console.error('Error updating movie:', error);
      setError(error.message); // Set error message to state
    }
  };

  return (
    <div>
      {error && <p className="text-danger">Error: {error}</p>} {/* Display error message */}
      {data.length > 0 ? (
        <div>
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Director</th>
                <th>Length</th>
                <th>Actions</th> {/* Add a header for the actions column */}
              </tr>
            </thead>
            <tbody>
              {data.map((movie) => (
                <tr key={movie.id}>
                  <td>{movie.title}</td>
                  <td>{movie.director}</td>
                  <td>{movie.length} minutes</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleEdit(movie)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(movie.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {editMovie && (
            <form onSubmit={handleUpdate} className="mt-4">
              <h3>Edit Movie</h3>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  value={editMovie.title}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="director" className="form-label">Director</label>
                <input
                  type="text"
                  className="form-control"
                  id="director"
                  name="director"
                  value={editMovie.director}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="length" className="form-label">Length</label>
                <input
                  type="number"
                  className="form-control"
                  id="length"
                  name="length"
                  value={editMovie.length}
                  onChange={handleInputChange}
                />
              </div>
              <button type="submit" className="btn btn-success">Update</button>
              <button
                type="button"
                className="btn btn-secondary ml-2"
                onClick={() => setEditMovie(null)}
              >
                Cancel
              </button>
            </form>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Movies;
