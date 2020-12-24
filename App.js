import React from 'react';
import { StyleSheet } from 'react-native';
//import Navigator from '../navigations/MessengerNavigator.js'
import Navigator from '../Facebook-Clone/navigations/ProfileNavigator.js'
import CreatePost from './screens/CreatePost.js'
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import settingProfile from '../Facebook-Clone/screens/settingProfile.js';
import Profile2 from '../Facebook-Clone/screens/Settings.js';
import { Navigation } from 'react-native-navigation';

export default function App() {
  return (
    <Navigator/>
  );
}

const styles = StyleSheet.create({

});
