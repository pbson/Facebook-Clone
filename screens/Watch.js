import React, { useEffect, useState } from "react";
import {
    ScrollView,
    View,
    StyleSheet,
    TextInput,
    Text,
    FlatList,
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

const Feed = ({ navigation }) => {
    const [data, setData] = useState([]);
    const [userInfo, setUser] = useState({});

    const index = 0
    const count = 100
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
        const url = `http://303ef6e81cb6.ngrok.io/it4788/post/get_list_post?token=${savedToken}&index=${index}&count=${count}&last_id=`
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
        const json = await response.json();
        let videoPost = json.data.post.filter(
            post => {
                return post.image.length == 1 &&  post.image[0].split('.').pop() == 'mp4'
            }
        )
        console.log(videoPost)
        setData(videoPost);

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
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={{ alignItems: "center" }}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                <View style={styles.headerContainer}>
                    <Text style={styles.headingText}>Watch</Text>
                </View>
                <View style={styles.break}></View>
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
            </ScrollView>
        </View>

    );
};

export default Feed;

const styles = StyleSheet.create({
    headerContainer: {
        padding: 10,
        width: responsiveWidth(95),
        borderBottomColor: '#E5E5E5',
        borderBottomWidth: 0.5
    },
    headingText:{
        fontSize: 24,
        fontWeight: 'bold'
    },
    container: {
        flex: 1,
        backgroundColor: "white",
        paddingTop: 10,
    },
    searchContainer: {
        marginTop: 10,
        width: responsiveWidth(80),
        height: responsiveHeight(5),
        backgroundColor: 'white',
        borderRadius: 30,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 10,
        borderColor: '#E5E5E5',
        borderWidth: 1,
        color: 'black',
        marginBottom: 10
    },
    search: {
        flex: 1,
        paddingLeft: 20,
        color: 'black',
    },
    searchIconContainer: {
        paddingHorizontal: 10,
    },
    activeUsersContainer: {
        height: responsiveHeight(13),
        width: responsiveWidth(100),
        marginVertical: 5,
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
