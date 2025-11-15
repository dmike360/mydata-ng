// File Path: mydata-ng/src/components/auth/ResetConfirmation.jsx
// Location: src/components/auth folder

import React from 'react';
import { Check } from 'lucide-react';

const ResetConfirmation = ({ setCurrentView, formData }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white flex items-center justify-center p-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-400" />
          </div>
          <h2 className="text-3xl font-bold mb-2">Check Your Email</h2>
          <p className="text-gray-400">
            We've sent a password reset link to {formData.email}
          </p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700 text-center">
          <p className="text-gray-300 mb-4">
            Click the link in your email to reset your password. The link will expire in 1 hour.
          </p>
          <button
            onClick={() => setCurrentView('signin')}
            className="text-blue-400 hover:text-blue-300"
          >
            Return to sign in
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetConfirmation;