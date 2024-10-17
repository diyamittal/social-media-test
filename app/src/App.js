import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UserForm from './components/UserForm';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import './App.css'

const App = () => {
  return (
    <Router>
      <div className='container'>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/user-form">User Form</Link>
            </li>
            <li>
              <Link to="/admin">Admin Login</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user-form" element={<UserForm />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
};

const Home = () => (
  <div>
    <h1>Welcome to the Social Media Task System</h1>
    <p>
      Please use the navigation to submit your information as a user or log in as an admin.
    </p>
  </div>
);

export default App;
