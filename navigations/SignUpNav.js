import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import AccountName from '../screens/Login_screens/AccountName.js'
import UserGender from '../screens/Login_screens/UserGender.js'
import CreateAccount from '../screens/Login_screens/CreateAccount.js'
import Email from '../screens/Login_screens/Email.js'
import UserBirth from '../screens/Login_screens/UserBirth.js'
import UserPhoneNumber from '../screens/Login_screens/UserPhoneNumber.js'
import CreatePassword from '../screens/Login_screens/CreatePassword.js'

const Stack = createStackNavigator();

const SignUpNav = () => {
    return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName="CreateAccount">
        <Stack.Screen name="CreateAccount" component={CreateAccount} />
        <Stack.Screen name="AccountName" component={AccountName} />
        <Stack.Screen name="UserBirth" component={UserBirth} />
        <Stack.Screen name="UserGender" component={UserGender} />
        <Stack.Screen name="UserPhoneNumber" component={UserPhoneNumber} />
        <Stack.Screen name="Email" component={Email} />
        <Stack.Screen name="CreatePassword" component={CreatePassword} />
      </Stack.Navigator>
    </NavigationContainer>
    )
}
export default SignUpNav