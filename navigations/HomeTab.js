import React, { Component } from "react";
import { AsyncStorage, View, ScrollView, StyleSheet, StatusBar } from "react-native";
import Header from "../components/Header";
import AddStatus from "../components/AddStatus";
// import Status from "../components/Status";
// import Story from "../components/Story"; FIX THIS HERE

const Home = () => {

    // async componentDidMount() {
    //     const token = await AsyncStorage.getItem('token');
    //     if (token === null) {
    //             Navigation.push(this.props.componentId, {
    //                 component: {
    //                     name: "Login"
    //                 }
    //             });
    //         }
    // } FIX THIS HERE

    return (
        <View style={styles.container}>
            <Header/>
            {/* <Header componentId={this.props.componentId} /> */}
            <StatusBar
                barStyle="light-content"
                backgroundColor="#30477C"
                translucent={true}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <AddStatus />
                {/* <AddStatus photo={photo} /> FIX THIS HERE*/}
                {/* <Story /> FIX THIS HERE*/ }
                <View style={styles.lineBorder} />
                {/* <Status /> */}
            </ScrollView>
        </View>
    );
}

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    lineBorder: {
        borderColor: "#DDDDE4",
        borderWidth: 2
    }
});
