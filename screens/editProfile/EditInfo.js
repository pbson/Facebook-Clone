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
import Item from './Item'
const EditInfo = ()=>{
    console.log(require('../../assets/icons/gps.png'))
    return(
    <ScrollView>
    <View style={styles.field}>
        <View style={styles.title}>
            <Text style={{fontWeight: 'bold'}}>Work</Text>
        </View>
        <Item />
    </View>
    <View style={styles.field}>
        <View style={styles.title}>
            <Text style={{fontWeight: 'bold'}}>Education</Text>
        </View>
        <Item img={require('../../assets/icons/hat.png')} title={'Add College'} />
        <Item img={require('../../assets/icons/highchool.png')} title={'Add High School'} />
    </View>
    <View style={styles.field}>
        <View style={styles.title}>
            <Text style={{fontWeight: 'bold'}}>Place Lived</Text>
        </View>
        <Item title={"Add city"} img={require('../../assets/icons/home.png')} />
    </View>
    <View style={styles.field}>
        <View style={styles.title}>
            <Text style={{fontWeight: 'bold'}}>Contact Info</Text>
        </View>
        <Item title={"mobile"} img={require('../../assets/icons/mobile.png')} />
        <Item title={"email"} img={require('../../assets/icons/mail.png')} />
    </View>
    <View style={styles.field}>
        <View style={styles.title}>
            <Text style={{fontWeight: 'bold'}}>Basic Info</Text>
        </View>
        <Item title={"male"} img={require('../../assets/icons/gender.png')} />
        <Item title={"BirthDay"} img={require('../../assets/icons/birthday.png')} />
    </View>
    </ScrollView>
    
    )
}
export default EditInfo
const styles=StyleSheet.create({
    field:{
        flexDirection: 'column',
        marginBottom: '5%',
        borderBottomWidth: 0.5,
        borderBottomColor: '#808080',
        
    },
    title: {
        marginLeft: "5%",
        marginBottom: '4%'
    },
    item:{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginLeft: "5%",
        alignItems: 'center',
        marginBottom: '4%'
    }
})