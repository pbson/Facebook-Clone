import React, { useEffect, useState } from "react";
import {
    ScrollView,
    View,
    StyleSheet,
    TextInput,
    FlatList,
    Text,
    RefreshControl
} from "react-native";
import {
    responsiveFontSize,
    responsiveHeight,
    responsiveWidth,
} from "react-native-responsive-dimensions";
import FeedPost from "../components/FeedPost"
import Avatar from "../components/Avatar"
import CreatePost from "../screens/CreatePost.js"
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import { LogBox } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const wait = (timeout) => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}
const Watch = ({ navigation }) => {
    const [data, setData] = useState([]);
    const [userInfo, setUser] = useState({});

    const index = 0
    const count = 20
    const getUserInfo = async () => {
        let savedToken = await AsyncStorage.getItem('savedToken');
        const url = `http://192.168.0.140:3000/it4788/user/get_user_info?token=${savedToken}`
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
        const json = await response.json();
        if (json.code !== '1000') {
            navigation.navigate('Login')
        } else {
            setUser(json.data);
        }
    }

    const fetchResult = async () => {
        let savedToken = await AsyncStorage.getItem('savedToken');
        const url = `http://192.168.0.140:3000/it4788/post/get_list_post?token=${savedToken}&index=${index}&count=${count}&last_id=`
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
        const json = await response.json();
        console.log(json.data.post)
        setData(json.data.post);
    }
    useEffect(() => {
        getUserInfo()
        fetchResult()
    }, []);
    ///////////////////////////////// Pull down to refresh
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
        getUserInfo()
        fetchResult()
    });
    return (
        <ScrollView
            contentContainerStyle={{ alignItems: "center" }}
            style={styles.container}
        >
            <View style={styles.headerContainer}>
                <Text style={styles.headingText}>Watch</Text>
            </View>
            <FlatList
                style={styles.chatContainer}
            />
            <View>
            <FlatList
                    inverted
                    style={styles.chatContainer}
                    data={data}
                    keyExtractor={({ id }, index) => id}
                    renderItem={({ item }) => (
                        <FeedPost
                            navigation={navigation}
                            avatar={item.author.avatar}
                            id={item.id}
                            described={item.described}
                            username={item.author.name}
                            created={item.created}
                            modified={item.modified}
                            like={item.like}
                            comment={item.comment}
                            image={item.image}
                            is_liked={item.is_liked}
                            can_edit={item.can_edit}
                            can_comment={item.can_comment}
                            video={item.video}
                        />
                    )}
                />
            </View>

        </ScrollView>
    );
};

export default Watch;

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
    searchIconContainer: {
        paddingHorizontal: 10,
    },
    activeUsersContainer: {
        height: responsiveHeight(13),
        width: responsiveWidth(100),
        marginVertical: 5,
    },
    chatContainer: {
        width: responsiveWidth(100)
    },
    name: {
        flex: 1,
        textAlign: 'center',
        fontSize: responsiveFontSize(1.5),
    },
    break: {
        backgroundColor: '#CCC',
        height: 8,
        width: "100%"
    }
});
