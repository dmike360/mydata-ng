// File Path: mydata-ng/src/components/auth/OTPVerification.jsx
// Location: src/components/auth folder

import React, { useState, useEffect } from 'react';
import { Shield, Check } from 'lucide-react';
import { authAPI } from '../../services/api';

const OTPVerification = ({ setCurrentView, formData, handleInputChange }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [userId, setUserId] = useState('');
  const [contactInfo, setContactInfo] = useState('');

  useEffect(() => {
    // Get userId from localStorage
    const storedUserId = localStorage.getItem('userId');
    const storedEmail = localStorage.getItem('tempEmail') || formData.email;
    
    console.log('OTP Screen - UserId:', storedUserId);
    console.log('OTP Screen - Email:', storedEmail);
    
    if (!storedUserId) {
      setError('Session expired. Please try logging in again.');
    } else {
      setUserId(storedUserId);
      setContactInfo(storedEmail);
    }
  }, [formData.email]);

  const handleOTPVerify = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!userId) {
        throw new Error('User ID not found. Please try logging in again.');
      }

      if (!formData.otp || formData.otp.length !== 6) {
        throw new Error('Please enter a valid 6-digit OTP');
      }

      const otpData = {
        userId: userId,
        otp: formData.otp,
        purpose: 'login'
      };

      console.log('Submitting OTP verification:', otpData);

      const response = await authAPI.verifyOTP(otpData);
      
      if (response.success) {
        // Store tokens
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        // Clear temporary data
        localStorage.removeItem('userId');
        localStorage.removeItem('tempEmail');
        
        alert('Login successful!');
        setCurrentView('dashboard');
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      setError(error.message);
      alert('OTP verification failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    try {
      setError('');
      alert('Resending OTP... (Feature coming soon)');
      // TODO: Implement resend OTP API call
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="icon-circle blue">
            <Shield className="icon-lg" />
          </div>
          <h2>Verify Your Identity</h2>
          <p>
            We've sent a 6-digit code to {contactInfo}
          </p>
          {!userId && (
            <p style={{ color: '#ef4444', marginTop: '10px' }}>
              ⚠️ Session expired. Please go back and login again.
            </p>
          )}
        </div>

        <div className="card">
          {error && (
            <div style={{ 
              padding: '10px', 
              backgroundColor: '#fee', 
              color: '#c00', 
              borderRadius: '5px',
              marginBottom: '15px'
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleOTPVerify}>
            <div className="form-group">
              <label style={{ textAlign: 'center' }}>Enter OTP Code</label>
              <input
                type="text"
                name="otp"
                value={formData.otp}
                onChange={handleInputChange}
                className="otp-input"
                placeholder="000000"
                maxLength="6"
                required
                autoFocus
                style={{
                  textAlign: 'center',
                  fontSize: '1.5rem',
                  letterSpacing: '0.5rem',
                  fontWeight: 'bold'
                }}
              />
              <small style={{ 
                display: 'block', 
                textAlign: 'center', 
                color: '#9ca3af', 
                marginTop: '8px' 
              }}>
                Enter the 6-digit code sent to your email
              </small>
            </div>

            <button
              type="submit"
              className="btn-primary w-full flex-center gap-2"
              disabled={loading || !userId}
              style={{ opacity: (loading || !userId) ? 0.6 : 1 }}
            >
              {loading ? 'Verifying...' : 'Verify & Continue'}
              <Check className="icon" />
            </button>
          </form>

          <div className="text-center mt-6">
            <p style={{ fontSize: '0.875rem', color: '#9ca3af', marginBottom: '8px' }}>
              Didn't receive the code?
            </p>
            <button 
              type="button"
              onClick={handleResendOTP}
              style={{ 
                background: 'none', 
                border: 'none', 
                color: '#60a5fa', 
                fontSize: '0.875rem',
                cursor: 'pointer'
              }}
            >
              Resend Code
            </button>
          </div>

          {/* Debugging info (remove in production) */}
          {process.env.NODE_ENV === 'development' && (
            <div style={{ 
              marginTop: '20px', 
              padding: '10px', 
              backgroundColor: '#f0f0f0', 
              borderRadius: '5px',
              fontSize: '0.75rem'
            }}>
              <strong>Debug Info:</strong><br/>
              UserId: {userId || 'Not found'}<br/>
              Contact: {contactInfo || 'Not found'}<br/>
              <em>Check your email or backend logs for OTP</em>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={() => setCurrentView('signin')}
          className="back-link"
        >
          ← Back to sign in
        </button>
      </div>
    </div>
  );
};

export default OTPVerification;