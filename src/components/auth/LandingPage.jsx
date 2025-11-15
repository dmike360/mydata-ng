// File Path: mydata-ng/src/components/auth/LandingPage.jsx
// Location: src/components/auth folder

import React from 'react';
import { Shield, Lock, Eye } from 'lucide-react';

const LandingPage = ({ setCurrentView }) => {
  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Header */}
      <header className="header">
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>MyData NG</div>
        <div className="flex gap-4">
          <button 
            onClick={() => setCurrentView('signin')}
            className="btn-secondary"
            style={{ padding: '0.5rem 1.5rem' }}
          >
            Sign In
          </button>
          <button 
            onClick={() => setCurrentView('signup')}
            className="btn-primary"
            style={{ padding: '0.5rem 1.5rem' }}
          >
            Get Started
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <div className="hero">
        <h1>Take Control of Your Data</h1>
        <p>
          MyData NG empowers you to manage your personal data permissions
          with complete transparency and control.
        </p>
        
        <div className="hero-buttons">
          <button 
            onClick={() => setCurrentView('signup')}
            className="btn-primary"
            style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}
          >
            Create Account
          </button>
          <button 
            onClick={() => setCurrentView('signin')}
            className="btn-secondary"
            style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}
          >
            Sign In
          </button>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-3" style={{ marginTop: '4rem' }}>
          <div className="feature-card">
            <Shield className="icon-lg" style={{ margin: '0 auto 1rem' }} />
            <h3>Secure Authentication</h3>
            <p>
              Two-factor authentication and role-based access control for maximum security.
            </p>
          </div>
          
          <div className="feature-card">
            <Lock className="icon-lg" style={{ margin: '0 auto 1rem' }} />
            <h3>Privacy First</h3>
            <p>
              Your data is encrypted and protected. You control who accesses your information.
            </p>
          </div>
          
          <div className="feature-card">
            <Eye className="icon-lg" style={{ margin: '0 auto 1rem' }} />
            <h3>Full Transparency</h3>
            <p>
              See exactly what data is being requested and who has access to it.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;