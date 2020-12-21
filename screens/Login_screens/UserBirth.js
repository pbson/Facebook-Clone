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
    import DateTimePicker from '@react-native-community/datetimepicker';

const UserBirth= ({navigation,route})=>{
    const [Birth,setBirth]=useState('')
    const [keyboardDiss, setKeyboardDis] = useState(true)
    const dis = ()=>{
        Keyboard.dismiss();
        setKeyboardDis(false)
    }
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [check, setCheck] = useState(false)
    const day = date.toDateString()
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
      };
      const changeDate=()=>{
        setShow(true)
        console.log(day)

      }
      useEffect(()=>{
        const da = new Date()
        setCheck((da-date)>94670778000)
        console.log(da.toDateString())
        console.log((da-date)>94670778000)
      })
    return(
        <View style={styles.container}>
    <KeyboardAvoidingView behavior={'height'}  style={styles.container}>
        
        <TouchableOpacity onPress={dis} style={styles.container}>
                
                <Text  style={{color: '#1E90FF',fontSize: 20, padding: 20,fontWeight: 'bold'}}>When's your Birthday</Text>
                <View style={styles.textInput} >
                <TouchableOpacity onPress={changeDate} style={{borderWidth: 1, width: "43%", borderRadius: 5, borderColor: '#808080', paddingLeft: 10,justifyContent: 'center'}}>
                    <Text >{day}</Text>
                </TouchableOpacity>
                
                </View>
                
                <Text style={{padding: 10,color: '#696969',paddingLeft: 25,paddingRight: 25, textAlign: 'center'}}>Using your real name makes it easier for friends to recognize you</Text>
                
                {show&&<DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={'date'}
                    is24Hour={true}
                    display="spinner"
                    onChange={onChange}
                    style={{width: 320, backgroundColor: "white"}}
            />}
                
                
        </TouchableOpacity>
        
        
    </KeyboardAvoidingView>
    {check&&<View style={styles.nextBtn}>
    <Button title={'Next'} color={'white'} onPress={()=>{navigation.navigate('UserGender',{
        first_name: route.params.first_name,
        last_name: route.params.last_name,
        date: date
    })}}  />   
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
export default UserBirth
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