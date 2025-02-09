import api from "./api";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Register User
export const register = async (name, email, password) => {
  const res = await api.post("/signup", { name, email, password });
  return res.data;
};

// Login User
export const login = async (email, password) => {
  const res = await api.post("/login", { email, password });
  await AsyncStorage.setItem("token", res.data.token);
  return res.data;
};

// Logout User
export const logout = async () => {
  await AsyncStorage.removeItem("token");
};
