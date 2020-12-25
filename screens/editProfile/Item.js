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

const Item = (props) => {
    const [textcolor, setTextColor] = useState('#8A2BE2')
    const [icon, setIcon] = useState(require('../../assets/icons/briefcase.png'))
    const [title, setTitle] = useState('Add  Work Experience')
    useEffect(()=>{
        if(props.img!= undefined){
            setIcon(props.img);   
        }
        if(props.title!=undefined)
        setTitle(props.title)
        console.log(props.img)
    })
    return (
        <View style={styles.item} >
            <View style={{
                width: '10%',
                height: undefined,
                aspectRatio: 1,
                borderRadius: 20,
                marginRight: '2%',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Image style={{
                    width: '55%',
                    height: undefined,
                    aspectRatio: 1,
                }} source={icon} /></View>
            <Text color={textcolor}>{title}</Text>
        </View>
    )
}
export default Item
styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginLeft: "3%",
        alignItems: 'center',
        marginBottom: '1%'
    }
})