
import React from "react"
import { createStackNavigator } from "@react-navigation/stack"

import Orders from "../Screens/Admin/Orders"
import AdminOrderDetail from "../Screens/Admin/AdminOrderDetail"
import AdminUpdateOrderItems from "../Screens/Admin/AdminUpdateOrderItems"

const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator>         
            <Stack.Screen name="Orders" component={Orders} />
               
            <Stack.Screen name="AdminOrderDetail" component={AdminOrderDetail} />
            <Stack.Screen name="AdminUpdateOrderItems" component={AdminUpdateOrderItems} />
        </Stack.Navigator>
    )
}
export default function AdminNavigator() {
    return <MyStack />
}