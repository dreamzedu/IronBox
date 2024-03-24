import React from "react"
//import { createStackNavigator } from '@react-navigation/stack'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '../Screens/SplashScreen'
import LoginNavigator from './LoginNavigator'
import DrawerNavigator from "./DrawerNavigator"
import AdminNavigator from "./AdminNavigator"
import CartNavigator from "./CartNavigator";
import RateCard from '../Screens/Products/RateCard';
import OrderDetail from '../Screens/Order/OrderDetail';
import BottomTabNavigator from "./BottomTabNavigator";
import OrderNavigator from "./OrderNavigator";

import MyOrderDetail from '../Screens/User/MyOrderDetail';
import MyCancelOrder from '../Screens/User/MyCancelOrder';
import UpdateUserProfile from '../Screens/User/UpdateUserProfile';
import AddressEditor from '../Screens/User/AddressEditor';
import CancelOrder from '../Screens/Order/CancelOrder';
import * as commonstyles from "../common-styles";
import MyOrders from "../Screens/User/MyOrders";
import PaymentOptions from '../Screens/Payment/PaymentOptions';

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
            {/*<Stack.Screen*/}
            {/*    name="DrawerNavigator"*/}
            {/*    component={DrawerNavigator}*/}
            {/*    // Hiding header for Navigation Drawer as we will use our custom header*/}
            {/*    options={{ headerShown: false }}*/}
            {/*/>*/}
            <Stack.Screen
                name="BottomTabNavigator"
                component={BottomTabNavigator}
                // Hiding header for Navigation Drawer as we will use our custom header
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="AdminNavigator"
                component={AdminNavigator}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="CartNavigator"
                component={CartNavigator}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Rate Card"
                component={RateCard}
                options={{ headerShown: true, headerStyle: commonstyles.header, }} />
            <Stack.Screen
                name="Order Detail"
                component={OrderDetail}
                options={{
                    headerShown: true,
                    headerStyle: commonstyles.header
                }} />
            <Stack.Screen
                name="My Order Detail"
                component={MyOrderDetail}                
                options={{
                    headerShown: true,
                    title: 'Order Detail',
                    headerStyle: commonstyles.header
                }} />
            <Stack.Screen
                name="My Cancel Order"
                component={MyCancelOrder}
                options={{
                    headerShown: true,
                    title: 'Cancel Order'
                }} />
            <Stack.Screen
                name="Cancel Order"
                component={CancelOrder}
                options={{
                    headerShown: true,
                    headerStyle: commonstyles.header,
                }} />

            {/*<Stack.Screen*/}
            {/*    name="OrderNavigator"*/}
            {/*    component={OrderNavigator}*/}
            {/*    options={{ headerShown: false }} />*/}
            <Stack.Screen
                name="MyOrders"
                component={MyOrders}
                options={{
                    title: 'My Orders',
                    headerShown: true,
                    headerStyle: commonstyles.header,
                }}
            />
            <Stack.Screen
                name="Edit Profile"
                component={UpdateUserProfile}
                options={{
                    headerShown: true,
                    headerStyle: commonstyles.header,
                }}
            />
            <Stack.Screen
                name="AddressEditor"
                component={AddressEditor}
                options={{
                    headerShown: true,
                    headerStyle: commonstyles.header,
                }}
            />
            <Stack.Screen
                name="Payment"
                component={PaymentOptions}
                options={{
                    headerShown: true,
                    headerStyle: commonstyles.header
                }}
            />
        </Stack.Navigator>
    )
}

export default function MainNavigator() {
    return <MyStack />
}