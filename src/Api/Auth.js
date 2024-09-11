import api from './config';
// Signup
export const signup = async userData => {
  try {
    const response = await api.post('/user/register', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Login
export const login = async userData => {
  try {
    const response = await api.post('/user/login', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Forgot Password
export const forgotPassword = async email => {
  try {
    const response = await api.post('/user/forgot-password', { email });
    return response.data;
  } catch (error) {
    throw error ? error.message : new Error('Fogot Password failed');
  }
};

export const resetPassword = async (passwordData, token) => {
  try {
    // Log the password data being sent
    console.log('Sending password data:', passwordData);

    const response = await api.post(
      '/user/reset-password',
      passwordData, // Ensure passwordData contains both password and confirmPassword
      {
        headers: {
          Authorization: `Bearer ${token}`, // Ensure the token is passed correctly
          'Content-Type': 'application/json', // Ensure content-type is set
        },
      }
    );
    return response.data;
  } catch (error) {
    // Log the full error response for troubleshooting
    console.error('Error response:', error.response);

    // Handle error more gracefully and throw meaningful error messages
    throw error.response && error.response.data
      ? error.response.data.message || 'Reset Password failed'
      : new Error('Reset Password failed');
  }
};
