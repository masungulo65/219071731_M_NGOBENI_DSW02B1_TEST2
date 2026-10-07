import React, { useState } from "react";
import {
    View,
    Text,
    Pressable,
    StyleSheet,
} from "react-native";

export default function ServiceDetailsScreen({ route, navigation }) {
    const { serviceName, serviceCode } = route.params;

    const [priority, setPriority] = useState("Normal");

    const handleRequestService = () => {
        navigation.navigate("Confirmation", {
            serviceName,
            serviceCode,
            priority,
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.heading}>
                    Service Details
                </Text>

                <View style={styles.detailRow}>
                    <Text style={styles.label}>
                        Service
                    </Text>

                    <Text style={styles.value}>
                        {serviceName}
                    </Text>
                </View>

                <View style={styles.detailRow}>
                    <Text style={styles.label}>
                        Service Code
                    </Text>

                    <Text style={styles.value}>
                        {serviceCode}
                    </Text>
                </View>
            </View>

            <View style={styles.priorityCard}>
                <Text style={styles.priorityTitle}>
                    Select Priority
                </Text>

                <View style={styles.priorityContainer}>
                    <Pressable
                        onPress={() => setPriority("Normal")}
                        style={[
                            styles.priorityButton,
                            priority === "Normal" &&
                                styles.selectedPriority,
                        ]}
                    >
                        <Text
                            style={[
                                styles.priorityText,
                                priority === "Normal" &&
                                    styles.selectedPriorityText,
                            ]}
                        >
                            Normal
                        </Text>
                    </Pressable>

                    <Pressable
                        onPress={() => setPriority("Urgent")}
                        style={[
                            styles.priorityButton,
                            priority === "Urgent" &&
                                styles.selectedPriority,
                        ]}
                    >
                        <Text
                            style={[
                                styles.priorityText,
                                priority === "Urgent" &&
                                    styles.selectedPriorityText,
                            ]}
                        >
                            Urgent
                        </Text>
                    </Pressable>
                </View>

                <Text style={styles.selectedText}>
                    Selected priority: {priority}
                </Text>
            </View>

            <Pressable
                style={({ pressed }) => [
                    styles.requestButton,
                    pressed && styles.pressed,
                ]}
                onPress={handleRequestService}
            >
                <Text style={styles.requestButtonText}>
                    Request Service
                </Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f7fb",
        padding: 20,
    },

    card: {
        backgroundColor: "#ffffff",
        borderRadius: 12,
        padding: 20,
        marginBottom: 20,

        elevation: 2,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.08,
        shadowRadius: 5,
    },

    heading: {
        fontSize: 21,
        fontWeight: "700",
        color: "#172033",
        marginBottom: 20,
    },

    detailRow: {
        marginBottom: 18,
    },

    label: {
        fontSize: 13,
        fontWeight: "600",
        color: "#687386",
        marginBottom: 5,
    },

    value: {
        fontSize: 17,
        fontWeight: "600",
        color: "#172033",
    },

    priorityCard: {
        backgroundColor: "#ffffff",
        borderRadius: 12,
        padding: 20,
        marginBottom: 20,

        elevation: 2,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.08,
        shadowRadius: 5,
    },

    priorityTitle: {
        fontSize: 17,
        fontWeight: "700",
        color: "#172033",
        marginBottom: 15,
    },

    priorityContainer: {
        flexDirection: "row",
        gap: 12,
    },

    priorityButton: {
        flex: 1,
        minHeight: 48,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#d7dce5",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffffff",
    },

    selectedPriority: {
        backgroundColor: "#1769e0",
        borderColor: "#1769e0",
    },

    priorityText: {
        fontSize: 15,
        fontWeight: "600",
        color: "#475569",
    },

    selectedPriorityText: {
        color: "#ffffff",
    },

    selectedText: {
        marginTop: 15,
        fontSize: 13,
        color: "#687386",
    },

    requestButton: {
        minHeight: 52,
        backgroundColor: "#1769e0",
        borderRadius: 9,
        justifyContent: "center",
        alignItems: "center",
    },

    requestButtonText: {
        color: "#ffffff",
        fontSize: 16,
        fontWeight: "700",
    },

    pressed: {
        opacity: 0.75,
    },
});