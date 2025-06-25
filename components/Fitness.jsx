import react from 'react';
import {View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Image} from "react-native";
import {useNavigation} from "@react-navigation/native";
const {width,height} = Dimensions.get('window');
export default function Fitness() {
    const navigation = useNavigation()
    return(
        <View style={styles.container}>
            <Text style={{color:'white',fontSize:20,fontWeight:'900',marginTop:height*0.05,marginLeft:width*0.05}}>Explore Workout by formats</Text>
            <ScrollView contentContainerStyle={styles.scrollContainer} horizontal={true}>
                <TouchableOpacity onPress={()=>navigation.navigate("Fullbody")} style={styles.imageWrapper}><Image style={styles.image}  source={require('../assets/newAssets/Formats/full.jpeg')}/></TouchableOpacity>
                <TouchableOpacity style={styles.imageWrapper}><Image style={styles.image}  source={require('../assets/newAssets/Formats/push.jpeg')}/></TouchableOpacity>
                <TouchableOpacity style={styles.imageWrapper}><Image style={styles.image} source={require('../assets/newAssets/Formats/pull.jpeg')}/></TouchableOpacity>
                <TouchableOpacity style={styles.imageWrapper}><Image style={styles.image}  source={require('../assets/newAssets/Formats/legs.jpeg')}/></TouchableOpacity>
                <TouchableOpacity style={styles.imageWrapper}><Image style={styles.image}  source={require('../assets/newAssets/Formats/arms.jpeg')}/></TouchableOpacity>
            </ScrollView>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContainer: {
        alignItems: 'center',
        flexDirection:'row',
        gap:100,
        marginTop:50,
        position:'absolute',
        paddingHorizontal:width*0.1,
    },
    imageWrapper: {
        marginVertical: 10,
    },
    image: {
        height: 100,
        width: 100,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: 'white'
    }
})
