import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import LottieView from "lottie-react-native";
import {useNavigation} from "@react-navigation/native";

const { width } = Dimensions.get('window');

export default function Step1() {
    const [selected, setSelected] = useState(null);
    const options = ['Male', 'Female', 'Non-Binary'];
    const navigation = useNavigation();

    const renderOption = (label) => {
        const isSelected = selected === label;

        const content = (
            <Text style={[styles.optionText, isSelected && { color: 'white' }]}>{label}</Text>
        );

        return isSelected ? (
            <LinearGradient
                key={label}
                colors={['#0059ff', '#00ffff']}
                start={{ x: 0, y: 0,z:1 }}
                end={{ x: 1, y: 0 }}
                style={styles.optionButton}
            >
                <TouchableOpacity
                    style={styles.touchable}
                    onPress={() => setSelected(label)}
                    activeOpacity={0.8}
                >
                    {content}
                </TouchableOpacity>
            </LinearGradient>
        ) : (
            <TouchableOpacity
                key={label}
                style={[styles.optionButton, { backgroundColor: 'rgba(255,255,255,0.3)' }]}
                onPress={() => setSelected(label)}
                activeOpacity={0.8}
            >
                {content}
            </TouchableOpacity>
        );
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
            <View style={{ top: '5%', position: 'absolute', alignSelf: 'center' }}>
                <Text style={styles.title}>Which describes you best</Text>
            </View>

            <View style={styles.optionsWrapper}>
                <View style={styles.row}>
                    {options.slice(0, 2).map(renderOption)}
                </View>
                <View style={{ marginTop: 10, width: '82%' }}>{renderOption('Non-Binary')}</View>
            </View>

            <TouchableOpacity
                onPress={()=>{navigation.navigate('Step2')}}
                style={styles.continueButton}
            >
                <Text style={styles.continueText}>Next</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.8)',
    },
    title: {
        color: 'white',
        textAlign: 'center',
        fontWeight: '800',
        fontSize: 24,
        top:'25%'
    },
    optionsWrapper: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: '30%',
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
        gap: 10,
    },
    optionButton: {
        height: 50,
        width: width * 0.4,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    touchable: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    optionText: {
        fontWeight: '700',
        fontSize: 16,
        color: 'white',
    },
    continueButton: {
        height: 50,
        width: width * 0.9,
        borderRadius: 5,
        padding: 10,
        backgroundColor: 'white',
        opacity: 0.8,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        position: 'absolute',
        bottom: '10%',
    },
    continueText: {
        color: 'black',
        fontSize: 18,
        fontWeight: '600',
    },
    lottieContainer: {
        ...StyleSheet.absoluteFillObject,
        zIndex: -1,
        flex:1,
        height:'100%',marginBottom:'50%'
    },
});
