import React, { Component } from "react";

import { StyleSheet, View, Image, Text } from "react-native";
import { TouchableNativeFeedback } from "react-native-gesture-handler";

const NotificationList = ({ authorImg, from, to, time, isRead }) => {
    return (
        <TouchableNativeFeedback 
            style={ isRead ? styles.read : styles.notRead}
        >
            <View style={styles.notificationContentWrapper}>
                <View style={styles.notificationPostImgWrapper}>
                    <Image
                        style={styles.notificationPostImg}
                        source={authorImg}
                    />
                </View>
                <View style={styles.notificationFillWrapper}>
                    <View>
                        <Text style={styles.notificationFillText}>
                            <Text style={styles.notificationFillAuthor}>
                                {from}
                            </Text>{" "}
                            membalas komentar Anda di foto{" "}
                            <Text style={styles.notificationFillAuthor}>
                                {to}
                            </Text>
                        </Text>
                        <Text style={styles.notificationPostTime}>
                            {time}
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableNativeFeedback>

    );
}

const styles = StyleSheet.create({
    read: {
        width: "100%",
    },
    notRead: {
        width: "100%",
        backgroundColor: "#dfe3ee"
    },
    notificationContentWrapper: {
        flexDirection: "row",
        marginVertical: 10,
        paddingLeft: "10%",
        marginRight: "10%",
        width: "100%"
    },
    notificationPostImgWrapper: {
        flex: 3
    },
    notificationPostImg: {
        height: 60,
        width: 60,
        borderRadius: 100
    },
    notificationFillWrapper: {
        flex: 10
    },
    notificationFillText: {
        lineHeight: 20
    },
    notificationFillAuthor: {
        fontWeight: "bold"
    },
    notificationPostTime: {
        fontSize: 10,
        paddingTop: 3
    },
    notificationMore: {
        flex: 1,
        paddingTop: 20
    }
});

export default NotificationList;
