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
import { Ionicons } from "@expo/vector-icons";
import ActiveUserOnMessengerHome from "../components/ActiveUserOnMessengerHome";
import Chat from "../components/Chat";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
const wait = (timeout) => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}
const MessengerHome = ({ navigation }) => {
    const [conversation, setConversation] = useState([]);
    const [friends, setFriend] = useState([])
    const [userInfo, setUser] = useState({});

    const index = 0
    const count = 20

    const getUserInfo = async () => {
        let savedToken = await AsyncStorage.getItem('savedToken');
        if (savedToken === null) {
            navigation.navigate('Login')
        }
        const url = `http://303ef6e81cb6.ngrok.io/it4788/user/get_user_info?token=${savedToken}`
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
    const fetchListFriends = async () => {
        let savedToken = await AsyncStorage.getItem('savedToken');
        const url = `http://303ef6e81cb6.ngrok.io/it4788/user/get_list_friends?token=${savedToken}`
        console.log(url)
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
        const json = await response.json();
        setFriend(json.data.friends);
    }
    const fetchConversation = async () => {
        let savedToken = await AsyncStorage.getItem('savedToken');
        const url = `http://303ef6e81cb6.ngrok.io/it4788/chatsocket/get_list_conversation?token=${savedToken}&index=${index}&count=${count}`
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
        const json = await response.json();
        console.log(json.data);
        setConversation(json.data);
    }

    useFocusEffect(React.useCallback(() => {
        fetchListFriends()
        fetchConversation()
        getUserInfo()
    }, []))
    ///////////////////// Pull down to refresh
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
        fetchListFriends()
        fetchConversation()
    });
    return (
        <ScrollView
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            contentContainerStyle={{ alignItems: "center" }}
            style={styles.container}
        >
            <View style={styles.activeUsersContainer}>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={true}
                    style={styles.chatContainer}
                    data={friends}
                    keyExtractor={({ id }, index) => id}
                    renderItem={({ item }) => (
                        <ActiveUserOnMessengerHome
                            navigation={navigation}
                            id={item.id}
                            avatar={item.avatar}
                            username={item.username}
                            is_online={item.is_online}
                            userId={userInfo.id}
                        />
                    )}
                />
            </View>
            <View style={styles.chatWrapper} >
                <FlatList
                    style={styles.chatContainer}
                    data={conversation}
                    keyExtractor={({ id }, index) => id}
                    renderItem={({ item }) => (
                        <Chat
                            navigation={navigation}
                            username={item.Partner.username}
                            userId={userInfo.id}
                            conversationId={item.id}
                            partnerId={item.Partner.id}
                            hasSeen={item.LastMessage.unread}
                            time={item.LastMessage.created}
                            message={item.LastMessage.message}
                            phonenumber={item.Partner.username}
                            proPicUrl={item.Partner.avatar}
                            seenProPicUrl={item.Partner.avatar}
                        />
                    )}
                />
            </View>

        </ScrollView>
    );
};

export default MessengerHome;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        paddingTop: 10,
    },
    activeUsersContainer: {
        height: responsiveHeight(13),
        width: responsiveWidth(100),
        marginVertical: 5,
    },
    chatContainer: {
        width: responsiveWidth(100),
        marginBottom: 10,
    }
});
