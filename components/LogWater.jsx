import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Modal,
    Dimensions,
    TextInput
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Calendar } from 'react-native-calendars';
import dayjs from 'dayjs';

const { height, width } = Dimensions.get('window');

export default function LogWater() {
    const navigation = useNavigation();

    const [waterDate, setWaterDate] = useState(dayjs().format('YYYY-MM-DD'));
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedType, setSelectedType] = useState('glass');
    const [count, setCount] = useState(0);
    const [customAmount, setCustomAmount] = useState('');

    const getMlPerUnit = () => (selectedType === 'glass' ? 250 : selectedType === 'bottle' ? 750 : 0);
    const totalMl = count * getMlPerUnit() + (parseInt(customAmount) || 0);

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image
                    style={{ height: 40, width: 40, marginTop: 50, marginLeft: 20 }}
                    source={require('../assets/newAssets/icons8-back-50.png')}
                />
            </TouchableOpacity>

            <Text style={styles.headerText}>Log Water</Text>

            <View style={styles.innerContainer}>
                <View style={{ position: 'absolute', top: 40, right: 20 }}>
                    <TouchableOpacity>
                        <Text style={styles.saveText}>Save</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Date</Text>
                    <TouchableOpacity
                        onPress={() => setShowCalendar(true)}
                        style={styles.dateInput}
                    >
                        <Text style={styles.dateText}>{dayjs(waterDate).format('DD MMM YYYY')}</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Type</Text>
                    <View style={styles.typeSelector}>
                        <TouchableOpacity
                            onPress={() => setSelectedType('glass')}
                            style={[
                                styles.typeButton,
                                selectedType === 'glass' && styles.activeType
                            ]}
                        >
                            <Text style={styles.typeText}>Glass</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setSelectedType('bottle')}
                            style={[
                                styles.typeButton,
                                selectedType === 'bottle' && styles.activeType
                            ]}
                        >
                            <Text style={styles.typeText}>Bottle</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Count</Text>
                    <View style={styles.counter}>
                        <TouchableOpacity onPress={() => setCount(prev => Math.max(prev - 1, 0))} style={styles.counterBtn}>
                            <Text style={styles.counterText}>−</Text>
                        </TouchableOpacity>
                        <Text style={styles.counterValue}>{count}</Text>
                        <TouchableOpacity onPress={() => setCount(prev => prev + 1)} style={styles.counterBtn}>
                            <Text style={styles.counterText}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Custom (ml)</Text>
                    <TextInput
                        style={styles.inputBox}
                        placeholder="Enter ml"
                        placeholderTextColor="#888"
                        keyboardType="numeric"
                        value={customAmount}
                        onChangeText={setCustomAmount}
                    />
                </View>

                <Text style={styles.totalText}>Total: {totalMl} ml</Text>
            </View>

            <Modal
                visible={showCalendar}
                transparent
                animationType="fade"
                onRequestClose={() => setShowCalendar(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.calendarWrapper}>
                        <Calendar
                            current={waterDate}
                            onDayPress={day => {
                                setWaterDate(day.dateString);
                                setShowCalendar(false);
                            }}
                            markedDates={{
                                [waterDate]: { selected: true, selectedColor: '#4285F4' }
                            }}
                            theme={{
                                backgroundColor: 'white',
                                calendarBackground: 'white',
                                textSectionTitleColor: 'black',
                                dayTextColor: 'black',
                                todayTextColor: 'green',
                                selectedDayTextColor: 'white',
                                monthTextColor: 'black',
                                arrowColor: 'black'
                            }}
                        />
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setShowCalendar(false)}
                        >
                            <Text style={styles.closeButtonText}>Close</Text>
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
        backgroundColor: '#121212'
    },
    headerText: {
        color: 'white',
        fontSize: 20,
        fontWeight: '600',
        marginTop: 55,
        position: 'absolute',
        marginLeft: 80
    },
    innerContainer: {
        flex: 1,
        paddingTop: 100,
        paddingHorizontal: 20
    },
    saveText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    },
    inputGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20
    },
    inputLabel: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
        width: '40%'
    },
    dateInput: {
        height: 50,
        width: '50%',
        borderWidth: 1.5,
        borderColor: 'white',
        borderRadius: 5,
        justifyContent: 'center'
    },
    dateText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    calendarWrapper: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 10
    },
    closeButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#4285F4',
        borderRadius: 8,
        alignItems: 'center'
    },
    closeButtonText: {
        color: 'white',
        fontWeight: 'bold'
    },
    typeSelector: {
        flexDirection: 'row',
        gap: 10
    },
    typeButton: {
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 5,
        borderWidth: 1.5,
        borderColor: 'white'
    },
    activeType: {
        backgroundColor: 'white'
    },
    typeText: {
        color: 'green',
        fontWeight: 'bold'
    },
    counter: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20
    },
    counterBtn: {
        backgroundColor: 'white',
        paddingHorizontal: 14,
        paddingVertical: 5,
        borderRadius: 10
    },
    counterText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'black'
    },
    counterValue: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    },
    inputBox: {
        width: '50%',
        height: 50,
        borderWidth: 1.5,
        borderColor: 'white',
        borderRadius: 5,
        color: 'white',
        fontSize: 18,
        textAlign: 'center'
    },
    totalText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 30,
        textAlign: 'center'
    }
});
