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
import { createIconSetFromFontello } from "@expo/vector-icons";
import Avatar from '../components/Avatar'

const wait = (timeout) => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

const AllFriends = ({ route, navigation }) => {
    const [request, setRequest] = useState([]);
    let user_id = route.params.user_id

    const index = 0
    const count = 30
    const fetchResquestedFriends = async () => {
        let savedToken = await AsyncStorage.getItem('savedToken');
        const url = `http://192.168.43.210:3000/it4788/user/get_list_friends?user_id=${user_id}`
        console.log(url);
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
        const json = await response.json();
        console.log(json);
        setRequest(json.data.friends);
    }
    useFocusEffect(React.useCallback(() => {
        fetchResquestedFriends()
    }, []))
    ///////////////////////////////// Pull down to refresh
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
        fetchResquestedFriends()
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
                <Text style={styles.headingText}>                           
                Friends {"  "}
                    <Text style={styles.requestFriendsLength}>
                        {request.length}
                    </Text></Text>
            </View>

            <View style={styles.addfriendContainer}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.addfriendWrapper}>
                        <View key={index}>
                            <FlatList
                                style={styles.chatContainer}
                                data={request}
                                extraData={request}
                                keyExtractor={({ id }, index) => id}
                                renderItem={({ item }) => (
                                    <View style={styles.friendlistContainer}>
                                        <Avatar url={item.avatar} />
                                        <View style={styles.addFriendList}>
                                            <Text style={styles.addFriendName}>
                                                {item.username}
                                            </Text>
                                        </View>
                                    </View>
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

export default AllFriends;

const styles = StyleSheet.create({
    requestFriendsLength: {
        marginLeft: 10,
        color: 'red'
    },
    addFriendList: {
        marginLeft: 10
    },
    addFriendName: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#1C1E21"
    },
    friendlistContainer: {
        flexDirection: "row",
        marginTop: 10,
        marginBottom: 20
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
