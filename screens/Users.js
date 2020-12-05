import React from 'react';
import { View, StyleSheet, ViewComponent, Text } from "react-native";

const User = () => {
    return (
        <View style={styles.container}>
            <Text>
                Hello Users
            </Text>
        </View>    
    )
}

export default User

const styles = StyleSheet.create({
    container: { 
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})