import React,{ useEffect, useState } from 'react'
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

const AccountName = ({navigation})=>{
    const [first_name,setFirst]=useState('')
    const [last_name,setLast]=useState('')
    const [keyboardDiss, setKeyboardDis] = useState(true)
    const [nextB,setNextB] = useState(false)
    const dis = ()=>{
        Keyboard.dismiss();
        setKeyboardDis(false)
    }
    useEffect(()=>{
        setNextB((first_name!='')&&(last_name!=''))
    })
    return(
    <View style={styles.container}>
    <KeyboardAvoidingView behavior={'height'}  style={styles.container}>
        
        <TouchableOpacity onPress={dis} style={styles.container}>
                
                <Text  style={{color: '#1E90FF',fontSize: 20, padding: 20,fontWeight: 'bold'}}>What's Your Name?</Text>
                <View style={styles.textInput} >
                <TextInput placeholder={'First name'} onFocus={()=>setKeyboardDis(true)} onChangeText={(text)=>{setFirst(text)}} style={{borderWidth: 1, width: "43%", borderRadius: 5, borderColor: '#808080', paddingLeft: 10}}/>
                <TextInput placeholder={'Last name'}  onFocus={()=>setKeyboardDis(true)} onChangeText={(text)=>{setLast(text)}} style={{borderWidth: 1, width: "43%",borderRadius: 5, borderColor: '#808080' , paddingLeft: 10}}/>
                </View>
                <Text style={{padding: 10,color: '#696969',paddingLeft: 25,paddingRight: 25, textAlign: 'center'}}>Using your real name makes it easier for friends to recognize you</Text>
    
        </TouchableOpacity>
        
    </KeyboardAvoidingView>
    {nextB&&<TouchableOpacity onPress={()=>{navigation.navigate('UserBirth',{
                first_name: first_name,
                last_name: last_name
            })}} style={styles.nextBtn}>
            <Text style={{color: 'white'}}>Next</Text> 
        </TouchableOpacity >}
        <TouchableOpacity 
                onPress={()=>navigation.navigate('Login')}
                style={{
                    justifyContent: 'center',width: '100%',height: '7%',
                    alignItems: 'center',alignSelf: 'flex-end',
                     borderTopColor: '#808080',
                    borderTopWidth: 1
                    }}>
                        <Text style={{color: '#1E90FF'}}>Already have an account?</Text>
        </TouchableOpacity>
    </View>
    
    )
}
export default AccountName
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
     
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
        
    }
})