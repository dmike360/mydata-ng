// File Path: mydata-ng/src/components/auth/ForgotPassword.jsx
// Location: src/components/auth folder

import React from 'react';
import { Mail } from 'lucide-react';

const ForgotPassword = ({ setCurrentView, formData, handleInputChange }) => {
  const handleForgotPassword = (e) => {
    e.preventDefault();
    setCurrentView('reset');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white flex items-center justify-center p-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Reset Password</h2>
          <p className="text-gray-400">Enter your email to receive a reset link</p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl border border-slate-700">
          <form onSubmit={handleForgotPassword}>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg focus:outline-none focus:border-blue-500 text-white"
                placeholder="you@example.com"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition flex items-center justify-center gap-2"
            >
              Send Reset Link
              <Mail className="w-5 h-5" />
            </button>
          </form>
        </div>

        <button
          onClick={() => setCurrentView('signin')}
          className="mt-6 text-gray-400 hover:text-white transition mx-auto block"
        >
          ← Back to sign in
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;