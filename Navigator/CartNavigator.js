import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"

import AddItems from '../Screens/Checkout/AddItems';
import ReviewOrder from '../Screens/Checkout/ReviewOrder';

const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Add Items"
                component={AddItems}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="Review Order"
                component={ReviewOrder}
                options={{
                    title: 'Review Order'
                }}
            />
        </Stack.Navigator>
    )
}

export default function CartNavigator() {
    return <MyStack />
}