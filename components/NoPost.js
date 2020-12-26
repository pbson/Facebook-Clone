import React from "react";
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
    Text
} from "react-native";
import {
    responsiveHeight,
    responsiveWidth,
} from "react-native-responsive-dimensions";

const NoPost = ({navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                You have no Posts yet.
            </Text>
            <Text style = {styles.text}>
                Let's add more friends to see Post
            </Text>
            <TouchableOpacity onPress = {()=> navigation.navigate('Friends')} activeOpacity={0.7} style={styles.friendButton}>
                <Text style={{color: 'white', fontWeight: "bold"}}>Go to Friend Suggestions</Text>
            </TouchableOpacity>
        </View>
    );
};

export default NoPost;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: "90%",
        marginTop: 20
    },  
    text: {
        fontWeight:'bold',
        fontSize:20
    },
    friendButton: {
        marginTop: 20,
        backgroundColor: '#006AFF',
        width:responsiveWidth(40),
        height: responsiveHeight(5),
        color: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:10
    }

});
