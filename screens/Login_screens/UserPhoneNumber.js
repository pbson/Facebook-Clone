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


const UserPhoneNumber = ({route,navigation})=>{
const [phone, setPhone]=useState('')
const [isNextEmail, setIsNextEmail]= useState(false)

useEffect(()=>{
    if(phone=='') setIsNextEmail(false)
    else setIsNextEmail(true)
})
    return(
        <View style={styles.container} >
        <TouchableOpacity  style={styles.container} onPress={Keyboard.dismiss}>
                
                <Text  style={{color: '#1E90FF',fontSize: 20, padding: 20,fontWeight: 'bold'}}>What's your Mobile Number?</Text>
                <View style={styles.phoneInput}>
                    <TextInput placeholder={'Enter your mobile phone number'} placeholderTextColor={'#808080'} onChangeText={(text)=>{setPhone(text)}} />
                </View>
                <View style={{width: '90%',paddingTop: '4%',paddingBottom: '4%'}}>
                    <Text style={{textAlign: 'center',color: '#808080'}}>You'll use this phone number when you log in and if you ever need to reset your passwrod.</Text>
                </View>
                <View style={{  width: '90%',
                                height: '7%',
                                borderColor: '#808080',
                                borderWidth: 1,
                                borderRadius: 8,
                                justifyContent: 'center',
                                paddingLeft: '3%',
                                backgroundColor: 'white'}} >
                    <Button title={'Use your email address'} color={'#808080'} onPress={()=>{navigation.navigate('Email')}}/>
                </View>
                
        </TouchableOpacity>
        {isNextEmail&&<View style={styles.nextBtn}>
            <Button title={'Next'} color={'white'} onPress={()=>{navigation.navigate('CreatePassword',{
                first_name: route.params.first_name,
                last_name: route.params.last_name,
                date: route.params.date,
                gender:route.params.gender,
                phone: phone
            })}}  />   
            </View>}
        <View 
                onPress={()=>navigation.navigate('Login')}
                style={{
                    justifyContent: 'center',width: '100%',height: '7%',
                    alignItems: 'center',alignSelf: 'flex-end', borderTopColor: '#808080',
                    borderTopWidth: 1
                    }}>
                        <Text style={{color: '#1E90FF'}}>Already have an account?</Text>
                </View>
        </View>
    )
}
export default UserPhoneNumber
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