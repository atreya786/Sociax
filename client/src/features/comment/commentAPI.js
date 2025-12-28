export const addCommentAPI = async (postId, text) => {
  const res = await api.post(`/comments/${postId}`, { text });
  return res.data;
};

export const deleteCommentAPI = async (commentId) => {
  const res = await api.delete(`/comments/${commentId}`);
  return res.data;
};
