import React, { useEffect, useState } from "react";
import {
    ScrollView,
    View,
    StyleSheet,
    Text,
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
import NotificationList from "../components/NotificationList";


const Notification = ({ navigation }) => {
    const [data, setData] = useState([]);

    const index = 0
    const count = 20
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWY3Nzc4YjQ5NzYwZmUwMDc2M2E4YzdmIiwicGFzc3dvcmQiOiIkMmEkMTAkYXcxeGZXenJpYjVncC9PWjMxWENsZTQuZGFOOXouRDFkcEF3UGNlcGc5QXZEY3ppbC5XbUMiLCJsYXRlc3RMb2dpblRpbWUiOiIyMDIwLTEwLTMxVDAwOjI2OjU4LjI1OFoifSwiaWF0IjoxNjA3ODU2NzMwLCJleHAiOjE2MDgyMTY3MzB9.GO85wxlmyn5KxjiaSSK3ZVqL8Iv24B0FZi4zYPQQoAA'


    useEffect(() => {
        const url = `http://303ef6e81cb6.ngrok.io/it4788/chatsocket/get_list_conversation?token=${token}&index=${index}&count=${count}`
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
                <Text style={styles.headingText}>Notifications</Text>
            </View>
            <FlatList
                style={styles.chatContainer}
            />
            <NotificationList
                authorImg={require("../src/img/photostatus.jpg")}
                from="Pham Ba Son"
                to="Vu Ngoc Hien"
                time="2 hour before"
                isRead = {true}
            />
            <NotificationList
                authorImg={require("../src/img/photostatus.jpg")}
                from="Pham Ba Son"
                to="Vu Ngoc Hien"
                time="2 hour before"
                isRead = {false}
            />
        </ScrollView>
    );
};

export default Notification;

const styles = StyleSheet.create({
    headerContainer: {
        padding: 10,
        width: responsiveWidth(95),
        borderBottomColor: '#E5E5E5',
        borderBottomWidth: 0.5
    },
    container: {
        flex: 1,
        backgroundColor: "white",
        paddingTop: 10,
    },
    headingText: {
        fontSize: responsiveFontSize(2.5),
        fontWeight: 'bold'
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
