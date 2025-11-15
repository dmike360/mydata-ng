import React, { useState } from 'react';
import LandingPage from './components/auth/LandingPage';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import OTPVerification from './components/auth/OTPVerification';
import ForgotPassword from './components/auth/ForgotPassword';
import ResetConfirmation from './components/auth/ResetConfirmation';
import Dashboard from './components/dashboard/Dashboard';

function App() {
  const [currentView, setCurrentView] = useState('landing');
  const [authMethod, setAuthMethod] = useState('email');
  const [userRole, setUserRole] = useState('user');
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    organizationName: '',
    otp: ''
  });

  const lastLogin = {
    date: 'October 26, 2025',
    time: '14:32 WAT',
    device: 'Chrome on Windows',
    location: 'Lagos, Nigeria'
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const props = {
    currentView,
    setCurrentView,
    authMethod,
    setAuthMethod,
    userRole,
    setUserRole,
    formData,
    handleInputChange,
    lastLogin
  };

  switch (currentView) {
    case 'landing':
      return <LandingPage {...props} />;
    case 'signin':
      return <SignIn {...props} />;
    case 'signup':
      return <SignUp {...props} />;
    case 'otp':
      return <OTPVerification {...props} />;
    case 'forgot':
      return <ForgotPassword {...props} />;
    case 'reset':
      return <ResetConfirmation {...props} />;
    case 'dashboard':
      return <Dashboard {...props} />;
    default:
      return <LandingPage {...props} />;
  }
}

export default App;