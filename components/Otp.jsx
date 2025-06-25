import React, { useEffect, useRef, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, TextInput, Keyboard, Alert, ActivityIndicator } from 'react-native';
import  LottieView from'lottie-react-native'
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

export default function Otp(props) {
    const navigation = useNavigation();
    const { phone } = props.route.params;
    const [otp, setOtp] = useState(['', '', '', '']);
    const refs = useRef([]);
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const [isResendDisabled, setIsResendDisabled] = useState(true);
    const [timer, setTimer] = useState(30);
    const [borderColors, setBorderColors] = useState(['white', 'white', 'white', 'white']);
    const [loading, setLoading] = useState(false);

    const handleChange = (text, i) => {
        const newOtp = [...otp];
        newOtp[i] = text;
        setOtp(newOtp);
        if (text && i < 3) refs.current[i + 1].focus();
    };

    const handleBack = (e, i) => {
        if (e.nativeEvent.key === 'Backspace' && !otp[i] && i > 0) {
            refs.current[i - 1].focus();
        }
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    const handleResendOtp = async () => {
        try {
            setLoading(true);
            await axios.post('http://192.168.204.231:5000/send-otp', {
                phone: `${phone}`,
            });
            setOtp(['', '', '', '']);
            setTimer(30);
            setIsResendDisabled(true);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleVerify = async () => {
        const enteredOtp = otp.join('');
        if (enteredOtp.length < 4) {
            Alert.alert('Please enter the complete OTP.');
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post('http://192.168.204.231:5000/verify-otp', {
                phone: `${phone}`,
                otp: enteredOtp,
            });

            if (response.data.success) {
                setBorderColors(['green', 'green', 'green', 'green']);
                navigation.navigate('Home');
            } else {
                setBorderColors(['red', 'red', 'red', 'red']);
                Alert.alert('Error', 'Incorrect OTP');
            }
        } catch (err) {
            setBorderColors(['red', 'red', 'red', 'red']);
            Alert.alert('Server Error', 'Failed to verify OTP');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const showListener = Keyboard.addListener('keyboardDidShow', (e) => setKeyboardVisible(e.endCoordinates.height));
        const hideListener = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));
        return () => {
            showListener.remove();
            hideListener.remove();
        };
    }, []);

    useEffect(() => {
        let interval;
        if (isResendDisabled && timer > 0) {
            interval = setInterval(() => setTimer((t) => t - 1), 1000);
        } else {
            clearInterval(interval);
            setIsResendDisabled(false);
        }
        return () => clearInterval(interval);
    }, [isResendDisabled, timer]);

    return (
        <View style={styles.container}>
            <StatusBar style={'light'} translucent />
            <View style={styles.lottieContainer}>
                <LottieView
                    source={require('../assets/newAssets/background.json')} // replace with your Lottie JSON
                    autoPlay
                    loop
                    resizeMode="cover"
                    style={StyleSheet.absoluteFillObject}
                />
            </View>

            <View style={[StyleSheet.absoluteFillObject,]}>
                <View style={{ top: '8%', left: '5%', flexDirection: 'row', gap: 20 }}>
                    <TouchableOpacity onPress={() => navigation.replace('Login')}>
                        <Image source={require('../assets/newAssets/icons8-back-50.png')} style={{ height: 35, width: 35 }} />
                    </TouchableOpacity>
                    <Text style={{ color: 'white', fontSize: 24, fontWeight: '800' }}>Verification</Text>
                </View>

                <Text style={{ color: 'white', fontSize: 15, fontWeight: '600', textAlign: 'center',position:'absolute',top:'45%',alignSelf:'center'}}>
                    Please enter the OTP sent to +91 {phone}
                </Text>

                <View style={{ flexDirection: 'row', gap: 20, position: 'absolute', alignSelf: 'center', top: '35%' }}>
                    {otp.map((val, i) => (
                        <TextInput
                            key={i}
                            ref={(r) => (refs.current[i] = r)}
                            style={[styles.box, { borderColor: borderColors[i] }]}
                            keyboardType="number-pad"
                            maxLength={1}
                            value={val}
                            onChangeText={(t) => handleChange(t, i)}
                            onKeyPress={(e) => handleBack(e, i)}
                        />
                    ))}
                </View>

                {/*{loading ? (*/}
                {/*    <ActivityIndicator size="large" color="white" style={styles.loading} />*/}
                {/*) : (*/}
                {/*    <TouchableOpacity*/}
                {/*        onPress={handleVerify}*/}
                {/*        style={[styles.continueButton, { bottom: keyboardVisible ? keyboardVisible : 10 }]}>*/}
                {/*        <Text style={styles.continueText}>Continue</Text>*/}
                {/*    </TouchableOpacity>*/}
                {/*)}*/}
                <TouchableOpacity
                    onPress={()=>navigation.replace('Details')}
                    style={[styles.continueButton, { bottom: keyboardVisible ? keyboardVisible : 10 }]}>
                    <Text style={styles.continueText}>Continue</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleResendOtp} style={styles.resendButton} disabled={isResendDisabled}>
                    <Text style={styles.resendText}>
                        {isResendDisabled ? `Resend in ${formatTime(timer)}` : 'Resend OTP'}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1,backgroundColor:'rgba(0,0,0,0.85)'},
    video: { position: 'absolute', height: '100%', width: '100%' },
    box: {
        borderWidth: 1,
        borderRadius: 10,
        width: 60,
        height: 60,
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
    },
    continueButton: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        position: 'absolute',
        bottom: 50,
        left: 20,
        right: 20,
        opacity: 0.9,
        height:50,
    },
    continueText: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    resendButton: {
        position: 'absolute',
        bottom: 20,
      alignSelf:'center',
        top:'50%'
    },
    resendText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    loading: { position: 'absolute', top: '50%', left: '45%' },
    lottieContainer: {
        ...StyleSheet.absoluteFillObject,
        zIndex: -1,
    },
});

