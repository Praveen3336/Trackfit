import react from 'react';
import {View,Text,StyleSheet} from "react-native";
export default function Settings() {
    return(
        <View style={styles.container}>
            <Text style={{color:'white'}}>Settings</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})
