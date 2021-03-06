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


const Email = ({route,navigation})=>{
const [phone, setPhone]=useState('')
const [emailNext, setNext]= useState(false)
const set=(value)=>{
    setGender(value)
    console.log(value)
    setNext(true)
}
useEffect(()=>{
    if(phone=='') setNext(false)
    else setNext(true)
})
const checkPhoneNumber = () => {
    const vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
    if (!vnf_regex.test(phonenumber)){
        Alert.alert(
            "Invalid phonenumber",
            "Please retype a different phonenumber",
            [
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ],
            { cancelable: false }
        );
    }
}
    return(
        <View style={styles.container}>
        <TouchableOpacity  style={styles.container} onPress={Keyboard.dismiss}>
                
                <Text  style={{color: '#1E90FF',fontSize: 20, padding: 20,fontWeight: 'bold'}}>What's your Mobile Nunber?</Text>
                <View style={styles.phoneInput}>
                    <TextInput placeholder={'Enter your email'} placeholderTextColor={'#808080'} onChangeText={(text)=>{setPhone(text)}} />
                </View>
                <View style={{width: '90%',paddingTop: '4%',paddingBottom: '4%'}}>
                    <Text style={{textAlign: 'center',color: '#808080'}}>You'll use this email when you log in and if you ever need to reset your passwrod.</Text>
                </View>
                <View style={{  width: '90%',
                                height: '7%',
                                borderColor: '#808080',
                                borderWidth: 1,
                                borderRadius: 8,
                                justifyContent: 'center',
                                paddingLeft: '3%',
                                backgroundColor: 'white'}} >
                    <Button title={'Use your phone number'} color={'#808080'} onPress={()=>{navigation.navigate('UserPhoneNumber')}}/>
                </View>
        </TouchableOpacity>
        {emailNext&&<View style={styles.nextBtn}>
            <Button title={'Next'} color={'white'} onPress={()=>{console.log(route.params); checkPhoneNumber()}}  />   
            </View>}
        <View 
                onPress={()=>navigation.navigate('Login')}
                style={{
                    justifyContent: 'center',width: '100%',height: '7%',
                    alignItems: 'center',alignSelf: 'flex-end'
                    , borderTopColor: '#808080',
                    borderTopWidth: 1
                    }}>
                        <Text style={{color: '#1E90FF'}}>Already have an account?</Text>
                </View>
        </View>

    )
}
export default Email
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
        width: 390,
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