import React, { useEffect, useState } from "react";
import {
    ScrollView,
    View,
    StyleSheet,
    TextInput,
    FlatList,
    RefreshControl
} from "react-native";
import {
    responsiveFontSize,
    responsiveHeight,
    responsiveWidth,
} from "react-native-responsive-dimensions";
import FeedPost from "../components/FeedPost"
import NoPost from "../components/NoPost"
import Avatar from "../components/Avatar"
import CreatePost from "../screens/CreatePost.js"
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import { LogBox } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const wait = (timeout) => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

const Feed = ({ navigation }) => {
    const [data, setData] = useState([]);
    const [userPost, setPost] = useState([]);
    const [userInfo, setUser] = useState({});

    const index = 0
    const count = 100
    const getUserInfo = async () => {
        let savedToken = await AsyncStorage.getItem('savedToken');
        const url = `http://192.168.43.210:3000/it4788/user/get_user_info?token=${savedToken}`
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
        const url = `http://192.168.43.210:3000/it4788/post/get_list_post?token=${savedToken}&index=${index}&count=${count}&last_id=`
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
        const json = await response.json();
        setData(json.data.post);
    }
    const getUserPost = async () => {
        const url = `http://192.168.43.210:3000/it4788/post/get_post_user?id=${userInfo._id}&index=0&count=100`
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
        const json = await response.json();
        console.log(json)
        setPost(json.data)
    }
    useEffect(() => {
        getUserInfo()
        fetchResult()
        getUserPost()
    }, [])
    ///////////////////////////////// Pull down to refresh
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
        getUserInfo()
        fetchResult()
        getUserPost()
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
                    <Avatar
                        url={userInfo.avatar}
                    />
                    <View style={styles.searchContainer}>
                        <TextInput onFocus={() => navigation.navigate(CreatePost)} style={styles.search} placeholder="What's on your mind " />
                    </View>
                </View>
                <View style={styles.break}></View>
                {(data.length + userPost.length <= 0) ?
                    <NoPost navigation={navigation}/>
                    :
                    <View style={{flex: 1, height: "100%"}}>
                        <View style={{ flex: 1 }}>
                            <FlatList
                                inverted
                                style={styles.chatContainer}
                                data={userPost}
                                keyExtractor={({ id }, index) => id}
                                renderItem={({ item }) => (
                                    <FeedPost
                                        navigation={navigation}
                                        avatar={userInfo.avatar}
                                        id={item._id}
                                        described={item.Described}
                                        username={userInfo.username}
                                        created={item.CreatedAt}
                                        image={item.Image}
                                        like={item.Like.length}
                                        comment={item.Comment.length}
                                    />
                                )}
                            />
                        </View>
                        <View style={{ flex: 1 }}>
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
                    </View>
                }
            </ScrollView>
        </View>

    );
};

export default Feed;

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: responsiveWidth(100),
        borderBottomColor: '#E5E5E5',
        borderBottomWidth: 0.5
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
