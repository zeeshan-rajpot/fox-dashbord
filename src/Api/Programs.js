import api from "./config";

export const addProgram = async (userData) => {
  try {
    const response = await api.post("/programs/add", userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPrograms = async () => {
  try {
    const response = await api.get("/programs/allPrograms");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addWorkoutModal = async (userData) => {
  try {
    const response = await api.post("/programs/addWorkout", userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
