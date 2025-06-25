import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";

const { height, width } = Dimensions.get('window');
const ITEM_WIDTH = 20;
const MIN_VALUE = 100;
const MAX_VALUE = 250;
const STEP = 1;

const Step4 = () => {
    const scrollViewRef = useRef(null);
    const [selectedValue, setSelectedValue] = useState(170);
    const navigation = useNavigation();
    const lastValueRef = useRef(selectedValue);
    const itemCount = Math.floor((MAX_VALUE - MIN_VALUE) / STEP) + 1;
    const [inputValue, setInputValue] = useState(String(selectedValue));

    useEffect(() => {
        const offset = (selectedValue - MIN_VALUE) * ITEM_WIDTH;
        scrollViewRef.current?.scrollTo({ x: offset, animated: false });
    }, []);

    const handleInputChange = (text) => {
        setInputValue(text);
        const value = parseInt(text);
        if (!isNaN(value) && value >= MIN_VALUE && value <= MAX_VALUE) {
            setSelectedValue(value);
            const offset = (value - MIN_VALUE) * ITEM_WIDTH;
            scrollViewRef.current?.scrollTo({ x: offset, animated: true });
        }
    };

    const handleScroll = (event) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const rawValue = Math.round(contentOffsetX / ITEM_WIDTH) * STEP + MIN_VALUE;
        if (lastValueRef.current !== rawValue) {
            lastValueRef.current = rawValue;
            setSelectedValue(rawValue);
            setInputValue(String(rawValue));
        }
    };

    const renderTick = () => {
        return Array.from({ length: itemCount }, (_, i) => {
            const value = MIN_VALUE + i * STEP;
            const isMajor = value % 10 === 0;
            return (
                <View key={i} style={styles.tickContainer}>
                    <View
                        style={{
                            height: isMajor ? 30 : 10,
                            width: 2,
                            backgroundColor: isMajor ? 'white' : 'gray',
                            marginBottom: 5,
                        }}
                    />
                    <Text style={styles.majorText}>
                        {isMajor && value}
                    </Text>
                </View>
            );
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.lottieContainer}>
                <LottieView
                    source={require('./background.json')}
                    autoPlay
                    loop
                    resizeMode="cover"
                    style={StyleSheet.absoluteFillObject}
                />
            </View>

            <Text style={styles.label}>Select Your Height</Text>

            <View style={styles.triangleBottom} />

            <ScrollView
                ref={scrollViewRef}
                snapToInterval={ITEM_WIDTH}
                horizontal
                style={{ marginTop: height * 0.4 }}
                contentContainerStyle={{
                    paddingHorizontal: width / 2 - ITEM_WIDTH / 2,
                }}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                showsHorizontalScrollIndicator={false}
            >
                {renderTick()}
            </ScrollView>

            <View style={styles.inputRow}>
                <TextInput
                    value={inputValue}
                    onChangeText={handleInputChange}
                    keyboardType="numeric"
                    maxLength={3}
                    style={styles.input}
                />
                <Text style={styles.cmText}>cm</Text>
            </View>

            <View style={styles.buttonRow}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.button}>
                    <Text style={styles.buttonText}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Goals")} style={styles.button}>
                    <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.9)',
    },
    label: {
        top: height * 0.1,
        fontSize: 27,
        color: '#fff',
        textAlign: 'center',
        width: '100%',
        fontWeight: '900',
    },
    triangleBottom: {
        position: 'absolute',
        top: height * 0.42,
        alignSelf: 'center',
        width: 0,
        height: 0,
        borderLeftWidth: 10,
        borderRightWidth: 10,
        borderTopWidth: 20,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: 'skyblue',
        zIndex: 10,
    },
    tickContainer: {
        width: ITEM_WIDTH,
        alignItems: 'center',
        justifyContent: 'center',
        height: 200,
    },
    majorText: {
        color: 'white',
        fontSize: 12,
        marginTop: 10,
    },
    inputRow: {
        position: 'absolute',
        top: height * 0.6,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    input: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'left',
        width: 150,
        paddingHorizontal: 20,
        backgroundColor: 'rgba(135, 206, 235, 0.1)',
        borderRadius: 5,
    },
    cmText: {
        color: 'white',
        fontSize: 30,
        fontWeight: '800',
        position:'absolute',
        marginLeft:60
    },
    lottieContainer: {
        ...StyleSheet.absoluteFillObject,
        zIndex: -1,
        flex: 1,
        height: '100%',
        marginBottom: '50%',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: width * 0.8,
        alignSelf: 'center',
        position: 'absolute',
        bottom: 20,
        gap: 20,
    },
    button: {
        height: 50,
        width: width * 0.4,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonText: {
        color: 'black',
        fontSize: 18,
        fontWeight: '600',
    },
});

export default Step4;
