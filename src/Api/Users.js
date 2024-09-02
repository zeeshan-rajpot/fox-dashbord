import api from "./config";

export const getUsers = async () => {
    try {
      const response = await api.post("/dashboard/all-users?page=1&limit=10");
      return response.data;
    } catch (error) {
      throw error ? error.message : new Error("Something wrong happened");
    }
  };


export const getUsersWeekly = async () => {
    try {
      const response = await api.post("/dashboard/user-workout-goal?page=1&limit=1");
      return response.data;
    } catch (error) {
      throw error ? error.message : new Error("Something wrong happened");
    }
  };


