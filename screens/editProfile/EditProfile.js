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
import { TouchableHighlight } from "react-native-gesture-handler";
import Item from './Item'
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
                <Text style={styles.title}>
                    Details
                </Text>
                <View style={{marginBottom: '5%'}} >
                    <TouchableHighlight underlayColor="#DDDDDD" onPress={()=>console.log("add function here")}>
                        <Item img={require('../../assets/icons/briefcase.png')} title={'Hanoi, Vietnam'} />
                    </TouchableHighlight >
                    <TouchableHighlight underlayColor="#DDDDDD" onPress={()=>console.log("add function here")}>
                        <Item img={require('../../assets/icons/hat.png')} title={'Went to ...'} />
                    </TouchableHighlight >
                    <TouchableHighlight underlayColor="#DDDDDD" onPress={()=>console.log("add function here")}>
                        <Item img={require('../../assets/icons/home.png')} title={'Hanoi, Vietnam'} />
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor="#DDDDDD" onPress={()=>console.log("add function here")}>
                        <Item img={require('../../assets/icons/gps.png')} title={'From ...'} />
                    </TouchableHighlight >
                    <TouchableHighlight underlayColor="#DDDDDD" onPress={()=>console.log("add function here")}>
                        <Item img={require('../../assets/icons/heart.png')} title={'Relationship Status'} /> 
                    </TouchableHighlight >
                                
                </View>
                
            </View>
            <View style={styles.aboutButtom, {marginTop: '5%',marginBottom: '5%'}}>
                <TouchableOpacity onPress={()=>console.log('end')} style={styles.aboutButtom} >
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