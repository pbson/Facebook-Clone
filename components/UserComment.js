import React, { useEffect, useState } from "react";

import { StyleSheet, View, Text, Image, Dimensions, ScrollView, SafeAreaView, TextInput, TouchableOpacity  } from 'react-native';

const UserComment = ({ comment, created, username, avatar }) => {
    return (
            <View style = {styles.commentRow} >
                <Image style = {styles.avatarComment} source = {{uri: avatar}} />
                <View style = {{
                    width: '87%',
                    borderRadius: 10,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: "center", 
                    }}>
                    <View style = {styles.textContainer} >
                        <Text style = {{
                            margin: 6,
                            fontWeight: 'bold'
                            }} >{username}
                        </Text>
                        <Text style = {{
                            marginLeft: 6,
                            marginBottom: 10,
                            }}>
                            {comment}
                        </Text>
                    </View>
                    <View style = {styles.likeComment} >
                        <Text style = {{fontSize: 10, color: 'gray', fontWeight: "bold" }} >{new Date(created).toLocaleString()}</Text>
                    </View>
                </View>
            </View>
    );
  };
  export default UserComment;

const styles = StyleSheet.create({
    avatarComment: {
        width: 40,
        height: 40,
        borderRadius: 40,
    },
    textContainer: {
        width: '97%',
        backgroundColor: '#f7f7f7',
        borderRadius: 10,
        padding: 4,
        marginLeft: 5
    },
    likeComment: {
        width: '95%',   
        height: 16,
        backgroundColor: 'white',
        alignItems: 'center',
        flexDirection: 'row',
    },
    commentRow: {
        backgroundColor: 'white',
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'space-between',
    },
})