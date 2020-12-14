import React, { Component } from "react";
import {
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
    TouchableHighlight,
    TouchableNativeFeedback,
    StatusBar
} from "react-native";
import TopBar from "./TopBar";
import { Navigation } from "react-native-navigation";

const Header = () => {
    const gotoScreen = screenName => {
        // Navigation.push(this.props.componentId, {
        //     component: {
        //         name: screenName
        //     }
        // });
        console.log('FIX THIS HERE')
    };
    return (
        <View style={styles.headerContainer}>
            <StatusBar backgroundColor="#30477C" barStyle="light-content" />
            <TopBar />
            <View style={styles.tabContainer}>
                <View style={styles.tabIconContainer}>
                    <TouchableHighlight
                        onPress={() => gotoScreen("Home")}>
                        <Image
                            style={styles.tabIconImg}
                            source={require("../src/img/homeActive.png")}
                        />
                    </TouchableHighlight>
                </View>
                <View style={styles.tabIconContainer}>
                    <TouchableNativeFeedback
                        onPress={() => gotoScreen("AddFriend")}>
                        <Image
                            style={styles.tabIconImg}
                            source={require("../src/img/group.png")}
                        />
                    </TouchableNativeFeedback>
                </View>
                <View style={styles.tabIconContainer}>
                    <TouchableOpacity
                        onPress={() => gotoScreen("MarketPlace")}>
                        <Image
                            style={styles.tabIconImg}
                            source={require("../src/img/watch.png")}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.tabIconContainer}>
                    <TouchableOpacity
                        onPress={() => gotoScreen("Notfound")}>
                        <Image
                            style={styles.tabIconImg}
                            source={require("../src/img/profile.png")}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.tabIconContainer}>
                    <TouchableOpacity
                        onPress={() => gotoScreen("Notification")}>
                        <Image
                            style={styles.tabIconImg}
                            source={require("../src/img/notification.png")}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.tabIconContainer}>
                    <TouchableOpacity
                        onPress={() => gotoScreen("NavigationMenu")}>
                        <Image
                            style={styles.tabIconImg}
                            source={require("../src/img/more.png")}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export default Header

const styles = StyleSheet.create({
    headerContainer: {
        height: 90,
        borderBottomWidth: 1,
        borderBottomColor: "#c1c4c9",
        paddingBottom: 3,
        marginTop: 25
    },
    tabContainer: {
        height: 60,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 18,
        paddingTop: 5
    },
    tabIconContainer: {
        flex: 1,
        marginTop: 20
    },
    tabIconImg: {
        height: 24,
        width: 24
    }
});
