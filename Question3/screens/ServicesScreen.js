import React from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
} from "react-native";

import { useApp } from "../context/AppContext";

export default function ServicesScreen() {

  const {
    savedServices,
    addSavedService,
    removeSavedService,
  } = useApp();

  const services = [
    {
      id: 1,
      name: "Library Support",
    },
    {
      id: 2,
      name: "ICT Helpdesk",
    },
    {
      id: 3,
      name: "Academic Consultation",
    },
    {
      id: 4,
      name: "Career Services",
    },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={services}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {

          const isSaved = savedServices.some(
            (service) => service.id === item.id
          );

          return (
            <View style={styles.card}>

              <Text style={styles.name}>
                {item.name}
              </Text>

              {isSaved ? (
                <Button
                  title="Remove Service"
                  color="red"
                  onPress={() =>
                    removeSavedService(item.id)
                  }
                />
              ) : (
                <Button
                  title="Save Service"
                  onPress={() =>
                    addSavedService(item)
                  }
                />
              )}

            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  card: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
  },
  name: {
    fontSize: 18,
    marginBottom: 10,
  },
});