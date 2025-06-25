import { StatusBar } from 'expo-status-bar'
import {
    Keyboard,
    Dimensions,
    StyleSheet,
    TextInput,
    View,
    Text,
    TouchableOpacity,
    Image,
    Animated,
} from 'react-native'
import Carousel from 'react-native-reanimated-carousel'
import { useState, useEffect, useRef } from 'react'
import { useNavigation } from '@react-navigation/native'
import LottieView from 'lottie-react-native'

const { width, height } = Dimensions.get('window')

const images = [
    require('../assets/newAssets/poster1.png'),
    require('../assets/newAssets/poster2.png'),
    require('../assets/newAssets/poster3.png'),
]

export default function Login() {
    const [keyboardVisible, setKeyboardVisible] = useState(false)
    const [phone, setPhone] = useState('')
    const [modal, setModal] = useState(false)
    const [otpSent, setOtpSent] = useState(false)
    const opacity = useRef(new Animated.Value(0)).current
    const navigation = useNavigation()

    const handleSubmit = async () => {
        if (phone.length !== 10) {
            setModal(true)
            return
        }
        navigation.navigate('Otp', { phone: phone })
    }

    useEffect(() => {
        const show = Keyboard.addListener('keyboardDidShow', (e) =>
            setKeyboardVisible(e.endCoordinates.height)
        )
        const hide = Keyboard.addListener('keyboardDidHide', () =>
            setKeyboardVisible(false)
        )
        return () => {
            show.remove()
            hide.remove()
        }
    }, [])

    useEffect(() => {
        Animated.timing(opacity, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start()
    }, [])

    return (
        <View style={styles.container}>
            <StatusBar style="light" translucent />

            <View style={styles.lottieContainer}>
                <LottieView
                    source={require('../assets/newAssets/background.json')} // replace with your Lottie JSON
                    autoPlay
                    loop
                    resizeMode="cover"
                    style={StyleSheet.absoluteFillObject}
                />
            </View>
<View style={[StyleSheet.absoluteFillObject]}>

            <Carousel
                loop
                autoPlay
                width={width}
                height={height}
                data={images}
                scrollAnimationDuration={2000}
                renderItem={({ item }) => (
                    <Image source={item} style={styles.image} resizeMode="cover" />
                )}
            />
</View>

            {modal && (
                <Animated.View
                    style={[
                        styles.warning,
                        { bottom: keyboardVisible ? keyboardVisible + 200 : -50 },
                        { opacity },
                    ]}
                >
                    <Text style={{ fontWeight: '500' }}>
                        ⚠️ Please enter a valid 10-digit number
                    </Text>
                </Animated.View>
            )}

            <View
                style={[
                    styles.textInputContainer,
                    {
                        bottom: keyboardVisible ? keyboardVisible + 45 : 50,
                    },
                ]}
            >
                <Text style={styles.phoneCode}>+91</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Phone Number"
                    placeholderTextColor="white"
                    keyboardType="phone-pad"
                    maxLength={10}
                    value={phone}
                    onChangeText={(text) => {
                        setPhone(text)
                        setModal(false)
                    }}
                />
                <TouchableOpacity onPress={handleSubmit} style={styles.continueButton}>
                    <Text style={styles.continueText}>Continue</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'rgba(0,0,0,0.7)'
    },
    lottieContainer: {
        ...StyleSheet.absoluteFillObject,
        zIndex: -1,
    },
    image: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    textInputContainer: {
        position: 'absolute',
        width: '100%',
        alignItems: 'center',
        zIndex: 10,
        gap: 16,
    },
    phoneCode: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        position: 'absolute',
        left: '12%',
        top: 13,
        zIndex: 1,
    },
    input: {
        height: 50,
        width: '80%',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        borderRadius: 12,
        paddingLeft: 60,
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    continueButton: {
        backgroundColor: 'white',
        height: 50,
        width: '80%',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.9,
    },
    continueText: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
    },
    warning: {
        height: 40,
        width: '75%',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        position: 'absolute',
        borderRadius: 10,
    },
})
