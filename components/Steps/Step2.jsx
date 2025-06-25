import React, { useState, useRef } from 'react';
import { View, FlatList, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import LottieView from "lottie-react-native";
import {useNavigation} from "@react-navigation/native";

const { height, width } = Dimensions.get('window');
const ITEM_HEIGHT = 50;
const VISIBLE_ITEMS = 5;
const CENTER_OFFSET = ITEM_HEIGHT * 2;

const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];
const years = Array.from({ length: 100 }, (_, i) => (new Date().getFullYear() - i).toString());

const Step2 = ({onNext}) => {
    const [selectedDay, setSelectedDay] = useState('1');
    const [selectedMonth, setSelectedMonth] = useState('January');
    const [selectedYear, setSelectedYear] = useState((new Date().getFullYear()).toString());
    const navigation = useNavigation();

    const dayRef = useRef(null);
    const monthRef = useRef(null);
    const yearRef = useRef(null);

    const handleScrollEnd = (event, items, setSelected, ref) => {
        const y = event.nativeEvent.contentOffset.y;
        const minOffset = 0;
        const maxOffset = (items.length - 1) * ITEM_HEIGHT;

        // Check if we're beyond boundaries
        if (y < minOffset) {
            ref.current?.scrollToOffset({ offset: minOffset, animated: true });
            setSelected(items[0]);
            return;
        }
        if (y > maxOffset) {
            ref.current?.scrollToOffset({ offset: maxOffset, animated: true });
            setSelected(items[items.length - 1]);
            return;
        }

        const index = Math.round(y / ITEM_HEIGHT);
        const centeredIndex = Math.min(Math.max(index, 0), items.length - 1);
        setSelected(items[centeredIndex]);
    };

    const scrollToIndex = (ref, index, items) => {
        ref.current?.scrollToIndex({
            index: Math.min(Math.max(index, 0), items.length - 1),
            animated: true,
            viewPosition: 0.5
        });
    };

    const renderItem = (data, selectedValue, onSelect, items, ref) => {
        const isSelected = data.item === selectedValue;

        return (
            <TouchableOpacity
                onPress={() => {
                    onSelect(data.item);
                    scrollToIndex(ref, data.index, items);
                }}
                style={styles.itemContainer}
                activeOpacity={0.7}
            >
                {isSelected ? (
                    <MaskedView
                        maskElement={
                            <Text style={[styles.itemText, styles.selectedItemText]}>
                                {data.item}
                            </Text>
                        }
                    >
                        <LinearGradient
                            colors={['#0059ff', '#00ffff']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                        >
                            <Text style={[styles.itemText, styles.selectedItemText, { opacity: 0 }]}>
                                {data.item}
                            </Text>
                        </LinearGradient>
                    </MaskedView>
                ) : (
                    <Text style={[styles.itemText]}>
                        {data.item}
                    </Text>
                )}
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
            <Text style={{color:'white',fontSize:28,fontWeight:'800',top:'10%'}}>What's Your BirthDay?</Text>
            <View style={styles.wheelContainer}>
                <View style={styles.horizontalLineTop} />
                <View style={styles.horizontalLineBottom} />

                {/* Day Picker */}
                <View style={styles.pickerContainer}>
                    <FlatList
                        ref={dayRef}
                        data={days}
                        keyExtractor={(item) => item}
                        renderItem={(data) => renderItem(data, selectedDay, setSelectedDay, days, dayRef)}
                        showsVerticalScrollIndicator={false}
                        snapToInterval={ITEM_HEIGHT}
                        decelerationRate="fast"
                        getItemLayout={(data, index) => ({
                            length: ITEM_HEIGHT,
                            offset: ITEM_HEIGHT * index,
                            index
                        })}
                        initialScrollIndex={days.indexOf(selectedDay)}
                        onScroll={(e) => handleScrollEnd(e, days, setSelectedDay, dayRef)}
                        style={styles.flatlist}
                        contentContainerStyle={styles.flatlistContent}
                        scrollEnabled={days.length > 1}
                        overScrollMode="never"
                    />
                    <Text style={styles.label}>Day</Text>
                </View>

                {/* Month Picker */}
                <View style={styles.pickerContainer}>
                    <FlatList
                        ref={monthRef}
                        data={months}
                        keyExtractor={(item) => item}
                        renderItem={(data) => renderItem(data, selectedMonth, setSelectedMonth, months, monthRef)}
                        showsVerticalScrollIndicator={false}
                        snapToInterval={ITEM_HEIGHT}
                        decelerationRate="fast"
                        getItemLayout={(data, index) => ({
                            length: ITEM_HEIGHT,
                            offset: ITEM_HEIGHT * index,
                            index
                        })}
                        initialScrollIndex={months.indexOf(selectedMonth)}
                        onScroll={(e) => handleScrollEnd(e, months, setSelectedMonth, monthRef)}
                        style={styles.flatlist}
                        contentContainerStyle={styles.flatlistContent}
                        scrollEnabled={months.length > 1}
                        overScrollMode="never"
                    />
                    <Text style={styles.label}>Month</Text>
                </View>

                {/* Year Picker */}
                <View style={styles.pickerContainer}>
                    <FlatList
                        ref={yearRef}
                        data={years}
                        keyExtractor={(item) => item}
                        renderItem={(data) => renderItem(data, selectedYear, setSelectedYear, years, yearRef)}
                        showsVerticalScrollIndicator={false}
                        snapToInterval={ITEM_HEIGHT}
                        decelerationRate="fast"
                        getItemLayout={(data, index) => ({
                            length: ITEM_HEIGHT,
                            offset: ITEM_HEIGHT * index,
                            index
                        })}
                        initialScrollIndex={years.indexOf(selectedYear)}
                        onScroll={(e) => handleScrollEnd(e, years, setSelectedYear, yearRef)}
                        style={styles.flatlist}
                        contentContainerStyle={styles.flatlistContent}
                        scrollEnabled={years.length > 1}
                        overScrollMode="never"
                    />
                    <Text style={styles.label}>Year</Text>
                </View>
            </View>

            {/* Selected Date Display */}
            <View style={styles.selectedDateContainer}>
                <Text style={styles.selectedDate}>
                    {selectedDay} {selectedMonth} {selectedYear}
                </Text>
            </View>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '90%',
                marginTop: '90%',
                gap: 20,
            }}>
                <TouchableOpacity
                    onPress={()=>navigation.goBack()}
                    style={styles.continueButton}
                >
                    <Text style={styles.continueText}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity
                     onPress={()=>{navigation.navigate('Step3')}}
                    style={styles.continueButton}
                >
                    <Text style={styles.continueText}>Next</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor:'rgba(0,0,0,0.9)',
        height:'100%'
    },
    wheelContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 10,
        height: ITEM_HEIGHT * VISIBLE_ITEMS,
        position: 'relative',
        backgroundColor: 'transparent',
        marginBottom: 20,
        top:'30%'
    },
    pickerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '30%',
    },
    flatlist: {
        height: '100%',
        width: '100%',
    },
    flatlistContent: {
        paddingVertical: ITEM_HEIGHT * 2,
    },
    itemContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: ITEM_HEIGHT,
        width: '100%',
    },
    itemText: {
        fontSize: 14,
        textAlign: 'center',
        color: '#fff',
        width: '100%',
    },
    selectedItemText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize:20
    },
    horizontalLineTop: {
        position: 'absolute',
        top: ITEM_HEIGHT * 2,
        height: 1,
        backgroundColor: 'white',
        zIndex: 1,
        opacity: 0.5,
        width: '80%',
        alignSelf: 'center',
    },
    horizontalLineBottom: {
        position: 'absolute',
        top: ITEM_HEIGHT * 3,
        height: 1,
        backgroundColor: 'white',
        zIndex: 1,
        opacity: 0.5,
        width: '80%',
        alignSelf: 'center',
    },
    label: {
        marginTop: 10,
        fontSize: 14,
        color: '#888',
        textAlign: 'center',
        width: '100%',
    },
    selectedDateContainer: {
        marginTop: 40,
        padding: 15,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
        top:'35%'
    },
    selectedDate: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    continueButton: {
        height: 50,
        borderRadius: 5,
        padding: 10,
        backgroundColor: 'white',
        opacity: 0.8,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
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

export default Step2;
