import React, { useEffect, useState } from "react";
import {
    ScrollView,
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    Alert,
} from "react-native";
import {
    responsiveHeight,
} from "react-native-responsive-dimensions";
import NextIcon from '../assets/NextIcon.png'
import BackIcon from '../assets/NextIconBack.png'
import Note from '../assets/notice.png'
import { block } from "react-native-reanimated";
import AsyncStorage from '@react-native-async-storage/async-storage';

const NameSetting = ({ navigation }) => {

    const [userName, setUserName] = useState('');
    const changeUsername = async () => {
        let savedToken = await AsyncStorage.getItem('savedToken');
        const url = `http://192.168.43.210:3000/it4788/user/set_user_info?token=${savedToken}&username=${userName}`
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
                "Change username failed",
                json.message,
                [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ],
                { cancelable: false }
            );
        } else {
            Alert.alert(
                "Change username successfully",
            );
        }
    }

    return(
        <ScrollView  style={styles.container}>
            {/* <View style = {styles.header} > */}
                {/* <TouchableOpacity> */}
                {/* <Image style = {styles.back} source = {BackIcon} /> */}
                {/* </TouchableOpacity> */}
            {/* </View> */}
            <View style = {styles.body} >
                <View style = {{borderBottomColor: '#E5E5E5', borderBottomWidth: 0.5,}} >
                    <Text style = {styles.nameTitle} >Name</Text>
                </View>
                <View>
                    <Text style = {{fontSize: 16, marginLeft: 7, marginTop: 10}} >User name</Text>
                    <TextInput style={{ height: 30, width: '60%' , borderColor: 'gray', borderWidth: 1, marginLeft: 7, marginTop: 4 }}
                     onChangeText={userName => setUserName(userName)}
                     placeholder="user name" />
                </View>
                <View style = {{alignItems: "center", justifyContent: "center", marginTop: 15}} >
                    <Image style = {styles.note} source = {Note} />
                    <TouchableOpacity onPress = {()=> changeUsername()} style = {styles.confirm}>
                    <View  >
                        <Text style = {{color: 'white', fontSize: 16}} >Confirm</Text>
                    </View>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

export default NameSetting;

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
        height: 300,
        justifyContent: "center",
    },
    nameTitle: {
        margin: 7,
        fontSize: 18,
        // fontWeight: '700',
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
        marginBottom: 30,
        justifyContent: "center",
        alignItems: "center"
    }
})