import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import MessengerHomeTab from "../navigations/MessengerHomeTab";

const HomePageHeaderButton = ({navigation}) => {
  const openChatScreen = () => {
    navigation.navigate('MessengerHomeTab')
  }

  return (
    <View style={styles.headerLeftContainer}>
      <TouchableOpacity onPress={openChatScreen} style={styles.button}>
        <Ionicons name="ios-search" size={responsiveFontSize(3)} />
      </TouchableOpacity>
      <TouchableOpacity onPress={openChatScreen} style={styles.button}>
        <Ionicons name="ios-chatbubbles" size={responsiveFontSize(3)} />
      </TouchableOpacity>
    </View>
  );
}

export default HomePageHeaderButton

const styles = StyleSheet.create({
    headerLeftContainer: {
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'space-around'
    },
    button: {
        backgroundColor: 'rgba(211,211,211,0.2)',
        borderRadius: 200,
        padding: 5,
        marginHorizontal: 5,
        justifyContent:'center',
        alignItems: 'center',
        width: 35,
        height: 35
    }
})