import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert,Platform } from 'react-native';
import  LottieView from'lottie-react-native'
import * as Location from 'expo-location';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import * as Notifications from 'expo-notifications';
import {useNavigation} from "@react-navigation/native";
export default function Permissions() {
    const [Locationpermission, setLocationPermission] = useState(null);
    const [PhysicalPermission, setPhysicalPermission] = useState(null);
    const [NotificationPermission, setNotificationPermission] = useState(null);
    const navigation = useNavigation();
    const getLocationPermission = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        setLocationPermission(status);
        if (status === 'granted') {
            Alert.alert('Location permission granted');
        } else {
            Alert.alert('Location permission denied');
        }
    };
    const getPhysicalActivityPermission = async () => {
        if (Platform.OS === 'android') {
            const result = await request(PERMISSIONS.ANDROID.ACTIVITY_RECOGNITION);
            if (result === RESULTS.GRANTED) {
                setPhysicalPermission('granted');
                Alert.alert('Physical activity permission granted');
            } else {
                setPhysicalPermission('denied');
                Alert.alert('Physical activity permission denied');
            }
        } else {
            Alert.alert('Physical activity permission not required on iOS');
        }
    };
    const getNotificationPermission = async () => {
        const { status } = await Notifications.requestPermissionsAsync();
        setNotificationPermission(status);
        Alert.alert(status === 'granted' ? 'Notification permission granted' : 'Notification permission denied');
    };

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
            </View>

            <Text style={{ position: 'absolute', color: 'white', top: '10%', alignSelf: 'center', fontSize: 25, fontWeight: 'bold' }}>
                Permissions Required
            </Text>
            <Text style={{ position: 'absolute', color: 'white', top: '15%', alignSelf: 'center', fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>
                Please Provide the following permissions
            </Text>

            <View style={{ flexDirection: 'column', width: '100%', height: '30%', top: '25%', gap: 20 }}>
                <View style={styles.permissionCard}>
                    <Image source={require('../assets/newAssets/icons8-location-100.png')} style={styles.icon} />
                    <Text style={styles.permissionText}>Location</Text>
                    <TouchableOpacity style={styles.allowButton} onPress={getLocationPermission} disabled={Locationpermission==='granted'}>
                        <Text style={styles.allowText}>{Locationpermission==='granted'? 'Allowed':'Allow'}</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.permissionCard}>
                    <Image source={require('../assets/newAssets/icons8-running-100.png')} style={styles.icon} />
                    <Text style={styles.permissionText}>Physical Activities</Text>
                    <TouchableOpacity disabled={PhysicalPermission==='granted'} style={styles.allowButton} onPress={getPhysicalActivityPermission}>
                        <Text style={styles.allowText}>{PhysicalPermission==='granted'?'Allowed':'Allow'}</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.permissionCard}>
                    <Image source={require('../assets/newAssets/icons8-notification-96.png')} style={styles.icon} />
                    <Text style={styles.permissionText}>Notification</Text>
                    <TouchableOpacity disabled={NotificationPermission==='granted'} style={styles.allowButton} onPress={getNotificationPermission}>
                        <Text style={styles.allowText}>{NotificationPermission==='granted'?'Allowed':'Allow'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
                <TouchableOpacity onPress={()=>navigation.reset({index:0,routes:[{name:'MainHome'}]})} style={{height:50,width:'90%',position:'absolute',backgroundColor:'white',alignSelf:'center',justifyContent:'center',alignItems:'center',bottom:10,opacity:0.7,borderRadius:5}}><Text style={{color:'black',fontSize:24,fontWeight:'600'}}>Continue</Text></TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'rgba(0,0,0,0.90)',
    },
    permissionCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.2)',
        height: 100,
        width: '90%',
        alignSelf: 'center',
        borderRadius: 5,
        gap: 30,
    },
    icon: {
        height: 40,
        width: 40,
        position: 'absolute',
        left: '3%',
    },
    permissionText: {
        color: 'white',
        fontSize: 20,
        fontWeight: '800',
        position: 'absolute',
        left: '15%',
    },
    allowButton: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        height: 50,
        width: '22%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        position: 'absolute',
        right: '5%',
    },
    allowText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    lottieContainer: {
        ...StyleSheet.absoluteFillObject,
        zIndex: -1,
    },
});
