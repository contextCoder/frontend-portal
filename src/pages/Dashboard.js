import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const backendUrl = process.env.REACT_APP_BACKEND_AUTHENTICATION;

const Dashboard = () => {
  const navigate = useNavigate();
  const [authChecked, setAuthChecked] = useState(false); // gate rendering

  useEffect(() => {
    axios.get(`${backendUrl}/protected`, {
      withCredentials: true,
    })
      .then(response => {
        console.log(response.data);
        setAuthChecked(true);
      })
      .catch(error => {
        console.error('Error:', error);
        navigate('/login');
      });
  }, [navigate]);

  if (!authChecked) return null;
  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome to your dashboard!</p>
      <button onClick={() => navigate('/logout')}>Logout</button>
    </div>
  )
}

export default Dashboard
