import _ from 'lodash';
import { AntDesign, Entypo, FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, TextInput, Text, YellowBox } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';
import ReceivedMessage from '../components/ReceivedMessage';
import SendMessage from '../components/SendMessage';
import AsyncStorage from '@react-native-async-storage/async-storage';

import io from 'use-socket.io-client';

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
    if (message.indexOf('Setting a timer') <= -1) {
        _console.warn(message);
    }
};

const ChatView = ({ route }) => {
    const [data, setData] = useState([]);
    const partnerId = route.params.partnerId
    const userId = route.params.userId
    const conversationId = route.params.conversationId
    const index = 0
    const count = 1000
    const [socket] = io('http://192.168.43.210:3000', { transports: ['websocket'], });
    let newMessage

    useEffect(() => {
        const fetchResult = async () => {
            let savedToken = await AsyncStorage.getItem('savedToken');
            let url = `http://192.168.43.210:3000/it4788/chatsocket/get_conversation?token=${savedToken}&partner_id=${partnerId}&conversation_id=${conversationId}&index=${index}&count=${count}`
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            const json = await response.json();
            setData(json.data.reverse());
        }
        const socketFunction = () => {
            socket.connect();

            let info = {
                userid: userId,
                partnerid: partnerId,
                conversationId: conversationId
            }

            socket.emit('joinChat2', info)
            socket.on('onmessage', async message => {
                fetchResult();
                let savedToken = await AsyncStorage.getItem('savedToken');
                let newMessage = {
                    conversationId: message.IdConversation,
                    partnerId: message.Sender,
                    token: savedToken,
                    Content: message.Content,
                    isUnread: message.Unread,
                }
            });
        }
        fetchResult()
        socketFunction()

    }, []);

    const changeData = async (event) => {
        let savedToken = await AsyncStorage.getItem('savedToken');
        newMessage = {
            conversationId: conversationId,
            partnerId: partnerId,
            token: savedToken,
            Content: event.nativeEvent.text,
            isUnread: false,
        }
        socket.emit('send2', newMessage);
    }

    const renderItem = ({ item }) => {
        if (item.Sender === partnerId) {
            return (
                <ReceivedMessage
                    msg={item.Content}
                    picture={item.avatar}
                />
            )
        } else {
            return (
                <SendMessage
                    msg={item.Content}
                />
            )
        }
    }
    return (
        <View style={styles.container}>
            <ScrollView style={styles.chatContainer} contentContainerStyle={{ flexGrow: 1 }} style={styles.chatView}>
                <FlatList
                    inverted
                    style={styles.chatContainer}
                    data={data}
                    renderItem={renderItem}
                    extraData={data}
                />
            </ScrollView>
            <View style={styles.inputContainer}>
                <View style={styles.sendMsgContainer}>
                    <TextInput placeholder="Aa" style={styles.input} onSubmitEditing={(event) => { event.persist(); changeData(event) }} />
                </View>

                <TouchableOpacity style={styles.icon}>
                    <AntDesign name="like1" size={responsiveFontSize(3.5)} color="#006AFF" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ChatView

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    chatContainer: {
        height: responsiveHeight(2),
    },
    inputContainer: {
        height: responsiveHeight(7),
        flexDirection: 'row',
        alignItems: 'center',
        shadowOffset: { width: 2, height: 2 },
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowRadius: 20,
        elevation: 3
    },
    input: {
        flex: 1,
        fontSize: responsiveFontSize(1.8)
    },
    sendMsgContainer: {
        marginLeft: 30,
        width: '80%',
        backgroundColor: 'rgba(211,211,211,0.5)',
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        height: '70%'
    },
    icon: {
        padding: 5,
        width: '12%',
        justifyContent: 'center',
        alignItems: 'center'
    }
})
