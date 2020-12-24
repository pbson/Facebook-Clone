import React from 'react';
import { StyleSheet } from 'react-native';
import Navigator from './navigations/MessengerNavigator'
import CreatePost from './screens/CreatePost.js'
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

export default function App() {
  return (
    <Navigator/>
  );
}

const styles = StyleSheet.create({

});
