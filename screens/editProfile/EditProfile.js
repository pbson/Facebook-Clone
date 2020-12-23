import React, { useEffect, useState } from "react";
import {
    ScrollView,
    View,
    StyleSheet,
    Text,
    FlatList,
    TouchableOpacity,
    Image,
} from "react-native";

const EditProfile = ()=>{
    return(
        <ScrollView>
            <View>
               <Text>Profile Pic </Text>
               <Image source={require('../../assets/icons/logos.png')} />
            </View>
            <View>
                <Text>
                    Cover Photo
                </Text>
                <Image source={require('../../assets/coverPhoto.png')}/>
            </View>
            <View>
                <Text>Bio</Text>
                <Text>
                    this is an Bio
                </Text>
            </View>

        </ScrollView>
    )
}