import React, { createContext, useState, useEffect } from "react";
import { Appearance } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light"); // Default theme

  useEffect(() => {
    loadTheme(); // Load theme from storage on app start
  }, []);

  const loadTheme = async () => {
    const savedTheme = await AsyncStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      // Detect system preference
      const systemTheme = Appearance.getColorScheme();
      setTheme( "light");
    }
  };

  const toggleTheme = async () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    await AsyncStorage.setItem("theme", newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
