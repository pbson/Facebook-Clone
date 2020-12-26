import React, { useEffect, useState } from 'react'
import {
    Keyboard, Animated, Text, StyleSheet, View, SafeAreaView, TouchableOpacity, TextInput,
    Image, Dimensions, KeyboardAvoidingView, StatusBar, PanResponder, TouchableHighlight, Modal, Alert,
    ActivityIndicator
} from 'react-native'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import MasonryList from "react-native-masonry-list";
import mime from "mime";
import * as Network from 'expo-network';
import HomeTab from '../navigations/HomeTab';

const CreatePost = ({ navigation }) => {
    const [text, setText] = useState('');
    const [images, setImage] = useState([]);
    const [uploadedImages, setUploadedImages] = useState([]);
    const [imagesCount, setImagesCount] = useState(0);
    const [isUploading, setUploading] = useState(false);

    const CheckConnectivity = async () => {
        const netInfo = await Network.getNetworkStateAsync();
        if (netInfo.isConnected == false) {
            Alert.alert(
                "Network error",
                "Network disconnected please try again",
                [
                    { text: "OK", onPress: () => navigation.navigate(HomeTab) }
                ],
                { cancelable: false }
            );
        }
    };

    const pickImage = async () => {
        let permission = await ImagePicker.requestCameraRollPermissionsAsync()
        if (permission.granted == false) {
            return;
        }
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            if (result.type == 'video') {
                setImagesCount(-1)
                const newImageUri = "file:///" + result.uri.split("file:/").join("");

                setImage([...images, { uri: newImageUri, type: mime.getType(newImageUri), name: newImageUri.split("/").pop() }]);
            } else {
                const newImageUri = "file:///" + result.uri.split("file:/").join("");

                setImage([...images, { uri: newImageUri, type: mime.getType(newImageUri), name: newImageUri.split("/").pop() }]);
                setImagesCount(imagesCount + 1)
            }
        }
    };

    const takeImage = async () => {
        let permission = await ImagePicker.requestCameraPermissionsAsync()
        if (permission.granted == false) {
            return;
        }
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            videoMaxDuration: 5
        });

        if (!result.cancelled) {
            if (result.type == 'video') {
                setImagesCount(-1)
                const newImageUri = "file:///" + result.uri.split("file:/").join("");
                console.log({ uri: newImageUri, type: mime.getType(newImageUri), name: newImageUri.split("/").pop() })

                setImage([...images, { uri: newImageUri, type: mime.getType(newImageUri), name: newImageUri.split("/").pop() }]);
            } else {
                const newImageUri = "file:///" + result.uri.split("file:/").join("");

                setImage([...images, { uri: newImageUri, type: mime.getType(newImageUri), name: newImageUri.split("/").pop() }]);
                setImagesCount(imagesCount + 1)
            }
        }
    };
    /////////////////////////////////////////////////
    const sendPost = async () => {
        console.log(images)
        setUploading(true)
        CheckConnectivity();
        let arr = []
        if (imagesCount!=-1 && images.length > 0) {
            for (let image of images) {
                let formData = new FormData();
                formData.append('file', image);
                formData.append('upload_preset', 'pbson639')
                formData.append('cloud_name', 'pbson639')
                const response = await fetch("https://api.cloudinary.com/v1_1/pbson639/image/upload", {
                    method: "post",
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                    body: formData
                })
                const data = await response.json();
                arr.push(data.secure_url)
            };
        }
        if (imagesCount == -1 && images.length > 0) {
            for (let image of images) {
                let formData = new FormData();
                formData.append('file', image);
                formData.append('upload_preset', 'pbson639')
                formData.append('cloud_name', 'pbson639')
                const response = await fetch("https://api.cloudinary.com/v1_1/pbson639/video/upload", {
                    method: "post",
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                    body: formData
                })
                const data = await response.json();
                arr.push(data.secure_url)
            };
        }

        let savedToken = await AsyncStorage.getItem('savedToken');
        const url = `http://192.168.0.140:3000/it4788/post/add_post2?token=${savedToken}&described=${text}&status=happy`
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(arr),
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
            }
        })
        const json = await response.json();
        if (json.code === '1000') {
            setUploading(false)
            navigation.goBack()
        } else {
            setUploading(false)
            Alert.alert(
                "Add post fail",
                json.message,
                [
                    { text: "OK" }
                ],
                { cancelable: false }
            );
        }

    }
    ////////////////////////////////////////////////
    const [modalVisible, setState] = useState(true)
    const dismis = () => {
        Keyboard.dismiss();
        pan.y.setValue(0);
    }
    const toggleModal = () => {
        navigation.goBack()
        setState(false)
    }

    let pan = new Animated.ValueXY();
    let panResponder = PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
            pan.setValue({
                x: pan.x._value,
                y: pan.y._value
            });
        },
        onPanResponderMove: Animated.event(
            [
                null,
                { dx: pan.x, dy: pan.y }
            ],
            { useNativeDriver: false }
        ),

        onPanResponderRelease: (event, gestureState) => {
            if (gestureState.dy < 20) { pan.y.setValue(0.0) }
            else { pan.y.setValue(screenHeight) }

        }
    })

    /////////////////////////////////////////////////         
    // const editorWrapperHeight = _editorWrapperHeight
    return (

        <Modal
            animationType="slide"
            hardwareAccelerated={true}
            transparent={true}
            visible={modalVisible}
            presentationStyle="overFullScreen"
        >

            <SafeAreaView style={styles.container}>
                <View style={styles.navigationBar}>
                    <TouchableOpacity onPress={() => toggleModal()} style={styles.naviIcon}>
                        <FontAwesome5Icon color="#000" name="times" size={20}></FontAwesome5Icon>
                    </TouchableOpacity>
                    <Text style={styles.naviTitle}>Create a Post</Text>
                    <TouchableOpacity style={styles.btnPost} onPress={() => sendPost()} disabled={false}>
                        <Text style={{ fontSize: 16, color: "#1E90FF", fontWeight: 'bold' }}>Post</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.infoWrapper}>
                    {/* <Image style={styles.avatar} source={{ uri: `http://${userInfo.avatar}` }}></Image> */}
                    <View>
                        {/* <Text style={styles.name}>{id}</Text> */}
                        <View style={styles.areaWrapper}>
                            <TouchableOpacity style={styles.areaOption} onPress={() => pan.y.setValue(0)}>
                                <FontAwesome5Icon style={{ marginRight: 3 }} name="globe-asia" size={14}> </FontAwesome5Icon>
                                <Text>Public</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                {isUploading ?
                        <View style={{
                            marginBottom: 20,
                        }}>
                            <ActivityIndicator
                                size="large"
                                color="blue"
                            />
                        </View>
                        : null}

                <View style={{ ...styles.editorWrapper }}>
                    <TextInput
                        onFocus={() => pan.y.setValue(screenHeight)}
                        placeholderTextColor={"black"}
                        placeholder="What's on your mind?"
                        placeholderTextColor="#808080"
                        onChangeText={text => setText(text)}
                        multiline numberOfLines={6}
                        style={{
                            ...styles.editor, fontSize: 20,
                            textAlign: 'left', fontWeight: 'normal'
                        }}>
                    </TextInput>
                    <View style={styles.imageList}>
                        <MasonryList
                            images={images}
                        />
                    </View>

                    <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={140} style={{ position: 'absolute', top: screenHeight / 1.44 }}>
                        <View style={styles.bottomTab}>
                            <TouchableHighlight disabled={imagesCount >= 4 || imagesCount<0} onPress={takeImage} >
                                <Image style={styles.bottomSheetIcon} source={require('../assets/icons/cam.png')} />
                            </TouchableHighlight>
                            <TouchableHighlight disabled={imagesCount >= 4 || imagesCount<0} onPress={pickImage} >
                                <Image style={styles.bottomSheetIcon} source={require('../assets/icons/pic.png')} />
                            </TouchableHighlight>
                            <TouchableHighlight onPress={dismis} >
                                <Image style={styles.bottomSheetIcon} source={require('../assets/icons/dot-icon.png')} />
                            </TouchableHighlight>
                        </View>
                    </KeyboardAvoidingView>

                    <Animated.View
                        style={{
                            transform: [{ translateY: pan.y }]
                        }}
                        {...panResponder.panHandlers}
                    >
                        <View style={styles.bottemSheet}>
                            <View style={{ flexDirection: "column" }}>

                                <View style={{ paddingTop: 8, paddingBottom: 16 }}>
                                    <View style={styles.grapper} />
                                </View>
                                <TouchableHighlight onPress={pickImage}>
                                    <View style={styles.itemStyle}>
                                        <Image source={require('../assets/icons/pic.png')} style={styles.bottomSheetIcon} />
                                        <Text >Photo/Video</Text>
                                    </View>
                                </TouchableHighlight>

                                <TouchableHighlight onPress={takeImage}>
                                    <View style={styles.itemStyle}>
                                        <Image source={require('../assets/icons/cam.png')} style={styles.bottomSheetIcon} />
                                        <Text>Camera</Text>
                                    </View>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </Animated.View>
                </View>
            </SafeAreaView>
        </Modal >

    )
}

