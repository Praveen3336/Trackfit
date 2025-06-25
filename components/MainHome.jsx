import React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import LottieView from 'lottie-react-native';
import Home from "./Home";
import Fitness from "./Fitness";
import Settings from "./Settings";

export default function MainHome() {
    const [currentScreen, setCurrentScreen] = React.useState('Home');

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
            {currentScreen === 'Home' && (<Home/>)}
            {currentScreen==='Fitness' && (<Fitness/>)}
            {currentScreen==='Settings'&&(<Settings></Settings>)}
            <View style={styles.navbar}>
                <TouchableOpacity
                    onPress={() => setCurrentScreen('Home')}
                    style={styles.navItem}
                >
                    <Image
                        style={[
                            styles.icon,
                            { tintColor: currentScreen === 'Home' ? 'white' : '#6c757d' }
                        ]}
                        source={require('../assets/newAssets/icons8-home-96.png')}
                    />
                    <Text
                        style={[
                            styles.navText,
                            { color: currentScreen === 'Home' ? 'white' : '#6c757d' }
                        ]}
                    >
                        Home
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => setCurrentScreen('Fitness')}
                    style={styles.navItem}
                >
                    <Image
                        style={[
                            styles.icon,
                            { tintColor: currentScreen === 'Fitness' ? 'white' : '#6c757d' }
                        ]}
                        source={require('../assets/newAssets/icons8-activities-96.png')}
                    />
                    <Text
                        style={[
                            styles.navText,
                            { color: currentScreen === 'Fitness' ? 'white' : '#6c757d' }
                        ]}
                    >
                        Fitness
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => setCurrentScreen('Settings')}
                    style={styles.navItem}
                >
                    <Image
                        style={[
                            styles.icon,
                            { tintColor: currentScreen === 'Settings' ? 'white' : '#6c757d' }
                        ]}
                        source={require('../assets/newAssets/icons8-settings-96.png')}
                    />
                    <Text
                        style={[
                            styles.navText,
                            { color: currentScreen === 'Settings' ? 'white' : '#6c757d' }
                        ]}
                    >
                        Settings
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
    },
    lottieContainer: {
        ...StyleSheet.absoluteFillObject,
        zIndex: -1,
    },
    navbar: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        height: 60,
        width: '100%',
        bottom: 0,
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backfaceVisibility:'hidden',
    },
    navItem: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        height: 35,
        width: 35,
    },
    navText: {
        fontWeight: 'bold',
        marginTop: 2,
    },
});
