import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  RefreshControl,
  Button,
  FlatList,
  SectionList
} from 'react-native';


import CoverPhoto from '../assets/coverPhoto.png';

import Live from '../assets/LiveinIcon.png';
import Position from '../assets/position.png';

import { TextInput, TouchableNativeFeedback, TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import FeedPost from "../components/FeedPost"

const wait = (timeout) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

const Profile2 = ({ navigation }) => {
  const [userInfo, setUser] = useState({});
  const [data, setData] = useState({});
  const [friend, setFriend] = useState({});
  const [refreshing, setRefreshing] = React.useState(false);

  const getUserInfo = async () => {
    let savedToken = await AsyncStorage.getItem('savedToken');
    const url = `http://192.168.0.140:3000/it4788/user/get_user_info?token=${savedToken}`
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    })
    const json = await response.json();
    setUser(json.data);
  }

  const getFriendInfo = async () => {
    let savedToken = await AsyncStorage.getItem('savedToken');
    const url = `http://192.168.0.140:3000/it4788/user/get_list_friends?token=${savedToken}`
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

  const getUserPost = async () => {
    const url = `http://192.168.0.140:3000/it4788/post/get_post_user?id=${userInfo._id}&index=0&count=100`
    Image
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    })
    const json = await response.json();
    setData(json.data)
  }

  useFocusEffect(React.useCallback(() => {
    getUserInfo();
    getUserPost();
    getFriendInfo();
  }, []))

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
    getUserInfo();
    getFriendInfo();
    getUserPost();
  });
  return (
    <ScrollView style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      } >
      {/* coverPhoto */}
      <View style={{
        alignItems: 'center',
      }}>
        <Image source={{ uri: userInfo.cover_image }} style={styles.coverPhoto} />
        <TouchableNativeFeedback style={styles.camCover}>
          <View style={styles.cam} >
            <Image source={require('../assets/cam2.png')} style={styles.cameraIcon} />
          </View>
        </TouchableNativeFeedback>
        {/* <Image source = {Camera} style = {styles.cameraIcon}/> */}
      </View>

      {/* avatar */}
      <View style={styles.dpContainner}>
        <View style={styles.dpBlueRound}>
          <Image style={styles.dp} source={{ uri: userInfo.avatar }} />
          <TouchableNativeFeedback style={{
            height: 35,
            width: 35,
            borderRadius: 30,
            position: 'absolute',
            right: 0,
            bottom: 2,
          }}>
            <View style={styles.activeNowTick}>
              <Image source={require('../assets/cam2.png')} style={styles.cameraIcon} />
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>

      {/* userName */}
      <Text style={styles.userName}>{userInfo.username}</Text>
      {/* <Text style = {styles.shortBio}>Love to flirt</Text> */}

      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: 'lightgray',
          width: "100%",
          marginTop: 10,
          marginLeft: 15,
        }} />

      {/* bio */}
      <View style={styles.bio} >
        <View style={styles.tabLiveIn}>
          <Image style={styles.liveIcon} source={Live} />
          <Text style={{
            marginTop: 3,
            marginLeft: 10,
            fontSize: 18
          }} >Live in</Text>
          <Text style={{
            marginTop: 3,
            marginLeft: 5,
            fontSize: 18,
            fontWeight: 'bold'
          }}>{userInfo.city}</Text>
        </View>
        <View style={styles.tabFrom}>
          <Image style={styles.positionIcon} source={Position} />
          <Text style={{
            marginTop: 3,
            marginLeft: 14,
            fontSize: 18
          }} >From</Text>
          <Text style={{
            marginTop: 3,
            marginLeft: 5,
            fontSize: 18,
            fontWeight: 'bold'
          }}>{userInfo.city}</Text>
        </View>

        <View >
          <Button onPress={() => navigation.navigate('EditProfile')} title="Edit Profile" color={'#0078ff'} fontSize={15} fontWeight={'bold'} style={styles.editBio} />
        </View>
      </View>
      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: 'lightgray',
          width: 360,
          marginTop: 10,
          marginLeft: 15,
        }} />

      {/* tabfriend */}
      <View style={styles.tabFriend}>

        <View style={styles.tabFriendHeader} >
          <Text style={{
            fontWeight: 'bold',
            fontSize: 18,
          }} >Friends</Text>
        </View>


        {/* list friend */}
        <View style={styles.friendContainer}>
          <FlatList
            horizontal
            style={{ flexDirection: 'row', flex: 1 }}
            data={friend}
            renderItem={({ item }) => (
              <TouchableNativeFeedback
                onPress={() => {
                  navigation.navigate('UserProfile',
                    {
                      navigation: navigation,
                      user_id: item.id
                    })
                }}>
                <View style={{
                  width: 100,
                  flex: 1,
                  flexDirection: 'column',
                  margin: 1,
                  marginRight: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 120,
                  height: 150
                }} >
                  <Image style={styles.imageFriend} source={{ uri: item.avatar }} />
                  <Text style={styles.nameFriend} >{item.username}</Text>
                </View>
              </TouchableNativeFeedback>
            )}
          />
        </View>
        <View>
          <TouchableNativeFeedback
            onPress={() => {
              navigation.navigate('AllFriends',
                {
                  navigation: navigation,
                  user_id: userInfo._id
                })
            }}>
            <View style={styles.seeAllFriend}>
              <Text style={{
                fontSize: 15,
                fontWeight: 'bold',
                color: 'black',
              }} >See all friends</Text>
            </View>
          </TouchableNativeFeedback>
        </View>

      </View>

      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: 'lightgray',
          width: '100%',
          marginTop: 10,
        }} />

      {/* post */}

      <View style={styles.postContainer} >

        {/* post header */}
        <View style={styles.postHeader} >
          <Text style={{ fontWeight: 'bold', fontSize: 18 }} >Bài viết</Text>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '25%',
            height: '77%',
          }}>
          </View>
        </View>

        {/* post */}
        <View style={styles.whatyoupost} >
          <Image style={styles.postAvatar} source={{ uri: userInfo.avatar }} />
          <TextInput onFocus={() => navigation.navigate('CreatePost')} style={{
            color: 'gray',
            marginLeft: '3%',
            fontSize: 17
          }} placeholder="What's on your mind "
          />
        </View>

        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: 'lightgray',
            width: '100%',
            marginTop: 10,
          }} />
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: 'lightgray',
            width: '100%'
          }} />
      </View>

      <View
        style={{
          borderBottomWidth: 10,
          borderBottomColor: 'lightgray',
          width: '100%'
        }} />
      <View>
        <View style={styles.userPostContainer}>
          <FlatList
            inverted
            data={data}
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

      </View>
    </ScrollView>
  );
}

