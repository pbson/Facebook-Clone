import React, { useEffect, useState } from "react";

import { StyleSheet, View, Text, Image, Dimensions, ScrollView, SafeAreaView, TextInput, TouchableOpacity  } from 'react-native';
import LikeIcon from '../assets/LikeIcon.png';
import CoverPhoto from '../assets/coverPhoto.png';
import Cam from '../assets/cam.png';


const Comment = ({ navigation }) => {

    const [comment, setcomment] = useState('');

    return (
    <View style = {styles.container} >

        <View style = {styles.commentHeader}>
            <TouchableOpacity style = {styles.commentHeaderElement1}>
                <Image style = {styles.likeIcon} source = {LikeIcon} />
                <Text style = {{
                    fontWeight: 'bold',
                }} >100K</Text>
            </TouchableOpacity>
        </View>

        
        {/* list comment */}
        <View style = {styles.body} >
            <View style = {styles.commentRow} >
                <Image style = {styles.avatarComment} source = {CoverPhoto} />
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
                            }} >Nguyễn Văn A 
                        </Text>
                        <Text style = {{
                            marginLeft: 6,
                            marginBottom: 10,
                            }}>
                            213213321 123 213213 213213 12312 3123 12312 312 321 321 312 12
                        </Text>
                    </View>
                    <View style = {styles.likeComment} >
                        <Text style = {{fontSize: 10, color: 'gray', fontWeight: "bold" }} >1 phút</Text>
                        <Text style = {{fontSize: 10, color: 'gray', fontWeight: "bold", marginLeft: '4%' }} >Like</Text>
                        <Text style = {{fontSize: 10, color: 'gray', fontWeight: "bold", marginLeft: '4%' }} >Trả lời</Text>
                    </View>
                </View>
            </View>

            <View style = {styles.commentRow} >
                <Image style = {styles.avatarComment} source = {CoverPhoto} />
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
                            }} >Nguyễn Văn A 
                        </Text>
                        <Text style = {{
                            marginLeft: 6,
                            marginBottom: 10,
                            }}>
                            213213321 123 213213 213213 12312 3123 12312 312 321 321 312 12
                        </Text>
                    </View>
                    <View style = {styles.likeComment} >
                        <Text style = {{fontSize: 10, color: 'gray', fontWeight: "bold" }} >1 phút</Text>
                        <Text style = {{fontSize: 10, color: 'gray', fontWeight: "bold", marginLeft: '4%' }} >Like</Text>
                        <Text style = {{fontSize: 10, color: 'gray', fontWeight: "bold", marginLeft: '4%' }} >Trả lời</Text>
                    </View>
                </View>
            </View>
        </View>
    

        <View style = {styles.footer} >
            <View style = {styles.typeComment} >
                <TextInput style = {{
                    fontSize: 13,
                    marginLeft: 5,
                    color: 'gray',
                }} 
                onChangeText={comment => setcomment(comment)}
                placeholder="Viết bình luận" />
            </View>
        </View>
                
    </View>
    );
  };
  export default Comment;

const styles = StyleSheet.create({
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
        flexDirection: 'row',
        alignItems: 'center',
        width: '18%',
        justifyContent: 'space-around',
    },
    avatarComment: {
        width: 40,
        height: 40,
        borderRadius: 40,
    },
    textContainer: {
        width: '100%',
        backgroundColor: 'lightgray',
        borderRadius: 10,
        justifyContent: 'column',
        marginRight: 5,
    },
    likeComment: {
        width: '95%',   
        height: 16,
        backgroundColor: 'white',
        alignItems: 'center',
        flexDirection: 'row',
    },
    body: {
        width: '100%',
        backgroundColor: 'white',
        alignItems: 'center',
        height: '86%',
        marginTop: 10,
    },
    commentRow: {
        width: '98%',
        backgroundColor: 'white',
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'space-between',
    },
    footer: {
        width: '100%',
        backgroundColor: 'white',
        height: '7%',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopWidth: 1,
        borderColor: 'gray'
    },
    typeComment: {
        width: '93%',
        backgroundColor: 'lightgray', 
        height: '80%',
        borderRadius: 14,
        justifyContent: 'center',
    }, 
    scroll: {
        width: '100%',
        backgroundColor: 'white',
        alignItems: 'center',
    }
})