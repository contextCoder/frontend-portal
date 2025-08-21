import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Sign.css';
import { useGlobalSpinner } from '../globleSpinner/SpinnerContext';

const backendUrl = process.env.REACT_APP_BACKEND_AUTHENTICATION;

const SignIn = () => {
  const navigate = useNavigate();
  const { showSpinner, hideSpinner } = useGlobalSpinner();
  const [form, setForm] = useState({ username: '', password: '', email: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    if (e.target.name === 'confirmPassword' && e.target.value !== form.password) {
      setError("Passwords do not match");
    } else {
      setError("");
    }
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      showSpinner();
      console.log('form---', form)
      const response = await axios.post(`${backendUrl}/createUser`, form);
      console.log('Login success:', response.data);
      navigate('/login');
      // handle redirect or token save here
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response.data.error);
    } finally {
      hideSpinner();
    }
  };

  return (<div className="register-container">
      <div className={`register-card ${error ? "shake" : ""}`}>
        <h2 className="register-title">Create Account ✨</h2>
        <form className="register-form">
          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
            />
          </div>

          {/* Username */}
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
              placeholder="Enter username"
            />
          </div>

          {/* Password */}
          <div className="form-group password-group">
            <label htmlFor="password">Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
              />
              <span
                className="eye-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="form-group password-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                required
                placeholder="••••••••"
              />
              <span
                className="eye-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>
          </div>

          {/* Error Message */}
          {error && <p className="error-text">{error}</p>}

          {/* Button */}
          <button type="submit" className="register-btn" onClick={handleSubmit}>
            Sign Up
          </button>
        </form>

        <div className="register-footer">
          <p>Already have an account? <a href="/login">Sign In</a></p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
