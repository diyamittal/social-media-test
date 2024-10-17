import React, { useState } from 'react';
import axios from 'axios';

const UserForm = () => {
  const [name, setName] = useState('');
  const [socialHandle, setSocialHandle] = useState('');
  const [images, setImages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('socialHandle', socialHandle);
    images.forEach((image) => formData.append('images', image));

    try {
      await axios.post('http://localhost:5000/api/users', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Submission successful!');
    } catch (error) {
      console.error('Error submitting data', error);
      alert('Submission failed');
    }
  };

  return (
    <div>
      <h1>User Submission Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Social Handle</label>
          <input
            type="text"
            value={socialHandle}
            onChange={(e) => setSocialHandle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Upload Images</label>
          <input
            type="file"
            multiple
            onChange={(e) => setImages(Array.from(e.target.files))}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UserForm;
