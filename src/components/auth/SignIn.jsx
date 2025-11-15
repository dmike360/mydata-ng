// File Path: mydata-ng/src/components/auth/SignIn.jsx
// Location: src/components/auth folder

import React, { useState } from 'react';
import { Eye, EyeOff, User, Building2, ArrowRight } from 'lucide-react';
import { authAPI } from '../../services/api';

const SignIn = ({ 
  setCurrentView, 
  authMethod, 
  setAuthMethod, 
  userRole, 
  setUserRole, 
  formData, 
  handleInputChange 
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const credentials = {
        email: formData.email,
        password: formData.password,
        role: userRole
      };

      console.log('Submitting login:', { ...credentials, password: '***' });

      const response = await authAPI.login(credentials);
      
      if (response.success) {
        // Store userId for OTP verification
        localStorage.setItem('userId', response.data.userId);
        localStorage.setItem('tempEmail', formData.email);
        
        alert(`OTP sent to your ${response.data.method}. Check your email!`);
        setCurrentView('otp');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message);
      alert('Login failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordlessLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authAPI.passwordlessLogin(formData.email);
      
      if (response.success) {
        alert('Magic link sent to your email!');
      }
    } catch (error) {
      console.error('Passwordless login error:', error);
      setError(error.message);
      alert('Failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    alert(`${provider} login coming soon!`);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Welcome Back</h2>
          <p>Sign in to access your data dashboard</p>
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

          {/* Role Selection */}
          <div className="role-toggle">
            <button
              type="button"
              onClick={() => setUserRole('user')}
              className={userRole === 'user' ? 'active' : ''}
            >
              <User className="icon" />
              User
            </button>
            <button
              type="button"
              onClick={() => setUserRole('organization')}
              className={userRole === 'organization' ? 'active' : ''}
            >
              <Building2 className="icon" />
              Organization
            </button>
          </div>

          {/* Auth Method Tabs */}
          <div className="auth-tabs">
            <button
              type="button"
              onClick={() => setAuthMethod('email')}
              className={authMethod === 'email' ? 'active' : ''}
            >
              Email
            </button>
            <button
              type="button"
              onClick={() => setAuthMethod('phone')}
              className={authMethod === 'phone' ? 'active' : ''}
            >
              Phone
            </button>
            <button
              type="button"
              onClick={() => setAuthMethod('passwordless')}
              className={authMethod === 'passwordless' ? 'active' : ''}
            >
              Passwordless
            </button>
          </div>

          <form onSubmit={authMethod === 'passwordless' ? handlePasswordlessLogin : handleSignIn}>
            {authMethod === 'email' && (
              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="you@example.com"
                  required
                />
              </div>
            )}

            {authMethod === 'phone' && (
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+234 XXX XXX XXXX"
                  required
                />
              </div>
            )}

            {authMethod === 'passwordless' && (
              <div className="form-group">
                <label>Email or Phone</label>
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="you@example.com or +234 XXX XXX XXXX"
                  required
                />
              </div>
            )}

            {authMethod !== 'passwordless' && (
              <div className="form-group">
                <label>Password</label>
                <div className="password-wrapper">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="password-toggle"
                  >
                    {showPassword ? <EyeOff className="icon" /> : <Eye className="icon" />}
                  </button>
                </div>
              </div>
            )}

            {authMethod !== 'passwordless' && (
              <div className="text-right" style={{ marginBottom: '1.5rem' }}>
                <button
                  type="button"
                  onClick={() => setCurrentView('forgot')}
                  style={{ background: 'none', border: 'none', color: '#60a5fa', fontSize: '0.875rem', cursor: 'pointer' }}
                >
                  Forgot password?
                </button>
              </div>
            )}

            <button 
              type="submit" 
              className="btn-primary w-full flex-center gap-2"
              disabled={loading}
              style={{ opacity: loading ? 0.6 : 1 }}
            >
              {loading ? 'Please wait...' : (authMethod === 'passwordless' ? 'Send Login Link' : 'Sign In')}
              <ArrowRight className="icon" />
            </button>
          </form>

          {/* Social Login */}
          <div>
            <div className="divider">
              <span>Or continue with</span>
            </div>

            <div className="social-grid">
              <button onClick={() => handleSocialLogin('google')} className="btn-social">
                <svg className="icon" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </button>
              <button onClick={() => handleSocialLogin('microsoft')} className="btn-social">
                <svg className="icon" viewBox="0 0 23 23">
                  <path fill="#f3f3f3" d="M0 0h23v23H0z"/>
                  <path fill="#f35325" d="M1 1h10v10H1z"/>
                  <path fill="#81bc06" d="M12 1h10v10H12z"/>
                  <path fill="#05a6f0" d="M1 12h10v10H1z"/>
                  <path fill="#ffba08" d="M12 12h10v10H12z"/>
                </svg>
                Microsoft
              </button>
            </div>
          </div>

          <div className="text-center mt-6" style={{ fontSize: '0.875rem', color: '#9ca3af' }}>
            Don't have an account?{' '}
            <button
              type="button"
              onClick={() => setCurrentView('signup')}
              style={{ background: 'none', border: 'none', color: '#60a5fa', cursor: 'pointer' }}
            >
              Sign up
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setCurrentView('landing')}
          className="back-link"
        >
          ← Back to home
        </button>
      </div>
    </div>
  );
};

export default SignIn;