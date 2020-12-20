import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import { responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions'
import { Ionicons, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import settingProfile from '../screens/settingProfile';

const Navigator = () => {
    const Stack = createStackNavigator()

    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name = 'settingProfile'
                    component = {settingProfile}
                />
            </Stack.Navigator>
        </NavigationContainer>


    )}