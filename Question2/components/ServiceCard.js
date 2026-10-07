import React from "react";
import {
    View,
    Text,
    Pressable,
    StyleSheet,
} from "react-native";

export default function ServiceCard({ service, onPress }) {
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                styles.card,
                pressed && styles.pressed,
            ]}
        >
            <View style={styles.textContainer}>
                <Text style={styles.serviceName}>
                    {service.name}
                </Text>

                <Text style={styles.serviceCode}>
                    Service Code: {service.code}
                </Text>
            </View>

            <Text style={styles.arrow}>
                ›
            </Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#ffffff",
        borderRadius: 12,
        padding: 20,
        marginBottom: 15,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",

        elevation: 2,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.08,
        shadowRadius: 5,
    },

    pressed: {
        opacity: 0.7,
    },

    textContainer: {
        flex: 1,
    },

    serviceName: {
        fontSize: 17,
        fontWeight: "700",
        color: "#172033",
        marginBottom: 7,
    },

    serviceCode: {
        fontSize: 13,
        color: "#687386",
    },

    arrow: {
        fontSize: 30,
        color: "#1769e0",
        marginLeft: 15,
    },
});