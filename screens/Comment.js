import React, { useEffect, useState } from "react";

import { ActivityIndicator, StyleSheet, KeyboardAvoidingView, View, Text, Image, Dimensions, ScrollView, SafeAreaView, TextInput, TouchableOpacity, FlatList } from 'react-native';
import LikeIcon from '../assets/LikeIcon.png';
import CoverPhoto from '../assets/coverPhoto.png';
import Cam from '../assets/cam.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserComment from '../components/UserComment'


const Comment = ({ route }) => {
    const [comment, setcomment] = useState('');
    const [data, setData] = useState([]);
    const [pageCurrent, setPageCurrent] = useState(0)
    const [isMore, setIsMore] = useState(true)

    const changeData = async (event) => {
        let savedToken = await AsyncStorage.getItem('savedToken');
        let comment = event.nativeEvent.text;
        let index = 0;
        let count = 1;
        const url = `http://303ef6e81cb6.ngrok.io/it4788/comment/set_comment?token=${savedToken}&id=${route.params.id}&index=${index}&count=${count}&comment=${comment}`
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
        const json = await response.json();
        setData([json.data[0], ...data]);
    }
    const handleLoadMore = () => {
        if (isMore == true){
            setPageCurrent(parseInt(pageCurrent) + 10)
        }else{
            return
        }
    }
    const fetchResult = async () => {
        let savedToken = await AsyncStorage.getItem('savedToken');
        const url = `http://303ef6e81cb6.ngrok.io/it4788/comment/get_comment?token=${savedToken}&id=${route.params.id}&index=${pageCurrent}&count=10`
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
        const json = await response.json();
        if (json.data.length <1){
            setIsMore(false)
        }
        setData(data.concat(json.data));
    }
    useEffect(() => {
        fetchResult()
    },[pageCurrent])

    return (
        <View style={styles.container} >

            <View style={styles.commentHeader}>
                <TouchableOpacity style={styles.commentHeaderElement1}>
                    <Image style={styles.likeIcon} source={LikeIcon} />
                    <Text style={{
                        fontWeight: 'bold',
                        paddingLeft: 5
                    }} >{route.params.like}</Text>
                </TouchableOpacity>
            </View>


            {/* list comment */}
            <View style={styles.body} >
                <FlatList
                    inverted
                    data={data}
                    extraData={data}
                    keyExtractor={({ id }, index) => id}
                    renderItem={({ item }) => (
                        <UserComment
                            comment={item.Comment}
                            created={item.CreatedAt}
                            username={item.poster.username}
                            avatar={item.poster.avatar}
                        />
                    )}
                    onEndReached={() => {
                        setTimeout(() => {},1000)
                        handleLoadMore()
                    }}
                    onEndReachedThreshold={0.5}
                />
            </View>


            <View style={styles.footer} >
                <KeyboardAvoidingView
                    behavior={Platform.OS == "ios" ? "padding" : "height"}
                    style={styles.typeComment}
                >
                    <TextInput placeholder="Write a comment" style={{
                        fontSize: 13,
                        marginLeft: 5,
                        color: 'gray',
                    }} onSubmitEditing={(event) => { event.persist(); changeData(event) }} />

                </KeyboardAvoidingView>

            </View>

        </View>
    );
};
export default Comment;

const styles = StyleSheet.create({
    loader: {
        marginTop: 10,
        alignItems: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        height: Dimensions.get('window').height
    },
    commentHeader: {
        height: '5%',
        width: '100%',
        borderBottomWidth: 1,
        borderColor: 'gray',
        flexDirection: 'row',
        alignItems: 'center',
    },
    likeIcon: {
        width: 22,
        height: 22,
        borderRadius: 30,
        marginLeft: '1%',
    },
    commentHeaderElement1: {
        paddingLeft: 5,
        flexDirection: 'row',
        alignItems: 'center',
        width: '18%',
    },
    likeComment: {
        width: '95%',
        height: 16,
        backgroundColor: 'white',
        alignItems: 'center',
        flexDirection: 'row',
    },
    body: {
        width: '98%',
        backgroundColor: 'white',
        alignItems: 'center',
        height: '86%',
        marginTop: 10,
    },
    footer: {
        width: '100%',
        backgroundColor: 'white',
        height: '7%',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopWidth: 1,
        borderColor: '#f7f7f7',
    },
    typeComment: {
        width: '93%',
        backgroundColor: '#f7f7f7',
        height: '100%',
        borderRadius: 14,
        justifyContent: 'center',
    },
    scroll: {
        width: '100%',
        backgroundColor: 'white',
        alignItems: 'center',
    }
})