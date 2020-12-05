import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MessengerHome from './screens/MessengerHome'
import Navigator from './navigations/Navigator'

export default function App() {
  return (
    <Navigator/>
  );
}

const styles = StyleSheet.create({

});
