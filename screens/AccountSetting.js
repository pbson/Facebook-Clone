import React, { useEffect, useState } from "react";
import {
    ScrollView,
    View,
    StyleSheet,
    Text,
    FlatList,
    TouchableOpacity,
    Image
} from "react-native";
import {
    responsiveFontSize,
    responsiveHeight,
    responsiveScreenWidth,
    responsiveWidth,
} from "react-native-responsive-dimensions";
import ProfileIcon  from '../assets/Profile.png'
import FacebookDecor from '../assets/facebookDecor.png'
import SecurityIcon  from '../assets/security.png'
import * as WebBrowser from 'expo-web-browser';

const AccountSetting = ({ navigation }) => {

    const onPress1 = () =>{
        navigation.navigate('personalinfoSetting');
    }
    const onPress2 = () =>{
        navigation.navigate('passwordSetting');
    }
    const openWebpage = async (url) =>{
        await WebBrowser.openBrowserAsync(url);
    }

    return(
        <ScrollView  style={styles.container}>
            <View style = {{borderBottomColor: '#E5E5E5', borderBottomWidth: 6.5}} >
                <View style = {{padding: 10,}} >
                    <Text style = {{fontSize: 20, fontWeight: "bold"}} >Account setting</Text>
                    <Text style = {{fontSize: 14, color: 'gray'}}>Manage infomatin about you</Text>
                </View>
                
                <TouchableOpacity onPress = {onPress1} >
                <View style = {{padding: 10, flexDirection: "row",}}>
                    <Image style = {styles.profileIcon} source = {ProfileIcon} />
                    <View style = {{backgroundColor: 'white'}} >
                        <Text style = {{fontSize: 17, fontWeight: "bold"}} >Personal infomation</Text>
                        <Text style = {{fontSize: 14, color: 'gray'}}>Update your user name</Text>
                    </View>
                </View>
                </TouchableOpacity>
            </View>

            <View style = {{borderBottomColor: '#E5E5E5', borderBottomWidth: 6.5}} >
                <View style = {{padding: 10,}} >
                    <Text style = {{fontSize: 20, fontWeight: "bold"}} >Security</Text>
                    <Text style = {{fontSize: 14, color: 'gray'}}>Change your password</Text>
                </View>
    
                <TouchableOpacity onPress = {onPress2} >
                    <View style = {{padding: 10, flexDirection: "row",}}>
                        <Image style = {styles.securityIcon} source = {SecurityIcon} />
                        <View style = {{backgroundColor: 'white'}} >
                            <Text style = {{fontSize: 17, fontWeight: "bold"}} >Security</Text>
                            <Text style = {{fontSize: 14, color: 'gray'}}>Change your password</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>

            <View style = {styles.footer} >
                <Image style = {styles.facebookDecor} source = {FacebookDecor} />
                <Text style = {{fontSize: 20, fontWeight: "bold", marginLeft: 10}} >Legal and Policies</Text>
                <TouchableOpacity onPress={()=> openWebpage('https://www.facebook.com/terms.php')}>
                    <Text style = {{fontSize: 15, marginLeft: 10, marginTop: 10}} >Terms of service</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> openWebpage('https://www.facebook.com/policy.php')}>
                   <Text style = {{fontSize: 15, marginLeft: 10, marginTop: 10}} >Data policy </Text>
                </TouchableOpacity>
                <TouchableOpacity  onPress={()=> openWebpage('https://www.facebook.com/policies/cookies')}>
                   <Text style = {{fontSize: 15, marginLeft: 10, marginTop: 10}} >Cookie policy</Text>
               </TouchableOpacity>
               <TouchableOpacity  onPress={()=> openWebpage('https://www.facebook.com/communitystandards/')}>
                   <Text style = {{fontSize: 15, marginLeft: 10, marginTop: 10}} >Community standards </Text>
               </TouchableOpacity>
            </View>

        </ScrollView>
    );
};

export default AccountSetting;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        padding: 10,
    },
    headerSearch: {
        padding: 10,
        borderBottomColor: '#E5E5E5',
        borderBottomWidth: 0.5
    },
    searchBox: {
        backgroundColor: 'lightgray',
        height: responsiveHeight(5),
        borderRadius: 18,
        justifyContent: "center"
    },
    textSearch: {
        fontSize: 15,
        paddingLeft: 10,
    },
    profileIcon:{
        width: 37,
        height: 37,
        borderRadius: 37,
        marginRight: 10,
        marginTop: 3
    },
    securityIcon: {
        width: 32,
        height: 36,
        marginRight: 10,
        marginTop: 3
    }, 
    footer: {

    },
    facebookDecor: {
        width: 200,
        height: 20,
        marginTop: 15,
        marginBottom: 15,
    }
})