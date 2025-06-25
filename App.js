import React, { useEffect, useCallback, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as SplashScreen from 'expo-splash-screen';
import { Asset } from 'expo-asset';

import Login from "./components/Login";
import Otp from "./components/Otp";
import Details from "./components/Details";
import MainDetails from "./components/MainDetails";
import GoalSetting from "./components/GoalSetting";
import Permissions from "./components/Permissions";
import MainHome from "./components/MainHome";
import Profile from "./components/Profile";
import Goal from "./components/Goal";
import LogExercise from "./components/LogExercise";
import LogSleep from "./components/LogSleep";
import LogWater from "./components/LogWater";
import LogFood from "./components/LogFood";
import Height from "./components/FullBody";
import Step1 from './components/Steps/Step1';
import Step2 from './components/Steps/Step2';
import Step3 from './components/Steps/Step3';
import Step4 from './components/Steps/Step4';
import FullBody from "./components/FullBody";



const Stack = createStackNavigator();

export default function App() {


    return (

            <NavigationContainer>
                <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
                    <Stack.Screen options={{ animation: 'slide_from_left' }} name="Login" component={Login} />
                    <Stack.Screen options={{ animation: 'slide_from_right' }} name="Otp" component={Otp} />
                    <Stack.Screen options={{ animation: 'slide_from_right' }} name="Details" component={Details} />
                    {/*<Stack.Screen options={{ animation: 'slide_from_right' }} name="MainDetails" component={MainDetails} />*/}
                    <Stack.Screen options={{ animation: 'slide_from_right' }} name="Goal" component={GoalSetting} />
                    <Stack.Screen options={{ animation: 'slide_from_right' }} name="Permission" component={Permissions} />
                    <Stack.Screen options={{ animation: 'slide_from_right' }} name="MainHome" component={MainHome} />
                    <Stack.Screen options={{ animation: 'fade' }} name="Profile" component={Profile} />
                    <Stack.Screen options={{ animation: 'fade' }} name="Goals" component={Goal} />
                    <Stack.Screen options={{ animation: 'fade' }} name="LogExercise" component={LogExercise} />
                    <Stack.Screen options={{ animation: 'fade' }} name="LogSleep" component={LogSleep} />
                    <Stack.Screen options={{ animation: 'fade' }} name="LogWater" component={LogWater} />
                    <Stack.Screen options={{ animation: 'fade' }} name="LogFood" component={LogFood} />
                    <Stack.Screen options={{ animation: 'fade' }} name={"Fullbody"} component={FullBody} />
                    <Stack.Screen options={{ animation: 'fade' }} name={"Step1"} component={Step1} />
                    <Stack.Screen options={{ animation: 'fade' }} name={"Step2"} component={Step2} />
                    <Stack.Screen options={{ animation: 'fade' }} name={"Step3"} component={Step3} />
                    <Stack.Screen options={{ animation: 'fade' }} name={"Step4"} component={Step4} />

                </Stack.Navigator>
            </NavigationContainer>
    );
}
