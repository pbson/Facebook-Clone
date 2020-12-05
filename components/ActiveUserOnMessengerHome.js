import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image
} from "react-native";
import {
    responsiveFontSize,
    responsiveHeight,
    responsiveWidth,
  } from "react-native-responsive-dimensions";

const ActiveUserOnMessengerHome = () => {
  return (
    <TouchableOpacity activeOpacity={0.7} style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={
            {
                uri: 'https://images.unsplash.com/photo-1605428265679-09d3898e1f34?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=800&ixlib=rb-1.2.1&q=80&w=1000'
            }
          }
        />
        <View style={styles.onlineStatus}/>
      </View>
      <Text style={styles.name}>
          Name
      </Text>
    </TouchableOpacity>
  );
};

export default ActiveUserOnMessengerHome;

const styles = StyleSheet.create({
    container : {
        width : responsiveWidth(20),
        justifyContent : 'center',
        alignItems : 'center',
        marginTop: 10
    },
    imageContainer : {
        height : responsiveHeight(7),
        width : responsiveHeight(7)
    },
    name : {
        flex : 1,
        textAlign : 'center',
        fontSize : responsiveFontSize(1.5),
    },
    image : {
        width : '100%',
        height : '100%',
        borderRadius : 200,
    },
    onlineStatus : {
        width : 15,
        height : 15,
        backgroundColor : 'green',
        borderRadius : 200,
        position : 'absolute',
        bottom : 1,
        right : 1,
        borderWidth : 2,
        borderColor : 'white'
    }
});
