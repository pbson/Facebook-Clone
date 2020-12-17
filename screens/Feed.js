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
import FeedPost from "../components/FeedPost"
import Avatar from "../components/Avatar"
import CreatePost from "../screens/CreatePost.js"
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import { LogBox } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

const Feed = ({ navigation,userId, userPhonenumber, userAvatar }) => {
    const [data, setData] = useState([]);

    const index = 0
    const count = 20

    const registerForPushNotificationsAsync = async () => {
        const {status} = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        if (status != 'granted') {
          const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
          // finalStatus = status;
        }
        if (status !== 'granted') {
          alert('Failed to get push token for push notification!');
          return;
        }
        let token = (await Notifications.getExpoPushTokenAsync()).data;
        return token
    };

    useEffect(() => {
        const createToken = async () => {
            let token = await registerForPushNotificationsAsync();
            let savedToken = await AsyncStorage.getItem('savedToken');
            if (savedToken === null) {
                navigation.navigate('Login', {
                    savedToken: token
                })
            }
        }

        const fetchResult = async () => {
            let savedToken = await AsyncStorage.getItem('savedToken');
            const url = `https://project-facebook-clone.herokuapp.com/it4788/chatsocket/get_list_conversation?token=${savedToken}&index=${index}&count=${count}`
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
        createToken()
        fetchResult()
    }, []);
    return (

        <ScrollView
            contentContainerStyle={{ alignItems: "center" }}
            style={styles.container}
        >
            {/* <CreatePost ref={ref => { createPost = ref; }} /> */}
            <View style={styles.headerContainer}>
                <Avatar
                    url = {userAvatar}
                />
                <View style={styles.searchContainer}>
                    <TextInput onFocus={() => navigation.navigate(CreatePost,{
                        userAvatar: userAvatar,
                        userPhonenumber: userPhonenumber
                    })} style={styles.search} placeholder="What's on your mind " />
                </View>
            </View>
            <View style={styles.break}></View>
            <FlatList
                style={styles.chatContainer}
            />
            <FeedPost />
            <FeedPost />
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
