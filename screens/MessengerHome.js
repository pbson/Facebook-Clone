import React from "react";
import {
    ScrollView,
    View,
    StyleSheet,
    ViewComponent,
    Text,
    TextInput,
} from "react-native";
import {
    responsiveFontSize,
    responsiveHeight,
    responsiveWidth,
} from "react-native-responsive-dimensions";
import { Ionicons } from "@expo/vector-icons";
import ActiveUserOnMessengerHome from "../components/ActiveUserOnMessengerHome";
import Chat from "../components/Chat";

const MessengerHome = ({ navigation }) => {
    return (
        <ScrollView
            contentContainerStyle={{ alignItems: "center" }}
            style={styles.container}
        >
            <View style={styles.searchContainer}>
                <View style={styles.searchIconContainer}>
                    <Ionicons
                        name="ios-search"
                        size={responsiveFontSize(3)}
                        color="grey"
                    />
                </View>
                <TextInput style={styles.search} placeholder="Search" />
            </View>
            <View style={styles.activeUsersContainer}>
                <ScrollView
                    horizontal
                    showHorizontalScrollIndicator={false}
                    contentContainerStyle={{ marginVertical: 10 }}
                >
                    <ActiveUserOnMessengerHome />
                    <ActiveUserOnMessengerHome />
                    <ActiveUserOnMessengerHome />
                    <ActiveUserOnMessengerHome />
                    <ActiveUserOnMessengerHome />
                    <ActiveUserOnMessengerHome />
                    <ActiveUserOnMessengerHome />
                    <ActiveUserOnMessengerHome />
                    <ActiveUserOnMessengerHome />
                </ScrollView>
            </View>
            <Chat
                navigation={navigation}
                hasSeen={true}
                time='12:04'
                message='You OK'
                name='Pham Ba Son'
                proPicUrl='https://images.unsplash.com/photo-1605428265679-09d3898e1f34?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h='
                seenProPicUrl='https://images.unsplash.com/photo-1605428265679-09d3898e1f34?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h='
            />
            <Chat />
        </ScrollView>
    );
};

export default MessengerHome;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        paddingTop: 10,
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
});
