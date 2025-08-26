import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import './Login.css';
import { useGlobalSpinner } from '../globleSpinner/SpinnerContext';
import ToastContainer from '../custom-hooks/ToastContainer';
import useToast from '../custom-hooks/useToast';

const backendUrl = process.env.REACT_APP_BACKEND_AUTHENTICATION;

const Login = () => {
  const { showSpinner, hideSpinner } = useGlobalSpinner();
  const { toasts, addToast, removeToast } = useToast();
  const [formdata, setFormdata] = React.useState({
    email: '',
    password: ''
  })
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault()
    showSpinner();
    const requestObject = {
      method: 'POST',
      url: `${backendUrl}/login`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify({
        email: formdata.email,
        password: formdata.password
      }),
      withCredentials: true
    }

    console.log("requestObject", requestObject);
    try {
      const response = await axios(requestObject);
      console.log('response', response);
      if (response.status === 200) {
        const data = response.data;
        if (data.status === 'success') {
          addToast('success', 'Login successful!');
          navigate('/dashboard', {state: {user: data.user}});
        }
      }
    } catch (err) {
      console.log(err);
      addToast('error', err.response.data.message || 'Login failed. Please try again.');
    } finally {
      hideSpinner();
    }
  }

  const handleSignIn = async () => {
    navigate('/signin');
  };

  return (
        <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">React Demo</h2>
        <form className="login-form">
          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={formdata.email}
              onChange={(e) => setFormdata({ ...formdata, email: e.target.value })}
              required
              placeholder="you@example.com"
            />
          </div>

          {/* Password */}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={formdata.password}
              onChange={(e) => setFormdata({ ...formdata, password: e.target.value })}
              required
              placeholder="••••••••"
            />
          </div>

          {/* Button */}
          <button type="submit" className="login-btn" onClick={handleLogin}>
            Log In
          </button>
           <button type="submit" className="sign-in-btn" onClick={handleSignIn}>
            Sign up
          </button>
        </form>

        <div className="login-footer">
          <a href="/forgot-password">Forgot password?</a>
        </div>
      </div>
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}

export default Login
