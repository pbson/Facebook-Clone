import React from 'react';
import { StyleSheet } from 'react-native';
import Navigator from './navigations/MessengerNavigator'
import CreatePost from './screens/CreatePost.js'
import Login from './screens/Login.js'
import UserPhoneNumber from './screens/Login_screens/UserPhoneNumber.js'
import SignUpNav from './navigations/SignUpNav.js'
import Profile2 from './screens/Profile2'
import Profile from './screens/Profile'
import HomeTab from './navigations/HomeTab.js'
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import Avater from './components/Avatar.js'
import MessengerNavigator from './navigations/MessengerNavigator.js'

export default function App() {
  return (
    <MessengerNavigator />
  );
}


const styles = StyleSheet.create({

});
