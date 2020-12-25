import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    Alert
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Avatar from '../components/Avatar'

const AddFriendList = ({ id, addFriendImg, addFriendName, addFriendMutual, isRequest }) => {

    const [addButton, setState] = useState('');
    const [friendState, setFriend] = useState('');
    const [showButton, setButton] = useState(true);
    const [showContainer, setContainer] = useState(true);

    useEffect(() => {
        if (isRequest === true) {
            setState('Confirm')
        } else {
            setState('Add friend')
        }
    }, []);
    const addButtonClick = async () => {
        if (isRequest === true) {
            let savedToken = await AsyncStorage.getItem('savedToken');
            const url = `http://192.168.0.140:3000/it4788/user/set_accept_friend?token=${savedToken}&user_id=${id}&is_accept=1`
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            const json = await response.json();
            if (json.code !== '1000') {
                Alert.alert(
                    "Send request fail",
                    json.message,
                    [
                        { text: "OK", onPress: () => console.log("OK Pressed") }
                    ],
                    { cancelable: false }
                );
            } else {
                setFriend('You have become friend')
                setButton(false)
            }
        } else {
            setState('Request sent')
            let savedToken = await AsyncStorage.getItem('savedToken');
            const url = `http://192.168.0.140:3000/it4788/user/set_request_friend?token=${savedToken}&user_id=${id}`
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            setFriend('Request has been sent')
            setButton(false)
            const json = await response.json();
        }
    }

    const deleteButtonClick = async () => {
        if (isRequest === true) {
            let savedToken = await AsyncStorage.getItem('savedToken');
            const url = `http://192.168.0.140:3000/it4788/user/set_accept_friend?token=${savedToken}&user_id=${id}&is_accept=0`
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            const json = await response.json();
            if (json.code !== '1000') {
                Alert.alert(
                    "Send request fail",
                    json.message,
                    [
                        { text: "OK", onPress: () => console.log(addFriendImg) }
                    ],
                    { cancelable: false }
                );
            } else {
                setFriend('Request for friends removed')
                setButton(false)
            }
        } else {
            setContainer(false)
        }
    }
    return (
        <View style={styles.container}>
            {showContainer ?
                <View style={styles.friendlistContainer}>
                    <Avatar url={addFriendImg}/>
                    <View style={styles.addFriendList}>
                        <Text style={styles.addFriendName}>
                            {addFriendName}
                        </Text>
                        <Text style={styles.friendState}>
                            {friendState}
                        </Text>
                        {showButton ? <View style={styles.addFriendButtonContainer}>
                            <View style={styles.addFriendButton}>
                                <TouchableOpacity
                                    onPress={addButtonClick}
                                    style={styles.ButtonAddStyle}
                                    activeOpacity={1}
                                    delayPressIn={0}>
                                    <Text style={styles.TextStyle}>{addButton}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.addFriendButton}>
                                <TouchableOpacity
                                    onPress={deleteButtonClick}
                                    style={styles.ButtonDeleteStyle}
                                    activeOpacity={0.2}
                                    delayPressIn={0}>
                                    <Text style={styles.TextStyleDelete}>
                                        Delete
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View> : null}
                    </View>
                </View> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10
    },
    friendlistContainer: {
        flexDirection: "row",
        marginTop: 10,
        marginBottom: 5
    },
    friendImg: {
        width: 100,
        height: 100,
        borderRadius: 100
    },
    addFriendList: {
        marginLeft: 10
    },
    addFriendName: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#1C1E21"
    },
    friendState: {
        color: 'grey',
        fontSize: 16,
    },
    addFriendMutual: {
        fontSize: 16,
        color: "#757A82",
        fontWeight: "bold"
    },
    addFriendButtonContainer: {
        flexDirection: "row",
        marginTop: 10
    },
    addFriendButton: {
        marginRight: 10,
        width: 90
    },
    ButtonAddStyle: {
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: "#1877F2",
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#fff",
        width: 90
    },
    TextStyle: {
        color: "#fff",
        textAlign: "center",
        fontWeight: "500"
    },
    ButtonDeleteStyle: {
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: "#EBEDF0",
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#fff",
        width: 90
    },
    TextStyleDelete: {
        color: "#1E2023",
        textAlign: "center",
        fontWeight: "500"
    }
});

export default AddFriendList;
