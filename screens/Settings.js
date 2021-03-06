import React, { useEffect, useState } from "react";
import {
    ScrollView,
    View,
    StyleSheet,
    Text,
    FlatList,
    TouchableOpacity,
    Image,
    BackHandler
} from "react-native";
import {
    responsiveFontSize,
    responsiveHeight,
    responsiveWidth,
} from "react-native-responsive-dimensions";
import Chat from "../components/Chat";
import FeedPost from "../components/FeedPost";
import CoverPhoto from '../assets/coverPhoto.png';
import SettingIcon from '../assets/setting2.png';
import LogoutIcon from '../assets/logOutIcon.png';
import { StyleSheetManager } from "styled-components";
import AsyncStorage from '@react-native-async-storage/async-storage';
import MessengerNavigator from '../navigations/MessengerNavigator'

const Watch = ({ navigation }) => {
    const [userInfo, setUser] = useState({});
    const [data, setData] = useState([]);

    const getUserInfo = async () => {
        let savedToken = await AsyncStorage.getItem('savedToken');
        const url = `http://192.168.43.210:3000/it4788/user/get_user_info?token=${savedToken}`
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
        const json = await response.json();
        if (json.code !== '1000') {
            navigation.navigate('Login')
        } else {
            setUser(json.data);
        }
    }

    useEffect(() => {
        getUserInfo()
    }, []);

    const onPress1 = () =>{
        navigation.navigate('accountSetting');
    }
    const onPress2 = () =>{
        navigation.navigate('Profile2');
    }

    const logout = async () =>{
        await AsyncStorage.removeItem('savedToken')
        navigation.navigate('Welcome');
    }

    const exitApp = async () =>{
        BackHandler.exitApp();
    }

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
                <Image style = {styles.avatar} source = {{uri: userInfo.avatar}} />
                <View style = {{marginLeft: 10}} >
                    <Text style = {{fontSize: 18, fontWeight: "bold"}} >{userInfo.username}</Text>
                    <Text style = {{fontSize: 14, color: 'gray'}} >See your profile</Text>
                </View>
            </View>
            </TouchableOpacity>
            <View style = {styles.bodysetting} >
                <TouchableOpacity style = {styles.row1} onPress = {onPress1} >
                    <Image style = {styles.settingIcon} source = {SettingIcon} />
                    <Text style = {{fontSize: 17, fontWeight: "bold", marginLeft: 10}} >Setting</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>logout()} style = {styles.row2}  >
                    <Image style = {styles.logoutIcon} source = {LogoutIcon}></Image>
                    <Text style = {{fontSize: 17, fontWeight: "bold", marginLeft: 10}} >Log Out</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>exitApp()} style = {styles.row2}  >
                    <Image style = {styles.logoutIcon} source = {LogoutIcon}></Image>
                    <Text style = {{fontSize: 17, fontWeight: "bold", marginLeft: 10}} >Exit Application</Text>
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
