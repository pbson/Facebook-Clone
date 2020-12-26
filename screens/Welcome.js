import React, { useEffect } from "react";
import {
    View,
    StyleSheet,
    ImageBackground,
} from "react-native";
import {
    responsiveHeight,
} from "react-native-responsive-dimensions";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Welcome = ({ navigation }) => {
    const checkTokenValid = async () => {
        let savedToken = await AsyncStorage.getItem('savedToken');
        console.log(savedToken);
        if (savedToken === null) {
            setTimeout(() => {
                navigation.navigate('Login')
            }, 2000);
        }
        const url = `http://192.168.0.140:3000/it4788/user/get_list_suggested_friends?token=${savedToken}&index=0&count=0`
        const fetchResult = async () => {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            const json = await response.json();
            if (json.code !== '1000' ){
                navigation.navigate('Login')
            }else{
                navigation.navigate('HomeTab')
            }
        }
        try {
            fetchResult()
        } catch (error) {
            Alert.alert(
                "Login fail",
                "Network is fuck up",
                [
                  { text: "OK", onPress: () => console.log("OK Pressed") }
                ],
                { cancelable: false }
            );
        }
    }
    useFocusEffect(React.useCallback(() => {
        checkTokenValid();
    }, []))

    return (
        <View style={styles.container}>
            <ImageBackground
                style={styles.image}
                source={require("../src/img/welcome.png")}
            >
            </ImageBackground>
        </View>

    );
};

export default Welcome;

const styles = StyleSheet.create({
    image: {
        height: responsiveHeight(100),
    },
    container: {
        flex: 1
    }
});
