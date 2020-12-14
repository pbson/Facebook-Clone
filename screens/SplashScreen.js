import React from 'react';
import { View, Text } from 'react-native';
const SplashScreen = () => {
    performTimeConsumingTask = async () => {
        return new Promise((resolve) =>
            setTimeout(
                () => { resolve('result') },
                2000
            )
        )
    }
    useEffect(() => {
        // Preload data from an external API
        // Preload data using AsyncStorage
        const data = await performTimeConsumingTask();
        if (data !== null) {
            this.props.navigation.navigate('App');
        }
    })
    return (
        <View style={styles.viewStyles}>
            <Text style={styles.textStyles}>
                Blitz Reading
        </Text>
        </View>
    );
}
const styles = {
    viewStyles: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'orange'
    },
    textStyles: {
        color: 'white',
        fontSize: 40,
        fontWeight: 'bold'
    }
}
export default SplashScreen;