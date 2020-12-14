import React from "react";
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Image
} from "react-native";
import {
    responsiveFontSize,
    responsiveHeight,
    responsiveWidth,
} from "react-native-responsive-dimensions";
import { Ionicons } from "@expo/vector-icons";

const Chat = ({ conversationId, partnerId, phonenumber, time, message, hasSeen, proPicUrl, seenProPicUrl, navigation }) => {
    let currentDate = new Date()
    const openChatView = () => {
        navigation.navigate('ChatView', {
            conversationId: conversationId,
            partnerId: partnerId,
            phonenumber: phonenumber,
            proPicUrl: proPicUrl,
        })
    }
    const formatTime = new Date(time)

    return (
        <TouchableOpacity
            onPress={openChatView}
            activeOpacity={0.7}
            style={styles.container}
        >
            <View style={styles.proPicContainer}>
                <Image
                    source={{
                        uri: proPicUrl
                    }}
                    style={styles.proPic}
                />
            </View>
            <View style={styles.descriptionContainer}>
                <View style={styles.nameContainer}>
                    <Text style={styles.name}>{phonenumber}</Text>
                </View>
                <View style={styles.detailsContainer}>
                    <Text style={styles.message}> You : {message} </Text>
                    {(!currentDate.getDate() - formatTime.getDate() > 1) ?
                        <Text style={styles.time}>{formatTime.toDateString()}</Text>
                        :
                        <Text style={styles.time}>{formatTime.toLocaleTimeString()}</Text>
                    }
                </View>
            </View>
            <View style={styles.seenProPicContainer}>
                {!hasSeen ?
                    <View style={styles.deliveryMarkContainer}>
                        <Ionicons
                            name="ios-checkmark"
                            size={responsiveFontSize(1)}
                            color="white"
                        />
                    </View>
                    :
                    <Image
                        style={styles.seenProPic}
                        source={{
                            uri: seenProPicUrl
                        }}
                    />
                }
            </View>
        </TouchableOpacity>
    );
};

export default Chat;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        height: responsiveHeight(9),
        paddingHorizontal: 8,
        marginVertical: 2
    },
    proPicContainer: {
        width: '17%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    proPic: {
        width: responsiveHeight(7),
        height: responsiveHeight(7),
        borderRadius: 200
    },
    descriptionContainer: {
        flex: 1,
        paddingLeft: responsiveWidth(2)
    },
    nameContainer: {
        height: '50%',
        justifyContent: 'flex-end',
    },
    name: {
        fontSize: responsiveFontSize(2),
        color: 'rgba(0,0,0,0.8)'
    },
    detailsContainer: {
        flexDirection: 'row'
    },
    message: {
        color: 'rgba(0,0,0,0.8)',
        fontSize: responsiveFontSize(1.7)
    },
    time: {
        paddingHorizontal: 10,
        color: 'rgba(0,0,0,0.8)',
        fontSize: responsiveFontSize(1.5),
        textAlignVertical: 'center'
    },
    seenProPicContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    seenProPic: {
        width: responsiveHeight(2),
        height: responsiveHeight(2),
        borderRadius: 200
    },
    deliveryMarkContainer: {
        width: responsiveHeight(2),
        height: responsiveHeight(2),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(211,211,211,0.8)',
        borderRadius: 200
    }
})
