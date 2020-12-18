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
import ActiveUserOnMessengerHome from "../components/ActiveUserOnMessengerHome";
import Chat from "../components/Chat";

const MessengerHome = ({ navigation }) => {
    const [data, setData] = useState([]);

    const index = 0
    const count = 20
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWY3Nzc4YjQ5NzYwZmUwMDc2M2E4YzdmIiwicGFzc3dvcmQiOiIkMmEkMTAkYXcxeGZXenJpYjVncC9PWjMxWENsZTQuZGFOOXouRDFkcEF3UGNlcGc5QXZEY3ppbC5XbUMiLCJsYXRlc3RMb2dpblRpbWUiOiIyMDIwLTEwLTMxVDAwOjI2OjU4LjI1OFoifSwiaWF0IjoxNjA3ODU2NzMwLCJleHAiOjE2MDgyMTY3MzB9.GO85wxlmyn5KxjiaSSK3ZVqL8Iv24B0FZi4zYPQQoAA'


    useEffect(() => {
        const url = `http://192.168.31.17:3000/it4788/chatsocket/get_list_conversation?token=${token}&index=${index}&count=${count}`
        const fetchResult = async () => {
            const response  = await fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            const json = await response.json();
            setData(json.data);
        }
        fetchResult()
    }, []);
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
                </ScrollView>
            </View>
            <FlatList 
                style={styles.chatContainer}
                data={data}
                keyExtractor={({ id }, index) => id}
                renderItem={({ item }) => (
                    <Chat
                        conversationId = {item.id}
                        partnerId = {item.Partner.id}
                        navigation={navigation}
                        hasSeen={item.LastMessage.unread}
                        time={item.LastMessage.created}
                        message={item.LastMessage.message}
                        phonenumber={item.Partner.phonenumber}
                        proPicUrl={'http://' + item.Partner.avatar}
                        seenProPicUrl={'http://' + item.Partner.avatar}
                    />
                )}
            />
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
    chatContainer: {
        width:responsiveWidth(100)
    }
});
