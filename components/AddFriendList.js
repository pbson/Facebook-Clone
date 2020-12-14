import React, { useState } from "react";
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity
} from "react-native";

const AddFriendList = ({ addFriendImg, addFriendName, addFriendMutual }) => {

    const [addButton, setState] = useState('Confrim');

    const addButtonClick = () => {
        setState('Added')
    }

    return (
        <View style={styles.container}>
            <View style={styles.friendlistContainer}>
                <View>
                    <View>
                        <Image
                            style={styles.friendImg}
                            source={addFriendImg}
                        />
                    </View>
                </View>
                <View style={styles.addFriendList}>
                    <Text style={styles.addFriendName}>
                        {addFriendName}
                    </Text>
                    <Text style={styles.addFriendMutual}>
                        {addFriendMutual} mutual friends
                        </Text>
                    <View style={styles.addFriendButtonContainer}>
                        <View style={styles.addFriendButton}>
                            <TouchableOpacity onPress={addButtonClick}
                                style={styles.ButtonAddStyle}
                                activeOpacity={0.5}>
                                <Text style={styles.TextStyle}>{addButton}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.addFriendButton}>
                            <TouchableOpacity
                                style={styles.ButtonDeleteStyle}
                                activeOpacity={0.5}>
                                <Text style={styles.TextStyleDelete}>
                                    Delete
                                    </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
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
