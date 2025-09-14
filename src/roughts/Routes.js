import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../components/Login';
import Dashboard from '../pages/Dashboard';
import Logout from '../components/Logout';
import SignIn from '../components/SignIn';
import ForgotPass from '../components/ForgotPass';
import ActivationNotice from '../components/shared/Activation_Notice/ActivationNotice';
import Profile from '../components/pages/profile/Profile'
import CommanRoute from '../components/shared/noRoute/CommanRoute';
const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/forgot-password" element={<ForgotPass />} />
        <Route path="/activationNotification" element={<ActivationNotice />} />
        <Route path="*" element={<CommanRoute />} />
      </Routes>
    </Router>
  )
}
export default AppRoutes;