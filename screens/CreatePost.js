import React, { Component } from 'react'
import { Keyboard, Animated, Text, StyleSheet, View, SafeAreaView, TouchableOpacity, TextInput,
     Image, Dimensions, ImageBackground, KeyboardAvoidingView, KeyboardAvoidingViewComponent, StatusBar, panResponder, PanResponder, TouchableHighlight,Modal  } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
class CreatePost extends Component {
   ///////////////////////////////////////////////// 
   constructor(props) {
    super(props);
    this.state = { modalVisible: false};
    
  }
  dismis() {
    Keyboard.dismiss();
    this.pan.y.setValue(0);
    
}
    toggleModal() {
        this.setState(prevState=>({modalVisible: !prevState.modalVisible}))

    }

    pan = new Animated.ValueXY();
    panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      this.pan.setValue({
        x: this.pan.x._value,
        y: this.pan.y._value
      });
    },
    onPanResponderMove: Animated.event([
        null,
        {dx: this.pan.x, dy: this.pan.y}
      ]),
  
    onPanResponderRelease : (event, gestureState)=> {
    if(gestureState.dy<20)
      {this.pan.y.setValue(0.0)}
    else
    {this.pan.y.setValue(screenHeight)}

    }
  })
  
  /////////////////////////////////////////////////
    render(){
         
        const editorWrapperHeight = this._editorWrapperHeight
        return (

            <Modal
            animationType="slide"
            hardwareAccelerated={true}
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {
                // this.setModalVisible(!this.state.modalVisible); FIX THIS HERE
            }}>
                
        
                    <SafeAreaView style={styles.container} >
                        <View style={styles.navigationBar}>
                                <TouchableOpacity onPress={()=>this.toggleModal()} style={styles.naviIcon}>
                                    <FontAwesome5Icon color="#000" name="times" size={20}></FontAwesome5Icon>
                                </TouchableOpacity>
                                <Text style={styles.naviTitle}>Create a Post</Text>
                                <TouchableOpacity style={styles.btnPost} onPress={()=>{console.log("Need Post api!")}} disabled={false}>
                                    <Text style={{ fontSize: 16 ,color: "#1E90FF",fontWeight: 'bold'}}>Post</Text>
                                </TouchableOpacity>
                        </View>
                        <View style={styles.infoWrapper}>
                            <Image style={styles.avatar} source={require("../assets/favicon.png")}></Image>
                                <View>
                                    <Text style={styles.name}>{"Hien"}</Text>
                                    <View style={styles.areaWrapper}>
                                        <TouchableOpacity style={styles.areaOption} onPress={()=>this.pan.y.setValue(0)}>
                                            <FontAwesome5Icon style={{ marginRight: 3 }} name="globe-asia" size={14}> </FontAwesome5Icon>
                                            <Text>Public</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                        </View>
                        
                            <View style={{ ...styles.editorWrapper }}>
                            
                                    <TextInput
                                        onFocus={()=>this.pan.y.setValue(screenHeight)}
                                        //onContentSizeChange={this.onContentSizeChangeHandler.bind(this)}
                                        placeholderTextColor={"black"}
                                        placeholder="What's on your mind?"
                                        placeholderTextColor="#808080" 
                                        onChangeText={text=>{}}
                                        multiline numberOfLines={1} style={{
                                            ...styles.editor, fontSize: 20,
                                            textAlign: 'left', fontWeight: 'normal',
                                        
                                        }}>
                                    </TextInput>  
                                
                                    <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={140}style={{position: 'absolute', top: screenHeight/1.44}}>
                                        <View style={styles.bottomTab}>
                                            <Image style={styles.bottomSheetIcon} source={require('../assets/icons/cam.png')} />
                                            <Image style={styles.bottomSheetIcon} source={require('../assets/icons/pic.png')} />
                                            <TouchableHighlight onPress= {this.dismis.bind(this)} >
                                                <Image style={styles.bottomSheetIcon} source={require('../assets/icons/dot-icon.png')} />
                                            </TouchableHighlight>
                                        </View>
                                    </KeyboardAvoidingView>
                                        
                                    <Animated.View 
                                    style={{
                                        transform: [{translateY: this.pan.y}]}}
                                    {...this.panResponder.panHandlers}
                                    >
                                        <View style={styles.bottemSheet}>
                                            <View style={{flexDirection: "column"}}>
                                                
                                                <View style={{paddingTop:8, paddingBottom: 16}}>
                                                    <View style={styles.grapper} /> 
                                                </View>
                                                <TouchableHighlight
                                                onPress={this.onPress}
                                                >
                                                <View style={styles.itemStyle}>
                                                        <Image source={require('../assets/icons/pic.png')} style={styles.bottomSheetIcon}  />
                                                        <Text >Photo/Video</Text>
                                                </View>
                                                </TouchableHighlight>
                                                <View style={styles.itemStyle}>
                                                    <Image source={require('../assets/icons/cam.png')} style={styles.bottomSheetIcon}  />
                                                        <Text>Camera!!!</Text>
                                                </View>
                                            </View>
                                        </View>
                                </Animated.View> 
                               
                            </View>
                                
                            
                        
                        
                    </SafeAreaView>
                    </Modal>
                
        )
    }
}

