import api from "./config";
// Signup
export const signup = async (userData) => {
  try {
    const response = await api.post("/user/register", userData);
    return response.data;
  } catch (error) {
    throw error ? error.message : new Error("Signup failed");
  }
};

// Login
export const login = async (userData) => {
  try {
    const response = await api.post("/user/login", userData);
    return response.data;
  } catch (error) {
    throw error ? error.message : new Error("Login failed");
  }
};

// Forgot Password
export const forgotPassword = async (email) => {
  try {
    const response = await api.post(
      "/user/forgot-password",
      { email }
    );
    return response.data;
  } catch (error) {
    throw error ? error.message : new Error("Fogot Password failed");
  }
};

// Reset Password
export const resetPassword = async (passwordData) => {
  try {
    const response = await api.post(
      "/user/reset-password",
      passwordData
    );
    return response.data;
  } catch (error) {
    throw error ? error.message : new Error("Reset Password failed");
  }
};
