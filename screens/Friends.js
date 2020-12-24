import React, { useEffect, useState } from "react";
import {
    ScrollView,
    View,
    StyleSheet,
    Text,
    FlatList,
    RefreshControl
} from "react-native";
import {
    responsiveFontSize,
    responsiveHeight,
    responsiveWidth,
} from "react-native-responsive-dimensions";
import AddFriendList from '../components/AddFriendList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
const wait = (timeout) => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

const Friends = ({ navigation }) => {
    const [suggestedFriends, setSuggestedFriends] = useState([]);
    const [request, setRequest] = useState([]);

    const index = 0
    const count = 30
    const fetchSuggestedFriends = async () => {
        let savedToken = await AsyncStorage.getItem('savedToken');
        const url = `http://192.168.0.140:3000/it4788/user/get_list_suggested_friends?token=${savedToken}&index=${index}&count=${count}`
        console.log(url);
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
        const json = await response.json();
        setSuggestedFriends(json.data);
    }

    const fetchResquestedFriends = async () => {
        let savedToken = await AsyncStorage.getItem('savedToken');
        const url = `http://192.168.0.140:3000/it4788/user/get_requested_friends?token=${savedToken}&index=${index}&count=${count}`
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
        const json = await response.json();
        setRequest(json.data.request);
    }
    useFocusEffect(React.useCallback(() => {
        fetchResquestedFriends()
        fetchSuggestedFriends()
    }, []))
    ///////////////////////////////// Pull down to refresh
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
        fetchResquestedFriends()
        fetchSuggestedFriends()
    });
    return (
        <ScrollView
            contentContainerStyle={{ alignItems: "center" }}
            style={styles.container}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >
            <View style={styles.headerContainer}>
                <Text style={styles.headingText}>Friends</Text>
            </View>

            <View style={styles.addfriendContainer}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.addfriendWrapper}>
                        <Text style={styles.title}>
                            Friend request {"  "}
                            <Text style={styles.requestFriendsLength}>
                                {request.length}
                            </Text>
                        </Text>

                        <View key={index}>
                            <FlatList
                                style={styles.chatContainer}
                                data={request}
                                extraData={request}
                                keyExtractor={({ id }, index) => id}
                                renderItem={({ item }) => (
                                    <AddFriendList
                                        isRequest={true}
                                        id={item.id}
                                        addFriendImg={item.avatar}
                                        addFriendName={item.username}
                                    />
                                )}
                            />

                        </View>
                    </View>

                    <View style={styles.addfriendWrapper}>
                        <Text style={styles.title}>
                            People you may know
                        </Text>
                        <View key={index}>
                            <FlatList
                                style={styles.chatContainer}
                                data={suggestedFriends}
                                extraData={suggestedFriends}
                                keyExtractor={({ id }, index) => id}
                                renderItem={({ item }) => (
                                    <AddFriendList
                                        isRequest={false}
                                        id={item.id}
                                        addFriendImg={`http://${item.avatar}`}
                                        addFriendName={item.username}
                                    />
                                )}
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
    requestFriendsLength: {
        marginLeft: 10,
        color: 'red'
    },

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
