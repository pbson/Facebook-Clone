import React, { useEffect, useState } from "react";
import {
    ScrollView,
    View,
    StyleSheet,
    TextInput,
    FlatList
} from "react-native";
import {
    responsiveFontSize,
    responsiveHeight,
    responsiveWidth,
} from "react-native-responsive-dimensions";
import { Ionicons } from "@expo/vector-icons";


const Login = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.logoBackground}>
                <Ionicons style={styles.facebookLogo} name="facebook-logo" size={responsiveFontSize(3)} color="#006AFF" />
            </View>
        </View>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        paddingTop: 10,
    },
    logoBackground: {
        width: responsiveWidth(90),
        height: responsiveHeight(5),
        backgroundColor: "rgba(211, 211, 211, 0.2)",
    },
    facebookLogo: {
        width: responsiveWidth(5),
        height: responsiveHeight(5),
    },
    searchContainer: {
        width: responsiveWidth(90),
        height: responsiveHeight(5),
        backgroundColor: "rgba(211, 211, 211, 0.2)",
        borderRadius: 30,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 10,
        // backgroundColor : 'red'
    },
    search: {
        flex: 1,
    },
    searchIconContainer: {
        paddingHorizontal: 10,
    },
    activeUsersContainer: {
        height: responsiveHeight(13),
        width: responsiveWidth(100),
        marginVertical: 5,
    },
    chatContainer: {
        width: responsiveWidth(100)
    }
});
