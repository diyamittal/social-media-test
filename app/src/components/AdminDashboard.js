import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/admin'); // Redirect to login if no token
          return;
        }

        const response = await axios.get('http://localhost:5000/api/users', {
          headers: { 'x-access-token': token },
        });

        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users', error);
        navigate('/admin'); // Redirect to login on error
      }
    };

    fetchUsers();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin');
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        users.map((user) => (
          <div key={user._id} className='user-card'>
            <h2>{user.name}</h2>
            <p>@{user.socialHandle}</p>
            <div style={{ display: 'flex', gap: '10px' }}>
              {user.images.map((image, index) => (
                <img
                  key={index}
                  src={`http://localhost:5000/uploads/${image}`}
                  alt={`uploaded by ${user.name}`}
                  style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                />
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminDashboard;
