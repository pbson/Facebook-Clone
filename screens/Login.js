import React, { useEffect, useState } from "react";
import {
    View,
    StyleSheet,
    TextInput,
    ImageBackground,
    TouchableHighlight,
    Alert,
    Text,
    Platform
} from "react-native";
import {
    responsiveFontSize,
    responsiveHeight,
    responsiveWidth,
} from "react-native-responsive-dimensions";
import { Ionicons } from "@expo/vector-icons";
import * as Device from 'expo-device';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import HomeTab from "../navigations/HomeTab";

const Login = ({ navigation }) => {
    const [isPhonenumberHighlighted, setPhonenumberIsHighlighted] = useState(false)
    const [isPasswordHighlighted, setPasswordIsHighlighted] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [data, setData] = useState([]);

//    useEffect(() => {
 //       if (data.code != 0){
 //           Alert.alert('ohno')
 //       }
 //   }, []);

    const signInUser = () => {
        Alert.alert(
            "Alert Title",
            "My Alert Msg",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ],
            { cancelable: false }
          );

        const deviceId = Constants.installationId;

        let url = `http://localhost:3000/it4788/user/login?phonenumber=${username}&password=${password}&uuid=${deviceId}`
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
                    "Alert Title",
                    "Can't login at the moment, please try again",
                    [
                      { text: "OK", onPress: () => console.log("OK Pressed") }
                    ],
                    { cancelable: false }
                );
            }else{
                navigation.navigate(HomeTab)
            }
        }
        fetchResult()
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
                        onPress={() => Alert.alert('Simple Button pressed')}
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