const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);
export default CreatePost
const styles = StyleSheet.create({
    imageList: {
        paddingTop: 20,
        flex: 1,
    },
    parentContainer: {
        height: screenHeight,
        position: 'relative',
        top: StatusBar.currentHeight
    },
    container: {
        height: "100%",
        width: '100%',
        backgroundColor: '#fff'
    },
    navigationBar: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        height: screenHeight / 12,
        paddingTop: StatusBar.currentHeight
    },
    naviIcon: {
        padding: 10,
    },
    naviTitle: {
        paddingHorizontal: 10,
        fontSize: 16
    },
    btnPost: {
        position: 'absolute',
        right: 10,
        paddingTop: StatusBar.currentHeight,

    },
    infoWrapper: {
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },
    areaWrapper: {
        flexDirection: 'row'
    },
    areaOption: {
        marginRight: 10,
        paddingHorizontal: 5,
        paddingVertical: 2.5,
        borderColor: '#696969',
        borderWidth: 1,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center'
    },
    avatar: {
        marginRight: 10,
        borderRadius: 50,
        width: 40,
        height: 40
    },
    name: {
        fontSize: 14,
        fontWeight: 'bold'
    },
    editorWrapper: {
        overflow: 'visible',
        padding: 0,
        paddingHorizontal: 0,
        height: "100%",
        flexDirection: 'column'
    },
    editor: {
        top: 0,
        marginLeft: "5%",
        width: '90%',
    },
    toolOptionsWrapper: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        paddingBottom: 55,
    },
    optionsWrapper: {
        backgroundColor: '#fff',
        position: 'absolute',
        width: '100%',
        left: 0,
        zIndex: 999999
    },
    optionTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        height: 55,
        alignItems: 'center',
        borderTopColor: '#ddd',
        borderTopWidth: 1
    },
    optionImagesWrapper: {
        flexDirection: 'row',
        zIndex: 1
    },
    optionImage: {
        height: 25,
        resizeMode: "contain"
    },
    bgColorsWrapper: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        height: 50
    },
    bgColorsScrollView: {
        flexDirection: 'row'
    },
    btnBgColor: {
        height: 30,
        width: 30,
    },
    bgColor: {
        height: 30,
        width: 30,
        marginHorizontal: 5,
    },
    bgImage: {
        resizeMode: 'cover',
        height: 30,
        width: 30,
        borderRadius: 10,
        borderWidth: 1,

    },
    toggleBgColors: {
        padding: 5,
        borderWidth: 0,
        position: 'absolute',
        top: 0,
        left: 0
    },

    bottemSheet: {
        position: "absolute",
        top: screenHeight / 3,
        height: screenHeight,
        width: screenWidth,
        left: 0,
        backgroundColor: "white",
        borderRadius: 15,
        shadowOffset: { width: 0, height: 24, },
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: -1,
        },
        shadowOpacity: 0.3,
        shadowRadius: 5.00,
        flexDirection: "column",

    },
    grapper: {
        height: 5,
        width: 50,
        backgroundColor: "grey",
        alignSelf: 'center',
        borderRadius: 2,

    },
    itemStyle: {
        height: 50,
        alignItems: 'center',
        flexDirection: "row",

    },
    bottomSheetIcon: {
        marginRight: 10,
        marginLeft: 10,
        width: 30,
        height: 30,
    },
    bottomTab: {

        height: screenHeight / 11.5,
        width: screenWidth,
        left: 0,
        backgroundColor: "white",
        borderRadius: 15,
        shadowOffset: { width: 0, height: 24, },
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: -1,
        },
        shadowOpacity: 0.3,
        shadowRadius: 5.00,
        flexDirection: "row",
        justifyContent: 'space-around',
        alignItems: 'center'
    }

})
