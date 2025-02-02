import { v4 as uuidv4 } from "uuid";
import { USER_STORAGE_KEY } from "../utils/constants";

export const getUserFromLocalStorage = (): Record<string, any> => {
  const userData = localStorage.getItem(USER_STORAGE_KEY);
  if (userData) {
    return JSON.parse(userData);
  }

  const newUser = { id: uuidv4() };
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUser));
  return newUser;
};
