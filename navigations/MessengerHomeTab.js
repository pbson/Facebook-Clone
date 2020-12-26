import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MessengerHome from '../screens/MessengerHome';
import Users from '../screens/Users';
import {FontAwesome5, MaterialCommunityIcons} from '@expo/vector-icons'
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions'

const MessengerHomeTab = () => {

    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator
            screenOptions={({route}) => ({
                tabBarIcon: ({ color }) => {
                    if(route.name == 'Main'){
                        return (<MaterialCommunityIcons color={color} name="chat" size={responsiveFontSize(3)}/>)
                    } else if(route.name == 'Users'){
                        return (<FontAwesome5 color={color} name="user-friends" size={responsiveFontSize(3)}/>)
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
                name="Main"
                options={{ title: "Chats" }}
                component= {MessengerHome}
            />
        </Tab.Navigator>
    )
}

export default MessengerHomeTab