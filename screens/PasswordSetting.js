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
import NextIcon from '../assets/NextIcon.png'
import BackIcon from '../assets/NextIconBack.png'
import KeyIcon from '../assets/key.png';
import { block } from "react-native-reanimated";


const PasswordSetting = ({ navigation }) => {

    const onPress = () =>{
        navigation.navigate('passChange');
    }

    return(
        <ScrollView  style={styles.container}>
            {/* <View style = {styles.header} > */}
                {/* <TouchableOpacity> */}
                    {/* <Image style = {styles.back} source = {BackIcon} /> */}
                {/* </TouchableOpacity> */}
            {/* </View>  */}
            <View style = {styles.body} >
                <Text style = {{fontSize: 25, fontWeight: "bold"}} >Security</Text>
                <Text style = {{fontSize: 21, fontWeight: "bold", paddingTop: 14}} >Login</Text>
                <TouchableOpacity onPress = {onPress} >
                <View style = {styles.name} >
                    <Image style = {styles.keyIcon} source = {KeyIcon} />
                    <View>
                        <Text style = {{fontSize: 18, fontWeight: 550}}>Change password</Text>
                        <Text style = {{fontSize: 15, color: 'gray'}}>It's the good idea to use a strong password</Text>
                    </View>
                    <View>
                        <Image style = {styles.nextIcon} source = {NextIcon} />
                    </View>
                </View>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default PasswordSetting;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        padding: 10,
    },
    header: {
        height: responsiveHeight(7),
        borderBottomColor: '#E5E5E5',
        borderBottomWidth: 0.5,
        padding: 10
    }, 
    body: {
        padding: 10
    }, 
    name: {
        paddingTop: 14,
        justifyContent: "space-between",
        flexDirection: "row",
    },
    nextIcon: {
        height: 28, 
        width: 28,
        marginTop: 10
    },
    back: {
        height: 28, 
        width: 28,
        marginTop: 10   
    },
    keyIcon: {
        height: 25,
        width: 27,
        marginTop: 10,
        marginRight: 5
    }
})