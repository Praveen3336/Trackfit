import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity, Image, Modal } from 'react-native';
import { Video } from 'expo-av';  // Use expo-av for video playback

const { height, width } = Dimensions.get("window");

export default function FullBody() {
    const [playVideo, setPlayVideo] = useState(false);
    const [videoUri, setVideoUri] = useState(require('../assets/Videos/squats.mp4'));

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scroll}>
                <View style={{ marginTop: height * 0.05, marginLeft: width * 0.05 }}>
                    <Text style={{ color: 'white', fontSize: 22, fontWeight: '900' }}>What is a Full Body Workout?</Text>
                    <Text style={{ color: 'white', fontSize: 18, fontWeight: '600' }}>
                        A Full Body Workout is a training routine that targets all the major muscle groups in a single session —
                        including your chest, back, legs, arms, shoulders, and core. These workouts are efficient, burn more calories,
                        and are perfect for building strength and improving overall fitness.
                    </Text>
                </View>

                <View style={{ marginTop: height * 0.05, marginLeft: width * 0.05 }}>
                    <Text style={{ color: 'white', fontSize: 22, fontWeight: '900' }}>Benefits of Full Body Workouts</Text>
                    <Text style={{ color: 'white', fontSize: 18, fontWeight: '600' }}>✅ Time Efficient – One workout covers your entire body</Text>
                    <Text style={{ color: 'white', fontSize: 18, fontWeight: '600' }}>✅ Burns More Calories – High overall energy demand</Text>
                    <Text style={{ color: 'white', fontSize: 18, fontWeight: '600' }}>✅ Boosts Strength & Endurance – Balanced muscle growth</Text>
                    <Text style={{ color: 'white', fontSize: 18, fontWeight: '600' }}>✅ Improves Heart Health – Great cardiovascular impact</Text>
                    <Text style={{ color: 'white', fontSize: 18, fontWeight: '600' }}>✅ Best for Fat Loss – More muscles activated = more fat burned</Text>
                    <Text style={{ color: 'white', fontSize: 18, fontWeight: '600' }}>✅ Beginner-Friendly – Can be done with or without equipment</Text>
                </View>

                <View style={{ marginTop: height * 0.05, marginLeft: width * 0.05 }}>
                    <Text style={{ color: 'white', fontSize: 22, fontWeight: '900' }}>Full Body Workout Structure</Text>
                    <Text style={{ color: 'white', fontSize: 18, fontWeight: '600' }}>Upper Body Movements: Push-ups, shoulder taps</Text>
                    <Text style={{ color: 'white', fontSize: 18, fontWeight: '600' }}>Lower Body Movements: Squats, lunges</Text>
                    <Text style={{ color: 'white', fontSize: 18, fontWeight: '600' }}>Core Exercises: Plank, sit-ups, leg raises</Text>
                    <Text style={{ color: 'white', fontSize: 18, fontWeight: '600' }}>Cardio Elements: Jumping jacks, high knees, burpees</Text>
                </View>

                {/* Explore Exercises Section */}
                <Text style={{ color: 'white', fontSize: 20, fontWeight: '900', left: width * 0.05, marginTop: 50 }}>Explore the Exercises</Text>
                <ScrollView
                    horizontal={true}
                    contentContainerStyle={{ paddingHorizontal: 30, gap: 50, marginTop: 20 }}
                    showsHorizontalScrollIndicator={false}
                >
                    {/* Thumbnail to trigger video playback */}
                    <TouchableOpacity onPress={() => setPlayVideo(true)}>
                        <Image style={{ height: 300, width: 250, borderRadius: 10 }} source={require('../assets/Thumbnails/squats.jpeg')} />
                    </TouchableOpacity>
                </ScrollView>
            </ScrollView>

            {/* Simple React Native Modal for displaying video */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={playVideo}
                onRequestClose={() => setPlayVideo(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Video
                            source={videoUri}
                            useNativeControls={false}
                            shouldPlay
                            resizeMode="contain"
                            isLooping={true}
                            style={styles.video}
                        />
                        <TouchableOpacity style={styles.closeButton} onPress={() => setPlayVideo(false)}>
                            <Text style={styles.closeText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
    scroll: {
        width: '100%',
        height: '100%',
        padding: 20,
    },
    video: {
      height:'80%',width:'80%'

    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    modalContent: {
        width: width,
        height: height,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        padding: 10,
        borderRadius: 50,
    },
    closeText: {
        color: 'white',
        fontSize: 16,
    },
});
