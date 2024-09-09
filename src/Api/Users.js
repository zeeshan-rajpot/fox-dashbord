import api from "./config";

export const getUsers = async () => {
  try {
    const response = await api.get("/dashboard/all-users?page=1&limit=10");
    return response.data;
  } catch (error) {
    throw error ? error.message : new Error("Something wrong happened");
  }
};

export const getUsersWeekly = async () => {
  try {
    const response = await api.get(
      "/dashboard/user-workout-goal?page=1&limit=1"
    );
    return response.data;
  } catch (error) {
    throw error ? error.message : new Error("Something wrong happened");
  }
};

export const topWinUsers = async () => {
  try {
    const response = await api.get(
      "/dashboard/user-workout-goal?page=1&limit=7"
    );
    return response.data;
  } catch (error) {
    throw error ? error.message : new Error("Something wrong happened");
  }
};

export const recentUsers = async () => {
  try {
    const response = await api.get(
      "/dashboard/recent-acheivements?limit=5"
    );
    return response.data;
  } catch (error) {
    throw error ? error.message : new Error("Something wrong happened");
  }
};
