import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Modal,
    Dimensions,
    TextInput,
    ScrollView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Calendar } from 'react-native-calendars';
import dayjs from 'dayjs';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const { height, width } = Dimensions.get('window');

export default function LogFood() {
    const navigation = useNavigation();

    const [foodDate, setFoodDate] = useState(dayjs().format('YYYY-MM-DD'));
    const [foodTime, setFoodTime] = useState(dayjs().format('hh:mm A'));  // 12-hour format with AM/PM
    const [showCalendar, setShowCalendar] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [foodName, setFoodName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSave = () => {
        if (!foodName || !quantity || isNaN(quantity) || quantity <= 0) {
            setErrorMessage('Please enter valid food name and quantity.');
            return;
        }

        setErrorMessage('');
        // Handle saving logic here (e.g., send data to a server or local storage)
        console.log({ foodName, quantity, date: foodDate, time: foodTime });
    };

    const handleConfirmTime = (time) => {
        setFoodTime(dayjs(time).format('hh:mm A'));  // Format time with AM/PM
        setShowTimePicker(false);
    };

    return (
        <ScrollView style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image
                    style={{ height: 40, width: 40, marginTop: 50, marginLeft: 20 }}
                    source={require('../assets/newAssets/icons8-back-50.png')}
                />
            </TouchableOpacity>

            <Text style={styles.headerText}>Log Food</Text>

            <View style={styles.innerContainer}>
                <View style={{ position: 'absolute', top: 40, right: 20 }}>
                    <TouchableOpacity onPress={handleSave}>
                        <Text style={styles.saveText}>Save</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Date</Text>
                    <TouchableOpacity
                        onPress={() => setShowCalendar(true)}
                        style={styles.dateInput}
                    >
                        <Text style={styles.dateText}>{dayjs(foodDate).format('DD MMM YYYY')}</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Time</Text>
                    <TouchableOpacity
                        onPress={() => setShowTimePicker(true)}
                        style={styles.dateInput}
                    >
                        <Text style={styles.dateText}>{foodTime}</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Food Name</Text>
                    <TextInput
                        style={styles.inputBox}
                        placeholder="Enter food name"
                        placeholderTextColor="#888"
                        value={foodName}
                        onChangeText={setFoodName}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Quantity (grams)</Text>
                    <TextInput
                        style={styles.inputBox}
                        placeholder="Enter quantity (grams)"
                        placeholderTextColor="#888"
                        keyboardType="numeric"
                        value={quantity}
                        onChangeText={setQuantity}
                    />
                </View>

                {errorMessage ? (
                    <Text style={styles.errorText}>{errorMessage}</Text>
                ) : (
                    <Text style={styles.totalText}>
                        Food Logged: {foodName} - {quantity} grams at {foodTime}
                    </Text>
                )}
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
                            current={foodDate}
                            onDayPress={day => {
                                setFoodDate(day.dateString);
                                setShowCalendar(false);
                            }}
                            markedDates={{
                                [foodDate]: { selected: true, selectedColor: '#4285F4' }
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
                isVisible={showTimePicker}
                mode="time"
                date={new Date()}
                onConfirm={handleConfirmTime}
                onCancel={() => setShowTimePicker(false)}
                is24Hour={false}  // Use 12-hour format
                display={'spinner'}
            />
        </ScrollView>
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
    },
    errorText: {
        color: 'red',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 10
    }
});
