import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE_URL = "https://shopping-api-app.vercel.app/api"; // Change this if using an emulator

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Attach token to requests
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
