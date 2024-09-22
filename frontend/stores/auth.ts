import { create } from "zustand";

// Define User type
export interface User {
  id: string;
  email: string;
}

// Define Zustand Store type
interface UserStore {
  user: User | null;
  isLoading: boolean;
  isError: boolean;
  setUser: (user: User | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (isError: boolean) => void;
}

// User store using Zustand
const useUserStore = create<UserStore>((set) => ({
  user: null,
  isLoading: false,
  isError: false,
  setUser: (user: User | null) => set(() => ({ user })),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (isError) => set({ isError }),
}));

export default useUserStore;
