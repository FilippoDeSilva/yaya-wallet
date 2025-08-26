"use client";
import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    // Always start in dark mode
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add("dark");
    setTheme("dark");
    // If user has a preference, allow switching after initial render
    const stored = localStorage.getItem("theme");
    if (stored && stored !== "dark") {
      setTheme(stored);
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(stored);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
