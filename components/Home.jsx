import React,{useEffect,useRef,useState} from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import CircularProgress from "react-native-circular-progress-indicator";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import Carousel from "react-native-reanimated-carousel";
import {Modalize} from "react-native-modalize";
import { Pedometer } from 'expo-sensors';
const { width, height } = Dimensions.get("window");


export default function Home() {
    const navigation = useNavigation();
    const weightKg = 95;
    const heightCm = 175;
    const heightM = heightCm / 100;
    const bmi = (weightKg / (heightM * heightM)).toFixed(2);
    const [color,setColor] = React.useState("#00e0ff");
    const [text,setText] = React.useState("Low");
    const modalRef = useRef(null);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const options = ['Morning', 'Afternoon', 'Evening', 'Night'];
    useEffect(() => {
        if (bmi < 18.5) {
            setColor('#ffb300');
            setText('      Low');
        } else if (bmi < 25) {
            setColor('#00e676');
            setText('   Healthy');
        } else if (bmi < 30) {
            setColor('#ffa726');
            setText('     High');
        } else {
            setColor('#f44336');
            setText('Very High');
        }
    }, [bmi]);

    const images = [
        require('../assets/newAssets/posters/poster1.jpeg'),
        require('../assets/newAssets/posters/poster2.jpeg'),
        require('../assets/newAssets/posters/poster3.jpeg'),
        require('../assets/newAssets/posters/poster4.jpeg'),
        require('../assets/newAssets/posters/poster.jpeg'),
    ];

    return (
        <View style={{flex:1}}>
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 80 }}>
            <TouchableOpacity
                onPress={() => navigation.navigate('Profile')}
                style={styles.profileButton}
            >
                <Text style={styles.profileText}>P</Text>
            </TouchableOpacity>

            <View style={styles.progressLabel}>
                <Text style={styles.progressLabelText}>YOUR PROGRESS</Text>
            </View>

            <TouchableOpacity
                onPress={() => navigation.navigate("Goals")}
                style={styles.editButton}
            >
                <Image
                    style={{ height: 20, width: 20 }}
                    source={require('../assets/newAssets/icons8-pencil-60.png')}
                />
            </TouchableOpacity>

            <View style={styles.circularContainer}>
                <View style={styles.circle}>
                    <CircularProgress
                        value={0}
                        radius={70}
                        maxValue={100}
                        activeStrokeColor={'#00e0ff'}
                        inActiveStrokeColor={'rgba(0, 224, 255, 0.2)'}
                        activeStrokeWidth={10}
                        inActiveStrokeWidth={10}
                        progressValueColor="transparent"
                    />
                </View>
                <View style={styles.circle}>
                    <CircularProgress
                        value={0}
                        radius={55}
                        maxValue={100}
                        activeStrokeColor={'#ffb300'}
                        inActiveStrokeColor={'rgba(255, 179, 0, 0.2)'}
                        activeStrokeWidth={10}
                        inActiveStrokeWidth={10}
                        progressValueColor="transparent"
                    />
                </View>
                <View style={styles.circle}>
                    <CircularProgress
                        value={0}
                        radius={40}
                        maxValue={100}
                        activeStrokeColor={'#f44336'}
                        inActiveStrokeColor={'rgba(244, 67, 54, 0.2)'}
                        activeStrokeWidth={10}
                        inActiveStrokeWidth={10}
                        progressValueColor="transparent"
                    />
                </View>
            </View>

            <View style={styles.metricsRow}>
                <View style={styles.metricItem}>
                    <Image style={styles.metricIcon} source={require('../assets/newAssets/icons8-sneakers-100.png')} />
                    <Text style={styles.metricTextBlue}>0</Text>
                </View>
                <View style={styles.metricItem}>
                    <Image style={styles.metricIcon} source={require('../assets/newAssets/icons8-fire-100.png')} />
                    <Text style={styles.metricTextOrange}>0</Text>
                </View>
                <View style={styles.metricItem}>
                    <Image style={styles.metricIcon} source={require('../assets/newAssets/icons8-location-100.png')} />
                    <Text style={styles.metricTextRed}>0</Text>
                </View>
            </View>

            <View style={styles.bmiCard}>
                <Text style={styles.bmiLabel}>CURRENT BMI</Text>
                <Text style={styles.bmiValue}>{bmi}</Text>
                <Text style={styles.bmiSubLabel}>CURRENT WEIGHT</Text>
                <Text style={styles.bmiSubValue}>{weightKg}</Text>
                <Text style={[styles.bmiSubLabel, { top: 150 }]}>CURRENT HEIGHT</Text>
                <Text style={[styles.bmiSubValue, { top: 170,left:12 }]}>{heightCm} cm</Text>

                <View style={[styles.glowBackground, { backgroundColor: `${color}20` }]} />
                <View style={[styles.glowEffect, {
                    shadowColor: color,
                    backgroundColor: `${color}20`
                }]} />

                <View style={[styles.bmiCircleWrapper]}>
                    <View style={[styles.neonGlow, { shadowColor: color }]}>
                    <AnimatedCircularProgress
                        size={300}
                        width={15}
                        fill={(bmi / 40) * 100}
                        tintColor={color}
                        backgroundColor="rgba(255, 224, 255, 0.2)"
                        rotation={-90}
                        arcSweepAngle={180}
                        lineCap="round"
                        style={{ position: 'absolute', top: 10 }}
                    />
                        </View>
                    <Text style={styles.bmiStatusText}>{text}</Text>
                    <Text style={styles.bmiMin}>10</Text>
                    <Text style={styles.bmiMax}>40</Text>
                </View>
            </View>

            <View style={styles.goalCard}>
                <Text style={styles.goalHeading}>Hey Praveen , Don't forget your Goals</Text>
                <View style={styles.goalRow}>
                    <Text style={styles.goalStep}>7000 <Text style={styles.goalSub}>STEPS/DAY</Text></Text>
                    <Text style={styles.goalCal}>1000 <Text style={styles.goalSub}>CALORIES/DAY</Text></Text>
                    <Text style={styles.goalKm}>10 <Text style={styles.goalSub}>KM/DAY</Text></Text>
                </View>
            </View>
            <View style={styles.carosuelContainer}>
                <Carousel loop={true} autoPlay={true} scrollAnimationDuration={3000} autoPlayInterval={3000} data={images} renderItem={({item})=>(<Image source={item} resizeMode={'contain'} style={{height:300,width:400,alignSelf:'center',zIndex:-10,top:50}}></Image>)}  height={400} width={width*0.9}></Carousel>
            </View>

            <View style={{height:height*0.2}}></View>
        </ScrollView>
            <Modalize
                ref={modalRef}
                modalHeight={height * 0.3}
                handleStyle={{ backgroundColor: 'gray', width: 80,borderRadius:10 }}
                modalStyle={{
                    backgroundColor: '#121212',
                    borderTopLeftRadius: 35,
                    borderTopRightRadius: 35,
                    padding: 20,
                    width: '100%',
                    alignSelf:'center'
                }}
                scrollViewProps={{ showsVerticalScrollIndicator: false }}
            >
                <Text style={{ color: 'white', fontSize: 30, fontWeight: 'bold' }}>Manually log</Text>
               <View style={{flexDirection:'column',alignSelf:'center',gap:40,top:50}}>
                   <View style={{flexDirection:'row',alignSelf:'center',justifyContent:'space-evenly',gap:50}}>
                   <TouchableOpacity onPress={()=>navigation.navigate("LogExercise")} style={{height:80,width:150,backgroundColor:'rgba(255,255,255,0.2)',flexDirection:'row',justifyContent:'center',alignItems:'center',borderRadius:20,gap:10}}><Image style={{height:40,width:40}} source={(require('../assets/newAssets/icons8-standing-man-100.png'))}></Image><Text style={{color:'white',fontWeight:'bold',fontSize:18}}>Activity</Text></TouchableOpacity>
                   <TouchableOpacity onPress={()=>navigation.navigate("LogSleep")} style={{height:80,width:150,backgroundColor:'rgba(255,255,255,0.2)',flexDirection:'row',justifyContent:'center',alignItems:'center',borderRadius:20,gap:10}}><Image style={{height:40,width:40}} source={(require('../assets/newAssets/icons8-moon-symbol-100.png'))}></Image><Text style={{color:'white',fontWeight:'bold',fontSize:18}}>Sleep</Text></TouchableOpacity>
                   </View>
                   <View style={{flexDirection:'row',alignSelf:'center',justifyContent:'space-evenly',gap:50}}>
                   <TouchableOpacity onPress={()=>navigation.navigate('LogFood')} style={{height:80,width:150,backgroundColor:'rgba(255,255,255,0.2)',flexDirection:'row',justifyContent:'center',alignItems:'center',borderRadius:20,gap:10}}><Image style={{height:40,width:40}} source={(require('../assets/newAssets/icons8-organic-food-100.png'))}></Image><Text style={{color:'white',fontWeight:'bold',fontSize:18}}>Food</Text></TouchableOpacity>
                   <TouchableOpacity onPress={()=>navigation.navigate("LogWater")} style={{height:80,width:150,backgroundColor:'rgba(255,255,255,0.2)',flexDirection:'row',justifyContent:'center',alignItems:'center',borderRadius:20,gap:10}}><Image style={{height:40,width:40}} source={(require('../assets/newAssets/icons8-bottle-of-water-100.png'))}></Image><Text style={{color:'white',fontWeight:'bold',fontSize:18}}>Water</Text></TouchableOpacity>
                   </View>
               </View>
            </Modalize>
            <TouchableOpacity onPress={() => modalRef.current?.open()} style={styles.fixedPlusButton}><Image  style={{height:35,width:35,tintColor:'white',position:'absolute'}} source={require('../assets/newAssets/icons8-plus-48.png')}></Image></TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    neonGlow: {
        alignItems: 'center',
        justifyContent: 'center',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.9,
        shadowRadius: 20,
        elevation: 10,
    },
    profileButton: {
        height: 50,
        width: 50,
        backgroundColor: 'black',
        borderRadius: 50,
        borderWidth: 1,
        borderColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
        marginLeft: 20,
    },
    glowBackground: {
        position: 'absolute',
        top: -100,
        left: -100,
        right: -100,
        bottom: -100,
        borderRadius: 200,
        opacity: 0.7,
    },
    glowEffect: {
        position: 'absolute',
        top: -50,
        left: width * 0.4 - 150,
        elevation: 0,
    },
    profileText: {
        fontSize: 20,
        color: 'white',
        fontWeight: '800',
    },
    progressLabel: {
        height: 30,
        width: 150,
        backgroundColor: 'rgba(255,255,255,0.4)',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 10,
    },
    progressLabelText: {
        color: 'white',
        fontWeight: '900',
    },
    editButton: {
        height: 30,
        width: 30,
        backgroundColor: 'rgba(255,255,255,0.4)',
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 150,
        top: 180,
    },
    circularContainer: {
        marginTop: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    circle: {
        position: 'absolute',
    },
    metricsRow: {
        marginTop: 120,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    metricItem: {
        flexDirection: 'column',
        alignItems: 'center',
        gap: 10,
    },
    metricIcon: {
        height: 30,
        width: 30,
    },
    metricTextBlue: {
        color: '#00b2ff',
        fontSize: 30,
        fontWeight: 'bold',
    },
    metricTextOrange: {
        color: '#ffb300',
        fontSize: 30,
        fontWeight: 'bold',
    },
    metricTextRed: {
        color: '#f44336',
        fontSize: 30,
        fontWeight: 'bold',
    },
    bmiCard: {
        marginTop: 40,
        height: height * 0.2,
        width: '90%',
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 10,
        alignSelf: 'center',
        padding: 10,
        overflow: 'hidden',
        position: 'relative',
        zIndex:10
    },
    bmiLabel: {
        color: 'rgba(255,255,255,0.5)',
        fontWeight: '800',
        fontSize: 18,
        marginLeft: 10,
        marginTop: 10,
    },
    bmiValue: {
        color: 'white',
        fontWeight: '800',
        fontSize: 24,
        marginLeft: 10,
    },
    bmiSubLabel: {
        color: 'rgba(255,255,255,0.5)',
        fontWeight: '800',
        fontSize: 10,
        top: 100,
        left: 10,
        position: 'absolute',
        zIndex:100
    },
    bmiSubValue: {
        color: 'white',
        fontWeight: '800',
        fontSize: 20,
        top: 115,
        left: 40,
        position: 'absolute',
        zIndex:100
    },
    bmiCircleWrapper: {
        marginTop: -50,
        marginLeft:width*0.4,shadowColor: '#00e0ff',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 30,
        elevation: 25,
        zIndex:100
    },
    bmiStatusText: {
        color: 'white',
        position: 'absolute',
        fontSize: 20,
        fontWeight: 'bold',
        top: 100,
        marginLeft:width*0.17,
        zIndex:100
    },
    bmiMin: {
        color: "white",
        position: 'absolute',
        top: 180,
        left: 40,
        fontWeight: '900',
    },
    bmiMax: {
        color: "white",
        position: 'absolute',
        top: 180,
        right: 40,
        fontWeight: '900',
    },
    goalCard: {
        marginTop: 30,
        height: height * 0.15,
        width: '90%',
        backgroundColor: 'rgba(255,255,255,0.1)',
        alignSelf: 'center',
        borderRadius: 5,
        padding: 10,
    },
    goalHeading: {
        color: 'white',
        fontWeight: '900',
        fontSize: 20,
        marginBottom: 10,
        left:20
    },
    goalRow: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 50,
    },
    goalStep: {
        color: 'rgba(0, 224, 255, 0.8)',
        fontWeight: '900',
        fontSize: 25,
    },
    goalCal: {
        color: 'rgba(255, 179, 0, 0.7)',
        fontWeight: '900',
        fontSize: 25,
    },
    goalKm: {
        color: 'rgba(244, 67, 54, 0.7)',
        fontWeight: '900',
        fontSize: 25,
    },
    goalSub: {
        color: 'rgba(255,255,255,0.3)',
        fontWeight: '600',
        fontSize: 20,
    },
    carosuelContainer:{
         height:300,width:'90%',alignSelf:'center',backgroundColor: 'rgba(0, 0, 0, 0.5)',
        marginTop:20,
        borderRadius:5,
        justifyContent:'center',
        alignItems: 'center',
    },
    fixedPlusButton: {
        position: 'absolute',
        right: 50,
        bottom: 150,
        width: 60,
        height: 60,
        borderRadius:10,
        backgroundColor: '#00b4d8',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 8,
        shadowColor: '#00e0ff',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 1,
        zIndex: 1000,
    },
    label: {
        color: '#fff',
        fontSize: 22,
        marginBottom: 20,
    },
    item: {
        color: '#888',
        fontSize: 18,
    },
    selectedItem: {
        color: '#00e0ff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    result: {
        color: '#fff',
        fontSize: 18,
        marginTop: 30,
    },

});
