import React,{ useEffect, useState } from 'react'
import { Dimensions } from 'react-native'
import {View,
    StyleSheet,
    TextInput,
    ImageBackground,
    TouchableHighlight,
    Alert,
    Text,
    Platform,
    Button,
    KeyboardAvoidingView,
    Keyboard,TouchableOpacity,
    } from 'react-native'
import { set } from 'react-native-reanimated'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button'
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CreatePassword = ({route,navigation})=>{
const [pass, setPass]=useState('')
const [isDone, setIsDone]= useState(false)
const set=(value)=>{
    setPass(value)
    console.log(value)
    setIsDone(true)
}
useEffect(()=>{
    if(pass=='') setIsDone(false)
    else setIsDone(true)
})

const registerForPushNotificationsAsync = async () => {
    const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
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

const setUserInfo = async () => {
    let city = 'Hanoi';
    let gender = route.params.gender;
    let avatar = 'https://res.cloudinary.com/pbson639/image/upload/v1608369177/Trend-Avatar-Facebook_1_thn6mc.jpg'
    let cover_image = "https://res.cloudinary.com/pbson639/image/upload/v1608905713/placeholder_dd64bj.png"
    let username = `${route.params.first_name} ${route.params.last_name}`

    let savedToken = await AsyncStorage.getItem('savedToken');
    const url = `http://192.168.43.210:3000/it4788/user/set_user_info?token=${savedToken}&username=${username}&city=${city}&gender=${gender}&avatar=${avatar}&cover_image=${cover_image}`
    console.log(url)
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    })
    const json = await response.json();
    console.log(json);
}

const signupUser = async () => {
    if (
        pass.length < 6 ||
        pass.length > 10 ||
        pass.trim() === route.params.phone.trim()
    ){
        Alert.alert(
            "Invalid password",
            "Please retype a different password",
            [
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ],
            { cancelable: false }
        );
    }else{
            let savedToken = await registerForPushNotificationsAsync();
    let url = `http://192.168.43.210:3000/it4788/user/signup?phonenumber=${route.params.phone}&password=${pass}&uuid=${savedToken}`
    console.log(url);
    const fetchResult = async () => {
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
                "Signup fail",
                json.message,
                [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ],
                { cancelable: false }
            );
        } else {
            console.log(json)
            await AsyncStorage.setItem('savedToken', json.token)
            setUserInfo()
            navigation.navigate('Login');
        }
    }
    try {
        fetchResult()
    } catch (error) {
        Alert.alert(
            "Login fail",
            "Network is error",
            [
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ],
            { cancelable: false }
        );
    }
    }
}

    return(
        <View style={styles.container} >
        <TouchableOpacity  style={styles.container} onPress={Keyboard.dismiss}>
                
                <Text  style={{color: '#1E90FF',fontSize: 20, padding: 20,fontWeight: 'bold'}}>Create a Password</Text>
                <View style={styles.phoneInput}>
                    <TextInput placeholder={'Enter your password'} placeholderTextColor={'#808080'} onChangeText={(text)=>{setPass(text)}} />
                </View>
                <View style={{width: '90%',paddingTop: '4%',paddingBottom: '4%'}}>
                    <Text style={{textAlign: 'center',color: '#808080'}}>Enter a combination of at least six numbers, letters and punctuation marks.</Text>
                </View>
                
        </TouchableOpacity>
        {isDone&&<TouchableOpacity onPress={()=>signupUser()} style={styles.nextBtn}>
            <Text style={{color: 'white'}}>Next</Text> 
        </TouchableOpacity >}
        <TouchableOpacity 
                onPress={()=>navigation.navigate('Login')}
                style={{
                    justifyContent: 'center',width: '100%',height: '7%',
                    alignItems: 'center',alignSelf: 'flex-end', borderTopColor: '#808080',
                    borderTopWidth: 1
                    }}>
                        <Text style={{color: '#1E90FF'}}>Already have an account?</Text>
                </TouchableOpacity>
        </View>
    )
}
export default CreatePassword
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch'
     
    },
    textInput: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: "100%",
        height: 40
    },
    nextBtn:{
        width: '100%',
        backgroundColor: '#1E90FF',
        height: "6%",
        marginTop: 20,
        justifyContent: 'center',
        borderRadius: 8,
        alignItems: 'center',
        
    },
    phoneInput:{
        width: '90%',
        height: '7%',
        borderColor: '#808080',
        borderWidth: 1,
        borderRadius: 8,
        justifyContent: 'center',
        paddingLeft: '3%'
    }
})