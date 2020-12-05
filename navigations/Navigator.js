import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import { responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions'
import { Ionicons, FontAwesome, FontAwesome5 } from "@expo/vector-icons";

import MessengerHome from '../screens/MessengerHome';
import MessengerHomeTab from '../navigations/MessengerHomeTab';
import HeaderButton from '../components/HeaderButton';
import ChatView from '../screens/ChatView'

const Navigator = () => {
    const Stack = createStackNavigator()

    return (
        <NavigationContainer>
            <Stack.Navigator>
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
                            headerRight: () => {
                                return (
                                    <View style={styles.chatViewHeaderRightContainer}>
                                        <TouchableOpacity style={styles.call}>
                                            <Ionicons name="ios-call" size={responsiveFontSize(3)} color="#006AFF" />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.video}>
                                            <FontAwesome name="video-camera" size={responsiveFontSize(3)} color="#006AFF" />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.info}>
                                            <FontAwesome5 name="info-circle" size={responsiveFontSize(3)} color="#006AFF" />
                                        </TouchableOpacity>
                                    </View>
                                )
                            },
                            headerLeft: () => {
                                return (
                                    <View style={styles.chatViewHeaderLeftContainer}>
                                        <TouchableOpacity onPress={() => navigation.goBack()}>
                                            <Ionicons name="md-arrow-back" size={responsiveFontSize(3)} color="#006AFF" />
                                        </TouchableOpacity>
                                        <View style={styles.chatViewProPicContainer}>
                                            <Image style={styles.profilePic} source={{ uri: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' }} />
                                        </View>
                                        <View>
                                            <Text style={styles.name}>Name</Text>
                                            <Text style={styles.lastOnlineText}>Active 12 hour ago</Text>
                                        </View>

                                    </View>
                                )
                            },
                            headerLeftContainerStyle : {
                                paddingHorizontal : 10
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

