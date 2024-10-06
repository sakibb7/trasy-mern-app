import API from "./apiClient";

// Define User type
export interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export const register = async (data) => API.post("/auth/register", data);
export const login = async (data) => API.post("/auth/login", data);
export const logout = async () => API.get("/auth/logout");

export const getUser = async (): Promise<User> => API.get("/user");
