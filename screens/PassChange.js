import React, { useEffect, useState } from "react";
import {
    ScrollView,
    View,
    StyleSheet,
    Text,
    FlatList,
    TouchableOpacity,
    Image,
    TextInput,
    Button
} from "react-native";
import {
    responsiveFontSize,
    responsiveHeight,
    responsiveScreenWidth,
    responsiveWidth,
} from "react-native-responsive-dimensions";
import NextIcon from '../assets/NextIcon.png'
import BackIcon from '../assets/NextIconBack.png'
import Note from '../assets/notice.png'
import CurrentPass from '../assets/currentPassword.png';
import Key from '../assets/key.png';

import { block } from "react-native-reanimated";


const PasswordChange = ({ navigation }) => {

    const [currentPass, setCurrentPass] = useState('');
    const [NewPassword, setNewPassword] = useState('');
    const [ReTypeNewPassword, setReTypeNewPassword] = useState('');
    

    return(
        <ScrollView  style={styles.container}>

            <View style = {styles.body} >
                <View style = {{flexDirection: "row", alignItems: "center", marginTop: 10}}>
                    <Image style = {{width: 25, height: 25, marginLeft: 7}} source = {CurrentPass} />
                    <TextInput style={{ height: 30, width: '60%' , borderColor: 'gray', borderWidth: 1, marginLeft: 7, marginTop: 4 }}
                     onChangeText={currentPass => setCurrentPass(currentPass)}
                     placeholder="Current password" />
                </View>

                <View style = {{flexDirection: "row", alignItems: "center", marginTop: 10}}>
                    <Image style = {{width: 20, height: 20, marginLeft: 12}} source = {Key} />
                    <TextInput style={{ height: 30, width: '60%' , borderColor: 'gray', borderWidth: 1, marginLeft: 7, marginTop: 4 }}
                     onChangeText={NewPassword => setReTypeNewPassword(NewPassword)}
                     placeholder="New password" />
                </View>

                <View style = {{flexDirection: "row", alignItems: "center", marginTop: 10}}>
                    <Image style = {{width: 20, height: 20, marginLeft: 12}} source = {Key} />
                    <TextInput style={{ height: 30, width: '60%' , borderColor: 'gray', borderWidth: 1, marginLeft: 7, marginTop: 4 }}
                     onChangeText={ReTypeNewPassword => setUserName(ReTypeNewPassword)}
                     placeholder="Re-type new password" />
                </View>

                <View style = {{alignItems: "center", justifyContent: "center"}} >
                    <TouchableOpacity style = {styles.confirm}>
                    <View  >
                        <Text style = {{color: 'white', fontSize: 16}} >Update Password</Text>
                    </View>
                    </TouchableOpacity>

                    <TouchableOpacity style = {styles.cancel}>
                    <View  >
                        <Text style = {{ fontSize: 16}} >Cancel</Text>
                    </View>
                    </TouchableOpacity>

                </View>
            </View>
        </ScrollView>
    );
};

export default PasswordChange;

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
        justifyContent: "center",
    },
    nameTitle: {
        margin: 7,
        fontSize: 18,
        // fontWeight: 700,
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
        justifyContent: "center",
        alignItems: "center"
    },
    cancel: {
        backgroundColor: 'lightgray',
        height: 30,
        width: '94%',
        marginTop: 12,
        marginBottom: 30,
        justifyContent: "center",
        alignItems: "center"
    }
})