import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css';
import games from '../constants/games.json'

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
        <h2 className="sidebar-logo">Book a Team</h2>
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
          {games.map((game) => (
            <div key={game.id} className="card game-card" onClick={() => navigate(`/games/${game.name.toLocaleLowerCase()}`)}>
              <h3>{game.name}</h3>
              <p>{game.genre}</p>
              <img src={game.url} alt={game.name} />
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
