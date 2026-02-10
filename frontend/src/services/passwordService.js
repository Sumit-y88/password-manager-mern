import API from "./api";

export const getPasswords = () => API.get("/passwords");
export const addPassword = (data) => API.post("/passwords", data);
export const updatePassword = (id, data) =>
  API.put(`/passwords/${id}`, data);
export const deletePassword = (id) =>
  API.delete(`/passwords/${id}`);
