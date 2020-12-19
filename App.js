import React from 'react';
import { StyleSheet } from 'react-native';
import Navigator from './navigations/MessengerNavigator'
import CreatePost from './screens/CreatePost.js'
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import settingProfile from '../Facebook-Clone/screens/settingProfile.js';
import Profile2 from '../Facebook-Clone/screens/Profile2.js';

export default function App() {
  return (
    <Profile2/>
  );
}

const styles = StyleSheet.create({

});
