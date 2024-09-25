import { create } from "zustand";

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

// Define User type
export interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
}

// Define Zustand Store type
interface UserStore {
  user: User | null;
  isAuthenticated: boolean;
  error: boolean | null;
  isLoading: boolean;
  isCheckingAuth: boolean;
  setIsAuthenticated: () => void;
  logout: () => void;
  setUserData: (userData: User) => void;
}

// User store using Zustand
const useUserStore = create<UserStore>((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,
  setIsAuthenticated: () => set({ isAuthenticated: true }),
  logout: () => set({ isAuthenticated: false }),
  setUserData: (userData: User) => set({ user: userData }),
}));

export default useUserStore;