export default Profile2

const styles = StyleSheet.create({
  userPostContainer: {
    flex: 1
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  break: {
    backgroundColor: '#CCC',
    height: 8,
    width: "100%"
  },
  topHearder: {
    height: 65,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',

  },
  hearderIcon: {
    height: 40,
    width: 40,
    tintColor: 'black',
  },
  coverPhoto: {
    width: '94%',
    height: 220,
    borderColor: 'white',
    borderWidth: 3,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  dpContainner: {
    height: 180,
    width: 180,
    borderRadius: 200,
    backgroundColor: 'white',
    position: 'absolute',
    alignSelf: 'center',
    marginTop: 190,
    alignItems: 'center',
    justifyContent: 'center',
  },

  dp: {
    height: 162,
    width: 162,
    borderRadius: 200,
  },
  activeNowTick: {
    height: 35,
    width: 35,
    borderRadius: 30,
    backgroundColor: 'lightgray',
    position: 'absolute',
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userName: {
    alignSelf: 'center',
    marginTop: 130,
    fontWeight: 'bold',
    fontSize: 27,
  },
  shortBio: {
    alignSelf: 'center',
    fontSize: 18,
    color: 'gray',
  },
  tabAdd: {
    marginTop: 20,
    height: 50,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  addstory: {
    height: 43,
    width: '80%',
    backgroundColor: 'blue',
    marginRight: 5,
    borderRadius: 10,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  addOption: {
    height: 43,
    width: '15%',
    backgroundColor: 'lightgray',
    marginRight: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  addIcon: {
    height: 20,
    width: 20,
    tintColor: 'white',
    marginRight: 5,
  },
  option: {
    height: 25,
    width: 25,
    tintColor: 'black',
  },
  bio: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 150,
    backgroundColor: 'white',
    margin: 15,
  },
  liveIcon: {
    height: 25,
    width: 25,
    tintColor: 'gray',
  },
  tabLiveIn: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabFrom: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
  },
  positionIcon: {
    height: 23,
    width: 16,
    tintColor: 'gray',
    marginLeft: 4
  },
  tabOption: {
    height: 20,
    width: 20,
    tintColor: 'gray',
    marginLeft: 4,
    marginTop: 3,
  },
  editBio: {
    backgroundColor: '#00c6ff',
    height: 38,
    width: '100%',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabFriend: {
    margin: 15,
  },
  tabFriendHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  friendContainer: {
    backgroundColor: 'white',
    height: 150,
    width: '100%',
    marginTop: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  friend: {
    backgroundColor: 'white',
    height: '100%',
    width: '32.5%',
    flexDirection: 'column',
    alignItems: 'center',
  },
  friendRow: {
    backgroundColor: 'white',
    height: '100%',
    width: '98%',
    marginTop: 4,
    marginLeft: 4,
    marginRight: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageFriend: {
    height: '75%',
    width: '100%',
    borderRadius: 10,
  },
  nameFriend: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  seeAllFriend: {
    backgroundColor: 'lightgray',
    height: 38,
    width: '100%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  postContainer: {
    backgroundColor: 'white',
    height: 130,
    marginTop: 15,
    marginRight: 15,
    marginLeft: 15,
    marginBottom: 7,
  },
  postHeader: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '20%',
    borderRadius: 10,
  },
  postOption: {
    backgroundColor: 'lightgray',
    borderRadius: 5,
    width: '47%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  postSetting: {
    backgroundColor: 'lightgray',
    borderRadius: 5,
    width: '47%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  postAvatar: {
    width: 43,
    height: 43,
    borderRadius: 100,
  },
  whatyoupost: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postfooter: {
    backgroundColor: 'white',
    width: '100%',
    height: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  postLive: {
    backgroundColor: 'white',
    width: '33%',
    height: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  postPhoto: {
    backgroundColor: 'white',
    width: '33%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  postEvent: {
    backgroundColor: 'white',
    width: '33%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  liveicon: {
    height: 18,
    width: 25
  },
  photoIcon: {
    height: 17,
    width: 17,
    marginRight: 5,
  },
  eventIcon: {
    height: 25,
    width: 25,
  },
  managePost: {
    backgroundColor: 'lightgray',
    height: 38,
    width: '100%',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  managePostIcon: {
    height: '45%',
    width: '8%'
  },
  cameraIcon: {
    height: 30,
    width: 30,
  },
  cam: {
    backgroundColor: 'lightgray',
    width: 35,
    height: 35,
    borderRadius: 30,
    left: 150,
    bottom: 45,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  camCover: {
    width: 35,
    height: 35,
    borderRadius: 30,
    left: 170,
  }

});