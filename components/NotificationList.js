import React, { Component,useEffect, useState} from "react";

import { StyleSheet, View, Image, Text } from "react-native";
import { TouchableNativeFeedback } from "react-native-gesture-handler";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const message = useState

const NotificationList = ({navigation, id, type, Sender, GoalId, created, isRead }) => {
    const [text, setText] = useState('');
    const [navigateTo, setNavigate] = useState('');
    const [userInfo, setUser] = useState({});

    const getUserInfo = async () => {
        let savedToken = await AsyncStorage.getItem('savedToken');
        const url = `http://192.168.43.210:3000/it4788/user/get_user_info?token=${savedToken}&user_id=${Sender}`
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
        const json = await response.json();
        setUser(json.data);
    }

    const setRead = async () => {
		let savedToken = await AsyncStorage.getItem('savedToken');
        let url = `http://192.168.43.210:3000/it4788/post/set_notification?token=${savedToken}&id=${id}`
        const fetchResult = async () => {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            const json = await response.json();
            if (json.code !== '1000') {
                Alert.alert(
                    "Error, please try again",
                    [
                        { text: "OK", onPress: () => console.log("OK Pressed") }
                    ],
                    { cancelable: false }
                );
            } else {
                navigation.navigate(navigateTo)
            }
        }
        try {
            fetchResult()
        } catch (error) {
            Alert.alert(
                "Login fail",
                "Network failed",
                [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ],
                { cancelable: false }
            );
        }
    }

    useEffect(() => {
        getUserInfo()
        if (type == 'newPost'){
            setText('has a new post')
            setNavigate('Feed')
        }
        if (type == 'newLike'){
            setText('has liked your post')
            setNavigate('Feed')
        }
        if (type == 'newComment'){
            setText('has commented your post')
            setNavigate('Comment')
        }
        if (type == 'newRequest'){
            setText('has a new request to be your friend')
            setNavigate('Friends')
        }
        if (type == 'newComment'){
            setText('has commented your post')
            setNavigate('Profile2')
        }    
    }, [])

    return (
        <TouchableNativeFeedback 
            style={ isRead ? styles.read : styles.notRead}
            onPress = {() => {setRead()}}
        >
            <View style={styles.notificationContentWrapper}>
                <View style={styles.notificationPostImgWrapper}>
                    <Image
                        style={styles.notificationPostImg}
                        source={{uri: userInfo.avatar}}
                    />
                </View>
                <View style={styles.notificationFillWrapper}>
                    <View>
                        <Text style={styles.notificationFillText}>
                            <Text style={styles.notificationFillAuthor}>
                                {userInfo.username}
                            </Text>{" "}
                            {text}
                        </Text>
                        <Text style={styles.notificationPostTime}>
                            {/* {created} */}
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
