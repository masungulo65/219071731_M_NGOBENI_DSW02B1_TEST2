import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useApp } from "../context/AppContext";

export default function HomeScreen({ navigation }) {
  const { savedServices, theme, toggleTheme } = useApp();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>UJ Campus Services</Text>

      <Text style={styles.text}>
        Saved Services: {savedServices.length}
      </Text>

      <Text style={styles.text}>
        Current Theme: {theme}
      </Text>

      <Button
        title="Toggle Theme"
        onPress={toggleTheme}
      />

      <View style={styles.space} />

      <Button
        title="Go to Services"
        onPress={() => navigation.navigate("Services")}
      />

      <View style={styles.space} />

      <Button
        title="Go to Saved Services"
        onPress={() => navigation.navigate("SavedServices")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  space: {
    height: 10,
  },
});