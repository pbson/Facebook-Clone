import { AntDesign, Entypo, FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, TextInput, Text } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';
import ReceivedMessage from '../components/ReceivedMessage';
import SendMessage from '../components/SendMessage';

import io from 'use-socket.io-client';

const ChatView = ({ route }) => {
    const [data, setData] = useState([]);
    const partnerId = route.params.partnerId
    const conversationId = route.params.conversationId
    const index = 0
    const count = 40
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWY3Nzc4YjQ5NzYwZmUwMDc2M2E4YzdmIiwicGFzc3dvcmQiOiIkMmEkMTAkYXcxeGZXenJpYjVncC9PWjMxWENsZTQuZGFOOXouRDFkcEF3UGNlcGc5QXZEY3ppbC5XbUMiLCJsYXRlc3RMb2dpblRpbWUiOiIyMDIwLTEwLTMxVDAwOjI2OjU4LjI1OFoifSwiaWF0IjoxNjA3ODU2NzMwLCJleHAiOjE2MDgyMTY3MzB9.GO85wxlmyn5KxjiaSSK3ZVqL8Iv24B0FZi4zYPQQoAA'
    const [socket] = io('http://192.168.0.140:3000', {jsonp:false, transports: ['websocket'], });

    useEffect(() => {
        //get message
        let url = `http://192.168.0.140:3000/it4788/chatsocket/get_conversation?token=${token}&partner_id=${partnerId}&conversation_id=${conversationId}&index=${index}&count=${count}`
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

        //socketio connection
        socket.connect();

        let info = {
            userid: '5f7778b49760fe00763a8c7f',
            partnerid: partnerId
        }

        socket.emit('joinChat',info)
        socket.on('onmessage', message => {
            console.log(message)
            setData([...data, message])
        });

    }, []);

    const changeData= (event) => {
        let newMessage = {
            partnerId: partnerId,
            token: token,
            Content: event.nativeEvent.text,
            isUnread: false,
        }

        socket.emit('send', newMessage);
        setData([...data, newMessage])
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
                    style={styles.chatContainer} 
                    data={data}
                    keyExtractor={({ id }, index) => id}
                    renderItem={renderItem}
                    extraData={data}
                />
            </ScrollView>
            <View style={styles.inputContainer}>
                <TouchableOpacity style={styles.icon}>
                    <Entypo name="grid" size={responsiveFontSize(3.5)} color="#006AFF" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.icon}>
                    <FontAwesome5 name="camera" size={responsiveFontSize(3.5)} color="#006AFF" />

                </TouchableOpacity>

                <TouchableOpacity style={styles.icon}>
                    <AntDesign name="picture" size={responsiveFontSize(3.5)} color="#006AFF" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.icon}>
                    <FontAwesome name="microphone" size={responsiveFontSize(3.5)} color="#006AFF" />
                </TouchableOpacity>
                <View style={styles.sendMsgContainer}>
                    <TextInput placeholder="Aa" style={styles.input} onSubmitEditing={event => changeData(event)} />

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
        width: '40%',
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
