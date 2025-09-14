import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css';

const backendUrl = process.env.REACT_APP_BACKEND_AUTHENTICATION;

const Dashboard = () => {
  const navigate = useNavigate();
  const [authChecked, setAuthChecked] = useState(false);
  const [response, setResponse] = useState(null);

  useEffect(() => {
    axios.get(`${backendUrl}/protected`, {
      withCredentials: true,
    })
      .then(response => {
        setResponse(response);
        setAuthChecked(true);
      })
      .catch(error => {
        console.error('Error:', error);
        navigate('/login');
      });
  }, [navigate]);

  if (!authChecked) return null;

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="sidebar-logo">Team Up</h2>
        <ul className="sidebar-menu">
          <li className="active">Dashboard</li>
          <li onClick={() => navigate('/profile')}>Profile</li>
          <li onClick={() => navigate('/settings')}>Settings</li>
          <li onClick={() => navigate('/logout')} className="logout-btn">🚪 Logout</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="dashboard-header">
          <h2>Welcome, {response?.data?.user?.username} 👋</h2>
        </header>
        <section className="dashboard-body">
          <div className="card">
            <h3>Analytics</h3>
            <p>This is where your analytics or insights could be displayed.</p>
          </div>
          <div className="card">
            <h3>Recent Activity</h3>
            <p>No recent activity to show yet.</p>
          </div>
          <div className="card">
            <h3>Notifications</h3>
            <p>You have no new notifications.</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
