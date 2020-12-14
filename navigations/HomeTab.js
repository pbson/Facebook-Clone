import React, { Component } from "react";
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions'
import { AsyncStorage, View, ScrollView, StyleSheet, StatusBar } from "react-native";
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MessengerHome from '../screens/MessengerHome';
import Feed from '../screens/Feed';
import Watch from '../screens/Watch';


const Tab = createMaterialTopTabNavigator();

const Home = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color }) => {
                    if (route.name == "Feed") {
                        return (<Ionicons
                            name='ios-information-circle-outline'
                            size={size}
                            color={color}
                        />)
                    } else if (route.name == 'Friends') {
                        return (<FontAwesome5 color={color} name="user-friends" size={responsiveFontSize(3)} />)
                    }
                }
            })}
            tabBarOptions={
                {
                    inactiveTintColor: 'rgba(211,211,211,0.8)',
                    activeTintColor: 'black',
                    style: {
                        height: responsiveHeight(8)
                    },
                    tabStyle: {
                        padding: 5
                    },
                    labelStyle: {
                        fontSize: responsiveFontSize(1.5)
                    }
                }
            }
        >
            <Tab.Screen
                name="Feed"
                options={{ title: "Feed" }}
                component= {Feed}
            />
            <Tab.Screen
                name="Friends"
                component={MessengerHome}
                options={{ tabBarLabel: 'Friends' }}
            />
            <Tab.Screen
                name="Watch"
                component={Watch}
                options={{ tabBarLabel: 'Watch' }}
            />
            <Tab.Screen
                name="Notification"
                component={MessengerHome}
                options={{ tabBarLabel: 'Notification' }}
            />
            <Tab.Screen
                name="Settings"
                component={MessengerHome}
                options={{ tabBarLabel: 'Settings' }}
            />
        </Tab.Navigator>
    );
}

export default Home;

const styles = StyleSheet.create({

});
