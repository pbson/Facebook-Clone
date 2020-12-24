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
import ActiveUserOnMessengerHome from "../components/ActiveUserOnMessengerHome";
import Chat from "../components/Chat";
import FeedPost from "../components/FeedPost";
import CoverPhoto from '../assets/coverPhoto.png';
import SettingIcon from '../assets/setting2.png';
import LogoutIcon from '../assets/logOutIcon.png';
import { StyleSheetManager } from "styled-components";


const Watch = ({ navigation }) => {
    const [data, setData] = useState([]);

    const index = 0
    const count = 20
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWY3Nzc4YjQ5NzYwZmUwMDc2M2E4YzdmIiwicGFzc3dvcmQiOiIkMmEkMTAkYXcxeGZXenJpYjVncC9PWjMxWENsZTQuZGFOOXouRDFkcEF3UGNlcGc5QXZEY3ppbC5XbUMiLCJsYXRlc3RMb2dpblRpbWUiOiIyMDIwLTEwLTMxVDAwOjI2OjU4LjI1OFoifSwiaWF0IjoxNjA3ODU2NzMwLCJleHAiOjE2MDgyMTY3MzB9.GO85wxlmyn5KxjiaSSK3ZVqL8Iv24B0FZi4zYPQQoAA'
    const onPress1 = () =>{
        navigation.navigate('accountSetting');
    }
    const onPress2 = () =>{
        navigation.navigate('profile');
    }

    useEffect(() => {
        const url = `http://192.168.0.140:3000/it4788/chatsocket/get_list_conversation?token=${token}&index=${index}&count=${count}`
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
            contentContainerStyle={{  }}
            style={styles.container}
        >
            <View style={styles.headerContainer}>
                <Text style={styles.headingText}>Menu</Text>
            </View>
            <TouchableOpacity onPress = {onPress2} >
            <View style = {styles.headerElement} >
                <Image style = {styles.avatar} source = {CoverPhoto} />
                <View style = {{marginLeft: 10}} >
                    <Text style = {{fontSize: 18, fontWeight: "bold"}} >Thế Tài</Text>
                    <Text style = {{fontSize: 14, color: 'gray'}} >See your profile</Text>
                </View>
            </View>
            </TouchableOpacity>
            <View style = {styles.bodysetting} >
                <TouchableOpacity style = {styles.row1} onPress = {onPress1} >
                    <Image style = {styles.settingIcon} source = {SettingIcon} />
                    <Text style = {{fontSize: 17, fontWeight: "bold", marginLeft: 10}} >Setting</Text>
                </TouchableOpacity>
                <TouchableOpacity style = {styles.row2}  >
                    <Image style = {styles.logoutIcon} source = {LogoutIcon}></Image>
                    <Text style = {{fontSize: 17, fontWeight: "bold", marginLeft: 10}} >Log Out</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                style={styles.chatContainer}
            />
        </ScrollView>
    );
};

export default Watch;

const styles = StyleSheet.create({
    headerContainer: {
        padding: 10,
        width: responsiveWidth(95),
        // borderBottomColor: '#E5E5E5',
        // borderBottomWidth: 0.5
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
    },
    avatar: {
        height: 40, 
        width: 40,
        borderRadius: 40,
    },
    headerElement: {
        flexDirection: 'row',
        alignItems: "center",
        width: responsiveWidth(95),
        padding: 10,
        borderBottomColor: '#E5E5E5',
        borderBottomWidth: 0.5
    },
    bodysetting: {
        padding: 10,
    },
    settingIcon: {
        height: 40,
        width: 40,
        borderRadius: 40,
    },
    row1: {
        flexDirection: 'row',
        alignItems: "center",   
    }, 
    logoutIcon: {
        height: 42,
        width: 42,
        borderRadius: 42,
    },
    row2: {
        flexDirection: 'row',
        alignItems: "center",
        marginTop: 8,
    }
});
