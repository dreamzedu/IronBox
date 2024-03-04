import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"

import AddItems from '../Screens/Checkout/AddItems';
import CheckoutHome from '../Screens/Checkout/CheckoutHome';
import ReviewOrder from '../Screens/Checkout/ReviewOrder';
import SchedulePickup from "../Screens/Checkout/SchedulePickup"
import AddPickupAddress from '../Screens/Checkout/AddPickupAddress';
import SelectPickupAddress from '../Screens/Checkout/SelectPickupAddress';
import OrderDetail from '../Screens/Order/OrderDetail';
import OrderAcknowledgement from "../Screens/Checkout/OrderAcknowledgement"

const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Checkout"
                component={CheckoutHome}
                options={{
                    headerShown: true
                }}
            />
            <Stack.Screen
                name="Add Pickup Address"
                component={AddPickupAddress}
                options={{
                    headerShown: true,
                    title: 'Add Pickup Address'
                }}
            />
            <Stack.Screen
                name="Select Pickup Address"
                component={SelectPickupAddress}
                options={{ headerShown: true, title: "Confirm Pickup Address" }} />
            <Stack.Screen
                name="Schedule Pickup"
                component={SchedulePickup}
                options={{
                    headerShown: true,  
                }}/>
            <Stack.Screen
                name="Add Items"
                component={AddItems}
                options={{
                    headerShown: true
                }}
            />
            <Stack.Screen
                name="Review Order"
                component={ReviewOrder}
                options={{
                    title: 'Review Order'
                }}
            />
            <Stack.Screen
                name="Order Detail"
                component={OrderDetail}
                options={{ headerShown: true }} />
            <Stack.Screen
                name="Order Acknowledgement"
                component={OrderAcknowledgement}
                options={{
                    headerShown: false
                }}
            />
            
        </Stack.Navigator>
    )
}

export default function CartNavigator() {
    return <MyStack />
}