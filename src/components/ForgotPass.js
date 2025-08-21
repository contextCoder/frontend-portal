import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ForgotPass.css';
import ToastContainer from '../custom-hooks/ToastContainer';
import useToast from '../custom-hooks/useToast';
import { useGlobalSpinner } from '../globleSpinner/SpinnerContext';

const backendUrl = process.env.REACT_APP_BACKEND_AUTHENTICATION;

const ForgotPass = () => {
  const { showSpinner, hideSpinner } = useGlobalSpinner();
  const { toasts, addToast, removeToast } = useToast();

  const [email, setEmail] = useState('');
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  const [isDisabled, setIsDisabled] = useState(false);
  const [timer, setTimer] = useState(0);

  // Countdown effect
  useEffect(() => {
    let interval;
    if (isDisabled && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsDisabled(false);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isDisabled, timer]);

  const handleForgotPassword = async (event) => {
    event.preventDefault();
    showSpinner();
    try {
      const response = await axios.post(
        `${backendUrl}/forgot-password`,
        { email },
        { headers: { 'Content-Type': 'application/json' } }
      );
      console.log("=====response.data=====", response.data);
      if (response.data.status === 'success') {
        setShowOTP(true);
        setIsDisabled(true);
        setTimer(300);
        addToast('success', 'OTP sent to your email.');
      } else {
        addToast('error', response.data.msg || 'Something went wrong.');
      }
    } catch (err) {
      addToast('error', err.response?.data?.msg || 'Error sending OTP.');
    } finally {
      hideSpinner();
    }
  };

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  const confirmOtp = async () => {
    try {
      const response = await axios.post(
        `${backendUrl}/verify-otp`,
        { email, otp },
        { headers: { 'Content-Type': 'application/json' } }
      );
      console.log("=====response.data=====", response.data);

      if (response.data.status === 'success') {
        addToast('success', 'OTP confirmed successfully.');
        // Redirect or perform further actions
      } else {
        addToast('error', response.data.msg || 'Something went wrong.');
      }
    } catch (err) {
      addToast('error', err.response?.data?.msg || 'Error confirming OTP.');
    }
  };
  return (
    <div className="forgotpass-container">
      <div className="forgotpass-card">
        <h2 className="forgotpass-title">Forgot Password</h2>
        <form className="forgotpass-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
            />
          </div>

          <button type="submit" className={`btn ${isDisabled ? "forgotpass-btn-disabled" : "forgotpass-btn"}`} onClick={handleForgotPassword} disabled={isDisabled}>
            {isDisabled ? `Resend OTP in ${formatTime(timer)}` : "Send OTP"}
          </button>

          {showOTP &&
            <>
              <div className="form-group">
                <label htmlFor="otp"></label>
                <input
                  type="text"
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  placeholder="Enter OTP"
                />
              </div>
            </>
          }
          <div className="btn-twin">
            {showOTP && (
              <>
                <button type="submit" className="forgotpass-btn" onClick={confirmOtp}>
                  Confirm OTP
                </button>
              </>
            )}
            <button type="button" className="back-login-btn" onClick={handleBackToLogin}>
              Back to Login
            </button>
          </div>
        </form>
      </div>
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
};

export default ForgotPass;