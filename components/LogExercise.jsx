import React, { useRef, useState } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions,
    TextInput,
    Modal
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Modalize } from 'react-native-modalize';
import { Calendar } from 'react-native-calendars';
import dayjs from 'dayjs';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const { height, width } = Dimensions.get('window');

export default function LogExercise() {
    const navigation = useNavigation();
    const modalRef = useRef(null);

    const [activity, setActivity] = useState('Walk');
    const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));
    const [showCalendar, setShowCalendar] = useState(false);
    const [isTimePickerVisible, setTimePickerVisible] = useState(false);
    const [selectedTime, setSelectedTime] = useState('');
    const [duration, setDuration] = useState('30');
    const [calories, setCalories] = useState('');
    const [distance, setDistance] = useState('');

    const showPicker = () => setTimePickerVisible(true);
    const hidePicker = () => setTimePickerVisible(false);
    const handleConfirm = (date) => {
        const formatted = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        setSelectedTime(formatted);
        hidePicker();
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image
                    style={{ height: 40, width: 40, marginTop: 50, marginLeft: 20 }}
                    source={require('../assets/newAssets/icons8-back-50.png')}
                />
            </TouchableOpacity>

            <Text style={styles.headerText}>What activity did you do?</Text>

            <View style={styles.activityList}>
                {['Walk', 'Run', 'Cycling', 'Workout', 'Sport'].map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => {
                            setActivity(item);
                            modalRef.current?.open();
                        }}
                        style={styles.activityItem}
                    >
                        <Image
                            style={styles.activityIcon}
                            source={
                                item === 'Walk'
                                    ? require('../assets/newAssets/Exercises/icons8-walking-96.png')
                                    : item === 'Run'
                                        ? require('../assets/newAssets/Exercises/icons8-run-90.png')
                                        : item === 'Cycling'
                                            ? require('../assets/newAssets/Exercises/icons8-cycling-100.png')
                                            : item === 'Workout'
                                                ? require('../assets/newAssets/Exercises/icons8-workout-90.png')
                                                : require('../assets/newAssets/Exercises/icons8-basketball-player-100.png')
                            }
                        />
                        <Text style={styles.activityText}>{item}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <Modalize
                ref={modalRef}
                modalHeight={height * 0.7}
                handleStyle={{ backgroundColor: '#444', width: 80, borderRadius: 10 }}
                modalStyle={styles.modalContent}
            >
                <View style={{ flex: 1, paddingVertical: 20 }}>
                    <View style={{position:'absolute',top:5,right:10,width:40}}>
                        <TouchableOpacity style={{height:50,width:'100%',backgroundColor:'transparent',justifyContent:'center',alignItems:'center'}}><Text style={{color:'white',fontSize:15,fontWeight:'bold'}}>Save</Text></TouchableOpacity>
                    </View>
                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>Activity</Text>
                        <TextInput editable={false} value={activity} style={styles.inputField} />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>Date</Text>
                        <TouchableOpacity
                            onPress={() => setShowCalendar(true)}
                            style={[styles.dateInput]}
                        >
                            <Text style={styles.dateText}>{dayjs(selectedDate).format('DD MMM YYYY')}</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>Start Time</Text>
                        <TouchableOpacity
                            onPress={showPicker}
                            style={[styles.dateInput, { marginRight: 40 }]}
                        >
                            <Text style={styles.dateText}>{selectedTime || 'Select Time'}</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>Duration</Text>
                        <TextInput
                            keyboardType="numeric"
                            value={duration}
                            onChangeText={setDuration}
                            style={styles.inputField}
                            maxLength={4}
                        />
                        <Text style={styles.inputLabel}>min</Text>
                    </View>

                    {(activity === 'Walk' || activity === 'Run' || activity === 'Cycling') && (
                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Distance</Text>
                            <TextInput
                                keyboardType="numeric"
                                value={distance}
                                onChangeText={setDistance}
                                style={styles.inputField}
                                maxLength={3}
                            />
                            <Text style={styles.inputLabel}>km</Text>
                        </View>
                    )}

                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>Calories</Text>
                        <TextInput
                            keyboardType="numeric"
                            value={calories}
                            onChangeText={setCalories}
                            style={styles.inputField}
                        />
                        <Text style={styles.inputLabel}>kcal</Text>
                    </View>
                </View>

            </Modalize>

            <Modal
                visible={showCalendar}
                transparent
                animationType="fade"
                onRequestClose={() => setShowCalendar(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.calendarWrapper}>
                        <Calendar
                            current={selectedDate}
                            onDayPress={(day) => {
                                setSelectedDate(day.dateString);
                                setShowCalendar(false);
                            }}
                            markedDates={{
                                [selectedDate]: { selected: true, selectedColor: '#4285F4' },
                            }}
                            theme={{
                                backgroundColor: 'white',
                                calendarBackground: 'white',
                                textSectionTitleColor: 'black',
                                dayTextColor: 'black',
                                todayTextColor: 'green',
                                selectedDayTextColor: 'white',
                                monthTextColor: 'black',
                                arrowColor: 'black',
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
                display={"spinner"}
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
    activityList: {
        flexDirection: 'column',
        marginTop: 100,
        gap: 20,
        marginLeft: 50,
    },
    activityItem: {
        flexDirection: 'row',
        gap: 20,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-start',
    },
    activityIcon: {
        height: 50,
        width: 50,
    },
    activityText: {
        color: 'white',
        fontSize: 20,
        fontWeight: '800',
    },
    modalContent: {
        backgroundColor: '#121212',
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        padding: 20,
        width: '100%',
        alignSelf: 'center',
    },
    inputGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 15,
    },
    inputLabel: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
        width: '30%',
    },
    inputField: {
        height: 50,
        width: '40%',
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 5,
        color: 'white',
        fontSize: 18,
        paddingHorizontal: 10,
        fontWeight: 'bold',
        marginRight: 15,
        textAlign: 'center',
    },
    dateInput: {
        height: 50,
        width: '40%',
        borderWidth: 1.5,
        borderColor: 'white',
        borderRadius: 5,
        justifyContent: 'center',
        marginRight: 40,
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
