import React from 'react';
import { 
    Text, 
    View, 
    StyleSheet, 
    Image,
    Button
} from 'react-native';

import HomeIcon from '../assets/HomeIcon.png';
import GroupIcon from '../assets/GroupIcon.png';
import CoverPhoto from '../assets/coverPhoto.png';
import Avatar from '../assets/post2.jpg';
import AddIcon from '../assets/54443.png';
import Option from '../assets/17764.png';
import Live from '../assets/LiveinIcon.png';
import Position from '../assets/position.png';
import Shop from '../assets/shop.png';
import Bell from '../assets/bell.png';
import ProfileIcon from '../assets/profileIcon.png';
import SettingIcon from '../assets/settingIcon.png';
import setting from '../assets/setting.png';
import EditPost from '../assets/editPost.png';
import LiveIcon from '../assets/liveIcon.png';
import PhotoIcon from '../assets/photo.png';
import EventIcon from '../assets/event.png';
import ManagePost from '../assets/managePost.png';
import Camera from '../assets/cam2.png';

import settingProfile from '../navigations/ProfileNavigator';
import { Navigation } from 'react-native-navigation';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';

export default function Profile(props)  {
  return( 
  <View style= {styles.container} >
    {/* header */}
    <View style = {styles.topHearder}>
      <Image style = {styles.hearderIcon} source = {HomeIcon}/>
      <Image style = {styles.hearderIcon} source = {GroupIcon}/>
      <Image style = {styles.hearderIcon} source = {Shop}/>
      <Image style = {styles.hearderIcon} source = {ProfileIcon}/>
      <Image style = {styles.hearderIcon} source = {Bell}/>
      <Image style = {styles.hearderIcon} source = {SettingIcon}/>
    </View>

    {/* coverPhoto */}
    <View style = {{   
      alignItems: 'center',
    }}>
     <Image source = {CoverPhoto} style = {styles.coverPhoto}/>
     <TouchableNativeFeedback style = {styles.camCover}>
      <View style = {styles.cam} >
        <Image source = {Camera} style = {styles.cameraIcon}/>
      </View>
     </TouchableNativeFeedback>
     {/* <Image source = {Camera} style = {styles.cameraIcon}/> */}
    </View>

    {/* avatar */}
    <View style = {styles.dpContainner}>
      <View style = {styles.dpBlueRound}>
        <Image style = {styles.dp} source = {CoverPhoto} />
        <TouchableNativeFeedback style = {{
                height: 35,
                width: 35,
                borderRadius: 30,
                position: 'absolute',
                right: 0,
                bottom: 2,
        }}>
          <View style = {styles.activeNowTick}>
            <Image source = {Camera} style = {styles.cameraIcon}/>
          </View>
        </TouchableNativeFeedback>
      </View>
    </View>

    {/* userName */}
    <Text style = {styles.userName}>Thế Tài</Text>
    <Text style = {styles.shortBio}>Thích thả thính</Text>

    <View style = {styles.tabAdd}>
      <View style = {styles.addstory}>
        <Image style = {styles.addIcon} source = {AddIcon} />
        <Text style = {{
          fontSize: 20,
          color: 'white',
          }} >Thêm vào tin</Text>
      </View>
      <View style = {styles.addOption}>
        <Image style = {styles.option} source = {Option} />
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

    {/* bio */}
    <View style = {styles.bio} >
      <View style = {styles.tabLiveIn}>
        <Image style = {styles.liveIcon} source = {Live} />
        <Text style = {{
          marginTop: 3,
          marginLeft: 10,
          fontSize: 18
        }} >Sống tại</Text>
        <Text style = {{
          marginTop: 3,
          marginLeft: 5,
          fontSize: 18,
          fontWeight: 'bold'
        }}>Hà Nội</Text>
      </View>
      <View style = {styles.tabFrom}>
        <Image style = {styles.positionIcon} source = {Position} />
        <Text style = {{
          marginTop: 3,
          marginLeft: 14,
          fontSize: 18
        }} >Đến từ</Text>
        <Text style = {{
          marginTop: 3,
          marginLeft: 5,
          fontSize: 18,
          fontWeight: 'bold'
        }}>Hà Nội</Text>
      </View>
      <View style = {styles.tabFrom}>
        <Image style = {styles.tabOption} source = {Option} />
        <Text style = {{
          marginTop: 3,
          marginLeft: 14,
          fontSize: 18
        }} >Xem thông tin giới thiệu của bạn</Text>
      </View>
      <View style = {styles.editBio}>
        <Text style = {{
          fontSize: 15,
          fontWeight: 'bold',
          color: 'blue',
        }} >Chỉnh sửa chi tiết công khai</Text>
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
    <View style = {styles.tabFriend}>

      <View style = {styles.tabFriendHeader} >
        <Text style = {{
          fontWeight: 'bold',
          fontSize: 18,
        }} >Bạn bè</Text>
        <Text style = {{
          fontSize: 18,
          color: 'blue'
        }} >Tìm bạn bè</Text>
      </View>

      <Text style = {{
        color: 'gray',
        margintop: 5,
      }} >100 người bạn</Text>

      {/* list friend */}
      <View style = {styles.friendContainer}>
        <View style = {styles.friendRow} >
          <View style = {styles.friend} >
            <Image style = {styles.imageFriend} source = {CoverPhoto} />
            <Text style = {styles.nameFriend} >Thế Tài</Text>
          </View>
          <View style = {styles.friend} >
            <Image style = {styles.imageFriend} source = {CoverPhoto} />
            <Text style = {styles.nameFriend} >Thế Tài</Text>
          </View>
          <View style = {styles.friend} >
            <Image style = {styles.imageFriend} source = {CoverPhoto} />
            <Text style = {styles.nameFriend} >Thế Tài</Text>
          </View>
        </View>
        <View style = {styles.friendRow} >
          <View style = {styles.friend} >
            <Image style = {styles.imageFriend} source = {CoverPhoto} />
            <Text style = {styles.nameFriend} >Thế Tài</Text>
          </View>
          <View style = {styles.friend} >
            <Image style = {styles.imageFriend} source = {CoverPhoto} />
            <Text style = {styles.nameFriend} >Thế Tài</Text>
          </View>
          <View style = {styles.friend} >
            <Image style = {styles.imageFriend} source = {CoverPhoto} />
            <Text style = {styles.nameFriend} >Thế Tài</Text>
          </View>
        </View>
      </View>
      <View style = {styles.seeAllFriend}>
      <Text style = {{
          fontSize: 15,
          fontWeight: 'bold',
          color: 'black',
        }} >Xem tất cả bạn bè</Text>
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

    <View style = {styles.postContainer} >

      {/* post header */}
      <View style = {styles.postHeader} >
        <Text style = {{fontWeight: 'bold', fontSize: 18}} >Bài viết</Text>
        <View style = {{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '25%',
          height: '77%',
          }}>
          <View style = {styles.postOption}>
            <Image style = {styles.option} source = {EditPost} />
          </View>
          <View style = {styles.postSetting}>
            <Image style = {styles.option} source = {setting} />
          </View>
        </View>
      </View>

      {/* post */}
      <View style = {styles.whatyoupost} >
        <Image style = {styles.postAvatar} source = {CoverPhoto} />
        <Text style = {{
          color: 'gray',
          marginLeft: '3%',
          fontSize: 17
        }} >Bạn đang nghĩ gì?</Text>
      </View>

      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: 'lightgray',
          width: '100%',
          marginTop: 10,
        }} />
      <View style = {styles.postfooter}>
        <View style = {styles.postLive}>
          <Image style = {styles.liveicon} source = {LiveIcon} />
          <Text style = {{fontSize: 13}} >Phát trực tiếp</Text>
        </View>
        <View style = {styles.postPhoto}>
          <Image style = {styles.photoIcon} source = {PhotoIcon} />
          <Text style = {{fontSize: 13}} >Ảnh</Text> 
        </View>
        <View style = {styles.postEvent}>
          <Image style = {styles.eventIcon} source = {EventIcon} />
          <Text style = {{fontSize: 13}}>Sự kiện</Text>
        </View>
      </View>
      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: 'lightgray',
          width: '100%'
        }} />
      
      <View style = {styles.managePost}>
        <Image style = {styles.managePostIcon} source = {ManagePost} />
        <Text style = {{
          fontSize: 15,
          fontWeight: 'bold',
          color: 'balck',
        }} >Quản lý bài viết</Text>
      </View>
    </View>

    <View
        style={{
          borderBottomWidth: 10,
          borderBottomColor: 'lightgray',
          width: '100%'
        }} />
  </View>
);
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white', 
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
    coverPhoto:{
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
    dpBlueRound: {
      height: '95%',
      width: '95%',
      borderRadius: 200,
      borderWidth: 5,
      borderColor: 'blue',
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
      marginTop: 90,
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
      backgroundColor: 'lightblue',
      height: 38,
      width: '100%',
      borderRadius: 10,
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
      height: 300,
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
      height: '48%',
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
      height: 200,
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
      height: 44,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    postLive: {
      backgroundColor: 'white',
      width: '33%',
      height: '100%',
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