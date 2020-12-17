import React, { useEffect, useState } from "react";
import {
    ScrollView,
    View,
    StyleSheet,
    Text,
    FlatList,
    Button,
    TouchableOpacity,
    Image
} from "react-native";
import {
    responsiveFontSize,
    responsiveHeight,
    responsiveWidth,
} from "react-native-responsive-dimensions";
import AddFriendList from '../components/AddFriendList'

const Friends = ({ navigation }) => {
    const [data, setData] = useState([]);

    const index = 0
    const count = 20
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWY3Nzc4YjQ5NzYwZmUwMDc2M2E4YzdmIiwicGFzc3dvcmQiOiIkMmEkMTAkYXcxeGZXenJpYjVncC9PWjMxWENsZTQuZGFOOXouRDFkcEF3UGNlcGc5QXZEY3ppbC5XbUMiLCJsYXRlc3RMb2dpblRpbWUiOiIyMDIwLTEwLTMxVDAwOjI2OjU4LjI1OFoifSwiaWF0IjoxNjA3ODU2NzMwLCJleHAiOjE2MDgyMTY3MzB9.GO85wxlmyn5KxjiaSSK3ZVqL8Iv24B0FZi4zYPQQoAA'


    useEffect(() => {
        const url = `https://project-facebook-clone.herokuapp.com/it4788/chatsocket/get_list_conversation?token=${token}&index=${index}&count=${count}`
        const fetchResult = async () => {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            const json = await response.json();
            setData(json.data);
        }
        fetchResult()
    }, []);
    return (
        <ScrollView
            contentContainerStyle={{ alignItems: "center" }}
            style={styles.container}
        >
            <View style={styles.headerContainer}>
                <Text style={styles.headingText}>Friends</Text>
            </View>

            <View style={styles.addfriendContainer}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.addfriendWrapper}>
                        <Text style={styles.title}>
                            People you may know
                        </Text>
                        <View key={index}>
                            <AddFriendList
                                addFriendImg={require("../src/img/photostatus.jpg")}
                                addFriendName="Ngoc Dao"
                                addFriendMutual={4}
                            />
                        </View>
                    </View>
                </ScrollView>
            </View>

            <FlatList
            />
        </ScrollView>
    );
};

export default Friends;

const styles = StyleSheet.create({
    headerContainer: {
        padding: 10,
        width: responsiveWidth(95),
        borderBottomColor: '#E5E5E5',
        borderBottomWidth: 0.5
    },
    container: {
        flex: 1,
        backgroundColor: "white",
        paddingTop: 10,
    },
    headingText: {
        fontSize: responsiveFontSize(2.5),
        fontWeight: 'bold'
    },
    addfriendContainer: {
        flex: 1,
        width: responsiveWidth(95),
    },
    addfriendWrapper: {
        marginHorizontal: 10
    },
    topWrapper: {
        height: 60,
        borderBottomWidth: 1,
        borderBottomColor: "#CED2D7"
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#1C1E21",
        paddingTop: 5
    },
    friendlist: {
        flexDirection: "row"
    },
    break: {
        backgroundColor: '#CCC',
        height: 8,
        width: "100%"
    }
});
