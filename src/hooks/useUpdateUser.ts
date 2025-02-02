import { useMutation } from "@tanstack/react-query";
import { API_ENDPOINT, USER_STORAGE_KEY } from "../utils/constants";
import { getUserFromLocalStorage } from "./useFetchUser";

const saveUserToLocalStorage = (userData: Record<string, any>): void => {
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
};

const fetchSaveUserData = async (userData: Record<string, any>) => {
  try {
    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (response.ok) {
      const savedData = await response.json();
      saveUserToLocalStorage(savedData);
      return savedData;
    }

    if (response.status === 404) {
      console.warn("API not found, saving only in localStorage.");
      saveUserToLocalStorage(userData);
      return userData;
    }

    throw new Error("Failed to save user data.");
  } catch (error) {
    console.error("Network error:", error);
    saveUserToLocalStorage(userData);
    return userData;
  }
};

export const useUpdateUser = () => {
  return useMutation({
    mutationFn: async (formData: Partial<Record<string, any>>) => {
      const currentUser = getUserFromLocalStorage();
      const updatedData = { ...currentUser, ...formData };

      return fetchSaveUserData(updatedData);
    },
  });
};
