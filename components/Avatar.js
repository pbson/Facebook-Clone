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

const Avatar = ({url}) => {
    return (
        <TouchableOpacity activeOpacity={0.7} style={styles.imageContainer}>
            <View style={styles.imageContainer}>
                <Image
                    style={styles.image}
                    source={
                        {
                        
                         uri: url
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
