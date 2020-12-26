import React, { useEffect, useState } from "react";
import {
    ScrollView,
    View,
    StyleSheet,
    Text,
    TouchableNativeFeedback,
    TouchableOpacity,
    Image,
    Dimensions,
    Alert
} from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Item from './Item'
import mime from "mime";
import { useFocusEffect } from '@react-navigation/native';
import { update } from "lodash";

const EditProfile = ({ navigation }) => {
    const [image, setImage] = useState({});
    const [userInfo, setUser] = useState({});

    const getUserInfo = async () => {
        let savedToken = await AsyncStorage.getItem('savedToken');
        const url = `http://192.168.43.210:3000/it4788/user/get_user_info?token=${savedToken}`
        setTimeout(() => {

        }, 2000);
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
        const json = await response.json();
        setUser(json.data);
    }

    const takeImage = async (ola) => {
        let permission = await ImagePicker.requestCameraRollPermissionsAsync()
        if (permission.granted == false) {
            return;
        }
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.1,
        });
        if (!result.cancelled) {
            const newImageUri = "file:///" + result.uri.split("file:/").join("");
            setImage({ uri: newImageUri, type: mime.getType(newImageUri), name: newImageUri.split("/").pop() });
        }
        await updateImage(ola)
    };
    const updateImage = async (ola) => {
        if (image) {
            let formData = new FormData();
            formData.append('file', image);
            formData.append('upload_preset', 'pbson639')
            formData.append('cloud_name', 'pbson639')
            try {
                const response = await fetch("https://api.cloudinary.com/v1_1/pbson639/image/upload", {
                    method: "post",
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                    body: formData
                })
                var data = await response.json();
                await changeCover(ola, data.secure_url)
            } catch (error) {
                Alert.alert('Error', 'Network error', [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                    ],
                    { cancelable: true });
            }
        }
    }
    const changeCover = async (ola, data) => {
        let savedToken = await AsyncStorage.getItem('savedToken');
        const url = `http://192.168.43.210:3000/it4788/user/set_user_info?token=${savedToken}&${ola}=${data}`
        console.log(url);
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            let json = await response.json();
            console.log(json);
            Alert.alert('Succesfully', 'Change image successfully', [
                { text: "OK", onPress: () => {navigation.goBack()} }
                ],
                { cancelable: true });
        } catch (error) {
            Alert.alert('Error', 'Network error', [
                { text: "OK", onPress: () => console.log("OK Pressed") }
                ],
                { cancelable: true });
        }


    }
    const updateCover = () => {
        takeImage('cover_image');
    }
    const updateAvatar = () => {
        takeImage('avatar');
    }
    useFocusEffect(React.useCallback(() => {
        getUserInfo();
    }, []))
    return (
        <ScrollView>
            <View style={{
                borderBottomWidth: 0.5,
            }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.title}>Profile Picture </Text>
                    <TouchableNativeFeedback onPress={() => updateAvatar()}>
                        <Text style={styles.editText}>Edit</Text>
                    </TouchableNativeFeedback>
                </View>

                <Image style={{
                    width: '40%',
                    height: undefined,
                    alignSelf: 'center',
                    aspectRatio: 1,
                    borderRadius: 80,
                    marginBottom: '5%'
                }} source={{ uri: userInfo.avatar }} />
            </View>
            <View style={{
                borderBottomWidth: 0.5,
            }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.title}>Cover Picture </Text>
                    <TouchableNativeFeedback onPress={() => updateCover()}>
                        <Text style={styles.editText}>Edit</Text>
                    </TouchableNativeFeedback>
                </View>
                <Image style={{
                    width: '95%',
                    alignSelf: 'center',
                    borderRadius: 5,
                    height: undefined,
                    aspectRatio: 5 / 3,
                    marginBottom: '5%'
                }} source={{ uri: userInfo.cover_image }} />
            </View>
        </ScrollView>
    )
}
export default EditProfile

const styles = StyleSheet.create({
    title: {
        flexDirection: "row",
        justifyContent: 'flex-start',
        marginLeft: '2%',
        padding: '3%',
        fontWeight: 'bold',
        fontSize: 20
    },
    editText: {
        flexDirection: "row",
        justifyContent: 'flex-start',
        marginLeft: '2%',
        padding: '3%',
        fontWeight: 'bold',
        fontSize: 20,
        color: '#0078ff'
    },
    aboutButtom: {
        width: '95%',
        backgroundColor: '#00FFFF',
        aspectRatio: 10,
        height: undefined,
        alignSelf: 'center',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    detail: {
        alignSelf: 'stretch',
        marginLeft: '3%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row', alignItems: 'center', padding: '3%'

    }

})