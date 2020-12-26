import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import { responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions'
import { Ionicons, FontAwesome, FontAwesome5 } from "@expo/vector-icons";

import MessengerHomeTab from './MessengerHomeTab';
import HeaderButton from '../components/HeaderButton';
import ChatView from '../screens/ChatView'
import Login from '../screens/Login'
import HomeTab from './HomeTab'
import HomePageHeaderButton from '../components/HomePageHeaderButton';
import CreatePost from '../screens/CreatePost.js'
import SignUpNav from './SignUpNav.js'
import AccountName from '../screens/Login_screens/AccountName.js'
import UserGender from '../screens/Login_screens/UserGender.js'
import CreateAccount from '../screens/Login_screens/CreateAccount.js'
import Email from '../screens/Login_screens/Email.js'
import UserBirth from '../screens/Login_screens/UserBirth.js'
import UserPhoneNumber from '../screens/Login_screens/UserPhoneNumber.js'
import CreatePassword from '../screens/Login_screens/CreatePassword.js'
import Comment from '../screens/Comment'
import Welcome from '../screens/Welcome'
import setting from '../screens/Settings.js';
import accountSetting from '../screens/AccountSetting.js';
import nameSetting from '../screens/NameSetting.js';
import profile from '../screens/Profile2.js'
import UserProfile from '../screens/UserProfile.js'
import AllFriends from '../screens/AllFriends.js'
import passwordSetting from '../screens/PasswordSetting.js'
import personalinfoSetting from '../screens/PersonalinfoSetting.js';
import passChange from '../screens/PassChange.js'
import AsyncStorage from '@react-native-async-storage/async-storage';

// import {socket} from '../chatSocket/chatAction'

const Navigator = () => {
    const Stack = createStackNavigator()
    const [userInfo, setUser] = useState({});

    const getUserInfo = async () => {
        let savedToken = await AsyncStorage.getItem('savedToken');
        const url = `http://192.168.0.140:3000/it4788/user/get_user_info?token=${savedToken}`
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

    return (
        <NavigationContainer>
            <Stack.Navigator>       
            <Stack.Screen
                    options={
                        ({ navigation }) => ({
                            headerShown: false,
                            title: null
                        })
                    }
                    name='Welcome'
                    component={Welcome}
            />
                <Stack.Screen
                    options={
                        ({ navigation }) => ({
                            title: null,
                            headerRight: () => {
                                return <HomePageHeaderButton navigation={navigation} />
                            },
                            headerLeft: () => {

                                return <Image style={styles.homeTabImage} source={require('../src/img/Facebook-Logo.png')} />

                            },
                            headerLeftContainerStyle: {
                                paddingLeft: 10
                            },
                            headerRightContainerStyle: {
                                paddingRight: 10,
                                paddingHorizontal: 10,
                            }
                        })
                    }
                    name='HomeTab'
                    component={HomeTab}
                />
                <Stack.Screen
                    name='Login'
                    component={Login}
                    options={
                        {
                            headerShown: false,
                            headerStyle: {
                                paddingTop: 0
                            },
                        }}
                />
                <Stack.Screen
                    name='CreatePost'
                    component={CreatePost}
                />
                <Stack.Screen name="CreateAccount" component={CreateAccount} />
                <Stack.Screen name="AccountName" component={AccountName} />
                <Stack.Screen name="UserBirth" component={UserBirth} />
                <Stack.Screen name="UserGender" component={UserGender} />
                <Stack.Screen name="UserPhoneNumber" component={UserPhoneNumber} />
                <Stack.Screen name="Email" component={Email} />
                <Stack.Screen name="CreatePassword" component={CreatePassword} />
                <Stack.Screen
                    options={
                        ({ navigation }) => ({
                            title: 'Chat',
                            headerRight: () => {
                                return <HeaderButton />
                            },
                            headerLeft: () => {
                                return <Image style={styles.image} source={
                                    {
                                        uri: userInfo.avatar
                                    }
                                } />
                            },
                            headerLeftContainerStyle: {
                                paddingLeft: 10
                            },
                            headerRightContainerStyle: {
                                paddingRight: 10,
                                paddingHorizontal: 10,
                            }
                        })
                    }
                    name='MessengerHomeTab'
                    component={MessengerHomeTab}
                />
                <Stack.Screen
                    name="ChatView"
                    component={ChatView}
                    options={
                        ({ navigation, route }) => ({
                            title: null,
                            // headerLeft: () => {
                            //     return (
                            //         <View style={styles.chatViewHeaderLeftContainer}>
                            //             <TouchableOpacity onPress={() => { navigation.goBack() }}>
                            //                 <Ionicons name="md-arrow-back" size={responsiveFontSize(3)} color="#006AFF" />
                            //             </TouchableOpacity>
                            //             <View style={styles.chatViewProPicContainer}>
                            //                 <Image style={styles.profilePic} source={{ uri: route.params.proPicUrl }} />
                            //             </View>
                            //             <View>
                            //                 <Text style={styles.name}>{route.params.phonenumber}</Text>
                            //                 <Text style={styles.lastOnlineText}>Active 12 hour ago</Text>
                            //             </View>

                            //         </View>
                            //     )
                            // },
                            headerLeftContainerStyle: {
                                paddingHorizontal: 10
                            }
                        })
                    }
                />
                <Stack.Screen
                    name="Comment"
                    component={Comment}
                    options={
                        ({ navigation, route }) => ({
                            title: null,
                            headerLeftContainerStyle: {
                                paddingHorizontal: 10
                            }
                        })
                    }
                />
            <Stack.Screen name = 'setting' component = {setting}/>
            <Stack.Screen name = 'accountSetting' component = {accountSetting}/>
            <Stack.Screen name = 'personalinfoSetting' component = {personalinfoSetting} />
            <Stack.Screen name = 'nameSetting' component = {nameSetting} />
            <Stack.Screen name = 'profile' component = {profile} />
            <Stack.Screen name = 'passwordSetting' component = {passwordSetting} />
            <Stack.Screen name = 'passChange' component = {passChange} />     
            <Stack.Screen name = 'UserProfile' component = {UserProfile} />    
            <Stack.Screen name = 'AllFriends' component = {AllFriends} />    
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    image: {
        width: responsiveHeight(5),
        height: responsiveHeight(5),
        borderRadius: 200
    },
    homeTabImage: {
        width: responsiveHeight(16),
        height: responsiveHeight(3.1),
    },
    profilePic: {
        borderRadius: 200,
        width: responsiveHeight(5),
        height: responsiveHeight(5),
    },
    chatViewHeaderLeftContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    name: {
        fontSize: responsiveFontSize(2),
        fontWeight: 'bold'
    },
    chatViewProPicContainer: {
        padding: 10
    },
    lastOnlineText: {
        fontSize: responsiveFontSize(1.5),
        color: 'gray'
    },
    chatViewHeaderRightContainer: {
        flexDirection: 'row'
    },
    call: {
        paddingHorizontal: 10
    },
    video: {
        paddingHorizontal: 10
    },
    info: {
        paddingHorizontal: 10
    }
})

export default Navigator

