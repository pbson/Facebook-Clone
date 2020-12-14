import React from "react";
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Image
} from "react-native";
import {
    responsiveHeight,
    responsiveWidth,
} from "react-native-responsive-dimensions";

const Avatar = () => {
    return (
        <TouchableOpacity activeOpacity={0.7} style={styles.imageContainer}>
            <View style={styles.imageContainer}>
                <Image
                    style={styles.image}
                    source={
                        {
                            uri: 'https://images.unsplash.com/photo-1605428265679-09d3898e1f34?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=800&ixlib=rb-1.2.1&q=80&w=1000'
                        }
                    }
                />
            </View>
        </TouchableOpacity>
    );
};

export default Avatar;

const styles = StyleSheet.create({
    imageContainer: {
        height: responsiveHeight(6),
        width: responsiveHeight(6)
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 200,
    },
});
