import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { createProfile } from '../services/api'; 

const CreateProfile = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState(''); 
  const [error, setError] = useState(''); 
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem('userId');
      await createProfile(userId, name, description); 
      navigate('/profiles');
    } catch (error) {
      console.error('Error creating profile:', error);
      setError(error.message); 
    }
  };

  const handleBackToProfiles = () => {
    navigate('/profiles'); 
  };

  return (
    <div>
      <h1>Create New Profile</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>} 
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div>
          <label>Description:</label> 
          <textarea value={description} onChange={e => setDescription(e.target.value)} />
        </div>
        <button type="submit">Create Profile</button>
        <button type="button" onClick={handleBackToProfiles}>Back to Profiles</button>
      </form>
    </div>
  );
};

export default CreateProfile;
