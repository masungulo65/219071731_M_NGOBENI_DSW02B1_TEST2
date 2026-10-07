import React from "react";
import {
    View,
    Text,
    Pressable,
    StyleSheet,
} from "react-native";

export default function EventCard({
    event,
    isSelected,
    onToggleInterested,
}) {
    return (
        <View
            style={[
                styles.card,
                isSelected && styles.selectedCard,
            ]}
        >
            <View style={styles.eventInformation}>
                <Text style={styles.eventTitle}>
                    {event.title}
                </Text>

                <Text style={styles.eventCampus}>
                    Campus: {event.campus}
                </Text>

                <Text style={styles.eventId}>
                    Event ID: {event.id}
                </Text>
            </View>

            <Pressable
                onPress={() => onToggleInterested(event.id)}
                style={[
                    styles.interestedButton,
                    isSelected && styles.selectedButton,
                ]}
            >
                <Text
                    style={[
                        styles.buttonText,
                        isSelected &&
                            styles.selectedButtonText,
                    ]}
                >
                    {isSelected
                        ? "Interested ✓"
                        : "Interested"}
                </Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#ffffff",
        borderRadius: 12,
        padding: 18,
        marginBottom: 14,

        borderWidth: 1,
        borderColor: "#e1e5eb",

        elevation: 2,

        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.06,
        shadowRadius: 5,
    },

    selectedCard: {
        borderColor: "#1769e0",
        backgroundColor: "#f0f6ff",
    },

    eventInformation: {
        marginBottom: 15,
    },

    eventTitle: {
        fontSize: 17,
        fontWeight: "700",
        color: "#172033",
        marginBottom: 8,
    },

    eventCampus: {
        fontSize: 14,
        color: "#526075",
        marginBottom: 5,
    },

    eventId: {
        fontSize: 12,
        color: "#8a94a6",
    },

    interestedButton: {
        minHeight: 42,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#1769e0",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 15,
    },

    selectedButton: {
        backgroundColor: "#1769e0",
    },

    buttonText: {
        color: "#1769e0",
        fontSize: 14,
        fontWeight: "700",
    },

    selectedButtonText: {
        color: "#ffffff",
    },
});