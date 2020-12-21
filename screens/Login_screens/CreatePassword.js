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
        {isDone&&<View style={styles.nextBtn}>
            <Button title={'Next'} color={'white'} onPress={()=>{navigation.navigate('HomeTab')}}  />   
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