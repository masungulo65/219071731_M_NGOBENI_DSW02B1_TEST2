// 1. Imports
import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// 2. Create Context
const AppContext = createContext();

// 3. Custom Hook
export const useApp = () => useContext(AppContext);

// 4. Provider Component
export const AppProvider = ({ children }) => {

  // 4.1 Saved Services State
  const [savedServices, setSavedServices] = useState([]);

  // 4.2 Theme Preference
  const [theme, setTheme] = useState("Light");

  // 4.3 Load Data from AsyncStorage
  useEffect(() => {
    loadData();
  }, []);

  // 4.4 Load Function
  const loadData = async () => {
    try {
      const servicesData = await AsyncStorage.getItem("UJ_SAVED_SERVICES");
      const themeData = await AsyncStorage.getItem("UJ_THEME");

      if (servicesData) {
        setSavedServices(JSON.parse(servicesData));
      }

      if (themeData) {
        setTheme(themeData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // 4.5 Save Services
  useEffect(() => {
    saveServices();
  }, [savedServices]);

  const saveServices = async () => {
    try {
      await AsyncStorage.setItem(
        "UJ_SAVED_SERVICES",
        JSON.stringify(savedServices)
      );
    } catch (error) {
      console.log(error);
    }
  };

  // 4.6 Save Theme
  useEffect(() => {
    saveTheme();
  }, [theme]);

  const saveTheme = async () => {
    try {
      await AsyncStorage.setItem("UJ_THEME", theme);
    } catch (error) {
      console.log(error);
    }
  };

  // 4.7 Add Service
  const addSavedService = (service) => {
    const exists = savedServices.find(
      (item) => item.id === service.id
    );

    if (!exists) {
      setSavedServices([...savedServices, service]);
    }
  };

  // 4.8 Remove Service
  const removeSavedService = (id) => {
    setSavedServices(
      savedServices.filter((service) => service.id !== id)
    );
  };

  // 4.9 Toggle Theme
  const toggleTheme = () => {
    setTheme(theme === "Light" ? "Dark" : "Light");
  };

  return (
    <AppContext.Provider
      value={{
        savedServices,
        addSavedService,
        removeSavedService,
        theme,
        toggleTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};