import { SignInFormData } from "@/app/(auth)/sign-in/page";
import { RegisterFormData } from "@/app/(auth)/sign-up/page";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export const signUp = async (formData: RegisterFormData) => {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};

export const signIn = async (formData: SignInFormData) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};

export const signOut = async () => {
  const response = await fetch(`${API_BASE_URL}/auth/logout`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error during sign out");
  }
};

export const getUser = async () => {
  const response = await fetch(`${API_BASE_URL}/user`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Token Invalid");
  }

  return response.json();
};

export const removeUser = async () => {
  const response = await fetch(`${API_BASE_URL}/user/remove`, {
    credentials: "include",
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Token Invalid");
  }

  return response.json();
};

export const addHotel = async (hotelFormData: FormData) => {
  const response = await fetch(`${API_BASE_URL}/api/hotel/add-hotel`, {
    method: "POST",
    credentials: "include",
    body: hotelFormData,
  });

  if (!response.ok) {
    throw new Error("Failed to add hotel");
  }

  return response.json();
};
