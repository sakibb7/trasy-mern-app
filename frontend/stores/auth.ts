import { create } from "zustand";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

// Define User type
export interface User {
  id: string;
  email: string;
}

// Define Zustand Store type
interface UserStore {
  user: User | null;
  isAuthenticated: boolean;
  error: boolean | null;
  isLoading: boolean;
  isCheckingAuth: boolean;
  checkAuth: () => void;
}

// User store using Zustand
const useUserStore = create<UserStore>((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,
  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null });
    try {
      const response = await fetch(`${API_BASE_URL}/user`, {
        credentials: "include",
      });

      const userData = await response.json();

      set({
        user: userData.user,
        isAuthenticated: true,
        isCheckingAuth: false,
      });
    } catch (error) {
      set({ error: null, isCheckingAuth: false, isAuthenticated: false });
      console.log(error);
    }
  },
}));

export default useUserStore;
