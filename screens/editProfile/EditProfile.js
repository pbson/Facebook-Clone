import React, { useEffect, useState } from "react";
import {
    ScrollView,
    View,
    StyleSheet,
    Text,
    FlatList,
    TouchableOpacity,
    Image,
    Dimensions
} from "react-native";

const EditProfile = ({navigation})=>{
    return(
        <ScrollView>
            <View style={{
                borderBottomWidth: 0.5,
            }}>
               <Text style={styles.title}>Profile Picture </Text>

               <Image style={{
                   width: '40%',
                   height: undefined,
                   alignSelf: 'center',
                   aspectRatio: 1,
                   borderRadius: 80 ,
                   marginBottom: '5%'
               }} source={require('../../assets/user5.png')} />
            </View>
            <View style={{
                borderBottomWidth: 0.5,
            }}>
                <Text style={styles.title}>
                    Cover Photo
                </Text>
                <Image style={{
                    width: '95%',
                    alignSelf: 'center',
                    borderRadius: 5,
                    height: undefined,
                    aspectRatio: 5/3,
                    marginBottom: '5%'
                }} source={require('../../assets/coverPhoto.png')}/>
            </View>
            <View style={{
                borderBottomWidth: 0.5,
                
            }}>
                <Text style={styles.title}>Bio</Text>
                <Text style={{marginBottom: '5%',textAlign: 'center'}}>
                    this is an Bio
                </Text>
            </View>
            <View style={{             
                borderBottomWidth: 0.5,

            }}>
                <Text style={styles.title}>
                    Details
                </Text>
                <View style={{marginBottom: '5%'}} >
                    <TouchableOpacity style={styles.detail}>
                        <Image style={{
                            width: '6%',
                            height: undefined,
                            aspectRatio: 1,
                            marginRight: '3%'
                        }} source={require('../../assets/icons/briefcase.png')} />
                        <Text>Hanoi, Vietnam</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.detail}>
                        <Image style={{
                            width: '6%',
                            height: undefined,
                            aspectRatio: 1,
                            marginRight: '3%'
                        }} source={require('../../assets/icons/hat.png')} />
                        <Text>Went to ...</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.detail}>
                        <Image style={{
                            width: '6%',
                            height: undefined,
                            aspectRatio: 1,
                            marginRight: '3%'
                        }} source={require('../../assets/icons/home.png')} />
                        <Text>Hanoi, Vietnam</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.detail}>
                        <Image style={{
                            width: '6%',
                            height: undefined,
                            aspectRatio: 1,
                            marginRight: '3%'
                        }} source={require('../../assets/icons/gps.png')} />
                        <Text>From ...</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.detail}>
                        <Image style={{
                            width: '6%',
                            height: undefined,
                            aspectRatio: 1,
                            marginRight: '3%'
                        }} source={require('../../assets/icons/heart.png')} />
                        <Text>Relationship Status</Text>
                    </TouchableOpacity>
                    
                    
                    
                    
                </View>
                
            </View>
            <View style={styles.aboutButtom, {marginTop: '5%',marginBottom: '5%'}}>
                <TouchableOpacity onPress={()=>navigation.navigate('About')} style={styles.aboutButtom} >
                   <View style={{
                       flexDirection: 'row',
                       justifyContent: 'center',
                       alignItems: 'center',
                   }}>
                       <Image style={{
                           width: "8%",
                           aspectRatio: 1,
                           height: undefined,
                           marginRight: "2%"
                           
                       }} source={require('../../assets/icons/user.png')} />
                    <Text style={{
                            textAlign: "center",
                            color: "#6495ED",
                            fontWeight: "bold"
                        }}>
                            Edit Your About Info
                        </Text>  
                    </View> 
                    
                </TouchableOpacity>
            </View>
            
        </ScrollView>
    )
}
export default EditProfile

const styles = StyleSheet.create({
    title: {
        flexDirection: "row",
        justifyContent: 'flex-start',
        marginLeft: '2%',
        padding: '3%',
        fontWeight: 'bold',
        fontSize: 20
    },
    aboutButtom: {
        width: '95%',
        backgroundColor: '#00FFFF',
        aspectRatio: 10,
        height: undefined,
        alignSelf: 'center',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    detail:{
        alignSelf: 'stretch',
        marginLeft: '3%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',alignItems: 'center',padding: '3%'
       
    }

})