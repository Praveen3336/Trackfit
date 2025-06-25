import React, { useState } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions,
    Modal
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Calendar } from 'react-native-calendars';
import dayjs from 'dayjs';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const { height, width } = Dimensions.get('window');

export default function LogSleep() {
    const navigation = useNavigation();

    const [bedtimeDate, setBedtimeDate] = useState(dayjs().format('YYYY-MM-DD'));
    const [wakeDate, setWakeDate] = useState(dayjs().format('YYYY-MM-DD'));
    const [calendarType, setCalendarType] = useState(null);
    const [showCalendar, setShowCalendar] = useState(false);
    const [isTimePickerVisible, setTimePickerVisible] = useState(false);
    const [selectedField, setSelectedField] = useState(null);
    const [bedtimeTime, setBedtimeTime] = useState('');
    const [wakeTime, setWakeTime] = useState('');

    const showPicker = (field) => {
        setSelectedField(field);
        setTimePickerVisible(true);
    };

    const hidePicker = () => {
        setTimePickerVisible(false);
        setSelectedField(null);
    };

    const handleConfirm = (date) => {
        const formatted = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        if (selectedField === 'bedtime') setBedtimeTime(formatted);
        if (selectedField === 'wake') setWakeTime(formatted);
        hidePicker();
    };

    const handleCalendarSelect = (day) => {
        if (calendarType === 'bedtime') setBedtimeDate(day.dateString);
        if (calendarType === 'wake') setWakeDate(day.dateString);
        setShowCalendar(false);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image
                    style={{ height: 40, width: 40, marginTop: 50, marginLeft: 20 }}
                    source={require('../assets/newAssets/icons8-back-50.png')}
                />
            </TouchableOpacity>

            <Text style={styles.headerText}>Log Sleep</Text>

            <View style={{ flex: 1, paddingTop: 100, paddingHorizontal: 20 }}>
                <View style={{ position: 'absolute', top: 40, right: 20 }}>
                    <TouchableOpacity>
                        <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Save</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Bedtime Date</Text>
                    <TouchableOpacity
                        onPress={() => {
                            setCalendarType('bedtime');
                            setShowCalendar(true);
                        }}
                        style={styles.dateInput}
                    >
                        <Text style={styles.dateText}>{dayjs(bedtimeDate).format('DD MMM YYYY')}</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Bedtime Time</Text>
                    <TouchableOpacity
                        onPress={() => showPicker('bedtime')}
                        style={styles.dateInput}
                    >
                        <Text style={styles.dateText}>{bedtimeTime || 'Select Time'}</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Wake Date</Text>
                    <TouchableOpacity
                        onPress={() => {
                            setCalendarType('wake');
                            setShowCalendar(true);
                        }}
                        style={styles.dateInput}
                    >
                        <Text style={styles.dateText}>{dayjs(wakeDate).format('DD MMM YYYY')}</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Wake-up Time</Text>
                    <TouchableOpacity
                        onPress={() => showPicker('wake')}
                        style={styles.dateInput}
                    >
                        <Text style={styles.dateText}>{wakeTime || 'Select Time'}</Text>
                    </TouchableOpacity>
                </View>
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
                            current={calendarType === 'bedtime' ? bedtimeDate : wakeDate}
                            onDayPress={handleCalendarSelect}
                            markedDates={{
                                [calendarType === 'bedtime' ? bedtimeDate : wakeDate]: {
                                    selected: true,
                                    selectedColor: '#4285F4'
                                }
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

            <DateTimePickerModal
                isVisible={isTimePickerVisible}
                mode="time"
                onConfirm={handleConfirm}
                onCancel={hidePicker}
                isDarkModeEnabled={true}
                locale="en_GB"
                minuteInterval={5}
                display="spinner"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
    },
    headerText: {
        color: 'white',
        fontSize: 20,
        fontWeight: '600',
        marginTop: 55,
        position: 'absolute',
        marginLeft: 80,
    },
    inputGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    inputLabel: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
        width: '40%',
    },
    dateInput: {
        height: 50,
        width: '50%',
        borderWidth: 1.5,
        borderColor: 'white',
        borderRadius: 5,
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    dateText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    calendarWrapper: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 10,
    },
    closeButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#4285F4',
        borderRadius: 8,
        alignItems: 'center',
    },
    closeButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});
