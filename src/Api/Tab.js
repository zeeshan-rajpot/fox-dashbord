import api from "./config";

export const addTab = async (data) => {
  try {
    const response = await api.post("/tab/create-tab", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getTabs = async () => {
  try {
    const response = await api.get("/tab/all-tabs");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteTabs = async (id) => {
  try {
    const response = await api.delete(`/tab/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const changeTabPassword = async (id, newPassword, confirmPassword)  => {
    try {
      const response = await api.patch(`/tab/change-password/${id}`, {
        newPassword: newPassword, 
        confirmPassword: confirmPassword,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
