import React, { useEffect, useState } from "react";
import {
    ScrollView,
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    Alert
} from "react-native";
import {
    responsiveFontSize,
    responsiveHeight,
    responsiveScreenWidth,
    responsiveWidth,
} from "react-native-responsive-dimensions";
import NextIcon from '../assets/NextIcon.png'
import BackIcon from '../assets/NextIconBack.png'
import Note from '../assets/notice.png'
import CurrentPass from '../assets/currentPassword.png';
import Key from '../assets/key.png';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { block } from "react-native-reanimated";


const PasswordChange = ({ navigation }) => {

    const [currentPass, setCurrentPass] = useState('');
    const [NewPassword, setNewPassword] = useState('');
    const [ReTypeNewPassword, setReTypeNewPassword] = useState('');

    // useEffect(() => {
    //     clearInput()
    // },[])

    const clearInput = () => {
        setCurrentPass('')
        setNewPassword('')
        setReTypeNewPassword('')
    }

    const changePassword = async () => {

        if (NewPassword !== ReTypeNewPassword) {
            Alert.alert(
                "Retype password doesn't match"
            );
        }
        let savedToken = await AsyncStorage.getItem('savedToken');
        const url = `http://192.168.0.140:3000/it4788/user/change_password?token=${savedToken}&old_password=${currentPass}&new_password=${NewPassword}`
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
        const json = await response.json();
        if (json.code !== '1000') {
            Alert.alert(
                "Change password failed",
                json.message,
                [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ],
                { cancelable: false }
            );
        } else {
            Alert.alert(
                "Change password successfully",
            );
        }
    }


    return (
        <ScrollView style={styles.container}>

            <View style={styles.body} >
                <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}>
                    <Image style={{ width: 25, height: 25, marginLeft: 7 }} source={CurrentPass} />
                    <TextInput style={{ height: 30, width: '60%', borderColor: 'gray', borderWidth: 1, marginLeft: 7, marginTop: 4 }}
                        onChangeText={currentPass => setCurrentPass(currentPass)}
                        placeholder='Enter your password' />
                </View>

                <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}>
                    <Image style={{ width: 20, height: 20, marginLeft: 12 }} source={Key} />
                    <TextInput style={{ height: 30, width: '60%', borderColor: 'gray', borderWidth: 1, marginLeft: 7, marginTop: 4 }}
                        onChangeText={NewPassword => setNewPassword(NewPassword)}
                        placeholder='Enter new password' />
                </View>

                <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}>
                    <Image style={{ width: 20, height: 20, marginLeft: 12 }} source={Key} />
                    <TextInput style={{ height: 30, width: '60%', borderColor: 'gray', borderWidth: 1, marginLeft: 7, marginTop: 4 }}
                        onChangeText={ReTypeNewPassword => setReTypeNewPassword(ReTypeNewPassword)}
                        placeholder='Retype new password' />
                </View>

                <View style={{ alignItems: "center", justifyContent: "center" }} >
                    <TouchableOpacity delayPressIn={0} onPress={() => changePassword()} style={styles.confirm}>
                        <View  >
                            <Text style={{ color: 'white', fontSize: 16 }} >Update Password</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity delayPressIn={0} onPress={() => clearInput()} style={styles.cancel}>
                        <View  >
                            <Text style={{ fontSize: 16 }} >Cancel</Text>
                        </View>
                    </TouchableOpacity>

                </View>
            </View>
        </ScrollView>
    );
};

export default PasswordChange;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "lightgray",
    },
    header: {
        backgroundColor: 'white',
        height: responsiveHeight(8),
    },
    body: {
        margin: 8,
        backgroundColor: 'white',
        justifyContent: "center",
    },
    nameTitle: {
        margin: 7,
        fontSize: 18,
        // fontWeight: 700,
        marginTop: 10
    },
    back: {
        height: 28,
        width: 28,
        marginTop: 30,
        marginLeft: 7
    },
    note: {
        width: '94%',
        height: 120,
    },
    confirm: {
        backgroundColor: '#4267b2',
        height: 30,
        width: '94%',
        marginTop: 20,
        justifyContent: "center",
        alignItems: "center"
    },
    cancel: {
        backgroundColor: 'lightgray',
        height: 30,
        width: '94%',
        marginTop: 12,
        marginBottom: 30,
        justifyContent: "center",
        alignItems: "center"
    }
})