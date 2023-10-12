import React from "react"
//import { createStackNavigator } from '@react-navigation/stack'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '../Screens/SplashScreen'
import LoginNavigator from './LoginNavigator'
import BottomTabNavigator from './BottomTabNavigator'
import DrawerNavigator from "./DrawerNavigator"

const Stack = createNativeStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator initialRouteName="SplashScreen">
            {/* SplashScreen which will come once for 5 Seconds */}
            <Stack.Screen
                name="SplashScreen"
                component={SplashScreen}
                // Hiding header for Splash Screen
                options={{ headerShown: false }}
            />
            {/* Auth Navigator which includer Login Signup will come once */}
            <Stack.Screen
                name="LoginNavigator"
                component={LoginNavigator}
                options={{ headerShown: false }}
            />
            {/* Navigation Drawer as a landing page */}
            <Stack.Screen
                name="DrawerNavigator"
                component={DrawerNavigator}
                // Hiding header for Navigation Drawer as we will use our custom header
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}

export default function MainNavigator() {
    return <MyStack />
}