import React, {useEffect} from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity,BackHandler,Platform} from "react-native";
import  LottieView from'lottie-react-native'
import {Platform as platform} from "expo-modules-core/src";
import {useNavigation} from "@react-navigation/native";

export default function GoalSetting() {
    const [steps, setSteps] = React.useState(7000);
    const [cal, setCal] = React.useState(400);
    const [km,setKms] = React.useState(5);
    const navigation = useNavigation();
    useEffect(() => {
        const BackHandle=BackHandler.addEventListener('hardwareBackPress',()=> {
            if (platform.OS === 'android') {
                BackHandler.exitApp();
            }
        })
    }, []);
    return (
        <View style={styles.container}>
            <View style={styles.lottieContainer}>
                <LottieView
                    source={require('../assets/newAssets/background.json')} // replace with your Lottie JSON
                    autoPlay
                    loop
                    resizeMode="cover"
                    style={StyleSheet.absoluteFillObject}
                />
                <View style={styles.whitishOverlay} />
            </View>
            <View style={{top:'5%',position:'absolute',alignSelf:'center',flexDirection:'column',gap:40,flex:1}}>
            <Text style={{color:'white',fontSize:28,fontWeight:'600',textAlign:'center',alignSelf:'center',zIndex:10}}>Set your Goals</Text>
            <Image source={require('../assets/newAssets/icons8-goal-100.png')} style={{height:150,width:150,zIndex:10}}></Image>
            </View>
            <View style={{flex:1,backgroundColor:'rgba(0,0,0,0.5)',position:'absolute',width:'100%',height:'100%',top:'25%'}}>
                <View style={{flexDirection:'row',justifyContent:'space-evenly',alignItems:'center',top:'10%'}}>
                    <TouchableOpacity onPress={() => setSteps(steps-500)}>
                        <Image style={{height:50,width:50,tintColor:'#d00000'}} source={require('../assets/newAssets/icons8-minus-100.png')}></Image></TouchableOpacity>
                    <View style={{alignItems:'center',justifyContent:'center'}}>
                        <Text style={{color:'#d00000',fontSize:40,fontWeight:'bold'}}>{steps}</Text>
                        <Text style={{color:'#d00000',fontSize:15,fontWeight:'bold'}}>STEPS/DAY</Text>
                    </View>
                    <TouchableOpacity onPress={() => setSteps(steps+500)}><Image style={{height:50,width:50,tintColor:'#d00000'}} source={require('../assets/newAssets/icons8-plus-100.png')}></Image> </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-evenly',alignItems:'center',top:'12%'}}>
                    <TouchableOpacity onPress={() => setCal(cal-50)}><Image style={{height:50,width:50,tintColor:'#ffba08'}} source={require('../assets/newAssets/icons8-minus-100.png')}></Image></TouchableOpacity>
                    <View style={{alignItems:'center',justifyContent:'center'}}>
                    <Text style={{color:'#ffba08',fontSize:40,fontWeight:'bold'}}>{cal}</Text>
                    <Text style={{color:'#ffba08',fontSize:15,fontWeight:'bold'}}>KCAL/DAY</Text>
                    </View>
                    <TouchableOpacity onPress={() => setCal(cal+50)}><Image style={{height:50,width:50,tintColor:'#ffba08'}} source={require('../assets/newAssets/icons8-plus-100.png')}></Image> </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-evenly',alignItems:'center',top:'14%'}}>
                    <TouchableOpacity onPress={() => setKms(km-0.5)}><Image style={{height:50,width:50,tintColor:'#00b4d8'}} source={require('../assets/newAssets/icons8-minus-100.png')}></Image></TouchableOpacity>
                    <View style={{alignItems:'center',justifyContent:'center'}}>
                        <Text style={{color:'#00b4d8',fontSize:40,fontWeight:'bold'}}>{km}</Text>
                        <Text style={{color:'#00b4d8',fontSize:15,fontWeight:'bold'}}>KM/DAY</Text>
                    </View>
                    <TouchableOpacity onPress={() => setKms(km+0.5)}><Image style={{height:50,width:50,tintColor:'#00b4d8'}} source={require('../assets/newAssets/icons8-plus-100.png')}></Image> </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={()=>navigation.reset({index:0,routes:[{ name: 'Permission' }]})} style={{backgroundColor:'white',height:50,width:'90%',justifyContent:'center',alignItems:'center',borderRadius:5,bottom:'30%',position:'absolute',alignSelf:'center'}}><Text style={{color:'black',fontWeight:'bold',fontSize:20}}>Continue</Text></TouchableOpacity>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'rgba(0,0,0,0.85)',
    },
    whitishOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255,255,255,0.2)'
    },
    lottieContainer: {
        ...StyleSheet.absoluteFillObject,
        zIndex: -1,
    },
})
