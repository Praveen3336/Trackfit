import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions,
    ActivityIndicator, TextInput, Alert
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import LottieView from 'lottie-react-native';
import {useNavigation} from "@react-navigation/native";

const { width } = Dimensions.get('window');
const PROFILE_IMAGE_PATH = FileSystem.documentDirectory + 'profileImage.jpg';

export default function Profile() {
    const [profileImage, setProfileImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const year=new Date().getFullYear();
    const navigation = useNavigation();

    // Load saved image on component mount
    useEffect(() => {
        loadProfileImage();
    }, []);

    const loadProfileImage = async () => {
        try {
            const fileInfo = await FileSystem.getInfoAsync(PROFILE_IMAGE_PATH);
            if (fileInfo.exists) {
                setProfileImage(PROFILE_IMAGE_PATH);
            }
        } catch (error) {
            console.error("Error loading profile image: ", error);
        }
    };

    const handleImagePick = async () => {
        setIsLoading(true);
        try {
            const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (!permission.granted) {
                alert('Permission to access media library is required!');
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.8,
            });

            if (!result.canceled) {
                await saveImage(result.assets[0].uri);
            }
        } catch (error) {
            console.error("Error picking image: ", error);
            alert("Error selecting image");
        } finally {
            setIsLoading(false);
        }
    };

    const saveImage = async (uri) => {
        try {
            await FileSystem.copyAsync({
                from: uri,
                to: PROFILE_IMAGE_PATH,
            });
            setProfileImage(PROFILE_IMAGE_PATH);
        } catch (error) {
            console.error("Error saving image: ", error);
            alert("Error saving profile image");
        }
    };

    const deleteImage = async () => {
        try {
            await FileSystem.deleteAsync(PROFILE_IMAGE_PATH);
            setProfileImage(null);
        } catch (error) {
            console.error("Error deleting image: ", error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.lottieContainer}>
                <LottieView
                    source={require('../assets/newAssets/background.json')}
                    autoPlay
                    loop
                    resizeMode="cover"
                    style={StyleSheet.absoluteFillObject}
                />
            </View>

            {profileImage ? (
                <Image source={{ uri: profileImage }} style={styles.profileImage} />
            ) : (
                <View style={styles.profilePlaceholder}>
                    <Text style={styles.placeholderText}>No Image Selected</Text>
                </View>
            )}

            <Text style={styles.nameText}>Praveen Karuppusamy</Text>

            <TouchableOpacity
                onPress={handleImagePick}
                style={styles.cameraButton}
                disabled={isLoading}
            >
                {isLoading ? (
                    <ActivityIndicator color="white" />
                ) : (
                    <Image
                        style={{ height: 40, width: 40 }}
                        source={require('../assets/newAssets/icons8-camera-96.png')}
                    />
                )}
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate('MainHome')}><Image style={{height:40,width:40,top:'100%',left:'2%'}} source={require('../assets/newAssets/icons8-back-50.png')}></Image></TouchableOpacity>
            {profileImage && (
                <TouchableOpacity
                    onPress={deleteImage}
                    style={styles.deleteButton}
                >
                    <Text style={styles.deleteButtonText}>Delete Photo</Text>
                </TouchableOpacity>
            )}
            <View style={styles.infoBox}>
                <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>WEIGHT</Text>
                    <Text style={styles.infoValue}>85 <Text style={{color:'rgba(255,255,255,0.5)'}}>KG</Text></Text>
                </View>
                <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>HEIGHT</Text>
                    <Text style={styles.infoValue}>175 <Text style={{color:'rgba(255,255,255,0.5)'}}>cm</Text></Text>
                </View>
                <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>BMI</Text>
                    <Text style={styles.infoValue}>26.9</Text>
                </View>
            </View>
            <View style={{top:'50%'}}>
                <Text style={{color:'rgba(255,255,255,0.5)',fontSize:14,fontWeight:'bold',left:'5%',top:10}}>GENDER</Text>
                <TextInput editable={false} value={'Male'} style={{borderBottomWidth:1,borderBottomColor:'white',width:'90%',alignSelf:'center',color:'white',paddingVertical:15,fontSize:15,fontWeight:'bold'}} ></TextInput>
                <Text style={{color:'rgba(255,255,255,0.5)',fontSize:14,fontWeight:'bold',left:'5%',top:10}}>DATE OF BIRTH</Text>
                <TextInput editable={false} value={`09 August 2005 (${new Date().getFullYear() - 2005} years)`} style={{borderBottomWidth:1,borderBottomColor:'white',width:'90%',alignSelf:'center',color:'white',paddingVertical:15,fontSize:15,fontWeight:'bold'}}></TextInput>
                <Text style={{color:'rgba(255,255,255,0.5)',fontSize:14,fontWeight:'bold',left:'5%',top:10}}>PHONE NUMBER</Text>
                <TextInput editable={false} value={'9159460443'} style={{borderBottomWidth:1,borderBottomColor:'white',width:'90%',alignSelf:'center',color:'white',paddingVertical:15,fontSize:15,fontWeight:'bold'}} ></TextInput>
                <TouchableOpacity style={{height:50,width:'90%',backgroundColor:'white',top:50,alignSelf:'center',borderRadius:5,justifyContent:'center',alignItems:'center'}}><Text style={{color:'black',fontSize:20,fontWeight:'bold'}}>LOGOUT</Text></TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.93)',
    },
    lottieContainer: {
        ...StyleSheet.absoluteFillObject,
        zIndex: -1,
    },
    profileImage: {
        width: '100%',
        height: '50%',
        position: 'absolute',
        top: 0,
        borderRadius: 10,
        resizeMode: 'cover',
    },
    profilePlaceholder: {
        width: '100%',
        height: '50%',
        position: 'absolute',
        top: '0',
        borderRadius: 10,
        backgroundColor: 'rgba(255,255,255,0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderText: {
        color: 'white',
        fontSize: 16,
    },
    nameText: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold',
        top: '45%',
        left: '5%',
        position: 'absolute',
        zIndex: 2,
    },
    cameraButton: {
        position: 'absolute',
        top: '42%',
        right: '2%',
        zIndex: 10,
        backgroundColor: 'rgba(255,255,255,0.2)',
        height: 60,
        width: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40,
    },
    deleteButton: {
        position: 'absolute',
        top: '43%',
        right: '10%',
        zIndex: 10,
        backgroundColor: 'rgba(255,255,255,0.5)',
        padding: 10,
        borderRadius: 8,
    },
    deleteButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    infoBox: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        marginHorizontal: 20,
        marginTop: 20,
        borderRadius: 10,
        padding: 15,
        top:'50%'
    },
    infoItem: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    infoLabel: {
        color: 'rgba(255,255,255,0.5)',
        fontSize: 15,
        fontWeight: '900',
        marginBottom: 5,
    },
    infoValue: {
        color: 'white',
        fontSize: 20,
        fontWeight: '900',
    },
});
