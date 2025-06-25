import React, { useRef, useState,useEffect } from 'react';
import { Text, View, StyleSheet, FlatList, Dimensions,BackHandler,Platform } from 'react-native';
import  LottieView from'lottie-react-native'
import Step1 from './Steps/Step1';
import Step2 from './Steps/Step2';
import Step3 from './Steps/Step3';
import Step4 from './Steps/Step4';
import {useNavigation} from "@react-navigation/native";

const { height, width } = Dimensions.get('window');

export default function MainDetails() {
    const flatListRef = useRef(null);
    const [index, setIndex] = useState(0);
    const navigation = useNavigation();
    useEffect(() => {
        const backAction = () => {
            if (Platform.OS === 'android') {
                BackHandler.exitApp();
            }
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );

        return () => backHandler.remove();
    }, []);
    const Steps = [
        () => <Step1 onNext={() => {
            const nextIndex = 1;
            setIndex(nextIndex);
            flatListRef.current.scrollToIndex({ index: nextIndex });
        }} />,
        () => <Step2 onNext={() => {
            const nextIndex = 2;
            setIndex(nextIndex);
            flatListRef.current.scrollToIndex({ index: nextIndex });
        }} />,
        () => <Step3 onNext={() => {
            const nextIndex = 3;
            setIndex(nextIndex);
            flatListRef.current.scrollToIndex({ index: nextIndex });
        }} />,
        () => <Step4 onNext={()=>navigation.replace('Goal')} />
    ];

    const renderItem = ({ item: Component }) => (
        <View style={{ width, top: '10%' }}>
            <Component />
        </View>
    );

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

            <View style={styles.progressContainer}>
                {[0, 1, 2, 3].map((step) => (
                    <View
                        key={step}
                        style={[
                            styles.progressDot,
                            { backgroundColor: step <= index ? 'white' : 'gray' }
                        ]}
                    />
                ))}
            </View>

            <View style={styles.titleContainer}>
                <Text style={styles.title}>Give some more details</Text>
            </View>

            <Text style={styles.stepText}>{`Step ${index + 1}/4`}</Text>

            <FlatList
                ref={flatListRef}
                data={Steps}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                keyExtractor={(_, i) => i.toString()}
                renderItem={renderItem}
                onScroll={(e) => {
                    const newIndex = Math.round(e.nativeEvent.contentOffset.x / width);
                    if (newIndex !== index) setIndex(newIndex);
                }}
                scrollEventThrottle={16}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.9)'
    },
    whitishOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255,255,255,0.2)'
    },
    progressContainer: {
        flexDirection: 'row',
        gap: 5,
        justifyContent: 'center',
        alignItems: 'center',
        top: '10%'
    },
    progressDot: {
        height: height * 0.005,
        width: width * 0.23,
        borderRadius: 5
    },
    titleContainer: {
        top: '12%',
        position: 'absolute',
        alignSelf: 'center'
    },
    title: {
        color: 'white',
        textAlign: 'center',
        fontWeight: '800',
        fontSize: 20
    },
    stepText: {
        color: 'white',
        textAlign: 'center',
        top: '5%',
        fontSize: 15,
        fontWeight: '800'
    },
    lottieContainer: {
        ...StyleSheet.absoluteFillObject,
        zIndex: -1,
    },
});
