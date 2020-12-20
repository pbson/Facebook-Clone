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

    } from 'react-native'


const CreateAccount = ({navigation})=> {
        return (
            <View style={styles.container} >
                <Text style={{color: '#1E90FF',
            fontSize: 20, padding: 20,fontWeight: 'bold'}}>Join Facebook</Text>
                <Text style={{color: '#808080',paddingBottom: 20}}>We'll help you create an account in a few easy steps.</Text>
                <TouchableHighlight onPress={()=>navigation.navigate('AccountName')} style={styles.buttonStart}>
                    <Text style={{alignSelf: 'center',color: 'white'
                }}>Get Started</Text>
                </TouchableHighlight>
                <View 
                style={{
                    justifyContent: 'center',width: '100%',height: '7%',
                    alignItems: 'center',alignSelf: 'flex-end',position: 'absolute',
                    top: '93%', borderTopColor: '#808080',
                    borderTopWidth: 1
                    }}>
                        <Text style={{color: '#1E90FF'}}>Already have an account?</Text>
                </View>
            </View>

        )

    }
export default CreateAccount
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    buttonStart:{
        width: '90%',
        backgroundColor: '#1E90FF',
        borderRadius: 8,
        height: '5%',
        justifyContent: 'center',
        
        

    },

})
