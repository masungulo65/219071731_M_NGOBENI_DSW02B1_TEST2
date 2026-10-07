import React from "react";
import {
    View,
    Text,
    Pressable,
    StyleSheet,
} from "react-native";

export default function ConfirmationScreen({
    route,
    navigation,
}) {
    const {
        serviceName,
        serviceCode,
        priority,
    } = route.params;

    const handleReturnHome = () => {
        navigation.popToTop();
    };

    return (
        <View style={styles.container}>
            <View style={styles.confirmationCard}>
                <View style={styles.successCircle}>
                    <Text style={styles.checkmark}>
                        ✓
                    </Text>
                </View>

                <Text style={styles.title}>
                    Request Submitted
                </Text>

                <Text style={styles.subtitle}>
                    Your student service request has been
                    successfully submitted.
                </Text>

                <View style={styles.details}>
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

                    <View style={styles.detailRow}>
                        <Text style={styles.label}>
                            Priority
                        </Text>

                        <Text style={styles.value}>
                            {priority}
                        </Text>
                    </View>
                </View>
            </View>

            <Pressable
                style={({ pressed }) => [
                    styles.homeButton,
                    pressed && styles.pressed,
                ]}
                onPress={handleReturnHome}
            >
                <Text style={styles.homeButtonText}>
                    Back to Home
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
        justifyContent: "center",
    },

    confirmationCard: {
        backgroundColor: "#ffffff",
        borderRadius: 14,
        padding: 25,
        alignItems: "center",

        elevation: 3,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 6,
    },

    successCircle: {
        width: 65,
        height: 65,
        borderRadius: 33,
        backgroundColor: "#dcfce7",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 18,
    },

    checkmark: {
        color: "#16a34a",
        fontSize: 34,
        fontWeight: "700",
    },

    title: {
        fontSize: 24,
        fontWeight: "700",
        color: "#172033",
        textAlign: "center",
        marginBottom: 8,
    },

    subtitle: {
        fontSize: 14,
        color: "#687386",
        textAlign: "center",
        lineHeight: 21,
        marginBottom: 25,
    },

    details: {
        width: "100%",
        borderTopWidth: 1,
        borderTopColor: "#e5e7eb",
        paddingTop: 20,
    },

    detailRow: {
        marginBottom: 18,
    },

    label: {
        fontSize: 13,
        color: "#687386",
        marginBottom: 5,
        fontWeight: "600",
    },

    value: {
        fontSize: 16,
        color: "#172033",
        fontWeight: "700",
    },

    homeButton: {
        minHeight: 52,
        backgroundColor: "#1769e0",
        borderRadius: 9,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
    },

    homeButtonText: {
        color: "#ffffff",
        fontSize: 16,
        fontWeight: "700",
    },

    pressed: {
        opacity: 0.75,
    },
});