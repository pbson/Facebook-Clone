import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import { responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions'
import { Ionicons, FontAwesome, FontAwesome5 } from "@expo/vector-icons";

import MessengerHome from '../screens/MessengerHome';
import Feed from '../screens/Feed';
import Watch from '../screens/Watch';
import Notification from '../screens/Notification';
import Friends from '../screens/Friends';
import Profile2 from '../screens/Profile2';
import Settings from '../screens/Settings';
import EditProfile from '../screens/editProfile/EditProfile.js'
import EditInfo from '../screens/editProfile/EditInfo.js'
const ProfileNav = ()=>{
    const Stack = createStackNavigator()
    return(
        
            <Stack.Navigator initialRouteName={'Profile'}>
            <Stack.Screen
                    name='Profile'
                    component={Profile2}
            />
            <Stack.Screen
                    options={
                        ({ navigation }) => ({
                            headerShown: true,
                            title: 'Edit Profile'
                        })
                    }
                    name='EditProfile'
                    component={EditProfile}
            />
            <Stack.Screen
                    options={
                        ({ navigation }) => ({
                            headerShown: true,
                            title: 'About'
                        })
                    }
                    name='About'
                    component={EditInfo}
            />
            </Stack.Navigator>
        
    )
}

export default ProfileNav