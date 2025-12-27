import api from "../../services/axios";

//Login API

export const loginAPI = async (credentials) => {
  const response = await api.post("/auth/login", credentials);
  return response.data;
};

//Signup API

export const signupAPI = async (userData) => {
  const response = await api.post("/auth/signup", userData);
  return response.data;
};

// Change password API
export const changePasswordAPI = async (passwordData) => {
  const response = await api.put("/auth/change-password", passwordData);
  return response.data;
};
