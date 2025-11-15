// File Path: mydata-ng/src/services/api.js
// Location: src/services folder
 
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/v1';

// Helper function to make API calls
const apiCall = async (endpoint, options = {}) => {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    
    console.log('🔵 API Request:', {
      url,
      method: options.method || 'GET',
      body: options.body ? JSON.parse(options.body) : null
    });
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    };

    // Add token if exists
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(url, config);
    const data = await response.json();

    console.log('🔴 API Response:', {
      status: response.status,
      ok: response.ok,
      data
    });

    if (!response.ok) {
      throw new Error(data.message || data.errors?.[0]?.message || 'Something went wrong');
    }

    return data;
  } catch (error) {
    console.error('❌ API Error:', error);
    throw error;
  }
};

// Auth API
export const authAPI = {
  // Register user
  register: async (userData) => {
    console.log('📝 Registering user:', userData);
    return await apiCall('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  },

  // Login
  login: async (credentials) => {
    console.log('🔐 Logging in:', { ...credentials, password: '***' });
    return await apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
  },

  // Verify OTP
  verifyOTP: async (otpData) => {
    console.log('🔢 Verifying OTP:', { ...otpData, otp: '***' });
    return await apiCall('/auth/verify-otp', {
      method: 'POST',
      body: JSON.stringify(otpData)
    });
  },

  // Passwordless login
  passwordlessLogin: async (email) => {
    return await apiCall('/auth/passwordless', {
      method: 'POST',
      body: JSON.stringify({ email })
    });
  },

  // Forgot password
  forgotPassword: async (email) => {
    return await apiCall('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email })
    });
  },

  // Reset password
  resetPassword: async (resetData) => {
    return await apiCall('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify(resetData)
    });
  },

  // Logout
  logout: async (refreshToken) => {
    return await apiCall('/auth/logout', {
      method: 'POST',
      body: JSON.stringify({ refreshToken })
    });
  }
};

// User API
export const userAPI = {
  // Get profile
  getProfile: async () => {
    return await apiCall('/users/me');
  },

  // Update profile
  updateProfile: async (userData) => {
    return await apiCall('/users/me', {
      method: 'PUT',
      body: JSON.stringify(userData)
    });
  },

  // Get permissions
  getPermissions: async () => {
    return await apiCall('/users/permissions');
  },

  // Get access logs
  getAccessLogs: async () => {
    return await apiCall('/users/access-logs');
  }
};

// Dashboard API
export const dashboardAPI = {
  // Get dashboard overview
  getOverview: async () => {
    return await apiCall('/dashboard');
  },

  // Get permission stats
  getPermissionStats: async () => {
    return await apiCall('/dashboard/permissions/stats');
  },

  // Get security insights
  getSecurityInsights: async () => {
    return await apiCall('/dashboard/security');
  },

  // Get alerts
  getAlerts: async () => {
    return await apiCall('/dashboard/alerts');
  }
};

export default { authAPI, userAPI, dashboardAPI };