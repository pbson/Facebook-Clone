import React, { useEffect, useState } from "react";
import {
    ScrollView,
    View,
    StyleSheet,
    TextInput,
    FlatList,
    TouchableOpacity,
    Image
} from "react-native";
import {
    responsiveFontSize,
    responsiveHeight,
    responsiveWidth,
} from "react-native-responsive-dimensions";
import { Ionicons } from "@expo/vector-icons";
import ActiveUserOnMessengerHome from "../components/ActiveUserOnMessengerHome";
import Chat from "../components/Chat";
import FeedPost from "../components/FeedPost"
import Avatar from "../components/Avatar"


const Feed = ({ navigation }) => {
    const [data, setData] = useState([]);

    const index = 0
    const count = 20
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWY3Nzc4YjQ5NzYwZmUwMDc2M2E4YzdmIiwicGFzc3dvcmQiOiIkMmEkMTAkYXcxeGZXenJpYjVncC9PWjMxWENsZTQuZGFOOXouRDFkcEF3UGNlcGc5QXZEY3ppbC5XbUMiLCJsYXRlc3RMb2dpblRpbWUiOiIyMDIwLTEwLTMxVDAwOjI2OjU4LjI1OFoifSwiaWF0IjoxNjA3ODU2NzMwLCJleHAiOjE2MDgyMTY3MzB9.GO85wxlmyn5KxjiaSSK3ZVqL8Iv24B0FZi4zYPQQoAA'


    useEffect(() => {
        const url = `http://192.168.31.17:3000/it4788/chatsocket/get_list_conversation?token=${token}&index=${index}&count=${count}`
        const fetchResult = async () => {
            const response = await fetch(url, {
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
            <View style={styles.headerContainer}>
                <Avatar/>
                <View style={styles.searchContainer}>
                    <TextInput style={styles.search} placeholder="What's on your mind " />
                </View>
            </View>
            <View style={styles.break}></View>    
            <FlatList
                style={styles.chatContainer}
            />
            <FeedPost/>
            <FeedPost/>
        </ScrollView>
    );
};

export default Feed;

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: responsiveWidth(100),
        borderBottomColor: '#E5E5E5',
        borderBottomWidth: 0.5
    },
    container: {
        flex: 1,
        backgroundColor: "white",
        paddingTop: 10,
    },
    searchContainer: {
        marginTop: 10,
        width: responsiveWidth(80),
        height: responsiveHeight(5),
        backgroundColor: 'white',
        borderRadius: 30,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 10,
        borderColor: '#E5E5E5',
        borderWidth: 1,
        color: 'black',
        marginBottom: 10
    },
    search: {
        flex: 1,
        paddingLeft: 20,
        color: 'black',
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
    },
    name: {
        flex: 1,
        textAlign: 'center',
        fontSize: responsiveFontSize(1.5),
    },
    break: {
        backgroundColor: '#CCC',
        height: 8,
        width: "100%"
    }
});
