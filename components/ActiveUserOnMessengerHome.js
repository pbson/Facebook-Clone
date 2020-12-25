import React, { useEffect, useState } from "react";
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
import AsyncStorage from '@react-native-async-storage/async-storage';

const ActiveUserOnMessengerHome = ({ navigation, id, username, is_online, avatar, userId }) => {
  const [data, setData] = useState([]);

  const openChatView = () => {
    const fetchResult = async () => {
        let savedToken = await AsyncStorage.getItem('savedToken');
        let url = `http://94e260158450.ngrok.io/it4788/chatsocket/set_conversation?token=${savedToken}&partnerid=${id}`
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
        const json = await response.json();
        setData(json.data);
        navigation.navigate('ChatView', {
          conversationId: json.data,
          userId: userId,
          partnerId: id,
          username: username,
          proPicUrl: avatar,
        })
    }
    fetchResult()
  }

  return (
    <TouchableOpacity activeOpacity={0.3} delayPressIn={0} style={styles.container} onPress={() => openChatView()}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={
            {
              uri: avatar
            }
          }
        />
        {is_online ? <View style={styles.onlineStatus} /> : null}
      </View>
      <Text style={styles.name}>
        {username}
      </Text>
    </TouchableOpacity>
  );
};

export default ActiveUserOnMessengerHome;

const styles = StyleSheet.create({
  container: {
    width: responsiveWidth(20),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  imageContainer: {
    height: responsiveHeight(7),
    width: responsiveHeight(7)
  },
  name: {
    flex: 1,
    textAlign: 'center',
    fontSize: responsiveFontSize(1.5),
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 200,
  },
  onlineStatus: {
    width: 15,
    height: 15,
    backgroundColor: 'green',
    borderRadius: 200,
    position: 'absolute',
    bottom: 1,
    right: 1,
    borderWidth: 2,
    borderColor: 'white'
  }
});
