import React from 'react';
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



// import {socket} from '../chatSocket/chatAction'

const Navigator = () => {
    const Stack = createStackNavigator()

    return (
        <NavigationContainer>
            <Stack.Navigator>
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
                                        uri: 'https://images.unsplash.com/photo-1604606354385-9f9307d45a41?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=800&ixlib=rb-1.2.1&q=80&w=1000'
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

