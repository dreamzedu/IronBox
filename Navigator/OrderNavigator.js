import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"

import OrderDetail from '../Screens/Order/OrderDetail';
import MyOrders from "../Screens/User/MyOrders"
import CancelOrder from '../Screens/Order/CancelOrder';

const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator>                                 
            
            <Stack.Screen
                name="Order Detail"
                component={OrderDetail}
                options={{ headerShown: true }} />
            
            <Stack.Screen
                name="Cancel Order"
                component={CancelOrder}
                options={{ headerShown: true }} />
            <Stack.Screen
                name="MyOrders"
                component={MyOrders}
                options={{
                    title: 'My Orders',
                    headerShown: true
                }}
            />
        </Stack.Navigator>
    )
}

export default function OrderNavigator() {
    return <MyStack />
}