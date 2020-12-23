import React, { useEffect, useState } from "react";

import { StyleSheet, View, Text, Image, Dimensions, ScrollView, SafeAreaView, TextInput, Button, TouchableOpacity  } from 'react-native';

import BackIcon from '../assets/BackIcon.png';
import LikeIcon from '../assets/LikeIcon.png';
import CoverPhoto from '../assets/coverPhoto.png';

const Reaction = ({ navigation }) => {

    return (
        <View style = {styles.container} >

            <View style = {styles.header} >
                <View style = {styles.headerElement1} >
                    <TouchableOpacity style = {{marginLeft: '7%',}} >
                        <Image source = {BackIcon} style = {styles.backIcon} />
                    </TouchableOpacity>
                    <Text style = {{
                        fontWeight: "bold",
                        marginBottom: 5,
                    }} > People who reacted</Text>
                </View>
                <View></View>
            </View>

            <View style = {styles.LikeCount} >
                <Text style = {{
                    fontSize: 12,
                    fontWeight: "bold",
                    color: '#4285F4',
                    marginLeft: '7%',
                }} >All 100K</Text>
                <Image style = {styles.likeIcon} source = {LikeIcon} />
                <Text style = {{
                    fontSize: 12,
                    fontWeight: "bold",
                    color: '#4285F4',
                    marginLeft: '1%',
                }}>100K</Text>
            </View>

            <View style = {{width: '98%', flexDirection: "column"}}>
                <View style = {styles.likeRow} >
                    <View style = {styles.likeRowElement} >
                        <Image style = {styles.avatar} source = {CoverPhoto} />
                        <Image style = {styles.likeOnAvatar} source = {LikeIcon} />
                        <Text style ={styles.name}>Nguyễn văn B</Text>
                    </View>
                    <TouchableOpacity style = {styles.addfriend} >
                        <Text style = {{color: 'white', fontWeight: "bold", fontSize: 9}} >Add Friend</Text>
                    </TouchableOpacity>
                </View>
                
                <View style = {styles.likeRow} >
                    <View style = {styles.likeRowElement} >
                        <Image style = {styles.avatar} source = {CoverPhoto} />
                        <Image style = {styles.likeOnAvatar} source = {LikeIcon} />
                        <Text style ={styles.name}>Nguyễn văn B</Text>
                    </View>
                    <TouchableOpacity style = {styles.addfriend} >
                        <Text style = {{color: 'white', fontWeight: "bold", fontSize: 9}} >Add Friend</Text>
                    </TouchableOpacity>
                </View>

                <View style = {styles.likeRow} >
                    <View style = {styles.likeRowElement} >
                        <Image style = {styles.avatar} source = {CoverPhoto} />
                        <Image style = {styles.likeOnAvatar} source = {LikeIcon} />
                        <Text style ={styles.name}>Nguyễn văn B</Text>
                    </View>
                    <TouchableOpacity style = {styles.addfriend} >
                        <Text style = {{color: 'white', fontWeight: "bold", fontSize: 9}} >Add Friend</Text>
                    </TouchableOpacity>
                </View>

                <View style = {styles.likeRow} >
                    <View style = {styles.likeRowElement} >
                        <Image style = {styles.avatar} source = {CoverPhoto} />
                        <Image style = {styles.likeOnAvatar} source = {LikeIcon} />
                        <Text style ={styles.name}>Nguyễn văn B</Text>
                    </View>
                    <TouchableOpacity style = {styles.addfriend} >
                        <Text style = {{color: 'white', fontWeight: "bold", fontSize: 9}} >Add Friend</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    )
};

export default Reaction;

const styles = StyleSheet.create({
    name: {
        fontWeight: 'bold',
        fontSize: 13
    },
    container: {
        backgroundColor: 'white',
        height: Dimensions.get('window').height,
    },
    header: {
        backgroundColor: 'white',
        height: '10%',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderColor: 'lightgray',
    },
    backIcon: {
        width: 20,
        height: 20,
        tintColor: 'black',
        
    },
    headerElement1: {
        marginTop: '10%',
        flexDirection: 'row',
        width: '47%',
        justifyContent: "space-between",
    },
    likeIcon: {
        width: 23, 
        height: 23,
        borderRadius: 30,
        marginLeft: '6%',
    }, 
    LikeCount: {
        flexDirection: "row",
        height: '5%',
        alignItems: "center",
        borderBottomWidth: 1,
        borderColor: 'lightgray',
    },
    avatar: {
        width: 35,
        height: 35,
        borderRadius: 40,
        marginRight: '7%',
        marginLeft: '3%',
    },
    likeRowElement: {
        flexDirection: "row",
        alignItems: "center",
        width: '50%'
    },
    likeRow: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: 'white',
        justifyContent: "space-between",
        marginTop: 13,
        marginLeft: 5,
    },
    addfriend: {
        backgroundColor: '#4285F4',
        width: '18%',
        height: 23,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
    },
    likeOnAvatar: {
        width: 22,
        height: 22,
        borderRadius: 22,
        position: "absolute",
        left: 21,
        top: 16,
    }

},)