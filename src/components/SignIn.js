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
  const [errors, setErrors] = useState({});

  const usernameRegex = /^(?=.*[a-zA-Z])[a-zA-Z0-9]+$/;
  const validate = (name, value) => {
    let newErrors = { ...errors };

    if (name === "username") {
      if (!value.trim()) {
        newErrors.username = "Username is required.";
      } else if (value === form.email) {
        console.log('---', value)
        newErrors.username = "Username and email cannot be the same.";
      } else if (!usernameRegex.test(value)) {
        newErrors.username =
          "Username must contain uppercase, lowercase and a number.";
      } else {
        delete newErrors.username;
      }
    }

    if (name === "email") {
      if (!value.trim()) {
        newErrors.email = "Email is required.";
      } else if (value === form.username) {
        newErrors.email = "Email and username cannot be the same.";
      } else {
        delete newErrors.email;
      }
    }

    setErrors(newErrors);
  };

  const handleChange = (e) => {
    if (e.target.name === 'confirmPassword' && e.target.value !== form.password) {
      setErrors("Passwords do not match");
    } else {
      setErrors("");
    }
    setForm({ ...form, [e.target.name]: e.target.value });
    validate(e.target.name, e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors('');

    try {
      showSpinner();
      console.log('form---', form)
      const response = await axios.post(`${backendUrl}/createUser`, form);
      console.log('Login success:', response.data);
      navigate("/activationNotification", { state: { email: form.email } });
      // handle redirect or token save here
    } catch (err) {
      console.error('Login error:', err);
      setErrors(err.response.data.error);
    } finally {
      hideSpinner();
    }
  };

  return (<div className="register-container">
      <div className={`register-card ${errors && Object.keys(errors).length > 0 ? "shake" : ""}`}>
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
            {errors?.email && <p className="error-text">{errors?.email}</p>}
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
             {errors.username && (
            <p className="error-text">{errors.username}</p>
          )}
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
          {errors && Object.keys(errors).length > 0 && (
            <div className="errors-text">
              {Object.keys(errors).map((key) => (
                <p key={key}>{errors[key]}</p>
              ))}
            </div>
          )}

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
