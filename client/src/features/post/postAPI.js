import api from "../../services/axios";

// Create a new post
export const createPostAPI = async (formData) => {
  const response = await api.post("/posts", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
