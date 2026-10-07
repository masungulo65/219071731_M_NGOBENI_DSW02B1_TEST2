import React from "react";
import {
    View,
    Text,
    FlatList,
    StyleSheet,
} from "react-native";

import ServiceCard from "../components/ServiceCard";

const services = [
    {
        name: "Library Support",
        code: "LIB",
    },
    {
        name: "ICT Support",
        code: "ICT",
    },
    {
        name: "Academic Consultation",
        code: "ACA",
    },
];

export default function HomeScreen({ navigation }) {
    const handleServicePress = (service) => {
        navigation.navigate("ServiceDetails", {
            serviceName: service.name,
            serviceCode: service.code,
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                UJ Student Services
            </Text>

            <Text style={styles.subtitle}>
                Select a service to view its details and submit a
                request.
            </Text>

            <FlatList
                data={services}
                keyExtractor={(item) => item.code}
                renderItem={({ item }) => (
                    <ServiceCard
                        service={item}
                        onPress={() =>
                            handleServicePress(item)
                        }
                    />
                )}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.list}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f7fb",
        padding: 20,
    },

    title: {
        fontSize: 28,
        fontWeight: "700",
        color: "#172033",
        marginBottom: 8,
    },

    subtitle: {
        fontSize: 15,
        color: "#687386",
        lineHeight: 22,
        marginBottom: 25,
    },

    list: {
        paddingBottom: 25,
    },
});