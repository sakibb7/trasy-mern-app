import { SignInFormData } from "@/app/(auth)/sign-in/page";
import { RegisterFormData } from "@/app/(auth)/sign-up/page";
import axios from "axios";
import { toast } from "sonner";
import { create } from "zustand";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";
axios.defaults.withCredentials = true;

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
  loading: boolean;
  isCheckingAuth: boolean;
  error: unknown;
  signup: (input: RegisterFormData) => Promise<void>;
  login: (input: SignInFormData) => Promise<void>;
  checkAuthentication: () => Promise<void>;
  logout: () => Promise<void>;
}

// User store using Zustand
const useUserStore = create<UserStore>((set) => ({
  user: null,
  isAuthenticated: false,
  isCheckingAuth: true,
  loading: false,
  error: false,
  signup: async (input: RegisterFormData) => {
    try {
      set({ loading: true });
      const response = await axios.post(
        `${API_BASE_URL}/auth/register`,
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.success) {
        set({
          loading: false,
          user: response.data,
          isAuthenticated: true,
        });
      }
    } catch (error) {
      set({ loading: false, error });
    }
  },
  login: async (input: SignInFormData) => {
    try {
      set({ loading: true });
      const response = await axios.post(`${API_BASE_URL}/auth/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.statusText === "OK") {
        toast.success(response.data.message);
        set({
          loading: false,
          user: response.data,
          isAuthenticated: true,
        });
      }
    } catch (error) {
      set({ loading: false, error });
    }
  },
  checkAuthentication: async () => {
    try {
      set({ isCheckingAuth: true });
      const response = await axios.get(`${API_BASE_URL}/user`);
      if (response.statusText === "OK") {
        set({
          user: response.data,
          isAuthenticated: true,
          isCheckingAuth: false,
        });
      }
    } catch (error) {
      set({ isAuthenticated: false, isCheckingAuth: false, error });
    }
  },
  logout: async () => {
    try {
      set({ loading: true });
      const response = await axios.get(`${API_BASE_URL}/auth/logout`);

      if (response.data.statusText === "OK") {
        set({ loading: false, user: null, isAuthenticated: false });
      }
    } catch (error) {
      set({ loading: false, error });
    }
  },
}));

export default useUserStore;