const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);
export default CreatePost
const styles = StyleSheet.create({
    parentContainer: {
        height: screenHeight,
        position: 'relative',
        top: StatusBar.currentHeight
    },
    container: {
        height: "100%",
        width: '100%',
        backgroundColor: '#fff'
    },
    navigationBar: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        height: screenHeight/12,
        paddingTop: StatusBar.currentHeight
    },
    naviIcon: {
        padding: 10,
    },
    naviTitle: {
        paddingHorizontal: 10,
        fontSize: 16
    },
    btnPost: {
        position: 'absolute',
        right:10,
        paddingTop:StatusBar.currentHeight,
 
    },
    infoWrapper: {
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },
    areaWrapper: {
        flexDirection: 'row'
    },
    areaOption: {
        marginRight: 10,
        paddingHorizontal: 5,
        paddingVertical: 2.5,
        borderColor: '#696969',
        borderWidth: 1,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center'
    },
    avatar: {
        marginRight: 10,
        borderRadius: 50,
        width: 40,
        height: 40
    },
    name: {
        fontSize: 14,
        fontWeight: 'bold'
    },
    editorWrapper: {
        overflow: 'visible',
        padding: 0,
        paddingHorizontal: 0,
        height: "100%",
        flexDirection: 'column'
    },
    editor: {
        position: "absolute",
        top: 0,
        marginLeft: "5%",
        justifyContent: 'center',
        height: "auto",
        width: '100%',
        
        
    },
    toolOptionsWrapper: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        paddingBottom: 55,
    },
    optionsWrapper: {
        backgroundColor: '#fff',
        position: 'absolute',
        width: '100%',
        left: 0,
        zIndex: 999999
    },
    optionTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        height: 55,
        alignItems: 'center',
        borderTopColor: '#ddd',
        borderTopWidth: 1
    },
    optionImagesWrapper: {
        flexDirection: 'row',
        zIndex: 1
    },
    optionImage: {
        height: 25,
        resizeMode: "contain"
    },
    bgColorsWrapper: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        height: 50
    },
    bgColorsScrollView: {
        flexDirection: 'row'
    },
    btnBgColor: {
        height: 30,
        width: 30,
    },
    bgColor: {
        height: 30,
        width: 30,
        marginHorizontal: 5,
    },
    bgImage: {
        resizeMode: 'cover',
        height: 30,
        width: 30,
        borderRadius: 10,
        borderWidth: 1,

    },
    toggleBgColors: {
        padding: 5,
        borderWidth: 0,
        position: 'absolute',
        top: 0,
        left: 0
    },
  
      bottemSheet:{  
        position: "absolute",
        top: screenHeight/3,
        height: screenHeight,
        width: screenWidth,
        left: 0,
        backgroundColor: "white",
        borderRadius: 15,
        shadowOffset:{  width: 0,  height: 24,  },
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: -1,
        },
        shadowOpacity: 0.3,
        shadowRadius: 5.00,
        flexDirection: "column",
        
      },
      grapper: {
        height: 5,
        width: 50,
        backgroundColor: "grey",
        alignSelf: 'center',
        borderRadius: 2,
        
      },
      itemStyle: {
        height:50,  
        alignItems: 'center',
        flexDirection: "row",

      },
      bottomSheetIcon: {
        marginRight: 10,
        marginLeft: 10,
          width:30,
          height:30,
      },
      bottomTab:{
        
        height: screenHeight/11.5,
        width: screenWidth,
        left: 0,
        backgroundColor: "white",
        borderRadius: 15,
        shadowOffset:{  width: 0,  height: 24,  },
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: -1,
        },
        shadowOpacity: 0.3,
        shadowRadius: 5.00,
        flexDirection: "row",
        justifyContent: 'space-around',
        alignItems: 'center'
      }

})
