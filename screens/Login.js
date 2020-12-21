import React, { useEffect, useState } from "react";
import {
    View,
    StyleSheet,
    TextInput,
    ImageBackground,
    TouchableHighlight,
    Alert,
    Text,
} from "react-native";
import {
    responsiveFontSize,
    responsiveHeight,
    responsiveWidth,
} from "react-native-responsive-dimensions";
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeTab from "../navigations/HomeTab";
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

const Login = ({ navigation }) => {
    const [isPhonenumberHighlighted, setPhonenumberIsHighlighted] = useState(false)
    const [isPasswordHighlighted, setPasswordIsHighlighted] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [data, setData] = useState([]);
    const [hasUnsavedChanges, setUnsavedChanges] = useState(true);

    const registerForPushNotificationsAsync = async () => {
        const {status} = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        if (status != 'granted') {
          const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
          // finalStatus = status;
        }
        if (status !== 'granted') {
          alert('Failed to get push token for push notification!');
          return;
        }
        let token = (await Notifications.getExpoPushTokenAsync()).data;
        return token
    };

    useEffect(
        () =>
          navigation.addListener('beforeRemove', (e) => {
            if (!hasUnsavedChanges) {
                return;
            }else{
                e.preventDefault();
                navigation.dispatch(e.data.action)
            }
          }),
        [navigation, hasUnsavedChanges]
      );

    const signInUser = async () => {
        let savedToken = await registerForPushNotificationsAsync();
        let url = `http://192.168.0.140:3000/it4788/user/login?phonenumber=${username}&password=${password}&uuid=${savedToken}`
        const fetchResult = async () => {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            const json = await response.json();
            setData(json);
            if (json.code !== '1000' ){
                Alert.alert(
                    "Login fail",
                    json.message,
                    [
                      { text: "OK", onPress: () => console.log("OK Pressed") }
                    ],
                    { cancelable: false }
                );
            }else{
                await AsyncStorage.setItem('savedToken', json.data.token)
                setUnsavedChanges(false)
                navigation.navigate(HomeTab,{
                    userId: json.data.id,
                    userPhonenumber: json.data.phoneNumber,
                    userAvatar: json.data.avatar
                })
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

    return (
        <View style={styles.container}>
            <View style={styles.bannerContainer}>
                <ImageBackground
                    style={isPhonenumberHighlighted || isPasswordHighlighted ? styles.WithoutBanner : styles.bannerImg}
                    source={isPhonenumberHighlighted || isPasswordHighlighted ? require("../src/img/facebookLogo.png") : require("../src/img/banner.png")}
                >
                </ImageBackground>
            </View>
            <View style={styles.formInputContainer}>
                <TextInput
                    style={[styles.formInput, isPhonenumberHighlighted && styles.isHighlighted]}
                    onChangeText  = {(username)=> setUsername(username)}
                    onFocus={() => { setPhonenumberIsHighlighted(true) }}
                    onBlur={() => { setPhonenumberIsHighlighted(false) }}
                    placeholder="Phone number or Email"
                />
                <TextInput
                    style={[styles.formInput, isPasswordHighlighted && styles.isHighlighted]}
                    onChangeText  = {(password)=> setPassword(password)}
                    onFocus={() => { setPasswordIsHighlighted(true) }}
                    onBlur={() => { setPasswordIsHighlighted(false) }}
                    placeholder="Password"
                    secureTextEntry={true}
                />
                <View style={styles.signinButtonContainer}>
                    <TouchableHighlight
                        style={styles.signinButton}
                        onPress={signInUser}
                        color="#4267B2">
                        <Text style={styles.signinButtonText} >Login</Text>
                    </TouchableHighlight>
                </View>
                <View style={styles.orTextContainer}>
                    <View style={styles.orTextLine} />
                    <Text style={styles.orText}>Or</Text>
                    <View style={styles.orTextLine} />
                </View>
                <View style={styles.signinButtonContainer}>
                    <TouchableHighlight
                        style={isPhonenumberHighlighted || isPasswordHighlighted ? styles.WithoutBannerSignupButton : styles.signupButton}
                        onPress={() => (navigation.navigate('CreateAccount'))}
                    >
                        <Text
                            style={isPhonenumberHighlighted || isPasswordHighlighted ? styles.WithoutBannerSignupButtonText : styles.signinButtonText}
                        >
                            Create new Facebook Account
                        </Text>
                    </TouchableHighlight>
                </View>
            </View>
        </View>

    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    bannerContainer: {
        marginBottom: responsiveHeight(10)
    },
    bannerImg: {
        height: 250,
        width: "100%"
    },
    WithoutBanner: {
        alignSelf: "center",
        height: 75,
        width: 75,
        marginTop: 40,
    },
    formInputContainer: {
        flex: 1,
        alignContent: 'center',
        width: "100%"
    },
    formInput: {
        marginLeft: responsiveHeight(5),
        width: "80%",
        alignItems: 'center',
        height: responsiveHeight(5),
        borderBottomColor: "#ECEAEC",
        borderBottomWidth: responsiveWidth(0.5),
        marginBottom: 10,
        fontSize: responsiveFontSize(2.5)
    },
    isHighlighted: {
        borderBottomColor: '#0078FF',
    },
    signinButtonContainer: {
        marginTop: responsiveHeight(2),
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        width: "80%",
        height: responsiveHeight(10)
    },
    signinButton: {
        alignItems: "center",
        justifyContent: "center",
        height: responsiveHeight(5.5),
        width: "100%",
        backgroundColor: "#0078FF",
        borderRadius: 5
    },
    signupButton: {
        alignItems: "center",
        justifyContent: "center",
        height: responsiveHeight(5.5),
        width: "100%",
        backgroundColor: "#1CA45C",
        borderRadius: 5
    },
    WithoutBannerSignupButton: {
        alignItems: "center",
        justifyContent: "center",
        height: responsiveHeight(5.5),
        width: "100%",
    },
    WithoutBannerSignupButtonText: {
        color: "#0078FF",
        fontWeight: "bold",
        fontSize: responsiveFontSize(2.5)
    },
    signinButtonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: responsiveFontSize(2.5)
    },
    orTextContainer: {
        flexDirection: "row",
        marginTop: 40
    },
    orTextLine: {
        width: "45%",
        borderBottomWidth: 1,
        borderBottomColor: "#ddd"
    },
    orText: {
        width: "10%",
        paddingLeft: 15,
        marginBottom: -6
    }
});
