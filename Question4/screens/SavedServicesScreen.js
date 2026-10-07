import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
} from "react-native";
import { useApp } from "../context/AppContext";

export default function SavedServicesScreen() {
  const { savedServices } = useApp();

  if (savedServices.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.empty}>
          No saved services.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={savedServices}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.text}>
              {item.name}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  empty: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 50,
  },
  card: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
  },
});