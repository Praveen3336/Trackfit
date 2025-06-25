import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, TextInput, TouchableOpacity, Keyboard} from "react-native";
import  LottieView from'lottie-react-native'
import {Dimensions} from "react-native";
import {useNavigation} from "@react-navigation/native";
const {height, width} = Dimensions.get("window");
export default function Details(){
const[keyboardVisible, setKeyboardVisible] = useState(false);
const navigation = useNavigation();
useEffect(() => {
    const show=Keyboard.addListener('keyboardDidShow',(e)=>{
        setKeyboardVisible(e.endCoordinates.height);
    })
    const hide=Keyboard.addListener('keyboardDidHide',()=>{
        setKeyboardVisible(false);
    })
    return ()=>{
        show.remove();
        hide.remove();
    }
}, []);

    return(
        <View style={styles.container}>
            <View style={styles.lottieContainer}>
                <LottieView
                    source={require('../assets/newAssets/background.json')} // replace with your Lottie JSON
                    autoPlay
                    loop
                    resizeMode="cover"
                    style={StyleSheet.absoluteFillObject}
                />
            </View>
            <View style={{top:'10%',position:'absolute',alignSelf:'center'}}>
                <Text style={{color:'white',textAlign:'center',fontWeight:'800',fontSize:24}}>Before getting started let us know about you</Text>
                <TextInput style={{height:'50',width:width*0.9,backgroundColor:'rgba(255,255,255,0.3)',alignSelf:'center',top:'50%',color:'white',fontSize:20,fontWeight:'800',paddingHorizontal:30,borderRadius:5}} placeholder={'Name'} placeholderTextColor={'white'}></TextInput>
            </View>
            <TouchableOpacity onPress={()=>navigation.replace('Step1')} style={{height:50,width:width*0.9,borderRadius:5,padding:10,backgroundColor:'white',opacity:0.8,justifyContent:'center',alignItems:'center',alignSelf:'center',position:'absolute',bottom:keyboardVisible?keyboardVisible+10:10}}><Text style={{color:'black',fontSize:20,fontWeight:'800'}}>Get Started</Text></TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'rgba(0,0,0,0.9)'
    },
    lottieContainer: {
        ...StyleSheet.absoluteFillObject,
        zIndex: -1,
    },
})
