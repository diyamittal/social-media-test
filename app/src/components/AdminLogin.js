import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/admin/login', { username, password });
      localStorage.setItem('token', response.data.token);
      navigate('/admin-dashboard'); // Redirect to admin dashboard after login
    } catch (error) {
      setError('Invalid username or password');
    }
  };

  return (
    <div>
      <h1>Admin Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className='error-message'>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
