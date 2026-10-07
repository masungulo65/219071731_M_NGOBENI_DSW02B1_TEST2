//please note, this is Question 3

// 1. Imports
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./screens/HomeScreen";
import ServicesScreen from "./screens/ServicesScreen";
import SavedServicesScreen from "./screens/SavedServicesScreen";

import { AppProvider } from "./context/AppContext";

// 2. Create Stack
const Stack = createNativeStackNavigator();

// 3. Main App
export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <Stack.Navigator>

          <Stack.Screen
            name="Home"
            component={HomeScreen}
          />

          <Stack.Screen
            name="Services"
            component={ServicesScreen}
          />

          <Stack.Screen
            name="SavedServices"
            component={SavedServicesScreen}
          />

        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}